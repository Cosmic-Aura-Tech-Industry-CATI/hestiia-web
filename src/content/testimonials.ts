export interface ReviewPlatform {
  id: string
  name: string
  url: string
  label: string
  note: string
}

export const REVIEW_PLATFORMS: ReviewPlatform[] = [
  {
    id: 'google',
    name: 'Google Reviews',
    url: 'https://www.google.com/maps/search/?api=1&query=Hestiia+Restaurant+Shyam+Nagar+Kanpur',
    label: 'Read Google Reviews',
    note: 'View real customer ratings and location reviews on Google Maps',
  },
  {
    id: 'zomato',
    name: 'Zomato Reviews',
    url: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/reviews',
    label: 'Read Zomato Reviews',
    note: 'Read verified diner experiences, photos, and dish recommendations',
  },
  {
    id: 'eazydiner',
    name: 'EazyDiner Feedback',
    url: 'https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424',
    label: 'Read EazyDiner Reviews',
    note: 'Customer ratings and dining experiences on EazyDiner Kanpur',
  },
]
