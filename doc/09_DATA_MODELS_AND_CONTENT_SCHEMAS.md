# 09 — Data Models and Content Schemas

No database. All structures are **static typed content** in `src/content/`, validated by TypeScript and a build-time check. Examples use only confirmed data; placeholders are marked `TODO`. No fabricated reviews or prices.

Shared types:
```ts
type Status = 'confirmed' | 'pending';   // pending items never ship to production
interface Image { id: string; src: string; alt: string; width: number; height: number; status: Status; rightsOwner?: string }
```

## 1. Restaurant information — `restaurant.ts` (source of truth: client)
| Field | Type | Req | Validation | Example |
|-------|------|-----|-----------|---------|
| name | string | Y | non-empty | "Hestiia Restaurant" |
| tagline | string | N | ≤80 chars | TODO |
| type | 'pure-vegetarian' | Y | literal | "pure-vegetarian" |
| address.line1 | string | Y | — | "1-B, Ram Puram" |
| address.locality | string | Y | — | "Shyam Nagar" |
| address.city | string | Y | — | "Kanpur" |
| address.state | string | Y | — | "Uttar Pradesh" |
| address.postalCode | string | Y | `^\d{6}$` | "208013" |
| address.country | string | Y | ISO | "IN" |
| phone.display | string | Y | — | "+91 78808 40622" |
| phone.e164 | string | Y | `^\+\d{10,15}$` | "+917880840622" |
| hours | OpeningHours[] | N | HH:mm; **Unknown** | TODO |
| priceRange | string | N | only if confirmed | TODO (₹200–₹400 unverified) |
| mapsUrl | string | Y | https | `https://www.google.com/maps/search/?api=1&query=Hestiia+Restaurant+Shyam+Nagar+Kanpur` |
| instagramUrl | string | Y | https | `https://www.instagram.com/hestiiarestaurant/` |
| servesCuisine | string[] | Y | — | ["North Indian","Chinese","Fast Food","Desserts"] |

## 2. Navigation — `navigation.ts`
```ts
interface NavLink { id: string; label: string; href: string /* '#story' */; order: number; showInFooter: boolean }
```
Validation: `href` starts with `#` or `/`; unique `id`; target section exists.

## 3. Cuisine categories — `cuisines.ts`
| Field | Type | Req | Rule |
|-------|------|-----|------|
| id | string | Y | slug, unique (`north-indian`, `chinese`, `fast-food`, `desserts-beverages`) |
| title | string | Y | ≤40 chars |
| description | string | Y | ≤160 chars, no unverified claims |
| image | Image | N | alt required if present |
| order | number | Y | unique |
| highlights | string[] | N | verified dish names only |

## 4. Menu items (only if verified) — `menu.ts`
| Field | Type | Req | Rule |
|-------|------|-----|------|
| id | string | Y | unique |
| cuisineId | string | Y | FK to cuisines |
| name | string | Y | — |
| description | string | N | ≤140 chars |
| price | number (INR) | N | ≥0; **omit if unverified** |
| isVegan | boolean | N | only if confirmed |
| verifiedOn | ISO date | Y | audit |
| status | Status | Y | pending blocks production |
Example: *none provided — awaiting client (Q-014).* Provide `menuUrl` = Zomato menu link as the authoritative source.

## 5. Gallery — `gallery.ts`
Fields: `id`, `image: Image`, `category: 'food'|'interior'|'private-dining'|'live-music'|'exterior'`, `caption?`, `order`. Rule: alt text 5–125 chars, real photos only, dimensions required. Source: client photos.

## 6. Services — `services.ts`
| Field | Type | Req | Rule |
|-------|------|-----|------|
| id | string | Y | `private-dining`, `vegan-options`, `live-music` |
| title | string | Y | — |
| description | string | Y | confirmed facts only |
| icon | string | Y | icon key |
| status | Status | Y | pending → hidden in prod |
| cta | { label; href } | N | — |
| detailsConfirmedOn | ISO date | N | — |

## 7. Testimonials (only if verified) — `testimonials.ts`
`id`, `quote` (≤240 chars), `author` (first name or initial), `source` ('google'|'zomato'|'direct'), `sourceUrl`, `permissionGranted: boolean` (must be true), `date`. **No examples shipped.** Alternative: `reviewLinks[]` with label + URL.

## 8. Reservation providers — `reservations.ts`
| Field | Type | Req | Rule |
|-------|------|-----|------|
| id | 'district'|'zomato'|'eazydiner' | Y | unique |
| label | string | Y | provider name |
| url | string | Y | https, host allow-list |
| priority | number | Y | display order; **Unknown preference** |
| enabled | boolean | Y | client-approved |
| lastVerified | ISO date | N | set after manual check (not yet verified) |
URLs from brief:
- district: `https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book`
- zomato: `https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/book`
- eazydiner: `https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424`
Menu: `https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/menu`

## 9. Contact details
Derived from restaurant info: `phone`, `address`, `mapsUrl`, `whatsapp?: { number; prefill }` (Unknown), `email?` (Unknown). Rule: one source of truth feeds Visit section, footer, and JSON-LD.

## 10. SEO metadata — `seo.ts`
```ts
interface PageSeo { path: string; title: string /*≤60 chars target*/; description: string /*≤160*/; canonical: string;
  ogImage: string; ogType: string; robots: 'index,follow'|'noindex,nofollow'; jsonLd?: object }
```
JSON-LD `Restaurant`: include only confirmed `name`, `address`, `telephone`, `servesCuisine`, `url`, `sameAs` (Instagram), `hasMap`; add `openingHoursSpecification`/`priceRange` **only after confirmation**.

## 11. Static-content workflow
Edit file → TypeScript catches shape errors → `npm run validate:content` checks pending flags, URL schemes/hosts, alt text, unique IDs → build. Same shapes can later be served from a CMS (Phase 2) without UI changes.
