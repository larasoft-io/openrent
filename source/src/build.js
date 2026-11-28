#!/usr/bin/env node
// Static generator for the openrent.me mock-up.  Usage: node src/build.js [--only <role>] [--check]
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const shell = require('./lib/shell');
const art = require('./lib/art');
const ui = require('./lib/ui');
const data = require('./lib/data');
const states = require('./lib/states');

const tidy = html => html.replace(/<a\b([^>]*)href="#"([^>]*)>/g, (m, a, b) => /data-(toast|sheet|close|back)/.test(m) ? m : `<a${a}href="#"${b} data-toast="Not wired up in this mock-up">`);
const write = (rel, content) => { if (rel.endsWith('.html')) content = tidy(content); const f = path.join(dist, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content); };
const copy = (from, rel) => { const f = path.join(dist, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.copyFileSync(from, f); };

/* ---- assets ---- */
function assets() {
  let css = fs.readFileSync(path.join(root, 'src/css/app.css'), 'utf8');
  const rolesCss = path.join(root, 'src/css/roles');
  if (fs.existsSync(rolesCss)) fs.readdirSync(rolesCss).filter(f => f.endsWith('.css')).sort().forEach(f => { css += `\n/* ---- ${f} ---- */\n` + fs.readFileSync(path.join(rolesCss, f), 'utf8'); });
  write('assets/css/app.css', css);
  if (fs.existsSync(path.join(root, 'src/css/site.css'))) copy(path.join(root, 'src/css/site.css'), 'assets/css/site.css');
  fs.readdirSync(path.join(root, 'src/js')).forEach(f => copy(path.join(root, 'src/js', f), 'assets/js/' + f));
  const nm = path.join(root, 'node_modules');
  copy(path.join(nm, '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2'), 'assets/fonts/bricolage-grotesque.woff2');
  copy(path.join(nm, '@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2'), 'assets/fonts/figtree.woff2');
  copy(path.join(nm, '@fontsource-variable/figtree/files/figtree-latin-wght-italic.woff2'), 'assets/fonts/figtree-italic.woff2');
  copy(path.join(nm, '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2'), 'assets/fonts/plex-arabic-400.woff2');
  copy(path.join(nm, '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2'), 'assets/fonts/plex-arabic-600.woff2');

  const img = {
    'p1.svg': art.marina(1, 'dusk'), 'p2.svg': art.midrise(4), 'p3.svg': art.villa(5), 'p4.svg': art.canal(3),
    'p5.svg': art.lakeside(7), 'p6.svg': art.downtown(2), 'p7.svg': art.townhouse(6),
    'x1.svg': art.marina(21, 'blue'), 'x2.svg': art.midrise(22, '#DCE7E3'), 'x3.svg': art.canal(23), 'x4.svg': art.downtown(24), 'x5.svg': art.lakeside(25), 'x6.svg': art.marina(31, 'dusk'),
    'living-a.svg': art.living(11), 'living-b.svg': art.living(15, { sofa: '#C96F4A', acc: '#0B6B5D', wall: '#F1ECE3', sky: 'dusk' }), 'living-c.svg': art.living(17, { sofa: '#3D5A80', acc: '#E7A93B', wall: '#ECE7E0', sky: 'blue' }), 'living-d.svg': art.living(19, { sofa: '#8C7B62', acc: '#F0653A', wall: '#F3EEE4', sky: 'day' }),
    'bedroom-a.svg': art.bedroom(12), 'bedroom-b.svg': art.bedroom(16, { acc: '#3D5A80', throw: '#E7A93B', sky: 'dusk' }), 'bedroom-c.svg': art.bedroom(18, { acc: '#8C5A6B', throw: '#0B6B5D', sky: 'day' }),
    'kitchen-a.svg': art.kitchen(13), 'kitchen-b.svg': art.kitchen(14, { cab: '#3D4F5C', acc: '#E7A93B' }), 'kitchen-c.svg': art.kitchen(15, { cab: '#8C7B62' }),
    'bath-a.svg': art.bathroom(14), 'bath-b.svg': art.bathroom(15, { acc: '#C96F4A' }),
    'map.svg': art.map([[118, 372, 'AED 105k', true], [300, 452, '54k'], [545, 232, '135k'], [612, 196, '195k'], [215, 400, '92k'], [400, 328, '78k'], [505, 432, '240k']]),
    'map-marina.svg': art.map([[118, 372, 'Marina Gate 1', true]]),
    'map-jvc.svg': art.map([[300, 452, 'Bloom Towers B', true]]),
    'favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${ui.mark().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>`,
  };
  Object.entries(img).forEach(([k, v]) => write('assets/img/' + k, v));
  const shots = path.join(root, 'src/shots');
  if (fs.existsSync(shots)) fs.readdirSync(shots).forEach(f => copy(path.join(shots, f), 'assets/shots/' + f));
}

/* ---- empty / error / loading states, kept per role in src/states/<role>.js as { slug: ctx => ({ loading, empty, error, … }) } ---- */
function pageStates(id, slug, ctx) {
  const f = path.join(root, 'src/states', id + '.js');
  if (!fs.existsSync(f)) return null;
  const def = load(f)[slug];
  return def ? def(ctx) : null;
}

/* ---- load roles & pages ---- */
function load(file) { delete require.cache[require.resolve(file)]; return require(file); }
function build() {
  assets();
  const roles = {};
  fs.readdirSync(path.join(root, 'src/roles')).filter(f => f.endsWith('.js')).sort().forEach(f => { try { const r = load(path.join(root, 'src/roles', f)); roles[r.id] = r; } catch (e) { console.log(`SKIPPED role ${f}: ${e.message}`); } });
  let n = 0;
  for (const id of Object.keys(roles)) {
    if (only && only !== id) continue;
    const dir = path.join(root, 'src/pages', id);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('_')).sort()) {
      let mod; try { mod = load(path.join(dir, f)); } catch (e) { console.log(`SKIPPED ${id}/${f}: ${e.message}`); continue; }
      for (const page of [].concat(mod)) {
        try {
          const ctx = { role: roles[id], roles, data, ui };
          const p = Object.assign({}, page, { body: typeof page.body === 'function' ? page.body(ctx) : page.body, sheets: typeof page.sheets === 'function' ? page.sheets(ctx) : page.sheets });
          const st = pageStates(id, page.slug, ctx); if (st) p.body = states.withStates(p.body, st);
          write(`app/${id}/${page.slug}.html`, shell.appPage(roles[id], p, roles)); n++;
        } catch (e) { console.log(`FAILED ${id}/${page.slug}: ${e.message}`); }
      }
    }
  }
  // stand-alone app pages (hub, rulebook) and marketing site
  for (const [dirName, out] of [['_app', 'app/'], ['_site', '']]) {
    const dir = path.join(root, 'src/pages', dirName);
    if (!fs.existsSync(dir) || (only && only !== '_site')) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      const mod = load(path.join(dir, f));
      for (const page of [].concat(mod)) { write(out + page.slug + '.html', page.render({ roles, data, ui, shell })); n++; }
    }
  }
  console.log(`built ${n} pages → dist/`);
}

/* ---- link checker ---- */
function check() {
  const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dist);
  let bad = 0;
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    const re = /(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"/g; let m;
    while ((m = re.exec(html))) {
      const u = m[1]; if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(u)) continue;
      const target = path.resolve(path.dirname(f), u);
      if (!fs.existsSync(target)) { bad++; console.log(`BROKEN ${path.relative(dist, f)} → ${u}`); }
    }
  }
  console.log(bad ? `${bad} broken links` : `links OK across ${files.length} pages`);
  if (bad) process.exitCode = 1;
}

build();
if (args.includes('--check')) check();
