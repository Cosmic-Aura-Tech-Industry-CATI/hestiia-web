import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const BRAIN_DIR = 'C:\\Users\\Shubh\\.gemini\\antigravity-ide\\brain\\fb9bad40-eecd-40dd-812c-84a9171749f2'
const ASSETS_DIR = path.resolve('src/assets/images')
const OUTPUT_DIR = path.resolve('public/menu')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Find newest matching file in brain directory
function getBrainFile(prefix) {
  const files = fs.readdirSync(BRAIN_DIR).filter(f => f.startsWith(prefix) && f.endsWith('.jpg'))
  if (files.length === 0) return null
  files.sort((a, b) => fs.statSync(path.join(BRAIN_DIR, b)).mtimeMs - fs.statSync(path.join(BRAIN_DIR, a)).mtimeMs)
  return path.join(BRAIN_DIR, files[0])
}

async function convertImage(srcPath, slug, cropRegion = null) {
  const largePath = path.join(OUTPUT_DIR, `${slug}.webp`)
  const smallPath = path.join(OUTPUT_DIR, `${slug}-sm.webp`)

  let pipelineLarge = sharp(srcPath)
  let pipelineSmall = sharp(srcPath)

  if (cropRegion) {
    pipelineLarge = pipelineLarge.extract(cropRegion)
    pipelineSmall = pipelineSmall.extract(cropRegion)
  }

  let qLarge = 74
  await pipelineLarge
    .resize(1200, 900, { fit: 'cover', position: 'center' })
    .webp({ quality: qLarge, effort: 6 })
    .toFile(largePath)

  let largeSize = fs.statSync(largePath).size / 1024
  if (largeSize > 118) {
    await sharp(srcPath)
      .resize(1200, 900, { fit: 'cover', position: 'center' })
      .webp({ quality: 68, effort: 6 })
      .toFile(largePath)
    largeSize = fs.statSync(largePath).size / 1024
  }

  await pipelineSmall
    .resize(480, 360, { fit: 'cover', position: 'center' })
    .webp({ quality: 75, effort: 6 })
    .toFile(smallPath)

  const smallSize = fs.statSync(smallPath).size / 1024
  console.log(`✓ ${slug}.webp (${largeSize.toFixed(1)} KB) | ${slug}-sm.webp (${smallSize.toFixed(1)} KB)`)
}

async function main() {
  console.log('Generating & optimizing WebP images into public/menu/ ...')

  // Map sources for 24 popular dishes
  const popularMap = {
    'dal-makhani': path.join(ASSETS_DIR, 'dal_makhani.jpg'),
    'paneer-butter-masala': path.join(ASSETS_DIR, 'paneer_butter_masala.jpg'),
    'hakka-noodles': path.join(ASSETS_DIR, 'chinese_noodles.jpg'),
    'paneer-tikka': getBrainFile('paneer_tikka_'),
    'veg-biryani': getBrainFile('veg_biryani_'),
    'hestiia-special': getBrainFile('hestiia_special_pizza_'),
    'chinese-platter': getBrainFile('chinese_platter_'),
    'tandoori-platter': getBrainFile('tandoori_platter_'),
    'gulab-jamun': getBrainFile('gulab_jamun_'),
    'v-mojito': getBrainFile('v_mojito_'),
    'paneer-tikka-sandwich': getBrainFile('paneer_tikka_sandwich_'),
    'cottage-cheese-burger': getBrainFile('cottage_cheese_burger_'),
    'red-sauce-pasta': getBrainFile('red_sauce_pasta_'),
    'manchow': getBrainFile('manchow_soup_'),
    'mix-veg-raita': getBrainFile('mix_veg_raita_'),
    'dahi-kebab': getBrainFile('dahi_kebab_'),
    // Derived/paired from high-res food assets
    'honey-chilli-potato': getBrainFile('chinese_platter_'),
    'veg-manchurian': getBrainFile('chinese_platter_'),
    'kadhai-paneer': path.join(ASSETS_DIR, 'paneer_butter_masala.jpg'),
    'mushroom-butter-masala': path.join(ASSETS_DIR, 'paneer_butter_masala.jpg'),
    'mix-veg': path.join(ASSETS_DIR, 'hero_thali.jpg'),
    'garlic-naan': getBrainFile('tandoori_platter_'),
    'cheese-fries': path.join(ASSETS_DIR, 'fast_food_snacks.jpg'),
    'cold-coffee-with-ice-cream': getBrainFile('v_mojito_'),
  }

  for (const [slug, src] of Object.entries(popularMap)) {
    if (src && fs.existsSync(src)) {
      await convertImage(src, slug)
    } else {
      console.warn(`Source missing for ${slug}: ${src}`)
    }
  }

  // 21 Category Fallback Images
  const categoryMap = {
    'category-sandwiches': getBrainFile('paneer_tikka_sandwich_'),
    'category-burgers': getBrainFile('cottage_cheese_burger_'),
    'category-pizza': getBrainFile('hestiia_special_pizza_'),
    'category-pasta': getBrainFile('red_sauce_pasta_'),
    'category-beverages': getBrainFile('v_mojito_'),
    'category-mocktails': getBrainFile('v_mojito_'),
    'category-breads': getBrainFile('tandoori_platter_'),
    'category-desserts': getBrainFile('gulab_jamun_'),
    'category-kebabs-starters': getBrainFile('dahi_kebab_'),
    'category-salads-raita': getBrainFile('mix_veg_raita_'),
    'category-veg-main-course': path.join(ASSETS_DIR, 'hero_thali.jpg'),
    'category-dal': path.join(ASSETS_DIR, 'dal_makhani.jpg'),
    'category-rice-biryani': getBrainFile('veg_biryani_'),
    'category-chinese-starters': getBrainFile('chinese_platter_'),
    'category-chinese-rice-noodles': path.join(ASSETS_DIR, 'chinese_noodles.jpg'),
    'category-paneer': path.join(ASSETS_DIR, 'paneer_butter_masala.jpg'),
    'category-tandoori-specials': getBrainFile('paneer_tikka_'),
    'category-sides-snacks': path.join(ASSETS_DIR, 'fast_food_snacks.jpg'),
    'category-juices': getBrainFile('v_mojito_'),
    'category-shakes': getBrainFile('v_mojito_'),
    'category-soups': getBrainFile('manchow_soup_'),
  }

  console.log('\nGenerating Category Fallbacks...')
  for (const [slug, src] of Object.entries(categoryMap)) {
    if (src && fs.existsSync(src)) {
      await convertImage(src, slug)
    } else {
      console.warn(`Source missing for category ${slug}`)
    }
  }

  // Calculate total KB of public/menu/
  const allFiles = fs.readdirSync(OUTPUT_DIR)
  let totalBytes = 0
  for (const f of allFiles) {
    totalBytes += fs.statSync(path.join(OUTPUT_DIR, f)).size
  }
  console.log(`\n✓ Total files in public/menu/: ${allFiles.length}`)
  console.log(`✓ Total size of public/menu/: ${(totalBytes / 1024).toFixed(1)} KB`)
}

main().catch(console.error)
