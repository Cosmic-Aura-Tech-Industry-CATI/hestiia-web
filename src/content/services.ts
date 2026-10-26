export interface ServiceItem {
  id: string
  title: string
  tagline: string
  description: string
  icon: 'utensils' | 'leaf' | 'music' | 'users'
  status: 'confirmed'
  note?: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'pure-veg',
    title: '100% Pure Vegetarian',
    tagline: 'Strict Vegetarian Kitchen',
    description: 'Every ingredient, spice blend, and dish is prepared in a certified pure vegetarian kitchen without compromise.',
    icon: 'leaf',
    status: 'confirmed',
  },
  {
    id: 'private-dining',
    title: 'Private Dining Space',
    tagline: 'Intimate Family & Group Gatherings',
    description: 'A dedicated private dining space suited for birthdays, anniversaries, family get-togethers, and celebrations.',
    icon: 'users',
    status: 'confirmed',
    note: 'Capacity and advance booking details available upon enquiry.',
  },
  {
    id: 'vegan-friendly',
    title: 'Vegan-Friendly Options',
    tagline: 'Custom Dietary Adaptations',
    description: 'Special dairy-free, vegan, and customised preparations available upon request for discerning guests.',
    icon: 'utensils',
    status: 'confirmed',
  },
  {
    id: 'live-music',
    title: 'Live Music & Ambience',
    tagline: 'Acoustic Evenings & Relaxed Atmosphere',
    description: 'Curated musical ambience and acoustic performances during select dinner evenings.',
    icon: 'music',
    status: 'confirmed',
    note: 'Performance schedules vary; call or check social media for upcoming dates.',
  },
]
