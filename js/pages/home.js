/* ============================================================
   THE PROMPT GENERATION — Home Page JavaScript
   Particles, typewriter, featured prompts render
   ============================================================ */

'use strict';

/* ── Canvas Particle System ───────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let raf;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Particle colors: violet and blue
  const COLORS = ['124,58,237', '59,130,246', '6,182,212'];

  class Particle {
    constructor(randomY = false) {
      this.reset(randomY);
    }

    reset(randomY = false) {
      this.x = Math.random() * canvas.width;
      this.y = randomY ? Math.random() * canvas.height : canvas.height + Math.random() * 50;
      this.size = Math.random() * 2.4 + 0.4;
      this.speedY = Math.random() * 0.45 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.55 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 280 + 180;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.life * 0.02) * 0.15 + this.speedX;
      this.life++;
      this.twinklePhase += this.twinkleSpeed;

      const fadeIn = 60;
      const fadeOut = 60;

      if (this.life < fadeIn) {
        this.opacity = (this.life / fadeIn) * this.maxOpacity;
      } else if (this.life > this.maxLife - fadeOut) {
        this.opacity = ((this.maxLife - this.life) / fadeOut) * this.maxOpacity;
      } else {
        // Subtle twinkle
        this.opacity = this.maxOpacity * (0.8 + 0.2 * Math.sin(this.twinklePhase));
      }

      if (this.life >= this.maxLife || this.y < -20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.7)`;
      ctx.fillStyle = `rgba(${this.color}, 1)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles — some pre-distributed across the canvas
  const PARTICLE_COUNT = 90;
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
    new Particle(i < PARTICLE_COUNT * 0.6) // 60% start distributed
  );

  // Set random initial life for pre-distributed particles
  particles.forEach((p, i) => {
    if (i < PARTICLE_COUNT * 0.6) {
      p.life = Math.random() * p.maxLife;
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(animate);
  }

  animate();

  // Pause when page hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      animate();
    }
  });
})();

/* ── Typewriter Effect ────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Creative Prompts',
    'Coding Solutions',
    'Business Strategy',
    'Compelling Stories',
    'Viral Marketing Copy',
    'AI Art Concepts',
    'Research Queries',
    'Innovative Ideas',
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    if (isPaused) return;

    const current = words[wordIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === current.length) {
      // Pause at full word
      isPaused = true;
      delay = 2200;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        setTimeout(type, 0);
      }, delay);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  // Small initial delay before starting
  setTimeout(type, 600);
})();

/* ── Category Grid (home page "Browse by Category") ─────── */
(function renderHomeCats() {
  const grid = document.getElementById('homeCatGrid');
  if (!grid) return;

  const meta      = window.CATEGORY_META || {};
  const framework = window.PROMPT_MARKETPLACE_FRAMEWORK;

  // 8 hand-picked categories that represent the breadth of the library
  const PICKS = [
    { id: 'cat-01',          count: '1,247' },
    { id: 'cat-02',          count: '892'   },
    { id: 'cat-03',          count: '1,034' },
    { id: 'cat-05',          count: '712'   },
    { id: 'legacy-creative', count: '634'   },
    { id: 'legacy-education',count: '521'   },
    { id: 'cat-11',          count: '478'   },
    { id: 'legacy-general',  count: '2,374' },
  ];

  grid.innerHTML = PICKS.map((pick, i) => {
    const m = meta[pick.id] || { emoji: '📁', color: '#7c3aed', rgb: '124,58,237', short: pick.id };

    // Derive short display name from CATEGORY_META.short or framework name
    let name = m.short || pick.id;
    if (framework) {
      const cat = framework.frameworkCategories.find(c => c.id === pick.id);
      if (cat) name = cat.name.split('&')[0].trim().split(' ').slice(0, 2).join(' ');
    }

    return `
      <a href="pages/subcategories.html?cat=${pick.id}"
         class="category-card reveal"
         style="transition-delay:${i * 0.07}s;--cat-rgb:${m.rgb};"
         aria-label="Browse ${pick.count} ${name} prompts">
        <div class="category-card__icon" aria-hidden="true"
             style="background:rgba(${m.rgb},0.12);border:1px solid rgba(${m.rgb},0.22);">
          ${m.emoji}
        </div>
        <h3>${name}</h3>
        <span>${pick.count} prompts</span>
      </a>`;
  }).join('');

  // Stagger reveal
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) =>
      setTimeout(() => el.classList.add('visible'), i * 60)
    );
  });
})();

/* ── Featured Prompts Render ──────────────────────────────── */
(function renderFeaturedPrompts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  // Try FEATURED_PROMPTS first (rich, real prompts), then fallback to PROMPTS_DATA
  const source = window.FEATURED_PROMPTS || [];
  const meta   = window.CATEGORY_META   || {};

  // Pick 3 diverse featured prompts spread across the category list
  const PICKS = ['fp-01a', 'fp-13a', 'fp-19a'];
  let featured = PICKS.map(id => source.find(p => p.id === id)).filter(Boolean);

  // Fallback: first 3 from PROMPTS_DATA if FEATURED_PROMPTS not ready
  if (!featured.length && window.PROMPTS_DATA) {
    const old = window.PROMPTS_DATA.filter(p => p.featured).slice(0, 3);
    featured = old.map(p => ({
      id: p.id, catId: null, title: p.title, preview: p.preview,
      prompt: p.prompt, tags: p.tags, rating: p.rating,
      copies: p.copies, likes: p.likes, aiTool: p.aiTool,
    }));
  }

  if (!featured.length) { grid.innerHTML = ''; return; }

  const tplLikes = window.TPG && window.TPG.likes;

  grid.innerHTML = featured.map((fp, i) => {
    const m       = fp.catId ? (meta[fp.catId] || {}) : {};
    const catName = m.short || m.name || fp.category || '';
    const rgb     = m.rgb   || '124,58,237';
    const color   = m.color || '#7c3aed';
    const emoji   = m.emoji || fp.categoryEmoji || '📁';
    const rating  = (fp.rating || 4.8).toFixed(1);
    const isLiked = tplLikes ? tplLikes.isLiked(fp.id) : false;

    return `
      <article class="prompt-card reveal home-fp-card"
               style="transition-delay:${i * 0.1}s;cursor:pointer;"
               data-fp-id="${fp.id}"
               role="article"
               aria-label="${escapeHtml(fp.title)}">

        <!-- Category badge + rating -->
        <div class="prompt-card__header">
          <span class="prompt-card__cat-badge"
                style="background:rgba(${rgb},0.12);color:${color};border:1px solid rgba(${rgb},0.2);">
            ${emoji} ${catName}
          </span>
          <span class="prompt-card__rating">⭐ ${rating}</span>
        </div>

        <h3 class="prompt-card__title">${escapeHtml(fp.title)}</h3>
        <div class="prompt-card__preview">${escapeHtml(fp.preview)}</div>

        <div class="prompt-card__tags">
          ${(fp.tags || []).slice(0, 3).map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>

        <div class="prompt-card__footer">
          <div class="prompt-card__meta">
            <span title="Copies">📋 ${formatNum(fp.copies || 0)}</span>
            <span class="prompt-card__ai-badge">🤖 ${(fp.aiTool || 'ChatGPT').split(',')[0].trim()}</span>
          </div>
          <div class="prompt-card__actions">
            <button class="btn btn--sm btn--ghost home-fp-like${isLiked ? ' liked' : ''}"
                    data-fp-id="${fp.id}"
                    title="${isLiked ? 'Unlike' : 'Like'} this prompt"
                    style="${isLiked ? 'color:#EC4899;' : ''}">
              ${isLiked ? '❤️' : '🤍'} <span class="home-fp-like-count">${formatNum((fp.likes || 0) + (isLiked ? 1 : 0))}</span>
            </button>
            <button class="btn btn--sm btn--primary home-fp-copy"
                    data-fp-id="${fp.id}"
                    title="Copy this prompt">
              📋 Copy
            </button>
          </div>
        </div>
      </article>`;
  }).join('');

  // Bind card clicks → modal
  grid.querySelectorAll('.home-fp-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      const fp = source.find(p => p.id === card.dataset.fpId) ||
                 (window.PROMPTS_DATA || []).find(p => String(p.id) === card.dataset.fpId);
      if (fp) openHomeFpModal(fp);
    });
  });

  grid.querySelectorAll('.home-fp-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const fp = source.find(p => p.id === btn.dataset.fpId);
      if (fp) window.copyText(fp.prompt, btn);
    });
  });

  // Like buttons — use unified likes service
  grid.querySelectorAll('.home-fp-like').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const fpId    = btn.dataset.fpId;
      const fp      = source.find(p => p.id === fpId);
      if (!fp) return;

      const tplLikes = window.TPG && window.TPG.likes;
      const countEl  = btn.querySelector('.home-fp-like-count');

      if (tplLikes) {
        const wasLiked = tplLikes.isLiked(fpId);
        if (wasLiked) {
          tplLikes.unlike(fpId);
          btn.classList.remove('liked');
          btn.style.color = '';
          btn.innerHTML = `🤍 <span class="home-fp-like-count">${formatNum(fp.likes || 0)}</span>`;
        } else {
          const meta   = window.CATEGORY_META || {};
          const m      = fp.catId ? (meta[fp.catId] || {}) : {};
          tplLikes.like(fpId, {
            id      : fpId,
            type    : 'featured',
            title   : fp.title,
            preview : fp.preview,
            prompt  : fp.prompt,
            catId   : fp.catId || '',
            catName : m.name || m.short || fp.category || '',
            emoji   : m.emoji || '⚡',
            tags    : fp.tags || [],
            rating  : fp.rating || 4.8,
            aiTool  : fp.aiTool || 'ChatGPT',
          });
          btn.classList.add('liked');
          btn.style.color = '#EC4899';
          btn.innerHTML = `❤️ <span class="home-fp-like-count">${formatNum((fp.likes || 0) + 1)}</span>`;
          window.showToast && window.showToast('Saved to your account ❤️', '❤');
        }
      } else {
        // Fallback: visual-only toggle
      const isLiked = btn.classList.toggle('liked');
      btn.style.color = isLiked ? '#EC4899' : '';
        if (countEl) countEl.textContent = formatNum((fp.likes || 0) + (isLiked ? 1 : 0));
      }
    });
  });

  // Stagger reveal
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) =>
      setTimeout(() => el.classList.add('visible'), i * 120)
    );
  });
})();

/* ── Featured Prompt Modal (home page) ─────────────────────── */
function openHomeFpModal(fp) {
  const meta = window.CATEGORY_META || {};
  const m    = fp.catId ? (meta[fp.catId] || { emoji:'📁', color:'#7c3aed', rgb:'124,58,237', name: fp.category || fp.catId }) : { emoji:'📁', color:'#7c3aed', rgb:'124,58,237', name: fp.category || '' };

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', fp.title);

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__header">
        <div>
          <span style="
            display:inline-flex;align-items:center;gap:5px;
            padding:3px 10px;border-radius:999px;font-size:0.72rem;font-weight:700;
            background:rgba(${m.rgb},0.12);color:${m.color};
            border:1px solid rgba(${m.rgb},0.2);margin-bottom:10px;
          ">${m.emoji} ${m.name}</span>
          <h2 style="font-size:1.1rem;color:var(--text-0);line-height:1.3;">${escapeHtml(fp.title)}</h2>
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px;font-size:0.8rem;color:var(--text-3);">
            <span>⭐ ${fp.rating || '4.8'}</span>
            <span>📋 ${formatNum(fp.copies || 0)} copies</span>
            <span>🤖 ${fp.aiTool || 'ChatGPT'}</span>
          </div>
        </div>
        <button class="modal__close" id="homeFpModalClose" aria-label="Close">✕</button>
      </div>
      <div class="modal__body">
        <p style="font-size:0.75rem;color:var(--text-3);margin-bottom:10px;">
          Click the text to select all · Replace <strong>[BRACKETS]</strong> with your details
        </p>
        <div class="modal__prompt-text" id="homeFpModalText">${escapeHtml(fp.prompt)}</div>
        <div class="prompt-card__tags" style="margin-top:12px;margin-bottom:0;">
          ${(fp.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--primary btn--lg" id="homeFpModalCopyBtn" style="flex:1;">
          📋 Copy Template
        </button>
        <button class="btn btn--ghost modal__close-btn">Close</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const textEl = overlay.querySelector('#homeFpModalText');
  if (textEl) {
    textEl.addEventListener('click', () => {
      const range = document.createRange();
      range.selectNodeContents(textEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  }

  overlay.querySelector('#homeFpModalCopyBtn').addEventListener('click', () => {
    window.copyText(fp.prompt, overlay.querySelector('#homeFpModalCopyBtn'));
  });

  function close() {
    overlay.style.animation = 'fadeIn 0.15s ease reverse forwards';
    setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 150);
  }

  overlay.querySelector('#homeFpModalClose').addEventListener('click', close);
  overlay.querySelector('.modal__close-btn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  });
  overlay.querySelector('#homeFpModalClose').focus();
}

/* ── Helpers ──────────────────────────────────────────────── */
function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.copyPrompt = function(id, btn) {
  const prompt = window.PROMPTS_DATA && window.PROMPTS_DATA.find(p => p.id === id);
  if (prompt) window.copyText(prompt.prompt, btn);
};

window.copyFeatured = function(id, btn) {
  const fp = window.FEATURED_PROMPTS && window.FEATURED_PROMPTS.find(p => p.id === id);
  if (fp) window.copyText(fp.prompt, btn);
};

