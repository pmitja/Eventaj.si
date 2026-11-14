// Clean-browser check for an eventaj redesign page.
// Usage: node .claude/skills/eventaj-redesign/verify.mjs <url> <outDir>
// Uses a fresh headless Chromium-family profile (Brave, Chrome or Edge) over CDP; set BROWSER to override.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [url, outDir = path.join(os.tmpdir(), 'eventaj-verify')] = process.argv.slice(2);
if (!url) { console.error('usage: verify.mjs <url> [outDir]'); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });

const candidates = [
  process.env.BROWSER,
  'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => fs.existsSync(p));
if (!browser) { console.error('No Chromium browser found; set BROWSER'); process.exit(2); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9300 + Math.floor(Math.random() * 400);
const report = {};

for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ev-prof-'));
  const proc = spawn(browser, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
  try {
    let target;
    for (let i = 0; i < 50 && !target; i++) {
      await sleep(300);
      try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {}
    }
    if (!target) throw new Error('browser did not start');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r));
    let id = 0; const pending = new Map(); const errors = [];
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
      if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] ?? 'exception');
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 200));
    });
    const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

    await send('Page.enable'); await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
    await send('Page.navigate', { url });
    await sleep(9000);

    const marqueeX = `[...document.querySelectorAll('.ev-marquee-track')].map(t => new DOMMatrix(getComputedStyle(t).transform).m41)`;
    const before = await ev(marqueeX);
    await sleep(2000);
    const after = await ev(marqueeX);

    const checks = await ev(`(async () => {
      // Scroll through so lazy images load.
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
      const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll('main *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width && r.right > innerWidth + 1 && !el.closest('.ev-marquee, [class*="overflow-hidden"], [class*="overflow-x"]');
      }).slice(0, 5).map(el => el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.'));
      const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')).slice(0, 10);
      const uneven = [...document.querySelectorAll('.ev-marquee-track')].map(t => {
        const s = [...t.children].map(c => { const r = c.getBoundingClientRect(); return Math.round(r.width) + 'x' + Math.round(r.height); });
        return [...new Set(s)];
      }).filter(s => s.length > 1);
      const italic = [...document.querySelectorAll('main h1, main h2, main h3, main em')].filter(el => getComputedStyle(el).fontStyle === 'italic').length;
      const h1 = [...document.querySelectorAll('h1')].map(h => h.textContent.trim());
      return { overflow, wide, broken, uneven, italic, h1 };
    })()`);

    report[w] = {
      ...checks,
      marqueeMoving: before?.map((b, i) => Math.round(b) !== Math.round(after[i])) ?? [],
      consoleErrors: errors.filter((e) => !/Download the React DevTools/.test(e)).slice(0, 10),
    };

    const { result } = await send('Page.getLayoutMetrics');
    const fullH = Math.min(Math.ceil(result.cssContentSize.height), 16000);
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: fullH, deviceScaleFactor: 1, mobile });
    await sleep(800);
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 55, captureBeyondViewport: true });
    const file = path.join(outDir, `page-${w}.jpg`);
    fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
    report[w].screenshot = file;
    ws.close();
  } finally {
    proc.kill();
    await sleep(800);
    fs.rmSync(prof, { recursive: true, force: true, maxRetries: 3 });
  }
}

console.log(JSON.stringify(report, null, 1));
const bad = Object.values(report).some((r) => r.overflow > 0 || r.broken.length || r.uneven.length || r.italic || r.consoleErrors.length);
process.exit(bad ? 1 : 0);
