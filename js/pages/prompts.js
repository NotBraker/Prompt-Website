/* ============================================================
   THE PROMPT GENERATION — Prompts Page JavaScript v2
   Dual mode:
     "all"           → shows curated prompt cards (original behaviour)
     any category ID → shows 25 subcategory cards (linked to subprompts.html)
   ============================================================ */

'use strict';

/* ── State ───────────────────────────────────────────────── */
const state = {
  activeCategory: 'all',
  searchQuery:    '',
  sortBy:         'popular',
  viewMode:       'grid',
  page:           1,
  perPage:        9,
};

/* ── Framework helpers ───────────────────────────────────── */
function getFrameworkCats() {
  const fw = window.PROMPT_MARKETPLACE_FRAMEWORK;
  if (!fw) return [];
  return [...fw.frameworkCategories, ...fw.legacyCategories];
}

function getCatMeta(id) {
  return (window.CATEGORY_META || {})[id] || { emoji: '📁', rgb: '124,58,237', num: '?' };
}

/* ── Generic helpers ─────────────────────────────────────── */
function formatNum(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
}

function esc(s) {
  return (s || '').toString()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Mode flag ───────────────────────────────────────────── */
function isSubcatMode() { return state.activeCategory !== 'all'; }

/* ────────────────────────────────────────────────────────────
   FILTER CHIPS
   All Prompts  +  15 framework  +  4 legacy
────────────────────────────────────────────────────────────── */
function renderFilters() {
  const container = document.getElementById('filterChips');
  if (!container) return;

  const frameworkCats = getFrameworkCats();

  // "All Prompts" chip (no count — landing state shows category picker)
  const allChip = `
    <button class="filter-chip${state.activeCategory === 'all' ? ' active' : ''}"
            data-cat="all" aria-pressed="${state.activeCategory === 'all'}">
      ✨ All Prompts
    </button>`;

  // One chip per category (15 framework + 4 legacy)
  const catChips = frameworkCats.map(cat => {
    const m = getCatMeta(cat.id);
    const active = state.activeCategory === cat.id;
    return `
      <button class="filter-chip${active ? ' active' : ''}"
              data-cat="${cat.id}" aria-pressed="${active}">
        ${m.emoji} ${cat.name} <span class="filter-chip__count">25</span>
      </button>`;
  }).join('');

  container.innerHTML = allChip + catChips;

  // Bind click
  container.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.cat;
      state.page           = 1;
      state.searchQuery    = '';
      const si = document.getElementById('searchInput');
      if (si) si.value = '';
      renderFilters();
      renderGrid();
    });
  });
}

/* ────────────────────────────────────────────────────────────
   DATA — curated prompts (all-prompts mode)
────────────────────────────────────────────────────────────── */
function getFilteredPrompts() {
  let data = window.PROMPTS_DATA || [];
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    data = data.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.preview.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      (p.aiTool || '').toLowerCase().includes(q)
    );
  }
  const sorts = {
    popular: (a, b) => b.copies - a.copies,
    likes:   (a, b) => b.likes  - a.likes,
    rating:  (a, b) => b.rating - a.rating,
    newest:  (a, b) => b.id     - a.id,
  };
  return [...data].sort(sorts[state.sortBy] || sorts.popular);
}

/* ────────────────────────────────────────────────────────────
   DATA — subcategories (category mode)
────────────────────────────────────────────────────────────── */
function getFilteredSubcats() {
  const cat = getFrameworkCats().find(c => c.id === state.activeCategory);
  if (!cat) return [];
  let list = cat.subcategories.map((name, i) => ({ name, index: i }));
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q));
  }
  return list;
}

/* ────────────────────────────────────────────────────────────
   TAG DERIVATION & RATINGS
────────────────────────────────────────────────────────────── */
const STOP_WORDS = new Set(['and','or','for','of','with','the','a','an','in','by','to','at','on','its','via']);

function deriveTags(name) {
  return name.split(/[\s&\/\-\+]+/)
    .map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 3);
}

const RATINGS_POOL = [5.0, 4.9, 4.9, 4.8, 4.9, 4.7, 4.8, 4.8, 4.9, 4.6,
                      4.8, 4.7, 4.9, 5.0, 4.8, 4.7, 4.9, 4.8, 4.6, 4.9,
                      4.7, 4.8, 4.9, 4.8, 4.7];
function getRating(i) { return RATINGS_POOL[i % RATINGS_POOL.length]; }

// Deterministic "varied" prompt count per subcategory index (32–78)
const COUNTS_POOL = [54,67,42,73,38,61,55,48,70,36,65,52,78,44,59,
                     47,63,57,35,72,50,66,41,75,53,46,68,39,62,58,
                     76,43,71,37,64,56,49,74,40,60];
function getSubCount(i) { return COUNTS_POOL[i % COUNTS_POOL.length]; }

/* ────────────────────────────────────────────────────────────
   RENDER — subcategory tile (clean rounded square, no buttons)
────────────────────────────────────────────────────────────── */
function renderSubcatCard(subcat, catId, catName, m, delay) {
  const href  = `subprompts.html?cat=${encodeURIComponent(catId)}&sub=${subcat.index}`;
  const num   = String(subcat.index + 1).padStart(2, '0');
  const count = getSubCount(subcat.index);

  return `
    <a class="subcat-tile reveal"
       href="${esc(href)}"
       style="--tile-rgb:${m.rgb};"
       role="listitem"
       aria-label="${esc(subcat.name)} — ${count} prompt templates">
      <span class="subcat-tile__num">${num}</span>
      <div class="subcat-tile__body">
        <span class="subcat-tile__name">${esc(subcat.name)}</span>
        <span class="subcat-tile__count">${count} prompts</span>
      </div>
      <span class="subcat-tile__arrow">→</span>
    </a>`;
}

/* ────────────────────────────────────────────────────────────
   RENDER — curated prompt card (unified design)
────────────────────────────────────────────────────────────── */
function renderCard(prompt, delay) {
  const tplLikes = window.TPG && window.TPG.likes;
  const isLiked  = tplLikes ? tplLikes.isLiked(prompt.id) : false;
  const allMeta = window.CATEGORY_META || {};

  // Match category meta by short name (PROMPTS_DATA uses plain category string)
  let mEntry = {};
  for (const v of Object.values(allMeta)) {
    if ((v.short || v.name || '').toLowerCase() === (prompt.category || '').toLowerCase()) {
      mEntry = v; break;
    }
  }
  const rgb     = mEntry.rgb   || '124,58,237';
  const color   = mEntry.color || '#7c3aed';
  const emoji   = mEntry.emoji || prompt.categoryEmoji || '📁';
  const catName = mEntry.short || mEntry.name || prompt.category || '';
  const rating  = (prompt.rating || 4.8).toFixed(1);

  return `
    <article class="prompt-card reveal"
             style="transition-delay:${delay * 0.06}s"
             data-id="${prompt.id}"
             role="listitem">

      <div class="prompt-card__header">
        <span class="prompt-card__cat-badge"
              style="background:rgba(${rgb},0.12);color:${color};border:1px solid rgba(${rgb},0.2);">
          ${emoji} ${esc(catName)}
        </span>
        <span class="prompt-card__rating">⭐ ${rating}</span>
      </div>

      <h3 class="prompt-card__title">${esc(prompt.title)}</h3>
      <div class="prompt-card__preview">${esc(prompt.preview)}</div>

      <div class="prompt-card__tags">
        ${(prompt.tags || []).slice(0, 4).map(t => `<span class="tag">#${t}</span>`).join('')}
      </div>

      <div class="prompt-card__footer">
        <div class="prompt-card__meta">
          <span title="Times copied">📋 ${formatNum(prompt.copies || 0)}</span>
          <span class="prompt-card__ai-badge">🤖 ${esc(prompt.aiTool || 'ChatGPT')}</span>
        </div>
        <div class="prompt-card__actions">
          <button class="btn btn--sm btn--ghost like-btn${isLiked ? ' liked' : ''}"
                  data-id="${prompt.id}"
                  title="${isLiked ? 'Unlike' : 'Like'} this prompt"
                  style="${isLiked ? 'color:#EC4899;' : ''}">
            ${isLiked ? '❤️' : '🤍'}
            <span class="like-count">${formatNum((prompt.likes || 0) + (isLiked ? 1 : 0))}</span>
          </button>
          <button class="btn btn--sm btn--ghost btn-expand"
                  data-id="${prompt.id}" title="View full prompt">↗</button>
          <button class="btn btn--sm btn--primary btn-copy"
                  data-id="${prompt.id}" title="Copy prompt">
            📋 Copy
          </button>
        </div>
      </div>
    </article>`;
}

/* ────────────────────────────────────────────────────────────
   MAIN RENDER
────────────────────────────────────────────────────────────── */
function renderGrid() {
  const grid        = document.getElementById('promptsGrid');
  const countEl     = document.getElementById('resultsCount');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn  = document.getElementById('loadMoreBtn');
  const subtitleEl   = document.querySelector('.page-header__sub');
  if (!grid) return;

  grid.setAttribute('aria-busy', 'false');

  /* Toggle grid layout class based on mode */
  if (isSubcatMode()) {
    grid.classList.add('subcat-grid');
  } else {
    grid.classList.remove('subcat-grid');
  }

  /* ────────────────────────────────────
     SUBCATEGORY MODE
  ──────────────────────────────────── */
  if (isSubcatMode()) {
    const cat = getFrameworkCats().find(c => c.id === state.activeCategory);
    const m   = getCatMeta(state.activeCategory);

    // Dynamic subtitle
    if (subtitleEl && cat) {
      subtitleEl.innerHTML =
        `<strong style="color:rgb(${m.rgb});">${m.emoji} ${cat.name}</strong>` +
        ` — 25 subcategories, 50 prompt templates each.` +
        ` <strong style="color:var(--text-1);">Click any card to browse.</strong>`;
    }

    const subcats   = getFilteredSubcats();
    const paged     = subcats.slice(0, state.page * state.perPage);
    const hasMore   = paged.length < subcats.length;

    if (countEl) {
      countEl.innerHTML = subcats.length
        ? `Showing <strong>${paged.length}</strong> of <strong>${subcats.length}</strong> subcategories`
        : 'No subcategories match your search';
    }

    if (subcats.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h3>No subcategories found</h3>
          <p>Try a different search term.</p>
          <button class="btn btn--secondary" onclick="clearSearch()">Clear search</button>
        </div>`;
    } else {
      grid.innerHTML = paged
        .map((s, i) => renderSubcatCard(s, state.activeCategory, cat ? cat.name : '', m, i))
        .join('');

      // Reveal all at once — no stagger
      requestAnimationFrame(() => {
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      });

      // Tiles are <a> tags — native navigation, no JS needed.
    }

    if (loadMoreWrap) loadMoreWrap.style.display = hasMore ? 'block' : 'none';
    if (loadMoreBtn && hasMore) {
      loadMoreBtn.innerHTML = `Load More <span style="opacity:0.6;font-size:0.8em;">(${subcats.length - paged.length} remaining)</span>`;
      loadMoreBtn.disabled  = false;
    }

  /* ────────────────────────────────────
     ALL PROMPTS MODE — category picker + featured prompts
  ──────────────────────────────────── */
  } else {
    const q = state.searchQuery.trim().toLowerCase();

    if (subtitleEl) {
      subtitleEl.innerHTML = q
        ? `Results for <strong style="color:var(--text-0);">"${q}"</strong> &nbsp;<button class="btn btn--ghost btn--sm" onclick="clearSearch()" style="font-size:0.78rem;padding:3px 10px;margin-left:4px;">✕ Clear</button>`
        : `Choose a <strong style="color:var(--text-1);">category below</strong> to browse its 25 subcategories — or copy a featured prompt straight from the page.`;
    }

    if (loadMoreWrap) loadMoreWrap.style.display = 'none';

    const frameworkCats  = getFrameworkCats();
    const meta           = window.CATEGORY_META || {};
    const featuredAll    = (window.FEATURED_PROMPTS || []);
    const tplLikes       = window.TPG && window.TPG.likes;

    /* ── Filtered sets respecting live search ── */
    const dispCats = q
      ? frameworkCats.filter(c =>
          c.name.toLowerCase().includes(q) ||
          (c.subcategories || []).some(s =>
            (typeof s === 'string' ? s : (s.name || '')).toLowerCase().includes(q)
          )
        )
      : frameworkCats;

    const dispFeatured = q
      ? featuredAll.filter(fp =>
          fp.title.toLowerCase().includes(q) ||
          fp.preview.toLowerCase().includes(q) ||
          (fp.category || '').toLowerCase().includes(q) ||
          (fp.tags || []).some(t => t.toLowerCase().includes(q)) ||
          (fp.aiTool || '').toLowerCase().includes(q)
        )
      : featuredAll;

    /* ── Results count ── */
    if (countEl) {
      countEl.innerHTML = q
        ? `Found <strong>${dispFeatured.length}</strong> prompt${dispFeatured.length !== 1 ? 's' : ''} and <strong>${dispCats.length}</strong> categor${dispCats.length !== 1 ? 'ies' : 'y'}`
        : '';
    }

    /* ── Empty search state ── */
    if (q && dispCats.length === 0 && dispFeatured.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h3>No results for "${q}"</h3>
          <p>Try a different keyword, or browse all categories.</p>
          <button class="btn btn--secondary" onclick="clearSearch()">Browse All</button>
        </div>`;
      return;
    }

    /* ── Build star rating HTML ── */
    function starHtml(rating) {
      const full = Math.floor(rating);
      const half = rating - full >= 0.5;
      let s = '';
      for (let i = 0; i < 5; i++) {
        if (i < full) s += '<span style="color:#f59e0b;">★</span>';
        else if (i === full && half) s += '<span style="color:#f59e0b;opacity:0.6;">★</span>';
        else s += '<span style="color:var(--border-2);">★</span>';
      }
      return s;
    }

    /* ── Render featured card HTML ── */
    function fpCardHtml(fp, idx) {
      const m       = meta[fp.catId] || { emoji: '📁', rgb: '124,58,237', color: '#7c3aed' };
      const catName = m.short || m.name || fp.catId || '';
      const isLk    = tplLikes ? tplLikes.isLiked(fp.id) : false;
      const rating  = (fp.rating || 4.8).toFixed(1);

      return `
        <article class="prompt-card reveal fp-card-clickable"
                 data-fp-id="${fp.id}">

          <div class="prompt-card__header">
            <span class="prompt-card__cat-badge"
                  style="background:rgba(${m.rgb},0.12);color:${m.color};border:1px solid rgba(${m.rgb},0.2);">
              ${m.emoji} ${esc(catName)}
            </span>
            <span class="prompt-card__rating">⭐ ${rating}</span>
          </div>

          <h3 class="prompt-card__title">${esc(fp.title)}</h3>
          <div class="prompt-card__preview">${esc(fp.preview)}</div>

          <div class="prompt-card__tags">
            ${(fp.tags || []).slice(0, 3).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>

          <div class="prompt-card__footer">
            <div class="prompt-card__meta">
              <span>📋 ${formatNum(fp.copies || 0)}</span>
              <span class="prompt-card__ai-badge">🤖 ${esc((fp.aiTool || 'ChatGPT').split(',')[0].trim())}</span>
            </div>
            <div class="prompt-card__actions">
              <button class="btn btn--sm btn--ghost fp-like-btn${isLk ? ' liked' : ''}"
                      data-fp-id="${fp.id}"
                      style="${isLk ? 'color:#EC4899;' : ''}">
                ${isLk ? '❤️' : '🤍'} <span class="fp-like-count">${formatNum((fp.likes || 0) + (isLk ? 1 : 0))}</span>
              </button>
              <button class="btn btn--sm btn--ghost fp-expand-btn"
                      data-fp-id="${fp.id}" title="View full prompt">↗</button>
              <button class="btn btn--sm btn--primary fp-copy-btn"
                      data-fp-id="${fp.id}">📋 Copy</button>
            </div>
          </div>
        </article>`;
    }

    /* ── Build complete inner HTML ── */
    grid.innerHTML = `
      <!-- Category quick-pick -->
      <div style="
        grid-column: 1 / -1;
        display: ${dispCats.length > 0 ? 'flex' : 'none'};
        flex-direction: column;
        align-items: center;
        gap: 32px;
        padding: 16px 0 40px;
        border-bottom: 1px solid var(--border-2);
        margin-bottom: 8px;
      ">
        ${!q ? `<div style="text-align:center;max-width:560px;">
          <div style="font-size:2.5rem;margin-bottom:14px;">🗂️</div>
          <h2 style="font-size:1.4rem;font-weight:700;color:var(--text-0);margin-bottom:8px;letter-spacing:-0.02em;">
            Browse by Category
          </h2>
          <p style="color:var(--text-3);font-size:0.85rem;line-height:1.7;">
            19 expert domains · 25 subcategories each · 50 templates per subcategory.
            <strong style="color:var(--text-2);">23,750 total templates</strong>.
          </p>
        </div>` : `<div style="align-self:flex-start;">
          <h3 style="font-size:1rem;font-weight:700;color:var(--text-0);margin:0 0 0 4px;letter-spacing:-0.01em;">
            📂 Matching Categories <span style="font-size:0.8rem;color:var(--text-3);font-weight:400;">(${dispCats.length})</span>
          </h3>
        </div>`}

        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
          width: 100%;
          max-width: 1100px;
        ">
          ${dispCats.map((cat, i) => {
            const m = meta[cat.id] || { emoji: '📁', rgb: '124,58,237', desc: '' };
            return `
              <button
                class="pick-cat-btn reveal"
                data-cat="${cat.id}"
                style="
                  transition-delay:${i * 0.025}s;
                  display:flex;flex-direction:column;align-items:flex-start;gap:10px;
                  padding:20px 18px;
                  background:var(--bg-card);
                  border:1px solid var(--border-2);
                  border-radius:var(--r-xl);
                  cursor:pointer;
                  color:var(--text-1);
                  font-family:var(--font-display);
                  text-align:left;
                  transition:all var(--t-base);
                  min-height:140px;
                "
                onmouseover="this.style.borderColor='rgba(${m.rgb},0.45)';this.style.background='var(--bg-card-hover)';this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 28px rgba(0,0,0,0.3),0 0 32px rgba(${m.rgb},0.1)'"
                onmouseout="this.style.borderColor='';this.style.background='var(--bg-card)';this.style.transform='';this.style.boxShadow=''"
              >
                <span style="
                  width:44px;height:44px;border-radius:12px;flex-shrink:0;
                  display:flex;align-items:center;justify-content:center;font-size:1.4rem;
                  background:rgba(${m.rgb},0.13);border:1px solid rgba(${m.rgb},0.22);
                ">${m.emoji}</span>
                <span style="font-size:0.9rem;font-weight:700;color:var(--text-0);line-height:1.3;">${cat.name}</span>
                ${m.desc ? `<span style="font-size:0.75rem;color:var(--text-3);line-height:1.55;font-family:var(--font-body);font-weight:400;">${m.desc}</span>` : ''}
              </button>`;
          }).join('')}
        </div>
      </div>

      <!-- Featured prompts heading -->
      ${dispFeatured.length > 0 ? `<div style="grid-column:1/-1;padding:8px 0 4px;">
        <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
          <h2 style="font-size:1.25rem;font-weight:700;color:var(--text-0);letter-spacing:-0.02em;margin:0;">
            ${q ? `⚡ Matching Prompts <span style="font-size:0.8rem;color:var(--text-3);font-weight:400;">(${dispFeatured.length})</span>` : '⭐ Featured Prompts'}
          </h2>
          ${!q ? `<span style="font-size:0.8rem;color:var(--text-3);">Hand-picked highlights from every category — copy-ready</span>` : ''}
        </div>
      </div>` : ''}

      <!-- Featured prompt cards -->
      ${dispFeatured.map((fp, i) => fpCardHtml(fp, i)).join('')}
    `;

    /* ── Stagger reveal ── */
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) =>
        setTimeout(() => el.classList.add('visible'), i * 22)
      );
    });

    /* ── Category tile clicks ── */
    grid.querySelectorAll('.pick-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.dataset.cat;
        state.page           = 1;
        renderFilters();
        renderGrid();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    /* ── Featured: Card click → open modal ── */
    grid.querySelectorAll('.fp-card-clickable').forEach(card => {
      card.addEventListener('click', e => {
        // Don't open if a button was the actual target
        if (e.target.closest('button')) return;
        const fp = featuredAll.find(x => x.id === card.dataset.fpId);
        if (fp) openFpModal(fp);
      });
    });

    /* ── Featured: Copy ── */
    grid.querySelectorAll('.fp-copy-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const fp = featuredAll.find(x => x.id === btn.dataset.fpId);
        if (fp) window.copyText(fp.prompt, btn);
      });
    });

    /* ── Featured: Expand modal ── */
    grid.querySelectorAll('.fp-expand-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const fp = featuredAll.find(x => x.id === btn.dataset.fpId);
        if (!fp) return;
        openFpModal(fp);
      });
    });

    /* ── Featured: Like toggle ── */
    grid.querySelectorAll('.fp-like-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const fpId = btn.dataset.fpId;
        const fp   = featuredAll.find(x => x.id === fpId);
        if (!fp) return;

        if (tplLikes) {
          const was = tplLikes.isLiked(fpId);
        if (was) {
            tplLikes.unlike(fpId);
          btn.innerHTML = `🤍 <span class="fp-like-count">${formatNum(fp.likes || 0)}</span>`;
          btn.classList.remove('liked');
          btn.style.color = '';
        } else {
            const m = meta[fp.catId] || {};
            tplLikes.like(fpId, {
              id      : fpId,
              type    : 'featured',
              title   : fp.title,
              preview : fp.preview,
              prompt  : fp.prompt,
              catId   : fp.catId || '',
              catName : m.name || m.short || fp.catId || '',
              emoji   : m.emoji || '⚡',
              tags    : fp.tags || [],
              rating  : fp.rating || 4.8,
              aiTool  : fp.aiTool || 'ChatGPT',
            });
          btn.innerHTML = `❤️ <span class="fp-like-count">${formatNum((fp.likes || 0) + 1)}</span>`;
          btn.classList.add('liked');
          btn.style.color = '#EC4899';
            window.showToast && window.showToast('Saved to your account ❤️', '❤');
          }
        } else {
          // Fallback: visual-only toggle
          const isNow = btn.classList.toggle('liked');
          btn.style.color = isNow ? '#EC4899' : '';
          btn.innerHTML = `${isNow ? '❤️' : '🤍'} <span class="fp-like-count">${formatNum((fp.likes || 0) + (isNow ? 1 : 0))}</span>`;
        }
      });
    });
  }
}

/* ────────────────────────────────────────────────────────────
   FEATURED PROMPT MODAL
────────────────────────────────────────────────────────────── */
function openFpModal(fp) {
  const modal   = document.getElementById('promptModal');
  const overlay = document.getElementById('modalOverlay');
  if (!modal || !overlay) return;

  const meta = window.CATEGORY_META || {};
  const m    = meta[fp.catId] || { emoji: '📁', color: '#7c3aed', name: fp.catId };

  modal.querySelector('#modalTitle').textContent         = fp.title;
  modal.querySelector('#modalCategory').textContent      = `${m.emoji} ${m.name}`;
  modal.querySelector('#modalCategory').style.color      = m.color || 'var(--accent)';
  modal.querySelector('#modalCategory').style.borderColor= m.color || 'var(--accent)';
  modal.querySelector('#modalPromptText').textContent    = fp.prompt;
  modal.querySelector('#modalRating').textContent        = `${fp.rating || '4.8'} ★`;
  modal.querySelector('#modalCopies').textContent        = `${formatNum(fp.copies || 0)} copies`;
  modal.querySelector('#modalAiTool').textContent        = fp.aiTool || 'ChatGPT';

  const tagsEl = modal.querySelector('#modalTags');
  if (tagsEl) {
    tagsEl.innerHTML = (fp.tags || []).map(t =>
      `<span class="modal-tag">${t}</span>`
    ).join('');
  }

  const copyBtn = modal.querySelector('#modalCopyBtn');
  if (copyBtn) {
    copyBtn.onclick = () => window.copyText(fp.prompt, copyBtn);
  }

  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ────────────────────────────────────────────────────────────
   CARD EVENTS (curated prompts)
────────────────────────────────────────────────────────────── */
function bindCardEvents() {
  const grid = document.getElementById('promptsGrid');
  if (!grid) return;

  grid.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = (window.PROMPTS_DATA || []).find(x => x.id === parseInt(btn.dataset.id, 10));
      if (p) window.copyText(p.prompt, btn);
    });
  });

  grid.querySelectorAll('.btn-expand').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(parseInt(btn.dataset.id, 10));
    });
  });

  grid.querySelectorAll('.prompt-card[data-id]').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id, 10)));
  });

  grid.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleLike(parseInt(btn.dataset.id, 10), btn);
    });
  });
}

/* ────────────────────────────────────────────────────────────
   LIKE TOGGLE
────────────────────────────────────────────────────────────── */
function toggleLike(id, btn) {
  const p        = (window.PROMPTS_DATA || []).find(x => x.id === id);
  if (!p) return;
  const tplLikes = window.TPG && window.TPG.likes;
  const strId    = String(id);

  if (tplLikes) {
    const was = tplLikes.isLiked(strId);
  if (was) {
      tplLikes.unlike(strId);
    btn.innerHTML = `🤍 <span class="like-count">${formatNum(p.likes)}</span>`;
    btn.classList.remove('liked');
    btn.style.color = '';
  } else {
      const allMeta = window.CATEGORY_META || {};
      let m = {};
      for (const v of Object.values(allMeta)) {
        if ((v.short || v.name || '').toLowerCase() === (p.category || '').toLowerCase()) {
          m = v; break;
        }
      }
      tplLikes.like(strId, {
        id      : strId,
        type    : 'featured',
        title   : p.title,
        preview : p.preview,
        prompt  : p.prompt,
        catId   : p.catId || '',
        catName : m.name || m.short || p.category || '',
        emoji   : m.emoji || p.categoryEmoji || '⚡',
        tags    : p.tags || [],
        rating  : p.rating || 4.8,
        aiTool  : p.aiTool || 'ChatGPT',
      });
    btn.innerHTML = `❤️ <span class="like-count">${formatNum(p.likes + 1)}</span>`;
    btn.classList.add('liked');
    btn.style.color = '#EC4899';
      window.showToast && window.showToast('Saved to your account ❤️', '❤');
  }
  } else {
    // Fallback: visual-only
    const was = btn.classList.toggle('liked');
    btn.innerHTML = `${was ? '❤️' : '🤍'} <span class="like-count">${formatNum(p.likes + (was ? 1 : 0))}</span>`;
    btn.style.color = was ? '#EC4899' : '';
  }
}

/* ────────────────────────────────────────────────────────────
   CLEAR SEARCH
────────────────────────────────────────────────────────────── */
window.clearSearch = function () {
  state.searchQuery    = '';
  state.activeCategory = 'all';
  state.page           = 1;
  const si = document.getElementById('searchInput');
  if (si) si.value = '';
  renderFilters();
  renderGrid();
};

/* ────────────────────────────────────────────────────────────
   MODAL (curated prompts)
────────────────────────────────────────────────────────────── */
function openModal(id) {
  const p = (window.PROMPTS_DATA || []).find(x => x.id === id);
  if (!p) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', p.title);

  overlay.innerHTML = `
    <div class="modal" role="document">
      <div class="modal__header">
        <div>
          <span class="badge badge--${p.category}" style="margin-bottom:8px;display:inline-flex;">
            ${p.categoryEmoji} ${p.category}
          </span>
          <h2 style="font-size:1.2rem;color:var(--text-0);line-height:1.3;">${esc(p.title)}</h2>
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px;font-size:0.8rem;color:var(--text-3);">
            <span>⭐ ${p.rating}</span>
            <span>📋 ${formatNum(p.copies)} copies</span>
            <span>🤖 ${p.aiTool}</span>
          </div>
        </div>
        <button class="modal__close" id="modalClose" aria-label="Close">✕</button>
      </div>

      <div class="modal__body">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <span style="font-size:0.78rem;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.05em;">Full Prompt</span>
          <span style="font-size:0.75rem;color:var(--text-4);">Click to select all · Variables in [BRACKETS]</span>
        </div>
        <div class="modal__prompt-text" id="modalPromptText">${esc(p.prompt)}</div>
        <div class="prompt-card__tags" style="margin-bottom:0;">
          ${p.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal__footer">
        <button class="btn btn--primary btn--lg" id="modalCopyBtn" style="flex:1;">
          📋 Copy Full Prompt
        </button>
        <button class="btn btn--secondary like-btn${(window.TPG && window.TPG.likes && window.TPG.likes.isLiked(id)) ? ' liked' : ''}" data-id="${id}"
                style="${(window.TPG && window.TPG.likes && window.TPG.likes.isLiked(id)) ? 'color:#EC4899;' : ''}">
          ${(window.TPG && window.TPG.likes && window.TPG.likes.isLiked(id)) ? '❤️' : '🤍'}
          ${formatNum(p.likes + ((window.TPG && window.TPG.likes && window.TPG.likes.isLiked(id)) ? 1 : 0))}
        </button>
        <button class="btn btn--ghost modal__close-btn">Close</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.querySelector('#modalCopyBtn').addEventListener('click', () =>
    window.copyText(p.prompt, overlay.querySelector('#modalCopyBtn'))
  );

  const textEl = overlay.querySelector('#modalPromptText');
  if (textEl) {
    textEl.addEventListener('click', () => {
      const range = document.createRange();
      range.selectNodeContents(textEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  }

  const likeBtn = overlay.querySelector('.like-btn');
  if (likeBtn) likeBtn.addEventListener('click', () => toggleLike(id, likeBtn));

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

/* ────────────────────────────────────────────────────────────
   URL PARAM  — support ?cat=cat-01  (deep-links into a category)
────────────────────────────────────────────────────────────── */
(function checkUrlParam() {
  const cat = new URLSearchParams(window.location.search).get('cat');
  if (cat && getFrameworkCats().some(c => c.id === cat)) {
    state.activeCategory = cat;
  }
})();

/* ────────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────────── */
(function init() {
  renderFilters();
  renderGrid();

  // Search input — live (debounced) + Enter + Escape
  const si = document.getElementById('searchInput');
  if (si) {
    let timer;
    si.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        state.page = 1;
        renderGrid();
      }, 300);
    });
    si.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        clearTimeout(timer);
        state.searchQuery = e.target.value.trim();
        state.page = 1;
        renderGrid();
      } else if (e.key === 'Escape') {
        e.target.value = '';
        state.searchQuery = '';
        state.page = 1;
        renderGrid();
      }
    });
  }

  // Search button — submit current query
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const val = si ? si.value.trim() : '';
      state.searchQuery = val;
      state.page = 1;
      renderGrid();
    });
  }

  // Sort
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', e => {
      state.sortBy = e.target.value;
      state.page   = 1;
      renderGrid();
    });
  }

  // View toggle (grid / list)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.viewMode = btn.dataset.view;
      document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const grid = document.getElementById('promptsGrid');
      if (grid) {
        grid.className = state.viewMode === 'list' ? 'list-view' : '';
        grid.id = 'promptsGrid';
      }
    });
  });

  // Load more
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.page++;
      renderGrid();
    });
  }

})();
