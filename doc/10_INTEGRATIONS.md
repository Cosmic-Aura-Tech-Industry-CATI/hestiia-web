# 10 — Third-Party Integrations

Principle: simple external links; no API assumed; minimal data. **None of the URLs below have been tested.** All links open with `target="_blank" rel="noopener noreferrer"`.

| ID | Integration | Purpose | URL/Provider | Journey | Method | Auth | Failure behavior | Data exchanged | Dependencies | Testing |
|----|-------------|---------|--------------|---------|--------|------|------------------|----------------|--------------|---------|
| INT-001 | Zomato menu | Full menu | `https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/menu` | UJ-B | Outbound link | None | Site unaffected; fallback "Call us for menu" | None from us | Zomato page live | Manual click + automated link check (status may be bot-blocked → manual) |
| INT-002 | District booking | Reservation | `https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book` | UJ-D | Outbound link | Provider handles | Fallback to phone CTA | None | Client approval of provider | Manual + link check |
| INT-003 | Zomato booking | Reservation | `https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/book` | UJ-D | Outbound link | Provider | As above | None | Same | Same |
| INT-004 | EazyDiner | Reservation | `https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424` | UJ-D | Outbound link | Provider | As above | None | Same | Same |
| INT-005 | Instagram | Social proof / follow | `https://www.instagram.com/hestiiarestaurant/` (strip `?hl=en` to avoid forcing language — proposed) | UJ-E | Outbound link; **no embed/feed in MVP** | None | Link only | None | — | Manual |
| INT-006 | Google Maps | Directions | `https://www.google.com/maps/search/?api=1&query=Hestiia+Restaurant+Shyam+Nagar+Kanpur` | UJ-A | Outbound link; optional static image/placeholder (no Maps JS API/key in MVP) | None | Show text address | None | Search query resolves to correct place (verify; prefer Place ID link later) | Manual on iOS/Android/desktop |
| INT-007 | Click-to-call | Phone | `tel:+917880840622` | UJ-C | `tel:` link | None | Desktop: number displayed as text | None | Correct number (Q-013) | Real device call test |
| INT-008 | WhatsApp (optional) | Enquiry | `https://wa.me/<number>?text=<encoded prefill>` | UJ-F-alt | Outbound link | User's WhatsApp | Fallback to phone | Prefilled generic text only | Q-011, Q-013 | Mobile + desktop |
| INT-009 | Analytics (optional) | Measurement | GA4 or privacy-friendly alternative (decision pending) | All | Script via wrapper; consent-aware | Measurement ID | Site works if blocked | Event names + non-PII params | Consent decision, access (Q-021) | Debug view, consent on/off |
| INT-010 | Google Business Profile (optional) | Local SEO | GBP profile / review link (Unknown) | UJ-A | Outbound link; keep NAP consistent | None | — | None | Q-021 | Manual |

## Rules
- **No reservation API assumed.** Never display "Booking confirmed". Microcopy: "You'll complete your booking on {provider}."
- Provider choice: show one recommended + others as alternatives, or all three; **client decision (Q-018, DEC-005)**.
- Provider links are data in `reservations.ts` so they can change without code edits.
- Link verification before launch and monthly; record `lastVerified`.
- Third-party scripts limited to analytics; set CSP accordingly; no tracking pixels without consent decision.
- Respect provider brand/terms when displaying logos (Unknown—avoid logos unless permitted; use text labels).
- Data minimization: we send/store no customer data in MVP.
