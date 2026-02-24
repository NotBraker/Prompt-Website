/* ============================================================
   THE PROMPT GENERATION — subprompts.js
   Renders 50 prompt templates on subprompts.html
   URL: subprompts.html?cat=cat-01&sub=3
   ============================================================ */

'use strict';

(function initSubpromptsPage() {
  const framework = window.PROMPT_MARKETPLACE_FRAMEWORK;
  const meta      = window.CATEGORY_META;

  if (!framework || !meta) {
    console.error('[TPG] Required data not loaded.');
    return;
  }

  /* ── URL params ──────────────────────────────────────── */
  const params = new URLSearchParams(window.location.search);
  const catId  = params.get('cat') || '';
  const subIdx = parseInt(params.get('sub') || '0', 10);

  /* ── Find category ───────────────────────────────────── */
  const allCats = [
    ...framework.frameworkCategories,
    ...framework.legacyCategories,
  ];
  const category = allCats.find(c => c.id === catId);

  /* ── Error: unknown category ─────────────────────────── */
  if (!category) {
    document.getElementById('pageHeaderContent').innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">🔍</div>
        <h3>Category not found</h3>
        <p>Could not find category "${escHtml(catId)}".</p>
        <a href="categories.html" class="btn btn--primary" style="margin-top:8px;">← All Categories</a>
      </div>`;
    document.getElementById('tplGrid').innerHTML = '';
    document.title = 'Not Found — The Prompt Generation';
    return;
  }

  /* ── Validate subcategory index ──────────────────────── */
  const subcatName = category.subcategories[subIdx];
  if (subcatName === undefined) {
    document.getElementById('pageHeaderContent').innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">🔍</div>
        <h3>Subcategory not found</h3>
        <p>Subcategory index ${subIdx} does not exist in "${escHtml(category.name)}".</p>
        <a href="subcategories.html?cat=${encodeURIComponent(catId)}" class="btn btn--primary" style="margin-top:8px;">← Back to Subcategories</a>
      </div>`;
    document.getElementById('tplGrid').innerHTML = '';
    return;
  }

  /* ── Category meta ───────────────────────────────────── */
  const m = meta[catId] || { emoji: '📁', color: '#7C3AED', rgb: '124,58,237', num: '?' };

  /* ── Apply accent CSS variable ───────────────────────── */
  document.documentElement.style.setProperty('--accent-rgb', m.rgb);

  /* ── Update page title ───────────────────────────────── */
  document.title = `${subcatName} — ${category.name} — The Prompt Generation`;

  /* ── Breadcrumb ──────────────────────────────────────── */
  const breadcrumbCat = document.getElementById('breadcrumbCat');
  const breadcrumbSub = document.getElementById('breadcrumbSub');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = category.name;
    breadcrumbCat.href = `subcategories.html?cat=${encodeURIComponent(catId)}`;
  }
  if (breadcrumbSub) breadcrumbSub.textContent = subcatName;

  /* ── Page header ─────────────────────────────────────── */
  document.getElementById('pageHeaderContent').innerHTML = `
    <div class="cat-hero">
      <div class="cat-hero__icon" aria-hidden="true">${m.emoji}</div>
      <div class="cat-hero__text">
        <h1 style="font-size:clamp(1.4rem,3.5vw,2.2rem);">${escHtml(subcatName)}</h1>
        <div class="cat-hero__meta">
          <span class="accent-pill">${escHtml(category.name)}</span>
          <span>📋 50 prompt templates</span>
          <span>🔢 Subcategory ${subIdx + 1} of ${category.subcategories.length}</span>
        </div>
      </div>
    </div>
  `;

  /* ── Back-to-subcat link ─────────────────────────────── */
  const backLink = document.getElementById('backToSubcat');
  if (backLink) {
    backLink.href = `subcategories.html?cat=${encodeURIComponent(catId)}`;
    backLink.textContent = `← Back to ${category.name} Subcategories`;
  }

  /* ── Info banner ─────────────────────────────────────── */
  const banner = document.getElementById('infoBanner');
  if (banner) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <strong>How to use these templates:</strong> Each prompt contains
      <strong>[BRACKETS]</strong> for your specific inputs. Copy the prompt,
      paste it into ChatGPT, Claude, or Gemini, then replace the bracketed
      placeholders with your real context. Every template follows the same
      proven structure: specialist framing → goal → output format → constraint → instructions.
    `;
  }

  /* ── Generate 50 templates ───────────────────────────── */
  const templates = window.generateFiftyTemplates(category.name, subcatName);

  /* ── Data pools for realistic card display ────────────── */
  const AI_TOOLS_POOL = [
    'ChatGPT', 'Claude', 'Gemini', 'GPT-4', 'Claude 3',
    'ChatGPT, Claude', 'Gemini, GPT-4', 'Claude 3 Opus',
    'ChatGPT 4o', 'Gemini Ultra',
  ];
  const RATINGS_POOL = [5.0,4.9,4.9,4.8,4.9,4.7,4.8,4.8,4.9,4.6,
                        4.8,4.7,4.9,5.0,4.8,4.7,4.9,4.8,4.6,4.9];
  const LIKES_POOL   = [142,89,234,56,178,312,67,445,123,289,
                        98,567,201,143,78,334,245,190,88,421,
                        156,223,399,112,267,184,45,523,167,345,
                        210,95,388,74,196,441,118,302,82,472];
  const COPIES_POOL  = [1247,892,2341,567,1789,3120,678,4450,1230,2890,
                        980,5670,2010,1430,780,3340,2450,1900,880,4210,
                        1560,2230,3990,1120,2670,1840,450,5230,1670,3450,
                        2100,950,3880,740,1960,4410,1180,3020,820,4720];

  /* ── Tag derivation from subcategory / category names ─── */
  const STOP_WORDS = new Set(['and','or','for','of','with','the','a','an','in','by','to','at','its','via']);
  function deriveTagWords(str) {
    return (str || '').split(/[\s&\/\-\+]+/)
      .map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
      .filter(w => w.length > 2 && !STOP_WORDS.has(w));
  }
  const allTagWords = [...new Set([...deriveTagWords(subcatName), ...deriveTagWords(category.name)])];

  function getCardTags(i) {
    const start = i % Math.max(1, allTagWords.length);
    const pool  = [...allTagWords.slice(start), ...allTagWords.slice(0, start)];
    return pool.slice(0, 3).concat(['template']).slice(0, 4);
  }

  function formatNum(n) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
  }

  /* ── Stable template IDs ─────────────────────────────── */
  function getTplId(i) {
    return `tpl_${catId}_${subIdx}_${i}`;
  }

  /* ── Goal / output titles for card titles ────────────── */
  const GOAL_TITLES = window.PROMPT_GOAL_TITLES || [
    'Strategy','Workflow','Audit','Learning Path','KPI Framework',
    'Risk Plan','Checklist & SOP','Stakeholder Brief','Roadmap','Troubleshooting Guide',
  ];
  const OUTPUT_TITLES = window.PROMPT_OUTPUT_TITLES || [
    'Executive Brief','Standard SOP','Priority Table','30-60-90 Plan','Template',
  ];

  /* ── Unified likes service ───────────────────────────── */
  const tplLikes = (window.TPG && window.TPG.likes) || null;

  /* ── Render template cards ───────────────────────────── */
  function renderTemplates() {
    const grid = document.getElementById('tplGrid');
    if (!grid) return;
    grid.setAttribute('aria-busy', 'false');

    grid.innerHTML = templates.map((tpl, i) => {
      const goalIdx   = Math.floor(i / 5);
      const outIdx    = i % 5;
      const goalTitle = GOAL_TITLES[goalIdx] || 'Strategy';
      const outTitle  = OUTPUT_TITLES[outIdx] || 'Brief';
      const title     = `${goalTitle} → ${outTitle}`;
      const rating    = RATINGS_POOL[i % RATINGS_POOL.length].toFixed(1);
      const aiTool    = AI_TOOLS_POOL[i % AI_TOOLS_POOL.length];
      const copies    = formatNum(COPIES_POOL[i % COPIES_POOL.length]);
      const likes     = LIKES_POOL[i % LIKES_POOL.length];
      const tags      = getCardTags(i);
      const tplId     = getTplId(i);
      const isLiked   = tplLikes ? tplLikes.isLiked(tplId) : false;

      return `
        <article class="prompt-card reveal"
                 data-idx="${i}"
                 data-tpl-id="${escHtml(tplId)}"
                 role="listitem"
                 aria-label="${escHtml(title)}">

          <!-- Row 1: category badge + star rating -->
          <div class="prompt-card__header">
            <span class="prompt-card__cat-badge"
                  style="background:rgba(${m.rgb},0.12);color:${m.color};border:1px solid rgba(${m.rgb},0.2);">
              ${m.emoji} ${escHtml(category.name)}
            </span>
            <span class="prompt-card__rating">⭐ ${rating}</span>
          </div>

          <!-- Row 2: title -->
          <h3 class="prompt-card__title">${escHtml(title)}</h3>

          <!-- Row 3: prompt preview (dark code box) -->
          <div class="prompt-card__preview">${escHtml(tpl)}</div>

          <!-- Row 4: tags -->
          <div class="prompt-card__tags">
            ${tags.map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>

          <!-- Row 5: footer — meta left, actions right -->
          <div class="prompt-card__footer">
            <div class="prompt-card__meta">
              <span>📋 ${copies}</span>
              <span class="prompt-card__ai-badge">🤖 ${escHtml(aiTool)}</span>
              <button class="btn btn--sm btn--ghost tpl-like-btn${isLiked ? ' liked' : ''}"
                      data-idx="${i}"
                      data-tpl-id="${escHtml(tplId)}"
                      aria-label="${isLiked ? 'Unlike' : 'Like'} this prompt"
                      style="${isLiked ? 'color:#EC4899;' : ''}">
                ${isLiked ? '❤️' : '🤍'} <span class="tpl-like-count">${formatNum(likes + (isLiked ? 1 : 0))}</span>
              </button>
            </div>
            <button class="btn btn--sm btn--primary tpl-card__copy"
                    data-idx="${i}">
              📋 Copy
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Stagger reveal
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 18);
      });
    });

    bindCardEvents();
  }

  /* ── Build full prompt data object for saving ────────── */
  function buildPromptData(i) {
    const goalIdx  = Math.floor(i / 5);
    const outIdx   = i % 5;
    const goalTitle = (GOAL_TITLES[goalIdx] || 'Strategy');
    const outTitle  = (OUTPUT_TITLES[outIdx] || 'Brief');
    const tpl       = templates[i];
    const rating    = RATINGS_POOL[i % RATINGS_POOL.length];
    const aiTool    = AI_TOOLS_POOL[i % AI_TOOLS_POOL.length];
    const tags      = getCardTags(i);

    return {
      id      : getTplId(i),
      type    : 'template',
      title   : `${goalTitle} → ${outTitle}`,
      preview : tpl.slice(0, 200) + (tpl.length > 200 ? '...' : ''),
      prompt  : tpl,
      catId   : catId,
      catName : category.name,
      emoji   : m.emoji,
      tags    : tags,
      rating  : rating,
      aiTool  : aiTool,
    };
  }

  /* ── Bind events ─────────────────────────────────────── */
  function bindCardEvents() {
    const grid = document.getElementById('tplGrid');
    if (!grid) return;

    // Copy buttons
    grid.querySelectorAll('.tpl-card__copy').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        window.copyText(templates[idx], btn);
      });
    });

    // Like buttons
    grid.querySelectorAll('.tpl-like-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const idx      = parseInt(btn.dataset.idx, 10);
        const tplId    = btn.dataset.tplId;
        const base     = LIKES_POOL[idx % LIKES_POOL.length];
        const countEl  = btn.querySelector('.tpl-like-count');

        if (tplLikes) {
          const wasLiked = tplLikes.isLiked(tplId);
        if (wasLiked) {
            tplLikes.unlike(tplId);
          btn.classList.remove('liked');
          btn.style.color = '';
            btn.innerHTML = `🤍 <span class="tpl-like-count">${formatNum(base)}</span>`;
            btn.setAttribute('aria-label', 'Like this prompt');
        } else {
            tplLikes.like(tplId, buildPromptData(idx));
          btn.classList.add('liked');
          btn.style.color = '#EC4899';
            btn.innerHTML = `❤️ <span class="tpl-like-count">${formatNum(base + 1)}</span>`;
            btn.setAttribute('aria-label', 'Unlike this prompt');
            window.showToast && window.showToast('Saved to your account ❤️', '❤');
        }
        } else {
          // Fallback: simple visual toggle (no persistence)
          const isNowLiked = btn.classList.toggle('liked');
          btn.style.color = isNowLiked ? '#EC4899' : '';
          btn.innerHTML = `${isNowLiked ? '❤️' : '🤍'} <span class="tpl-like-count">${formatNum(base + (isNowLiked ? 1 : 0))}</span>`;
        }
      });
    });

    // Card click → open modal (not if a button was clicked)
    grid.querySelectorAll('.prompt-card[data-idx]').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        openModal(parseInt(card.dataset.idx, 10));
      });
    });
  }

  /* ── Modal ───────────────────────────────────────────── */
  function openModal(idx) {
    const tpl       = templates[idx];
    const goalTitle = GOAL_TITLES[Math.floor(idx / 5)] || 'Strategy';
    const outTitle  = OUTPUT_TITLES[idx % 5] || 'Brief';
    const title     = `${goalTitle} → ${outTitle}`;
    const tplId     = getTplId(idx);
    const isLiked   = tplLikes ? tplLikes.isLiked(tplId) : false;
    const likes     = LIKES_POOL[idx % LIKES_POOL.length];

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);

    overlay.innerHTML = `
      <div class="modal modal--accented">
        <div class="modal__header">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="
                font-size:0.65rem;font-weight:800;letter-spacing:0.05em;
                background:rgba(${m.rgb},0.12);color:rgb(${m.rgb});
                border:1px solid rgba(${m.rgb},0.25);
                border-radius:var(--r-full);padding:2px 9px;">
                #${String(idx + 1).padStart(2, '0')}
              </span>
              <span style="font-size:0.75rem;color:var(--text-3);">${escHtml(category.name)} › ${escHtml(subcatName)}</span>
            </div>
            <h2 style="font-size:1.05rem;color:var(--text-0);line-height:1.3;">${escHtml(title)}</h2>
          </div>
          <button class="modal__close" id="modalClose" aria-label="Close">✕</button>
        </div>

        <div class="modal__body">
          <p style="font-size:0.75rem;color:var(--text-3);margin-bottom:10px;">
            Click the text to select all · Replace <strong>[BRACKETS]</strong> with your details
          </p>
          <div class="modal__prompt-text" id="modalTplText">${escHtml(tpl)}</div>
        </div>

        <div class="modal__footer">
          <button class="btn btn--primary btn--lg" id="modalCopyBtn" style="flex:1;">
            📋 Copy Full Template
          </button>
          <button class="btn btn--ghost modal-like-btn${isLiked ? ' liked' : ''}"
                  id="modalLikeBtn"
                  data-tpl-id="${escHtml(tplId)}"
                  data-idx="${idx}"
                  style="${isLiked ? 'color:#EC4899;' : ''}">
            ${isLiked ? '❤️' : '🤍'} ${formatNum(likes + (isLiked ? 1 : 0))}
          </button>
          <button class="btn btn--ghost modal__close-btn">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Click text → select all
    const textEl = overlay.querySelector('#modalTplText');
    if (textEl) {
      textEl.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNodeContents(textEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }

    // Copy button
    overlay.querySelector('#modalCopyBtn').addEventListener('click', () => {
      window.copyText(tpl, overlay.querySelector('#modalCopyBtn'));
    });

    // Like button in modal
    const modalLikeBtn = overlay.querySelector('#modalLikeBtn');
    if (modalLikeBtn && tplLikes) {
      modalLikeBtn.addEventListener('click', () => {
        const wasLiked = tplLikes.isLiked(tplId);
        if (wasLiked) {
          tplLikes.unlike(tplId);
          modalLikeBtn.classList.remove('liked');
          modalLikeBtn.style.color = '';
          modalLikeBtn.innerHTML = `🤍 ${formatNum(likes)}`;
        } else {
          tplLikes.like(tplId, buildPromptData(idx));
          modalLikeBtn.classList.add('liked');
          modalLikeBtn.style.color = '#EC4899';
          modalLikeBtn.innerHTML = `❤️ ${formatNum(likes + 1)}`;
          window.showToast && window.showToast('Saved to your account ❤️', '❤');
        }
        // Sync the card button in the grid
        const cardBtn = document.querySelector(`.tpl-like-btn[data-tpl-id="${tplId}"]`);
        if (cardBtn) {
          const isNowLiked = !wasLiked;
          cardBtn.classList.toggle('liked', isNowLiked);
          cardBtn.style.color = isNowLiked ? '#EC4899' : '';
          cardBtn.innerHTML = `${isNowLiked ? '❤️' : '🤍'} <span class="tpl-like-count">${formatNum(likes + (isNowLiked ? 1 : 0))}</span>`;
        }
      });
    }

    function close() {
      overlay.style.animation = 'fadeIn 0.15s ease reverse forwards';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 150);
    }

    overlay.querySelector('#modalClose').addEventListener('click', close);
    overlay.querySelector('.modal__close-btn').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    overlay.querySelector('#modalClose').focus();
  }

  /* ── Sibling navigation (prev / next subcategory) ─────── */
  function renderSiblingNav() {
    const prevBtn  = document.getElementById('prevSubcat');
    const nextBtn  = document.getElementById('nextSubcat');

    if (subIdx > 0 && prevBtn) {
      const prevName = category.subcategories[subIdx - 1];
      prevBtn.style.display = 'inline-flex';
      prevBtn.textContent   = `← ${prevName}`;
      prevBtn.href = `subprompts.html?cat=${encodeURIComponent(catId)}&sub=${subIdx - 1}`;
    }

    if (subIdx < category.subcategories.length - 1 && nextBtn) {
      const nextName = category.subcategories[subIdx + 1];
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent   = `${nextName} →`;
      nextBtn.href = `subprompts.html?cat=${encodeURIComponent(catId)}&sub=${subIdx + 1}`;
    }
  }

  /* ── Helper ──────────────────────────────────────────── */
  function escHtml(str) {
    return (str || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Run ─────────────────────────────────────────────── */
  renderTemplates();
  renderSiblingNav();

  /* ── Update results label ────────────────────────────── */
  const tplCount = document.getElementById('tplCount');
  if (tplCount) {
    tplCount.textContent = `50 prompt templates for "${subcatName}"`;
  }
})();
