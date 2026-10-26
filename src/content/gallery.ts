import heroThaliImg from '../assets/images/hero_thali.jpg'
import paneerImg from '../assets/images/paneer_butter_masala.jpg'
import noodlesImg from '../assets/images/chinese_noodles.jpg'
import snacksImg from '../assets/images/fast_food_snacks.jpg'
import dessertImg from '../assets/images/dessert_kheer.jpg'
import dalMakhaniImg from '../assets/images/dal_makhani.jpg'
import interiorImg from '../assets/images/restaurant_interior.jpg'
import diningExpImg from '../assets/images/dining_experience.jpg'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  category: 'thali' | 'curry' | 'chinese' | 'dessert' | 'interior' | 'dal'
  width: number
  height: number
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'thali-signature',
    src: heroThaliImg,
    alt: 'Grand Royal North Indian vegetarian thali with assorted curries, breads, rice, and kheer',
    title: 'Grand Vegetarian Thali',
    category: 'thali',
    width: 1400,
    height: 933,
  },
  {
    id: 'paneer-butter-masala',
    src: paneerImg,
    alt: 'Rich paneer butter masala served in hand-hammered copper vessel with ginger julienne',
    title: 'Paneer Butter Masala',
    category: 'curry',
    width: 1200,
    height: 800,
  },
  {
    id: 'wok-noodles',
    src: noodlesImg,
    alt: 'Wok-tossed Hakka noodles with bell peppers, shredded cabbage, and scallions',
    title: 'Hakka Wok Noodles',
    category: 'chinese',
    width: 1200,
    height: 800,
  },
  {
    id: 'dal-makhani',
    src: dalMakhaniImg,
    alt: 'Creamy slow-simmered black lentils garnished with butter cream swirl and coriander',
    title: 'Signature Dal Makhani',
    category: 'dal',
    width: 1200,
    height: 800,
  },
  {
    id: 'badam-kheer',
    src: dessertImg,
    alt: 'Traditional saffron almond kheer served in traditional copper bowl with pistachios',
    title: 'Saffron Badam Kheer',
    category: 'dessert',
    width: 1200,
    height: 800,
  },
  {
    id: 'restaurant-interior',
    src: interiorImg,
    alt: 'Warm brick-walled dining room with copper pendant lanterns and clothed tables',
    title: 'Atmospheric Dining Hall',
    category: 'interior',
    width: 1400,
    height: 933,
  },
  {
    id: 'evening-ambience',
    src: diningExpImg,
    alt: 'Intimate evening dining tables with warm candlelight and glassware',
    title: 'Evening Tablescape',
    category: 'interior',
    width: 1200,
    height: 800,
  },
  {
    id: 'snack-platter',
    src: snacksImg,
    alt: 'Freshly prepared vegetarian fast food assortment and crispy evening snacks',
    title: 'Crispy Snack Platter',
    category: 'chinese',
    width: 1200,
    height: 800,
  },
]
