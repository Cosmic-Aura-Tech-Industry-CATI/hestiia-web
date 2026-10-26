# 05 — Landing Page Specification

Order is **provisional** (DEC-006). Pinterest reference is inaccessible, so order is justified by conversion priorities only and must be re-checked against the reference screenshot (Q-005).

**Order rationale:** Hero (instant clarity + CTAs) → Story (trust, pure-veg identity) → Cuisine (what you can eat) → Gallery (appetite + ambience) → Experience (why choose us / occasions) → Menu preview (decision support) → Reviews (optional proof) → Visit/Reserve (conversion) → Footer. Reservation CTAs also appear in nav and hero so conversion is never more than one tap away.

**Evaluated sections:** Preloader (Could, optional), Reviews (Could, only with verified content). Others Must.

Common to all sections: semantic `<section aria-labelledby>`, single H2, unique anchor ID, reduced-motion fallback (see 07), images with explicit dimensions, no unverified claims.

---
## SEC-001 Preloader / brand intro (Could)
- **Purpose:** Brand moment. **User objective:** none; must not delay.
- **Content:** Logo/wordmark, ≤1.2s. **Copy:** none.
- **Layout:** Full-viewport overlay, brand background.
- **Image:** Logo only. **Interaction:** Skippable; shown once per session.
- **Animation:** AN-001. **Responsive:** same. **A11y:** `aria-hidden` overlay, no focus trap, content not blocked from AT; disabled if reduced motion.
- **SEO:** none (content must be in DOM at load). **Analytics:** none.
- **Acceptance:** LCP target still met; absent under reduced motion; never shown on `/privacy`.

## SEC-002 Navigation (Must)
- **Purpose:** Orientation + persistent CTA. **Objective:** reach any section/action.
- **Content:** Logo, 6 anchors, Reserve CTA. **Copy direction:** short nouns.
- **Layout:** Sticky; transparent over hero → solid after scroll threshold. Mobile hamburger.
- **Image:** Logo SVG. **Interaction:** active-section highlighting; hide-on-scroll-down optional.
- **Animation:** AN-002 (header state), AN-003 (mobile menu). **Responsive:** see FR-002.
- **A11y:** `<nav aria-label="Primary">`, skip link, visible focus. **SEO:** crawlable anchor links. **Analytics:** `nav_click` (optional), `reservation_click` on CTA.
- **Acceptance:** FR-001/002 pass.

## SEC-003 Hero (Must) — `#top`
- **Purpose:** Communicate identity, drive action. **Objective:** understand place + act.
- **Content:** H1 (name + "Pure Vegetarian Restaurant, Kanpur"), sub-line, 2–3 CTAs, hero image/video poster.
- **Copy direction:** warm, appetizing, short; no unverifiable superlatives ("best", "No.1").
- **Layout:** Full-viewport; text left/center, image right/background (**reference-dependent, Unknown**).
- **Image:** 1 hero (min 2000px wide; AVIF/WebP + JPEG fallback; art-directed mobile crop). **Interaction:** CTA buttons. **Animation:** AN-004 hero timeline (GSAP), AN-005 parallax.
- **Responsive:** stack on mobile; CTAs full width; hero height `100svh` capped.
- **A11y:** H1 contrast over image ≥4.5:1 (overlay); decorative image alt `""` or descriptive. **SEO:** H1 with brand + category + city context. **Analytics:** `reservation_click`, `menu_click`, `phone_click`.
- **Acceptance:** FR-003; LCP ≤2.5s on mobile test profile; CTAs above fold at 360×640.

## SEC-004 Our Story (Must) — `#story`
- **Purpose:** Trust and identity. **Objective:** learn what makes Hestiia distinct.
- **Content:** 80–150 words, signature image, pure-veg statement; optional FSSAI/veg mark if confirmed.
- **Copy direction:** first person plural, sensory, factual. **Layout:** two-column text + image; image mask reveal.
- **Animation:** AN-006 (mask reveal), AN-007 (text line reveal). **Responsive:** single column.
- **A11y:** real text (not text-in-image). **SEO:** keyword-natural mention of Shyam Nagar, Kanpur. **Analytics:** none.
- **Acceptance:** FR-004; only client-approved facts.

## SEC-005 Cuisine Discovery (Must) — `#cuisine`
- **Purpose:** Show breadth. **Objective:** find what to eat.
- **Content:** 4 categories (CMP-CuisineCard): name, one-line description, image. No unverified dish claims.
- **Layout:** Horizontal scroll-pinned panels (desktop) / vertical cards or snap carousel (mobile) — **reference-dependent**. 
- **Animation:** AN-008 (ScrollTrigger pin/horizontal on desktop only), AN-009 (card hover, Motion). 
- **Responsive:** disable pinning < 1024px. **A11y:** content reachable without scroll hijack; keyboard focus order logical; no trap.
- **SEO:** H3 per cuisine. **Analytics:** `cuisine_section_view` (param `cuisine_id`).
- **Acceptance:** FR-005.

## SEC-006 Food Gallery (Must) — `#gallery`
- **Purpose:** Appetite + ambience proof. **Objective:** browse photos.
- **Content:** ≥8 real images (food, interior, private dining if confirmed), captions optional.
- **Layout:** Masonry / uniform grid; ratios per design system. Lightbox on click.
- **Animation:** AN-010 (staggered reveal), AN-011 (lightbox, Motion). 
- **Responsive:** 1–2 cols mobile, 3–4 desktop. **A11y:** buttons wrapping images, alt text, lightbox dialog semantics, arrow keys, Esc, focus return.
- **SEO:** descriptive alt/filenames; lazy loading below fold. **Analytics:** `gallery_open` (param `image_id`).
- **Acceptance:** FR-007.

## SEC-007 Dining Experience & Services (Must) — `#experience`
- **Purpose:** Show ambience/features/occasions. **Objective:** judge fit for visit/event.
- **Content:** Service cards (private dining room, vegan options, live music) — only confirmed; occasions list only after Q-015.
- **Copy direction:** factual; avoid promises on capacity, decor, music schedule until confirmed.
- **Layout:** icon + title + 1–2 lines, optional photo. 
- **Animation:** AN-012 (stagger fade-up), AN-009 hover. **A11y:** icons decorative `aria-hidden`.
- **SEO:** supports "private dining", "vegan options" queries (only if confirmed). **Analytics:** `service_cta_click` (param `service_id`) if CTA.
- **Acceptance:** FR-008.

## SEC-008 Menu Preview (Must) — `#menu`
- **Purpose:** Reduce friction to decide. **Objective:** see sample menu, open full menu.
- **Content:** Category highlights (and verified dishes/prices if supplied), "View full menu on Zomato" button. Optional budget indicator (only if Q-017 approved).
- **Layout:** Category tabs or columns; compact list.
- **Animation:** AN-013 (tab transition, Motion). **A11y:** tabs follow ARIA tabs pattern or use simple headings/accordion.
- **SEO:** crawlable text menu items (if verified). **Analytics:** `menu_click`.
- **Acceptance:** FR-006.

## SEC-009 Reviews (Could) — `#reviews`
- **Purpose:** Social proof. **Content:** links to Google/Zomato reviews or permission-cleared quotes with source. **Never fabricate.**
- **Layout:** quote cards or link row. **Animation:** subtle fade. **Analytics:** `review_link_click`.
- **Acceptance:** FR-016; section omitted if no verified content (clarity over completeness).

## SEC-010 Reservations & Contact (Must) — `#visit`
- **Purpose:** Convert. **Objective:** book, call, or navigate.
- **Content:** Address, phone, hours (TBD), Get Directions, provider buttons, Instagram, optional WhatsApp, optional map image.
- **Copy direction:** "You will complete your booking on [provider]." For groups: "Call us to discuss private dining" (only if confirmed).
- **Layout:** two-column: actions left, address/map right. 
- **Animation:** AN-014 (CTA emphasis, Motion). **Responsive:** actions first on mobile.
- **A11y:** link text describes destination; external-link icon + "opens in new tab" in accessible name.
- **SEO:** NAP matches schema and footer. **Analytics:** `reservation_click`, `phone_click`, `directions_click`, `instagram_click`, `whatsapp_click`.
- **Acceptance:** FR-009, FR-010, FR-012.

## SEC-011 Footer (Must)
See 04 §5. **Acceptance:** FR-013.

---
## Content inventory
| ID | Item | Type | Status | Needed from |
|----|------|------|--------|-------------|
| CI-001 | Logo (SVG, light/dark) | Image | Needed | Client |
| CI-002 | Favicon + app icons | Image | Needed (derive from logo) | Client/Design |
| CI-003 | Hero image(s) | Image | Needed | Client photos |
| CI-004 | H1 + sub-copy | Text | Proposed draft | Approve |
| CI-005 | Story copy + image | Text/Image | Needed | Client |
| CI-006 | 4 cuisine descriptions + images | Text/Image | Descriptions Proposed; images Needed | Client |
| CI-007 | ≥8 gallery images + alt text | Image | Needed | Client |
| CI-008 | Service descriptions (3 known) | Text | Proposed; details Needed | Client |
| CI-009 | Menu highlights/prices | Text | Needed (verify) | Client |
| CI-010 | Reviews/quotes + permission | Text | Needed (optional) | Client |
| CI-011 | Opening hours | Text | Needed | Client |
| CI-012 | Address, phone | Text | **Ready (Confirmed)** | — |
| CI-013 | Zomato menu link | Link | **Ready (supplied; untested)** | — |
| CI-014 | Reservation links ×3 | Link | **Ready (supplied; untested)** | Client choose preferred |
| CI-015 | Instagram link | Link | **Ready (supplied; untested)** | — |
| CI-016 | Google Maps directions link | Link | **Ready (supplied; untested)** | — |
| CI-017 | OG image 1200×630 | Image | Needed | Design |
| CI-018 | Icons (phone, map pin, Instagram, external, leaf/veg, music, etc.) | Icon | Proposed icon set | Design |
| CI-019 | Meta titles/descriptions | Metadata | Proposed (see 04) | Approve |
| CI-020 | Privacy notice text | Text | Needed | Client/legal |
| CI-021 | WhatsApp number + prefilled text | Text | Unknown | Client |
| CI-022 | FSSAI/veg mark | Text/Image | Unknown | Client |
