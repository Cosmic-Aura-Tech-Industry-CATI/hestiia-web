# 14 — Implementation Roadmap

No calendar dates or durations are given: deadline, budget and team size are **Unknown** (Q-023). Phases are dependency-ordered; some can overlap where noted.

Roles: PM = Product Manager, DES = UI/UX Designer, FE = Frontend Developer, QA = QA Engineer, CL = Client/Restaurant owner, SEO = SEO/Analytics specialist.

| Phase | Tasks | Deliverables | Dependencies | Exit criteria | Role | Risks |
|-------|-------|--------------|--------------|---------------|------|-------|
| **PH-01 Discovery & client approvals** | Send questionnaire; collect Tier A answers; request reference screenshot, logo, photos | Answered Q-001–Q-013, Q-018, Q-023; asset folder | None | All Tier A answered or consciously deferred with assumptions logged | PM, CL | Client slow to respond (RSK-001) |
| **PH-02 PRD & architecture approval** | Review docs 01–15; resolve DEC-001..009 | Signed PRD, scope, stack | PH-01 | Written approval of scope/MVP/Option A | PM, CL | Scope creep (RSK-005) |
| **PH-03 Design direction & wireframes** | Analyse reference; low-fi wireframes (mobile+desktop); confirm section order | Reference analysis table; wireframes; approved order | PH-01 reference, PH-02 | Client approves direction | DES, CL | Reference inaccessible/ambiguous (RSK-002) |
| **PH-04 Asset prep & content approval** | Photo selection/retouch; export responsive images; write/approve copy; confirm services, hours | Optimized assets, content files with `confirmed` status | PH-01 | All MVP content `confirmed` or removed | PM, DES, CL | Poor photo quality (RSK-003) |
| **PH-05 Design system & foundations** | Finalize tokens, fonts; scaffold Vite+React+TS; layout, Button, Link, Icon; content typings; CI | Repo, CI pipeline, token CSS, base components | PH-02, PH-03 | `build` + lint + typecheck pass; tokens match approved design | FE, DES | Token drift |
| **PH-06 Landing-page implementation** | Build SEC-002…SEC-011 statically (no animation); content wiring; responsive | Working static page with real content | PH-04, PH-05 | FR-001–013 functional; matches wireframes | FE | Missing content blocks |
| **PH-07 Animation implementation** | Implement AN-001…AN-015 per 07; select React Bits (if any); reduced motion | Animated page; animation log | PH-06 | Single-owner rule satisfied; reduced-motion pass; budget met | FE, DES | Perf regressions (RSK-006), library conflicts |
| **PH-08 External integrations** | Wire reservation, menu, Maps, tel, Instagram, WhatsApp (if approved), analytics + consent | Integrated links/events | PH-06 (parallel with PH-07) | Links verified; events appear in debug view | FE, SEO | Provider URL changes (RSK-004) |
| **PH-09 SEO, accessibility, performance** | Meta, JSON-LD, sitemap/robots, prerender; a11y fixes; image/font/JS optimization | SEO config; a11y report; perf report | PH-07, PH-08 | Targets in 12 met or exceptions approved | FE, SEO, QA | Animation vs CWV tension |
| **PH-10 QA & responsive refinements** | Execute test plan 13; fix defects; cross-browser/device | Executed test report | PH-09 | All P1 TCs pass; no open critical/major bugs | QA, FE | Limited real devices |
| **PH-11 Deployment & launch** | Domain/DNS, hosting, headers, redirects; client UAT; go-live checklist; GBP/Search Console | Live site, launch checklist | PH-10, Q-020 | Client sign-off; production smoke tests pass | FE, PM, CL | DNS access delays (RSK-007) |
| **PH-12 Post-launch monitoring** | Monitor uptime, CWV field data, events, Search Console; monthly link check; baseline capture | Monitoring report; baseline metrics | PH-11 | 4-week baseline recorded; issue backlog triaged | PM, SEO | Low traffic data |

## Critical path
PH-01 (reference + assets) → PH-03 → PH-04/05 → PH-06 → PH-07/08 → PH-09 → PH-10 → PH-11.

## Phase-2 backlog (post-MVP)
Hindi language; CMS for menu/gallery; enquiry workflow; events; reviews feed; online ordering (only if requested).
