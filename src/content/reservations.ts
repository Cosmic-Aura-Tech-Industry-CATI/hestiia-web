export interface ReservationProvider {
  id: 'district' | 'zomato' | 'eazydiner'
  name: string
  tag: string
  url: string
  label: string
  description: string
}

export const RESERVATION_PROVIDERS: ReservationProvider[] = [
  {
    id: 'district',
    name: 'District',
    tag: 'Recommended Partner',
    url: 'https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book',
    label: 'Reserve on District',
    description: 'Instant reservation confirmation with dining deals and table booking.',
  },
  {
    id: 'zomato',
    name: 'Zomato Dining',
    tag: 'Available',
    url: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/book',
    label: 'Reserve on Zomato',
    description: 'Book table and browse customer photos and live ratings.',
  },
  {
    id: 'eazydiner',
    name: 'EazyDiner',
    tag: 'Available',
    url: 'https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424',
    label: 'Reserve on EazyDiner',
    description: 'Instant table reservation with Prime partner benefits.',
  },
]
