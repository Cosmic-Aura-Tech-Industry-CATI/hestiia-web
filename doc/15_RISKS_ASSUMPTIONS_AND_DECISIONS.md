# 15 — Risks, Assumptions, Decisions, Final Review

## 1. Risks
| ID | Risk | Impact | Likelihood | Mitigation |
|----|------|--------|-----------|-----------|
| RSK-001 | Client delays answers/assets | Schedule | Medium | Tiered questionnaire; provisional placeholders; deadlines for Tier A |
| RSK-002 | Pinterest reference inaccessible or not a restaurant design | Design mismatch | **High (already occurred: inaccessible)** | Request screenshot; mark visuals Unknown; design review gate (06 §17) |
| RSK-003 | Low-quality/insufficient photos | Brand/premium feel, LCP | Medium | Photo brief/shot list; client photography session; avoid stock that misrepresents |
| RSK-004 | Third-party URLs change/blocked | Broken CTAs | Medium | Data-driven links; link checks; phone fallback |
| RSK-005 | Scope creep (ordering, backend, payments) | Cost/time | Medium | MoSCoW; change-control; Phase 2 backlog |
| RSK-006 | Heavy animation harms performance/accessibility | UX, SEO | Medium | Budgets, reduced motion, lazy load, matchMedia, single-owner rule |
| RSK-007 | Domain/DNS/hosting access delays | Launch | Medium | Ask early (Q-020) |
| RSK-008 | Unverified claims (services, budget, hours, "pure veg" certification) published | Trust/legal | Medium | `status` flags; build validation; client sign-off |
| RSK-009 | Library licence/version changes (GSAP, Motion, React Bits) | Build/legal | Low | Verify at PH-05; pin versions |
| RSK-010 | Privacy/consent non-compliance | Legal | Low-Med | Minimal data; privacy notice; legal review |
| RSK-011 | Owner cannot edit menu without developer | Operations | Medium | Link to Zomato menu; Phase-2 CMS option |
| RSK-012 | Inconsistent NAP across platforms | Local SEO | Medium | NAP audit before launch |

## 2. Assumptions (provisional; replace when answered)
| ID | Assumption | Related Q |
|----|-----------|-----------|
| ASM-001 | No backend/admin/ordering/payments needed | Q-008/009/010 |
| ASM-002 | Bookings happen on external providers | Q-008/018 |
| ASM-003 | English-only site | Q-022 |
| ASM-004 | Majority of traffic is mobile | — (verify with analytics) |
| ASM-005 | Menu is accessed via Zomato link; no prices published until verified | Q-014 |
| ASM-006 | Supplied URLs are correct and public (untested) | Q-018 |
| ASM-007 | Analytics wanted (GA4 or equivalent) | Q-021/027 |
| ASM-008 | Client can supply photos or approve a shoot | Q-006 |
| ASM-009 | Phone number also serves WhatsApp — **not assumed**; WhatsApp stays optional | Q-013 |
| ASM-010 | Developer (not owner) maintains content in MVP | Q-025 |

## 3. Decision log
| ID | Decision | Status | Rationale / alternatives |
|----|----------|--------|--------------------------|
| DEC-001 | Frontend-first (Option A), no backend | Proposed | Lowest cost/risk; CMS deferred |
| DEC-002 | Single landing page + `/privacy` + 404 | Proposed | Simplest; avoids thin pages |
| DEC-003 | Menu and bookings external | Proposed | No API assumed; minimal data |
| DEC-004 | GSAP (scroll/timelines) / Motion (UI) / React Bits (selective) split with single-owner rule | Proposed | Avoid conflicts |
| DEC-005 | Primary hero CTA = Reserve → scroll to `#visit`; provider ordering by client | Proposed, **needs client** | Avoid choosing provider for client |
| DEC-006 | Section order per 05 | Proposed; revalidate vs reference | Conversion priorities |
| DEC-007 | Styling: CSS variables + CSS Modules (Tailwind acceptable alternative) | Proposed | Token-driven design |
| DEC-008 | Prerender/inline SEO content for `/` | Proposed | Crawlability, social previews |
| DEC-009 | Consent approach: banner vs cookieless analytics | **Open** | Legal/product |
| DEC-010 | Enquiry form excluded from MVP | Proposed | Needs Q-008/Q-011 |

## 4. Final review (documentation QA)
1. **Missing sections:** all 23 required topics covered across files 01–15 + README. ✔ (self-review)
2. **Consistency:** scope (MVP, Option A, single page), stack (React/Vite/TS, GSAP, Motion, React Bits selective), IDs (FR↔REQ↔TC) aligned. ✔ (self-review; not peer-reviewed)
3. **Supplied details:** name, address, phone, cuisines, services, URLs reproduced as given. ✔
4. **Unverified flags:** budget ₹200–₹400, occasions, live-music schedule, hours, menu/prices, reservation URLs, reference design, certification — all flagged Unknown/Proposed.
5. **Architecture supports PRD:** yes; each FR has a section, data model and integration.
6. **Animation split clear:** see 07 §1.
7. **MVP acceptance criteria:** every Must FR has criteria + TC.
8. **No unnecessary backend/payments:** confirmed excluded.
9. **Roadmap follows dependencies:** yes (critical path in 14).
10. **No external verification performed:** URLs, library versions, thresholds and the Pinterest reference were not checked against live sources (Pinterest fetch was blocked).

## 5. Client decisions needed before development
1. Send Pinterest reference screenshot + say what to emulate (Q-005).
2. Logo, brand colors/fonts or approval for us to propose (Q-001/002).
3. Photos (≥ hero + 8 gallery) and rights (Q-006).
4. Preferred reservation provider(s) and CTA priority (Q-007/018).
5. External-only booking vs on-site enquiry; enquiry channel (Q-008/011).
6. Confirm no backend/admin/ordering (Q-009/010).
7. Verified phone/WhatsApp number (Q-013).
8. Confirm services and occasions; publishable budget; hours (Q-012/015/017).
9. Domain/hosting, analytics/GBP access (Q-020/021).
10. Budget, deadline, languages (Q-022/023).
