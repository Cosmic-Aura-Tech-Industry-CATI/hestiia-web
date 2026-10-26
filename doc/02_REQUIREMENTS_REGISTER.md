# 02 — Requirements Register

Status key: **Confirmed** (client-supplied), **Proposed**, **Unknown**, **Out of scope**. Priority: MoSCoW.

## A. Business facts
| ID | Description | Category | Source | Priority | Status | Dependencies | Validation |
|----|-------------|----------|--------|----------|--------|--------------|-----------|
| REQ-001 | Name: Hestiia Restaurant | Business | Client brief | Must | Confirmed | Q-003/Q-004 spelling check | Client sign-off |
| REQ-002 | Pure vegetarian restaurant | Business | Client brief | Must | Confirmed | Q-024 certification | Client sign-off |
| REQ-003 | Address: 1-B, Ram Puram, Shyam Nagar, Kanpur, UP 208013 | Business | Client brief | Must | Confirmed | — | Compare with GBP |
| REQ-004 | Phone: +91 78808 40622 | Business | Client brief | Must | Confirmed | Q-013 | Test call |
| REQ-005 | Cuisines: North Indian veg, Chinese veg, fast food/snacks, desserts/beverages | Content | Client brief | Must | Confirmed | — | Client sign-off |
| REQ-006 | Services: private dining room, vegan options, live music | Content | Client brief ("known") | Must | Confirmed (existence); details Unknown | Q-015, Q-016 | Client confirmation |
| REQ-007 | Occasions (family, birthdays, kitty parties, groups) | Content | Client brief | Should | Proposed — must confirm before publishing | Q-015 | Client confirmation |
| REQ-008 | Budget ₹200–₹400 per person | Content | Client brief | Could | Unknown (unverified) | Q-017 | Client confirmation |
| REQ-009 | Existing links: Zomato menu, Instagram, 3 reservation links, Google Maps | Integration | Client brief | Must | Confirmed (URLs supplied; not tested) | Link check | Manual click + link checker |

## B. Missing inputs
| ID | Description | Category | Source | Priority | Status | Dependencies | Validation |
|----|-------------|----------|--------|----------|--------|--------------|-----------|
| REQ-010 | Logo and brand assets | Asset | — | Must | Unknown | Q-001 | Files received |
| REQ-011 | Brand colors/fonts | Design | — | Must | Unknown | Q-002 | Client approval |
| REQ-012 | Pinterest reference screenshot (link not accessible to automation) | Design | Client brief | Must | Unknown | Q-005 | Screenshot received |
| REQ-013 | Real restaurant photographs | Asset | — | Must | Unknown | Q-006 | ≥ 8 gallery + hero |
| REQ-014 | Verified menu items and prices | Content | — | Should | Unknown | Q-014 | Menu sheet signed |
| REQ-015 | Opening hours | Content | — | Must | Unknown | Q-012 | Client confirmation |
| REQ-016 | Live music schedule | Content | — | Could | Unknown | Q-016 | Client confirmation |
| REQ-017 | Reservation provider preference | Decision | — | Must | Unknown | Q-018 | Client decision |
| REQ-018 | Booking external vs on-site | Decision | — | Must | Unknown (assumed external) | Q-008 | DEC-003 |
| REQ-019 | Backend/admin dashboard need | Decision | — | Must | Unknown (assumed none) | Q-009 | DEC-001 |
| REQ-020 | Online ordering need | Decision | — | Won't | Unknown (assumed none) | Q-010 | Client decision |
| REQ-021 | Enquiry channel (email/WhatsApp/other) | Decision | — | Should | Unknown | Q-011 | Client decision |
| REQ-022 | Hosting and domain | Infra | — | Must | Unknown | Q-020 | DNS access |
| REQ-023 | GBP and analytics access | SEO | — | Should | Unknown | Q-021 | Access granted |
| REQ-024 | Site languages | Content | — | Should | Unknown (assumed English) | Q-022 | Client decision |
| REQ-025 | Budget and deadline | Project | — | Must | Unknown | Q-023 | Written confirmation |

## C. Product functional requirements (see 01_PRD.md for detail)
| ID | Description | Category | Source | Priority | Status | Dependencies | Validation |
|----|-------------|----------|--------|----------|--------|--------------|-----------|
| REQ-030 | FR-001 Primary nav | Functional | PRD | Must | Proposed | — | TC-001 |
| REQ-031 | FR-002 Mobile nav | Functional | PRD | Must | Proposed | — | TC-002 |
| REQ-032 | FR-003 Hero CTAs | Functional | PRD | Must | Proposed | REQ-013 | TC-003 |
| REQ-033 | FR-004 Brand story | Functional | PRD | Must | Proposed | Copy | TC-004 |
| REQ-034 | FR-005 Cuisine browsing | Functional | PRD | Must | Proposed | REQ-005 | TC-005 |
| REQ-035 | FR-006 Menu preview + external link | Functional | PRD | Must | Proposed | REQ-009, REQ-014 | TC-006 |
| REQ-036 | FR-007 Gallery + lightbox | Functional | PRD | Must | Proposed | REQ-013 | TC-007 |
| REQ-037 | FR-008 Services | Functional | PRD | Must | Proposed | REQ-006 | TC-008 |
| REQ-038 | FR-009 Reservation links | Functional | PRD | Must | Proposed | REQ-017 | TC-009 |
| REQ-039 | FR-010 Contact/directions | Functional | PRD | Must | Proposed | REQ-003/004/015 | TC-010 |
| REQ-040 | FR-012 Instagram link | Functional | PRD | Must | Proposed | — | TC-011 |
| REQ-041 | FR-013 Footer | Functional | PRD | Must | Proposed | — | TC-012 |
| REQ-042 | FR-014 Analytics events | Functional | PRD | Should | Proposed | Consent decision | TC-013 |
| REQ-043 | FR-015 Preloader | Functional | PRD | Could | Proposed | — | TC-014 |
| REQ-044 | FR-016 Reviews | Functional | PRD | Could | Proposed | Q-019 | TC-015 |
| REQ-045 | FR-017 Enquiry form | Functional | PRD | Won't (MVP) | Proposed (conditional) | Q-008, Q-011 | TC-016 |
| REQ-046 | FR-018 WhatsApp link | Functional | PRD | Could | Proposed | Q-011, Q-013 | TC-017 |
| REQ-047 | FR-019 404 page | Functional | PRD | Should | Proposed | — | TC-018 |
| REQ-048 | FR-020 Reduced motion | Functional | PRD | Must | Proposed | — | TC-019 |

## D. Non-functional
| ID | Description | Category | Source | Priority | Status | Dependencies | Validation |
|----|-------------|----------|--------|----------|--------|--------------|-----------|
| REQ-060 | Core Web Vitals targets (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) | Performance | Industry thresholds | Must | Proposed | Final assets | Lighthouse + field data |
| REQ-061 | WCAG 2.2 AA where practical | Accessibility | Brief | Must | Proposed | — | axe + manual |
| REQ-062 | Local SEO + valid structured data | SEO | Brief | Must | Proposed | REQ-015 | Rich Results Test |
| REQ-063 | Safe external links, security headers | Security | Brief | Must | Proposed | Host | Header scan |
| REQ-064 | Privacy notice + consent where applicable | Privacy | Brief | Should | Proposed | Analytics decision | Review |
| REQ-065 | Browser/device matrix pass | Quality | Brief | Must | Proposed | — | TC-020+ |

## E. Technical decisions and design
| ID | Description | Category | Source | Priority | Status | Dependencies | Validation |
|----|-------------|----------|--------|----------|--------|--------------|-----------|
| REQ-070 | React + Vite + TypeScript frontend | Tech | Brief + DEC-001 | Must | Proposed | — | Build passes |
| REQ-071 | GSAP + ScrollTrigger for complex sequences | Tech | Brief | Must | Proposed | — | AN specs |
| REQ-072 | Motion for React for UI transitions | Tech | Brief | Must | Proposed | — | AN specs |
| REQ-073 | React Bits components, selectively | Tech | Brief | Could | Proposed | Reference screenshot | Justification log |
| REQ-074 | Visual direction follows Pinterest reference | Design | Brief | Must | Unknown (reference inaccessible) | REQ-012 | Side-by-side review |
| REQ-075 | Static typed content (no DB) | Tech | DEC-001 | Must | Proposed | — | Type check |

## F. Out of scope (MVP)
| ID | Description | Status |
|----|-------------|--------|
| REQ-090 | Backend/database | Out of scope |
| REQ-091 | Authentication | Out of scope |
| REQ-092 | Payments | Out of scope |
| REQ-093 | Online ordering | Out of scope |
| REQ-094 | Admin dashboard | Out of scope |
| REQ-095 | In-site booking engine | Out of scope |
