/**
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

export const MENU_GROUPS: MenuGroup[] = [
  {
    "id": "north-indian",
    "name": "North Indian Delicacies",
    "description": "Slow-simmered rich curries, gravies, hand-rolled rotis, and aromatic rice specialities.",
    "categoryIds": [
      "paneer",
      "veg-main-course",
      "dal",
      "rice-biryani",
      "breads",
      "tandoori-specials",
      "kebabs-starters",
      "salads-raita"
    ]
  },
  {
    "id": "chinese",
    "name": "Indo-Chinese Favourites",
    "description": "Fresh vegetables, tangy house-made sauces, and wok-seared noodles & starters.",
    "categoryIds": [
      "chinese-starters",
      "chinese-rice-noodles",
      "soups"
    ]
  },
  {
    "id": "fast-food",
    "name": "Quick Comforts & Snacks",
    "description": "Crispy snacks, gourmet sandwiches, and classic continental comfort eats.",
    "categoryIds": [
      "sandwiches",
      "burgers",
      "pizza",
      "pasta",
      "sides-snacks"
    ]
  },
  {
    "id": "desserts",
    "name": "Sweets & Refreshing Beverages",
    "description": "Handcrafted desserts, comforting hot brews, and refreshing iced mocktails.",
    "categoryIds": [
      "desserts",
      "beverages",
      "mocktails",
      "juices",
      "shakes"
    ]
  }
]

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    "id": "sandwiches",
    "name": "Sandwiches",
    "groupId": "fast-food",
    "order": 1,
    "seoIntro": "Freshly toasted pure vegetarian sandwiches layered with seasoned fillings and melted cheese.",
    "fallbackImage": {
      "src": "/menu/category-sandwiches.webp",
      "srcSmall": "/menu/category-sandwiches-sm.webp",
      "alt": "Freshly toasted vegetarian sandwiches on a rustic platter",
      "isIllustrative": true
    }
  },
  {
    "id": "burgers",
    "name": "Burgers",
    "groupId": "fast-food",
    "order": 2,
    "seoIntro": "Hearty vegetarian burgers crafted with crisp seasoned patties, fresh greens, and house sauces.",
    "fallbackImage": {
      "src": "/menu/category-burgers.webp",
      "srcSmall": "/menu/category-burgers-sm.webp",
      "alt": "Crispy vegetarian burger in a toasted brioche bun",
      "isIllustrative": true
    }
  },
  {
    "id": "pizza",
    "name": "Pizza",
    "groupId": "fast-food",
    "order": 3,
    "seoIntro": "Hand-stretched vegetarian pizzas baked with savoury tomato sauce and bubbling mozzarella cheese.",
    "fallbackImage": {
      "src": "/menu/category-pizza.webp",
      "srcSmall": "/menu/category-pizza-sm.webp",
      "alt": "Artisan vegetarian pizza with golden melted cheese and fresh toppings",
      "isIllustrative": true
    }
  },
  {
    "id": "pasta",
    "name": "Pasta",
    "groupId": "fast-food",
    "order": 4,
    "seoIntro": "Freshly cooked Italian penne tossed in aromatic herb-infused red, white, or mixed sauces.",
    "fallbackImage": {
      "src": "/menu/category-pasta.webp",
      "srcSmall": "/menu/category-pasta-sm.webp",
      "alt": "Penne pasta tossed in rich tomato herb sauce with basil",
      "isIllustrative": true
    }
  },
  {
    "id": "sides-snacks",
    "name": "Sides & Snacks",
    "groupId": "fast-food",
    "order": 5,
    "seoIntro": "Crispy golden finger foods, salted nachos, seasoned french fries, and classic evening snacks.",
    "fallbackImage": {
      "src": "/menu/category-sides-snacks.webp",
      "srcSmall": "/menu/category-sides-snacks-sm.webp",
      "alt": "Golden crispy french fries and evening snacks",
      "isIllustrative": true
    }
  },
  {
    "id": "soups",
    "name": "Soups",
    "groupId": "chinese",
    "order": 6,
    "seoIntro": "Steaming bowls of comforting vegetarian broth prepared with crisp garden vegetables and aromatic seasonings.",
    "fallbackImage": {
      "src": "/menu/category-soups.webp",
      "srcSmall": "/menu/category-soups-sm.webp",
      "alt": "Steaming bowl of hot vegetarian soup garnished with greens",
      "isIllustrative": true
    }
  },
  {
    "id": "chinese-starters",
    "name": "Chinese Starters",
    "groupId": "chinese",
    "order": 7,
    "seoIntro": "Wok-tossed Indo-Chinese appetisers featuring crispy vegetables, glazed paneer, and savoury seasonings.",
    "fallbackImage": {
      "src": "/menu/category-chinese-starters.webp",
      "srcSmall": "/menu/category-chinese-starters-sm.webp",
      "alt": "Wok-tossed crispy vegetarian Chinese starters with sesame seeds",
      "isIllustrative": true
    }
  },
  {
    "id": "chinese-rice-noodles",
    "name": "Chinese Rice & Noodles",
    "groupId": "chinese",
    "order": 8,
    "seoIntro": "Savoury wok-fried rice and tossed noodles cooked with julienned vegetables and fragrant garlic oils.",
    "fallbackImage": {
      "src": "/menu/category-chinese-rice-noodles.webp",
      "srcSmall": "/menu/category-chinese-rice-noodles-sm.webp",
      "alt": "Wok-tossed Hakka noodles with julienned bell peppers and scallions",
      "isIllustrative": true
    }
  },
  {
    "id": "paneer",
    "name": "Paneer",
    "groupId": "north-indian",
    "order": 9,
    "seoIntro": "Tender cottage cheese cubes simmered in spiced North Indian gravies, rich butter sauces, and aromatic masalas.",
    "fallbackImage": {
      "src": "/menu/category-paneer.webp",
      "srcSmall": "/menu/category-paneer-sm.webp",
      "alt": "Rich paneer curry garnished with cream and coriander in a copper bowl",
      "isIllustrative": true
    }
  },
  {
    "id": "veg-main-course",
    "name": "Veg Main Course",
    "groupId": "north-indian",
    "order": 10,
    "seoIntro": "Traditional vegetarian curries, slow-cooked regional gravies, and seasonal vegetables prepared with care.",
    "fallbackImage": {
      "src": "/menu/category-veg-main-course.webp",
      "srcSmall": "/menu/category-veg-main-course-sm.webp",
      "alt": "Traditional North Indian vegetarian main course curries",
      "isIllustrative": true
    }
  },
  {
    "id": "dal",
    "name": "Dal",
    "groupId": "north-indian",
    "order": 11,
    "seoIntro": "Hearty lentils slow-cooked to creamy perfection and finished with aromatic cumin, garlic, and ghee tadka.",
    "fallbackImage": {
      "src": "/menu/category-dal.webp",
      "srcSmall": "/menu/category-dal-sm.webp",
      "alt": "Slow-simmered black dal makhani with fresh cream swirl in a copper bowl",
      "isIllustrative": true
    }
  },
  {
    "id": "rice-biryani",
    "name": "Rice & Biryani",
    "groupId": "north-indian",
    "order": 12,
    "seoIntro": "Fragrant basmati rice preparations and layered dum biryanis infused with whole spices and fresh herbs.",
    "fallbackImage": {
      "src": "/menu/category-rice-biryani.webp",
      "srcSmall": "/menu/category-rice-biryani-sm.webp",
      "alt": "Aromatic basmati rice biryani topped with fried onions and mint",
      "isIllustrative": true
    }
  },
  {
    "id": "breads",
    "name": "Breads",
    "groupId": "north-indian",
    "order": 13,
    "seoIntro": "Freshly baked tandoori rotis, layered parathas, and butter naans baked to order in the clay oven.",
    "fallbackImage": {
      "src": "/menu/category-breads.webp",
      "srcSmall": "/menu/category-breads-sm.webp",
      "alt": "Warm tandoori naan and layered rotis served fresh from the clay oven",
      "isIllustrative": true
    }
  },
  {
    "id": "tandoori-specials",
    "name": "Tandoori Specials",
    "groupId": "north-indian",
    "order": 14,
    "seoIntro": "Charcoal-grilled paneer, spiced soya chaap, and marinated mushroom skewers roasted with clay-oven warmth.",
    "fallbackImage": {
      "src": "/menu/category-tandoori-specials.webp",
      "srcSmall": "/menu/category-tandoori-specials-sm.webp",
      "alt": "Charcoal grilled tandoori skewers with mint chutney and lemon",
      "isIllustrative": true
    }
  },
  {
    "id": "kebabs-starters",
    "name": "Kebabs & Starters",
    "groupId": "north-indian",
    "order": 15,
    "seoIntro": "Tender spiced vegetable and dahi kebabs shallow-fried to golden perfection, served with mint chutney.",
    "fallbackImage": {
      "src": "/menu/category-kebabs-starters.webp",
      "srcSmall": "/menu/category-kebabs-starters-sm.webp",
      "alt": "Golden pan-fried dahi kebabs served with fresh mint dip",
      "isIllustrative": true
    }
  },
  {
    "id": "salads-raita",
    "name": "Salads & Raita",
    "groupId": "north-indian",
    "order": 16,
    "seoIntro": "Crisp garden vegetable salads and seasoned whipped curd raitas flavoured with roasted cumin and fresh herbs.",
    "fallbackImage": {
      "src": "/menu/category-salads-raita.webp",
      "srcSmall": "/menu/category-salads-raita-sm.webp",
      "alt": "Chilled creamy vegetable raita in a traditional terracotta bowl",
      "isIllustrative": true
    }
  },
  {
    "id": "juices",
    "name": "Juices",
    "groupId": "desserts",
    "order": 17,
    "seoIntro": "Pure fruit juices pressed from fresh seasonal produce to refresh and energise your palate.",
    "fallbackImage": {
      "src": "/menu/category-juices.webp",
      "srcSmall": "/menu/category-juices-sm.webp",
      "alt": "Chilled fresh fruit juice served with citrus garnish",
      "isIllustrative": true
    }
  },
  {
    "id": "shakes",
    "name": "Shakes",
    "groupId": "desserts",
    "order": 18,
    "seoIntro": "Thick creamy milkshakes blended with chocolate, biscuits, rich fruit purees, and cold brewed coffee.",
    "fallbackImage": {
      "src": "/menu/category-shakes.webp",
      "srcSmall": "/menu/category-shakes-sm.webp",
      "alt": "Chilled creamy chocolate milkshake topped with cocoa powder",
      "isIllustrative": true
    }
  },
  {
    "id": "beverages",
    "name": "Beverages",
    "groupId": "desserts",
    "order": 19,
    "seoIntro": "Classic Indian teas, spiced coolers, frothy lassi, and warming coffees brewed throughout the day.",
    "fallbackImage": {
      "src": "/menu/category-beverages.webp",
      "srcSmall": "/menu/category-beverages-sm.webp",
      "alt": "Refreshing iced beverage garnished with fresh mint and lime",
      "isIllustrative": true
    }
  },
  {
    "id": "mocktails",
    "name": "Mocktails",
    "groupId": "desserts",
    "order": 20,
    "seoIntro": "Vibrant handcrafted non-alcoholic mocktails featuring chilled soda, fruit cordials, and fresh herbs.",
    "fallbackImage": {
      "src": "/menu/category-mocktails.webp",
      "srcSmall": "/menu/category-mocktails-sm.webp",
      "alt": "Sparkling virgin mojito mocktail with crushed ice and fresh mint leaves",
      "isIllustrative": true
    }
  },
  {
    "id": "desserts",
    "name": "Desserts",
    "groupId": "desserts",
    "order": 21,
    "seoIntro": "Warm traditional Indian sweets, spongy chhena, velvety ice creams, and decadent chocolate brownies.",
    "fallbackImage": {
      "src": "/menu/category-desserts.webp",
      "srcSmall": "/menu/category-desserts-sm.webp",
      "alt": "Golden warm gulab jamun soaked in saffron cardamom syrup",
      "isIllustrative": true
    }
  }
]

export const DISHES: Dish[] = [
  {
    "id": "dish-veg-sandwich",
    "slug": "veg-sandwich",
    "name": "Veg Sandwich",
    "suggestedName": null,
    "categoryId": "sandwiches",
    "price": 119,
    "isVeg": true,
    "description": "Toasted Veg Sandwich prepared with seasoned fillings and melted cheese, served fresh at Hestiia in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Sandwich - Pure Veg Sandwiches in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Sandwich (₹119) in Sandwiches at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg sandwich Kanpur",
        "pure veg sandwiches Shyam Nagar",
        "veg sandwich price Kanpur",
        "Hestiia restaurant veg sandwich"
      ]
    }
  },
  {
    "id": "dish-cheese-sandwich",
    "slug": "cheese-sandwich",
    "name": "Cheese Sandwich",
    "suggestedName": null,
    "categoryId": "sandwiches",
    "price": 139,
    "isVeg": true,
    "description": "Freshly toasted Cheese Sandwich layered with seasoned fillings and melted cheese, grilled to golden crispness.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Sandwich - Pure Veg Sandwiches in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Sandwich (₹139) in Sandwiches at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese sandwich Kanpur",
        "pure veg sandwiches Shyam Nagar",
        "cheese sandwich price Kanpur",
        "Hestiia restaurant cheese sandwich"
      ]
    }
  },
  {
    "id": "dish-cheese-corn-sandwich",
    "slug": "cheese-corn-sandwich",
    "name": "Cheese Corn Sandwich",
    "suggestedName": null,
    "categoryId": "sandwiches",
    "price": 149,
    "isVeg": true,
    "description": "Freshly toasted Cheese Corn Sandwich layered with seasoned fillings and melted cheese, grilled to golden crispness.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Corn Sandwich - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Corn Sandwich (₹149) in Sandwiches at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese corn sandwich Kanpur",
        "pure veg sandwiches Shyam Nagar",
        "cheese corn sandwich price Kanpur",
        "Hestiia restaurant cheese corn sandwich"
      ]
    }
  },
  {
    "id": "dish-paneer-tikka-sandwich",
    "slug": "paneer-tikka-sandwich",
    "name": "Paneer Tikka Sandwich",
    "suggestedName": null,
    "categoryId": "sandwiches",
    "price": 169,
    "isVeg": true,
    "description": "Toasted Paneer Tikka Sandwich prepared with seasoned fillings and melted cheese, served fresh at Hestiia in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "paneer-special",
      "tandoori"
    ],
    "image": {
      "src": "/menu/paneer-tikka-sandwich.webp",
      "srcSmall": "/menu/paneer-tikka-sandwich-sm.webp",
      "alt": "Grilled paneer tikka sandwich with golden grill marks and melted cheese",
      "isIllustrative": true
    },
    "seo": {
      "title": "Paneer Tikka Sandwich - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Tikka Sandwich (₹169) in Sandwiches at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer tikka sandwich Kanpur",
        "pure veg sandwiches Shyam Nagar",
        "paneer tikka sandwich price Kanpur",
        "Hestiia restaurant paneer tikka sandwich"
      ]
    },
    "detail": {
      "story": "The Paneer Tikka Sandwich layers spiced, tandoori-roasted paneer cubes, crunchy sliced onions, and fresh mint chutney between golden grilled sandwich bread with melted cheese. Ideal for a hearty evening snack or quick lunch accompanied by refreshing iced beverages.",
      "ingredients": [
        "Sandwich Bread",
        "Tandoori Paneer",
        "Cheese",
        "Mint Chutney",
        "Onions",
        "Butter"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-french-fries",
        "dish-cold-coffee"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-otc-sandwich",
    "slug": "otc-sandwich",
    "name": "O.T.C. Sandwich",
    "suggestedName": null,
    "categoryId": "sandwiches",
    "price": 139,
    "isVeg": true,
    "description": "Freshly toasted O.T.C. Sandwich layered with seasoned fillings and melted cheese, grilled to golden crispness.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "O.T.C. Sandwich - Pure Veg Sandwiches in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian O.T.C. Sandwich (₹139) in Sandwiches at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "o.t.c. sandwich Kanpur",
        "pure veg sandwiches Shyam Nagar",
        "o.t.c. sandwich price Kanpur",
        "Hestiia restaurant o.t.c. sandwich"
      ]
    }
  },
  {
    "id": "dish-veg-burger",
    "slug": "veg-burger",
    "name": "Veg Burger",
    "suggestedName": null,
    "categoryId": "burgers",
    "price": 89,
    "isVeg": true,
    "description": "Savory Veg Burger prepared with a crisp seasoned patty, fresh lettuce, and house sauce in a toasted bun. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Veg Burger - Pure Veg Burgers in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Burger (₹89) in Burgers at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "veg burger Kanpur",
        "pure veg burgers Shyam Nagar",
        "veg burger price Kanpur",
        "Hestiia restaurant veg burger"
      ]
    }
  },
  {
    "id": "dish-cheese-burger",
    "slug": "cheese-burger",
    "name": "Cheese Burger",
    "suggestedName": null,
    "categoryId": "burgers",
    "price": 109,
    "isVeg": true,
    "description": "Hearty Cheese Burger featuring a spiced patty, fresh greens, and house sauce in a soft toasted bun in Kanpur. Prepared fresh to order with pure vegetarian in...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Burger - Pure Veg Burgers in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Burger (₹109) in Burgers at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cheese burger Kanpur",
        "pure veg burgers Shyam Nagar",
        "cheese burger price Kanpur",
        "Hestiia restaurant cheese burger"
      ]
    }
  },
  {
    "id": "dish-double-daker",
    "slug": "double-daker",
    "name": "Double Daker",
    "suggestedName": "Double Decker",
    "categoryId": "burgers",
    "price": 169,
    "isVeg": true,
    "description": "Savory Double Daker prepared with a crisp seasoned patty, fresh lettuce, and house sauce in a toasted bun. Prepared fresh to order with pure vegetarian ingre...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Double Daker - Pure Veg Burgers in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Double Daker (₹169) in Burgers at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "double daker Kanpur",
        "pure veg burgers Shyam Nagar",
        "double daker price Kanpur",
        "Hestiia restaurant double daker"
      ]
    }
  },
  {
    "id": "dish-cottage-cheese-burger",
    "slug": "cottage-cheese-burger",
    "name": "Cottage Cheese Burger",
    "suggestedName": null,
    "categoryId": "burgers",
    "price": 189,
    "isVeg": true,
    "description": "Savory Cottage Cheese Burger prepared with a crisp seasoned patty, fresh lettuce, and house sauce in a toasted bun.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/cottage-cheese-burger.webp",
      "srcSmall": "/menu/cottage-cheese-burger-sm.webp",
      "alt": "Gourmet vegetarian cottage cheese burger with melted cheese and seasoned fries",
      "isIllustrative": true
    },
    "seo": {
      "title": "Cottage Cheese Burger - Pure Veg Burgers in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cottage Cheese Burger (₹189) in Burgers at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cottage cheese burger Kanpur",
        "pure veg burgers Shyam Nagar",
        "cottage cheese burger price Kanpur",
        "Hestiia restaurant cottage cheese burger"
      ]
    },
    "detail": {
      "story": "Our Cottage Cheese Burger features a golden breaded paneer patty seasoned with aromatic herbs, crowned with melted cheese, crisp lettuce, and ripe tomatoes inside a soft toasted bun. It delivers a satisfying crunch and creamy richness in every bite.",
      "ingredients": [
        "Paneer Patty",
        "Burger Bun",
        "Cheese Slice",
        "Lettuce",
        "Tomato",
        "House Sauce"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-cheese-fries",
        "dish-cold-coffee-with-ice-cream"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-marghrita",
    "slug": "marghrita",
    "name": "Marghrita",
    "suggestedName": "Margherita Pizza",
    "categoryId": "pizza",
    "price": 189,
    "isVeg": true,
    "description": "Freshly baked Marghrita with herb tomato sauce and golden bubbling cheese, served at Hestiia Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Marghrita - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Marghrita (₹189) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "marghrita Kanpur",
        "pure veg pizza Shyam Nagar",
        "marghrita price Kanpur",
        "Hestiia restaurant marghrita"
      ]
    }
  },
  {
    "id": "dish-fresh-veggies",
    "slug": "fresh-veggies",
    "name": "Fresh Veggies",
    "suggestedName": null,
    "categoryId": "pizza",
    "price": 219,
    "isVeg": true,
    "description": "Artisan Fresh Veggies prepared with savoury tomato sauce, golden melted cheese, and choice toppings. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Fresh Veggies - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Fresh Veggies (₹219) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "fresh veggies Kanpur",
        "pure veg pizza Shyam Nagar",
        "fresh veggies price Kanpur",
        "Hestiia restaurant fresh veggies"
      ]
    }
  },
  {
    "id": "dish-cheese-corn",
    "slug": "cheese-corn",
    "name": "Cheese Corn",
    "suggestedName": null,
    "categoryId": "pizza",
    "price": 219,
    "isVeg": true,
    "description": "Artisan Cheese Corn prepared with savoury tomato sauce, golden melted cheese, and choice toppings. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Corn - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Corn (₹219) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cheese corn Kanpur",
        "pure veg pizza Shyam Nagar",
        "cheese corn price Kanpur",
        "Hestiia restaurant cheese corn"
      ]
    }
  },
  {
    "id": "dish-farm-fresh",
    "slug": "farm-fresh",
    "name": "Farm Fresh",
    "suggestedName": null,
    "categoryId": "pizza",
    "price": 249,
    "isVeg": true,
    "description": "Freshly baked Farm Fresh with herb tomato sauce and golden bubbling cheese, served at Hestiia Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Farm Fresh - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Farm Fresh (₹249) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "farm fresh Kanpur",
        "pure veg pizza Shyam Nagar",
        "farm fresh price Kanpur",
        "Hestiia restaurant farm fresh"
      ]
    }
  },
  {
    "id": "dish-paneer-tikka-pizza",
    "slug": "paneer-tikka-pizza",
    "name": "Paneer Tikka Pizza",
    "suggestedName": null,
    "categoryId": "pizza",
    "price": 279,
    "isVeg": true,
    "description": "Artisan Paneer Tikka Pizza prepared with savoury tomato sauce, golden melted cheese, and choice toppings. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Tikka Pizza - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Tikka Pizza (₹279) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer tikka pizza Kanpur",
        "pure veg pizza Shyam Nagar",
        "paneer tikka pizza price Kanpur",
        "Hestiia restaurant paneer tikka pizza"
      ]
    }
  },
  {
    "id": "dish-hestiia-special",
    "slug": "hestiia-special",
    "name": "Hestiia Special",
    "suggestedName": null,
    "categoryId": "pizza",
    "price": 339,
    "isVeg": true,
    "description": "Artisan Hestiia Special prepared with savoury tomato sauce, golden melted cheese, and choice toppings. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/hestiia-special.webp",
      "srcSmall": "/menu/hestiia-special-sm.webp",
      "alt": "Artisan vegetarian pizza with golden bubbling mozzarella, paneer, and fresh basil",
      "isIllustrative": true
    },
    "seo": {
      "title": "Hestiia Special - Pure Veg Pizza in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hestiia Special (₹339) in Pizza at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "hestiia special Kanpur",
        "pure veg pizza Shyam Nagar",
        "hestiia special price Kanpur",
        "Hestiia restaurant hestiia special"
      ]
    },
    "detail": {
      "story": "Hestiia Special pizza is an artisan hand-stretched creation topped with savoury marinara sauce, bubbling mozzarella cheese, marinated paneer cubes, crisp capsicum, and sweet corn. Baked until the crust achieves a rustic crunch, it represents the ideal comfort centrepiece for sharing with friends.",
      "ingredients": [
        "Pizza Dough",
        "Tomato Herb Sauce",
        "Mozzarella Cheese",
        "Paneer",
        "Bell Peppers",
        "Sweet Corn"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-v-mojito",
        "dish-cheese-fries"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-red-sauce-pasta",
    "slug": "red-sauce-pasta",
    "name": "Red Sauce Pasta",
    "suggestedName": null,
    "categoryId": "pasta",
    "price": 219,
    "isVeg": true,
    "description": "Al dente penne Red Sauce Pasta tossed in seasoned Italian herb sauce, served hot in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/red-sauce-pasta.webp",
      "srcSmall": "/menu/red-sauce-pasta-sm.webp",
      "alt": "Penne arrabbiata red sauce pasta tossed in herb tomato sauce with fresh basil",
      "isIllustrative": true
    },
    "seo": {
      "title": "Red Sauce Pasta - Pure Veg Pasta in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Red Sauce Pasta (₹219) in Pasta at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "red sauce pasta Kanpur",
        "pure veg pasta Shyam Nagar",
        "red sauce pasta price Kanpur",
        "Hestiia restaurant red sauce pasta"
      ]
    },
    "detail": {
      "story": "Red Sauce Pasta is prepared with al dente penne simmered in a robust sauce of crushed sun-ripened tomatoes, garlic, extra virgin olive oil, and Italian herbs. Finished with fresh basil, this comforting pasta highlights clean Mediterranean flavours.",
      "ingredients": [
        "Penne Pasta",
        "Tomatoes",
        "Garlic",
        "Oregano",
        "Fresh Basil",
        "Olive Oil"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-garlic-bread",
        "dish-v-mojito"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-white-sauce-pasta",
    "slug": "white-sauce-pasta",
    "name": "White Sauce Pasta",
    "suggestedName": null,
    "categoryId": "pasta",
    "price": 249,
    "isVeg": true,
    "description": "Comforting White Sauce Pasta cooked al dente and simmered in a fragrant herb and vegetable sauce. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "White Sauce Pasta - Pure Veg Pasta in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian White Sauce Pasta (₹249) in Pasta at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "white sauce pasta Kanpur",
        "pure veg pasta Shyam Nagar",
        "white sauce pasta price Kanpur",
        "Hestiia restaurant white sauce pasta"
      ]
    }
  },
  {
    "id": "dish-pink-sauce-pasta",
    "slug": "pink-sauce-pasta",
    "name": "Pink Sauce Pasta",
    "suggestedName": null,
    "categoryId": "pasta",
    "price": 259,
    "isVeg": true,
    "description": "Comforting Pink Sauce Pasta cooked al dente and simmered in a fragrant herb and vegetable sauce. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Pink Sauce Pasta - Pure Veg Pasta in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Pink Sauce Pasta (₹259) in Pasta at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "pink sauce pasta Kanpur",
        "pure veg pasta Shyam Nagar",
        "pink sauce pasta price Kanpur",
        "Hestiia restaurant pink sauce pasta"
      ]
    }
  },
  {
    "id": "dish-cream-of-tomato",
    "slug": "cream-of-tomato",
    "name": "Cream of Tomato",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Comforting hot bowl of Cream of Tomato prepared with fresh vegetables and delicate seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cream of Tomato - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cream of Tomato (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cream of tomato Kanpur",
        "pure veg soups Shyam Nagar",
        "cream of tomato price Kanpur",
        "Hestiia restaurant cream of tomato"
      ]
    }
  },
  {
    "id": "dish-hot-n-sour",
    "slug": "hot-n-sour",
    "name": "Hot N Sour",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Warm, steaming bowl of Hot N Sour prepared with garden vegetables, mild herbs, and savoury broth. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hot N Sour - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hot N Sour (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "hot n sour Kanpur",
        "pure veg soups Shyam Nagar",
        "hot n sour price Kanpur",
        "Hestiia restaurant hot n sour"
      ]
    }
  },
  {
    "id": "dish-manchow",
    "slug": "manchow",
    "name": "Manchow",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Warm, steaming bowl of Manchow prepared with garden vegetables, mild herbs, and savoury broth. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/manchow.webp",
      "srcSmall": "/menu/manchow-sm.webp",
      "alt": "Steaming bowl of veg manchow soup topped with crispy fried noodles and scallions",
      "isIllustrative": true
    },
    "seo": {
      "title": "Manchow - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Manchow (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "manchow Kanpur",
        "pure veg soups Shyam Nagar",
        "manchow price Kanpur",
        "Hestiia restaurant manchow"
      ]
    },
    "detail": {
      "story": "Manchow Soup is an Indo-Chinese kitchen favourite featuring a hearty dark broth simmered with minced vegetables, ginger, garlic, and fresh coriander. Served piping hot and topped with crispy fried noodles, it provides an energising warmth before your meal.",
      "ingredients": [
        "Mixed Vegetables",
        "Ginger",
        "Garlic",
        "Soy Sauce",
        "Crispy Fried Noodles",
        "Scallions"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-spring-roll",
        "dish-hakka-noodles"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-sweet-corn",
    "slug": "sweet-corn",
    "name": "Sweet Corn",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Comforting hot bowl of Sweet Corn prepared with fresh vegetables and delicate seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Sweet Corn - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Sweet Corn (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "sweet corn Kanpur",
        "pure veg soups Shyam Nagar",
        "sweet corn price Kanpur",
        "Hestiia restaurant sweet corn"
      ]
    }
  },
  {
    "id": "dish-cream-of-mushroom",
    "slug": "cream-of-mushroom",
    "name": "Cream of Mushroom",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Warm, steaming bowl of Cream of Mushroom prepared with garden vegetables, mild herbs, and savoury broth. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cream of Mushroom - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cream of Mushroom (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cream of mushroom Kanpur",
        "pure veg soups Shyam Nagar",
        "cream of mushroom price Kanpur",
        "Hestiia restaurant cream of mushroom"
      ]
    }
  },
  {
    "id": "dish-veg-clear",
    "slug": "veg-clear",
    "name": "Veg Clear",
    "suggestedName": null,
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Warm, steaming bowl of Veg Clear prepared with garden vegetables, mild herbs, and savoury broth. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Clear - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Clear (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "veg clear Kanpur",
        "pure veg soups Shyam Nagar",
        "veg clear price Kanpur",
        "Hestiia restaurant veg clear"
      ]
    }
  },
  {
    "id": "dish-choise-on-you",
    "slug": "choise-on-you",
    "name": "Choise On You",
    "suggestedName": "Choice of Soup",
    "categoryId": "soups",
    "price": 119,
    "isVeg": true,
    "description": "Comforting hot bowl of Choise On You prepared with fresh vegetables and delicate seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Choise On You - Pure Veg Soups in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Choise On You (₹119) in Soups at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "choise on you Kanpur",
        "pure veg soups Shyam Nagar",
        "choise on you price Kanpur",
        "Hestiia restaurant choise on you"
      ]
    }
  },
  {
    "id": "dish-onion-salad",
    "slug": "onion-salad",
    "name": "Onion Salad",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 49,
    "isVeg": true,
    "description": "Cool, refreshing bowl of Onion Salad prepared with garden ingredients, roasted cumin, and mild spices. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Onion Salad - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Onion Salad (₹49) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "onion salad Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "onion salad price Kanpur",
        "Hestiia restaurant onion salad"
      ]
    }
  },
  {
    "id": "dish-cucumber-salad",
    "slug": "cucumber-salad",
    "name": "Cucumber Salad",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 49,
    "isVeg": true,
    "description": "Cool, refreshing bowl of Cucumber Salad prepared with garden ingredients, roasted cumin, and mild spices. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Cucumber Salad - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cucumber Salad (₹49) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cucumber salad Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "cucumber salad price Kanpur",
        "Hestiia restaurant cucumber salad"
      ]
    }
  },
  {
    "id": "dish-green-salad",
    "slug": "green-salad",
    "name": "Green Salad",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 69,
    "isVeg": true,
    "description": "Chilled and refreshing Green Salad prepared with fresh garden produce, served at Hestiia Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Green Salad - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Green Salad (₹69) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "green salad Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "green salad price Kanpur",
        "Hestiia restaurant green salad"
      ]
    }
  },
  {
    "id": "dish-boondi-raita",
    "slug": "boondi-raita",
    "name": "Boondi Raita",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 99,
    "isVeg": true,
    "description": "Cool, refreshing bowl of Boondi Raita prepared with garden ingredients, roasted cumin, and mild spices. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Boondi Raita - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Boondi Raita (₹99) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "boondi raita Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "boondi raita price Kanpur",
        "Hestiia restaurant boondi raita"
      ]
    }
  },
  {
    "id": "dish-mix-veg-raita",
    "slug": "mix-veg-raita",
    "name": "Mix Veg Raita",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 99,
    "isVeg": true,
    "description": "Cool, refreshing bowl of Mix Veg Raita prepared with garden ingredients, roasted cumin, and mild spices. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "budget-friendly"
    ],
    "image": {
      "src": "/menu/mix-veg-raita.webp",
      "srcSmall": "/menu/mix-veg-raita-sm.webp",
      "alt": "Chilled creamy mix veg raita yogurt bowl with diced cucumber and roasted cumin",
      "isIllustrative": true
    },
    "seo": {
      "title": "Mix Veg Raita - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mix Veg Raita (₹99) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mix veg raita Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "mix veg raita price Kanpur",
        "Hestiia restaurant mix veg raita"
      ]
    },
    "detail": {
      "story": "Mix Veg Raita blends chilled, lightly whisked curd with finely diced cucumbers, ripe tomatoes, and fresh coriander, dusted with roasted cumin and rock salt. Its cooling touch balances robust spices from biryanis and tandoori gravies.",
      "ingredients": [
        "Fresh Curd (Yogurt)",
        "Cucumber",
        "Tomato",
        "Roasted Cumin",
        "Rock Salt",
        "Mint"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-veg-biryani",
        "dish-dal-makhani"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-pineapple-raita",
    "slug": "pineapple-raita",
    "name": "Pineapple Raita",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 129,
    "isVeg": true,
    "description": "Chilled and refreshing Pineapple Raita prepared with fresh garden produce, served at Hestiia Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Pineapple Raita - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Pineapple Raita (₹129) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "pineapple raita Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "pineapple raita price Kanpur",
        "Hestiia restaurant pineapple raita"
      ]
    }
  },
  {
    "id": "dish-fruit-raita",
    "slug": "fruit-raita",
    "name": "Fruit Raita",
    "suggestedName": null,
    "categoryId": "salads-raita",
    "price": 129,
    "isVeg": true,
    "description": "Cool, refreshing bowl of Fruit Raita prepared with garden ingredients, roasted cumin, and mild spices. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Fruit Raita - Pure Veg Salads & Raita in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Fruit Raita (₹129) in Salads & Raita at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "fruit raita Kanpur",
        "pure veg salads & raita Shyam Nagar",
        "fruit raita price Kanpur",
        "Hestiia restaurant fruit raita"
      ]
    }
  },
  {
    "id": "dish-haryali-kebab",
    "slug": "haryali-kebab",
    "name": "Haryali Kebab",
    "suggestedName": "Hariyali Kebab",
    "categoryId": "kebabs-starters",
    "price": 165,
    "isVeg": true,
    "description": "Savory spiced Haryali Kebab cooked to crisp tenderness, served hot with fresh mint chutney. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Haryali Kebab - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Haryali Kebab (₹165) in Kebabs & Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "haryali kebab Kanpur",
        "pure veg kebabs & starters Shyam Nagar",
        "haryali kebab price Kanpur",
        "Hestiia restaurant haryali kebab"
      ]
    }
  },
  {
    "id": "dish-dahi-kebab",
    "slug": "dahi-kebab",
    "name": "Dahi Kebab",
    "suggestedName": null,
    "categoryId": "kebabs-starters",
    "price": 165,
    "isVeg": true,
    "description": "Delicately spiced Dahi Kebab pan-seared to golden perfection, served fresh in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "tandoori"
    ],
    "image": {
      "src": "/menu/dahi-kebab.webp",
      "srcSmall": "/menu/dahi-kebab-sm.webp",
      "alt": "Golden pan-fried dahi kebabs with a crisp crust and creamy center on a dark slate plate",
      "isIllustrative": true
    },
    "seo": {
      "title": "Dahi Kebab - Pure Veg Kebabs & Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dahi Kebab (₹165) in Kebabs & Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "dahi kebab Kanpur",
        "pure veg kebabs & starters Shyam Nagar",
        "dahi kebab price Kanpur",
        "Hestiia restaurant dahi kebab"
      ]
    },
    "detail": {
      "story": "Dahi Kebab offers an exquisite contrast of textures, with a delicately crisp exterior encasing a smooth, velvety center of spiced hung curd and subtle herbs. Pan-seared to golden perfection, these kebabs melt gently on the palate when dipped in mint chutney.",
      "ingredients": [
        "Hung Curd (Chakka)",
        "Paneer",
        "Green Chillies",
        "Roasted Gram Flour",
        "Fresh Coriander"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-v-mojito",
        "dish-paneer-tikka"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-seekh-kebab",
    "slug": "seekh-kebab",
    "name": "Seekh Kebab",
    "suggestedName": null,
    "categoryId": "kebabs-starters",
    "price": 189,
    "isVeg": true,
    "description": "Savory spiced Seekh Kebab cooked to crisp tenderness, served hot with fresh mint chutney. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Seekh Kebab - Pure Veg Kebabs & Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Seekh Kebab (₹189) in Kebabs & Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "seekh kebab Kanpur",
        "pure veg kebabs & starters Shyam Nagar",
        "seekh kebab price Kanpur",
        "Hestiia restaurant seekh kebab"
      ]
    }
  },
  {
    "id": "dish-shami-kebab",
    "slug": "shami-kebab",
    "name": "Shami Kebab",
    "suggestedName": null,
    "categoryId": "kebabs-starters",
    "price": 189,
    "isVeg": true,
    "description": "Savory spiced Shami Kebab cooked to crisp tenderness, served hot with fresh mint chutney. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Shami Kebab - Pure Veg Kebabs & Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Shami Kebab (₹189) in Kebabs & Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "shami kebab Kanpur",
        "pure veg kebabs & starters Shyam Nagar",
        "shami kebab price Kanpur",
        "Hestiia restaurant shami kebab"
      ]
    }
  },
  {
    "id": "dish-honey-chilli-potato",
    "slug": "honey-chilli-potato",
    "name": "Honey Chilli Potato",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 165,
    "isVeg": true,
    "description": "Wok-tossed Honey Chilli Potato prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/honey-chilli-potato.webp",
      "srcSmall": "/menu/honey-chilli-potato-sm.webp",
      "alt": "Crispy honey chilli potato wedges coated in glossy spicy-sweet glaze with sesame seeds",
      "isIllustrative": true
    },
    "seo": {
      "title": "Honey Chilli Potato - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Honey Chilli Potato (₹165) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "honey chilli potato Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "honey chilli potato price Kanpur",
        "Hestiia restaurant honey chilli potato"
      ]
    },
    "detail": {
      "story": "Honey Chilli Potato features crisp-fried potato fingers tossed in a wok with sweet honey, spicy chilli paste, garlic, and toasted sesame seeds. The balance of heat and gentle sweetness makes it an enduring crowd pleaser for evening gatherings.",
      "ingredients": [
        "Crisp Potatoes",
        "Honey",
        "Chilli Paste",
        "Garlic",
        "Sesame Seeds",
        "Spring Onions"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-hakka-noodles",
        "dish-v-mojito"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-crispy-corn",
    "slug": "crispy-corn",
    "name": "Crispy Corn",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 165,
    "isVeg": true,
    "description": "Crispy and flavourful Crispy Corn tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Crispy Corn - Pure Veg Chinese Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Crispy Corn (₹165) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "crispy corn Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "crispy corn price Kanpur",
        "Hestiia restaurant crispy corn"
      ]
    }
  },
  {
    "id": "dish-gobhi-manchurian-dry",
    "slug": "gobhi-manchurian-dry",
    "name": "Gobhi Manchurian Dry",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 165,
    "isVeg": true,
    "description": "Crispy and flavourful Gobhi Manchurian Dry tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces.",
    "sourceDescription": null,
    "portion": null,
    "options": [
      "Dry"
    ],
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Gobhi Manchurian Dry - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Gobhi Manchurian Dry (₹165) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "gobhi manchurian dry Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "gobhi manchurian dry price Kanpur",
        "Hestiia restaurant gobhi manchurian dry"
      ]
    }
  },
  {
    "id": "dish-spring-roll",
    "slug": "spring-roll",
    "name": "Spring Roll",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 185,
    "isVeg": true,
    "description": "Wok-tossed Spring Roll prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Spring Roll - Pure Veg Chinese Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Spring Roll (₹185) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "spring roll Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "spring roll price Kanpur",
        "Hestiia restaurant spring roll"
      ]
    }
  },
  {
    "id": "dish-cheese-cigar-roll",
    "slug": "cheese-cigar-roll",
    "name": "Cheese Cigar Roll",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 185,
    "isVeg": true,
    "description": "Crispy and flavourful Cheese Cigar Roll tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Cigar Roll - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Cigar Roll (₹185) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese cigar roll Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "cheese cigar roll price Kanpur",
        "Hestiia restaurant cheese cigar roll"
      ]
    }
  },
  {
    "id": "dish-creamy-crispy-paneer",
    "slug": "creamy-crispy-paneer",
    "name": "Creamy Crispy Paneer",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 185,
    "isVeg": true,
    "description": "Crispy and flavourful Creamy Crispy Paneer tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Creamy Crispy Paneer - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Creamy Crispy Paneer (₹185) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "creamy crispy paneer Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "creamy crispy paneer price Kanpur",
        "Hestiia restaurant creamy crispy paneer"
      ]
    }
  },
  {
    "id": "dish-spinach-corn-salt-n-pepper",
    "slug": "spinach-corn-salt-n-pepper",
    "name": "Spinach Corn Salt N Pepper",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 185,
    "isVeg": true,
    "description": "Wok-tossed Spinach Corn Salt N Pepper prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Spinach Corn Salt N Pepper - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Spinach Corn Salt N Pepper (₹185) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "spinach corn salt n pepper Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "spinach corn salt n pepper price Kanpur",
        "Hestiia restaurant spinach corn salt n pepper"
      ]
    }
  },
  {
    "id": "dish-chilli-potato",
    "slug": "chilli-potato",
    "name": "Chilli Potato",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 185,
    "isVeg": true,
    "description": "Crispy and flavourful Chilli Potato tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Chilli Potato - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chilli Potato (₹185) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chilli potato Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "chilli potato price Kanpur",
        "Hestiia restaurant chilli potato"
      ]
    }
  },
  {
    "id": "dish-crispy-veg",
    "slug": "crispy-veg",
    "name": "Crispy Veg",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 189,
    "isVeg": true,
    "description": "Crispy and flavourful Crispy Veg tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Crispy Veg - Pure Veg Chinese Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Crispy Veg (₹189) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "crispy veg Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "crispy veg price Kanpur",
        "Hestiia restaurant crispy veg"
      ]
    }
  },
  {
    "id": "dish-spinach-cheese-corn-roll",
    "slug": "spinach-cheese-corn-roll",
    "name": "Spinach Cheese Corn Roll",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 189,
    "isVeg": true,
    "description": "Wok-tossed Spinach Cheese Corn Roll prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Spinach Cheese Corn Roll - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Spinach Cheese Corn Roll (₹189) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "spinach cheese corn roll Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "spinach cheese corn roll price Kanpur",
        "Hestiia restaurant spinach cheese corn roll"
      ]
    }
  },
  {
    "id": "dish-mushroom-stick",
    "slug": "mushroom-stick",
    "name": "Mushroom Stick",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 189,
    "isVeg": true,
    "description": "Crispy and flavourful Mushroom Stick tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Mushroom Stick - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mushroom Stick (₹189) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mushroom stick Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "mushroom stick price Kanpur",
        "Hestiia restaurant mushroom stick"
      ]
    }
  },
  {
    "id": "dish-chilli-manchurian",
    "slug": "chilli-manchurian",
    "name": "Chilli Manchurian",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 219,
    "isVeg": true,
    "description": "Crispy and flavourful Chilli Manchurian tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": [
      "Dry",
      "Gravy"
    ],
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Chilli Manchurian - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chilli Manchurian (₹219) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chilli manchurian Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "chilli manchurian price Kanpur",
        "Hestiia restaurant chilli manchurian"
      ]
    }
  },
  {
    "id": "dish-paneer-65",
    "slug": "paneer-65",
    "name": "Paneer 65",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 219,
    "isVeg": true,
    "description": "Wok-tossed Paneer 65 prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer 65 - Pure Veg Chinese Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer 65 (₹219) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer 65 Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "paneer 65 price Kanpur",
        "Hestiia restaurant paneer 65"
      ]
    }
  },
  {
    "id": "dish-paneer-manchurian",
    "slug": "paneer-manchurian",
    "name": "Paneer Manchurian",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 219,
    "isVeg": true,
    "description": "Crispy and flavourful Paneer Manchurian tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": [
      "Dry",
      "Gravy"
    ],
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Manchurian - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Manchurian (₹219) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer manchurian Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "paneer manchurian price Kanpur",
        "Hestiia restaurant paneer manchurian"
      ]
    }
  },
  {
    "id": "dish-veg-manchurian",
    "slug": "veg-manchurian",
    "name": "Veg Manchurian",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 219,
    "isVeg": true,
    "description": "Crispy and flavourful Veg Manchurian tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": [
      "Dry",
      "Gravy"
    ],
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/veg-manchurian.webp",
      "srcSmall": "/menu/veg-manchurian-sm.webp",
      "alt": "Glazed vegetable manchurian dumplings garnished with scallions in a dark bowl",
      "isIllustrative": true
    },
    "seo": {
      "title": "Veg Manchurian - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Manchurian (₹219) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg manchurian Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "veg manchurian price Kanpur",
        "Hestiia restaurant veg manchurian"
      ]
    },
    "detail": {
      "story": "Veg Manchurian combines minced vegetable dumplings fried to a golden crisp and tossed in a savory Indo-Chinese sauce infused with garlic, soy, and ginger. Available in both dry starter and gravy styles to accompany fried rice or noodles.",
      "ingredients": [
        "Cabbage",
        "Carrots",
        "Cornstarch",
        "Garlic",
        "Soy Sauce",
        "Spring Onions"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-veg-fried-rice",
        "dish-hakka-noodles"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-chilli-mushroom",
    "slug": "chilli-mushroom",
    "name": "Chilli Mushroom",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 219,
    "isVeg": true,
    "description": "Wok-tossed Chilli Mushroom prepared with garlic, soya sauce, and fresh seasonings at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": [
      "Dry",
      "Gravy"
    ],
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Chilli Mushroom - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chilli Mushroom (₹219) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chilli mushroom Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "chilli mushroom price Kanpur",
        "Hestiia restaurant chilli mushroom"
      ]
    }
  },
  {
    "id": "dish-paneer-stick",
    "slug": "paneer-stick",
    "name": "Paneer Stick",
    "suggestedName": null,
    "categoryId": "chinese-starters",
    "price": 275,
    "isVeg": true,
    "description": "Crispy and flavourful Paneer Stick tossed in a fiery wok with garlic, ginger, and Indo-Chinese sauces. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Stick - Pure Veg Chinese Starters in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Stick (₹275) in Chinese Starters at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer stick Kanpur",
        "pure veg chinese starters Shyam Nagar",
        "paneer stick price Kanpur",
        "Hestiia restaurant paneer stick"
      ]
    }
  },
  {
    "id": "dish-veg-fried-rice",
    "slug": "veg-fried-rice",
    "name": "Veg Fried Rice",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 165,
    "isVeg": true,
    "description": "Fragrant Veg Fried Rice stir-fried over high heat with crisp julienned vegetables and light soy seasonings. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Fried Rice - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Fried Rice (₹165) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg fried rice Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "veg fried rice price Kanpur",
        "Hestiia restaurant veg fried rice"
      ]
    }
  },
  {
    "id": "dish-hakka-noodles",
    "slug": "hakka-noodles",
    "name": "Hakka Noodles",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 165,
    "isVeg": true,
    "description": "Aromatic wok-tossed Hakka Noodles stir-fried with garden vegetables and light seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/hakka-noodles.webp",
      "srcSmall": "/menu/hakka-noodles-sm.webp",
      "alt": "Wok-tossed Hakka noodles with julienned vegetables and spring onions",
      "isIllustrative": true
    },
    "seo": {
      "title": "Hakka Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hakka Noodles (₹165) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hakka noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "hakka noodles price Kanpur",
        "Hestiia restaurant hakka noodles"
      ]
    },
    "detail": {
      "story": "Hakka Noodles are wok-tossed over high flame with shredded cabbage, crunchy carrots, bell peppers, and scallions in light soy and garlic oils. The delicate smokiness and tender noodle texture deliver a satisfying Indo-Chinese experience that pairs seamlessly with spicy Manchurian gravies.",
      "ingredients": [
        "Wheat Noodles",
        "Cabbage",
        "Carrots",
        "Bell Peppers",
        "Spring Onions",
        "Soy Sauce",
        "Garlic"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-veg-manchurian",
        "dish-honey-chilli-potato"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-garlic-fried-rice",
    "slug": "garlic-fried-rice",
    "name": "Garlic Fried Rice",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 175,
    "isVeg": true,
    "description": "Fragrant Garlic Fried Rice stir-fried over high heat with crisp julienned vegetables and light soy seasonings.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Garlic Fried Rice - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Garlic Fried Rice (₹175) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "garlic fried rice Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "garlic fried rice price Kanpur",
        "Hestiia restaurant garlic fried rice"
      ]
    }
  },
  {
    "id": "dish-schezwan-fried-rice",
    "slug": "schezwan-fried-rice",
    "name": "Schezwan Fried Rice",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 175,
    "isVeg": true,
    "description": "Fragrant Schezwan Fried Rice stir-fried over high heat with crisp julienned vegetables and light soy seasonings.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Schezwan Fried Rice - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Schezwan Fried Rice (₹175) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "schezwan fried rice Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "schezwan fried rice price Kanpur",
        "Hestiia restaurant schezwan fried rice"
      ]
    }
  },
  {
    "id": "dish-garlic-noodles",
    "slug": "garlic-noodles",
    "name": "Garlic Noodles",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 175,
    "isVeg": true,
    "description": "Aromatic wok-tossed Garlic Noodles stir-fried with garden vegetables and light seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Garlic Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Garlic Noodles (₹175) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "garlic noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "garlic noodles price Kanpur",
        "Hestiia restaurant garlic noodles"
      ]
    }
  },
  {
    "id": "dish-schezwan-noodles",
    "slug": "schezwan-noodles",
    "name": "Schezwan Noodles",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 175,
    "isVeg": true,
    "description": "Fragrant Schezwan Noodles stir-fried over high heat with crisp julienned vegetables and light soy seasonings. Prepared fresh to order with pure vegetarian in...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Schezwan Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Schezwan Noodles (₹175) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "schezwan noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "schezwan noodles price Kanpur",
        "Hestiia restaurant schezwan noodles"
      ]
    }
  },
  {
    "id": "dish-veg-noodles",
    "slug": "veg-noodles",
    "name": "Veg Noodles",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 185,
    "isVeg": true,
    "description": "Fragrant Veg Noodles stir-fried over high heat with crisp julienned vegetables and light soy seasonings. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Noodles (₹185) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "veg noodles price Kanpur",
        "Hestiia restaurant veg noodles"
      ]
    }
  },
  {
    "id": "dish-paneer-fried-rice",
    "slug": "paneer-fried-rice",
    "name": "Paneer Fried Rice",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 185,
    "isVeg": true,
    "description": "Aromatic wok-tossed Paneer Fried Rice stir-fried with garden vegetables and light seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Fried Rice - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Fried Rice (₹185) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer fried rice Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "paneer fried rice price Kanpur",
        "Hestiia restaurant paneer fried rice"
      ]
    }
  },
  {
    "id": "dish-paneer-noodles",
    "slug": "paneer-noodles",
    "name": "Paneer Noodles",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 185,
    "isVeg": true,
    "description": "Fragrant Paneer Noodles stir-fried over high heat with crisp julienned vegetables and light soy seasonings. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Noodles (₹185) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "paneer noodles price Kanpur",
        "Hestiia restaurant paneer noodles"
      ]
    }
  },
  {
    "id": "dish-hestia-special-noodles",
    "slug": "hestia-special-noodles",
    "name": "Hestia Special Noodles",
    "suggestedName": "Hestiia Special Noodles",
    "categoryId": "chinese-rice-noodles",
    "price": 219,
    "isVeg": true,
    "description": "Fragrant Hestia Special Noodles stir-fried over high heat with crisp julienned vegetables and light soy seasonings.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hestia Special Noodles - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hestia Special Noodles (₹219) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic t...",
      "keywords": [
        "hestia special noodles Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "hestia special noodles price Kanpur",
        "Hestiia restaurant hestia special noodles"
      ]
    }
  },
  {
    "id": "dish-hestia-special-rice",
    "slug": "hestia-special-rice",
    "name": "Hestia Special Rice",
    "suggestedName": "Hestiia Special Rice",
    "categoryId": "chinese-rice-noodles",
    "price": 219,
    "isVeg": true,
    "description": "Aromatic wok-tossed Hestia Special Rice stir-fried with garden vegetables and light seasonings in Kanpur. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hestia Special Rice - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hestia Special Rice (₹219) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hestia special rice Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "hestia special rice price Kanpur",
        "Hestiia restaurant hestia special rice"
      ]
    }
  },
  {
    "id": "dish-chinese-platter",
    "slug": "chinese-platter",
    "name": "Chinese Platter",
    "suggestedName": null,
    "categoryId": "chinese-rice-noodles",
    "price": 389,
    "isVeg": true,
    "description": "Fragrant Chinese Platter stir-fried over high heat with crisp julienned vegetables and light soy seasonings. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/chinese-platter.webp",
      "srcSmall": "/menu/chinese-platter-sm.webp",
      "alt": "Lavish vegetarian Chinese platter with noodles, fried rice, spring rolls, and manchurian",
      "isIllustrative": true
    },
    "seo": {
      "title": "Chinese Platter - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chinese Platter (₹389) in Chinese Rice & Noodles at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chinese platter Kanpur",
        "pure veg chinese rice & noodles Shyam Nagar",
        "chinese platter price Kanpur",
        "Hestiia restaurant chinese platter"
      ]
    },
    "detail": {
      "story": "The Chinese Platter brings together our most requested Indo-Chinese specialities on one generous tray. Featuring stir-fried Hakka noodles, aromatic veg fried rice, crispy spring rolls, and glazed veg Manchurian balls, it offers a complete tasting experience designed for dining together.",
      "ingredients": [
        "Hakka Noodles",
        "Fried Rice",
        "Spring Rolls",
        "Veg Manchurian",
        "Chilli Dipping Sauce"
      ],
      "servesPeople": 3,
      "pairsWith": [
        "dish-manchow",
        "dish-v-mojito"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-matar-paneer",
    "slug": "matar-paneer",
    "name": "Matar Paneer",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Matar Paneer - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Matar Paneer (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "matar paneer Kanpur",
        "pure veg paneer Shyam Nagar",
        "matar paneer price Kanpur",
        "Hestiia restaurant matar paneer"
      ]
    }
  },
  {
    "id": "dish-kadhai-paneer",
    "slug": "kadhai-paneer",
    "name": "Kadhai Paneer",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Tender cottage cheese Kadhai Paneer simmered in rich spiced gravy, served at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "paneer-special"
    ],
    "image": {
      "src": "/menu/kadhai-paneer.webp",
      "srcSmall": "/menu/kadhai-paneer-sm.webp",
      "alt": "Kadhai paneer cooked with bell peppers and roasted spices in a traditional karahi",
      "isIllustrative": true
    },
    "seo": {
      "title": "Kadhai Paneer - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Kadhai Paneer (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "kadhai paneer Kanpur",
        "pure veg paneer Shyam Nagar",
        "kadhai paneer price Kanpur",
        "Hestiia restaurant kadhai paneer"
      ]
    },
    "detail": {
      "story": "Kadhai Paneer is cooked in a traditional cast-iron wok with chunky cottage cheese, crunchy green capsicum, and whole ground kadhai spices in a rustic onion-tomato gravy. It delivers bold aromatics and satisfying texture in every spoonful.",
      "ingredients": [
        "Fresh Paneer",
        "Bell Peppers",
        "Tomatoes",
        "Coriander Seeds",
        "Kadhai Masala",
        "Ginger"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-laccha-paratha",
        "dish-butter-naan"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-handi-paneer",
    "slug": "handi-paneer",
    "name": "Handi Paneer",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Handi Paneer - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Handi Paneer (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "handi paneer Kanpur",
        "pure veg paneer Shyam Nagar",
        "handi paneer price Kanpur",
        "Hestiia restaurant handi paneer"
      ]
    }
  },
  {
    "id": "dish-paneer-koftahani",
    "slug": "paneer-koftahani",
    "name": "Paneer Koftahani",
    "suggestedName": "Paneer Kofta Handi",
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Koftahani - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Koftahani (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer koftahani Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer koftahani price Kanpur",
        "Hestiia restaurant paneer koftahani"
      ]
    }
  },
  {
    "id": "dish-paneer-rajdhani",
    "slug": "paneer-rajdhani",
    "name": "Paneer Rajdhani",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Tender cottage cheese Paneer Rajdhani simmered in rich spiced gravy, served at Hestiia in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Rajdhani - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Rajdhani (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer rajdhani Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer rajdhani price Kanpur",
        "Hestiia restaurant paneer rajdhani"
      ]
    }
  },
  {
    "id": "dish-paneer-jodhpuri",
    "slug": "paneer-jodhpuri",
    "name": "Paneer Jodhpuri",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Jodhpuri - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Jodhpuri (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer jodhpuri Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer jodhpuri price Kanpur",
        "Hestiia restaurant paneer jodhpuri"
      ]
    }
  },
  {
    "id": "dish-paneer-bhujji",
    "slug": "paneer-bhujji",
    "name": "Paneer Bhujji",
    "suggestedName": "Paneer Bhurji",
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Bhujji - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Bhujji (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer bhujji Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer bhujji price Kanpur",
        "Hestiia restaurant paneer bhujji"
      ]
    }
  },
  {
    "id": "dish-palak-paneer",
    "slug": "palak-paneer",
    "name": "Palak Paneer",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Tender cottage cheese Palak Paneer simmered in rich spiced gravy, served at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Palak Paneer - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Palak Paneer (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "palak paneer Kanpur",
        "pure veg paneer Shyam Nagar",
        "palak paneer price Kanpur",
        "Hestiia restaurant palak paneer"
      ]
    }
  },
  {
    "id": "dish-paneer-ragan-josh",
    "slug": "paneer-ragan-josh",
    "name": "Paneer Ragan Josh",
    "suggestedName": "Paneer Rogan Josh",
    "categoryId": "paneer",
    "price": 275,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Ragan Josh - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Ragan Josh (₹275) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer ragan josh Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer ragan josh price Kanpur",
        "Hestiia restaurant paneer ragan josh"
      ]
    }
  },
  {
    "id": "dish-paneer-butter-masala",
    "slug": "paneer-butter-masala",
    "name": "Paneer Butter Masala",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 285,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "paneer-special"
    ],
    "image": {
      "src": "/menu/paneer-butter-masala.webp",
      "srcSmall": "/menu/paneer-butter-masala-sm.webp",
      "alt": "Paneer butter masala in a copper bowl with a butter swirl",
      "isIllustrative": true
    },
    "seo": {
      "title": "Paneer Butter Masala - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Butter Masala (₹285) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer butter masala Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer butter masala price Kanpur",
        "Hestiia restaurant paneer butter masala"
      ]
    },
    "detail": {
      "story": "Paneer Butter Masala highlights tender cottage cheese cubes bathed in a creamy tomato gravy enriched with butter and mild ground spices. Its smooth, mildly sweet profile makes it a perennial favourite at Indian dining tables. Best relished alongside warm tandoori roti or fragrant jeera rice.",
      "ingredients": [
        "Fresh Paneer",
        "Tomatoes",
        "Butter",
        "Cashew Paste",
        "Fresh Cream",
        "Kasturi Methi"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-garlic-naan",
        "dish-veg-pulao"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-paneer-makhmali",
    "slug": "paneer-makhmali",
    "name": "Paneer Makhmali",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 285,
    "isVeg": true,
    "description": "Tender cottage cheese Paneer Makhmali simmered in rich spiced gravy, served at Hestiia in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Makhmali - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Makhmali (₹285) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer makhmali Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer makhmali price Kanpur",
        "Hestiia restaurant paneer makhmali"
      ]
    }
  },
  {
    "id": "dish-paneer-lababdar",
    "slug": "paneer-lababdar",
    "name": "Paneer Lababdar",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 309,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Lababdar - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Lababdar (₹309) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer lababdar Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer lababdar price Kanpur",
        "Hestiia restaurant paneer lababdar"
      ]
    }
  },
  {
    "id": "dish-paneer-tikka-masala",
    "slug": "paneer-tikka-masala",
    "name": "Paneer Tikka Masala",
    "suggestedName": null,
    "categoryId": "paneer",
    "price": 309,
    "isVeg": true,
    "description": "Succulent cottage cheese cubes simmered in our signature spiced North Indian gravy. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Tikka Masala - Pure Veg Paneer in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Tikka Masala (₹309) in Paneer at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer tikka masala Kanpur",
        "pure veg paneer Shyam Nagar",
        "paneer tikka masala price Kanpur",
        "Hestiia restaurant paneer tikka masala"
      ]
    }
  },
  {
    "id": "dish-pindi-chana-dry",
    "slug": "pindi-chana-dry",
    "name": "Pindi Chana Dry",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 169,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Pindi Chana Dry slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Pindi Chana Dry - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Pindi Chana Dry (₹169) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "pindi chana dry Kanpur",
        "pure veg veg main course Shyam Nagar",
        "pindi chana dry price Kanpur",
        "Hestiia restaurant pindi chana dry"
      ]
    }
  },
  {
    "id": "dish-punjabi-chole",
    "slug": "punjabi-chole",
    "name": "Punjabi Chole",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 169,
    "isVeg": true,
    "description": "Traditional pure vegetarian Punjabi Chole prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Punjabi Chole - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Punjabi Chole (₹169) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "punjabi chole Kanpur",
        "pure veg veg main course Shyam Nagar",
        "punjabi chole price Kanpur",
        "Hestiia restaurant punjabi chole"
      ]
    }
  },
  {
    "id": "dish-aloo-matar-dry",
    "slug": "aloo-matar-dry",
    "name": "Aloo Matar Dry",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 169,
    "isVeg": true,
    "description": "Traditional pure vegetarian Aloo Matar Dry prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Aloo Matar Dry - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Aloo Matar Dry (₹169) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "aloo matar dry Kanpur",
        "pure veg veg main course Shyam Nagar",
        "aloo matar dry price Kanpur",
        "Hestiia restaurant aloo matar dry"
      ]
    }
  },
  {
    "id": "dish-jeera-aloo",
    "slug": "jeera-aloo",
    "name": "Jeera Aloo",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 175,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Jeera Aloo slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Jeera Aloo - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Jeera Aloo (₹175) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "jeera aloo Kanpur",
        "pure veg veg main course Shyam Nagar",
        "jeera aloo price Kanpur",
        "Hestiia restaurant jeera aloo"
      ]
    }
  },
  {
    "id": "dish-dum-aloo",
    "slug": "dum-aloo",
    "name": "Dum Aloo",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 219,
    "isVeg": true,
    "description": "Traditional pure vegetarian Dum Aloo prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Dum Aloo - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dum Aloo (₹219) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "dum aloo Kanpur",
        "pure veg veg main course Shyam Nagar",
        "dum aloo price Kanpur",
        "Hestiia restaurant dum aloo"
      ]
    }
  },
  {
    "id": "dish-kashmiri-dum-aloo",
    "slug": "kashmiri-dum-aloo",
    "name": "Kashmiri Dum Aloo",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 219,
    "isVeg": true,
    "description": "Traditional pure vegetarian Kashmiri Dum Aloo prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Kashmiri Dum Aloo - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Kashmiri Dum Aloo (₹219) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "kashmiri dum aloo Kanpur",
        "pure veg veg main course Shyam Nagar",
        "kashmiri dum aloo price Kanpur",
        "Hestiia restaurant kashmiri dum aloo"
      ]
    }
  },
  {
    "id": "dish-veg-jal-frezi",
    "slug": "veg-jal-frezi",
    "name": "Veg Jal Frezi",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 229,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Veg Jal Frezi slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Jal Frezi - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Jal Frezi (₹229) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg jal frezi Kanpur",
        "pure veg veg main course Shyam Nagar",
        "veg jal frezi price Kanpur",
        "Hestiia restaurant veg jal frezi"
      ]
    }
  },
  {
    "id": "dish-bhojpuri-dum-aloo",
    "slug": "bhojpuri-dum-aloo",
    "name": "Bhojpuri Dum Aloo",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 239,
    "isVeg": true,
    "description": "Traditional pure vegetarian Bhojpuri Dum Aloo prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Bhojpuri Dum Aloo - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Bhojpuri Dum Aloo (₹239) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "bhojpuri dum aloo Kanpur",
        "pure veg veg main course Shyam Nagar",
        "bhojpuri dum aloo price Kanpur",
        "Hestiia restaurant bhojpuri dum aloo"
      ]
    }
  },
  {
    "id": "dish-banarsi-dum-aloo",
    "slug": "banarsi-dum-aloo",
    "name": "Banarsi Dum Aloo",
    "suggestedName": "Banarasi Dum Aloo",
    "categoryId": "veg-main-course",
    "price": 239,
    "isVeg": true,
    "description": "Traditional pure vegetarian Banarsi Dum Aloo prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Banarsi Dum Aloo - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Banarsi Dum Aloo (₹239) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "banarsi dum aloo Kanpur",
        "pure veg veg main course Shyam Nagar",
        "banarsi dum aloo price Kanpur",
        "Hestiia restaurant banarsi dum aloo"
      ]
    }
  },
  {
    "id": "dish-mushroom-butter-masala",
    "slug": "mushroom-butter-masala",
    "name": "Mushroom Butter Masala",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Mushroom Butter Masala slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/mushroom-butter-masala.webp",
      "srcSmall": "/menu/mushroom-butter-masala-sm.webp",
      "alt": "Tender button mushrooms simmered in creamy butter masala gravy in a copper bowl",
      "isIllustrative": true
    },
    "seo": {
      "title": "Mushroom Butter Masala - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mushroom Butter Masala (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mushroom butter masala Kanpur",
        "pure veg veg main course Shyam Nagar",
        "mushroom butter masala price Kanpur",
        "Hestiia restaurant mushroom butter masala"
      ]
    },
    "detail": {
      "story": "Mushroom Butter Masala features plump button mushrooms gently cooked in a luxurious, creamy butter and cashew-infused gravy. Mildly spiced and naturally earthy, this vegetarian speciality pairs delightfully with hot tandoori breads.",
      "ingredients": [
        "Button Mushrooms",
        "Butter",
        "Cashew Cream",
        "Tomatoes",
        "Garam Masala",
        "Kasturi Methi"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-garlic-naan",
        "dish-jeera-rice"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-mushroom-do-pyaza",
    "slug": "mushroom-do-pyaza",
    "name": "Mushroom Do Pyaza",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Traditional pure vegetarian Mushroom Do Pyaza prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Mushroom Do Pyaza - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mushroom Do Pyaza (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mushroom do pyaza Kanpur",
        "pure veg veg main course Shyam Nagar",
        "mushroom do pyaza price Kanpur",
        "Hestiia restaurant mushroom do pyaza"
      ]
    }
  },
  {
    "id": "dish-matar-mushroom",
    "slug": "matar-mushroom",
    "name": "Matar Mushroom",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Traditional pure vegetarian Matar Mushroom prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Matar Mushroom - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Matar Mushroom (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "matar mushroom Kanpur",
        "pure veg veg main course Shyam Nagar",
        "matar mushroom price Kanpur",
        "Hestiia restaurant matar mushroom"
      ]
    }
  },
  {
    "id": "dish-handi-mushroom",
    "slug": "handi-mushroom",
    "name": "Handi Mushroom",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Handi Mushroom slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian in...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Handi Mushroom - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Handi Mushroom (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "handi mushroom Kanpur",
        "pure veg veg main course Shyam Nagar",
        "handi mushroom price Kanpur",
        "Hestiia restaurant handi mushroom"
      ]
    }
  },
  {
    "id": "dish-mushroom-rogan-josh",
    "slug": "mushroom-rogan-josh",
    "name": "Mushroom Rogan Josh",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Traditional pure vegetarian Mushroom Rogan Josh prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Mushroom Rogan Josh - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mushroom Rogan Josh (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mushroom rogan josh Kanpur",
        "pure veg veg main course Shyam Nagar",
        "mushroom rogan josh price Kanpur",
        "Hestiia restaurant mushroom rogan josh"
      ]
    }
  },
  {
    "id": "dish-mix-veg",
    "slug": "mix-veg",
    "name": "Mix Veg",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 275,
    "isVeg": true,
    "description": "Traditional pure vegetarian Mix Veg prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/mix-veg.webp",
      "srcSmall": "/menu/mix-veg-sm.webp",
      "alt": "Colourful seasonal mixed vegetable curry cooked with cumin and Indian spices",
      "isIllustrative": true
    },
    "seo": {
      "title": "Mix Veg - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mix Veg (₹275) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mix veg Kanpur",
        "pure veg veg main course Shyam Nagar",
        "mix veg price Kanpur",
        "Hestiia restaurant mix veg"
      ]
    },
    "detail": {
      "story": "Mix Veg is a colourful melange of seasonal garden vegetables including cauliflower, carrots, green beans, and peas, sautéed with cumin and warm North Indian spices. A timeless vegetarian staple that complements any dal and rice spread.",
      "ingredients": [
        "Cauliflower",
        "Carrots",
        "Green Beans",
        "Green Peas",
        "Tomatoes",
        "Cumin"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-dal-tadka",
        "dish-butter-roti"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-chaap-butter-masala",
    "slug": "chaap-butter-masala",
    "name": "Chaap Butter Masala",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 275,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Chaap Butter Masala slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Chaap Butter Masala - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chaap Butter Masala (₹275) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chaap butter masala Kanpur",
        "pure veg veg main course Shyam Nagar",
        "chaap butter masala price Kanpur",
        "Hestiia restaurant chaap butter masala"
      ]
    }
  },
  {
    "id": "dish-chaap-tikka-masala",
    "slug": "chaap-tikka-masala",
    "name": "Chaap Tikka Masala",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 285,
    "isVeg": true,
    "description": "Traditional pure vegetarian Chaap Tikka Masala prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingre...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Chaap Tikka Masala - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chaap Tikka Masala (₹285) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chaap tikka masala Kanpur",
        "pure veg veg main course Shyam Nagar",
        "chaap tikka masala price Kanpur",
        "Hestiia restaurant chaap tikka masala"
      ]
    }
  },
  {
    "id": "dish-baked-veg",
    "slug": "baked-veg",
    "name": "Baked Veg",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 299,
    "isVeg": true,
    "description": "Traditional pure vegetarian Baked Veg prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Baked Veg - Pure Veg Veg Main Course in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Baked Veg (₹299) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "baked veg Kanpur",
        "pure veg veg main course Shyam Nagar",
        "baked veg price Kanpur",
        "Hestiia restaurant baked veg"
      ]
    }
  },
  {
    "id": "dish-spinach-corn-baked",
    "slug": "spinach-corn-baked",
    "name": "Spinach Corn Baked",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 309,
    "isVeg": true,
    "description": "Homestyle pure vegetarian Spinach Corn Baked slow-cooked with North Indian spices, served in Shyam Nagar, Kanpur.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Spinach Corn Baked - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Spinach Corn Baked (₹309) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "spinach corn baked Kanpur",
        "pure veg veg main course Shyam Nagar",
        "spinach corn baked price Kanpur",
        "Hestiia restaurant spinach corn baked"
      ]
    }
  },
  {
    "id": "dish-saute-vegetable",
    "slug": "saute-vegetable",
    "name": "Saute Vegetable",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 219,
    "isVeg": true,
    "description": "Traditional pure vegetarian Saute Vegetable prepared with wholesome vegetables and slow-cooked gravies. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Saute Vegetable - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Saute Vegetable (₹219) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "saute vegetable Kanpur",
        "pure veg veg main course Shyam Nagar",
        "saute vegetable price Kanpur",
        "Hestiia restaurant saute vegetable"
      ]
    }
  },
  {
    "id": "dish-grilled-paneer-lemon-butter-sauce",
    "slug": "grilled-paneer-lemon-butter-sauce",
    "name": "Grilled Paneer Lemon Butter Sauce",
    "suggestedName": null,
    "categoryId": "veg-main-course",
    "price": 249,
    "isVeg": true,
    "description": "Traditional pure vegetarian Grilled Paneer Lemon Butter Sauce prepared with wholesome vegetables and slow-cooked gravies.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Grilled Paneer Lemon Butter Sauce | Hestiia Kanpur",
      "metaDescription": "Enjoy pure vegetarian Grilled Paneer Lemon Butter Sauce (₹249) in Veg Main Course at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authent...",
      "keywords": [
        "grilled paneer lemon butter sauce Kanpur",
        "pure veg veg main course Shyam Nagar",
        "grilled paneer lemon butter sauce price Kanpur",
        "Hestiia restaurant grilled paneer lemon butter sauce"
      ]
    }
  },
  {
    "id": "dish-dal-fry",
    "slug": "dal-fry",
    "name": "Dal Fry",
    "suggestedName": null,
    "categoryId": "dal",
    "price": 189,
    "isVeg": true,
    "description": "Slow-simmered Dal Fry finished with aromatic spices, served fresh at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Dal Fry - Pure Veg Dal in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dal Fry (₹189) in Dal at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "dal fry Kanpur",
        "pure veg dal Shyam Nagar",
        "dal fry price Kanpur",
        "Hestiia restaurant dal fry"
      ]
    }
  },
  {
    "id": "dish-dal-bukhara",
    "slug": "dal-bukhara",
    "name": "Dal Bukhara",
    "suggestedName": null,
    "categoryId": "dal",
    "price": 209,
    "isVeg": true,
    "description": "Hearty and comforting Dal Bukhara slow-simmered with traditional spices and fragrant tempering. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Dal Bukhara - Pure Veg Dal in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dal Bukhara (₹209) in Dal at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "dal bukhara Kanpur",
        "pure veg dal Shyam Nagar",
        "dal bukhara price Kanpur",
        "Hestiia restaurant dal bukhara"
      ]
    }
  },
  {
    "id": "dish-dal-tadka",
    "slug": "dal-tadka",
    "name": "Dal Tadka",
    "suggestedName": null,
    "categoryId": "dal",
    "price": 199,
    "isVeg": true,
    "description": "Hearty and comforting Dal Tadka slow-simmered with traditional spices and fragrant tempering. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Dal Tadka - Pure Veg Dal in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dal Tadka (₹199) in Dal at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "dal tadka Kanpur",
        "pure veg dal Shyam Nagar",
        "dal tadka price Kanpur",
        "Hestiia restaurant dal tadka"
      ]
    }
  },
  {
    "id": "dish-dal-makhani",
    "slug": "dal-makhani",
    "name": "Dal Makhani",
    "suggestedName": null,
    "categoryId": "dal",
    "price": 229,
    "isVeg": true,
    "description": "Slow-simmered Dal Makhani finished with aromatic spices, served fresh at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/dal-makhani.webp",
      "srcSmall": "/menu/dal-makhani-sm.webp",
      "alt": "Slow-simmered black dal makhani with fresh cream swirl in a copper bowl",
      "isIllustrative": true
    },
    "seo": {
      "title": "Dal Makhani - Pure Veg Dal in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Dal Makhani (₹229) in Dal at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "dal makhani Kanpur",
        "pure veg dal Shyam Nagar",
        "dal makhani price Kanpur",
        "Hestiia restaurant dal makhani"
      ]
    },
    "detail": {
      "story": "Dal Makhani is a beloved North Indian classic, slow-simmered over low heat with whole black lentils, butter, and mild spices. This dish develops a velvety texture and deep, comforting aroma. Pair it with butter naan or steamed basmati rice for a satisfying, wholesome family dinner.",
      "ingredients": [
        "Black Lentils (Urad)",
        "Kidney Beans (Rajma)",
        "Butter",
        "Fresh Cream",
        "Ginger-Garlic",
        "Aromatic Spices"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-garlic-naan",
        "dish-jeera-rice"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-steam-rice",
    "slug": "steam-rice",
    "name": "Steam Rice",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 129,
    "isVeg": true,
    "description": "Fluffy long-grain basmati Steam Rice gently cooked with whole spices, herbs, and mild aromatics. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Steam Rice - Pure Veg Rice & Biryani in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Steam Rice (₹129) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "steam rice Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "steam rice price Kanpur",
        "Hestiia restaurant steam rice"
      ]
    }
  },
  {
    "id": "dish-jeera-rice",
    "slug": "jeera-rice",
    "name": "Jeera Rice",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 139,
    "isVeg": true,
    "description": "Fluffy long-grain basmati Jeera Rice gently cooked with whole spices, herbs, and mild aromatics. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Jeera Rice - Pure Veg Rice & Biryani in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Jeera Rice (₹139) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "jeera rice Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "jeera rice price Kanpur",
        "Hestiia restaurant jeera rice"
      ]
    }
  },
  {
    "id": "dish-veg-pulao",
    "slug": "veg-pulao",
    "name": "Veg Pulao",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 139,
    "isVeg": true,
    "description": "Fragrant basmati Veg Pulao infused with aromatic whole spices, served fresh at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Pulao - Pure Veg Rice & Biryani in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Pulao (₹139) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg pulao Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "veg pulao price Kanpur",
        "Hestiia restaurant veg pulao"
      ]
    }
  },
  {
    "id": "dish-peas-rice",
    "slug": "peas-rice",
    "name": "Peas Rice",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 139,
    "isVeg": true,
    "description": "Fluffy long-grain basmati Peas Rice gently cooked with whole spices, herbs, and mild aromatics. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Peas Rice - Pure Veg Rice & Biryani in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Peas Rice (₹139) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "peas rice Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "peas rice price Kanpur",
        "Hestiia restaurant peas rice"
      ]
    }
  },
  {
    "id": "dish-veg-biryani",
    "slug": "veg-biryani",
    "name": "Veg Biryani",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 189,
    "isVeg": true,
    "description": "Fluffy long-grain basmati Veg Biryani gently cooked with whole spices, herbs, and mild aromatics. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/veg-biryani.webp",
      "srcSmall": "/menu/veg-biryani-sm.webp",
      "alt": "Fragrant basmati veg biryani in an ornate copper handi with mint and fried onions",
      "isIllustrative": true
    },
    "seo": {
      "title": "Veg Biryani - Pure Veg Rice & Biryani in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Biryani (₹189) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg biryani Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "veg biryani price Kanpur",
        "Hestiia restaurant veg biryani"
      ]
    },
    "detail": {
      "story": "Veg Biryani brings together aged long-grain basmati rice and garden-fresh vegetables layered with saffron, mint, and whole spices in the dum style. Each spoonful releases warm aromas of cardamom and caramelized onions. Enjoy it with a bowl of chilled vegetable raita for a complete meal.",
      "ingredients": [
        "Basmati Rice",
        "Carrots",
        "Green Beans",
        "Green Peas",
        "Saffron",
        "Fried Onions",
        "Whole Spices"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-mix-veg-raita",
        "dish-dal-tadka"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-hydabadi-biryani",
    "slug": "hydabadi-biryani",
    "name": "Hydabadi Biryani",
    "suggestedName": "Hyderabadi Biryani",
    "categoryId": "rice-biryani",
    "price": 209,
    "isVeg": true,
    "description": "Fragrant basmati Hydabadi Biryani infused with aromatic whole spices, served fresh at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredi...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hydabadi Biryani - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hydabadi Biryani (₹209) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hydabadi biryani Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "hydabadi biryani price Kanpur",
        "Hestiia restaurant hydabadi biryani"
      ]
    }
  },
  {
    "id": "dish-chaap-tikka-biryani",
    "slug": "chaap-tikka-biryani",
    "name": "Chaap Tikka Biryani",
    "suggestedName": null,
    "categoryId": "rice-biryani",
    "price": 239,
    "isVeg": true,
    "description": "Fluffy long-grain basmati Chaap Tikka Biryani gently cooked with whole spices, herbs, and mild aromatics. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Chaap Tikka Biryani - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chaap Tikka Biryani (₹239) in Rice & Biryani at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chaap tikka biryani Kanpur",
        "pure veg rice & biryani Shyam Nagar",
        "chaap tikka biryani price Kanpur",
        "Hestiia restaurant chaap tikka biryani"
      ]
    }
  },
  {
    "id": "dish-plain-roti",
    "slug": "plain-roti",
    "name": "Plain Roti",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 30,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Plain Roti baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Plain Roti - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Plain Roti (₹30) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "plain roti Kanpur",
        "pure veg breads Shyam Nagar",
        "plain roti price Kanpur",
        "Hestiia restaurant plain roti"
      ]
    }
  },
  {
    "id": "dish-butter-roti",
    "slug": "butter-roti",
    "name": "Butter Roti",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 35,
    "isVeg": true,
    "description": "Freshly baked clay oven Butter Roti served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Butter Roti - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Butter Roti (₹35) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "butter roti Kanpur",
        "pure veg breads Shyam Nagar",
        "butter roti price Kanpur",
        "Hestiia restaurant butter roti"
      ]
    }
  },
  {
    "id": "dish-plain-naan",
    "slug": "plain-naan",
    "name": "Plain Naan",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 40,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Plain Naan baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Plain Naan - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Plain Naan (₹40) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "plain naan Kanpur",
        "pure veg breads Shyam Nagar",
        "plain naan price Kanpur",
        "Hestiia restaurant plain naan"
      ]
    }
  },
  {
    "id": "dish-garlic-naan",
    "slug": "garlic-naan",
    "name": "Garlic Naan",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 45,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Garlic Naan baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "budget-friendly",
      "tandoori"
    ],
    "image": {
      "src": "/menu/garlic-naan.webp",
      "srcSmall": "/menu/garlic-naan-sm.webp",
      "alt": "Freshly baked tandoori garlic naan brushed with melted butter and minced garlic",
      "isIllustrative": true
    },
    "seo": {
      "title": "Garlic Naan - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Garlic Naan (₹45) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "garlic naan Kanpur",
        "pure veg breads Shyam Nagar",
        "garlic naan price Kanpur",
        "Hestiia restaurant garlic naan"
      ]
    },
    "detail": {
      "story": "Garlic Naan is hand-stretched leavened flatbread sprinkled generously with minced fresh garlic and coriander, slapped onto the inner clay walls of the tandoor and brushed with melted butter. Its smoky aroma elevates every curry.",
      "ingredients": [
        "Refined Flour (Maida)",
        "Minced Garlic",
        "Butter",
        "Fresh Coriander",
        "Milk"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-dal-makhani",
        "dish-paneer-butter-masala"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-laccha-paratha",
    "slug": "laccha-paratha",
    "name": "Laccha Paratha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 45,
    "isVeg": true,
    "description": "Freshly baked clay oven Laccha Paratha served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Laccha Paratha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Laccha Paratha (₹45) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "laccha paratha Kanpur",
        "pure veg breads Shyam Nagar",
        "laccha paratha price Kanpur",
        "Hestiia restaurant laccha paratha"
      ]
    }
  },
  {
    "id": "dish-mirchi-paratha",
    "slug": "mirchi-paratha",
    "name": "Mirchi Paratha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 45,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Mirchi Paratha baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Mirchi Paratha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mirchi Paratha (₹45) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "mirchi paratha Kanpur",
        "pure veg breads Shyam Nagar",
        "mirchi paratha price Kanpur",
        "Hestiia restaurant mirchi paratha"
      ]
    }
  },
  {
    "id": "dish-pudina-paratha",
    "slug": "pudina-paratha",
    "name": "Pudina Paratha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 45,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Pudina Paratha baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Pudina Paratha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Pudina Paratha (₹45) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "pudina paratha Kanpur",
        "pure veg breads Shyam Nagar",
        "pudina paratha price Kanpur",
        "Hestiia restaurant pudina paratha"
      ]
    }
  },
  {
    "id": "dish-missi-roti",
    "slug": "missi-roti",
    "name": "Missi Roti",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 45,
    "isVeg": true,
    "description": "Freshly baked clay oven Missi Roti served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Missi Roti - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Missi Roti (₹45) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "missi roti Kanpur",
        "pure veg breads Shyam Nagar",
        "missi roti price Kanpur",
        "Hestiia restaurant missi roti"
      ]
    }
  },
  {
    "id": "dish-aloo-kulcha",
    "slug": "aloo-kulcha",
    "name": "Aloo Kulcha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 55,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Aloo Kulcha baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Aloo Kulcha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Aloo Kulcha (₹55) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "aloo kulcha Kanpur",
        "pure veg breads Shyam Nagar",
        "aloo kulcha price Kanpur",
        "Hestiia restaurant aloo kulcha"
      ]
    }
  },
  {
    "id": "dish-onion-kulcha",
    "slug": "onion-kulcha",
    "name": "Onion Kulcha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 55,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Onion Kulcha baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Onion Kulcha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Onion Kulcha (₹55) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "onion kulcha Kanpur",
        "pure veg breads Shyam Nagar",
        "onion kulcha price Kanpur",
        "Hestiia restaurant onion kulcha"
      ]
    }
  },
  {
    "id": "dish-mix-kulcha",
    "slug": "mix-kulcha",
    "name": "Mix Kulcha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 65,
    "isVeg": true,
    "description": "Freshly baked clay oven Mix Kulcha served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Mix Kulcha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mix Kulcha (₹65) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "mix kulcha Kanpur",
        "pure veg breads Shyam Nagar",
        "mix kulcha price Kanpur",
        "Hestiia restaurant mix kulcha"
      ]
    }
  },
  {
    "id": "dish-butter-naan",
    "slug": "butter-naan",
    "name": "Butter Naan",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 60,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Butter Naan baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Butter Naan - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Butter Naan (₹60) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "butter naan Kanpur",
        "pure veg breads Shyam Nagar",
        "butter naan price Kanpur",
        "Hestiia restaurant butter naan"
      ]
    }
  },
  {
    "id": "dish-paneer-kulcha",
    "slug": "paneer-kulcha",
    "name": "Paneer Kulcha",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 75,
    "isVeg": true,
    "description": "Warm, freshly prepared tandoori Paneer Kulcha baked to order in the traditional clay oven. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Kulcha - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Kulcha (₹75) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "paneer kulcha Kanpur",
        "pure veg breads Shyam Nagar",
        "paneer kulcha price Kanpur",
        "Hestiia restaurant paneer kulcha"
      ]
    }
  },
  {
    "id": "dish-cheese-naan",
    "slug": "cheese-naan",
    "name": "Cheese Naan",
    "suggestedName": null,
    "categoryId": "breads",
    "price": 70,
    "isVeg": true,
    "description": "Freshly baked clay oven Cheese Naan served warm from the tandoor at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Naan - Pure Veg Breads in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Naan (₹70) in Breads at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cheese naan Kanpur",
        "pure veg breads Shyam Nagar",
        "cheese naan price Kanpur",
        "Hestiia restaurant cheese naan"
      ]
    }
  },
  {
    "id": "dish-mushroom-tikka",
    "slug": "mushroom-tikka",
    "name": "Mushroom Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 219,
    "isVeg": true,
    "description": "Succulent Mushroom Tikka marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Mushroom Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mushroom Tikka (₹219) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mushroom tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "mushroom tikka price Kanpur",
        "Hestiia restaurant mushroom tikka"
      ]
    }
  },
  {
    "id": "dish-soya-malai-chaap",
    "slug": "soya-malai-chaap",
    "name": "Soya Malai Chaap",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 219,
    "isVeg": true,
    "description": "Succulent Soya Malai Chaap marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Soya Malai Chaap - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Soya Malai Chaap (₹219) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "soya malai chaap Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "soya malai chaap price Kanpur",
        "Hestiia restaurant soya malai chaap"
      ]
    }
  },
  {
    "id": "dish-soya-aloo-kalimirch",
    "slug": "soya-aloo-kalimirch",
    "name": "Soya Aloo Kalimirch",
    "suggestedName": "Soya Aloo Kali Mirch",
    "categoryId": "tandoori-specials",
    "price": 219,
    "isVeg": true,
    "description": "Charcoal-grilled Soya Aloo Kalimirch roasted with aromatic marinades, served hot at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Soya Aloo Kalimirch - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Soya Aloo Kalimirch (₹219) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "soya aloo kalimirch Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "soya aloo kalimirch price Kanpur",
        "Hestiia restaurant soya aloo kalimirch"
      ]
    }
  },
  {
    "id": "dish-paneer-tikka",
    "slug": "paneer-tikka",
    "name": "Paneer Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 239,
    "isVeg": true,
    "description": "Succulent Paneer Tikka marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "paneer-special",
      "tandoori"
    ],
    "image": {
      "src": "/menu/paneer-tikka.webp",
      "srcSmall": "/menu/paneer-tikka-sm.webp",
      "alt": "Charcoal grilled paneer tikka with charred edges and bell peppers on a dark platter",
      "isIllustrative": true
    },
    "seo": {
      "title": "Paneer Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Tikka (₹239) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "paneer tikka price Kanpur",
        "Hestiia restaurant paneer tikka"
      ]
    },
    "detail": {
      "story": "Paneer Tikka features thick, fresh cottage cheese cubes marinated in spiced yogurt, mustard oil, and carom seeds, skewered with bell peppers and roasted in a traditional clay tandoor. The smoky exterior and succulent interior create a classic starter for every vegetarian feast.",
      "ingredients": [
        "Fresh Paneer",
        "Hung Curd",
        "Mustard Oil",
        "Bell Peppers",
        "Onions",
        "Tandoori Masala"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-v-mojito",
        "dish-mix-veg-raita"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-soya-angara-tikka",
    "slug": "soya-angara-tikka",
    "name": "Soya Angara Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 239,
    "isVeg": true,
    "description": "Succulent Soya Angara Tikka marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 2,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Soya Angara Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Soya Angara Tikka (₹239) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "soya angara tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "soya angara tikka price Kanpur",
        "Hestiia restaurant soya angara tikka"
      ]
    }
  },
  {
    "id": "dish-achari-paneer-tikka",
    "slug": "achari-paneer-tikka",
    "name": "Achari Paneer Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 249,
    "isVeg": true,
    "description": "Charcoal-grilled Achari Paneer Tikka roasted with aromatic marinades, served hot at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Achari Paneer Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Achari Paneer Tikka (₹249) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "achari paneer tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "achari paneer tikka price Kanpur",
        "Hestiia restaurant achari paneer tikka"
      ]
    }
  },
  {
    "id": "dish-paneer-kali-mirch-tikka",
    "slug": "paneer-kali-mirch-tikka",
    "name": "Paneer Kali Mirch Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 249,
    "isVeg": true,
    "description": "Succulent Paneer Kali Mirch Tikka marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Kali Mirch Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Kali Mirch Tikka (₹249) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer kali mirch tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "paneer kali mirch tikka price Kanpur",
        "Hestiia restaurant paneer kali mirch tikka"
      ]
    }
  },
  {
    "id": "dish-stuffed-chaap",
    "slug": "stuffed-chaap",
    "name": "Stuffed Chaap",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 249,
    "isVeg": true,
    "description": "Succulent Stuffed Chaap marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Stuffed Chaap - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Stuffed Chaap (₹249) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "stuffed chaap Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "stuffed chaap price Kanpur",
        "Hestiia restaurant stuffed chaap"
      ]
    }
  },
  {
    "id": "dish-paneer-malai-tikka",
    "slug": "paneer-malai-tikka",
    "name": "Paneer Malai Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 269,
    "isVeg": true,
    "description": "Charcoal-grilled Paneer Malai Tikka roasted with aromatic marinades, served hot at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Malai Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Malai Tikka (₹269) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer malai tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "paneer malai tikka price Kanpur",
        "Hestiia restaurant paneer malai tikka"
      ]
    }
  },
  {
    "id": "dish-mint-paneer-tikka",
    "slug": "mint-paneer-tikka",
    "name": "Mint Paneer Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 269,
    "isVeg": true,
    "description": "Succulent Mint Paneer Tikka marinated in traditional spices and roasted over glowing charcoal tandoor. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Mint Paneer Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mint Paneer Tikka (₹269) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mint paneer tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "mint paneer tikka price Kanpur",
        "Hestiia restaurant mint paneer tikka"
      ]
    }
  },
  {
    "id": "dish-stuffed-paneer-malai-tikka",
    "slug": "stuffed-paneer-malai-tikka",
    "name": "Stuffed Paneer Malai Tikka",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 269,
    "isVeg": true,
    "description": "Succulent Stuffed Paneer Malai Tikka marinated in traditional spices and roasted over glowing charcoal tandoor.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special",
      "tandoori"
    ],
    "image": null,
    "seo": {
      "title": "Stuffed Paneer Malai Tikka - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Stuffed Paneer Malai Tikka (₹269) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic ta...",
      "keywords": [
        "stuffed paneer malai tikka Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "stuffed paneer malai tikka price Kanpur",
        "Hestiia restaurant stuffed paneer malai tikka"
      ]
    }
  },
  {
    "id": "dish-tandoori-platter",
    "slug": "tandoori-platter",
    "name": "Tandoori Platter",
    "suggestedName": null,
    "categoryId": "tandoori-specials",
    "price": 389,
    "isVeg": true,
    "description": "Charcoal-grilled Tandoori Platter roasted with aromatic marinades, served hot at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "tandoori"
    ],
    "image": {
      "src": "/menu/tandoori-platter.webp",
      "srcSmall": "/menu/tandoori-platter-sm.webp",
      "alt": "Sizzling vegetarian tandoori platter with paneer tikka, mushrooms, and soya chaap",
      "isIllustrative": true
    },
    "seo": {
      "title": "Tandoori Platter - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Tandoori Platter (₹389) in Tandoori Specials at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "tandoori platter Kanpur",
        "pure veg tandoori specials Shyam Nagar",
        "tandoori platter price Kanpur",
        "Hestiia restaurant tandoori platter"
      ]
    },
    "detail": {
      "story": "The Tandoori Platter presents a sizzling assortment of clay-oven delicacies including paneer tikka, marinated tandoori mushrooms, and seasoned soya chaap. Served hot with fresh mint chutney and lemon wedges, this platter celebrates smoky tandoor craftsmanship in every bite.",
      "ingredients": [
        "Paneer Tikka",
        "Tandoori Mushroom",
        "Soya Chaap",
        "Capsicum",
        "Mint Chutney"
      ],
      "servesPeople": 3,
      "pairsWith": [
        "dish-garlic-naan",
        "dish-v-mojito"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-papad",
    "slug": "papad",
    "name": "Papad",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 35,
    "isVeg": true,
    "description": "Golden and crispy Papad prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Papad - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Papad (₹35) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "papad Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "papad price Kanpur",
        "Hestiia restaurant papad"
      ]
    }
  },
  {
    "id": "dish-masala-papad",
    "slug": "masala-papad",
    "name": "Masala Papad",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 49,
    "isVeg": true,
    "description": "Golden and crispy Masala Papad prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Masala Papad - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Masala Papad (₹49) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "masala papad Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "masala papad price Kanpur",
        "Hestiia restaurant masala papad"
      ]
    }
  },
  {
    "id": "dish-french-fries",
    "slug": "french-fries",
    "name": "French Fries",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 89,
    "isVeg": true,
    "description": "Crispy seasoned French Fries prepared fresh to accompany your meal, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "French Fries - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian French Fries (₹89) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "french fries Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "french fries price Kanpur",
        "Hestiia restaurant french fries"
      ]
    }
  },
  {
    "id": "dish-nachos",
    "slug": "nachos",
    "name": "Nachos",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 89,
    "isVeg": true,
    "description": "Golden and crispy Nachos prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Nachos - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Nachos (₹89) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "nachos Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "nachos price Kanpur",
        "Hestiia restaurant nachos"
      ]
    }
  },
  {
    "id": "dish-garlic-bread",
    "slug": "garlic-bread",
    "name": "Garlic Bread",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 89,
    "isVeg": true,
    "description": "Golden and crispy Garlic Bread prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Garlic Bread - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Garlic Bread (₹89) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "garlic bread Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "garlic bread price Kanpur",
        "Hestiia restaurant garlic bread"
      ]
    }
  },
  {
    "id": "dish-cheese-fries",
    "slug": "cheese-fries",
    "name": "Cheese Fries",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 119,
    "isVeg": true,
    "description": "Crispy seasoned Cheese Fries prepared fresh to accompany your meal, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/cheese-fries.webp",
      "srcSmall": "/menu/cheese-fries-sm.webp",
      "alt": "Golden crispy french fries smothered with rich melted cheese sauce and herbs",
      "isIllustrative": true
    },
    "seo": {
      "title": "Cheese Fries - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Fries (₹119) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese fries Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "cheese fries price Kanpur",
        "Hestiia restaurant cheese fries"
      ]
    },
    "detail": {
      "story": "Cheese Fries bring golden, crispy potato fries smothered in warm, velvety melted cheese sauce and sprinkled with mild seasoning herbs. A classic comforting snack to enjoy alongside burgers or during casual get-togethers.",
      "ingredients": [
        "Potato Fries",
        "Melted Cheese Sauce",
        "Seasoning Herbs",
        "Paprika"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-cottage-cheese-burger",
        "dish-cold-coffee"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-veg-cutlet",
    "slug": "veg-cutlet",
    "name": "Veg Cutlet",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 119,
    "isVeg": true,
    "description": "Golden and crispy Veg Cutlet prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Veg Cutlet - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Veg Cutlet (₹119) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "veg cutlet Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "veg cutlet price Kanpur",
        "Hestiia restaurant veg cutlet"
      ]
    }
  },
  {
    "id": "dish-cheese-nachos",
    "slug": "cheese-nachos",
    "name": "Cheese Nachos",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 129,
    "isVeg": true,
    "description": "Golden and crispy Cheese Nachos prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Nachos - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Nachos (₹129) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese nachos Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "cheese nachos price Kanpur",
        "Hestiia restaurant cheese nachos"
      ]
    }
  },
  {
    "id": "dish-paneer-pakoda",
    "slug": "paneer-pakoda",
    "name": "Paneer Pakoda",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 129,
    "isVeg": true,
    "description": "Crispy seasoned Paneer Pakoda prepared fresh to accompany your meal, served in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "paneer-special"
    ],
    "image": null,
    "seo": {
      "title": "Paneer Pakoda - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Paneer Pakoda (₹129) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "paneer pakoda Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "paneer pakoda price Kanpur",
        "Hestiia restaurant paneer pakoda"
      ]
    }
  },
  {
    "id": "dish-cheese-cutlet",
    "slug": "cheese-cutlet",
    "name": "Cheese Cutlet",
    "suggestedName": null,
    "categoryId": "sides-snacks",
    "price": 165,
    "isVeg": true,
    "description": "Golden and crispy Cheese Cutlet prepared fresh with seasoned spices, ideal for light evening dining. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cheese Cutlet - Pure Veg Sides & Snacks in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cheese Cutlet (₹165) in Sides & Snacks at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cheese cutlet Kanpur",
        "pure veg sides & snacks Shyam Nagar",
        "cheese cutlet price Kanpur",
        "Hestiia restaurant cheese cutlet"
      ]
    }
  },
  {
    "id": "dish-orange-juice",
    "slug": "orange-juice",
    "name": "Orange Juice",
    "suggestedName": null,
    "categoryId": "juices",
    "price": 99,
    "isVeg": true,
    "description": "Refreshing and chilled Orange Juice prepared with pure fruit extracts for a clean, natural taste. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Orange Juice - Pure Veg Juices in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Orange Juice (₹99) in Juices at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "orange juice Kanpur",
        "pure veg juices Shyam Nagar",
        "orange juice price Kanpur",
        "Hestiia restaurant orange juice"
      ]
    }
  },
  {
    "id": "dish-litchi-juice",
    "slug": "litchi-juice",
    "name": "Litchi Juice",
    "suggestedName": null,
    "categoryId": "juices",
    "price": 99,
    "isVeg": true,
    "description": "Chilled and revitalising Litchi Juice pressed from fresh fruits, served at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Litchi Juice - Pure Veg Juices in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Litchi Juice (₹99) in Juices at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "litchi juice Kanpur",
        "pure veg juices Shyam Nagar",
        "litchi juice price Kanpur",
        "Hestiia restaurant litchi juice"
      ]
    }
  },
  {
    "id": "dish-mix-fruit-juice",
    "slug": "mix-fruit-juice",
    "name": "Mix Fruit Juice",
    "suggestedName": null,
    "categoryId": "juices",
    "price": 99,
    "isVeg": true,
    "description": "Refreshing and chilled Mix Fruit Juice prepared with pure fruit extracts for a clean, natural taste. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Mix Fruit Juice - Pure Veg Juices in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mix Fruit Juice (₹99) in Juices at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "mix fruit juice Kanpur",
        "pure veg juices Shyam Nagar",
        "mix fruit juice price Kanpur",
        "Hestiia restaurant mix fruit juice"
      ]
    }
  },
  {
    "id": "dish-apple-juice",
    "slug": "apple-juice",
    "name": "Apple Juice",
    "suggestedName": null,
    "categoryId": "juices",
    "price": 99,
    "isVeg": true,
    "description": "Refreshing and chilled Apple Juice prepared with pure fruit extracts for a clean, natural taste. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Apple Juice - Pure Veg Juices in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Apple Juice (₹99) in Juices at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "apple juice Kanpur",
        "pure veg juices Shyam Nagar",
        "apple juice price Kanpur",
        "Hestiia restaurant apple juice"
      ]
    }
  },
  {
    "id": "dish-cranberry-juice",
    "slug": "cranberry-juice",
    "name": "Cranberry Juice",
    "suggestedName": null,
    "categoryId": "juices",
    "price": 99,
    "isVeg": true,
    "description": "Chilled and revitalising Cranberry Juice pressed from fresh fruits, served at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Cranberry Juice - Pure Veg Juices in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cranberry Juice (₹99) in Juices at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cranberry juice Kanpur",
        "pure veg juices Shyam Nagar",
        "cranberry juice price Kanpur",
        "Hestiia restaurant cranberry juice"
      ]
    }
  },
  {
    "id": "dish-chocolate-shake",
    "slug": "chocolate-shake",
    "name": "Chocolate Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Chocolate Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Chocolate Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chocolate Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "chocolate shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "chocolate shake price Kanpur",
        "Hestiia restaurant chocolate shake"
      ]
    }
  },
  {
    "id": "dish-vanilla-shake",
    "slug": "vanilla-shake",
    "name": "Vanilla Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Vanilla Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Vanilla Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Vanilla Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "vanilla shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "vanilla shake price Kanpur",
        "Hestiia restaurant vanilla shake"
      ]
    }
  },
  {
    "id": "dish-butterscotch-shake",
    "slug": "butterscotch-shake",
    "name": "Butterscotch Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Thick and creamy Butterscotch Shake blended with fresh milk and rich ingredients, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Butterscotch Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Butterscotch Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "butterscotch shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "butterscotch shake price Kanpur",
        "Hestiia restaurant butterscotch shake"
      ]
    }
  },
  {
    "id": "dish-pineapple-shake",
    "slug": "pineapple-shake",
    "name": "Pineapple Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Pineapple Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Pineapple Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Pineapple Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "pineapple shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "pineapple shake price Kanpur",
        "Hestiia restaurant pineapple shake"
      ]
    }
  },
  {
    "id": "dish-mango-shake",
    "slug": "mango-shake",
    "name": "Mango Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Mango Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Mango Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mango Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "mango shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "mango shake price Kanpur",
        "Hestiia restaurant mango shake"
      ]
    }
  },
  {
    "id": "dish-strawberry-shake",
    "slug": "strawberry-shake",
    "name": "Strawberry Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Thick and creamy Strawberry Shake blended with fresh milk and rich ingredients, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Strawberry Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Strawberry Shake (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "strawberry shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "strawberry shake price Kanpur",
        "Hestiia restaurant strawberry shake"
      ]
    }
  },
  {
    "id": "dish-cold-coffee",
    "slug": "cold-coffee",
    "name": "Cold Coffee",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Cold Coffee blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cold Coffee - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cold Coffee (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "cold coffee Kanpur",
        "pure veg shakes Shyam Nagar",
        "cold coffee price Kanpur",
        "Hestiia restaurant cold coffee"
      ]
    }
  },
  {
    "id": "dish-cold-coffee-with-ice-cream",
    "slug": "cold-coffee-with-ice-cream",
    "name": "Cold Coffee With Ice Cream",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 149,
    "isVeg": true,
    "description": "Rich and thick Cold Coffee With Ice Cream blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingre...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/cold-coffee-with-ice-cream.webp",
      "srcSmall": "/menu/cold-coffee-with-ice-cream-sm.webp",
      "alt": "Chilled creamy cold coffee topped with a scoop of vanilla ice cream in a tall glass",
      "isIllustrative": true
    },
    "seo": {
      "title": "Cold Coffee With Ice Cream - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cold Coffee With Ice Cream (₹149) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cold coffee with ice cream Kanpur",
        "pure veg shakes Shyam Nagar",
        "cold coffee with ice cream price Kanpur",
        "Hestiia restaurant cold coffee with ice cream"
      ]
    },
    "detail": {
      "story": "Cold Coffee with Ice Cream is a classic indulgence, blending chilled whole milk and strong espresso coffee, crowned with a generous scoop of velvety vanilla ice cream and drizzled with chocolate sauce. The ultimate treat for coffee lovers.",
      "ingredients": [
        "Brewed Coffee",
        "Chilled Milk",
        "Vanilla Ice Cream",
        "Chocolate Drizzle",
        "Sugar"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-paneer-tikka-sandwich",
        "dish-cheese-fries"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-black-currant-shake",
    "slug": "black-currant-shake",
    "name": "Black Currant Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 159,
    "isVeg": true,
    "description": "Thick and creamy Black Currant Shake blended with fresh milk and rich ingredients, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Black Currant Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Black Currant Shake (₹159) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "black currant shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "black currant shake price Kanpur",
        "Hestiia restaurant black currant shake"
      ]
    }
  },
  {
    "id": "dish-oreo-shake",
    "slug": "oreo-shake",
    "name": "Oreo Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 159,
    "isVeg": true,
    "description": "Rich and thick Oreo Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Oreo Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Oreo Shake (₹159) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "oreo shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "oreo shake price Kanpur",
        "Hestiia restaurant oreo shake"
      ]
    }
  },
  {
    "id": "dish-kit-kat-shake",
    "slug": "kit-kat-shake",
    "name": "Kit-Kat Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 159,
    "isVeg": true,
    "description": "Rich and thick Kit-Kat Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Kit-Kat Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Kit-Kat Shake (₹159) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "kit-kat shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "kit-kat shake price Kanpur",
        "Hestiia restaurant kit-kat shake"
      ]
    }
  },
  {
    "id": "dish-cold-coffee-with-shake",
    "slug": "cold-coffee-with-shake",
    "name": "Cold Coffee With Shake",
    "suggestedName": null,
    "categoryId": "shakes",
    "price": 169,
    "isVeg": true,
    "description": "Thick and creamy Cold Coffee With Shake blended with fresh milk and rich ingredients, served in Kanpur. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Cold Coffee With Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Cold Coffee With Shake (₹169) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "cold coffee with shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "cold coffee with shake price Kanpur",
        "Hestiia restaurant cold coffee with shake"
      ]
    }
  },
  {
    "id": "dish-hestia-special-shake",
    "slug": "hestia-special-shake",
    "name": "Hestia Special Shake",
    "suggestedName": "Hestiia Special Shake",
    "categoryId": "shakes",
    "price": 199,
    "isVeg": true,
    "description": "Rich and thick Hestia Special Shake blended smoothly with fresh chilled milk and signature flavours. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hestia Special Shake - Pure Veg Shakes in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hestia Special Shake (₹199) in Shakes at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hestia special shake Kanpur",
        "pure veg shakes Shyam Nagar",
        "hestia special shake price Kanpur",
        "Hestiia restaurant hestia special shake"
      ]
    }
  },
  {
    "id": "dish-hot-tea",
    "slug": "hot-tea",
    "name": "Hot Tea",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 49,
    "isVeg": true,
    "description": "Traditional and refreshing Hot Tea prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Hot Tea - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hot Tea (₹49) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "hot tea Kanpur",
        "pure veg beverages Shyam Nagar",
        "hot tea price Kanpur",
        "Hestiia restaurant hot tea"
      ]
    }
  },
  {
    "id": "dish-black-tea",
    "slug": "black-tea",
    "name": "Black Tea",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 49,
    "isVeg": true,
    "description": "Refreshing and comforting Black Tea brewed fresh for guests at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Black Tea - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Black Tea (₹49) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "black tea Kanpur",
        "pure veg beverages Shyam Nagar",
        "black tea price Kanpur",
        "Hestiia restaurant black tea"
      ]
    }
  },
  {
    "id": "dish-mineral-water-cold-drink",
    "slug": "mineral-water-cold-drink",
    "name": "Mineral Water / Cold Drink",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 59,
    "isVeg": true,
    "description": "Traditional and refreshing Mineral Water / Cold Drink prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingre...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Mineral Water / Cold Drink - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Mineral Water / Cold Drink (₹59) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "mineral water / cold drink Kanpur",
        "pure veg beverages Shyam Nagar",
        "mineral water / cold drink price Kanpur",
        "Hestiia restaurant mineral water / cold drink"
      ]
    }
  },
  {
    "id": "dish-lassi",
    "slug": "lassi",
    "name": "Lassi",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 59,
    "isVeg": true,
    "description": "Traditional and refreshing Lassi prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Lassi - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Lassi (₹59) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "lassi Kanpur",
        "pure veg beverages Shyam Nagar",
        "lassi price Kanpur",
        "Hestiia restaurant lassi"
      ]
    }
  },
  {
    "id": "dish-desi-chhach",
    "slug": "desi-chhach",
    "name": "Desi Chhach",
    "suggestedName": "Desi Chhaas",
    "categoryId": "beverages",
    "price": 59,
    "isVeg": true,
    "description": "Refreshing and comforting Desi Chhach brewed fresh for guests at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Desi Chhach - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Desi Chhach (₹59) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "desi chhach Kanpur",
        "pure veg beverages Shyam Nagar",
        "desi chhach price Kanpur",
        "Hestiia restaurant desi chhach"
      ]
    }
  },
  {
    "id": "dish-masala-cold-drink",
    "slug": "masala-cold-drink",
    "name": "Masala Cold Drink",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 79,
    "isVeg": true,
    "description": "Traditional and refreshing Masala Cold Drink prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 1,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Masala Cold Drink - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Masala Cold Drink (₹79) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "masala cold drink Kanpur",
        "pure veg beverages Shyam Nagar",
        "masala cold drink price Kanpur",
        "Hestiia restaurant masala cold drink"
      ]
    }
  },
  {
    "id": "dish-hot-coffee",
    "slug": "hot-coffee",
    "name": "Hot Coffee",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 79,
    "isVeg": true,
    "description": "Traditional and refreshing Hot Coffee prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Hot Coffee - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hot Coffee (₹79) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "hot coffee Kanpur",
        "pure veg beverages Shyam Nagar",
        "hot coffee price Kanpur",
        "Hestiia restaurant hot coffee"
      ]
    }
  },
  {
    "id": "dish-black-coffee",
    "slug": "black-coffee",
    "name": "Black Coffee",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 79,
    "isVeg": true,
    "description": "Refreshing and comforting Black Coffee brewed fresh for guests at Hestiia in Shyam Nagar, Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Black Coffee - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Black Coffee (₹79) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "black coffee Kanpur",
        "pure veg beverages Shyam Nagar",
        "black coffee price Kanpur",
        "Hestiia restaurant black coffee"
      ]
    }
  },
  {
    "id": "dish-fresh-lime-soda",
    "slug": "fresh-lime-soda",
    "name": "Fresh Lime Soda",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 85,
    "isVeg": true,
    "description": "Traditional and refreshing Fresh Lime Soda prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Fresh Lime Soda - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Fresh Lime Soda (₹85) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "fresh lime soda Kanpur",
        "pure veg beverages Shyam Nagar",
        "fresh lime soda price Kanpur",
        "Hestiia restaurant fresh lime soda"
      ]
    }
  },
  {
    "id": "dish-redbull",
    "slug": "redbull",
    "name": "Redbull",
    "suggestedName": null,
    "categoryId": "beverages",
    "price": 179,
    "isVeg": true,
    "description": "Traditional and refreshing Redbull prepared fresh to order, perfect alongside any meal. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Redbull - Pure Veg Beverages in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Redbull (₹179) in Beverages at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "redbull Kanpur",
        "pure veg beverages Shyam Nagar",
        "redbull price Kanpur",
        "Hestiia restaurant redbull"
      ]
    }
  },
  {
    "id": "dish-v-mojito",
    "slug": "v-mojito",
    "name": "V. Mojito",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Vibrant non-alcoholic V. Mojito blended with chilled soda and fruit notes, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular"
    ],
    "image": {
      "src": "/menu/v-mojito.webp",
      "srcSmall": "/menu/v-mojito-sm.webp",
      "alt": "Chilled virgin mojito mocktail with crushed ice, fresh mint, and lime in a highball glass",
      "isIllustrative": true
    },
    "seo": {
      "title": "V. Mojito - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian V. Mojito (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "v. mojito Kanpur",
        "pure veg mocktails Shyam Nagar",
        "v. mojito price Kanpur",
        "Hestiia restaurant v. mojito"
      ]
    },
    "detail": {
      "story": "V. Mojito is our signature non-alcoholic refresher, crafted with muddled garden-fresh mint leaves, juicy lime wedges, and simple syrup, topped with effervescent sparkling soda over crushed ice. It cleanses the palate and complements rich curries and spicy tandoori starters.",
      "ingredients": [
        "Fresh Mint",
        "Lime Juice",
        "Cane Sugar",
        "Club Soda",
        "Crushed Ice"
      ],
      "servesPeople": 1,
      "pairsWith": [
        "dish-paneer-tikka",
        "dish-hestiia-special"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-blue-lagoon",
    "slug": "blue-lagoon",
    "name": "Blue Lagoon",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Chilled non-alcoholic Blue Lagoon crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Blue Lagoon - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Blue Lagoon (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "blue lagoon Kanpur",
        "pure veg mocktails Shyam Nagar",
        "blue lagoon price Kanpur",
        "Hestiia restaurant blue lagoon"
      ]
    }
  },
  {
    "id": "dish-watermelon",
    "slug": "watermelon",
    "name": "Watermelon",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Chilled non-alcoholic Watermelon crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Watermelon - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Watermelon (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "watermelon Kanpur",
        "pure veg mocktails Shyam Nagar",
        "watermelon price Kanpur",
        "Hestiia restaurant watermelon"
      ]
    }
  },
  {
    "id": "dish-green-apple",
    "slug": "green-apple",
    "name": "Green Apple",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Vibrant non-alcoholic Green Apple blended with chilled soda and fruit notes, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Green Apple - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Green Apple (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "green apple Kanpur",
        "pure veg mocktails Shyam Nagar",
        "green apple price Kanpur",
        "Hestiia restaurant green apple"
      ]
    }
  },
  {
    "id": "dish-lucy-berry",
    "slug": "lucy-berry",
    "name": "Lucy Berry",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Chilled non-alcoholic Lucy Berry crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Lucy Berry - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Lucy Berry (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "lucy berry Kanpur",
        "pure veg mocktails Shyam Nagar",
        "lucy berry price Kanpur",
        "Hestiia restaurant lucy berry"
      ]
    }
  },
  {
    "id": "dish-kiwi-blast",
    "slug": "kiwi-blast",
    "name": "Kiwi Blast",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 149,
    "isVeg": true,
    "description": "Chilled non-alcoholic Kiwi Blast crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Kiwi Blast - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Kiwi Blast (₹149) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "kiwi blast Kanpur",
        "pure veg mocktails Shyam Nagar",
        "kiwi blast price Kanpur",
        "Hestiia restaurant kiwi blast"
      ]
    }
  },
  {
    "id": "dish-juice-tank",
    "slug": "juice-tank",
    "name": "Juice Tank",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 179,
    "isVeg": true,
    "description": "Vibrant non-alcoholic Juice Tank blended with chilled soda and fruit notes, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Juice Tank - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Juice Tank (₹179) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "juice tank Kanpur",
        "pure veg mocktails Shyam Nagar",
        "juice tank price Kanpur",
        "Hestiia restaurant juice tank"
      ]
    }
  },
  {
    "id": "dish-twister",
    "slug": "twister",
    "name": "Twister",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 179,
    "isVeg": true,
    "description": "Chilled non-alcoholic Twister crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Twister - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Twister (₹179) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "twister Kanpur",
        "pure veg mocktails Shyam Nagar",
        "twister price Kanpur",
        "Hestiia restaurant twister"
      ]
    }
  },
  {
    "id": "dish-heaven",
    "slug": "heaven",
    "name": "Heaven",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 179,
    "isVeg": true,
    "description": "Chilled non-alcoholic Heaven crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Heaven - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Heaven (₹179) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "heaven Kanpur",
        "pure veg mocktails Shyam Nagar",
        "heaven price Kanpur",
        "Hestiia restaurant heaven"
      ]
    }
  },
  {
    "id": "dish-james",
    "slug": "james",
    "name": "James",
    "suggestedName": null,
    "categoryId": "mocktails",
    "price": 179,
    "isVeg": true,
    "description": "Vibrant non-alcoholic James blended with chilled soda and fruit notes, served in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "James - Pure Veg Mocktails in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian James (₹179) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "james Kanpur",
        "pure veg mocktails Shyam Nagar",
        "james price Kanpur",
        "Hestiia restaurant james"
      ]
    }
  },
  {
    "id": "dish-hestia-special-mocktail",
    "slug": "hestia-special-mocktail",
    "name": "Hestia Special Mocktail",
    "suggestedName": "Hestiia Special Mocktail",
    "categoryId": "mocktails",
    "price": 199,
    "isVeg": true,
    "description": "Chilled non-alcoholic Hestia Special Mocktail crafted with sparkling soda, fruit cordials, and fresh herbs. Prepared fresh to order with pure vegetarian ingr...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hestia Special Mocktail - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hestia Special Mocktail (₹199) in Mocktails at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hestia special mocktail Kanpur",
        "pure veg mocktails Shyam Nagar",
        "hestia special mocktail price Kanpur",
        "Hestiia restaurant hestia special mocktail"
      ]
    }
  },
  {
    "id": "dish-gulab-jamun",
    "slug": "gulab-jamun",
    "name": "Gulab Jamun",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 49,
    "isVeg": true,
    "description": "Rich and sweet Gulab Jamun handcrafted with pure ingredients to complete your dining experience. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": true,
    "tags": [
      "pure-veg",
      "popular",
      "budget-friendly"
    ],
    "image": {
      "src": "/menu/gulab-jamun.webp",
      "srcSmall": "/menu/gulab-jamun-sm.webp",
      "alt": "Warm golden brown gulab jamun soaked in cardamom rose syrup in a brass bowl",
      "isIllustrative": true
    },
    "seo": {
      "title": "Gulab Jamun - Pure Veg Desserts in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Gulab Jamun (₹49) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "gulab jamun Kanpur",
        "pure veg desserts Shyam Nagar",
        "gulab jamun price Kanpur",
        "Hestiia restaurant gulab jamun"
      ]
    },
    "detail": {
      "story": "Gulab Jamun is the quintessential Indian dessert, made with delicate reduced milk solids hand-rolled and gently fried before soaking in fragrant rose and cardamom sugar syrup. Served warm, each bite melts effortlessly on the tongue, offering a sweet conclusion to any North Indian meal.",
      "ingredients": [
        "Mawa (Khoya)",
        "Cardamom",
        "Rose Water",
        "Sugar Syrup",
        "Pistachios"
      ],
      "servesPeople": 2,
      "pairsWith": [
        "dish-vanilla-ice-cream",
        "dish-hot-coffee"
      ],
      "reviewFlags": [
        "needs client confirm"
      ]
    }
  },
  {
    "id": "dish-vanilla-ice-cream",
    "slug": "vanilla-ice-cream",
    "name": "Vanilla Ice Cream",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 49,
    "isVeg": true,
    "description": "Sweet and indulgent Vanilla Ice Cream prepared with classic ingredients, served at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Vanilla Ice Cream - Pure Veg Desserts in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Vanilla Ice Cream (₹49) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "vanilla ice cream Kanpur",
        "pure veg desserts Shyam Nagar",
        "vanilla ice cream price Kanpur",
        "Hestiia restaurant vanilla ice cream"
      ]
    }
  },
  {
    "id": "dish-strawberry-ice-cream",
    "slug": "strawberry-ice-cream",
    "name": "Strawberry Ice Cream",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 49,
    "isVeg": true,
    "description": "Rich and sweet Strawberry Ice Cream handcrafted with pure ingredients to complete your dining experience. Prepared fresh to order with pure vegetarian ingred...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Strawberry Ice Cream - Pure Veg Desserts in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Strawberry Ice Cream (₹49) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "strawberry ice cream Kanpur",
        "pure veg desserts Shyam Nagar",
        "strawberry ice cream price Kanpur",
        "Hestiia restaurant strawberry ice cream"
      ]
    }
  },
  {
    "id": "dish-chhena",
    "slug": "chhena",
    "name": "Chhena",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 59,
    "isVeg": true,
    "description": "Rich and sweet Chhena handcrafted with pure ingredients to complete your dining experience. Prepared fresh to order with pure vegetarian ingredients.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Chhena - Pure Veg Desserts in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chhena (₹59) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients, comforting flavours and dining.",
      "keywords": [
        "chhena Kanpur",
        "pure veg desserts Shyam Nagar",
        "chhena price Kanpur",
        "Hestiia restaurant chhena"
      ]
    }
  },
  {
    "id": "dish-chocolate-ice-cream",
    "slug": "chocolate-ice-cream",
    "name": "Chocolate Ice Cream",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 69,
    "isVeg": true,
    "description": "Sweet and indulgent Chocolate Ice Cream prepared with classic ingredients, served at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ingredie...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Chocolate Ice Cream - Pure Veg Desserts in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Chocolate Ice Cream (₹69) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "chocolate ice cream Kanpur",
        "pure veg desserts Shyam Nagar",
        "chocolate ice cream price Kanpur",
        "Hestiia restaurant chocolate ice cream"
      ]
    }
  },
  {
    "id": "dish-butter-scotch-ice-cream",
    "slug": "butter-scotch-ice-cream",
    "name": "Butter Scotch Ice Cream",
    "suggestedName": "Butterscotch Ice Cream",
    "categoryId": "desserts",
    "price": 69,
    "isVeg": true,
    "description": "Rich and sweet Butter Scotch Ice Cream handcrafted with pure ingredients to complete your dining experience. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg",
      "budget-friendly"
    ],
    "image": null,
    "seo": {
      "title": "Butter Scotch Ice Cream - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Butter Scotch Ice Cream (₹69) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "butter scotch ice cream Kanpur",
        "pure veg desserts Shyam Nagar",
        "butter scotch ice cream price Kanpur",
        "Hestiia restaurant butter scotch ice cream"
      ]
    }
  },
  {
    "id": "dish-hot-chocolate-with-brownie",
    "slug": "hot-chocolate-with-brownie",
    "name": "Hot Chocolate With Brownie",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 149,
    "isVeg": true,
    "description": "Rich and sweet Hot Chocolate With Brownie handcrafted with pure ingredients to complete your dining experience.",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hot Chocolate With Brownie - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hot Chocolate With Brownie (₹149) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hot chocolate with brownie Kanpur",
        "pure veg desserts Shyam Nagar",
        "hot chocolate with brownie price Kanpur",
        "Hestiia restaurant hot chocolate with brownie"
      ]
    }
  },
  {
    "id": "dish-hot-brownie-with-vanilla",
    "slug": "hot-brownie-with-vanilla",
    "name": "Hot Brownie With Vanilla",
    "suggestedName": null,
    "categoryId": "desserts",
    "price": 149,
    "isVeg": true,
    "description": "Sweet and indulgent Hot Brownie With Vanilla prepared with classic ingredients, served at Hestiia in Kanpur. Prepared fresh to order with pure vegetarian ing...",
    "sourceDescription": null,
    "portion": null,
    "options": null,
    "spiceLevel": 0,
    "popular": false,
    "tags": [
      "pure-veg"
    ],
    "image": null,
    "seo": {
      "title": "Hot Brownie With Vanilla - Pure Veg in Kanpur | Hestiia",
      "metaDescription": "Enjoy pure vegetarian Hot Brownie With Vanilla (₹149) in Desserts at Hestiia Restaurant in Shyam Nagar, Kanpur. Fresh ingredients and authentic taste.",
      "keywords": [
        "hot brownie with vanilla Kanpur",
        "pure veg desserts Shyam Nagar",
        "hot brownie with vanilla price Kanpur",
        "Hestiia restaurant hot brownie with vanilla"
      ]
    }
  }
]

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
