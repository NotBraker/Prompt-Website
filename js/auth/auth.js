/* ============================================================
   THE PROMPT GENERATION — Auth Helper
   Requires firebase-config.js to be loaded first.

   Exposes window.TPG.{
     signInWithGoogle, signInWithEmail,
     createAccount,    resetPassword,
     signOut,          getUser
   }
   and auto-updates the navbar on every page.
   ============================================================ */

'use strict';

(function () {
  const auth = window.TPG_AUTH;

  /* ── Firebase not configured yet — show notice in console ── */
  if (!auth) {
    console.info('[TPG Auth] Skipping auth init (Firebase not configured).');
    window.TPG = window.TPG || {};
    window.TPG.signInWithGoogle = () => alert('Configure Firebase first — see js/auth/firebase-config.js');
    window.TPG.signOut           = () => {};
    window.TPG.getUser           = () => null;
    return;
  }

  /* ── URL helpers — works from root OR /pages/ ─────────────── */
  function inPages() {
    return window.location.pathname.replace(/\\/g, '/').includes('/pages/');
  }
  function toUrl(relativePage) {
    return inPages() ? relativePage : 'pages/' + relativePage;
  }

  /* ── Friendly Firebase error codes → human text ──────────── */
  const ERROR_MAP = {
    'auth/user-not-found':          'No account found with that email address.',
    'auth/wrong-password':          'Incorrect password — please try again.',
    'auth/invalid-credential':      'Email or password is incorrect.',
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed':  'Network error — check your internet connection.',
    'auth/popup-blocked':           'Popup was blocked. Allow popups for this site and try again.',
    'auth/popup-closed-by-user':    null,         // user dismissed — silent
    'auth/cancelled-popup-request': null,         // silent
  };

  function friendlyError(code) {
    if (ERROR_MAP[code] === null) return null;     // intentionally silent
    return ERROR_MAP[code] || 'Something went wrong. Please try again.';
  }

  /* ── Public API ────────────────────────────────────────────── */
  window.TPG = window.TPG || {};

  window.TPG.signInWithGoogle = async function () {
    try {
      await auth.signInWithPopup(window.TPG_GOOGLE_PROVIDER);
      window.location.href = toUrl('account.html');
    } catch (e) {
      return friendlyError(e.code);
    }
  };

  window.TPG.signInWithEmail = async function (email, password) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = toUrl('account.html');
    } catch (e) {
      return friendlyError(e.code);
    }
  };

  window.TPG.createAccount = async function (name, email, password) {
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (name) await cred.user.updateProfile({ displayName: name.trim() });
      window.location.href = toUrl('account.html');
    } catch (e) {
      return friendlyError(e.code);
    }
  };

  window.TPG.resetPassword = async function (email) {
    try {
      await auth.sendPasswordResetEmail(email);
      return null;   // null = success
    } catch (e) {
      return friendlyError(e.code);
    }
  };

  window.TPG.signOut = async function () {
    try {
      await auth.signOut();
      window.location.href = inPages() ? '../index.html' : 'index.html';
    } catch (e) {
      console.error('[TPG Auth] Sign-out failed:', e);
    }
  };

  window.TPG.getUser = () => auth.currentUser;

  /* ── Navbar auth-state updater ─────────────────────────────── */
  function buildInitials(user) {
    return (user.displayName || user.email || 'U')
      .trim().split(/\s+/).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  function getAccountHref() {
    return toUrl('account.html');
  }


  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function sanitizeForDocId(str) {
    return String(str || '').replace(/[^a-z0-9._-]/g, '_');
  }

  function getAccountKey(user) {
    if (!user) return null;
    var email = normalizeEmail(user.email);
    if (email) return 'email_' + sanitizeForDocId(email);
    return user.uid ? String(user.uid) : null;
  }

  function setPremiumClass(enabled) {
    if (!document || !document.body) return;
    document.body.classList.toggle('premium', !!enabled);
  }

  function updatePremiumState(user) {
    var db = window.TPG_DB;
    var accountKey = getAccountKey(user);

    if (!user || !db || !accountKey) {
      setPremiumClass(false);
      return;
    }

    db.collection('users').doc(accountKey).get()
      .then(function (docSnap) {
        var data = docSnap && docSnap.exists ? docSnap.data() : null;
        setPremiumClass(!!(data && data.premium));
      })
      .catch(function () {
        setPremiumClass(false);
      });
  }

  /* Pre-hide Sign In button immediately (before async state resolves)
     to prevent the "flash of signed-out" on page load. We check
     localStorage for any cached Firebase auth token as a fast hint. */
  (function preHideIfCachedUser() {
    try {
      const hasSession = Object.keys(localStorage).some(k => k.startsWith('firebase:authUser:'));
      if (hasSession) {
        const signInBtn = document.getElementById('navSignInBtn');
        if (signInBtn) signInBtn.style.visibility = 'hidden';
      }
    } catch (e) { /* ignore if localStorage blocked */ }
  })();

  function patchNavbar(user) {
    const actions = document.querySelector('.navbar__actions');
    if (!actions) return;

    /* Remove stale user element */
    const old = document.getElementById('navUserEl');
    if (old) old.remove();

    const signInBtn = document.getElementById('navSignInBtn');

    if (user) {
      /* ── Signed-in state: show avatar + dropdown ── */
      if (signInBtn) {
        signInBtn.style.display = 'none';
        signInBtn.style.visibility = '';
      }

      const initials  = buildInitials(user);
      const firstName = (user.displayName || user.email || 'You').trim().split(/\s+/)[0];

      const el = document.createElement('div');
      el.id = 'navUserEl';
      el.className = 'navbar__user';
      el.innerHTML = `
        <button class="navbar__user-trigger" aria-haspopup="true" aria-expanded="false" title="Account menu">
          ${user.photoURL
            ? `<img src="${user.photoURL}" class="navbar__avatar" alt="Your avatar" referrerpolicy="no-referrer">`
            : `<div class="navbar__avatar navbar__avatar--initials">${initials}</div>`
          }
          <span class="navbar__username">${firstName}</span>
          <span class="navbar__caret" aria-hidden="true">▾</span>
        </button>
        <div class="navbar__user-dropdown" role="menu" aria-label="Account menu">
          <a href="${getAccountHref()}" role="menuitem">👤 My Account</a>
          <a href="${getAccountHref()}#saved" role="menuitem">📌 Saved Prompts</a>
          <div class="navbar__dropdown-divider" aria-hidden="true"></div>
          <button class="navbar__dropdown-signout" onclick="window.TPG.signOut()" role="menuitem">
            🚪 Sign Out
          </button>
        </div>`;

      /* Insert before hamburger (or at front of actions) */
      const burger = actions.querySelector('.navbar__hamburger');
      if (burger) actions.insertBefore(el, burger);
      else        actions.prepend(el);

      /* Toggle dropdown */
      const trigger  = el.querySelector('.navbar__user-trigger');
      const dropdown = el.querySelector('.navbar__user-dropdown');

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const open = dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
      });

      document.addEventListener('click', function () {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });

    } else {
      /* ── Signed-out state: restore Sign In button ── */
      if (signInBtn) {
        signInBtn.style.display    = '';
        signInBtn.style.visibility = '';
      }
    }
  }

  /* ── Set explicit LOCAL persistence so sessions survive page navigation ── */
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function () { /* ignore if already set */ });

  /* Run on every auth state change (including page load) */
  auth.onAuthStateChanged(function (user) {
    patchNavbar(user);
    updatePremiumState(user);
  });

})();


