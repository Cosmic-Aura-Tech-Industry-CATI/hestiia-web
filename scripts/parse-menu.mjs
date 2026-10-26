import fs from 'node:fs'
import path from 'node:path'

const SOURCE_PATH = path.resolve('doc/menu-source.txt')
const OUTPUT_PATH = path.resolve('src/content/menu.raw.json')

export const REAL_CATEGORIES = [
  'Sandwiches',
  'Burgers',
  'Pizza',
  'Pasta',
  'Beverages',
  'Mocktails',
  'Breads',
  'Desserts',
  'Kebabs & Starters',
  'Salads & Raita',
  'Veg Main Course',
  'Dal',
  'Rice & Biryani',
  'Chinese Starters',
  'Chinese Rice & Noodles',
  'Paneer',
  'Tandoori Specials',
  'Sides & Snacks',
  'Juices',
  'Shakes',
  'Soups',
]

function normalizeCategory(rawCat) {
  const trimmed = rawCat.trim()
  for (const real of REAL_CATEGORIES) {
    if (real.toLowerCase() === trimmed.toLowerCase()) return real
  }
  // Check partial/aliases
  if (/sandwich/i.test(trimmed)) return 'Sandwiches'
  if (/burger/i.test(trimmed)) return 'Burgers'
  if (/pizza/i.test(trimmed)) return 'Pizza'
  if (/pasta/i.test(trimmed)) return 'Pasta'
  if (/soup/i.test(trimmed)) return 'Soups'
  if (/salad|raita/i.test(trimmed)) return 'Salads & Raita'
  if (/kebab|starter/i.test(trimmed) && !/chinese/i.test(trimmed)) return 'Kebabs & Starters'
  if (/chinese.*starter/i.test(trimmed)) return 'Chinese Starters'
  if (/chinese.*(rice|noodle)/i.test(trimmed)) return 'Chinese Rice & Noodles'
  if (/paneer/i.test(trimmed) && !/sandwich|burger|pizza|chinese|tandoori/i.test(trimmed)) return 'Paneer'
  if (/main course|veg main/i.test(trimmed)) return 'Veg Main Course'
  if (/^dal/i.test(trimmed)) return 'Dal'
  if (/rice|biryani/i.test(trimmed) && !/chinese/i.test(trimmed)) return 'Rice & Biryani'
  if (/bread/i.test(trimmed)) return 'Breads'
  if (/tandoori/i.test(trimmed)) return 'Tandoori Specials'
  if (/side|snack/i.test(trimmed)) return 'Sides & Snacks'
  if (/juice/i.test(trimmed)) return 'Juices'
  if (/shake/i.test(trimmed)) return 'Shakes'
  if (/mocktail/i.test(trimmed)) return 'Mocktails'
  if (/beverage/i.test(trimmed)) return 'Beverages'
  if (/dessert/i.test(trimmed)) return 'Desserts'
  return trimmed
}

export function parseMenuSource(content) {
  // Stop at footer
  const footerIndex = content.search(/HESTIIA\s*\/\s*Pure Veg Fine Dining/i)
  const textToParse = footerIndex !== -1 ? content.slice(0, footerIndex) : content

  const lines = textToParse.split(/\r?\n/)
  let currentCategory = null
  const parsedDishes = []
  const duplicates = []
  const failedBlocks = []

  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Match Markdown headers: ## 1. Sandwiches or ## Sandwiches
    const headerMatch = line.match(/^##\s*(?:\d+\.\s*)?([^\n#]+)/)
    if (headerMatch) {
      const headerTitle = headerMatch[1].trim()
      if (/extras/i.test(headerTitle)) {
        currentCategory = null
        continue
      }
      currentCategory = normalizeCategory(headerTitle)
      inTable = false
      continue
    }

    // Check markdown table header
    if (line.startsWith('|') && /Dish.*Price/i.test(line)) {
      inTable = true
      continue
    }
    if (line.startsWith('|') && /[-]{3,}/.test(line)) {
      continue
    }

    // Markdown table row: | Dish Name | ₹119 |
    if (inTable && line.startsWith('|') && line.endsWith('|')) {
      const cols = line
        .split('|')
        .map(c => c.trim())
        .filter(c => c.length > 0)
      if (cols.length >= 2) {
        const dishName = cols[0]
        const priceStr = cols[1]
        const priceMatch = priceStr.match(/(\d+)/)
        const price = priceMatch ? parseInt(priceMatch[1], 10) : null

        if (dishName && price !== null && currentCategory) {
          parsedDishes.push({
            name: dishName,
            category: currentCategory,
            price,
            description: null,
            sourceDescription: null,
          })
          continue
        } else {
          failedBlocks.push(`Line ${i + 1}: ${line}`)
          continue
        }
      }
    }

    // Alternative slash block format: "<Name> / Pure Veg<price> / <Category> / <Name> / <description> / <price> / Add"
    if (line.includes(' / ') && /Pure Veg/i.test(line)) {
      const parts = line.split(' / ').map(p => p.trim())
      if (parts.length >= 4) {
        const name = parts[0]
        const cat = normalizeCategory(parts[2] || currentCategory || 'Veg Main Course')
        const desc = parts[4] || null
        const priceMatch = line.match(/(?:₹|Rs\.?|Pure Veg)?\s*(\d+)/i)
        const price = priceMatch ? parseInt(priceMatch[1], 10) : null

        if (name && price !== null) {
          parsedDishes.push({
            name,
            category: cat,
            price,
            description: desc,
            sourceDescription: desc,
          })
          continue
        }
      }
      failedBlocks.push(`Line ${i + 1}: ${line}`)
    }
  }

  // De-duplicate by name + category (case-insensitive)
  const seen = new Map()
  const uniqueDishes = []

  for (const dish of parsedDishes) {
    const key = `${dish.name.trim().toLowerCase()}__${dish.category.trim().toLowerCase()}`
    if (seen.has(key)) {
      duplicates.push({ name: dish.name, category: dish.category, price: dish.price })
    } else {
      seen.set(key, true)
      uniqueDishes.push(dish)
    }
  }

  // Calculate per category counts
  const categoryCounts = {}
  for (const cat of REAL_CATEGORIES) {
    categoryCounts[cat] = 0
  }
  for (const dish of uniqueDishes) {
    categoryCounts[dish.category] = (categoryCounts[dish.category] || 0) + 1
  }

  return {
    totalDishes: uniqueDishes.length,
    rawCount: parsedDishes.length,
    dishes: uniqueDishes,
    duplicates,
    failedBlocks,
    categoryCounts,
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/parse-menu.mjs')) {
  if (!fs.existsSync(SOURCE_PATH)) {
    console.error(`Source file not found: ${SOURCE_PATH}`)
    process.exit(1)
  }

  const content = fs.readFileSync(SOURCE_PATH, 'utf-8')
  const result = parseMenuSource(content)

  console.log('====================================')
  console.log('       HESTIIA MENU PARSE REPORT     ')
  console.log('====================================')
  console.log(`Total Unique Dishes Parsed: ${result.totalDishes}`)
  console.log(`Raw Blocks Encountered:    ${result.rawCount}`)
  console.log(`Duplicates Merged:          ${result.duplicates.length}`)
  console.log(`Failed Blocks:              ${result.failedBlocks.length}`)
  console.log('------------------------------------')
  console.log('Dishes per category:')
  for (const [cat, count] of Object.entries(result.categoryCounts)) {
    console.log(`  - ${cat.padEnd(25)}: ${count}`)
  }

  if (result.duplicates.length > 0) {
    console.log('------------------------------------')
    console.log('Duplicates detected & merged:')
    result.duplicates.forEach(d => console.log(`  * ${d.name} (${d.category}) - ₹${d.price}`))
  }

  if (result.failedBlocks.length > 0) {
    console.log('------------------------------------')
    console.log('Failed Blocks:')
    result.failedBlocks.forEach(b => console.log(`  ! ${b}`))
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result.dishes, null, 2), 'utf-8')
  console.log(`\n✓ Raw menu written to ${OUTPUT_PATH}`)
}
