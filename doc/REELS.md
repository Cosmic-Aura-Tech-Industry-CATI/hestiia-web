# Hestiia Reels Assets & Performance Architecture Guide

This document describes the high-performance media pipeline and runtime architecture for the landing page `ReelsSection` (`src/components/home/ReelsSection.tsx`).

---

## 1. Asset Storage & Directory Layout

```
public/reels/
├── _originals/               # Git-ignored full-size uncompressed source MP4s
│   ├── reel-1.mp4
│   └── ...
├── posters/                  # Extracted WebP poster stills (540x960, < 40 KB each)
│   ├── reel-1.webp
│   ├── reel-2.webp
│   ├── reel-3.webp
│   ├── reel-4.webp
│   └── reel-5.webp
├── reel-1.mp4                # Compressed web MP4 (540x960, 24fps, CRF 30, no audio, < 1.2 MB each)
├── reel-2.mp4
├── reel-3.mp4
├── reel-4.mp4
└── reel-5.mp4
```

> **Total Storage Budget:** All optimized videos + WebP posters in `public/reels/` combine to **~4.01 MB** (well under the 8 MB production budget, down from 29.53 MB original size — an 86.4% reduction).

---

## 2. Automated Media Optimization Script

To optimize reels and generate posters, use the automated Node.js script:

```bash
node scripts/optimize-reels.mjs
```

### Video Compression Specification:
- **Resolution**: 540×960 (vertical 9:16 aspect ratio)
- **Codec**: H.264 (`libx264`), profile High, pixel format `yuv420p`
- **Rate Control**: CRF 30, preset `slow`
- **Framerate**: 24 fps
- **Max Duration**: 12 seconds
- **Audio**: Removed (`-an`) to save bandwidth and decoder memory
- **Streaming**: `+faststart` (moov atom at beginning for instant start)
- **Command**:
  ```bash
  ffmpeg -i IN -t 12 -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,fps=24" \
    -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an -movflags +faststart OUT.mp4
  ```

### Poster Generation Specification:
- **Resolution**: 540×960
- **Format**: WebP (`-quality 75`)
- **Frame**: Captured at 1.0 second
- **Command**:
  ```bash
  ffmpeg -ss 1 -i IN -frames:v 1 -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960" -quality 75 OUT.webp
  ```

---

## 3. Runtime Architecture & Memory Management

To eliminate browser "Out of Memory" crashes, the component adheres to the **Active Video Manager** rules:

1. **Poster-First Rule**: Every card in the marquee track renders only a lightweight `<img>` poster by default.
2. **At Most ONE Video Rule**: Across the entire reels section, at most **1 `<video>` element** is mounted in the DOM at any given moment.
3. **Desktop Hover Playback**: Hovering a card triggers playback after a 300 ms debounce; mouse leaving deactivates the video.
4. **Mobile Center Playback**: On viewports `< 1024px`, an `IntersectionObserver` with threshold `0.6` detects the centered card in a native scroll-snap carousel and activates preview playback.
5. **Memory Release on Unmount**: When a card deactivates or unmounts, it immediately runs:
   ```javascript
   video.pause();
   video.removeAttribute('src');
   video.load();
   ```
   This frees Chromium/WebKit hardware decoding buffers and surfaces.
6. **Fullscreen Modal**: Contains exactly one `<video>` element. Navigating previous/next swaps the `src` attribute on that single element.
7. **No Per-Card Blur / Shaders**: All cards, badges, and buttons use solid `rgba` backgrounds (`backdrop-filter` removed). A single shared spotlight overlay is positioned on the track via CSS custom properties `--spotlight-x` and `--spotlight-y` throttled by `requestAnimationFrame`.
8. **Live Media Dev Monitor**: In `import.meta.env.DEV`, a background watcher checks live `<video>` counts every 2 seconds to guarantee the whole page never exceeds 2 live videos (Hero + 1 Reel).
