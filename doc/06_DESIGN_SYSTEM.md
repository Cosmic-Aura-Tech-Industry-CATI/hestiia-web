# 06 — Design System (Provisional)

> **Status: UNAPPROVED.** The Pinterest reference (https://in.pinterest.com/pin/808607308126041355/) could not be accessed (robots-disallowed). Its colors, typography, layout, and whether it is a restaurant design are all **Unknown**. Every value below is a placeholder to be replaced after the reference screenshot (Q-005) and brand assets (Q-001/002) arrive.

## 1. Brand personality (proposed)
Warm, welcoming, refined, family-friendly, fresh (pure-veg), unhurried.

## 2. Visual principles (proposed)
1. Food and space photography lead; UI recedes.
2. Generous whitespace, strong typographic hierarchy.
3. One accent color, used for actions only.
4. Motion supports content, never delays it.
5. Mobile-first: most local traffic expected on phones (assumption).

## 3. Color tokens (provisional, unapproved)
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#FBF6EE` | Light surface |
| `--color-bg-dark` | `#1F1A16` | Dark surface |
| `--color-surface` | `#FFFFFF` | Cards |
| `--color-text` | `#2A221C` | Body on light |
| `--color-text-inverse` | `#F6EFE4` | Body on dark |
| `--color-muted` | `#6B5E53` | Secondary text |
| `--color-accent` | `#B4532A` | Primary actions |
| `--color-accent-hover` | `#98431F` | Hover |
| `--color-veg` | `#2F7D4F` | Veg indicator |
| `--color-border` | `#E6DBCB` | Dividers |
| `--color-focus` | `#1A5FD0` | Focus ring |

Rule: verify all text pairs ≥4.5:1 (large text ≥3:1) once final colors set.

## 4. Typography (provisional)
- **Pairing strategy:** expressive serif display + clean sans body. Candidate: display serif (e.g., Fraunces/Cormorant) + sans (e.g., Inter/DM Sans). Final fonts depend on brand/reference. Self-host, `font-display: swap`, subset Latin (+ Devanagari only if Hindi approved), max 2 families, ≤3 weights.
- **Scale (fluid, `clamp`):** Display 48–96px; H1 40–72; H2 32–48; H3 22–28; Body 16–18 (line-height 1.6); Small 14; Eyebrow 12–13 uppercase tracking 0.12em.

## 5. Spacing scale
4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical padding: 64 (mobile) / 128 (desktop).

## 6. Grid and containers
12-col desktop, 8-col tablet, 4-col mobile; gutter 16/24/32. Max container 1280px; text measure ≤ 65ch.

## 7. Breakpoints
`sm 480`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Test additionally at 360 and 320 widths.

## 8. Image aspect ratios
Hero 16:9 desktop / 4:5 mobile crop; cuisine cards 4:5; gallery mixed (1:1, 4:5, 3:2); story image 4:5; OG 1.91:1 (1200×630). Always declare `width`/`height`. Formats AVIF/WebP with JPEG fallback.

## 9. Borders and dividers
1px `--color-border` hairlines; radius 0–12px (final value reference-dependent); optional ornamental divider only if reference supports.

## 10. Buttons
| Variant | Use | Style |
|---------|-----|-------|
| Primary | Reserve | Solid accent, inverse text |
| Secondary | View Menu | Outline |
| Tertiary/Link | Call, Directions | Text + icon |
| Icon | Close, arrows | 44×44 min |
States: default, hover, focus-visible (2px ring + 2px offset), active, disabled.

## 11. Links
Underlined in body text; accent color; external links show icon + new-tab hint; `rel="noopener noreferrer"`.

## 12. Icons
Single outline family (e.g., Lucide), 1.5px stroke, 20/24px. Decorative icons `aria-hidden`.

## 13. Navigation states
Default, hover (underline slide), active (section), focus-visible, scrolled (solid bg + shadow), mobile-open.

## 14. Hover & focus
Hover only enhances; never the sole indicator. All interactive elements have visible focus (≥3:1 contrast, WCAG 2.2 focus appearance intent).

## 15. Motion principles
Purposeful, ≤600ms for UI, ≤1.2s for entrances; ease-out for entrances, ease-in-out for transitions; stagger 40–100ms; respect reduced motion. See 07.

## 16. Dark / light surfaces
Light default for readability; dark sections for hero/gallery/footer drama if reference supports. Don't invert text colors without re-checking contrast.

## 17. Evaluation against reference
1. Receive screenshot(s) → record observed properties in a table (palette, type, layout, motion, imagery) with "Observed / Inferred" labels.
2. Replace provisional tokens; log in DEC register.
3. Side-by-side review at 1440, 768, 390 widths. Score 1–5 each: palette, typography, layout rhythm, imagery treatment, motion tone. Pass = no category below 4 and client sign-off.
4. Reject generic effects (glassmorphism, neon glows, particle fields, heavy gradients) unless present in the reference.
