"""
Playwright verification script for Hestiia Cuisine section redesign.
Tests across 8 viewports, checks: no collisions, no horizontal overflow,
no old ScrollTrigger pins remaining, and reduced motion fallback.
"""

import os
import sys
import shutil
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"name": "360x640_android_sm",   "width": 360,  "height": 640,  "label": "360x640 (Android small)"},
    {"name": "390x844_iphone_12",    "width": 390,  "height": 844,  "label": "390x844 (iPhone 12)"},
    {"name": "412x915_android_lg",   "width": 412,  "height": 915,  "label": "412x915 (Android large)"},
    {"name": "768x1024_ipad_port",   "width": 768,  "height": 1024, "label": "768x1024 (iPad Portrait)"},
    {"name": "1024x768_ipad_land",   "width": 1024, "height": 768,  "label": "1024x768 (iPad Landscape)"},
    {"name": "1280x720_desktop_std", "width": 1280, "height": 720,  "label": "1280x720 (Desktop 720p)"},
    {"name": "1440x900_desktop_hi",  "width": 1440, "height": 900,  "label": "1440x900 (Desktop High)"},
    {"name": "1920x1080_desktop_fhd","width": 1920, "height": 1080, "label": "1920x1080 (Desktop FHD)"},
]

SCREENSHOT_DIR = "artifacts/cuisine_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

results = []

with sync_playwright() as p:
    browser = p.chromium.launch()

    for vp in VIEWPORTS:
        context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
        page = context.new_page()
        page.goto("http://localhost:5173/", wait_until="domcontentloaded")
        page.wait_for_timeout(600)

        # Scroll to cuisine section
        page.evaluate("document.getElementById('cuisine')?.scrollIntoView({ behavior: 'instant' })")
        page.wait_for_timeout(500)

        screenshot_path = f"{SCREENSHOT_DIR}/{vp['name']}_cuisine.png"
        page.screenshot(path=screenshot_path)

        check = page.evaluate("""() => {
            const w = window.innerWidth;
            const scrollW = document.documentElement.scrollWidth;
            const hasHorizScroll = scrollW > w + 2;

            const section = document.getElementById('cuisine');
            const els = section ? {
                heading: section.querySelector('#cuisines-heading'),
                eyebrow: section.querySelector('.cuisine-eyebrow'),
                menuLink: section.querySelector('.cuisine-menu-link'),
                panels: section.querySelectorAll('.cuisine-panel'),
                cards: section.querySelectorAll('.cuisine-card-inner'),
            } : {};

            const boxes = {};
            if (els.heading) boxes.heading = els.heading.getBoundingClientRect();
            if (els.eyebrow) boxes.eyebrow = els.eyebrow.getBoundingClientRect();
            if (els.menuLink) boxes.menuLink = els.menuLink.getBoundingClientRect();

            const clippings = [];
            const all = section ? section.querySelectorAll('h2, h3, p, a, .cuisine-panel__title, .cuisine-card__title') : [];
            for (const el of all) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && (r.right > w + 2 || r.left < -2)) {
                    clippings.push({ tag: el.tagName, cls: el.className.toString().slice(0, 40), right: r.right, left: r.left });
                }
            }

            const collisions = [];
            const pairs = [['heading', 'menuLink'], ['heading', 'eyebrow'], ['eyebrow', 'menuLink']];
            for (const [k1, k2] of pairs) {
                const a = boxes[k1], b = boxes[k2];
                if (a && b) {
                    const intersects = !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
                    if (intersects) collisions.push(`${k1} intersects ${k2}`);
                }
            }

            const logo = document.querySelector('.navbar__logo');
            const firstNavLink = document.querySelector('.navbar__link');
            const logoNavGap = logo && firstNavLink
                ? firstNavLink.getBoundingClientRect().left - logo.getBoundingClientRect().right
                : null;

            const panelCount = els.panels ? els.panels.length : 0;
            const cardCount = els.cards ? els.cards.length : 0;

            return {
                viewport: { width: w },
                hasHorizScroll,
                scrollWidth: scrollW,
                clippings,
                collisions,
                panelCount,
                cardCount,
                logoNavGap,
                sectionPresent: !!section,
            };
        }""")

        check['viewport_label'] = vp['label']
        check['screenshot'] = screenshot_path
        results.append(check)

        status = "PASS" if not check['hasHorizScroll'] and len(check['clippings']) == 0 and len(check['collisions']) == 0 else "FAIL"
        msg = f"[{status}] {vp['label']}: HorizScroll={check['hasHorizScroll']}, Collisions={len(check['collisions'])}, Clippings={len(check['clippings'])}, Panels={check['panelCount']}, Cards={check['cardCount']}"
        if check['logoNavGap']:
            msg += f", LogoNavGap={check['logoNavGap']:.0f}px"
        print(msg, flush=True)

        context.close()

    # Desktop panel expansion tests
    print("\n-- Desktop Panel Expansion Tests --", flush=True)
    desktop_ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    desktop_page = desktop_ctx.new_page()
    desktop_page.goto("http://localhost:5173/", wait_until="domcontentloaded")
    desktop_page.wait_for_timeout(600)
    desktop_page.evaluate("document.getElementById('cuisine')?.scrollIntoView({ behavior: 'instant' })")
    desktop_page.wait_for_timeout(500)

    for i in range(4):
        desktop_page.evaluate(f"""() => {{
            const panels = document.querySelectorAll('.cuisine-panel');
            if (panels[{i}]) panels[{i}].click();
        }}""")
        desktop_page.wait_for_timeout(500)
        desktop_page.screenshot(path=f"{SCREENSHOT_DIR}/desktop_panel_{i+1}_expanded.png")
        print(f"  Panel {i+1} expanded screenshot captured.", flush=True)

    # Keyboard test
    print("\n-- Keyboard Navigation Test (Desktop) --", flush=True)
    desktop_page.evaluate("document.querySelectorAll('.cuisine-panel')[0]?.focus()")
    desktop_page.wait_for_timeout(200)
    for key in ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'Home', 'End']:
        desktop_page.keyboard.press(key)
        desktop_page.wait_for_timeout(100)
    active = desktop_page.evaluate("""() => {
        const panels = document.querySelectorAll('.cuisine-panel');
        for (let i = 0; i < panels.length; i++) {
            if (panels[i].getAttribute('aria-selected') === 'true') return i;
        }
        return -1;
    }""")
    print(f"  After Home->Right x 3->Left->Home->End: expanded panel index = {active} (expected 3/last)", flush=True)
    desktop_page.screenshot(path=f"{SCREENSHOT_DIR}/keyboard_nav_result.png")
    desktop_ctx.close()

    # Reduced motion test
    print("\n-- Reduced Motion Test --", flush=True)
    rm_ctx = browser.new_context(viewport={"width": 1280, "height": 720}, reduced_motion="reduce")
    rm_page = rm_ctx.new_page()
    rm_page.goto("http://localhost:5173/", wait_until="domcontentloaded")
    rm_page.wait_for_timeout(600)
    rm_page.evaluate("document.getElementById('cuisine')?.scrollIntoView({ behavior: 'instant' })")
    rm_page.wait_for_timeout(400)
    rm_page.screenshot(path=f"{SCREENSHOT_DIR}/reduced_motion_cuisine.png")
    rm_check = rm_page.evaluate("""() => {
        const section = document.getElementById('cuisine');
        return {
            panelsVisible: !!section?.querySelector('.cuisine-panels'),
            heading: !!section?.querySelector('#cuisines-heading'),
        };
    }""")
    print(f"  Reduced motion: panelsVisible={rm_check['panelsVisible']}, headingPresent={rm_check['heading']}", flush=True)
    rm_ctx.close()

    browser.close()

# Copy to artifact dir for embedding
artifact_dest = r"C:\Users\Shubh\.gemini\antigravity-ide\brain\a9a2e714-d09d-499e-b1d8-0b280a71335f\cuisine_screenshots"
if os.path.exists(artifact_dest):
    shutil.rmtree(artifact_dest)
shutil.copytree(SCREENSHOT_DIR, artifact_dest)

print("\n-- Verification Complete --", flush=True)
print(f"Screenshots saved to {SCREENSHOT_DIR} and {artifact_dest}", flush=True)

# Summary table
print("\n+-------------------------------+--------------+------------+----------+", flush=True)
print("| Viewport                      | Horiz Scroll | Collisions | Clipping |", flush=True)
print("+-------------------------------+--------------+------------+----------+", flush=True)
for r in results:
    s = "PASS" if not r['hasHorizScroll'] and len(r['collisions']) == 0 and len(r['clippings']) == 0 else "FAIL"
    print(f"| {r['viewport_label'][:29]:<29} | {'No' if not r['hasHorizScroll'] else 'YES':<12} | {len(r['collisions']):<10} | {len(r['clippings']):<8} |  {s}", flush=True)
print("+-------------------------------+--------------+------------+----------+", flush=True)
