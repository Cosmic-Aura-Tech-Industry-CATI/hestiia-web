# Hestiia Restaurant Website — Documentation Package

Status: **Draft v0.1 for client and stakeholder review**. Documentation only. No application code has been written.

## Purpose
Developer-ready blueprint for a premium, frontend-first restaurant website for Hestiia Restaurant, Shyam Nagar, Kanpur. Another developer or AI coding agent should be able to implement from these files without guessing.

## Recommended reading order
| # | File | Purpose |
|---|------|---------|
| 1 | 03_CLIENT_QUESTIONNAIRE.md | What to ask the client first; what blocks development |
| 2 | 01_PRD.md | Product requirements, objectives, personas, scope, functional requirements |
| 3 | 02_REQUIREMENTS_REGISTER.md | Every requirement with status, priority (MoSCoW), validation |
| 4 | 04_INFORMATION_ARCHITECTURE.md | Sitemap, routes, navigation, footer, metadata |
| 5 | 05_LANDING_PAGE_SPECIFICATION.md | Section-by-section landing page spec and content inventory |
| 6 | 06_DESIGN_SYSTEM.md | Provisional design tokens and evaluation method |
| 7 | 07_ANIMATION_SPECIFICATION.md | GSAP / Motion / React Bits split and animation catalogue |
| 8 | 08_SYSTEM_ARCHITECTURE.md | Backend decision, diagrams, modules, deployment |
| 9 | 09_DATA_MODELS_AND_CONTENT_SCHEMAS.md | Typed static content structures |
| 10 | 10_INTEGRATIONS.md | Zomato, reservation providers, Instagram, Maps, phone, WhatsApp, analytics |
| 11 | 11_USER_JOURNEYS.md | Journeys A–F with diagrams and events |
| 12 | 12_SEO_ACCESSIBILITY_PERFORMANCE.md | SEO, WCAG 2.2 AA, performance, security, privacy, analytics |
| 13 | 13_TEST_PLAN_AND_ACCEPTANCE_CRITERIA.md | Test cases, device matrix, acceptance checklist |
| 14 | 14_IMPLEMENTATION_ROADMAP.md | 12 phases with dependencies and exit criteria |
| 15 | 15_RISKS_ASSUMPTIONS_AND_DECISIONS.md | Risks, assumptions, decisions, final client-decision list |

## Conventions
- **Status labels:** `Confirmed` (supplied by client), `Proposed` (needs approval), `Unknown` (must be collected), `Out of scope`.
- **Priority:** MoSCoW — Must / Should / Could / Won't (for now).
- **ID prefixes:** BR business objective, PER persona, FR functional, NFR non-functional, REQ register row, SEC section, AN animation, CMP component, INT integration, UJ journey, TC test, PH phase, RSK risk, ASM assumption, DEC decision, Q questionnaire item.
- **Nothing is verified** unless explicitly marked `Confirmed`. No external URL, API, asset, or test has been executed or checked in this package.

## Key decisions at a glance
- Architecture: **Option A — frontend-first**, React + Vite + TypeScript, static typed content, no backend/DB/auth/payments (DEC-001).
- Structure: **single long landing page with anchor navigation** + one small legal page (DEC-002).
- Animation: GSAP + ScrollTrigger (hero, scroll, masks, parallax); Motion for React (UI micro-interactions, menu, lightbox); React Bits only if justified (DEC-004).
- Bookings, menu, ordering stay **external** (Zomato / District / EazyDiner) (DEC-003).
- Pinterest reference **could not be accessed** (site blocks automated access). All visual properties are **Unknown**. Screenshot required (Q-005).
