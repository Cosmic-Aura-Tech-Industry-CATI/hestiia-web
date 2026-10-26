import os
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

VIEWPORTS = [
    {"name": "390x844_mobile",  "width": 390,  "height": 844,  "label": "iPhone 12 (Mobile)"},
    {"name": "768x1024_tablet", "width": 768,  "height": 1024, "label": "iPad Portrait (Tablet)"},
    {"name": "1440x900_desktop","width": 1440, "height": 900,  "label": "Desktop 1440x900"},
]

SCREENSHOT_DIR = "artifacts/gallery_ring_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()

    for vp in VIEWPORTS:
        ctx = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
        page = ctx.new_page()
        page.goto("http://localhost:5173/", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        # Scroll to gallery
        page.evaluate("document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' })")
        page.wait_for_timeout(1300)

        # Screenshot initial entrance resting state
        page.screenshot(path=f"{SCREENSHOT_DIR}/{vp['name']}_initial.png")

        # Check DOM presence of ring, cards, active caption
        check = page.evaluate("""() => {
            const gallery = document.getElementById('gallery');
            const ring = gallery?.querySelector('.gallery-ring-plane');
            const cards = gallery?.querySelectorAll('.gallery-ring-card-wrapper');
            const caption = gallery?.querySelector('.gallery-active-caption-area');
            const hint = gallery?.innerText.includes('Drag or Swipe to Browse Photos');

            const w = window.innerWidth;
            const scrollW = document.documentElement.scrollWidth;
            const hasHorizOverflow = scrollW > w + 2;

            return {
                galleryPresent: !!gallery,
                ringPresent: !!ring,
                cardCount: cards ? cards.length : 0,
                captionText: caption?.innerText.trim().slice(0, 40),
                hintPresent: !!hint,
                hasHorizOverflow,
            };
        }""")

        print(f"[{vp['label']}] RingPresent={check['ringPresent']}, Cards={check['cardCount']}, Caption='{check['captionText']}', Overflow={check['hasHorizOverflow']}", flush=True)

        # If desktop, test drag / swipe rotation
        if vp["width"] >= 768:
            # Drag carousel
            page.mouse.move(vp["width"] // 2, 450)
            page.mouse.down()
            page.mouse.move(vp["width"] // 2 - 200, 450, steps=10)
            page.mouse.up()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{SCREENSHOT_DIR}/{vp['name']}_after_drag.png")

            # Click a card to open lightbox
            page.evaluate("""() => {
                const card = document.querySelectorAll('.gallery-ring-card-wrapper [role=\"button\"]')[0];
                if (card) card.click();
            }""")
            page.wait_for_timeout(600)
            page.screenshot(path=f"{SCREENSHOT_DIR}/{vp['name']}_lightbox_open.png")

            # Press Escape to close lightbox
            page.keyboard.press("Escape")
            page.wait_for_timeout(400)
            page.screenshot(path=f"{SCREENSHOT_DIR}/{vp['name']}_lightbox_closed.png")

        ctx.close()

    browser.close()

print("-- Gallery Ring Verification Complete --", flush=True)
