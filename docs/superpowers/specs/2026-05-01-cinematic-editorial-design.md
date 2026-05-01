# Cinematic Editorial Design – About & Contact Pages

**Project:** cinema-reel  
**Date:** 2026-05-01  
**Scope:** Redesign `about.html` and `contact.html` from vertical slider clones to standalone editorial layouts while preserving the dark cinematic brand language.

---

## 1. Design Philosophy

The homepage (`index.html`) uses a **vertical snap-scroll film strip** that is great for browsing films but hostile to reading copy and filling forms. About and Contact have different jobs:

* **About** → build trust, tell a story, show expertise.
* **Contact** → remove friction, make it easy to reach out.

Instead of forcing these pages into the same slider mould, we adopt a **Cinematic Editorial** layout:

* Keep the **dark cinematic palette** and **glassmorphism** details (the "brand perfume").
* Switch to a **scrollytelling / long-scroll** structure that designers like Locomotive or Studio Freight use for studio sites.
* Use **GSAP ScrollTrigger** for entrance animations so the page still feels "motion-first".
* Strip away the **nav-dots**, **scroll-progress**, and **infinite-scroll** mechanics.

---

## 2. Shared Tokens (No New Visual Language)

Everything below re-uses existing design tokens from `css/style.css`.

```
--bg-primary: #0a0a0a
--bg-secondary: #0d0c0a
--text-primary: #ededed
--text-secondary: rgba(237, 237, 237, 0.6)
--text-muted: rgba(237, 237, 237, 0.4)
--border-color: rgba(255, 255, 255, 0.08)
--border-hover: rgba(255, 255, 255, 0.15)
--cinema-pad-x: 7.5dvh   (fallback to 5vw on desktop, 1.5rem on mobile)
```

**Fonts**
* Headlines / display → `Playfair Display`, weight 700
* Body / labels / nav → `Space Mono`, weight 400/700

---

## 3. About Page Architecture

### 3.1. Page Skeleton (`about.html`)

Replace the current `filmStrip` loop with the following `<main class="about-page">` structure (nav stays identical).

```
<nav class="glass-navbar"> … </nav>

<main class="about-page">
  <section class="about-hero">
    Background image (parallax)
    Centered headline + short description
  </section>

  <section class="about-story editorial-section">
    Max-width 1000px,
    Large body text with generous line-height
  </section>

  <section class="about-vision split-layout">
    Left (60 %)  → Sticky label, headline, body copy
    Right (40 %) → Image with parallax
  </section>

  <section class="about-services grid-2">
    4 glass cards (2×2 desktop, 1-col mobile)
    Each: index number, title, 1-sentence description
  </section>

  <section class="about-stats">
    Full bleed, slightly lifted background
    4 stat items → animated counters
  </section>

  <footer class="editorial-footer">
    Logo SVG + copyright
  </footer>
</main>
```

### 3.2. Section Details

#### a) Hero (`about-hero`)
* **Height:** `min(100dvh, 900px)`
* **Background:** Full-bleed hero image (same CDN asset from Supabase), `object-fit: cover`, wrapped in `.parallax-bg`.
* **Overlay:** `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)`
* **Content:**
  * Eyebrow — `About` → `Space Mono`, `0.65rem`, `letter-spacing: 0.35em`, uppercase, `text-muted`
  * Headline — `About Motion Studio` → `Playfair Display`, `clamp(3rem, 7vw, 5.5rem)`
  * Subheadline — `Independent film production company dedicated to the art of cinematic storytelling.` → `clamp(0.9rem, 1.5vw, 1.1rem)`, `color: text-secondary`, max-width `55ch`
* **Scroll indicator:** Small mouse-wheel icon (`scroll-indicator` component re-used from `index.html`) centered at `bottom: 3rem`.

#### b) Story (`about-story`)
* **Container:** `max-width: 1000px; margin: 0 auto; padding: 10rem var(--cinema-pad-x);`
* **Typography:**
  * Body — `font-size: clamp(1.05rem, 1.3vw, 1.25rem)`, `line-height: 1.8`, `color: text-secondary`
  * Drop-cap optional (first letter 3em, Playfair Display) for editorial feel.
* **Entrance animation:** `opacity 0→1`, `translateY(40px→0)`, `duration: 0.9s`, `ease: power2.out`
* **ScrollTrigger:** `start: "top 80%"`, `toggleActions: "play none none none"`

#### c) Vision (`about-vision`) — Split Layout
* **Grid:** `display: grid; grid-template-columns: 1.3fr 1fr; gap: 5vw; align-items: start;`
  * Mobile: collapse to single column, image first.
* **Left Column (Text):**
  * Label: `Our Vision`
  * Headline: `To redefine independent cinema`
  * Body: `We believe in the power of authentic voices. Every frame we capture is dedicated to truth, beauty, and emotional resonance.`
  * **Sticky behaviour (desktop only):** `position: sticky; top: 15vh;` on text wrapper so image scrolls past.
* **Right Column (Image):**
  * Asset: vision/festival image from Supabase CDN.
  * Parallax: image inside overflow-hidden container, `scale: 1.15`, translateY driven by scroll.
* **Entrance animation:**
  * Text col → fade-up `translateY(60px→0)`
  * Image col → fade-in + subtle `scale(1.08→1)`

#### d) Services (`about-services`) — 2×2 Grid
* **Grid:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;`
  * Mobile: `1fr`
* **Cards:**
  * `.glass-card` style → transparent bg, `1px solid var(--border-color)`, `border-radius: 12px`, `padding: 2.5rem`
  * Hover → `border-color: var(--border-hover)`, `transform: translateY(-4px)`, `box-shadow: 0 12px 40px rgba(0,0,0,0.4)`
  * Number → `Space Mono`, `0.65rem`, `text-muted` (01 → 04)
  * Title → `Playfair Display`, `1.5rem`
  * Description → `Space Mono`, `0.8rem`, `text-secondary`, max `35ch`
* **Services:**
  1. **Film Production** — "End-to-end visual storytelling from script to screen."
  2. **Festival Strategy** — "Navigating the global festival circuit with precision."
  3. **Post-Production** — "Color, sound, and edit that elevates every frame."
  4. **Distribution Support** — "Connecting bold cinema with audiences worldwide."

#### e) Stats (`about-stats`)
* **Background:** `var(--bg-secondary)` or very subtle `rgba(255,255,255,0.02)` strip.
* **Container:** Full width, centered inner container `max-width: 1100px`.
* **Layout:** `display: flex; justify-content: space-around;`
  * Mobile: `grid-template-columns: repeat(2, 1fr);`
* **Items:** Reuse existing HTML stat structure and `animateStats()` JS.
  * `Playfair Display` number, `2.5rem`
  * `Space Mono` label, `0.6rem`, uppercase
* **Entrance animation:** Staggered fade-up, `delay: 0.15s` between items.

#### f) Footer (`editorial-footer`)
* **Height:** `auto`, padding `4rem var(--cinema-pad-x)`
* **Content:** Logo SVG (same nav SVG) + `© 2026 Motion Studio. All rights reserved.`
* **Border:** `border-top: 1px solid var(--border-color)` on `#app` or `footer`

---

## 4. Contact Page Architecture

### 4.1. Page Skeleton (`contact.html`)

```
<nav class="glass-navbar"> … </nav>

<main class="contact-page">
  <section class="contact-hero split-layout">
    Left (50 %)  → giant headline
    Right (50 %) → short intro text
  </section>

  <section class="contact-info">
    3 info cards in a row
  </section>

  <section class="contact-location split-layout">
    Left → image
    Right → address + map link
  </section>

  <section class="contact-form">
    Form centered, max-width 600px
  </section>

  <section class="contact-social">
    Horizontal link row
  </section>

  <footer class="editorial-footer"> … </footer>
</main>
```

### 4.2. Section Details

#### a) Hero (`contact-hero`)
* **Layout:** Split 50/50 desktop, stacked mobile.
* **Left:**
  * Eyebrow: `Contact`
  * Headline: `Get in Touch` — `Playfair Display`, `clamp(3rem, 6vw, 5rem)`
* **Right:**
  * Body: `We'd love to hear about your next project. Whether it's a feature, documentary, or experimental piece — let's start the conversation.` → `Space Mono`, `0.85rem`, `text-secondary`
* **Background:** Optional subtle cinematic image at `opacity: 0.15` behind both columns.

#### b) Info Cards (`contact-info`)
* **Grid:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;`
  * Mobile: `1fr`
* **Cards:** Same `.glass-card` base.
* **Content:**
  1. **Email** — `hello@motion.studio` (mailto link, underline on hover)
  2. **Phone** — `+1 (555) 123-4567`
  3. **Hours** — `Mon - Fri: 9am - 6pm PST`

#### c) Location (`contact-location`) — Split Layout
* **Layout:** Mirror of About Vision. Left image, Right text.
* **Image:** Stüdyo/LA fotoğrafı.
* **Text:**
  * Label: `Visit Us`
  * Headline: `Our Studio`
  * Address block (3 lines)
  * Optional: "Get Directions" link styled as `.explore-btn-cinematic`.

#### d) Form (`contact-form`)
* **Container:** `max-width: 600px; margin: 0 auto; padding: 8rem 0;`
* **Fields (in order):**
  1. Name (text input)
  2. Email (email input)
  3. Project Type (select) → Feature, Documentary, Short, Commercial, Other
  4. Message (textarea, min-height `160px`)
* **Input style:** Reuse `.form-input` exactly (dark bg, subtle border, white text).
* **Submit button:** Reuse `.explore-btn-cinematic` (pill shape, transparent bg, white border).
* **Accessibility:** Each `<label>` is visible above its input (not placeholder-only).

#### e) Social (`contact-social`)
* **Layout:** Horizontal flex row, centered, gap `2rem`.
* **Links:** Instagram, IMDb, Vimeo — same `.social-link` style.

---

## 5. Animations (GSAP ScrollTrigger)

A single `about-contact-animations.js` file will power both pages.

### 5.1. Registration Pattern
```js
gsap.registerPlugin(ScrollTrigger);

const $ = (sel) => document.querySelectorAll(sel);
```

### 5.2. Reusable Entrance
```js
function revealSection(selector, options = {}) {
  const { y = 50, stagger = 0.12, duration = 0.9 } = options;
  const sections = document.querySelectorAll(selector);

  sections.forEach((section) => {
    const children = section.querySelectorAll('.anim-child');
    gsap.from(children.length ? children : section, {
      y,
      opacity: 0,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });
  });
}
```
### 5.3. Applied Targets
| Section | Elements | Trigger |
|---|---|---|
| `about-hero` | headline, eyebrow, subheadline | `onLoad` (no scroll) |
| `about-story` | body paragraph | `top 80%` |
| `about-vision` | text col, image col | `top 75%` |
| `about-services` | each `.glass-card` | `top 80%`, stagger 0.1s |
| `about-stats` | each `.stat-item` | `top 80%`, stagger 0.15s |
| `contact-hero` | headline, body | `onLoad` |
| `contact-info` | 3 cards | `top 80%`, stagger 0.1s |
| `contact-form` | inputs + button | `top 80%`, stagger 0.06s |

### 5.4. Parallax Images
```js
gsap.utils.toArray('.parallax-bg').forEach((img) => {
  gsap.to(img.querySelector('img'), {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});
```

---

## 6. Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| **Desktop** (> 1024px) | Split layouts active, sticky elements active, 2×2 grid, 3-col info |
| **Tablet** (768–1024px) | Split layouts collapse to single column but side-by-side where it fits, reduced padding |
| **Mobile** (< 768px) | Single column everywhere, sticky disabled, nav links compress, hero text center-aligned, `glass-card` full width |

### Mobile Specifics
* `--cinema-pad-x: 1.5rem;`
* Headlines shrink via `clamp()` so no media query needed for type.
* Split layouts become `display: flex; flex-direction: column;`.
* Parallax disabled (no scrub) for battery / performance.

---

## 7. What Gets Removed

From `about.html` and `contact.html`:
- `<div class="film-strip-wrapper">` and its children
- Scroll progress bar
- Navigation dots
- Infinite scroll / `handleScroll()` logic (these pages do NOT call it)
- `body.style.height` manipulation

---

## 8. What Stays Identical

- `index.html` and `js/main.js` (film-strip logic) untouched.
- `glass-navbar` markup & styles shared across all pages.
- `css/style.css` root variables, existing utility classes.
- Supabase CDN image URLs.
- Google Fonts link.

---

## 9. Deliverables

| File | Action |
|---|---|
| `about.html` | Full rewrite inside `<main>` |
| `contact.html` | Full rewrite inside `<main>` |
| `css/style.css` | Append new sections (About, Contact, Editorial, Glass Card, Animations) |
| `js/about-contact-animations.js` | New file — GSAP ScrollTrigger setup |
| `js/main.js` | Minor guard: ensure `handleScroll` short-circuits when `#filmStrip` is missing |

---

## 10. Open Questions / Decisions

1. **GSAP CDN or local?**  
   → Decision: CDN (`cdnjs.cloudflare.com`) is fine for now. No bundler in this project.

2. **Map embed in contact?**  
   → Decision: No iframe map. Static image + "Get Directions" link keeps the design pure and avoids third-party cookies / layout shift.

3. **Form backend?**  
   → Decision: No backend in this phase. Form will be `method="POST"` with `action="#"` as a placeholder, or a simple `mailto:` fallback with subject pre-filled.

---

## 11. Success Criteria

- [ ] About page reads like a premium editorial story, not a slideshow.
- [ ] Contact page is scannable and the form is reachable within 2 scrolls.
- [ ] Animations feel cinematic but do not block interaction (no layout shift).
- [ ] Mobile scores > 90 on Lighthouse Performance (no expensive repaints).
- [ ] `index.html` untouched — the film strip still works exactly as before.
