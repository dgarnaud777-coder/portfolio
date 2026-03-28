/* ============================================================
   DIOGO ARNAUD — Portfolio JavaScript
   script.js
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────
   1. NAVBAR — adds .scrolled class on scroll
   ───────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 36);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─────────────────────────────────────────────────
   2. BURGER MENU — open / close
   ───────────────────────────────────────────────── */
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  let open = false;

  function toggle() {
    open = !open;
    menu.classList.toggle('open', open);
    const [a, b, c] = burger.querySelectorAll('span');
    if (open) {
      a.style.transform = 'translateY(7px) rotate(45deg)';
      b.style.opacity   = '0';
      c.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      a.style.transform = b.style.opacity = c.style.transform = '';
    }
  }

  burger.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { if (open) toggle(); }));
})();


/* ─────────────────────────────────────────────────
   3. SMOOTH SCROLL — offset for fixed navbar
   ───────────────────────────────────────────────── */
(function () {
  const NAV_H = 72;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - NAV_H, behavior: 'smooth' });
    });
  });
})();


/* ─────────────────────────────────────────────────
   4. SCROLL REVEAL — Intersection Observer
   ───────────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger children in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx      = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 90, 360));
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────────────────
   5. ACTIVE NAV LINK
   ───────────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  function update() {
    let cur = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top <= 90) cur = s.id; });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === `#${cur}` ? 'var(--white)' : '';
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ─────────────────────────────────────────────────
   6. CURSOR GLOW (desktop only)
   ───────────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const g = Object.assign(document.createElement('div'), { style: '' });
  g.style.cssText = [
    'position:fixed', 'width:360px', 'height:360px', 'border-radius:50%',
    'background:radial-gradient(circle,rgba(255,106,0,0.055) 0%,transparent 70%)',
    'pointer-events:none', 'z-index:0',
    'transform:translate(-50%,-50%)',
    'transition:left .15s ease,top .15s ease',
    'will-change:left,top'
  ].join(';');
  document.body.appendChild(g);
  document.addEventListener('mousemove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
})();


/* ─────────────────────────────────────────────────
   7. FOOTER YEAR — auto-update
   ───────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
