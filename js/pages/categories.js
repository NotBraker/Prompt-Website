/* ============================================================
   THE PROMPT GENERATION — categories.js
   Renders the main category grid on categories.html
   + Global search across categories & subcategories
   ============================================================ */

'use strict';

(function initCategoriesPage() {
  const framework = window.PROMPT_MARKETPLACE_FRAMEWORK;
  const meta      = window.CATEGORY_META;

  if (!framework || !meta) {
    console.error('[TPG] PROMPT_MARKETPLACE_FRAMEWORK or CATEGORY_META not loaded.');
    return;
  }

  const allCats = framework.frameworkCategories;

  /* ── Helpers ──────────────────────────────────────────── */
  function esc(str) {
    return (str || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Build a single category card ────────────────────── */
  function buildCatCard(cat, delay, matchedSubs) {
    const m = meta[cat.id] || { emoji: '📁', color: '#7C3AED', rgb: '124,58,237', num: '??', desc: '' };
    const subcatCount = cat.subcategories.length;
    const promptCount = (subcatCount * 50).toLocaleString();

    // If search matched specific subcategories, show them as chips
    let matchHtml = '';
    if (matchedSubs && matchedSubs.length) {
      const chips = matchedSubs.slice(0, 4).map(function (s) {
        return '<span class="cat-card__match-chip">' + esc(s) + '</span>';
      });
      if (matchedSubs.length > 4) {
        chips.push('<span class="cat-card__match-chip cat-card__match-chip--more">+' + (matchedSubs.length - 4) + ' more</span>');
      }
      matchHtml = '<div class="cat-card__matches">' + chips.join('') + '</div>';
    }

    return '\
      <a class="cat-card reveal"\
         href="subcategories.html?cat=' + encodeURIComponent(cat.id) + '"\
         style="--card-rgb:' + m.rgb + ';transition-delay:' + (delay * 0.05) + 's;"\
         role="listitem"\
         aria-label="' + esc(cat.name) + ' — ' + subcatCount + ' subcategories, ' + promptCount + ' templates">\
\
        <div class="cat-card__top">\
          <div class="cat-card__icon" aria-hidden="true">' + m.emoji + '</div>\
          <span class="cat-card__num">' + m.num + '</span>\
        </div>\
\
        <div class="cat-card__name">' + esc(cat.name) + '</div>\
\
        ' + (m.desc ? '<div class="cat-card__desc">' + esc(m.desc) + '</div>' : '') + '\
\
        ' + matchHtml + '\
\
        <div class="cat-card__stats">\
          <span>' + subcatCount + ' subcategories</span>\
          <span class="cat-card__stats-dot" aria-hidden="true"></span>\
          <span>' + promptCount + ' templates</span>\
        </div>\
\
        <div class="cat-card__arrow" aria-hidden="true">Explore →</div>\
      </a>';
  }

  /* ── Render helpers ─────────────────────────────────── */
  function animateGrid(grid) {
    requestAnimationFrame(function () {
      grid.querySelectorAll('.reveal').forEach(function (el, i) {
        setTimeout(function () { el.classList.add('visible'); }, i * 35);
      });
    });
  }

  /* ── Render all 19 categories (default) ────────────── */
  function renderAll() {
    var grid = document.getElementById('mainCatGrid');
    if (!grid) return;
    grid.setAttribute('aria-busy', 'false');

    grid.innerHTML = allCats.map(function (cat, i) {
      return buildCatCard(cat, i, null);
    }).join('');

    animateGrid(grid);
    updateStatus('');
  }

  /* ── Search ────────────────────────────────────────── */
  function doSearch(query) {
    var grid   = document.getElementById('mainCatGrid');
    if (!grid) return;

    var q = (query || '').trim().toLowerCase();
    if (!q) { renderAll(); return; }

    var results = [];
    allCats.forEach(function (cat) {
      var m = meta[cat.id] || {};
      var catName = (cat.name || '').toLowerCase();
      var catDesc = (m.desc || '').toLowerCase();
      var catShort = (m.short || '').toLowerCase();

      // Check if query matches the category name/desc
      var catMatch = catName.indexOf(q) !== -1 ||
                     catDesc.indexOf(q) !== -1 ||
                     catShort.indexOf(q) !== -1;

      // Check which subcategories match
      var matchedSubs = [];
      if (typeof cat.subcategories !== 'undefined') {
        // subcategories is either array of strings or array of objects
        var subNames = cat.subcategories.map(function (s) {
          return typeof s === 'string' ? s : (s.name || s);
        });
        matchedSubs = subNames.filter(function (name) {
          return name.toLowerCase().indexOf(q) !== -1;
        });
      }

      if (catMatch || matchedSubs.length > 0) {
        results.push({ cat: cat, matchedSubs: matchedSubs });
      }
    });

    if (results.length === 0) {
      grid.innerHTML = '\
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">\
          <div style="font-size:3rem;margin-bottom:16px;">🔍</div>\
          <h3 style="font-size:1.2rem;color:var(--text-1);margin-bottom:8px;">No results for "' + esc(query) + '"</h3>\
          <p style="color:var(--text-3);font-size:0.9rem;">Try a different keyword — e.g. "marketing", "web", "AI", "health"</p>\
        </div>';
      updateStatus('No results found');
      return;
    }

    grid.innerHTML = results.map(function (r, i) {
      return buildCatCard(r.cat, i, r.matchedSubs);
    }).join('');

    animateGrid(grid);

    var totalSubs = results.reduce(function (sum, r) { return sum + r.matchedSubs.length; }, 0);
    var statusParts = ['Showing ' + results.length + ' categor' + (results.length === 1 ? 'y' : 'ies')];
    if (totalSubs > 0) {
      statusParts.push(totalSubs + ' matching subcategor' + (totalSubs === 1 ? 'y' : 'ies'));
    }
    updateStatus(statusParts.join(' · '));
  }

  function updateStatus(text) {
    var el = document.getElementById('catSearchStatus');
    if (!el) return;
    if (text) {
      el.textContent = text;
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }

  /* ── Wire up search UI ──────────────────────────────── */
  var searchInput = document.getElementById('catSearchInput');
  var searchBtn   = document.getElementById('catSearchBtn');

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        doSearch(searchInput.value);
      }, 250);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(debounceTimer);
        doSearch(searchInput.value);
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      doSearch(searchInput ? searchInput.value : '');
    });
  }

  /* ── Run ─────────────────────────────────────────────── */
  renderAll();
})();
