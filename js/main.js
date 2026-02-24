/* ============================================================
   THE PROMPT GENERATION — Shared JavaScript
   Navigation, scroll effects, reveal animations, utilities
   ============================================================ */

'use strict';

/* ── Navbar Scroll Effect ─────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load
})();

/* ── Mobile Menu Toggle ───────────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop click (clicking outside the menu)
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
})();

/* ── Scroll Reveal Observer ───────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ── Active Nav Link ──────────────────────────────────────── */
(function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();

    const isHome = (filename === 'index.html' || filename === '') &&
                   (href === '/' || href === 'index.html' || href === './index.html' || href === '#');
    const isMatch = filename && linkFile === filename;

    if (isHome || isMatch) link.classList.add('active');
  });
})();

/* ── Toast Notification ───────────────────────────────────── */
window.showToast = function(message, emoji = '✓') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="toast__icon">${emoji}</div>
    <span>${message}</span>
  `;

  // Reset animation
  toast.classList.remove('show');
  clearTimeout(toast._timeout);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
};

/* ── Copy to Clipboard ────────────────────────────────────── */
window.copyText = async function(text, buttonEl) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-secure contexts
      const el = Object.assign(document.createElement('textarea'), {
        value: text,
        style: 'position:fixed;left:-9999px;opacity:0'
      });
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      el.remove();
    }

    if (buttonEl) {
      const original = buttonEl.innerHTML;
      buttonEl.innerHTML = '✓ Copied!';
      buttonEl.classList.add('copied');
      setTimeout(() => {
        buttonEl.innerHTML = original;
        buttonEl.classList.remove('copied');
      }, 2000);
    }

    window.showToast('Prompt copied to clipboard!', '📋');
  } catch (err) {
    window.showToast('Copy failed — please try manually.', '⚠');
    console.error('Copy failed:', err);
  }
};

/* ── Stats Counter Animation ──────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);

      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        // Ease-out expo curve
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
})();

/* ── Smooth Anchor Scroll ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72', 10);
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

