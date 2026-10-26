# 03 — Client Questionnaire

Purpose: collect missing facts. **Do not invent answers.** Development of provisional layout may proceed with labeled assumptions (see 15_RISKS_ASSUMPTIONS_AND_DECISIONS.md).

Tiers: **A = needed before design/dev starts**, **B = needed before content freeze**, **C = can follow after launch/Phase 2**.

| ID | Question | Why it matters | Tier |
|----|----------|----------------|------|
| Q-001 | Official logo (SVG/PNG, light + dark versions)? | Header, favicon, OG image | A |
| Q-002 | Official brand colors and fonts? If none, approve us proposing a palette? | Design system | A |
| Q-003 | Meaning/spelling of the name "Hestiia" (double i confirmed?) and a tagline if any | Copy, SEO, NAP | A |
| Q-004 | Is "Hestiia Restaurant" the exact public name for NAP consistency? | Local SEO | A |
| Q-005 | Please send a **screenshot** of the Pinterest reference (the link blocks automated access). What do you like about it: color, type, layout, motion? | Primary visual reference | A |
| Q-006 | Real photographs: food, interior, exterior, private dining room, live music. Who owns rights? | Gallery, hero | A |
| Q-007 | Which pages/links should drive action: external reservation provider, phone call, WhatsApp? Preferred primary CTA? | Conversion design | A |
| Q-008 | Should bookings happen on external providers (District/Zomato/EazyDiner) only, or on the site? | Backend decision | A |
| Q-009 | Does the restaurant need a backend or admin dashboard (self-editing menu/gallery)? | Option A vs B | A |
| Q-010 | Online ordering wanted? (Assumed **no**.) | Scope | A |
| Q-011 | How should enquiries arrive: phone only, email, WhatsApp, form? Which number/address? | Contact flow | A |
| Q-012 | Opening hours, including weekly closures and holidays | Contact, schema.org | B |
| Q-013 | Is the +91 78808 40622 number the right one for calls and WhatsApp? | Click-to-call | A |
| Q-014 | Verified menu items and prices (or approve linking to Zomato menu only) | Menu preview | B |
| Q-015 | Confirm each service: private dining room, vegan options, live music, kitty parties, birthdays, group seating. Capacity? Advance booking rules? | Avoid false claims | B |
| Q-016 | Live music schedule (days, times, genre) | Dining experience section | B |
| Q-017 | Is ₹200–₹400 per person correct and may it be published? | Budget messaging | B |
| Q-018 | Which reservation provider is preferred / most reliable? Are all three links active and authorised? | Reservation section | A |
| Q-019 | Are reviews allowed to be shown? Provide permission-cleared quotes or approve links only | Reviews section | B |
| Q-020 | Hosting and domain preference (existing domain? who owns DNS?) | Deployment | B |
| Q-021 | Access to Google Business Profile and analytics (GA4/Search Console)? | SEO, measurement | B |
| Q-022 | Website languages: English only, or also Hindi? | i18n | B |
| Q-023 | Budget range and launch deadline; team size | Roadmap | A |
| Q-024 | Is the "pure vegetarian" claim certified/marked (e.g., FSSAI veg logo)? FSSAI number to display? | Legal/trust | B |
| Q-025 | Who approves content, and who maintains the site post-launch? | Maintenance | B |
| Q-026 | Any competitors or sites you admire/dislike? | Design direction | C |
| Q-027 | Cookie/analytics consent preference | Privacy | B |
| Q-028 | Want a Hindi/Hinglish tone of voice or pure English? | Copy | C |

## Essential before development begins (Tier A)
Q-001, Q-002, Q-003, Q-004, Q-005, Q-006 (at least hero + 8 gallery images), Q-007, Q-008, Q-009, Q-010, Q-011, Q-013, Q-018, Q-023.

## Can be supplied later
Tier B items block only content freeze and launch. Tier C items do not block MVP.

## Provisional approach if answers are missing
Build with placeholder images clearly marked, external-link-only menu, phone + external reservation CTAs, no form, English only, neutral warm palette marked "unapproved".
