'use strict';

/* ============================================================
   THE PROMPT GENERATION — Unified Likes / Saved Prompts Service
   js/auth/likes.js

   Exposes window.TPG.likes with:
     like(id, promptData)      — save a prompt
     unlike(id)                — remove a saved prompt
     isLiked(id)               — boolean
     getAll()                  — array of saved prompt objects
     syncFromFirebase(user?)   — pull Firestore -> merge into localStorage
     pushToFirebase(user?)     — push localStorage -> Firestore

   Storage:
     localStorage key : tpg_saved_v2
     Firestore path   : users/{accountKey}/savedPrompts/{id}

   accountKey strategy:
     - Prefer normalized email key (shared across Google + email/password)
     - Fallback to uid when email is unavailable

   This makes same-email accounts use the same saved prompts bucket.
   ============================================================ */

(function () {
  const LS_KEY = 'tpg_saved_v2';

  /* ── localStorage helpers ─────────────────────────────────── */
  function lsRead() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function lsWrite(arr) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(arr)); }
    catch (e) { console.warn('[TPG Likes] localStorage write failed:', e); }
  }

  /* ── Identity helpers ─────────────────────────────────────── */
  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function sanitizeForDocId(str) {
    return String(str || '').replace(/[^a-z0-9._-]/g, '_');
  }

  function getCurrentUser() {
    const auth = window.TPG_AUTH;
    return auth && auth.currentUser ? auth.currentUser : null;
  }

  function getAccountKey(user) {
    if (!user) return null;
    const email = normalizeEmail(user.email);
    if (email) return 'email_' + sanitizeForDocId(email);
    return user.uid ? String(user.uid) : null;
  }

  /* ── Firestore helpers ────────────────────────────────────── */
  function getDB() { return window.TPG_DB || null; }

  function fsDocByAccountKey(accountKey, id) {
    const db = getDB();
    if (!db || !accountKey) return null;
    return db.collection('users').doc(accountKey).collection('savedPrompts').doc(String(id));
  }

  function fsCollectionByAccountKey(accountKey) {
    const db = getDB();
    if (!db || !accountKey) return null;
    return db.collection('users').doc(accountKey).collection('savedPrompts');
  }

  function readAllFromAccountKey(accountKey) {
    const col = fsCollectionByAccountKey(accountKey);
    if (!col) return Promise.resolve([]);
    return col.orderBy('savedAt', 'desc').get()
      .then(function (snap) {
        return snap.docs.map(function (d) { return d.data(); }).filter(Boolean);
      })
      .catch(function (e) {
        console.warn('[TPG Likes] Firestore read failed:', e);
        return [];
      });
  }

  function batchWriteToAccountKey(accountKey, entries) {
    const db = getDB();
    if (!db || !accountKey || !entries || !entries.length) return Promise.resolve();
    const batch = db.batch();
    entries.forEach(function (entry) {
      const ref = db.collection('users').doc(accountKey)
        .collection('savedPrompts').doc(String(entry.id));
      batch.set(ref, entry, { merge: true });
    });
    return batch.commit().catch(function (e) {
      console.warn('[TPG Likes] Firestore batch write failed:', e);
    });
  }

  /* ── Core API ─────────────────────────────────────────────── */
  const likes = {

    like: function (id, promptData) {
      const arr   = lsRead();
      const strId = String(id);
      const next  = arr.filter(function (p) { return String(p.id) !== strId; });
      const entry = Object.assign({}, promptData, { id: strId, savedAt: Date.now() });
      next.unshift(entry);
      lsWrite(next);

      window.dispatchEvent(new CustomEvent('tpg:like-changed', {
        detail: { id: strId, liked: true }
      }));

      const user       = getCurrentUser();
      const accountKey = getAccountKey(user);
      if (accountKey) {
        const ref = fsDocByAccountKey(accountKey, strId);
        if (ref) {
          ref.set(entry).catch(function (e) {
            console.warn('[TPG Likes] Firestore write failed:', e);
          });
        }
      }
    },

    unlike: function (id) {
      const strId = String(id);
      const arr   = lsRead().filter(function (p) { return String(p.id) !== strId; });
      lsWrite(arr);

      window.dispatchEvent(new CustomEvent('tpg:like-changed', {
        detail: { id: strId, liked: false }
      }));

      const user       = getCurrentUser();
      const accountKey = getAccountKey(user);
      if (accountKey) {
        const ref = fsDocByAccountKey(accountKey, strId);
        if (ref) {
          ref.delete().catch(function (e) {
            console.warn('[TPG Likes] Firestore delete failed:', e);
          });
        }
      }
    },

    isLiked: function (id) {
      const strId = String(id);
      return lsRead().some(function (p) { return String(p.id) === strId; });
    },

    getAll: function () {
      return lsRead();
    },

    getAllIds: function () {
      return new Set(lsRead().map(function (p) { return String(p.id); }));
    },

    /**
     * Pull from Firestore and merge into localStorage.
     * If user has an email key, also reads legacy uid docs and migrates forward.
     */
    syncFromFirebase: function (userArg) {
      const db   = getDB();
      const user = userArg || getCurrentUser();
      if (!db || !user) return Promise.resolve();

      const accountKey = getAccountKey(user);
      if (!accountKey) return Promise.resolve();

      const keysToRead = [accountKey];
      const uidLegacyKey = user.uid ? String(user.uid) : null;

      // Legacy path support: previous versions stored under users/{uid}
      if (uidLegacyKey && uidLegacyKey !== accountKey) {
        keysToRead.push(uidLegacyKey);
      }

      return Promise.all(keysToRead.map(readAllFromAccountKey))
        .then(function (results) {
          const localMap = {};
          lsRead().forEach(function (p) { localMap[String(p.id)] = p; });

          results.flat().forEach(function (entry) {
            if (!entry || !entry.id) return;
            const key = String(entry.id);
            const prev = localMap[key];
            if (!prev || (entry.savedAt || 0) >= (prev.savedAt || 0)) {
              localMap[key] = entry;
            }
          });

          const merged = Object.values(localMap)
            .sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
          lsWrite(merged);

          // Ensure merged result is persisted into the canonical account bucket.
          return batchWriteToAccountKey(accountKey, merged).then(function () {
            window.dispatchEvent(new CustomEvent('tpg:likes-synced', {
              detail: { count: merged.length, accountKey: accountKey }
            }));
          });
        })
        .catch(function (e) {
          console.warn('[TPG Likes] Firestore sync failed:', e);
        });
    },

    /**
     * Push localStorage liked prompts to Firestore account bucket.
     * Uses same account key strategy (email-first, uid fallback).
     */
    pushToFirebase: function (userArg) {
      const user = userArg || getCurrentUser();
      const accountKey = getAccountKey(user);
      const arr = lsRead();
      if (!accountKey || !arr.length) return Promise.resolve();
      return batchWriteToAccountKey(accountKey, arr);
    },
  };

  /* ── Attach to window.TPG ─────────────────────────────────── */
  window.TPG       = window.TPG || {};
  window.TPG.likes = likes;

  /* ── Auto-sync on auth changes ────────────────────────────── */
  (function autoSync() {
    const auth = window.TPG_AUTH;
    if (!auth) return;

    auth.onAuthStateChanged(function (user) {
      if (!user) return;
      likes.pushToFirebase(user).then(function () {
        return likes.syncFromFirebase(user);
      });
    });
  })();
})();

