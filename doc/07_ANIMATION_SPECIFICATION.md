# 07 — Animation Specification

Stack (from brief): React, GSAP, GSAP ScrollTrigger, Motion for React, selected React Bits. **No animation is implemented in this phase.** Library licensing/version facts must be verified at implementation time (GSAP licence terms, Motion and React Bits licences and install method).

## 1. Division of responsibility (DEC-004)
| Library | Owns | Must NOT |
|---------|------|----------|
| **GSAP + ScrollTrigger** | Hero timeline, scroll-linked sequences, pinning, image mask/clip reveals, controlled parallax | Animate React-state-driven UI (menu, modal) |
| **Motion for React** | Mobile menu, lightbox/modal, tab transitions, hover/tap micro-interactions, button states, presence (mount/unmount) | Scroll-triggered pinning or timelines |
| **React Bits** | At most 1–3 decorative components, only if they match the reference | Touch elements owned by GSAP/Motion |

**Single-owner rule:** each DOM element has exactly one animation owner (documented per AN row). Never animate the same property (`transform`, `opacity`) on one element with two systems. Wrap GSAP targets in dedicated wrappers separate from Motion-controlled children.

## 2. Setup rules
- Register ScrollTrigger once at app init; use `useGSAP`/`gsap.context()` inside components for scoped selectors and automatic revert on unmount.
- Use `gsap.matchMedia()` for desktop/mobile/reduced-motion branches.
- Use `ScrollTrigger.refresh()` after fonts and images settle; call on route changes (only `/` has triggers).
- Motion: `MotionConfig reducedMotion="user"`.
- Lazy-load GSAP/ScrollTrigger and heavy sections via dynamic import; hero animation JS must not delay LCP.
- Animate only `transform` and `opacity` (and clip-path where tested); avoid layout properties; limited `will-change` applied/removed around animation.

## 3. Animation catalogue
Columns: Trigger · Initial → Final · Duration · Easing · Stagger · Scroll · Mobile · Reduced motion · Risks · Cleanup. Owner in brackets. All values **Proposed**, tune against reference.

| ID | Element (owner) | Trigger | Initial → Final | Duration | Easing | Stagger | Scroll behavior | Mobile | Reduced-motion fallback | Performance risk | Cleanup |
|----|-----------------|---------|-----------------|----------|--------|---------|-----------------|--------|------------------|------------------|---------|
| AN-001 | Preloader (GSAP) | Page load | Overlay visible → slides/fades out | 0.8–1.2s | `power3.inOut` | — | none | Same, shorter | Not rendered | Delays content if misused | Remove overlay node; kill timeline |
| AN-002 | Header state (Motion/CSS) | Scroll > 80px | Transparent → solid bg | 0.2–0.3s | ease-out | — | Threshold via IntersectionObserver | Same | Instant swap | Low | Disconnect observer |
| AN-003 | Mobile menu (Motion) | Tap toggle | Closed → full drawer; links fade-up | 0.3–0.5s | `[0.22,1,0.36,1]` | 40–60ms | Lock body scroll | Primary | Opacity-only/instant | Scroll-lock bugs | AnimatePresence unmount; unlock scroll |
| AN-004 | Hero intro (GSAP timeline) | Load/after fonts ready | H1 lines y:40%/opacity0 → 0/1; sub, CTAs follow; image scale 1.1 → 1 | 0.9–1.4s total | `power3.out` | 0.08–0.12s | none | Reduced distances, simpler | Content visible immediately, no motion | LCP delay if image hidden | Context revert |
| AN-005 | Hero parallax (GSAP ScrollTrigger) | Scroll through hero | Image y 0 → -8% (scrub) | scrub 0.5–1 | none/linear | — | `scrub: true`, start top top, end bottom top | Disabled or ≤4% | Disabled | Jank on low-end | Kill trigger |
| AN-006 | Story image mask (GSAP) | Enter viewport (~80%) | clip-path inset(100% 0 0 0) → inset(0) | 0.9–1.2s | `power4.out` | — | `once: true` | Same, simpler | Visible, no mask | clip-path repaint | Revert context |
| AN-007 | Story text lines (GSAP) | Enter viewport | Lines y:24/opacity0 → 0/1 | 0.6–0.8s | `power2.out` | 0.06s | once | Same | Visible | SplitText cost; ensure accessible text kept | Revert split |
| AN-008 | Cuisine horizontal pin (GSAP ScrollTrigger) | Section pinned, desktop ≥1024 | Panels translateX scrub | scrub | linear | — | `pin`, `end: +=width` | **Disabled** → vertical cards | Vertical static | Scroll hijack, a11y, layout shift | Kill pin; `refresh` |
| AN-009 | Card/button hover (Motion) | Hover/focus/tap | scale 1 → 1.02, shadow | 0.2s | spring (stiffness 300, damping 25) | — | — | Tap feedback only | No scale | Low | n/a |
| AN-010 | Gallery reveal (GSAP batch) | Enter viewport | y:30/opacity0 → 0/1 | 0.5–0.7s | `power2.out` | 0.08s via `ScrollTrigger.batch` | once | Fewer stagger | Visible | Many triggers | Revert |
| AN-011 | Lightbox (Motion) | Open/close/next | Fade + scale 0.96 → 1; slide on navigate | 0.25–0.4s | ease-out | — | Lock scroll | Swipe gestures | Fade only/instant | Focus mgmt | AnimatePresence |
| AN-012 | Service cards (GSAP) | Enter viewport | y:24/opacity0 → 0/1 | 0.5–0.7s | `power2.out` | 0.1s | once | Same | Visible | Low | Revert |
| AN-013 | Menu tabs (Motion) | Tab change | Cross-fade/slide of list | 0.25s | ease-out | list items 30ms | — | Same | Instant | Layout shift (reserve height) | n/a |
| AN-014 | Reserve CTA emphasis (Motion) | Hover/in-view once | Subtle pulse/underline | 0.3s | ease-out | — | — | Tap | None | Low | n/a |
| AN-015 | Floating action bar (Motion) | Scroll past hero (mobile) | Slide up | 0.3s | ease-out | — | Observer | Mobile only | Instant | Overlaps content | Observer cleanup |

## 4. React Bits policy (CMP decisions)
Selection is **deferred until the reference screenshot is reviewed**. Candidate categories (none approved): text-reveal, subtle background, simple cursor/hover effects. For every adopted component record:

| Field | Requirement |
|-------|-------------|
| Component name & ID | e.g., RB-001 |
| Why needed | Which reference element it reproduces |
| Source/URL & version | From https://reactbits.dev/ (verify) |
| Install method | Copy-paste or registry; note license |
| Dependencies | e.g., gsap, motion, three/ogl — avoid WebGL/canvas unless essential |
| Accessibility | Reduced-motion branch; text remains real DOM text; no focus traps |
| Customization | Tokens, speeds, colors from design system |
| Conflicts | Which owner for its element |
| Perf budget | Bundle delta ≤ 15KB gz (guideline); no continuous rAF at idle |

Reject: particle backgrounds, cursor trails, WebGL shaders, heavy 3D — unless the reference requires them.

## 5. Performance budgets
- Animation JS (GSAP core + ScrollTrigger + Motion subset + RB): target ≤ ~90KB gzip combined, lazy where possible (**target, not measured**).
- 60fps target on mid-range Android; no long tasks >50ms during scroll.
- Max concurrent ScrollTriggers ~15; pin only one section.
- INP ≤200ms: no heavy JS on click handlers; defer non-critical.
- No animation of `width/height/top/left`.
- Preloader/hero must not push LCP > 2.5s.

## 6. Reduced motion & mobile
`gsap.matchMedia()` conditions: `(prefers-reduced-motion: reduce)` → set final states, no triggers; `(min-width:1024px)` → pinning/parallax; `(max-width:1023px)` → simplified reveals. Motion via `MotionConfig`. Pause/skip controls for any auto-playing motion >5s (none planned).

## 7. Lifecycle & cleanup checklist
- Every effect returns cleanup (context revert, kill triggers, remove listeners/observers).
- Refresh triggers after font load/images/resizes (debounced).
- StrictMode double-mount safe.
- No state updates in scroll handlers; no layout thrash.
- Hash navigation works with pinned sections (offset for sticky header).
