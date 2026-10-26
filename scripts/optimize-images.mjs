import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const DEFAULT_INPUT_DIR = path.resolve('src/assets/images')
const OUTPUT_DIR = path.resolve('public/menu')

export async function optimizeImage(inputFilePath, slug, outputDir = OUTPUT_DIR) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const largePath = path.join(outputDir, `${slug}.webp`)
  const smallPath = path.join(outputDir, `${slug}-sm.webp`)

  // Large: 1200x900, quality 80
  await sharp(inputFilePath)
    .resize(1200, 900, { fit: 'cover', position: 'center' })
    .webp({ quality: 80, effort: 6 })
    .toFile(largePath)

  // Small: 480x360, quality 75
  await sharp(inputFilePath)
    .resize(480, 360, { fit: 'cover', position: 'center' })
    .webp({ quality: 75, effort: 6 })
    .toFile(smallPath)

  const largeStat = fs.statSync(largePath)
  const smallStat = fs.statSync(smallPath)

  return {
    largePath,
    largeSizeKB: (largeStat.size / 1024).toFixed(1),
    smallPath,
    smallSizeKB: (smallStat.size / 1024).toFixed(1),
  }
}

export async function processFolder(inputDir = DEFAULT_INPUT_DIR, outputDir = OUTPUT_DIR) {
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`)
    return
  }

  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
  console.log(`Found ${files.length} images to optimize from ${inputDir}`)

  for (const file of files) {
    const slug = path.basename(file, path.extname(file)).replace(/_/g, '-')
    const result = await optimizeImage(path.join(inputDir, file), slug, outputDir)
    console.log(`✓ ${slug}.webp (${result.largeSizeKB} KB), ${slug}-sm.webp (${result.smallSizeKB} KB)`)
  }
}

// Allow CLI run: node scripts/optimize-images.mjs [inputDir] [outputDir]
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/optimize-images.mjs')) {
  const inputArg = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT_DIR
  const outputArg = process.argv[3] ? path.resolve(process.argv[3]) : OUTPUT_DIR
  processFolder(inputArg, outputArg).catch(err => {
    console.error('Image optimization failed:', err)
    process.exit(1)
  })
}
