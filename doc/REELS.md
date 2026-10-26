# Hestiia Reels Assets & Optimization Guide

This document lists the expected video and poster image assets for the landing page `ReelsSection` (`src/components/home/ReelsSection.tsx`) and provides recommended `ffmpeg` commands for optimal web playback (vertical 9:16 aspect ratio).

---

## 1. Expected Files in `public/reels/`

Place the following files in `public/reels/`:

| Filename | Type | Dimensions | Aspect Ratio | Description |
| :--- | :--- | :--- | :--- | :--- |
| `reel-1.mp4` | Video (H.264 / AAC) | 1080×1920 (or 720×1280) | 9:16 | Slow Simmered Heritage (Dal / Curries) |
| `reel-1-poster.jpg` | Poster Image | 1080×1920 (or 720×1280) | 9:16 | First frame or hero still of Reel 1 |
| `reel-2.mp4` | Video (H.264 / AAC) | 1080×1920 (or 720×1280) | 9:16 | The Sizzling Wok (Indo-Chinese noodles) |
| `reel-2-poster.jpg` | Poster Image | 1080×1920 (or 720×1280) | 9:16 | First frame or hero still of Reel 2 |
| `reel-3.mp4` | Video (H.264 / AAC) | 1080×1920 (or 720×1280) | 9:16 | Atmospheric Dining Hall (Ambience & lanterns) |
| `reel-3-poster.jpg` | Poster Image | 1080×1920 (or 720×1280) | 9:16 | First frame or hero still of Reel 3 |
| `reel-4.mp4` | Video (H.264 / AAC) | 1080×1920 (or 720×1280) | 9:16 | Royal Vegetarian Feast (Grand Thali spread) |
| `reel-4-poster.jpg` | Poster Image | 1080×1920 (or 720×1280) | 9:16 | First frame or hero still of Reel 4 |
| `reel-5.mp4` | Video (H.264 / AAC) | 1080×1920 (or 720×1280) | 9:16 | Saffron Badam Kheer (Dessert preparation) |
| `reel-5-poster.jpg` | Poster Image | 1080×1920 (or 720×1280) | 9:16 | First frame or hero still of Reel 5 |

> **Note on Fallback Behavior:** If a video file is not present on disk, the UI gracefully renders a poster tile with a link to Instagram. If the entire reels list is empty, the component renders nothing.

---

## 2. Recommended `ffmpeg` Commands

### A. Convert Input Video to 9:16 Web-Optimized MP4 (720×1280, Fast Start, CRF 23)

To ensure smooth 60fps streaming and minimal payload for mobile connections, use this command:

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -profile:v high -level 4.0 \
  -pix_fmt yuv420p \
  -crf 23 -preset slow \
  -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac -b:a 128k -ar 44100 \
  -movflags +faststart \
  public/reels/reel-1.mp4
```

**Key Flags Explained:**
- `-vf scale=720:1280...`: Scales to standard 720p vertical resolution with aspect ratio protection.
- `-movflags +faststart`: Moves the `moov` atom to the front of the file so video starts playing immediately without waiting for full download.
- `-crf 23`: Optimal visual quality-to-filesize balance for web video.
- `-pix_fmt yuv420p`: Ensures 100% compatibility across Safari, iOS, Chrome, and Android.

---

### B. Extract High-Quality First-Frame Poster Image

Extract a clean still frame at 1 second to use as the reel poster:

```bash
ffmpeg -ss 00:00:01.000 -i public/reels/reel-1.mp4 \
  -vframes 1 -q:v 2 \
  public/reels/reel-1-poster.jpg
```
