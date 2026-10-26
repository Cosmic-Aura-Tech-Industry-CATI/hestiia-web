export interface RatingItem {
  platform: 'Zomato' | 'EazyDiner' | 'Justdial' | 'Google' | 'Swiggy' | 'District'
  score: number | null
  outOf: number
  count: number | null
  countLabel?: string
  url: string
  asOf: string
}

export const RATINGS: RatingItem[] = [
  {
    platform: 'Zomato',
    score: 4.4,
    outOf: 5,
    count: 164,
    countLabel: 'votes',
    url: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar',
    asOf: '2026-10-25',
  },
  {
    platform: 'EazyDiner',
    score: 4.2,
    outOf: 5,
    count: 733,
    countLabel: 'reviews',
    url: 'https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424',
    asOf: '2026-10-25',
  },
  {
    platform: 'Justdial',
    score: 4.0,
    outOf: 5,
    count: 1485,
    countLabel: 'votes',
    url: 'https://www.justdial.com/Kanpur/Hestiia-Restaurant-Above-Jawed-Habib-Shyam-Nagar/0512PX512-X512-230224201050-J6L4_BZDET',
    asOf: '2026-10-25',
  },
  {
    platform: 'Google',
    score: null,
    outOf: 5,
    count: null,
    url: 'https://www.google.com/maps?cid=1346206616332675805',
    asOf: '2026-10-25',
  },
  {
    platform: 'Swiggy',
    score: null,
    outOf: 5,
    count: null,
    url: 'https://www.swiggy.com/restaurants/hestiia-restaurant-shyam-nagar-koramangala-kanpur-1240905/dineout',
    asOf: '2026-10-25',
  },
  {
    platform: 'District',
    score: null,
    outOf: 5,
    count: null,
    url: 'https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book',
    asOf: '2026-10-25',
  },
]
