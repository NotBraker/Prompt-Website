/* ============================================================
   THE PROMPT GENERATION — submit.js
   Handles the Submit Prompt form on submit.html
   Writes to Firestore: submissions/{auto-id}
   ============================================================ */

'use strict';

(function initSubmitPage() {

  var AI_TOOLS = ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'DALL·E', 'Copilot', 'Perplexity', 'Other'];

  /* ── DOM refs ────────────────────────────────────────── */
  var formWrap      = document.getElementById('submitFormWrap');
  var signInPrompt  = document.getElementById('submitSignInPrompt');
  var successWrap   = document.getElementById('submitSuccess');
  var form          = document.getElementById('submitForm');
  var titleInput    = document.getElementById('promptTitle');
  var textInput     = document.getElementById('promptText');
  var categorySel   = document.getElementById('promptCategory');
  var tagInput      = document.getElementById('tagInput');
  var tagsWrap      = document.getElementById('tagsWrap');
  var aiToolsGrid   = document.getElementById('aiToolsGrid');
  var submitBtn     = document.getElementById('submitBtn');
  var previewBtn    = document.getElementById('previewBtn');
  var submitAnother = document.getElementById('submitAnother');
  var titleCount    = document.getElementById('titleCount');
  var textCount     = document.getElementById('textCount');

  if (!form) return;

  var tags = [];

  /* ── Populate category dropdown ─────────────────────── */
  var framework = window.PROMPT_MARKETPLACE_FRAMEWORK;
  var meta      = window.CATEGORY_META;

  if (framework && categorySel) {
    framework.frameworkCategories.forEach(function (cat) {
      var m = meta ? meta[cat.id] : null;
      var opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = (m ? m.emoji + ' ' : '') + cat.name;
      categorySel.appendChild(opt);
    });
  }

  /* ── Populate AI tools checkboxes ───────────────────── */
  if (aiToolsGrid) {
    AI_TOOLS.forEach(function (tool) {
      var label = document.createElement('label');
      label.className = 'ai-tool-checkbox';
      label.innerHTML = '<input type="checkbox" value="' + tool + '"> ' + tool;
      label.addEventListener('click', function () {
        // Toggle after a tick so the checkbox state has changed
        setTimeout(function () {
          var cb = label.querySelector('input');
          label.classList.toggle('checked', cb.checked);
        }, 0);
      });
      aiToolsGrid.appendChild(label);
    });
  }

  /* ── Char counters ──────────────────────────────────── */
  function updateCounter(input, display, max) {
    var len = (input.value || '').length;
    display.textContent = len;
    var parent = display.parentElement;
    parent.classList.remove('warn', 'over');
    if (len > max) parent.classList.add('over');
    else if (len > max * 0.9) parent.classList.add('warn');
  }

  titleInput.addEventListener('input', function () { updateCounter(titleInput, titleCount, 100); });
  textInput.addEventListener('input', function () { updateCounter(textInput, textCount, 5000); });

  /* ── Tags system ────────────────────────────────────── */
  function renderTags() {
    // Remove existing chips
    tagsWrap.querySelectorAll('.tag-chip').forEach(function (c) { c.remove(); });

    tags.forEach(function (tag, idx) {
      var chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.innerHTML = '#' + escHtml(tag) + ' <button type="button" aria-label="Remove tag" data-idx="' + idx + '">✕</button>';
      chip.querySelector('button').addEventListener('click', function () {
        tags.splice(idx, 1);
        renderTags();
      });
      tagsWrap.insertBefore(chip, tagInput);
    });
  }

  function addTag(raw) {
    var t = raw.trim().replace(/^#/, '').trim();
    if (!t || tags.length >= 5) return;
    if (tags.some(function (x) { return x.toLowerCase() === t.toLowerCase(); })) return;
    tags.push(t);
    renderTags();
  }

  tagInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput.value);
      tagInput.value = '';
    }
    if (e.key === 'Backspace' && !tagInput.value && tags.length) {
      tags.pop();
      renderTags();
    }
  });

  tagInput.addEventListener('blur', function () {
    if (tagInput.value.trim()) {
      addTag(tagInput.value);
      tagInput.value = '';
    }
  });

  /* ── Auth gating ────────────────────────────────────── */
  function checkAuth() {
    var auth = window.TPG_AUTH;
    if (!auth) { showSignIn(); return; }

    auth.onAuthStateChanged(function (user) {
      if (user) {
        showForm();
      } else {
        showSignIn();
      }
    });
  }

  function showForm() {
    formWrap.style.display = '';
    signInPrompt.style.display = 'none';
    successWrap.style.display = 'none';
  }

  function showSignIn() {
    formWrap.style.display = 'none';
    signInPrompt.style.display = '';
    successWrap.style.display = 'none';
  }

  function showSuccess() {
    formWrap.style.display = 'none';
    signInPrompt.style.display = 'none';
    successWrap.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Preview ────────────────────────────────────────── */
  previewBtn.addEventListener('click', function () {
    var title = titleInput.value.trim() || 'Untitled Prompt';
    var text  = textInput.value.trim()  || '(No prompt text)';
    var cat   = categorySel.options[categorySel.selectedIndex];
    var catName = cat && cat.value ? cat.textContent : 'No category';
    var selectedTools = getSelectedTools();
    var toolsStr = selectedTools.length ? selectedTools.join(', ') : 'Not specified';
    var tagsStr  = tags.length ? tags.map(function (t) { return '#' + t; }).join(' ') : 'None';

    // Use a simple modal
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });

    overlay.innerHTML = '\
      <div style="background:var(--bg-card);border:1px solid var(--border-2);border-radius:var(--r-xl);padding:32px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;">\
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">\
          <h2 style="font-size:1.2rem;">👁 Prompt Preview</h2>\
          <button onclick="this.closest(\'div[style]\').parentElement.remove()" style="background:none;border:none;color:var(--text-3);font-size:1.4rem;cursor:pointer;">✕</button>\
        </div>\
        <h3 style="font-size:1.1rem;margin-bottom:12px;">' + escHtml(title) + '</h3>\
        <div style="background:var(--bg-2);border-radius:var(--r-md);padding:16px;margin-bottom:16px;font-family:\'JetBrains Mono\',monospace;font-size:0.82rem;line-height:1.7;color:var(--text-1);white-space:pre-wrap;max-height:300px;overflow-y:auto;">' + escHtml(text) + '</div>\
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">\
          <span style="font-size:0.8rem;color:var(--text-3);">📁 ' + escHtml(catName) + '</span>\
          <span style="font-size:0.8rem;color:var(--text-3);">🤖 ' + escHtml(toolsStr) + '</span>\
        </div>\
        <div style="font-size:0.8rem;color:var(--violet-light);">' + escHtml(tagsStr) + '</div>\
      </div>';

    document.body.appendChild(overlay);
  });

  /* ── Submit ─────────────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var title    = titleInput.value.trim();
    var text     = textInput.value.trim();
    var catId    = categorySel.value;
    var tools    = getSelectedTools();
    var auth     = window.TPG_AUTH;
    var db       = window.TPG_DB;

    // Validate
    if (!title) { shake(titleInput); return; }
    if (!text || text.length < 20) { shake(textInput); return; }
    if (!catId) { shake(categorySel); return; }

    if (!auth || !auth.currentUser) {
      window.showToast && window.showToast('Please sign in first.', '🔒');
      return;
    }

    if (!db) {
      window.showToast && window.showToast('Database not available. Try again.', '⚠');
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    var user = auth.currentUser;
    var catObj = framework ? framework.frameworkCategories.find(function (c) { return c.id === catId; }) : null;

    var submission = {
      title: title,
      prompt: text,
      preview: text.slice(0, 150),
      categoryId: catId,
      categoryName: catObj ? catObj.name : catId,
      tags: tags.slice(),
      aiTools: tools,
      authorUid: user.uid,
      authorEmail: user.email || '',
      authorName: user.displayName || 'Anonymous',
      status: 'pending',  // pending → approved / rejected
      likes: 0,
      copies: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('submissions').add(submission)
      .then(function (docRef) {
        console.info('[TPG Submit] Prompt submitted:', docRef.id);
        window.showToast && window.showToast('Prompt submitted successfully!', '🎉');
        showSuccess();
        form.reset();
        tags = [];
        renderTags();
        resetToolCheckboxes();
        titleCount.textContent = '0';
        textCount.textContent = '0';
        submitBtn.disabled = false;
        submitBtn.textContent = '✦ Submit Prompt';
      })
      .catch(function (err) {
        console.error('[TPG Submit] Error:', err);
        window.showToast && window.showToast('Submission failed: ' + err.message, '⚠');
        submitBtn.disabled = false;
        submitBtn.textContent = '✦ Submit Prompt';
      });
  });

  /* ── Submit Another ─────────────────────────────────── */
  if (submitAnother) {
    submitAnother.addEventListener('click', function () {
      showForm();
    });
  }

  /* ── Helpers ────────────────────────────────────────── */
  function escHtml(str) {
    return (str || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getSelectedTools() {
    var tools = [];
    if (aiToolsGrid) {
      aiToolsGrid.querySelectorAll('input:checked').forEach(function (cb) {
        tools.push(cb.value);
      });
    }
    return tools;
  }

  function resetToolCheckboxes() {
    if (aiToolsGrid) {
      aiToolsGrid.querySelectorAll('input').forEach(function (cb) { cb.checked = false; });
      aiToolsGrid.querySelectorAll('.ai-tool-checkbox').forEach(function (l) { l.classList.remove('checked'); });
    }
  }

  function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight; // trigger reflow
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    setTimeout(function () { el.style.animation = ''; }, 500);
  }

  /* ── Init ────────────────────────────────────────────── */
  checkAuth();

})();

