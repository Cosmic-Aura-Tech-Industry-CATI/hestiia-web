/**
 * HESTIIA GALLERY DATA CONFIGURATION
 * 
 * HOW TO ADD, REPLACE, OR REORDER GALLERY PHOTOS:
 * -------------------------------------------------------------
 * 1. Image Files:
 *    - Place your .webp photo in `public/gallery/` (e.g., `public/gallery/my-dish.webp`).
 *    - Use absolute paths starting with "/" (e.g., `/gallery/my-dish.webp`).
 * 
 * 2. Home Page Gallery Teaser:
 *    - The Home page gallery displays the first 8 items in two opposite marquee rows:
 *      Row 1: Items 1 to 4 (Indices 0..3)
 *      Row 2: Items 5 to 8 (Indices 4..7)
 *    - Reorder or swap items 0..7 below to change which photos appear on the Home page!
 * 
 * 3. Full Gallery Page (/gallery):
 *    - Displays the entire array across the interactive 3D Ring and responsive grid.
 */

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  category: string
  width: number
  height: number
  caption?: string
}

export const galleryItems: GalleryItem[] = [
  // ==========================================================
  // HOME PAGE MARQUEE ROW 1 (Items 1 - 4)
  // ==========================================================
  {
    id: 'north-indian-feast',
    src: '/gallery/north-indian-curry-feast.webp',
    alt: 'Authentic North Indian curry spread with Kadai Paneer, fresh tandoori rotis in a brass basket, and mixed vegetable sabzi',
    title: 'Heritage Curry & Tandoor Spread',
    category: 'Curries & Breads',
    width: 1080,
    height: 800,
    caption: 'Handcrafted paneer curries simmered in rich gravy with hot tandoori breads.',
  },
  {
    id: 'dining-hall-perspective',
    src: '/gallery/dining-hall-perspective.webp',
    alt: 'Wide perspective of Hestiia main dining hall with illuminated hexagonal ceiling, butterfly lights, and green velvet seating',
    title: 'Sanctuary Dining Hall',
    category: 'Ambience',
    width: 1600,
    height: 1069,
    caption: 'Modern luxury ambience with handcrafted acoustic ceiling and warm lighting.',
  },
  {
    id: 'grilled-corn-sandwich',
    src: '/gallery/grilled-corn-cheese-sandwich.webp',
    alt: 'Golden grilled corn and cheese sandwich triangles served with tomato ketchup dip and fresh sweet corn salad',
    title: 'Golden Corn & Cheese Grill',
    category: 'Snacks & Starters',
    width: 1540,
    height: 1021,
    caption: 'Crisp golden toasted sandwiches loaded with cheese and sweet corn.',
  },
  {
    id: 'mocktail-bar-neon',
    src: '/gallery/mocktail-bar-neon.webp',
    alt: 'Illuminated Hestiia Mocktail Bar counter with glowing neon signage, stemware rack, and warm hanging pendant lights',
    title: 'Artisan Mocktail Bar',
    category: 'Beverages',
    width: 1600,
    height: 1069,
    caption: 'Handcrafted non-alcoholic cocktails and refreshing mocktails.',
  },

  // ==========================================================
  // HOME PAGE MARQUEE ROW 2 (Items 5 - 8)
  // ==========================================================
  {
    id: 'spring-rolls-shakes',
    src: '/gallery/crispy-spring-rolls-shakes.webp',
    alt: 'Crisp vegetable spring rolls sliced and plated with purple cabbage alongside chocolate milkshakes with chocolate chips',
    title: 'Crisp Rolls & Artisan Shakes',
    category: 'Chinese & Shakes',
    width: 1080,
    height: 802,
    caption: 'Crispy vegetable spring rolls paired with thick gourmet chocolate shakes.',
  },
  {
    id: 'blue-lagoon-mocktail',
    src: '/gallery/blue-lagoon-mocktails.webp',
    alt: 'Chilled Blue Lagoon mocktail in a martini glass with fresh lime wheel and sparkling beverage in stemmed goblet',
    title: 'Signature Chilled Coolers',
    category: 'Beverages',
    width: 1080,
    height: 797,
    caption: 'Refreshing citrus and curaçao blended coolers served ice cold.',
  },
  {
    id: 'wings-photo-booth',
    src: '/gallery/wings-photo-booth.webp',
    alt: 'Hestiia illuminated angel wings swing photo-booth backdrop with neon sign and party lounge tables',
    title: 'Illuminated Wings Lounge',
    category: 'Celebration',
    width: 1080,
    height: 720,
    caption: 'Interactive photo spot with glowing angel wings and plush swing seating.',
  },
  {
    id: 'banquet-celebration-hall',
    src: '/gallery/banquet-celebration-hall.webp',
    alt: 'Private party banquet dining hall decorated with Happy Birthday banner, stone fountain, and long marble banquet tables',
    title: 'Private Celebration Hall',
    category: 'Private Dining',
    width: 1080,
    height: 720,
    caption: 'Dedicated banquet hall for birthdays, anniversaries, and family gatherings.',
  },

  // ==========================================================
  // ADDITIONAL REAL COLLECTION ITEMS (Full Gallery Page)
  // ==========================================================
  {
    id: 'sizzling-kebab-platter',
    src: '/gallery/sizzling-kebab-platter.webp',
    alt: 'Sizzling tandoori kebab platter with smoking charcoal ember, spiced onion spirals, and cucumber slices',
    title: 'Sizzling Tandoori Kebab Platter',
    category: 'Tandoor Special',
    width: 1080,
    height: 1429,
    caption: 'Aromatic sizzling kebabs served fresh from the traditional clay oven.',
  },
  {
    id: 'honey-chilli-potato',
    src: '/gallery/honey-chilli-potato.webp',
    alt: 'Crisp honey chilli potatoes tossed in sweet spicy sauce with sesame seeds and spring rolls on side',
    title: 'Crispy Honey Chilli Potato',
    category: 'Indo-Chinese',
    width: 1080,
    height: 1406,
    caption: 'Wok-tossed crispy potato fingers with honey glaze and toasted sesame.',
  },
  {
    id: 'rainbow-mocktails-tray',
    src: '/gallery/rainbow-mocktails-tray.webp',
    alt: 'Rainbow lineup of five vibrant sparkling mocktails in champagne flutes garnished with lime wheels',
    title: 'Rainbow Mocktail Flight',
    category: 'Beverages',
    width: 1080,
    height: 1420,
    caption: 'A vibrant spectrum of fruit and herb infused sparkling mocktails.',
  },
  {
    id: 'kitkat-chocolate-shake',
    src: '/gallery/kitkat-chocolate-shake.webp',
    alt: 'Tall glass of rich chocolate thickshake topped with KitKat chocolate bar and chocolate drizzle',
    title: 'KitKat Gourmet Thickshake',
    category: 'Beverages',
    width: 1080,
    height: 1581,
    caption: 'Indulgent creamy chocolate shake with crunchy KitKat bar topping.',
  },
  {
    id: 'standing-sandwich-platter',
    src: '/gallery/standing-sandwich-platter.webp',
    alt: 'Platter of four golden grilled sandwich quarters standing upright with mayonnaise drizzle and refreshing drink',
    title: 'Grilled Club Sandwich Platter',
    category: 'Snacks & Starters',
    width: 1080,
    height: 1429,
    caption: 'Multi-layered toasted club sandwiches served with dipping sauces.',
  },
  {
    id: 'dining-hexagonal-ceiling',
    src: '/gallery/dining-hexagonal-ceiling.webp',
    alt: 'Restaurant dining room with hexagonal brown false ceiling panels and emerald green velvet armchairs',
    title: 'Modern Geometric Dining',
    category: 'Ambience',
    width: 1080,
    height: 720,
    caption: 'Elegantly appointed seating with designer geometric acoustic ceiling.',
  },
  {
    id: 'cozy-corner-booths',
    src: '/gallery/cozy-corner-booths.webp',
    alt: 'Cozy private dining corner with tufted brown leather sofa booths and warm teardrop pendant lamps',
    title: 'Private Booth Corners',
    category: 'Ambience',
    width: 1080,
    height: 720,
    caption: 'Intimate tufted booth tables ideal for quiet family dinners.',
  },
  {
    id: 'intimate-sectional-booth',
    src: '/gallery/intimate-sectional-booth.webp',
    alt: 'Corner booth dining space with leather sectional sofa, golden drapery, and lush indoor planters',
    title: 'Intimate Corner Tablescape',
    category: 'Ambience',
    width: 1080,
    height: 720,
    caption: 'Plush leather corner booths framed by golden curtains and greenery.',
  },
]
