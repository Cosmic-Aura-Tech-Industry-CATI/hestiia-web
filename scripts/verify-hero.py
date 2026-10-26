import os
import json
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"name": "320x568_iphone_se", "width": 320, "height": 568, "label": "320x568 (iPhone SE 1st gen)"},
    {"name": "360x640_android_sm", "width": 360, "height": 640, "label": "360x640 (Android small)"},
    {"name": "375x667_iphone_8", "width": 375, "height": 667, "label": "375x667 (iPhone 8 / SE2)"},
    {"name": "390x844_iphone_12", "width": 390, "height": 844, "label": "390x844 (iPhone 12/13/14)"},
    {"name": "412x915_android_lg", "width": 412, "height": 915, "label": "412x915 (Android large)"},
    {"name": "768x1024_ipad_port", "width": 768, "height": 1024, "label": "768x1024 (iPad Portrait)"},
    {"name": "1024x768_ipad_land", "width": 1024, "height": 768, "label": "1024x768 (iPad Landscape)"},
    {"name": "1280x720_desktop_std", "width": 1280, "height": 720, "label": "1280x720 (Desktop standard)"},
    {"name": "1440x900_desktop_hi", "width": 1440, "height": 900, "label": "1440x900 (Desktop high)"},
    {"name": "1920x1080_desktop_fhd", "width": 1920, "height": 1080, "label": "1920x1080 (Desktop full HD)"},
    {"name": "844x390_phone_land", "width": 844, "height": 390, "label": "844x390 (Landscape Phone)"},
]

os.makedirs("artifacts/hero_screenshots", exist_ok=True)

results = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    
    for vp in VIEWPORTS:
        context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
        page = context.new_page()
        page.goto("http://localhost:5173/", wait_until="networkidle")
        
        # Wait a moment for preloader or animations
        page.wait_for_timeout(1000)
        
        screenshot_path = f"artifacts/hero_screenshots/{vp['name']}.png"
        page.screenshot(path=screenshot_path)
        
        # Run programmatic DOM checks in browser
        eval_result = page.evaluate("""() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const scrollWidth = document.documentElement.scrollWidth;
            const hasHorizontalScroll = scrollWidth > width;
            
            const header = document.querySelector('header.navbar');
            const headerRect = header ? header.getBoundingClientRect() : null;
            
            const elements = {
                eyebrow: document.querySelector('.hero__eyebrow'),
                title: document.querySelector('.hero__title'),
                subtitle: document.querySelector('.hero__subtitle'),
                reserveBtn: document.getElementById('hero-reserve-btn'),
                menuBtn: document.getElementById('hero-menu-btn'),
                callBtn: document.getElementById('hero-call-btn'),
                scrollCue: document.querySelector('.hero__scroll-cue')
            };
            
            const boxes = {};
            for (const [key, el] of Object.entries(elements)) {
                if (el && el.offsetParent !== null) {
                    const rect = el.getBoundingClientRect();
                    boxes[key] = {
                        top: rect.top,
                        bottom: rect.bottom,
                        left: rect.left,
                        right: rect.right,
                        width: rect.width,
                        height: rect.height,
                        visible: window.getComputedStyle(el).display !== 'none'
                    };
                }
            }
            
            // Check collisions between any pair of visible elements
            const collisions = [];
            const keys = Object.keys(boxes).filter(k => boxes[k].visible);
            for (let i = 0; i < keys.length; i++) {
                for (let j = i + 1; j < keys.length; j++) {
                    const a = boxes[keys[i]];
                    const b = boxes[keys[j]];
                    // Check intersection
                    const intersects = !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
                    if (intersects) {
                        collisions.push(`${keys[i]} intersects with ${keys[j]}`);
                    }
                }
            }
            
            // Check clipping (element outside bounds)
            const clippings = [];
            for (const [k, box] of Object.entries(boxes)) {
                if (!box.visible) continue;
                if (box.left < 0 || box.right > width + 2) {
                    clippings.push(`${k} horizontally clipped (left: ${box.left}, right: ${box.right}, viewport: ${width})`);
                }
            }
            
            // Check header overlap (if header is solid, but over hero header is transparent)
            const headerOverlaps = [];
            if (headerRect && headerRect.height > 0) {
                for (const [k, box] of Object.entries(boxes)) {
                    if (!box.visible) continue;
                    // In hero, content starts below header: box.top >= headerRect.bottom - 4
                    if (box.top < headerRect.bottom) {
                        headerOverlaps.push(`${k} sits above header bottom (top: ${box.top}, headerBottom: ${headerRect.bottom})`);
                    }
                }
            }
            
            const videoEl = document.querySelector('video.hero__video');
            const videoAttrs = videoEl ? {
                autoplay: videoEl.autoplay,
                muted: videoEl.muted,
                loop: videoEl.loop,
                playsinline: videoEl.playsInline,
                preload: videoEl.preload,
                ariaHidden: videoEl.getAttribute('aria-hidden'),
                disablePictureInPicture: videoEl.disablePictureInPicture,
                currentSrc: videoEl.currentSrc
            } : null;
            
            return {
                width,
                height,
                scrollWidth,
                hasHorizontalScroll,
                collisions,
                clippings,
                headerOverlaps,
                boxes,
                videoAttrs
            };
        }""")
        
        eval_result["viewport"] = vp
        eval_result["screenshot"] = screenshot_path
        results.append(eval_result)
        context.close()
        print(f"Tested {vp['label']}: Collisions={len(eval_result['collisions'])}, Clippings={len(eval_result['clippings'])}, HorizScroll={eval_result['hasHorizontalScroll']}")
        
    browser.close()

with open("artifacts/verification_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nVerification complete! Saved results to artifacts/verification_results.json")
