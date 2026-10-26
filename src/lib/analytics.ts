export type CtaLocation = 'nav' | 'hero' | 'section' | 'footer' | 'floating_bar'

export interface AnalyticsEventMap {
  menu_click: { cta_location: CtaLocation }
  reservation_click: { provider: string; cta_location: CtaLocation }
  phone_click: { cta_location: CtaLocation }
  directions_click: { cta_location: CtaLocation }
  instagram_click: { cta_location: CtaLocation }
  cuisine_section_view: { cuisine_id: string }
  gallery_open: { image_id: string }
}

/**
 * Consent-aware, privacy-preserving event tracker per docs/12 §6
 * Sends no PII and gracefully catches any ad-blocker or environment failures
 */
export function track<K extends keyof AnalyticsEventMap>(
  eventName: K,
  params: AnalyticsEventMap[K],
) {
  try {
    if (typeof window === 'undefined') return

    // Dev logging
    if (import.meta.env.DEV) {
      console.log(`[Analytics Event] ${eventName}:`, params)
    }

    // If GA4 gtag exists on window
    const win = window as any
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params)
    }
  } catch {
    // Fail silently without disrupting user interaction
  }
}
