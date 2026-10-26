#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

console.log(`[Content Validator] Running content validation (Production mode: ${isProduction})...`)

const errors = []
const warnings = []

function checkFile(relPath) {
  try {
    const fullPath = resolve(process.cwd(), relPath)
    return readFileSync(fullPath, 'utf-8')
  } catch {
    errors.push(`Could not read file: ${relPath}`)
    return ''
  }
}

// 1. Validate restaurant.ts
const restContent = checkFile('src/content/restaurant.ts')
if (!restContent.includes('Hestiia Restaurant')) {
  errors.push('restaurant.ts: Missing verified restaurant name "Hestiia Restaurant"')
}
if (!restContent.includes('+91 78808 40622') || !restContent.includes('+917880840622')) {
  errors.push('restaurant.ts: Missing verified phone number "+91 78808 40622"')
}
if (!restContent.includes('208013')) {
  errors.push('restaurant.ts: Missing verified postal code "208013"')
}
if (!restContent.includes('info@hestiia.com')) {
  errors.push('restaurant.ts: Missing email "info@hestiia.com"')
}
if (restContent.includes("status: 'pending'") || restContent.includes('status: "pending"')) {
  const msg = 'restaurant.ts contains pending items awaiting client confirmation.'
  if (isProduction) {
    errors.push(`[PRODUCTION ERROR] ${msg}`)
  } else {
    warnings.push(`[DEV WARNING] ${msg}`)
  }
}

// 2. Validate reservations.ts
const resContent = checkFile('src/content/reservations.ts')
const allowedHosts = ['district.in', 'zomato.com', 'eazydiner.com']
for (const host of allowedHosts) {
  if (!resContent.includes(host)) {
    errors.push(`reservations.ts: Missing verified reservation host "${host}"`)
  }
}

// 3. Validate gallery.ts
const galContent = checkFile('src/content/gallery.ts')
if (!galContent.includes('alt:')) {
  errors.push('gallery.ts: Gallery items must have descriptive alt attributes.')
}

// 4. Validate menu data (src/content/menu.ts)
async function validateMenu() {
  try {
    const menuModule = await import('../src/content/menu.ts')
    const { DISHES, MENU_CATEGORIES, POPULAR_DISHES } = menuModule

    if (!Array.isArray(DISHES) || DISHES.length === 0) {
      errors.push('menu.ts: DISHES array is empty or missing')
      return
    }

    const seenIds = new Set()
    const seenSlugs = new Set()
    const allDishIds = new Set(DISHES.map(d => d.id))

    // Validate Categories & their fallback images
    for (const cat of MENU_CATEGORIES) {
      if (!cat.id || !cat.name || !cat.groupId || !cat.seoIntro) {
        errors.push(`menu.ts: Category ${cat.id || 'unknown'} is missing required fields`)
      }
      if (cat.fallbackImage) {
        const fullLarge = resolve(process.cwd(), 'public', cat.fallbackImage.src.replace(/^\//, ''))
        const fullSmall = resolve(process.cwd(), 'public', cat.fallbackImage.srcSmall.replace(/^\//, ''))
        if (!existsSync(fullLarge)) {
          errors.push(`menu.ts: Category fallback image not found: ${cat.fallbackImage.src}`)
        }
        if (!existsSync(fullSmall)) {
          errors.push(`menu.ts: Category fallback small image not found: ${cat.fallbackImage.srcSmall}`)
        }
      } else {
        errors.push(`menu.ts: Category ${cat.id} is missing fallbackImage`)
      }
    }

    // Validate Dishes
    for (const dish of DISHES) {
      // Duplicate ID check
      if (seenIds.has(dish.id)) {
        errors.push(`menu.ts: Duplicate dish ID found: ${dish.id}`)
      }
      seenIds.add(dish.id)

      // Duplicate Slug check
      if (seenSlugs.has(dish.slug)) {
        errors.push(`menu.ts: Duplicate dish slug found: ${dish.slug}`)
      }
      seenSlugs.add(dish.slug)

      // Required fields check
      if (!dish.id || !dish.slug || !dish.name || !dish.categoryId || dish.price === undefined || dish.isVeg !== true) {
        errors.push(`menu.ts: Dish "${dish.name || dish.id}" is missing required fields`)
      }

      // Price must be a positive number
      if (typeof dish.price !== 'number' || dish.price <= 0 || isNaN(dish.price)) {
        errors.push(`menu.ts: Dish "${dish.name}" has invalid price: ${dish.price}`)
      }

      // Description length: between 90 and 170 chars
      if (!dish.description || dish.description.length < 90 || dish.description.length > 170) {
        errors.push(
          `menu.ts: Dish "${dish.name}" description length (${dish.description?.length || 0}) is outside 90-170 chars`
        )
      }

      // SEO checks
      if (!dish.seo || !dish.seo.title || !dish.seo.metaDescription || !Array.isArray(dish.seo.keywords)) {
        errors.push(`menu.ts: Dish "${dish.name}" is missing SEO fields`)
      } else {
        if (dish.seo.title.length > 60) {
          errors.push(
            `menu.ts: Dish "${dish.name}" seo.title is over 60 chars (${dish.seo.title.length}): "${dish.seo.title}"`
          )
        }
      }

      // Popular dish validation
      if (dish.popular) {
        if (!dish.detail) {
          errors.push(`menu.ts: Popular dish "${dish.name}" is missing detail object`)
        } else {
          if (!dish.detail.story || !Array.isArray(dish.detail.ingredients) || !dish.detail.servesPeople) {
            errors.push(`menu.ts: Popular dish "${dish.name}" has incomplete detail object`)
          }
          if (Array.isArray(dish.detail.pairsWith)) {
            for (const pairId of dish.detail.pairsWith) {
              if (!allDishIds.has(pairId)) {
                errors.push(`menu.ts: Popular dish "${dish.name}" pairsWith id does not exist: "${pairId}"`)
              }
            }
          }
        }

        // Image file check for popular dish
        if (!dish.image || !dish.image.src || !dish.image.srcSmall) {
          errors.push(`menu.ts: Popular dish "${dish.name}" is missing image object`)
        } else {
          const fullImgLarge = resolve(process.cwd(), 'public', dish.image.src.replace(/^\//, ''))
          const fullImgSmall = resolve(process.cwd(), 'public', dish.image.srcSmall.replace(/^\//, ''))
          if (!existsSync(fullImgLarge)) {
            errors.push(`menu.ts: Dish image file not found: ${dish.image.src}`)
          }
          if (!existsSync(fullImgSmall)) {
            errors.push(`menu.ts: Dish small image file not found: ${dish.image.srcSmall}`)
          }
        }
      }
    }

    console.log(`✓ Validated ${DISHES.length} dishes, ${POPULAR_DISHES.length} popular dishes, ${MENU_CATEGORIES.length} categories.`)
  } catch (err) {
    errors.push(`menu.ts validation failed to load: ${err.message}`)
  }
}

async function run() {
  await validateMenu()

  // Report
  console.log('--- Content Validation Report ---')
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} Pending item(s) detected:`)
    warnings.forEach(w => console.log(`   - ${w}`))
  }

  if (errors.length > 0) {
    console.error(`❌ ${errors.length} Error(s) found:`)
    errors.forEach(e => console.error(`   - ${e}`))
    process.exit(1)
  } else {
    console.log('✅ All content validation checks passed successfully!')
    process.exit(0)
  }
}

run()
