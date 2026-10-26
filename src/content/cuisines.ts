import paneerImg from '../assets/images/paneer_butter_masala.jpg'
import noodlesImg from '../assets/images/chinese_noodles.jpg'
import snacksImg from '../assets/images/fast_food_snacks.jpg'
import dessertImg from '../assets/images/dessert_kheer.jpg'

export interface CuisineCategory {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  order: number
  highlights: string[]
}

export const CUISINES: CuisineCategory[] = [
  {
    id: 'north-indian',
    title: 'North Indian',
    subtitle: 'Heritage Curries & Breads',
    description: 'Slow-simmered vegetarian curries, rich paneer gravies, aromatic dal makhani, and tandoor breads.',
    image: paneerImg,
    order: 1,
    highlights: ['Paneer Butter Masala', 'Dal Makhani', 'Stuffed Naan & Kulcha', 'Shahi Paneer'],
  },
  {
    id: 'chinese',
    title: 'Chinese Vegetarian',
    subtitle: 'Wok-Tossed & Bold',
    description: 'Fresh wok preparations balancing fiery peppers, ginger, and savoury sauces crafted with crisp vegetables.',
    image: noodlesImg,
    order: 2,
    highlights: ['Hakka Noodles', 'Crispy Chilli Paneer', 'Veg Manchurian', 'Fried Rice'],
  },
  {
    id: 'fast-food',
    title: 'Fast Food & Snacks',
    subtitle: 'Evening Bites & Casual Classics',
    description: 'Handcrafted sandwiches, crisp pizzas, vibrant chaat, and quick comfort bites for evening cravings.',
    image: snacksImg,
    order: 3,
    highlights: ['Crispy Snacks', 'Artisanal Sandwiches', 'Gourmet Pizza', 'Loaded Fries'],
  },
  {
    id: 'desserts',
    title: 'Desserts & Beverages',
    subtitle: 'Sweet Endings & Refreshing Sips',
    description: 'Traditional slow-cooked kheer, rich halwas, cooling shakes, mocktails, and freshly brewed coffees.',
    image: dessertImg,
    order: 4,
    highlights: ['Saffron Kheer', 'Gulab Jamun', 'Artisanal Mocktails', 'Cold Brews & Shakes'],
  },
]
