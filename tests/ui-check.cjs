/* UI regression suite: detects overflow, clipping, overlaps, broken images, console errors.
 * Compares the refreshed site (port 8000) against the original export baseline (port 8001).
 * Run: npm run test:ui  (starts both servers automatically if needed)
 */
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const http = require('http');

const EXE = '/home/bhavya/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];
const TARGETS = [
  { name: 'current', url: 'http://localhost:3000/' },
  { name: 'baseline', url: 'http://localhost:8001/dentel.framer.website/index.html' }
];

function waitForServer(port, tries = 30) {
  return new Promise((resolve, reject) => {
    let n = 0;
    const tick = () => {
      http.get(`http://localhost:${port}/`, (res) => { res.resume(); resolve(); })
        .on('error', () => (++n >= tries ? reject(new Error('server ' + port)) : setTimeout(tick, 500)));
    };
    tick();
  });
}

async function ensureServers() {
  const procs = [];
  // baseline: plain static server for the untouched mirror
  try { await waitForServer(8001, 2); }
  catch {
    procs.push(spawn('python3', ['-m', 'http.server', '8001'], { cwd: process.cwd(), stdio: 'ignore' }));
    await waitForServer(8001);
  }
  // current: vite dev (serves public/, bundles custom.js — exactly what npm run dev gives)
  try { await waitForServer(3000, 2); }
  catch {
    procs.push(spawn('npx', ['vite', '--port', '3000', '--host'], { cwd: process.cwd(), stdio: 'ignore' }));
    await waitForServer(3000, 60);
  }
  return procs;
}

async function analyze(page) {
  // scroll through page slowly so lazy/hydrated content settles
  await page.evaluate(() => new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else { window.scrollTo(0, 0); setTimeout(resolve, 800); }
    };
    step();
  }));
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const out = { hOverflow: 0, clipped: [], overlaps: [], brokenImgs: [], emptyButtons: [] };
    out.hOverflow = Math.max(0, document.documentElement.scrollWidth - vw);

    const isVis = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      if (r.width <= 4 || r.height <= 4 || s.visibility === 'hidden' ||
          s.display === 'none' || parseFloat(s.opacity) <= 0.05) return false;
      // reject elements inside hidden ancestors (responsive duplicates, closed menus)
      let n = el.parentElement, d = 0;
      while (n && n !== document.body && d < 8) {
        const c = getComputedStyle(n);
        if (c.display === 'none' || c.visibility === 'hidden' || parseFloat(c.opacity) === 0) return false;
        n = n.parentElement;
        d++;
      }
      return true;
    };
    const isFixed = (el) => {
      let n = el, d = 0;
      while (n && n !== document.body && d < 8) {
        const p = getComputedStyle(n).position;
        if (p === 'fixed' || p === 'sticky') return true;
        n = n.parentElement;
        d++;
      }
      return false;
    };
    // 1. clipped text: own box too small OR cut by an overflow-hidden ancestor OR running off-viewport
    const texts = [...document.querySelectorAll('h1,h2,h3,h4,p,li,span,a,button')];
    const clipReason = (el) => {
      // walk up to find nearest ancestor that clips
      let node = el.parentElement, depth = 0;
      while (node && node !== document.body && depth < 6) {
        const cs = getComputedStyle(node);
        if (cs.overflowX === 'hidden' || cs.overflowX === 'clip' ||
            cs.overflowY === 'hidden' || cs.overflowY === 'clip') {
          const r = node.getBoundingClientRect(), e = el.getBoundingClientRect();
          if (e.right - r.right > 3 || e.bottom - r.bottom > 4 || r.left - e.left > 3) {
            return 'ancestor:' + (node.tagName.toLowerCase()) + '.' + String(node.className).split(' ')[0];
          }
          break;
        }
        node = node.parentElement;
        depth++;
      }
      return null;
    };
    for (const el of texts) {
      if (!isVis(el)) continue;
      if (el.closest('.bk-wrap')) continue; // our own booking UI, tested separately
      const t = (el.innerText || '').trim();
      if (t.length < 2) continue;
      // only leaf-ish nodes to avoid double counting
      if ([...el.children].some(ch => (ch.innerText || '').trim().length > 2)) continue;
      const dx = el.scrollWidth - el.clientWidth;
      const dy = el.scrollHeight - el.clientHeight;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      let why = null;
      if ((dx > 3 && cs.overflowX !== 'visible') || (dy > 4 && cs.overflowY !== 'visible' && cs.textOverflow !== 'ellipsis')) {
        why = 'self';
      } else {
        why = clipReason(el);
        const offRight = r.right - vw;
        if (!why && offRight > 4 && r.left < vw - 10) why = 'viewport-edge';
      }
      if (why) {
        let ctx = el.tagName.toLowerCase();
        const sec = el.closest('section');
        out.clipped.push({
          where: sec ? sec.getAttribute('data-framer-name') : 'no-section',
          tag: ctx, text: t.slice(0, 60), why,
          dx: Math.round(dx), dy: Math.round(dy)
        });
      }
    }
    // 2. text-on-text overlaps (sample leaf text boxes)
    const boxes = [];
    for (const el of texts) {
      if (!isVis(el)) continue;
      if (isFixed(el)) continue; // fixed/sticky chrome vs scrolling content always "overlaps" in doc coords
      const t = (el.innerText || '').trim();
      if (t.length < 4) continue;
      if ([...el.children].some(ch => (ch.innerText || '').trim().length > 4)) continue;
      const r = el.getBoundingClientRect();
      if (r.top < -2000 || r.top > document.body.scrollHeight + 2000) continue;
      boxes.push({ t: t.slice(0, 40), x: r.left, y: r.top, w: r.width, h: r.height });
      if (boxes.length > 900) break;
    }
    const seen = new Set();
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (Math.abs(a.y - b.y) > 200) continue;
        const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ix > 12 && iy > 8) {
          const key = [a.t, b.t].sort().join('||');
          if (!seen.has(key)) {
            seen.add(key);
            if (out.overlaps.length < 25) out.overlaps.push({ a: a.t, b: b.t });
          }
        }
      }
    }
    // 3. broken images
    for (const img of document.querySelectorAll('img')) {
      if (!isVis(img)) continue;
      if (img.complete && img.naturalWidth === 0) {
        out.brokenImgs.push((img.src || '').slice(0, 100));
        if (out.brokenImgs.length > 15) break;
      }
    }
    // 4. buttons/links with no accessible text
    for (const el of document.querySelectorAll('a,button')) {
      if (!isVis(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      if (!(el.innerText || '').trim() && !el.getAttribute('aria-label') && !el.querySelector('img,svg')) {
        out.emptyButtons.push(((el.className || '') + '').slice(0, 60));
        if (out.emptyButtons.length > 10) break;
      }
    }
    return out;
  });
}

(async () => {
  const servers = await ensureServers();
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const report = {};
  for (const vp of VIEWPORTS) {
    report[vp.name] = {};
    for (const t of TARGETS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const errs = [];
      page.on('pageerror', e => errs.push(String(e.message || e).slice(0, 70)));
      try {
        await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(9000);
        const r = await analyze(page);
        r.pageErrors = [...new Set(errs)];
        report[vp.name][t.name] = r;
        console.log(`done ${vp.name}/${t.name}: hOverflow=${r.hOverflow} clipped=${r.clipped.length} overlaps=${r.overlaps.length} brokenImgs=${r.brokenImgs.length} errs=${r.pageErrors.length}`);
      } catch (e) {
        report[vp.name][t.name] = { fatal: String(e.message).slice(0, 120) };
        console.log(`FATAL ${vp.name}/${t.name}: ${e.message.slice(0, 100)}`);
      }
      await page.close();
    }
  }
  await browser.close();
  for (const p of servers) p.kill();
  require('fs').writeFileSync('tests/ui-report.json', JSON.stringify(report, null, 2));
  console.log('report -> tests/ui-report.json');

  // diff summary: issues in current but not baseline
  const key = (c) => (c.where || '') + '|' + (c.tag || '') + '|' + (c.text || '').slice(0, 30);
  for (const vp of VIEWPORTS) {
    const cur = report[vp.name].current || {}, base = report[vp.name].baseline || {};
    const bKeys = new Set((base.clipped || []).map(key));
    const fresh = (cur.clipped || []).filter(c => !bKeys.has(key(c)));
    console.log(`\n== ${vp.name}: fresh clipped issues (current-only): ${fresh.length} (baseline had ${(base.clipped || []).length}, current ${(cur.clipped || []).length})`);
    for (const f of fresh.slice(0, 30)) console.log(`  [${f.where}] <${f.tag}> "${f.text}" dx=${f.dx} dy=${f.dy}`);
    const bOv = new Set((base.overlaps || []).map(o => o.a + '||' + o.b));
    const freshOv = (cur.overlaps || []).filter(o => !bOv.has(o.a + '||' + o.b));
    console.log(`-- ${vp.name}: fresh overlaps: ${freshOv.length} (baseline ${(base.overlaps || []).length}, current ${(cur.overlaps || []).length})`);
    for (const o of freshOv.slice(0, 20)) console.log(`  "${o.a}"  <>  "${o.b}"`);
  }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
