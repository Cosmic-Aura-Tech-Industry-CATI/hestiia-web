export interface OfferItem {
  id: string
  title: string
  description: string
  code?: string
  validTill?: string
  image?: string
  terms?: string[]
}

export interface OffersConfig {
  enabled: boolean
  items: OfferItem[]
}

export const OFFERS_CONFIG: OffersConfig = {
  enabled: false,
  items: [],
}
