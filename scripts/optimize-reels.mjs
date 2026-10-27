import fs from 'node:fs'
import path from 'node:path'
import { execSync, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const reelsDir = path.join(rootDir, 'public', 'reels')
const originalsDir = path.join(reelsDir, '_originals')
const postersDir = path.join(reelsDir, 'posters')

// Find ffmpeg binary
function findFfmpeg() {
  // 1. Try system PATH
  try {
    const res = spawnSync('ffmpeg', ['-version'], { encoding: 'utf-8', shell: true })
    if (res.status === 0) return 'ffmpeg'
  } catch {}

  // 2. Check WinGet Gyan.FFmpeg package location
  const localAppData = process.env.LOCALAPPDATA || ''
  if (localAppData) {
    const wingetBase = path.join(localAppData, 'Microsoft', 'WinGet', 'Packages')
    if (fs.existsSync(wingetBase)) {
      const entries = fs.readdirSync(wingetBase)
      for (const entry of entries) {
        if (entry.includes('Gyan.FFmpeg')) {
          const pkgDir = path.join(wingetBase, entry)
          const subEntries = fs.readdirSync(pkgDir)
          for (const sub of subEntries) {
            const candidate = path.join(pkgDir, sub, 'bin', 'ffmpeg.exe')
            if (fs.existsSync(candidate)) return candidate
          }
        }
      }
    }
  }

  // 3. Check Program Files
  const candidates = [
    'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\ffmpeg\\bin\\ffmpeg.exe',
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) return c
  }

  return null
}

const ffmpegBin = findFfmpeg()
if (!ffmpegBin) {
  console.error('\n❌ ERROR: ffmpeg is not installed or could not be found.')
  console.error('Please install ffmpeg on Windows by running:')
  console.error('  winget install Gyan.FFmpeg\n')
  process.exit(1)
}

console.log(`Using ffmpeg: ${ffmpegBin}`)

// Ensure directories
if (!fs.existsSync(originalsDir)) {
  fs.mkdirSync(originalsDir, { recursive: true })
}
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true })
}

// Move any existing reel-*.mp4 from public/reels/ into _originals/ if not already moved
const rootReelsFiles = fs.readdirSync(reelsDir)
for (const file of rootReelsFiles) {
  if (file.startsWith('reel-') && file.endsWith('.mp4')) {
    const srcPath = path.join(reelsDir, file)
    const destPath = path.join(originalsDir, file)
    if (!fs.existsSync(destPath)) {
      console.log(`Moving original ${file} -> public/reels/_originals/${file}`)
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Read all originals
const originals = fs.readdirSync(originalsDir).filter(f => f.endsWith('.mp4')).sort()
if (originals.length === 0) {
  console.log('No video files found in public/reels/_originals/')
  process.exit(0)
}

console.log(`\nFound ${originals.length} video(s) to optimize:\n`)

const results = []

for (const origFile of originals) {
  const inPath = path.join(originalsDir, origFile)
  const baseName = path.basename(origFile, path.extname(origFile))
  const outVideo = path.join(reelsDir, `${baseName}.mp4`)
  const outPoster = path.join(postersDir, `${baseName}.webp`)

  const origSize = fs.statSync(inPath).size

  console.log(`--- Processing ${origFile} (${(origSize / (1024 * 1024)).toFixed(2)} MB) ---`)

  // 1. Optimize Video
  // 540x960, H.264, crf 30, preset slow, no audio (-an), max 12 seconds, 24 fps, +faststart
  const videoCmd = `"${ffmpegBin}" -y -i "${inPath}" -t 12 -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,fps=24" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an -movflags +faststart "${outVideo}"`
  execSync(videoCmd, { stdio: 'inherit' })

  // 2. Generate Poster WebP
  // first good frame at 1s, 540x960, quality 75
  const posterCmd = `"${ffmpegBin}" -y -ss 1 -i "${inPath}" -frames:v 1 -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960" -quality 75 "${outPoster}"`
  execSync(posterCmd, { stdio: 'inherit' })

  const newVideoSize = fs.statSync(outVideo).size
  const posterSize = fs.statSync(outPoster).size

  results.push({
    file: origFile,
    origSize,
    newVideoSize,
    posterSize,
  })
}

// Summary Report
console.log('\n======================================================')
console.log('REELS OPTIMIZATION SUMMARY')
console.log('======================================================')
let totalOrig = 0
let totalNewVideo = 0
let totalPoster = 0

for (const r of results) {
  totalOrig += r.origSize
  totalNewVideo += r.newVideoSize
  totalPoster += r.posterSize
  console.log(
    `${r.file.padEnd(12)}: Original ${(r.origSize / 1024 / 1024).toFixed(2)} MB -> Compressed ${(r.newVideoSize / 1024 / 1024).toFixed(2)} MB | Poster ${(r.posterSize / 1024).toFixed(1)} KB`
  )
}

const totalOptimized = totalNewVideo + totalPoster
console.log('------------------------------------------------------')
console.log(`Original total size : ${(totalOrig / 1024 / 1024).toFixed(2)} MB`)
console.log(`Compressed videos   : ${(totalNewVideo / 1024 / 1024).toFixed(2)} MB`)
console.log(`WebP posters        : ${(totalPoster / 1024).toFixed(1)} KB`)
console.log(`Total public/reels  : ${(totalOptimized / 1024 / 1024).toFixed(2)} MB (Target: < 8 MB)`)
console.log(`Reduction           : ${(((totalOrig - totalOptimized) / totalOrig) * 100).toFixed(1)}%`)
console.log('======================================================\n')
