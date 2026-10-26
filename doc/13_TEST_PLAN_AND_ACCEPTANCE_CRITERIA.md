# 13 — Test Plan and Acceptance Criteria

**No tests have been executed.** All statuses are `Planned` until actual runs are recorded with date, tester, build version, and evidence.

## 1. Strategy
Component (Vitest + RTL) · Integration · User-flow e2e (Playwright) · Responsive (manual + Playwright viewports) · Cross-browser · Accessibility (axe, manual keyboard, screen reader) · Performance (Lighthouse CI, WebPageTest) · SEO (Rich Results Test, Search Console) · External-link verification · Animation + reduced-motion · Production build validation.

## 2. Test cases
| ID | Scenario | Preconditions | Steps | Expected | Priority | Status |
|----|----------|---------------|-------|----------|----------|--------|
| TC-001 | Desktop nav anchors (FR-001) | Page loaded | Click each nav link | Scrolls to section; active state updates; focus lands sensibly | P1 | Planned |
| TC-002 | Mobile menu (FR-002) | 390px viewport | Open, tab, Esc, select link | Focus trapped, Esc closes, focus returns, link scrolls & closes | P1 | Planned |
| TC-003 | Hero CTAs (FR-003) | 360×640 | Load; inspect | H1 + CTAs visible without scroll; events fire | P1 | Planned |
| TC-004 | Story content (FR-004) | Copy approved | Review | Only approved facts present | P2 | Planned |
| TC-005 | Cuisine cards (FR-005) | — | View section; keyboard | 4 categories; no pin on <1024; event once | P1 | Planned |
| TC-006 | Menu link (FR-006) | — | Click "View full menu" | New tab to Zomato menu; `menu_click` fires | P1 | Planned |
| TC-007 | Gallery/lightbox (FR-007) | ≥8 images | Open, arrows, Esc, swipe | Navigation works; focus returns; no CLS | P1 | Planned |
| TC-008 | Services render (FR-008) | Data flags | Toggle `pending` | Pending hidden in prod build | P1 | Planned |
| TC-009 | Reservation links (FR-009) | Providers enabled | Click each | Correct provider URLs, new tab, `provider` param; no "confirmed" wording | P1 | Planned |
| TC-010 | Contact/directions/tel (FR-010) | Mobile device | Tap call, directions | Dialer shows +917880840622; Maps opens | P1 | Planned |
| TC-011 | Instagram (FR-012) | — | Click | Correct profile | P2 | Planned |
| TC-012 | Footer NAP (FR-013) | — | Compare to Visit section & JSON-LD | Identical | P1 | Planned |
| TC-013 | Analytics (FR-014) | Debug view; consent on/off | Trigger each event | Correct names/params; none before consent; no PII | P1 | Planned |
| TC-014 | Preloader (FR-015) | If built | Load; reduced motion | ≤1.2s, skippable, absent when reduced | P3 | Planned |
| TC-015 | Reviews (FR-016) | If built | Inspect | Only permissioned content | P3 | Planned |
| TC-016 | Enquiry form (FR-017) | Only if approved | Valid/invalid submits, spam | Validation, success wording, no storage | P2 | Planned (conditional) |
| TC-017 | WhatsApp (FR-018) | If enabled | Click mobile/desktop | Prefilled chat opens | P3 | Planned |
| TC-018 | 404 (FR-019) | — | Visit `/xyz` | Branded 404, noindex | P2 | Planned |
| TC-019 | Reduced motion (FR-020) | OS setting on | Load, scroll | No parallax/pin/preloader; all content visible | P1 | Planned |
| TC-020 | Keyboard-only pass | — | Tab through page | All operable, visible focus, no trap | P1 | Planned |
| TC-021 | Axe scan | Built site | Run axe on `/` and `/privacy` | 0 critical/serious | P1 | Planned |
| TC-022 | Screen reader spot-check | NVDA/VoiceOver/TalkBack | Nav, menu, lightbox | Names/roles announced | P2 | Planned |
| TC-023 | Contrast audit | Final tokens | Check pairs | Meets WCAG thresholds | P1 | Planned |
| TC-024 | Lighthouse mobile | Prod build | Run 5× | Meets targets in 12 §3 | P1 | Planned |
| TC-025 | CLS/fonts/images | Throttled | Record | CLS ≤0.1 | P1 | Planned |
| TC-026 | JS budget | Build analyzer | Inspect | Within 12 §3 | P2 | Planned |
| TC-027 | SEO tags | Prod | View source | Title, meta, canonical, OG, H1 present without JS | P1 | Planned |
| TC-028 | Structured data | Prod | Rich Results Test | Valid; confirmed fields only | P1 | Planned |
| TC-029 | sitemap/robots | Prod | Fetch | Valid, correct domain | P2 | Planned |
| TC-030 | External-link verification | Network | Click each INT link | Resolve, correct destination (manual if bot-blocked) | P1 | Planned |
| TC-031 | Animation cleanup | Dev StrictMode | Mount/unmount, resize | No duplicate triggers, no leaks | P2 | Planned |
| TC-032 | Animation ownership | Code review | Check each element | Single owner per element | P2 | Planned |
| TC-033 | Resize/orientation | — | Rotate/resize | ScrollTrigger refreshes, layout intact | P2 | Planned |
| TC-034 | Production build | CI | `build` + preview | No console errors; content validation passes; no placeholders | P1 | Planned |
| TC-035 | Security headers | Prod | Header scan | CSP/HSTS etc. present | P2 | Planned |
| TC-036 | Image failure | Block image | Reload | Fallback, no layout break | P3 | Planned |
| TC-037 | JS disabled | — | Load | Core content/links readable | P2 | Planned |

## 3. Device & viewport matrix
| Category | Targets |
|----------|---------|
| Phones | 320×568, 360×640 (Android), 390×844 (iPhone), 412×915 |
| Tablets | 768×1024, 820×1180 |
| Desktops | 1280×720, 1440×900, 1920×1080 |
| Browsers | Chrome, Edge, Firefox, Safari (macOS, iOS), Samsung Internet; latest 2 versions |
| Real devices | ≥1 mid/low-end Android, ≥1 iPhone (**availability Unknown**) |
| Network | Fast 4G + Slow 4G throttle |

## 4. Acceptance criteria — MVP release checklist
| # | Criterion | Planned | Executed |
|---|-----------|---------|----------|
| 1 | All Must FRs pass their TCs | ☑ | ☐ |
| 2 | Only Confirmed content published; no placeholders/pending items | ☑ | ☐ |
| 3 | Every external link verified working | ☑ | ☐ |
| 4 | NAP consistent across site, JSON-LD, GBP | ☑ | ☐ |
| 5 | CWV targets met in lab on prod build | ☑ | ☐ |
| 6 | axe: 0 critical/serious; keyboard + SR checks pass | ☑ | ☐ |
| 7 | Reduced-motion verified | ☑ | ☐ |
| 8 | Responsive matrix pass | ☑ | ☐ |
| 9 | SEO/structured data valid; sitemap submitted | ☑ | ☐ |
| 10 | Analytics events verified; consent behavior correct | ☑ | ☐ |
| 11 | Client written sign-off on content, design, scope | ☑ | ☐ |
"Executed" column stays empty until a real run is documented.
