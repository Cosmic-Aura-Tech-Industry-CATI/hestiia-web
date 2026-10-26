import fs from 'node:fs'
import path from 'node:path'

const RAW_MENU_PATH = path.resolve('src/content/menu.raw.json')
const OUTPUT_MENU_TS = path.resolve('src/content/menu.ts')

const rawDishes = JSON.parse(fs.readFileSync(RAW_MENU_PATH, 'utf-8'))

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// 4 Groups
export const MENU_GROUPS = [
  {
    id: 'north-indian',
    name: 'North Indian Delicacies',
    description: 'Slow-simmered rich curries, gravies, hand-rolled rotis, and aromatic rice specialities.',
    categoryIds: [
      'paneer',
      'veg-main-course',
      'dal',
      'rice-biryani',
      'breads',
      'tandoori-specials',
      'kebabs-starters',
      'salads-raita',
    ],
  },
  {
    id: 'chinese',
    name: 'Indo-Chinese Favourites',
    description: 'Fresh vegetables, tangy house-made sauces, and wok-seared noodles & starters.',
    categoryIds: ['chinese-starters', 'chinese-rice-noodles', 'soups'],
  },
  {
    id: 'fast-food',
    name: 'Quick Comforts & Snacks',
    description: 'Crispy snacks, gourmet sandwiches, and classic continental comfort eats.',
    categoryIds: ['sandwiches', 'burgers', 'pizza', 'pasta', 'sides-snacks'],
  },
  {
    id: 'desserts',
    name: 'Sweets & Refreshing Beverages',
    description: 'Handcrafted desserts, comforting hot brews, and refreshing iced mocktails.',
    categoryIds: ['desserts', 'beverages', 'mocktails', 'juices', 'shakes'],
  },
]

// 21 Categories
export const MENU_CATEGORIES = [
  // Fast Food
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    groupId: 'fast-food',
    order: 1,
    seoIntro: 'Freshly toasted pure vegetarian sandwiches layered with seasoned fillings and melted cheese.',
    fallbackImage: {
      src: '/menu/category-sandwiches.webp',
      srcSmall: '/menu/category-sandwiches-sm.webp',
      alt: 'Freshly toasted vegetarian sandwiches on a rustic platter',
      isIllustrative: true,
    },
  },
  {
    id: 'burgers',
    name: 'Burgers',
    groupId: 'fast-food',
    order: 2,
    seoIntro: 'Hearty vegetarian burgers crafted with crisp seasoned patties, fresh greens, and house sauces.',
    fallbackImage: {
      src: '/menu/category-burgers.webp',
      srcSmall: '/menu/category-burgers-sm.webp',
      alt: 'Crispy vegetarian burger in a toasted brioche bun',
      isIllustrative: true,
    },
  },
  {
    id: 'pizza',
    name: 'Pizza',
    groupId: 'fast-food',
    order: 3,
    seoIntro: 'Hand-stretched vegetarian pizzas baked with savoury tomato sauce and bubbling mozzarella cheese.',
    fallbackImage: {
      src: '/menu/category-pizza.webp',
      srcSmall: '/menu/category-pizza-sm.webp',
      alt: 'Artisan vegetarian pizza with golden melted cheese and fresh toppings',
      isIllustrative: true,
    },
  },
  {
    id: 'pasta',
    name: 'Pasta',
    groupId: 'fast-food',
    order: 4,
    seoIntro: 'Freshly cooked Italian penne tossed in aromatic herb-infused red, white, or mixed sauces.',
    fallbackImage: {
      src: '/menu/category-pasta.webp',
      srcSmall: '/menu/category-pasta-sm.webp',
      alt: 'Penne pasta tossed in rich tomato herb sauce with basil',
      isIllustrative: true,
    },
  },
  {
    id: 'sides-snacks',
    name: 'Sides & Snacks',
    groupId: 'fast-food',
    order: 5,
    seoIntro: 'Crispy golden finger foods, salted nachos, seasoned french fries, and classic evening snacks.',
    fallbackImage: {
      src: '/menu/category-sides-snacks.webp',
      srcSmall: '/menu/category-sides-snacks-sm.webp',
      alt: 'Golden crispy french fries and evening snacks',
      isIllustrative: true,
    },
  },

  // Chinese
  {
    id: 'soups',
    name: 'Soups',
    groupId: 'chinese',
    order: 6,
    seoIntro: 'Steaming bowls of comforting vegetarian broth prepared with crisp garden vegetables and aromatic seasonings.',
    fallbackImage: {
      src: '/menu/category-soups.webp',
      srcSmall: '/menu/category-soups-sm.webp',
      alt: 'Steaming bowl of hot vegetarian soup garnished with greens',
      isIllustrative: true,
    },
  },
  {
    id: 'chinese-starters',
    name: 'Chinese Starters',
    groupId: 'chinese',
    order: 7,
    seoIntro: 'Wok-tossed Indo-Chinese appetisers featuring crispy vegetables, glazed paneer, and savoury seasonings.',
    fallbackImage: {
      src: '/menu/category-chinese-starters.webp',
      srcSmall: '/menu/category-chinese-starters-sm.webp',
      alt: 'Wok-tossed crispy vegetarian Chinese starters with sesame seeds',
      isIllustrative: true,
    },
  },
  {
    id: 'chinese-rice-noodles',
    name: 'Chinese Rice & Noodles',
    groupId: 'chinese',
    order: 8,
    seoIntro: 'Savoury wok-fried rice and tossed noodles cooked with julienned vegetables and fragrant garlic oils.',
    fallbackImage: {
      src: '/menu/category-chinese-rice-noodles.webp',
      srcSmall: '/menu/category-chinese-rice-noodles-sm.webp',
      alt: 'Wok-tossed Hakka noodles with julienned bell peppers and scallions',
      isIllustrative: true,
    },
  },

  // North Indian
  {
    id: 'paneer',
    name: 'Paneer',
    groupId: 'north-indian',
    order: 9,
    seoIntro: 'Tender cottage cheese cubes simmered in spiced North Indian gravies, rich butter sauces, and aromatic masalas.',
    fallbackImage: {
      src: '/menu/category-paneer.webp',
      srcSmall: '/menu/category-paneer-sm.webp',
      alt: 'Rich paneer curry garnished with cream and coriander in a copper bowl',
      isIllustrative: true,
    },
  },
  {
    id: 'veg-main-course',
    name: 'Veg Main Course',
    groupId: 'north-indian',
    order: 10,
    seoIntro: 'Traditional vegetarian curries, slow-cooked regional gravies, and seasonal vegetables prepared with care.',
    fallbackImage: {
      src: '/menu/category-veg-main-course.webp',
      srcSmall: '/menu/category-veg-main-course-sm.webp',
      alt: 'Traditional North Indian vegetarian main course curries',
      isIllustrative: true,
    },
  },
  {
    id: 'dal',
    name: 'Dal',
    groupId: 'north-indian',
    order: 11,
    seoIntro: 'Hearty lentils slow-cooked to creamy perfection and finished with aromatic cumin, garlic, and ghee tadka.',
    fallbackImage: {
      src: '/menu/category-dal.webp',
      srcSmall: '/menu/category-dal-sm.webp',
      alt: 'Slow-simmered black dal makhani with fresh cream swirl in a copper bowl',
      isIllustrative: true,
    },
  },
  {
    id: 'rice-biryani',
    name: 'Rice & Biryani',
    groupId: 'north-indian',
    order: 12,
    seoIntro: 'Fragrant basmati rice preparations and layered dum biryanis infused with whole spices and fresh herbs.',
    fallbackImage: {
      src: '/menu/category-rice-biryani.webp',
      srcSmall: '/menu/category-rice-biryani-sm.webp',
      alt: 'Aromatic basmati rice biryani topped with fried onions and mint',
      isIllustrative: true,
    },
  },
  {
    id: 'breads',
    name: 'Breads',
    groupId: 'north-indian',
    order: 13,
    seoIntro: 'Freshly baked tandoori rotis, layered parathas, and butter naans baked to order in the clay oven.',
    fallbackImage: {
      src: '/menu/category-breads.webp',
      srcSmall: '/menu/category-breads-sm.webp',
      alt: 'Warm tandoori naan and layered rotis served fresh from the clay oven',
      isIllustrative: true,
    },
  },
  {
    id: 'tandoori-specials',
    name: 'Tandoori Specials',
    groupId: 'north-indian',
    order: 14,
    seoIntro: 'Charcoal-grilled paneer, spiced soya chaap, and marinated mushroom skewers roasted with clay-oven warmth.',
    fallbackImage: {
      src: '/menu/category-tandoori-specials.webp',
      srcSmall: '/menu/category-tandoori-specials-sm.webp',
      alt: 'Charcoal grilled tandoori skewers with mint chutney and lemon',
      isIllustrative: true,
    },
  },
  {
    id: 'kebabs-starters',
    name: 'Kebabs & Starters',
    groupId: 'north-indian',
    order: 15,
    seoIntro: 'Tender spiced vegetable and dahi kebabs shallow-fried to golden perfection, served with mint chutney.',
    fallbackImage: {
      src: '/menu/category-kebabs-starters.webp',
      srcSmall: '/menu/category-kebabs-starters-sm.webp',
      alt: 'Golden pan-fried dahi kebabs served with fresh mint dip',
      isIllustrative: true,
    },
  },
  {
    id: 'salads-raita',
    name: 'Salads & Raita',
    groupId: 'north-indian',
    order: 16,
    seoIntro: 'Crisp garden vegetable salads and seasoned whipped curd raitas flavoured with roasted cumin and fresh herbs.',
    fallbackImage: {
      src: '/menu/category-salads-raita.webp',
      srcSmall: '/menu/category-salads-raita-sm.webp',
      alt: 'Chilled creamy vegetable raita in a traditional terracotta bowl',
      isIllustrative: true,
    },
  },

  // Desserts & Beverages
  {
    id: 'juices',
    name: 'Juices',
    groupId: 'desserts',
    order: 17,
    seoIntro: 'Pure fruit juices pressed from fresh seasonal produce to refresh and energise your palate.',
    fallbackImage: {
      src: '/menu/category-juices.webp',
      srcSmall: '/menu/category-juices-sm.webp',
      alt: 'Chilled fresh fruit juice served with citrus garnish',
      isIllustrative: true,
    },
  },
  {
    id: 'shakes',
    name: 'Shakes',
    groupId: 'desserts',
    order: 18,
    seoIntro: 'Thick creamy milkshakes blended with chocolate, biscuits, rich fruit purees, and cold brewed coffee.',
    fallbackImage: {
      src: '/menu/category-shakes.webp',
      srcSmall: '/menu/category-shakes-sm.webp',
      alt: 'Chilled creamy chocolate milkshake topped with cocoa powder',
      isIllustrative: true,
    },
  },
  {
    id: 'beverages',
    name: 'Beverages',
    groupId: 'desserts',
    order: 19,
    seoIntro: 'Classic Indian teas, spiced coolers, frothy lassi, and warming coffees brewed throughout the day.',
    fallbackImage: {
      src: '/menu/category-beverages.webp',
      srcSmall: '/menu/category-beverages-sm.webp',
      alt: 'Refreshing iced beverage garnished with fresh mint and lime',
      isIllustrative: true,
    },
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    groupId: 'desserts',
    order: 20,
    seoIntro: 'Vibrant handcrafted non-alcoholic mocktails featuring chilled soda, fruit cordials, and fresh herbs.',
    fallbackImage: {
      src: '/menu/category-mocktails.webp',
      srcSmall: '/menu/category-mocktails-sm.webp',
      alt: 'Sparkling virgin mojito mocktail with crushed ice and fresh mint leaves',
      isIllustrative: true,
    },
  },
  {
    id: 'desserts',
    name: 'Desserts',
    groupId: 'desserts',
    order: 21,
    seoIntro: 'Warm traditional Indian sweets, spongy chhena, velvety ice creams, and decadent chocolate brownies.',
    fallbackImage: {
      src: '/menu/category-desserts.webp',
      srcSmall: '/menu/category-desserts-sm.webp',
      alt: 'Golden warm gulab jamun soaked in saffron cardamom syrup',
      isIllustrative: true,
    },
  },
]

// 24 Popular Dishes Config
export const POPULAR_DISH_CONFIG = {
  'dal-makhani': {
    story:
      'Dal Makhani is a beloved North Indian classic, slow-simmered over low heat with whole black lentils, butter, and mild spices. This dish develops a velvety texture and deep, comforting aroma. Pair it with butter naan or steamed basmati rice for a satisfying, wholesome family dinner.',
    ingredients: ['Black Lentils (Urad)', 'Kidney Beans (Rajma)', 'Butter', 'Fresh Cream', 'Ginger-Garlic', 'Aromatic Spices'],
    servesPeople: 2,
    pairsWith: ['dish-garlic-naan', 'dish-jeera-rice'],
    alt: 'Slow-simmered black dal makhani with fresh cream swirl in a copper bowl',
  },
  'paneer-butter-masala': {
    story:
      'Paneer Butter Masala highlights tender cottage cheese cubes bathed in a creamy tomato gravy enriched with butter and mild ground spices. Its smooth, mildly sweet profile makes it a perennial favourite at Indian dining tables. Best relished alongside warm tandoori roti or fragrant jeera rice.',
    ingredients: ['Fresh Paneer', 'Tomatoes', 'Butter', 'Cashew Paste', 'Fresh Cream', 'Kasturi Methi'],
    servesPeople: 2,
    pairsWith: ['dish-garlic-naan', 'dish-veg-pulao'],
    alt: 'Paneer butter masala in a copper bowl with a butter swirl',
  },
  'paneer-tikka': {
    story:
      'Paneer Tikka features thick, fresh cottage cheese cubes marinated in spiced yogurt, mustard oil, and carom seeds, skewered with bell peppers and roasted in a traditional clay tandoor. The smoky exterior and succulent interior create a classic starter for every vegetarian feast.',
    ingredients: ['Fresh Paneer', 'Hung Curd', 'Mustard Oil', 'Bell Peppers', 'Onions', 'Tandoori Masala'],
    servesPeople: 2,
    pairsWith: ['dish-v-mojito', 'dish-mix-veg-raita'],
    alt: 'Charcoal grilled paneer tikka with charred edges and bell peppers on a dark platter',
  },
  'veg-biryani': {
    story:
      'Veg Biryani brings together aged long-grain basmati rice and garden-fresh vegetables layered with saffron, mint, and whole spices in the dum style. Each spoonful releases warm aromas of cardamom and caramelized onions. Enjoy it with a bowl of chilled vegetable raita for a complete meal.',
    ingredients: ['Basmati Rice', 'Carrots', 'Green Beans', 'Green Peas', 'Saffron', 'Fried Onions', 'Whole Spices'],
    servesPeople: 2,
    pairsWith: ['dish-mix-veg-raita', 'dish-dal-tadka'],
    alt: 'Fragrant basmati veg biryani in an ornate copper handi with mint and fried onions',
  },
  'hestiia-special': {
    story:
      'Hestiia Special pizza is an artisan hand-stretched creation topped with savoury marinara sauce, bubbling mozzarella cheese, marinated paneer cubes, crisp capsicum, and sweet corn. Baked until the crust achieves a rustic crunch, it represents the ideal comfort centrepiece for sharing with friends.',
    ingredients: ['Pizza Dough', 'Tomato Herb Sauce', 'Mozzarella Cheese', 'Paneer', 'Bell Peppers', 'Sweet Corn'],
    servesPeople: 2,
    pairsWith: ['dish-v-mojito', 'dish-cheese-fries'],
    alt: 'Artisan vegetarian pizza with golden bubbling mozzarella, paneer, and fresh basil',
  },
  'hakka-noodles': {
    story:
      'Hakka Noodles are wok-tossed over high flame with shredded cabbage, crunchy carrots, bell peppers, and scallions in light soy and garlic oils. The delicate smokiness and tender noodle texture deliver a satisfying Indo-Chinese experience that pairs seamlessly with spicy Manchurian gravies.',
    ingredients: ['Wheat Noodles', 'Cabbage', 'Carrots', 'Bell Peppers', 'Spring Onions', 'Soy Sauce', 'Garlic'],
    servesPeople: 2,
    pairsWith: ['dish-veg-manchurian', 'dish-honey-chilli-potato'],
    alt: 'Wok-tossed Hakka noodles with julienned vegetables and spring onions',
  },
  'chinese-platter': {
    story:
      'The Chinese Platter brings together our most requested Indo-Chinese specialities on one generous tray. Featuring stir-fried Hakka noodles, aromatic veg fried rice, crispy spring rolls, and glazed veg Manchurian balls, it offers a complete tasting experience designed for dining together.',
    ingredients: ['Hakka Noodles', 'Fried Rice', 'Spring Rolls', 'Veg Manchurian', 'Chilli Dipping Sauce'],
    servesPeople: 3,
    pairsWith: ['dish-manchow', 'dish-v-mojito'],
    alt: 'Lavish vegetarian Chinese platter with noodles, fried rice, spring rolls, and manchurian',
  },
  'tandoori-platter': {
    story:
      'The Tandoori Platter presents a sizzling assortment of clay-oven delicacies including paneer tikka, marinated tandoori mushrooms, and seasoned soya chaap. Served hot with fresh mint chutney and lemon wedges, this platter celebrates smoky tandoor craftsmanship in every bite.',
    ingredients: ['Paneer Tikka', 'Tandoori Mushroom', 'Soya Chaap', 'Capsicum', 'Mint Chutney'],
    servesPeople: 3,
    pairsWith: ['dish-garlic-naan', 'dish-v-mojito'],
    alt: 'Sizzling vegetarian tandoori platter with paneer tikka, mushrooms, and soya chaap',
  },
  'gulab-jamun': {
    story:
      'Gulab Jamun is the quintessential Indian dessert, made with delicate reduced milk solids hand-rolled and gently fried before soaking in fragrant rose and cardamom sugar syrup. Served warm, each bite melts effortlessly on the tongue, offering a sweet conclusion to any North Indian meal.',
    ingredients: ['Mawa (Khoya)', 'Cardamom', 'Rose Water', 'Sugar Syrup', 'Pistachios'],
    servesPeople: 2,
    pairsWith: ['dish-vanilla-ice-cream', 'dish-hot-coffee'],
    alt: 'Warm golden brown gulab jamun soaked in cardamom rose syrup in a brass bowl',
  },
  'v-mojito': {
    story:
      'V. Mojito is our signature non-alcoholic refresher, crafted with muddled garden-fresh mint leaves, juicy lime wedges, and simple syrup, topped with effervescent sparkling soda over crushed ice. It cleanses the palate and complements rich curries and spicy tandoori starters.',
    ingredients: ['Fresh Mint', 'Lime Juice', 'Cane Sugar', 'Club Soda', 'Crushed Ice'],
    servesPeople: 1,
    pairsWith: ['dish-paneer-tikka', 'dish-hestiia-special'],
    alt: 'Chilled virgin mojito mocktail with crushed ice, fresh mint, and lime in a highball glass',
  },
  'paneer-tikka-sandwich': {
    story:
      'The Paneer Tikka Sandwich layers spiced, tandoori-roasted paneer cubes, crunchy sliced onions, and fresh mint chutney between golden grilled sandwich bread with melted cheese. Ideal for a hearty evening snack or quick lunch accompanied by refreshing iced beverages.',
    ingredients: ['Sandwich Bread', 'Tandoori Paneer', 'Cheese', 'Mint Chutney', 'Onions', 'Butter'],
    servesPeople: 1,
    pairsWith: ['dish-french-fries', 'dish-cold-coffee'],
    alt: 'Grilled paneer tikka sandwich with golden grill marks and melted cheese',
  },
  'cottage-cheese-burger': {
    story:
      'Our Cottage Cheese Burger features a golden breaded paneer patty seasoned with aromatic herbs, crowned with melted cheese, crisp lettuce, and ripe tomatoes inside a soft toasted bun. It delivers a satisfying crunch and creamy richness in every bite.',
    ingredients: ['Paneer Patty', 'Burger Bun', 'Cheese Slice', 'Lettuce', 'Tomato', 'House Sauce'],
    servesPeople: 1,
    pairsWith: ['dish-cheese-fries', 'dish-cold-coffee-with-ice-cream'],
    alt: 'Gourmet vegetarian cottage cheese burger with melted cheese and seasoned fries',
  },
  'red-sauce-pasta': {
    story:
      'Red Sauce Pasta is prepared with al dente penne simmered in a robust sauce of crushed sun-ripened tomatoes, garlic, extra virgin olive oil, and Italian herbs. Finished with fresh basil, this comforting pasta highlights clean Mediterranean flavours.',
    ingredients: ['Penne Pasta', 'Tomatoes', 'Garlic', 'Oregano', 'Fresh Basil', 'Olive Oil'],
    servesPeople: 1,
    pairsWith: ['dish-garlic-bread', 'dish-v-mojito'],
    alt: 'Penne arrabbiata red sauce pasta tossed in herb tomato sauce with fresh basil',
  },
  'manchow': {
    story:
      'Manchow Soup is an Indo-Chinese kitchen favourite featuring a hearty dark broth simmered with minced vegetables, ginger, garlic, and fresh coriander. Served piping hot and topped with crispy fried noodles, it provides an energising warmth before your meal.',
    ingredients: ['Mixed Vegetables', 'Ginger', 'Garlic', 'Soy Sauce', 'Crispy Fried Noodles', 'Scallions'],
    servesPeople: 1,
    pairsWith: ['dish-spring-roll', 'dish-hakka-noodles'],
    alt: 'Steaming bowl of veg manchow soup topped with crispy fried noodles and scallions',
  },
  'mix-veg-raita': {
    story:
      'Mix Veg Raita blends chilled, lightly whisked curd with finely diced cucumbers, ripe tomatoes, and fresh coriander, dusted with roasted cumin and rock salt. Its cooling touch balances robust spices from biryanis and tandoori gravies.',
    ingredients: ['Fresh Curd (Yogurt)', 'Cucumber', 'Tomato', 'Roasted Cumin', 'Rock Salt', 'Mint'],
    servesPeople: 2,
    pairsWith: ['dish-veg-biryani', 'dish-dal-makhani'],
    alt: 'Chilled creamy mix veg raita yogurt bowl with diced cucumber and roasted cumin',
  },
  'dahi-kebab': {
    story:
      'Dahi Kebab offers an exquisite contrast of textures, with a delicately crisp exterior encasing a smooth, velvety center of spiced hung curd and subtle herbs. Pan-seared to golden perfection, these kebabs melt gently on the palate when dipped in mint chutney.',
    ingredients: ['Hung Curd (Chakka)', 'Paneer', 'Green Chillies', 'Roasted Gram Flour', 'Fresh Coriander'],
    servesPeople: 2,
    pairsWith: ['dish-v-mojito', 'dish-paneer-tikka'],
    alt: 'Golden pan-fried dahi kebabs with a crisp crust and creamy center on a dark slate plate',
  },
  'honey-chilli-potato': {
    story:
      'Honey Chilli Potato features crisp-fried potato fingers tossed in a wok with sweet honey, spicy chilli paste, garlic, and toasted sesame seeds. The balance of heat and gentle sweetness makes it an enduring crowd pleaser for evening gatherings.',
    ingredients: ['Crisp Potatoes', 'Honey', 'Chilli Paste', 'Garlic', 'Sesame Seeds', 'Spring Onions'],
    servesPeople: 2,
    pairsWith: ['dish-hakka-noodles', 'dish-v-mojito'],
    alt: 'Crispy honey chilli potato wedges coated in glossy spicy-sweet glaze with sesame seeds',
  },
  'veg-manchurian': {
    story:
      'Veg Manchurian combines minced vegetable dumplings fried to a golden crisp and tossed in a savory Indo-Chinese sauce infused with garlic, soy, and ginger. Available in both dry starter and gravy styles to accompany fried rice or noodles.',
    ingredients: ['Cabbage', 'Carrots', 'Cornstarch', 'Garlic', 'Soy Sauce', 'Spring Onions'],
    servesPeople: 2,
    pairsWith: ['dish-veg-fried-rice', 'dish-hakka-noodles'],
    alt: 'Glazed vegetable manchurian dumplings garnished with scallions in a dark bowl',
  },
  'kadhai-paneer': {
    story:
      'Kadhai Paneer is cooked in a traditional cast-iron wok with chunky cottage cheese, crunchy green capsicum, and whole ground kadhai spices in a rustic onion-tomato gravy. It delivers bold aromatics and satisfying texture in every spoonful.',
    ingredients: ['Fresh Paneer', 'Bell Peppers', 'Tomatoes', 'Coriander Seeds', 'Kadhai Masala', 'Ginger'],
    servesPeople: 2,
    pairsWith: ['dish-laccha-paratha', 'dish-butter-naan'],
    alt: 'Kadhai paneer cooked with bell peppers and roasted spices in a traditional karahi',
  },
  'mushroom-butter-masala': {
    story:
      'Mushroom Butter Masala features plump button mushrooms gently cooked in a luxurious, creamy butter and cashew-infused gravy. Mildly spiced and naturally earthy, this vegetarian speciality pairs delightfully with hot tandoori breads.',
    ingredients: ['Button Mushrooms', 'Butter', 'Cashew Cream', 'Tomatoes', 'Garam Masala', 'Kasturi Methi'],
    servesPeople: 2,
    pairsWith: ['dish-garlic-naan', 'dish-jeera-rice'],
    alt: 'Tender button mushrooms simmered in creamy butter masala gravy in a copper bowl',
  },
  'mix-veg': {
    story:
      'Mix Veg is a colourful melange of seasonal garden vegetables including cauliflower, carrots, green beans, and peas, sautéed with cumin and warm North Indian spices. A timeless vegetarian staple that complements any dal and rice spread.',
    ingredients: ['Cauliflower', 'Carrots', 'Green Beans', 'Green Peas', 'Tomatoes', 'Cumin'],
    servesPeople: 2,
    pairsWith: ['dish-dal-tadka', 'dish-butter-roti'],
    alt: 'Colourful seasonal mixed vegetable curry cooked with cumin and Indian spices',
  },
  'garlic-naan': {
    story:
      'Garlic Naan is hand-stretched leavened flatbread sprinkled generously with minced fresh garlic and coriander, slapped onto the inner clay walls of the tandoor and brushed with melted butter. Its smoky aroma elevates every curry.',
    ingredients: ['Refined Flour (Maida)', 'Minced Garlic', 'Butter', 'Fresh Coriander', 'Milk'],
    servesPeople: 1,
    pairsWith: ['dish-dal-makhani', 'dish-paneer-butter-masala'],
    alt: 'Freshly baked tandoori garlic naan brushed with melted butter and minced garlic',
  },
  'cheese-fries': {
    story:
      'Cheese Fries bring golden, crispy potato fries smothered in warm, velvety melted cheese sauce and sprinkled with mild seasoning herbs. A classic comforting snack to enjoy alongside burgers or during casual get-togethers.',
    ingredients: ['Potato Fries', 'Melted Cheese Sauce', 'Seasoning Herbs', 'Paprika'],
    servesPeople: 1,
    pairsWith: ['dish-cottage-cheese-burger', 'dish-cold-coffee'],
    alt: 'Golden crispy french fries smothered with rich melted cheese sauce and herbs',
  },
  'cold-coffee-with-ice-cream': {
    story:
      'Cold Coffee with Ice Cream is a classic indulgence, blending chilled whole milk and strong espresso coffee, crowned with a generous scoop of velvety vanilla ice cream and drizzled with chocolate sauce. The ultimate treat for coffee lovers.',
    ingredients: ['Brewed Coffee', 'Chilled Milk', 'Vanilla Ice Cream', 'Chocolate Drizzle', 'Sugar'],
    servesPeople: 1,
    pairsWith: ['dish-paneer-tikka-sandwich', 'dish-cheese-fries'],
    alt: 'Chilled creamy cold coffee topped with a scoop of vanilla ice cream in a tall glass',
  },
}

// Typo Dictionary for suggestedName
const TYPO_MAP = {
  'Double Daker': 'Double Decker',
  'Marghrita': 'Margherita Pizza',
  'Choise On You': 'Choice of Soup',
  'Haryali Kebab': 'Hariyali Kebab',
  'Paneer Koftahani': 'Paneer Kofta Handi',
  'Paneer Bhujji': 'Paneer Bhurji',
  'Paneer Ragan Josh': 'Paneer Rogan Josh',
  'Banarsi Dum Aloo': 'Banarasi Dum Aloo',
  'Hydabadi Biryani': 'Hyderabadi Biryani',
  'Soya Aloo Kalimirch': 'Soya Aloo Kali Mirch',
  'Hestia Special Noodles': 'Hestiia Special Noodles',
  'Hestia Special Rice': 'Hestiia Special Rice',
  'Hestia Special Shake': 'Hestiia Special Shake',
  'Hestia Special Mocktail': 'Hestiia Special Mocktail',
  'Butter Scotch Ice Cream': 'Butterscotch Ice Cream',
  'Desi Chhach': 'Desi Chhaas',
}

// Dishes that support options (Dry / Gravy)
const OPTIONS_MAP = {
  'Chilli Manchurian': ['Dry', 'Gravy'],
  'Paneer Manchurian': ['Dry', 'Gravy'],
  'Veg Manchurian': ['Dry', 'Gravy'],
  'Chilli Mushroom': ['Dry', 'Gravy'],
  'Gobhi Manchurian Dry': ['Dry'],
}

// Generate concise description (110 - 160 characters)
function createDishDescription(name, category, price, index) {
  const isLocalMention = index % 3 === 0

  let desc = ''
  if (category === 'Sandwiches') {
    desc = isLocalMention
      ? `Toasted ${name} prepared with seasoned fillings and melted cheese, served fresh at Hestiia in Shyam Nagar, Kanpur.`
      : `Freshly toasted ${name} layered with seasoned fillings and melted cheese, grilled to golden crispness.`
  } else if (category === 'Burgers') {
    desc = isLocalMention
      ? `Hearty ${name} featuring a spiced patty, fresh greens, and house sauce in a soft toasted bun in Kanpur.`
      : `Savory ${name} prepared with a crisp seasoned patty, fresh lettuce, and house sauce in a toasted bun.`
  } else if (category === 'Pizza') {
    desc = isLocalMention
      ? `Freshly baked ${name} with herb tomato sauce and golden bubbling cheese, served at Hestiia Kanpur.`
      : `Artisan ${name} prepared with savoury tomato sauce, golden melted cheese, and choice toppings.`
  } else if (category === 'Pasta') {
    desc = isLocalMention
      ? `Al dente penne ${name} tossed in seasoned Italian herb sauce, served hot in Shyam Nagar, Kanpur.`
      : `Comforting ${name} cooked al dente and simmered in a fragrant herb and vegetable sauce.`
  } else if (category === 'Soups') {
    desc = isLocalMention
      ? `Comforting hot bowl of ${name} prepared with fresh vegetables and delicate seasonings in Kanpur.`
      : `Warm, steaming bowl of ${name} prepared with garden vegetables, mild herbs, and savoury broth.`
  } else if (category === 'Salads & Raita') {
    desc = isLocalMention
      ? `Chilled and refreshing ${name} prepared with fresh garden produce, served at Hestiia Kanpur.`
      : `Cool, refreshing bowl of ${name} prepared with garden ingredients, roasted cumin, and mild spices.`
  } else if (category === 'Kebabs & Starters') {
    desc = isLocalMention
      ? `Delicately spiced ${name} pan-seared to golden perfection, served fresh in Shyam Nagar, Kanpur.`
      : `Savory spiced ${name} cooked to crisp tenderness, served hot with fresh mint chutney.`
  } else if (category === 'Chinese Starters') {
    desc = isLocalMention
      ? `Wok-tossed ${name} prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur.`
      : `Crispy and flavourful ${name} tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces.`
  } else if (category === 'Chinese Rice & Noodles') {
    desc = isLocalMention
      ? `Aromatic wok-tossed ${name} stir-fried with garden vegetables and light seasonings in Kanpur.`
      : `Fragrant ${name} stir-fried over high heat with crisp julienned vegetables and light soy seasonings.`
  } else if (category === 'Paneer') {
    desc = isLocalMention
      ? `Tender cottage cheese ${name} simmered in rich spiced gravy, served at Hestiia in Shyam Nagar, Kanpur.`
      : `Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy.`
  } else if (category === 'Veg Main Course') {
    desc = isLocalMention
      ? `Homestyle pure vegetarian ${name} slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur.`
      : `Traditional pure vegetarian ${name} prepared with wholesome vegetables and slow-cooked gravies.`
  } else if (category === 'Dal') {
    desc = isLocalMention
      ? `Slow-simmered ${name} finished with aromatic spices, served fresh at Hestiia in Shyam Nagar, Kanpur.`
      : `Hearty and comforting ${name} slow-simmered with traditional spices and fragrant tempering.`
  } else if (category === 'Rice & Biryani') {
    desc = isLocalMention
      ? `Fragrant basmati ${name} infused with aromatic whole spices, served fresh at Hestiia in Kanpur.`
      : `Fluffy long-grain basmati ${name} gently cooked with whole spices, herbs, and mild aromatics.`
  } else if (category === 'Breads') {
    desc = isLocalMention
      ? `Freshly baked clay oven ${name} served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur.`
      : `Warm, freshly prepared tandoori ${name} baked to order in the traditional clay oven.`
  } else if (category === 'Tandoori Specials') {
    desc = isLocalMention
      ? `Charcoal-grilled ${name} roasted with aromatic marinades, served hot at Hestiia in Kanpur.`
      : `Succulent ${name} marinated in traditional spices and roasted over glowing charcoal tandoor.`
  } else if (category === 'Sides & Snacks') {
    desc = isLocalMention
      ? `Crispy seasoned ${name} prepared fresh to accompany your meal, served in Shyam Nagar, Kanpur.`
      : `Golden and crispy ${name} prepared fresh with seasoned spices, ideal for light evening dining.`
  } else if (category === 'Juices') {
    desc = isLocalMention
      ? `Chilled and revitalising ${name} pressed from fresh fruits, served at Hestiia in Kanpur.`
      : `Refreshing and chilled ${name} prepared with pure fruit extracts for a clean, natural taste.`
  } else if (category === 'Shakes') {
    desc = isLocalMention
      ? `Thick and creamy ${name} blended with fresh milk and rich ingredients, served in Kanpur.`
      : `Rich and thick ${name} blended smoothly with fresh chilled milk and signature flavours.`
  } else if (category === 'Beverages') {
    desc = isLocalMention
      ? `Refreshing and comforting ${name} brewed fresh for guests at Hestiia in Shyam Nagar, Kanpur.`
      : `Traditional and refreshing ${name} prepared fresh to order, perfect alongside any meal.`
  } else if (category === 'Mocktails') {
    desc = isLocalMention
      ? `Vibrant non-alcoholic ${name} blended with chilled soda and fruit notes, served in Kanpur.`
      : `Chilled non-alcoholic ${name} crafted with sparkling soda, fruit cordials, and fresh herbs.`
  } else if (category === 'Desserts') {
    desc = isLocalMention
      ? `Sweet and indulgent ${name} prepared with classic ingredients, served at Hestiia in Kanpur.`
      : `Rich and sweet ${name} handcrafted with pure ingredients to complete your dining experience.`
  } else {
    desc = `Delightful pure vegetarian ${name} prepared fresh with authentic seasonings at Hestiia in Kanpur.`
  }

  // Ensure length is strictly between 110 and 160 chars
  if (desc.length < 110) {
    desc = `${desc} Prepared fresh to order with pure vegetarian ingredients.`
  }
  if (desc.length > 160) {
    desc = desc.slice(0, 157) + '...'
  }
  return desc
}

// Generate SEO Title (max 60 chars)
function createSeoTitle(name, category) {
  // Format: "<Dish> - Pure Veg <Category> in Kanpur | Hestiia"
  const candidate = `${name} - Pure Veg ${category} in Kanpur | Hestiia`
  if (candidate.length <= 60) return candidate

  const shorter = `${name} - Pure Veg in Kanpur | Hestiia`
  if (shorter.length <= 60) return shorter

  const shortest = `${name} | Hestiia Kanpur`
  if (shortest.length <= 60) return shortest

  return name.slice(0, 50) + ' | Hestiia'
}

// Generate SEO Meta Description (140-160 chars, includes ₹<price>)
function createSeoMeta(name, category, price) {
  // Target 140-160 chars
  let meta = `Enjoy pure vegetarian ${name} (₹${price}) in ${category} at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.`
  if (meta.length < 140) {
    meta = `Enjoy pure vegetarian ${name} (₹${price}) in ${category} at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.`
  }
  if (meta.length > 160) {
    meta = meta.slice(0, 157) + '...'
  }
  return meta
}

export function buildFullMenu() {
  const categoryMap = new Map()
  for (const c of MENU_CATEGORIES) {
    categoryMap.set(c.name.toLowerCase(), c.id)
  }

  const slugCounts = new Map()
  const dishes = []

  rawDishes.forEach((raw, index) => {
    const rawName = raw.name.trim()
    const catName = raw.category.trim()
    const categoryId = categoryMap.get(catName.toLowerCase()) || slugify(catName)

    let baseSlug = slugify(rawName)
    // Avoid slug collisions
    let finalSlug = baseSlug
    if (slugCounts.has(finalSlug)) {
      finalSlug = `${baseSlug}-${categoryId}`
    }
    slugCounts.set(finalSlug, true)

    const id = `dish-${finalSlug}`
    const price = raw.price
    const suggestedName = TYPO_MAP[rawName] || null
    const options = OPTIONS_MAP[rawName] || null

    let spiceLevel = 0
    if (/chilli|schezwan|manchow|hot n sour|mirchi|angara|kadai|kadhai/i.test(rawName)) {
      spiceLevel = 2
    } else if (/masala|tikka|biryani|tadka|curry|rogan/i.test(rawName)) {
      spiceLevel = 1
    }

    const isPopular = Boolean(POPULAR_DISH_CONFIG[finalSlug])

    const tags = ['pure-veg']
    if (isPopular) tags.push('popular')
    if (price <= 100) tags.push('budget-friendly')
    if (/paneer/i.test(rawName)) tags.push('paneer-special')
    if (/tandoor/i.test(catName) || /tikka|kebab|naan|roti/i.test(rawName)) tags.push('tandoori')

    const description = createDishDescription(rawName, catName, price, index)
    const seoTitle = createSeoTitle(rawName, catName)
    const seoMeta = createSeoMeta(rawName, catName, price)

    const keywords = [
      `${rawName.toLowerCase()} Kanpur`,
      `pure veg ${catName.toLowerCase()} Shyam Nagar`,
      `${rawName.toLowerCase()} price Kanpur`,
      `Hestiia restaurant ${rawName.toLowerCase()}`,
    ]

    let image = null
    let detail = undefined

    if (isPopular) {
      const popConf = POPULAR_DISH_CONFIG[finalSlug]
      image = {
        src: `/menu/${finalSlug}.webp`,
        srcSmall: `/menu/${finalSlug}-sm.webp`,
        alt: popConf.alt,
        isIllustrative: true,
      }
      detail = {
        story: popConf.story,
        ingredients: popConf.ingredients,
        servesPeople: popConf.servesPeople,
        pairsWith: popConf.pairsWith,
        reviewFlags: ['needs client confirm'],
      }
    }

    dishes.push({
      id,
      slug: finalSlug,
      name: rawName,
      suggestedName,
      categoryId,
      price,
      isVeg: true,
      description,
      sourceDescription: raw.sourceDescription || null,
      portion: null,
      options,
      spiceLevel,
      popular: isPopular,
      tags,
      image,
      seo: {
        title: seoTitle,
        metaDescription: seoMeta,
        keywords,
      },
      detail,
    })
  })

  return dishes
}

// Generate file content
const fullDishes = buildFullMenu()

const fileContent = `/**
 * HESTIIA RESTAURANT — COMPREHENSIVE MENU DATA
 * Pure Vegetarian · Shyam Nagar, Kanpur
 * 193 Verified Dishes across 21 Categories
 */

export interface MenuGroup {
  id: string
  name: string
  description: string
  categoryIds: string[]
}

export interface MenuCategory {
  id: string
  name: string
  groupId: string
  order: number
  seoIntro: string
  fallbackImage: {
    src: string
    srcSmall: string
    alt: string
    isIllustrative: boolean
  }
}

export interface DishImage {
  src: string
  srcSmall: string
  alt: string
  isIllustrative: boolean
}

export interface DishSeo {
  title: string
  metaDescription: string
  keywords: string[]
}

export interface DishDetail {
  story: string
  ingredients: string[]
  servesPeople: number
  pairsWith: string[]
  reviewFlags?: string[]
}

export interface Dish {
  id: string
  slug: string
  name: string
  suggestedName: string | null
  categoryId: string
  price: number
  isVeg: true
  description: string
  sourceDescription: string | null
  portion: string | null
  options: string[] | null
  spiceLevel: number
  popular: boolean
  tags: string[]
  image: DishImage | null
  seo: DishSeo
  detail?: DishDetail
}

export const MENU_GROUPS: MenuGroup[] = ${JSON.stringify(MENU_GROUPS, null, 2)}

export const MENU_CATEGORIES: MenuCategory[] = ${JSON.stringify(MENU_CATEGORIES, null, 2)}

export const DISHES: Dish[] = ${JSON.stringify(fullDishes, null, 2)}

export const POPULAR_DISHES: Dish[] = DISHES.filter(d => d.popular)

/**
 * Backwards-compatible export for existing components (e.g. MenuPreview.tsx)
 */
export const MENU_CONFIG = {
  authoritativeMenuUrl: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/menu',
  disclaimer: 'Prices and seasonal dish availability are subject to daily kitchen updates. View our verified in-house menu for current prices.',
  categories: MENU_GROUPS.map(group => {
    const groupCategories = MENU_CATEGORIES.filter(c => c.groupId === group.id).map(c => c.id)
    const groupDishes = DISHES.filter(d => groupCategories.includes(d.categoryId))
    const highlights = groupDishes
      .filter(d => d.popular)
      .slice(0, 5)
      .map(d => d.name)

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      verifiedUrl: 'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar/menu',
      highlights: highlights.length > 0 ? highlights : groupDishes.slice(0, 5).map(d => d.name),
    }
  }),
}
`

fs.writeFileSync(OUTPUT_MENU_TS, fileContent, 'utf-8')
console.log(`✓ Enriched menu data written to ${OUTPUT_MENU_TS}`)
console.log(`✓ Total dishes: ${fullDishes.length}`)
console.log(`✓ Popular dishes with details & images: ${fullDishes.filter(d => d.popular).length}`)
