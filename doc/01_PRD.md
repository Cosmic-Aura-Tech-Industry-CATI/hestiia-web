# 01 — Product Requirements Document (PRD)

Product: Hestiia Restaurant website · Version 0.1 (draft) · Owner: Product Manager (TBD) · Approver: Restaurant owner (TBD)

## 1. Executive summary
**What:** A responsive, premium, frontend-first marketing website for Hestiia Restaurant, a pure vegetarian restaurant at 1-B, Ram Puram, Shyam Nagar, Kanpur, Uttar Pradesh 208013 (phone +91 78808 40622). A single landing page presents the brand, cuisines, food gallery, dining experience, menu preview, and clear actions: call, get directions, view menu, reserve.

**Why:** The restaurant's presence today is split across third-party platforms (Zomato menu, District/EazyDiner reservations, Instagram). A branded home gives one trusted, searchable destination, controlled messaging, and measurable actions.

**Who:** Local Kanpur diners, families, couples, friends, group/celebration planners, and vegetarian/vegan-seeking users, mostly on mobile.

**Primary business value:** More direct reservation enquiries, calls and direction requests; easier menu discovery; improved local search visibility; consistent brand.

**First release (MVP):** Responsive landing page, story, cuisine sections, menu preview + external menu link, gallery, confirmed services, reservation links, contact/directions, Instagram link, SEO and analytics readiness. **No backend, no ordering, no payments, no login, no admin dashboard.**

## 2. Business objectives
No expected conversion percentages are promised. Baselines must be captured before launch.

| ID | Objective | Measurement | Baseline requirement |
|----|-----------|-------------|---------------------|
| BR-001 | Increase direct reservation enquiries | GA4 `reservation_click`, `phone_click` counts per week | Obtain current call/booking counts from owner or GBP; if none, first 4 weeks post-launch = baseline |
| BR-002 | Make menu discovery easier | `menu_click`, menu section scroll depth | Zomato menu click data unavailable → first 4 weeks baseline |
| BR-003 | Increase directions and phone clicks | `directions_click`, `phone_click`; GBP direction/call insights | GBP insights export (Q-021) |
| BR-004 | Improve local search visibility | Search Console impressions/clicks for brand + "vegetarian restaurant Kanpur" queries; GBP views | Search Console snapshot at launch |
| BR-005 | Consistent brand experience | Design review against approved reference + brand assets; NAP consistency audit | Brand assets approved (Q-001/002/005) |

## 3. Target audience (proposed personas — validate with client)
| ID | Persona | Goals | Needs | Pain points | Entry point | Desired action |
|----|---------|-------|-------|-------------|-------------|----------------|
| PER-001 | Family looking for vegetarian dining | Safe, pure-veg place for all ages | Menu variety, seating, location | Unsure if all-veg, parking/location unclear | Google search / GBP / Instagram | View menu, get directions, call |
| PER-002 | Couples and friends | Pleasant ambience, good food, budget | Photos, ambience, price range | Cannot gauge ambience | Instagram → site, Google Maps | Gallery → reserve |
| PER-003 | Customers checking menu & budget | Decide quickly | Menu, price range | Menu hidden on aggregators | Search "Hestiia menu" | Open menu |
| PER-004 | Groups / celebrations / kitty parties | Book space for a gathering | Private dining info, capacity, contact | No clear way to ask | Referral, search | Call / reserve (pending service confirmation) |
| PER-005 | Local vegetarian food seekers | Find options nearby | Local relevance, vegan options | Generic results | Google local pack | Directions, call |

## 4. Scope
| Tier | Items |
|------|-------|
| **MVP** | Responsive landing page; restaurant intro; cuisine sections; menu preview + external link; food gallery with lightbox; confirmed services/ambience; reservation links; contact + directions + click-to-call; Instagram link; footer; SEO + analytics readiness; privacy page (if analytics used); reduced-motion support |
| **Phase 2** | Editable menu CMS; direct booking *request* workflow; events management; additional language (Hindi); optional WhatsApp enquiry if not in MVP; reviews integration; online ordering **only if explicitly required** |
| **Future** | Loyalty/newsletter, event ticketing, private-dining enquiry portal, blog |
| **Won't (for now)** | Backend, database, authentication, payments, online ordering, admin dashboard, in-site booking engine |

## 5. Functional requirements
Global preconditions: site served over HTTPS; JavaScript enabled (core content readable without animation).

### FR-001 Primary navigation
- **Story:** As a visitor, I want a clear menu so I can jump to any section.
- **Priority:** Must · **Preconditions:** Page loaded.
- **Behavior:** Sticky header with logo + anchor links (Story, Cuisine, Gallery, Experience, Menu, Visit) + primary CTA. Active link reflects current section. Smooth scroll respects reduced motion.
- **Acceptance:** Every link scrolls to its section and updates focus target; active state highlights within ±1 section; keyboard operable; skip link exists.
- **Dependencies:** FR-011 sections exist. · **Edge:** JS fails → native anchor jumps still work; hash on load scrolls correctly.

### FR-002 Mobile navigation
- **Story:** As a mobile user, I want a simple menu.
- **Priority:** Must · **Preconditions:** viewport < md breakpoint.
- **Behavior:** Hamburger opens full-screen/drawer menu (Motion). Focus trapped, Esc closes, body scroll locked, closes on link select.
- **Acceptance:** `aria-expanded` toggles; focus returns to trigger on close; works with screen reader; ≥44×44px targets.
- **Edge:** Orientation change while open; reduced motion → no slide animation.

### FR-003 Hero with CTAs
- **Story:** As a visitor, I want to immediately know what Hestiia is and act.
- **Priority:** Must.
- **Behavior:** H1 with restaurant name + pure-veg descriptor; sub-copy; primary CTA "Reserve a Table" (scrolls to reservations or opens provider—DEC-005), secondary "View Menu"; optional tertiary "Call".
- **Acceptance:** H1 present once; LCP element is the hero image/text; CTAs visible above the fold at 360×640; CTA events fire.
- **Edge:** Hero image fails → solid brand background with text still legible.

### FR-004 Brand introduction (Our Story)
- **Priority:** Must. **Behavior:** Short story copy, pure-veg identity, signature image. Copy supplied/approved by client.
- **Acceptance:** Contains only confirmed facts; no invented history/awards.
- **Dependencies:** Q-003, copy approval. **Edge:** No copy supplied → use clearly marked placeholder (not publishable).

### FR-005 Cuisine browsing
- **Priority:** Must. **Behavior:** Four cuisine categories: North Indian vegetarian, Chinese vegetarian, Fast food & snacks, Desserts & beverages. Each has title, short description, image. Optional tab/accordion or scroll-pinned cards.
- **Acceptance:** All four present; keyboard-operable; `cuisine_section_view` fires once per category per session; no dish names/prices shown unless verified.
- **Edge:** Missing image → text-only card.

### FR-006 Menu preview and external menu link
- **Priority:** Must. **Behavior:** Preview of verified signature items (if provided) or category highlights; button "View full menu" opens Zomato menu in a new tab (`rel="noopener noreferrer"`).
- **Acceptance:** Link opens correct URL; `menu_click` fires; no unverified prices; disclaimer "Prices and availability on the menu link may change" shown if prices displayed.
- **Edge:** Zomato unavailable/blocked → page unaffected (external link only).

### FR-007 Food gallery
- **Priority:** Must. **Behavior:** Masonry/grid of ≥8 real photos; click opens lightbox (Motion) with prev/next, close, keyboard arrows, Esc.
- **Acceptance:** Images lazy-loaded with width/height; alt text present; lightbox focus-trapped; swipe on touch; no layout shift.
- **Edge:** Fewer than 8 images → grid adapts; image load failure → skeleton/hide item.

### FR-008 Dining experience & services
- **Priority:** Must. **Behavior:** Cards for confirmed services: private dining room, vegan options, live music. Occasions (birthday, kitty party, group) shown **only after confirmation** (Q-015).
- **Acceptance:** Only confirmed services rendered; each service flagged `confirmed: true` in data; unconfirmed items absent from production build.
- **Edge:** Live music schedule unknown → say "Ask us about live music" only if client approves wording.

### FR-009 Reservation links
- **Priority:** Must. **Behavior:** Section lists provider buttons (District, Zomato, EazyDiner) per approved preference; each opens externally with provider name label.
- **Acceptance:** Links open in new tab; `reservation_click` with `provider` param fires; site never states a booking is confirmed; microcopy: "You will complete your booking on [provider]."
- **Edge:** Provider link dead → fallback shows phone CTA; link checker in CI/QA.

### FR-010 Contact and directions
- **Priority:** Must. **Behavior:** Address, phone (`tel:` link), hours (once supplied), "Get Directions" (Google Maps link), optional static map image.
- **Acceptance:** `tel:+917880840622` dials on mobile; directions link opens Maps app/web; NAP text identical to footer and structured data.
- **Edge:** Desktop without calling → number is copyable text.

### FR-011 Section order & page integrity
- **Priority:** Must. **Behavior:** Sections render in the order defined in 05_LANDING_PAGE_SPECIFICATION.md. Each has unique `id` for anchors.
- **Acceptance:** No duplicate IDs; every nav item maps to a section.

### FR-012 Instagram link
- **Priority:** Must. **Behavior:** Link/icon to https://www.instagram.com/hestiiarestaurant/ (new tab). No embedded feed in MVP.
- **Acceptance:** `instagram_click` fires; opens correct profile.

### FR-013 Footer
- **Priority:** Must. **Behavior:** NAP, quick links, social, reservation links, privacy link, copyright.
- **Acceptance:** NAP matches FR-010; all links valid.

### FR-014 Analytics events
- **Priority:** Should (Must for launch measurement per BR). **Behavior:** Events per 12_SEO_ACCESSIBILITY_PERFORMANCE.md §Analytics, via a single `track()` wrapper; consent-aware.
- **Acceptance:** Each event verified in analytics debug view; no PII in params; no events fire before consent where consent is required.
- **Edge:** Ad-blocker → site works without errors.

### FR-015 Preloader / brand intro (optional)
- **Priority:** Could. **Behavior:** ≤1.2s intro, skippable, never blocks content or LCP; disabled for reduced motion and repeat visits.
- **Acceptance:** LCP target still met; skipped with `prefers-reduced-motion`.

### FR-016 Reviews (links/verified quotes)
- **Priority:** Could. **Behavior:** Link to Google/Zomato reviews or show permission-cleared quotes.
- **Acceptance:** No fabricated reviews; each quote has source + permission flag.

### FR-017 Enquiry form (only if approved)
- **Priority:** Won't (MVP) — becomes Should if Q-008/Q-011 approve it.
- **Behavior if approved:** Name, phone, date, party size, optional message; submit to approved channel; spam protection; explicit consent text.
- **Acceptance:** Labeled fields, inline errors, success state says "Enquiry sent — the restaurant will contact you" (never "booking confirmed"); no data stored beyond approved retention.
- **Edge:** Network failure → error with phone fallback.

### FR-018 WhatsApp enquiry link (optional)
- **Priority:** Could (pending Q-011/Q-013). **Behavior:** `https://wa.me/<number>?text=<prefilled>` link.
- **Acceptance:** Opens WhatsApp with prefilled generic text; `whatsapp_click` fires.

### FR-019 Error and 404 handling
- **Priority:** Should. **Behavior:** Unknown routes show branded 404 with home/call links.

### FR-020 Reduced-motion behavior
- **Priority:** Must. **Behavior:** When `prefers-reduced-motion: reduce`, parallax, pinning, large transforms and preloader are disabled; content visible immediately.
- **Acceptance:** Verified with OS setting on; no content hidden at load.

## 6. Non-functional requirements (summary)
Details in 12_SEO_ACCESSIBILITY_PERFORMANCE.md. IDs: NFR-001 Performance (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 target); NFR-002 Accessibility WCAG 2.2 AA where practical; NFR-003 SEO/local SEO; NFR-004 Security headers + safe external links; NFR-005 Privacy/data minimization; NFR-006 Browser support (last 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari 16+, Android Chrome); NFR-007 Maintainability (typed content files, edit without code logic); NFR-008 Availability via static hosting/CDN.

## 7. Out of scope
Online ordering, payments, authentication, admin dashboard, in-site booking engine, loyalty, blog, multi-language (Phase 2).

## 8. Open items
See 03_CLIENT_QUESTIONNAIRE.md and 15_RISKS_ASSUMPTIONS_AND_DECISIONS.md.
