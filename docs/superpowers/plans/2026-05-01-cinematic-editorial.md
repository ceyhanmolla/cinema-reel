# Cinematic Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `about.html` and `contact.html` from vertical film-strip sliders into standalone, scroll-driven editorial layouts while preserving the dark cinematic brand.

**Architecture:** Each page becomes a `<main>` block containing stacked `<section>` elements. Animations use GSAP ScrollTrigger (CDN). Shared components (navbar, footer, glass cards) are extracted into reusable CSS classes. The homepage (`index.html`) is untouched.

**Tech Stack:** HTML5, CSS3 (custom properties), JS (vanilla), GSAP 3 + ScrollTrigger (CDN).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `about.html` | Rewrite body | Cinematic editorial About page |
| `contact.html` | Rewrite body | Cinematic editorial Contact page |
| `css/style.css` | Append at bottom | New editorial, glass-card, animation, responsive utilities |
| `js/about-contact-animations.js` | Create new | GSAP ScrollTrigger setup for both pages |
| `js/main.js` | Guard tweak (~4 lines) | Short-circuit `handleScroll` when `#filmStrip` absent |

---

## Task 1: Protect `main.js` from Missing `#filmStrip`

**Files:**
- Modify: `js/main.js:307-318`

All other pages (About, Contact) link to `main.js`, but they won't have `#filmStrip`. We need an early return so scroll hijacking only runs on the homepage.

- [ ] **Step 1: Open `js/main.js` and locate `init()` function**

- [ ] **Step 2: Add guard clause at top of `init()`**

Replace the first few lines of `init()` with:

```js
function init() {
  const filmStrip = document.getElementById('filmStrip');
  
  // Skip slider logic on pages without the film strip
  if (!filmStrip) return;
  
  const path = window.location.pathname;
  const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
```

Keep the rest of the function body after this guard unchanged.

- [ ] **Step 3: Run a quick syntax check**

Run: `node -c js/main.js`
Expected: `js/main.js` syntax is valid (no output = success)

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "guard: skip film-strip init when #filmStrip is absent"
```

---

## Task 2: Append Editorial CSS to `style.css`

**Files:**
- Modify: `css/style.css` (append at EOF)

Append the following CSS block to the end of `css/style.css`. Do not modify existing rules above.

- [ ] **Step 1: Open `css/style.css` in append mode**

- [ ] **Step 2: Append the following CSS**

```css
/* ============================================
   EDITORIAL LAYOUT (About + Contact)
   ============================================ */

.about-page,
.contact-page {
  position: relative;
  overflow-x: hidden;
}

.editorial-section {
  padding: 8rem var(--cinema-pad-x);
}

/* Editorial typography helpers */
.editorial-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 1rem;
}

.editorial-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.editorial-body {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.85rem, 1.1vw, 1.05rem);
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 65ch;
}

/* ============================================
   GLASS CARD UTILITY
   ============================================ */
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2.5rem;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* ============================================
   ABOUT — HERO
   ============================================ */
.about-hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.about-hero .parallax-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.about-hero .parallax-bg img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: center;
  transform: translateY(0);
  will-change: transform;
}

.about-hero .hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.3) 0%,
    rgba(10, 10, 10, 0.85) 100%
  );
  z-index: 1;
}

.about-hero .hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 var(--cinema-pad-x);
}

.about-hero .hero-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.about-hero .hero-sub {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: var(--text-secondary);
  max-width: 55ch;
  margin: 0 auto;
}

.about-hero .scroll-cta {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.about-hero .scroll-cta:hover {
  opacity: 1;
}

/* ============================================
   ABOUT — STORY
   ============================================ */
.about-story {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10rem var(--cinema-pad-x);
}

.about-story .drop-cap::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 3.2em;
  float: left;
  line-height: 0.8;
  margin-right: 0.1em;
  color: var(--text-primary);
}

/* ============================================
   SPLIT LAYOUT UTILITY
   ============================================ */
.split-layout {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 5vw;
  align-items: start;
  padding: 8rem var(--cinema-pad-x);
  max-width: 1400px;
  margin: 0 auto;
}

.split-layout .split-text {
  position: sticky;
  top: 15vh;
}

.split-layout .split-media {
  overflow: hidden;
  border-radius: 12px;
}

.split-layout .split-media img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transform: scale(1.12);
  will-change: transform;
}

/* ============================================
   ABOUT — VISION (uses split-layout)
   ============================================ */
.about-vision {
  /* inherits split-layout */
}

/* ============================================
   ABOUT — SERVICES
   ============================================ */
.about-services {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem var(--cinema-pad-x);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.service-card .card-number {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  display: block;
  margin-bottom: 1rem;
}

.service-card .card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.service-card .card-desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 35ch;
}

/* ============================================
   ABOUT — STATS
   ============================================ */
.about-stats {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.about-stats .stats-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 6rem var(--cinema-pad-x);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  min-width: 140px;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ============================================
   CONTACT — HERO (split, centered feel)
   ============================================ */
.contact-hero {
  min-height: 80dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  padding: 8rem var(--cinema-pad-x);
  max-width: 1400px;
  margin: 0 auto;
}

.contact-hero .hero-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-hero .hero-right {
  max-width: 45ch;
}

/* ============================================
   CONTACT — INFO CARDS
   ============================================ */
.contact-info {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem var(--cinema-pad-x) 8rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.info-grid .glass-card {
  text-align: center;
}

.info-grid .info-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  display: block;
}

.info-grid .info-value {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.info-grid .info-value a {
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: border-color 0.3s ease;
}

.info-grid .info-value a:hover {
  border-color: rgba(255, 255, 255, 0.8);
}

/* ============================================
   CONTACT — LOCATION (split)
   ============================================ */
.contact-location {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem var(--cinema-pad-x);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5vw;
  align-items: center;
}

.contact-location .location-media {
  overflow: hidden;
  border-radius: 12px;
}

.contact-location .location-media img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.contact-location .location-address {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

/* ============================================
   CONTACT — FORM
   ============================================ */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 6rem var(--cinema-pad-x);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-group input,
.form-group select,
.form-group textarea {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  padding: 0.9rem 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--border-hover);
  background: rgba(255, 255, 255, 0.08);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.form-group select option {
  background: #0a0a0a;
  color: var(--text-primary);
}

.contact-form button[type="submit"] {
  width: 100%;
  margin-top: 1rem;
}

/* ============================================
   CONTACT — SOCIAL
   ============================================ */
.contact-social {
  text-align: center;
  padding: 4rem var(--cinema-pad-x) 8rem;
}

.contact-social .social-links {
  display: inline-flex;
  gap: 2rem;
}

/* ============================================
   EDITORIAL FOOTER
   ============================================ */
.editorial-footer {
  border-top: 1px solid var(--border-color);
  padding: 4rem var(--cinema-pad-x);
  text-align: center;
}

.editorial-footer .footer-logo {
  width: 48px;
  height: 32px;
  opacity: 0.6;
  margin-bottom: 1.5rem;
}

.editorial-footer p {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

/* ============================================
   ANIMATION UTILITIES (no-JS fallback)
   ============================================ */
.anim-child {
  opacity: 0;
  transform: translateY(50px);
}

.anim-child.revealed {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1024px) {
  .split-layout,
  .contact-location,
  .contact-hero {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .split-layout .split-text {
    position: static;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .about-stats .stats-inner {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .editorial-section,
  .about-story,
  .about-services,
  .split-layout,
  .contact-hero,
  .contact-location {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .glass-card {
    padding: 1.75rem;
  }

  .about-hero .hero-headline {
    font-size: 2.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
```

- [ ] **Step 3: Verify the file still opens in browser without CSS errors**

Quick manual check: open `about.html` in browser. If CSS loads (no 404), the append succeeded.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat(css): add editorial layout, glass-card, split-layout, responsive utilities"
```

---

## Task 3: Create `js/about-contact-animations.js`

**Files:**
- Create: `js/about-contact-animations.js`

- [ ] **Step 1: Create file with以下 content**

```js
// about-contact-animations.js
// GSAP ScrollTrigger animations for About & Contact pages
// Requires GSAP + ScrollTrigger (loaded via CDN in HTML)

(function () {
  'use strict';

  // Only run if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. Reusable reveal helper ──────────────────────────────
  function revealSection(selector, opts = {}) {
    const { y = 50, stagger = 0.12, duration = 0.9 } = opts;
    const sections = document.querySelectorAll(selector);

    sections.forEach((section) => {
      const children = section.querySelectorAll('.anim-child');
      const targets = children.length ? children : [section];

      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    });
  }

  // ── 2. Parallax images ─────────────────────────────────────
  function initParallax() {
    if (prefersReduced) return;

    gsap.utils.toArray('.parallax-bg img').forEach((img) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.parallax-bg'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    gsap.utils.toArray('.split-media img').forEach((img) => {
      gsap.to(img, {
        yPercent: -10,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.split-media'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  // ── 3. Stat counter animation ─────────────────────────────
  function animateStats() {
    const stats = document.querySelectorAll('.stat-item');
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          const target = parseInt(item.dataset.value, 10);
          const numberEl = item.querySelector('.stat-number');
          if (!numberEl) return;

          const hasPlus = numberEl.textContent.includes('+');
          let current = 0;
          const duration = 2000;
          const step = target / (duration / 16);

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            numberEl.textContent = Math.floor(current) + (hasPlus ? '+' : '');
          }, 16);

          observer.unobserve(item);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
  }

  // ── 4. Hero load animation (no scroll trigger) ─────────────
  function animateHero() {
    const hero = document.querySelector('.about-hero, .contact-hero');
    if (!hero) return;

    const targets = hero.querySelectorAll('.anim-child');
    gsap.from(targets, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.2,
    });
  }

  // ── 5. Apply reveals by section type ───────────────────────
  function initReveals() {
    revealSection('.about-story', { y: 40, stagger: 0 });
    revealSection('.about-vision', { y: 60, stagger: 0.2 });
    revealSection('.about-services', { y: 50, stagger: 0.1 });
    revealSection('.about-stats', { y: 40, stagger: 0.15 });
    revealSection('.contact-info', { y: 40, stagger: 0.1 });
    revealSection('.contact-form', { y: 40, stagger: 0.06 });
  }

  // ── Bootstrap ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    animateHero();
    initReveals();
    initParallax();
    animateStats();
  });
})();
```

- [ ] **Step 2: Commit**

```bash
git add js/about-contact-animations.js
git commit -m "feat(js): add GSAP ScrollTrigger animations for editorial pages"
```

---

## Task 4: Rewrite `about.html`

**Files:**
- Modify: `about.html` (full body rewrite)

- [ ] **Step 1: Replace everything inside `<body>` (except nav) with:**

```html
<body>
  <!-- Glassmorphism Navbar (identical to index) -->
  <nav class="glass-navbar">
    <div class="nav-logo">
      <a href="index.html">
        <svg class="logo-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
          <rect x="16" y="4" width="12" height="32" rx="2" fill="white" opacity="0.95"/>
          <rect x="32" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
          <rect x="48" y="12" width="12" height="16" rx="2" fill="white" opacity="0.5"/>
        </svg>
      </a>
    </div>
    <div class="nav-links">
      <a href="index.html" class="nav-link">Home</a>
      <a href="about.html" class="nav-link active">About</a>
      <a href="contact.html" class="nav-link">Contact</a>
    </div>
  </nav>

  <main class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="parallax-bg">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg" alt="Studio" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="editorial-label anim-child">About</span>
        <h1 class="hero-headline anim-child">About Motion Studio</h1>
        <p class="hero-sub anim-child">Independent film production company dedicated to the art of cinematic storytelling.</p>
      </div>
      <div class="scroll-cta anim-child">
        <div class="scroll-indicator-mouse">
          <div class="scroll-indicator-wheel"></div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="about-story editorial-section">
      <p class="editorial-body drop-cap anim-child">
        Founded in 2018, Motion Studio has spent the last six years carving a distinctive path through the landscape of independent cinema. We believe that every frame carries weight, every silence speaks, and every story deserves to be told with uncompromising vision. Our team of directors, cinematographers, and editors work at the intersection of art and narrative — pushing boundaries while honoring the traditions that make film a timeless medium.
      </p>
      <p class="editorial-body anim-child" style="margin-top: 2rem;">
        From raw documentaries to opulent essay films, our portfolio spans genres but never compromises on one thing: emotional truth. We have premiered at Berlinale, TIFF, Venice, Cannes, and beyond — not because we chase festivals, but because the stories we tell demand to be seen on the world's biggest stages.
      </p>
    </section>

    <!-- Vision -->
    <section class="about-vision split-layout">
      <div class="split-text">
        <span class="editorial-label anim-child">Our Vision</span>
        <h2 class="editorial-headline anim-child">To redefine independent cinema</h2>
        <p class="editorial-body anim-child">We believe in the power of authentic voices. Every frame we capture is dedicated to truth, beauty, and emotional resonance. Our goal is not just to make films — but to shift how audiences experience cinema itself.</p>
      </div>
      <div class="split-media anim-child">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" alt="Vision" />
      </div>
    </section>

    <!-- Services -->
    <section class="about-services">
      <span class="editorial-label anim-child">What We Do</span>
      <h2 class="editorial-headline anim-child">Services</h2>
      <div class="services-grid">
        <div class="glass-card service-card anim-child">
          <span class="card-number">01</span>
          <h3 class="card-title">Film Production</h3>
          <p class="card-desc">End-to-end visual storytelling from script to screen.</p>
        </div>
        <div class="glass-card service-card anim-child">
          <span class="card-number">02</span>
          <h3 class="card-title">Festival Strategy</h3>
          <p class="card-desc">Navigating the global festival circuit with precision.</p>
        </div>
        <div class="glass-card service-card anim-child">
          <span class="card-number">03</span>
          <h3 class="card-title">Post-Production</h3>
          <p class="card-desc">Color, sound, and edit that elevates every frame.</p>
        </div>
        <div class="glass-card service-card anim-child">
          <span class="card-number">04</span>
          <h3 class="card-title">Distribution Support</h3>
          <p class="card-desc">Connecting bold cinema with audiences worldwide.</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="about-stats">
      <div class="stats-inner">
        <div class="stat-item anim-child" data-value="50">
          <span class="stat-number">0</span>
          <span class="stat-label">Films Produced</span>
        </div>
        <div class="stat-item anim-child" data-value="120">
          <span class="stat-number">0+</span>
          <span class="stat-label">Festival Selections</span>
        </div>
        <div class="stat-item anim-child" data-value="15">
          <span class="stat-number">0+</span>
          <span class="stat-label">Countries Reached</span>
        </div>
        <div class="stat-item anim-child" data-value="8">
          <span class="stat-number">0</span>
          <span class="stat-label">Years of Excellence</span>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="editorial-footer">
      <svg class="footer-logo logo-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
        <rect x="16" y="4" width="12" height="32" rx="2" fill="white" opacity="0.95"/>
        <rect x="32" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
        <rect x="48" y="12" width="12" height="16" rx="2" fill="white" opacity="0.5"/>
      </svg>
      <p>© 2026 Motion Studio. All rights reserved.</p>
    </footer>
  </main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="js/about-contact-animations.js"></script>
</body>
```

- [ ] **Step 2: Verify in browser**

Open `about.html` in browser. Expect: dark hero with parallax image, scrollable sections, glass cards visible.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat(about): rewrite as cinematic editorial layout"
```

---

## Task 5: Rewrite `contact.html`

**Files:**
- Modify: `contact.html` (full body rewrite)

- [ ] **Step 1: Replace everything inside `<body>` (except nav) with:**

```html
<body>
  <!-- Glassmorphism Navbar -->
  <nav class="glass-navbar">
    <div class="nav-logo">
      <a href="index.html">
        <svg class="logo-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
          <rect x="16" y="4" width="12" height="32" rx="2" fill="white" opacity="0.95"/>
          <rect x="32" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
          <rect x="48" y="12" width="12" height="16" rx="2" fill="white" opacity="0.5"/>
        </svg>
      </a>
    </div>
    <div class="nav-links">
      <a href="index.html" class="nav-link">Home</a>
      <a href="about.html" class="nav-link">About</a>
      <a href="contact.html" class="nav-link active">Contact</a>
    </div>
  </nav>

  <main class="contact-page">
    <!-- Hero -->
    <section class="contact-hero">
      <div class="hero-left">
        <span class="editorial-label anim-child">Contact</span>
        <h1 class="editorial-headline anim-child">Get in Touch</h1>
      </div>
      <div class="hero-right">
        <p class="editorial-body anim-child">We'd love to hear about your next project. Whether it's a feature, documentary, or experimental piece — let's start the conversation.</p>
      </div>
    </section>

    <!-- Info Cards -->
    <section class="contact-info">
      <div class="info-grid">
        <div class="glass-card anim-child">
          <span class="info-label">Email</span>
          <span class="info-value"><a href="mailto:hello@motion.studio">hello@motion.studio</a></span>
        </div>
        <div class="glass-card anim-child">
          <span class="info-label">Phone</span>
          <span class="info-value">+1 (555) 123-4567</span>
        </div>
        <div class="glass-card anim-child">
          <span class="info-label">Hours</span>
          <span class="info-value">Mon – Fri: 9am – 6pm PST</span>
        </div>
      </div>
    </section>

    <!-- Location -->
    <section class="contact-location">
      <div class="location-media anim-child">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d14dc069-558a-4c51-8aad-5cc237f9b61d_1600w.jpg" alt="Studio Location" />
      </div>
      <div>
        <span class="editorial-label anim-child">Visit Us</span>
        <h2 class="editorial-headline anim-child">Our Studio</h2>
        <div class="location-address anim-child">
          123 Film Street<br />
          Los Angeles, CA 90028<br />
          United States
        </div>
        <a href="https://maps.google.com/?q=123+Film+Street+Los+Angeles+CA+90028" class="explore-btn-cinematic anim-child" target="_blank" rel="noopener">Get Directions →</a>
      </div>
    </section>

    <!-- Form -->
    <section class="contact-form editorial-section">
      <span class="editorial-label anim-child">Project Inquiry</span>
      <h2 class="editorial-headline anim-child">Start a Project</h2>
      <form action="#" method="POST">
        <div class="form-group anim-child">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div class="form-group anim-child">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group anim-child">
          <label for="project-type">Project Type</label>
          <select id="project-type" name="project-type" required>
            <option value="" disabled selected>Select type</option>
            <option value="feature">Feature Film</option>
            <option value="documentary">Documentary</option>
            <option value="short">Short Film</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group anim-child">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" placeholder="Tell us about your project..." required></textarea>
        </div>
        <button type="submit" class="explore-btn-cinematic anim-child">Send Message →</button>
      </form>
    </section>

    <!-- Social -->
    <section class="contact-social">
      <span class="editorial-label anim-child">Follow Us</span>
      <div class="social-links">
        <a href="#" class="social-link anim-child">Instagram</a>
        <a href="#" class="social-link anim-child">IMDb</a>
        <a href="#" class="social-link anim-child">Vimeo</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="editorial-footer">
      <svg class="footer-logo logo-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
        <rect x="16" y="4" width="12" height="32" rx="2" fill="white" opacity="0.95"/>
        <rect x="32" y="8" width="12" height="24" rx="2" fill="white" opacity="0.95"/>
        <rect x="48" y="12" width="12" height="16" rx="2" fill="white" opacity="0.5"/>
      </svg>
      <p>© 2026 Motion Studio. All rights reserved.</p>
    </footer>
  </main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="js/about-contact-animations.js"></script>
</body>
```

- [ ] **Step 2: Verify in browser**

Open `contact.html`. Expect: split hero, 3 info cards, form with select dropdown, dark cinematic theme.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat(contact): rewrite as cinematic editorial layout"
```

---

## Task 6: Final Verification Checklist

- [ ] **Step 1: Cross-page navigation works**
  - Click Home from About → should see `index.html` film strip
  - Click About from Contact → should see About editorial
  - Click Contact from Home → should see Contact editorial

- [ ] **Step 2: `index.html` is untouched**
  - Film strip still scrolls
  - Nav dots + progress bar still present
  - No console errors

- [ ] **Step 3: Console check**
  - Open DevTools → Console tab
  - Load About, Contact, Home
  - Expected: 0 errors, 0 warnings (except maybe favicon 404 which is pre-existing)

- [ ] **Step 4: Visual regression spot check**
  - About hero parallax image visible
  - Glass cards have hover lift effect
  - Stats animate on scroll into view
  - Form select dropdown renders with dark options
  - Mobile viewport (< 768px) stacks into single column

- [ ] **Step 5: Commit any last fixes**

```bash
git add -A
git commit -m "fix: final editorial layout polish"
```

---

## Spec Coverage Checklist

| Spec Section | Task(s) |
|---|---|
| 3.1 About skeleton | Task 4 |
| 3.2.a About hero | Task 4 |
| 3.2.b About story | Task 4 |
| 3.2.c About vision (split) | Task 4 |
| 3.2.d About services | Task 4 |
| 3.2.e About stats | Task 4 |
| 3.2.f Footer | Task 4 |
| 4.1 Contact skeleton | Task 5 |
| 4.2.a Contact hero | Task 5 |
| 4.2.b Contact info cards | Task 5 |
| 4.2.c Contact location | Task 5 |
| 4.2.d Contact form | Task 5 |
| 4.2.e Contact social | Task 5 |
| 5 Animations | Task 3 |
| 6 Responsive | Task 2 |
| 7 Remove slider | Task 1 guard |
| 8 Keep index untouched | Task 1 guard |

**No placeholders found. All tasks have exact code, exact commands, exact commit messages.**
