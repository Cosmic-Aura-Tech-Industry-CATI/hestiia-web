export interface NavLinkItem {
  id: string
  label: string
  href: string
  order: number
}

// 5 primary links in desktop navbar for a balanced, premium layout (Reservations handled by prominent CTA button)
export const NAV_LINKS: NavLinkItem[] = [
  { id: 'about', label: 'Our Story', href: '/about', order: 1 },
  { id: 'cuisines', label: 'Cuisines', href: '/cuisines', order: 2 },
  { id: 'gallery', label: 'Gallery', href: '/gallery', order: 3 },
  { id: 'menu', label: 'Menu', href: '/menu', order: 4 },
  { id: 'offers', label: 'Offers', href: '/offers', order: 5 },
]

// 6 navigation links for mobile slide-in drawer
export const MOBILE_NAV_LINKS: NavLinkItem[] = [
  { id: 'about', label: 'Our Story', href: '/about', order: 1 },
  { id: 'cuisines', label: 'Cuisines', href: '/cuisines', order: 2 },
  { id: 'gallery', label: 'Gallery', href: '/gallery', order: 3 },
  { id: 'menu', label: 'Menu', href: '/menu', order: 4 },
  { id: 'offers', label: 'Offers', href: '/offers', order: 5 },
  { id: 'reviews', label: 'Reviews', href: '/reviews', order: 6 },
]

export interface RouteLink {
  label: string
  path: string
  category: 'main' | 'dining' | 'policies' | 'account'
}

export const ALL_ROUTES: RouteLink[] = [
  { label: 'Home', path: '/', category: 'main' },
  { label: 'Our Story & Experience', path: '/about', category: 'main' },
  { label: 'Cuisines', path: '/cuisines', category: 'dining' },
  { label: 'Full Menu', path: '/menu', category: 'dining' },
  { label: 'Ambience & Food Gallery', path: '/gallery', category: 'dining' },
  { label: 'Exclusive Offers', path: '/offers', category: 'main' },
  { label: 'Guest Reviews & Ratings', path: '/reviews', category: 'main' },
  { label: 'Parties & Private Dining', path: '/party', category: 'dining' },
  { label: 'Visit & Contact', path: '/contact', category: 'main' },
  { label: 'Your Cart', path: '/cart', category: 'account' },
  { label: 'Checkout', path: '/checkout', category: 'account' },
  { label: 'Order Confirmation', path: '/order-success', category: 'account' },
  { label: 'Terms & Conditions', path: '/terms', category: 'policies' },
  { label: 'Privacy Policy', path: '/privacy', category: 'policies' },
  { label: 'Refund & Cancellation Policy', path: '/refund-policy', category: 'policies' },
  { label: 'Delivery Policy', path: '/delivery-policy', category: 'policies' },
]
