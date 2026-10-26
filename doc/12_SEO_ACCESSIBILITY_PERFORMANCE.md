# 12 — SEO, Accessibility, Performance, Security, Privacy, Analytics

All thresholds are **targets**, not verified results. Re-check current guidance (web.dev, WCAG, Google Search docs) at implementation.

## 1. SEO
| Area | Requirement |
|------|-------------|
| Title / description | See 04 §7; unique, ≤~60 / ≤~160 chars |
| Canonical | Single canonical `https://<domain>/` (domain Unknown); non-www/www and http→https redirects to one version |
| Open Graph / Twitter | og:title, og:description, og:url, og:image 1200×630, `summary_large_image` |
| robots.txt | Allow all; reference sitemap; disallow nothing important |
| sitemap.xml | `/` and `/privacy` |
| Headings | One H1 (hero); H2 per section; H3 for cards; no skipped levels |
| Image alt | Descriptive, unique, no keyword stuffing; decorative → `alt=""` |
| Local SEO content | Natural mentions of "pure vegetarian", "Shyam Nagar", "Kanpur", cuisines; short FAQ optional (Could) only with verified answers |
| NAP consistency | Same name/address/phone as GBP, Zomato, District, EazyDiner, Instagram, footer, JSON-LD |
| Structured data | JSON-LD `Restaurant` with confirmed fields only (see 09 §10); validate with Rich Results Test |
| Rendering | Prerender or inline critical SEO content in HTML so it is visible without JS execution |
| Launch checks | Indexable (no stray `noindex`), 200 status, mobile-friendly, Search Console property verified + sitemap submitted, GBP linked to site, redirects tested |

## 2. Accessibility — target WCAG 2.2 AA where practical
| Area | Requirement |
|------|-------------|
| Keyboard | All controls reachable/operable; logical order; no traps (except intentional modal trap with Esc exit); skip-to-content link |
| Focus | Visible indicator ≥3:1 on all states; focus not obscured by sticky header (WCAG 2.2 Focus Not Obscured → use `scroll-margin-top`) |
| Contrast | Text 4.5:1, large 3:1, UI components 3:1 — incl. text over images |
| Semantics | Landmarks (`header`, `nav`, `main`, `footer`), headings, lists, buttons vs links |
| Targets | ≥24×24 CSS px minimum (WCAG 2.2), aim ≥44×44 |
| Forms (if approved) | Visible labels, `autocomplete`, error text linked via `aria-describedby`, no reliance on color alone, no redundant entry |
| Images | Alt as above; no text embedded in images |
| Reduced motion | `prefers-reduced-motion` honored (FR-020) |
| Mobile menu | Button with `aria-expanded`/`aria-controls`, focus trap, Esc, focus return |
| Modal/gallery | `role="dialog" aria-modal="true"` + label, focus trap, Esc, arrow keys, restore focus, background inert |
| Pinned scroll (AN-008) | Content reachable by keyboard; disabled on small screens |
| Language | `<html lang="en">` (+ `lang="hi"` spans if Hindi added) |
| External links | Accessible name states "opens in new tab" |
| Testing | axe automated + manual keyboard + screen reader spot-check (NVDA/VoiceOver/TalkBack) |

## 3. Performance targets (75th percentile, mobile)
| Metric | Target ("good") |
|--------|-----------------|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Lighthouse mobile Performance (lab, guideline) | ≥ 85 on throttled profile |
| Initial JS (gzip) | ≤ ~150KB critical; animation libs lazy where possible |
| Total initial page weight (excl. lazy images) | ≤ ~1MB guideline |
| Hero image | ≤ ~300KB, preloaded, `fetchpriority="high"`, not lazy |
| Gallery/other images | AVIF/WebP, responsive `srcset`/`sizes`, `loading="lazy"`, `decoding="async"`, explicit dimensions |
| Fonts | Self-hosted, WOFF2, subset, ≤2 families, preload primary, `font-display: swap`, size-adjust fallback to limit CLS |
| Animation | 60fps target; transform/opacity only; see 07 §5 |
| Caching | Hashed assets `immutable` 1yr; HTML revalidate |
Distinguish: **targets** (above) vs **verified results** (to be recorded in 13 after real runs: Lighthouse CI, WebPageTest, field data from CrUX/Search Console after traffic).

## 4. Security
- HTTPS only + HSTS; security headers: CSP (allow only self + analytics host), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal, frame-ancestors none.
- All external links `rel="noopener noreferrer"`; allow-list of external hosts in content validation.
- No secrets in client bundle; `VITE_*` public only.
- Dependencies: lockfile, `npm audit`, Dependabot/Renovate; pin versions.
- If a form is approved: server-side validation, honeypot + rate limit/CAPTCHA (privacy-conscious option), no storage by default, relay only, CORS locked to site origin.

## 5. Privacy
- **Data minimization:** MVP collects no personal data except analytics events.
- Privacy notice at `/privacy` (needed if analytics used): what is collected, why, provider, retention, contact. India's DPDP Act 2023 may apply — **legal review needed (Unknown)**; if EU/UK visitors expected, consider consent for non-essential cookies.
- Consent: use consent banner or cookieless/privacy-friendly analytics; decision DEC-009. No analytics fire before consent where consent is chosen.
- Enquiry retention (if form approved): relay only; if stored, define retention ≤ e.g., 90 days (**proposal**), deletion process, access limited to named staff.

## 6. Analytics events
Naming: `snake_case`, verb_object. Wrapper `track(name, params)`.
| Event | Trigger | Params |
|-------|---------|--------|
| `menu_click` | Any menu CTA | `cta_location` |
| `reservation_click` | Any reservation CTA | `provider`, `cta_location` |
| `phone_click` | `tel:` click | `cta_location` |
| `directions_click` | Maps link | `cta_location` |
| `instagram_click` | Instagram link | `cta_location` |
| `cuisine_section_view` | Cuisine card ≥50% visible, once/session | `cuisine_id` |
| `gallery_open` | Lightbox open | `image_id` |
| `whatsapp_click` | WhatsApp link (if enabled) | `cta_location` |
| `enquiry_submit` | Form result (if approved) | `status` |
`cta_location` ∈ `nav|hero|section|footer|floating_bar`. **Conversions to mark in GA4:** `reservation_click`, `phone_click`, `directions_click`. No names, phone numbers, free text, or IP storage by us.
