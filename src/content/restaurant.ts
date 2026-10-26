export type Status = 'confirmed' | 'pending'

export interface RestaurantService {
  name: string
  confirmed: boolean
}

export interface RestaurantInfo {
  name: string
  tagline: string
  type: 'pure-vegetarian'
  address: {
    line1: string
    locality: string
    city: string
    state: string
    postalCode: string
    country: string
    fullDisplay: string
  }
  phone: {
    display: string
    e164: string
    intlDisplay: string
  }
  phoneSecondary: string
  whatsapp: {
    e164: string
    display: string
    chatUrl: string
  }
  email: string
  hours: {
    status: Status
    displayText: string
  }
  priceRange: string
  services: RestaurantService[]
  social: {
    instagram: string
    facebook: string | null
  }
  platforms: {
    googleMaps: string
    zomato: string
    swiggy: string
    eazydiner: string
    district: string
    justdial: string
  }
  // Backwards compatibility aliases for existing components
  mapsUrl: string
  instagramUrl: string
  servesCuisine: string[]
}

export const RESTAURANT: RestaurantInfo = {
  name: 'Hestiia Restaurant',
  tagline: 'Pure Vegetarian Dining · Shyam Nagar, Kanpur',
  type: 'pure-vegetarian',
  address: {
    line1: '1-B, Ram Puram',
    locality: 'Shyam Nagar',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    postalCode: '208013',
    country: 'IN',
    fullDisplay: '1-B, Ram Puram, Shyam Nagar, Kanpur, Uttar Pradesh 208013',
  },
  phone: {
    display: '078808 40622',
    e164: '+917880840622',
    intlDisplay: '+91 78808 40622',
  },
  // TODO: confirm with client
  phoneSecondary: '6392693457',
  // TODO: confirm it is WhatsApp-enabled
  whatsapp: {
    e164: '+917880840622',
    display: '078808 40622',
    chatUrl: 'https://wa.me/917880840622',
  },
  email: 'info@hestiia.com',
  hours: {
    status: 'confirmed',
    displayText: 'Daily 11:00 to 23:00',
  },
  priceRange: '₹200–400 per person',
  services: [
    { name: 'Private dining room', confirmed: false },
    { name: 'Live music', confirmed: false },
    { name: 'Vegan options', confirmed: false },
  ],
  social: {
    instagram: 'https://www.instagram.com/hestiiarestaurant/',
    facebook: null,
  },
  platforms: {
    googleMaps: 'https://www.google.com/maps?cid=1346206616332675805',
    zomato: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar',
    swiggy: 'https://www.swiggy.com/restaurants/hestiia-restaurant-shyam-nagar-koramangala-kanpur-1240905/dineout',
    eazydiner: 'https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424',
    district: 'https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book',
    justdial: 'https://www.justdial.com/Kanpur/Hestiia-Restaurant-Above-Jawed-Habib-Shyam-Nagar/0512PX512-X512-230224201050-J6L4_BZDET',
  },
  // Backwards compatibility aliases
  mapsUrl: 'https://www.google.com/maps?cid=1346206616332675805',
  instagramUrl: 'https://www.instagram.com/hestiiarestaurant/',
  servesCuisine: ['North Indian', 'Chinese', 'Fast Food & Snacks', 'Desserts & Beverages'],
}
