/* ============================================================
   THE PROMPT GENERATION — subcategories.js
   Renders the 5×5 subcategory grid on subcategories.html
   URL: subcategories.html?cat=cat-01
   ============================================================ */

'use strict';

(function initSubcategoriesPage() {
  /* ── Helper (declared first so available everywhere) ─── */
  function escHtml(str) {
    return (str || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const framework = window.PROMPT_MARKETPLACE_FRAMEWORK;
  const meta      = window.CATEGORY_META;

  if (!framework || !meta) {
    console.error('[TPG] Required data not loaded.');
    return;
  }

  /* ── Helpers ─────────────────────────────────────────── */
  // Deterministic varied prompt count (32–78) per subcategory index
  const COUNTS_POOL = [54,67,42,73,38,61,55,48,70,36,65,52,78,44,59,
                       47,63,57,35,72,50,66,41,75,53,46,68,39,62,58,
                       76,43,71,37,64,56,49,74,40,60];
  function getSubCount(i) { return COUNTS_POOL[i % COUNTS_POOL.length]; }

  /* ── Read URL params ─────────────────────────────────── */
  const params = new URLSearchParams(window.location.search);
  const catId  = params.get('cat') || '';

  /* ── Find the category ───────────────────────────────── */
  const allCats = [
    ...framework.frameworkCategories,
    ...framework.legacyCategories,
  ];
  const category = allCats.find(c => c.id === catId);

  /* ── Error state ─────────────────────────────────────── */
  if (!category) {
    document.getElementById('catHero').innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">🔍</div>
        <h3>Category not found</h3>
        <p>The category "${escHtml(catId)}" does not exist.</p>
        <a href="categories.html" class="btn btn--primary" style="margin-top:8px;">← Browse All Categories</a>
      </div>`;
    document.getElementById('subcatGrid').innerHTML = '';
    document.getElementById('breadcrumbCurrent').textContent = 'Not found';
    document.title = 'Category Not Found — The Prompt Generation';
    return;
  }

  /* ── Category meta ───────────────────────────────────── */
  const m = meta[catId] || { emoji: '📁', color: '#7C3AED', rgb: '124,58,237', num: '?' };

  /* ── Apply accent CSS custom property ───────────────── */
  document.documentElement.style.setProperty('--accent-rgb', m.rgb);

  /* ── Update page title & breadcrumb ─────────────────── */
  document.title = `${category.name} — The Prompt Generation`;
  document.getElementById('breadcrumbCurrent').textContent = category.name;

  /* ── Render category hero ────────────────────────────── */
  document.getElementById('catHero').innerHTML = `
    <div class="cat-hero">
      <div class="cat-hero__icon" aria-hidden="true">${m.emoji}</div>
      <div class="cat-hero__text">
        <h1>${escHtml(category.name)}</h1>
        <div class="cat-hero__meta">
          <span class="accent-pill">Category ${m.num}</span>
          <span>📂 ${category.subcategories.length} subcategories</span>
          <span>📋 ${(category.subcategories.length * 50).toLocaleString()} templates total</span>
        </div>
      </div>
    </div>
  `;

  /* ── Render subcategory grid ─────────────────────────── */
  function renderSubcatGrid() {
    const grid = document.getElementById('subcatGrid');
    if (!grid) return;
    grid.setAttribute('aria-busy', 'false');

    grid.innerHTML = category.subcategories.map((subcatName, i) => {
      const num  = String(i + 1).padStart(2, '0');
      const href = `subprompts.html?cat=${encodeURIComponent(catId)}&sub=${i}`;
      return `
        <a class="subcat-card reveal"
           href="${href}"
           style="--tile-rgb:${m.rgb};"
           role="listitem"
           aria-label="${escHtml(subcatName)} — ${getSubCount(i)} prompt templates">
          <span class="subcat-card__num">${num}</span>
          <div class="subcat-card__body">
            <span class="subcat-card__name">${escHtml(subcatName)}</span>
            <span class="subcat-card__count">${getSubCount(i)} prompts</span>
          </div>
          <span style="font-size:0.85rem;color:var(--text-4);flex-shrink:0;transition:all var(--t-base);" class="subcat-card__arrow">→</span>
        </a>
      `;
    }).join('');

    // Reveal all at once — no stagger
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
  }

  renderSubcatGrid();
})();

