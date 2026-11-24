// Original illustrated property imagery (procedural SVG) — keeps the mock-up fully offline and licence-free.
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const f = n => Number(n.toFixed(1));
const W = 800, H = 500;
const wrap = (inner, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${inner}</svg>`;
const grad = (id, stops, dir = 'v') => `<linearGradient id="${id}" x1="0" y1="0" x2="${dir === 'h' ? 1 : 0}" y2="${dir === 'h' ? 0 : 1}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;

const SKIES = {
  dusk: [[0, '#2B2A5E'], [.45, '#8A4E86'], [.78, '#F0835A'], [1, '#FBC98A']],
  blue: [[0, '#0C2340'], [.5, '#1F4E7A'], [.85, '#5E93B8'], [1, '#F3C9A0']],
  day: [[0, '#7CC3E8'], [.6, '#BFE3F3'], [1, '#F6EBD8']],
  gold: [[0, '#6FB3D9'], [.55, '#F4D7A6'], [1, '#FBE9CC']],
  morn: [[0, '#9AD0E6'], [.6, '#DDF0EF'], [1, '#FDF3DF']],
  teal: [[0, '#0E3B43'], [.5, '#1E6F73'], [.85, '#F0A56B'], [1, '#FAD9A8']],
};

function tower(r, x, w, top, base, o) {
  // o: fill, lit (window colour), night, crown
  let s = '';
  const crown = o.crown ?? Math.floor(r() * 5);
  s += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(base - top)}" fill="${o.fill}"/>`;
  if (crown === 1) s += `<rect x="${f(x + w * .2)}" y="${f(top - 22)}" width="${f(w * .6)}" height="24" fill="${o.fill}"/><rect x="${f(x + w * .47)}" y="${f(top - 52)}" width="${f(Math.max(2, w * .06))}" height="32" fill="${o.fill}"/>`;
  if (crown === 2) s += `<polygon points="${f(x)},${f(top)} ${f(x + w)},${f(top - 30)} ${f(x + w)},${f(top + 1)}" fill="${o.fill}"/>`;
  if (crown === 3) s += `<path d="M${f(x)},${f(top + 1)} Q${f(x + w / 2)},${f(top - 40)} ${f(x + w)},${f(top + 1)} Z" fill="${o.fill}"/>`;
  if (crown === 4) s += `<rect x="${f(x + w * .12)}" y="${f(top - 12)}" width="${f(w * .76)}" height="14" fill="${o.fill}"/><rect x="${f(x + w * .3)}" y="${f(top - 24)}" width="${f(w * .4)}" height="14" fill="${o.fill}"/>`;
  if (o.lit) {
    const cw = o.cell || 9, ch = o.cellH || 11, cols = Math.floor((w - 8) / cw), rows = Math.floor((base - top - 10) / ch);
    const ox = x + (w - cols * cw) / 2 + 1.5;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const p = r(); if (p > (o.density ?? .5)) continue;
      s += `<rect x="${f(ox + i * cw)}" y="${f(top + 8 + j * ch)}" width="${cw - 3.5}" height="${ch - 5}" rx=".8" fill="${o.lit}" opacity="${f(.35 + r() * .65)}"/>`;
    }
  } else if (o.bands) {
    for (let y = top + 10; y < base - 6; y += o.bandGap || 14) s += `<rect x="${f(x + 4)}" y="${f(y)}" width="${f(w - 8)}" height="${o.bandH || 6}" rx="1" fill="${o.bands}" opacity="${o.bandOp || .55}"/>`;
  }
  return s;
}

function skyline(r, o) {
  let s = '', x = o.x0;
  while (x < o.x1) {
    const w = o.minW + r() * (o.maxW - o.minW), h = o.minH + r() * (o.maxH - o.minH);
    s += tower(r, x, w, o.base - h, o.base, o);
    x += w + (o.gap ?? 4) + r() * (o.gapVar ?? 10);
  }
  return s;
}

function palm(x, y, h, c = '#1E5A45', trunk = '#6B4B33', lean = 8) {
  const tx = x + lean, ty = y - h; let s = `<path d="M${f(x)},${f(y)} Q${f(x + lean * .2)},${f(y - h * .5)} ${f(tx)},${f(ty)}" stroke="${trunk}" stroke-width="${f(Math.max(3, h * .06))}" fill="none" stroke-linecap="round"/>`;
  const L = h * .46;
  [[-1, -.25], [-.85, .25], [-.45, -.6], [.45, -.6], [.85, .25], [1, -.25], [0, -.75]].forEach(([dx, dy]) => {
    const ex = tx + dx * L, ey = ty + dy * L * .7 + L * .28;
    s += `<path d="M${f(tx)},${f(ty)} Q${f(tx + dx * L * .55)},${f(ty + dy * L * .9 - L * .22)} ${f(ex)},${f(ey)}" stroke="${c}" stroke-width="${f(Math.max(4, h * .075))}" fill="none" stroke-linecap="round"/>`;
  });
  return s;
}
function tree(x, y, s = 1, c = '#3F8F68') { return `<rect x="${f(x - 2 * s)}" y="${f(y - 18 * s)}" width="${f(4 * s)}" height="${f(18 * s)}" fill="#6B4B33"/><ellipse cx="${f(x)}" cy="${f(y - 30 * s)}" rx="${f(17 * s)}" ry="${f(20 * s)}" fill="${c}"/><ellipse cx="${f(x - 5 * s)}" cy="${f(y - 34 * s)}" rx="${f(8 * s)}" ry="${f(9 * s)}" fill="#fff" opacity=".14"/>`; }
function water(y, c1, c2, r, glow) {
  let s = `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="url(#wtr)"/>`;
  for (let i = 0; i < 46; i++) { const yy = y + 6 + r() * (H - y - 10), ww = 20 + r() * 90; s += `<rect x="${f(r() * W)}" y="${f(yy)}" width="${f(ww)}" height="2" rx="1" fill="${glow}" opacity="${f(.08 + r() * .3)}"/>`; }
  return s;
}

/* ---------- Exteriors ---------- */
function marina(seed = 1, sky = 'dusk') {
  const r = rng(seed), base = 372;
  const defs = grad('sky', SKIES[sky]) + grad('wtr', [[0, sky === 'blue' ? '#123A5C' : '#3A2F63'], [1, sky === 'blue' ? '#0A1E33' : '#191A3C']]) + `<radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE7B0" stop-opacity=".95"/><stop offset="1" stop-color="#FFE7B0" stop-opacity="0"/></radialGradient>`;
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="${sky === 'blue' ? 610 : 560}" cy="330" r="190" fill="url(#sun)"/>`;
  s += skyline(r, { x0: -20, x1: W, base, minW: 34, maxW: 70, minH: 90, maxH: 210, fill: sky === 'blue' ? '#3F6C93' : '#7A4E86', gap: 2, gapVar: 22 });
  s += skyline(r, { x0: -10, x1: W, base, minW: 46, maxW: 92, minH: 120, maxH: 300, fill: sky === 'blue' ? '#12314F' : '#2A2553', lit: '#FFD98A', density: .46, gap: 10, gapVar: 34 });
  s += `<rect x="0" y="${base - 4}" width="${W}" height="10" fill="#15173A"/>`;
  s += water(base + 4, 0, 0, r, '#FFC98A');
  // yacht
  s += `<g transform="translate(${150 + Math.floor(r() * 380)},${base + 46})"><path d="M0,0 h120 l-14,16 h-92 z" fill="#fff"/><path d="M26,0 l10,-16 h52 l10,16 z" fill="#F4F1EC"/><rect x="42" y="-11" width="40" height="5" rx="2" fill="#23305C"/><rect x="58" y="-34" width="2" height="18" fill="#fff"/></g>`;
  return wrap(s, defs);
}

function downtown(seed = 2) {
  const r = rng(seed), base = 400;
  const defs = grad('sky', SKIES.blue) + grad('wtr', [[0, '#16436A'], [1, '#0B2038']]) + grad('sp', [[0, '#DCEBF5'], [1, '#6E9DC0']], 'h');
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${f(r() * W)}" cy="${f(r() * 180)}" r="${f(.6 + r())}" fill="#fff" opacity="${f(.2 + r() * .5)}"/>`;
  s += skyline(r, { x0: -20, x1: W, base, minW: 40, maxW: 80, minH: 80, maxH: 190, fill: '#2C5B84', gap: 2, gapVar: 16 });
  // signature needle tower (generic stepped spire)
  const cx = 420; let y = base, w = 74; const steps = 9;
  for (let i = 0; i < steps; i++) { const h = 30 + i * 4; s += `<rect x="${f(cx - w / 2)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}" fill="url(#sp)"/>`; for (let k = 0; k < Math.floor(h / 8); k++) s += `<rect x="${f(cx - w / 2 + 3)}" y="${f(y - h + 4 + k * 8)}" width="${f(w - 6)}" height="2" fill="#0C2340" opacity=".22"/>`; y -= h; w *= .8; }
  s += `<rect x="${cx - 1.5}" y="${f(y - 46)}" width="3" height="48" fill="#DCEBF5"/>`;
  s += skyline(r, { x0: -10, x1: 360, base, minW: 50, maxW: 96, minH: 110, maxH: 240, fill: '#0F2A47', lit: '#FFE2A0', density: .42, gap: 12, gapVar: 26 });
  s += skyline(r, { x0: 480, x1: W, base, minW: 50, maxW: 96, minH: 110, maxH: 250, fill: '#0F2A47', lit: '#FFE2A0', density: .42, gap: 12, gapVar: 26 });
  s += `<rect x="0" y="${base - 3}" width="${W}" height="8" fill="#0A1C30"/>` + water(base + 4, 0, 0, r, '#BFE0FF');
  // fountain jets
  for (let i = 0; i < 9; i++) { const fx = 250 + i * 40, fh = 26 + Math.sin(i * .8) * 14 + 20; s += `<path d="M${fx},${base + 40} Q${fx + 4},${base + 40 - fh} ${fx + 10},${base + 40}" stroke="#E8F4FF" stroke-width="2.500" fill="none" opacity=".75"/>`; }
  return wrap(s, defs);
}

function canal(seed = 3) {
  const r = rng(seed), base = 360;
  const defs = grad('sky', SKIES.teal) + grad('wtr', [[0, '#1B5B62'], [1, '#0B2B32']]);
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += skyline(r, { x0: -20, x1: W, base, minW: 36, maxW: 70, minH: 80, maxH: 200, fill: '#2F7F82', gap: 2, gapVar: 18 });
  s += skyline(r, { x0: -10, x1: W, base, minW: 54, maxW: 100, minH: 130, maxH: 290, fill: '#0D3238', lit: '#FFD08A', density: .5, gap: 14, gapVar: 30 });
  s += `<rect x="0" y="${base - 4}" width="${W}" height="10" fill="#082126"/>` + water(base + 4, 0, 0, r, '#FFD08A');
  // footbridge arch
  s += `<path d="M-20,${base + 70} Q400,${base - 30} 820,${base + 70}" stroke="#F4EFE6" stroke-width="7" fill="none"/><path d="M-20,${base + 84} Q400,${base - 4} 820,${base + 84}" stroke="#F4EFE6" stroke-width="3" fill="none" opacity=".8"/>`;
  for (let i = 0; i < 26; i++) { const t = i / 25, x = -20 + 840 * t, y1 = (1 - t) * (1 - t) * (base + 70) + 2 * (1 - t) * t * (base - 30) + t * t * (base + 70), y2 = (1 - t) * (1 - t) * (base + 84) + 2 * (1 - t) * t * (base - 4) + t * t * (base + 84); s += `<line x1="${f(x)}" y1="${f(y1)}" x2="${f(x)}" y2="${f(y2)}" stroke="#F4EFE6" stroke-width="1.500" opacity=".8"/>`; }
  return wrap(s, defs);
}

function midrise(seed = 4, hue = '#E9D6BE') {
  const r = rng(seed), base = 410;
  const defs = grad('sky', SKIES.day) + grad('gl', [[0, '#8EC5E2'], [1, '#5E9BC2']]);
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="660" cy="90" r="46" fill="#FFF3C9" opacity=".9"/>`;
  s += `<ellipse cx="170" cy="120" rx="90" ry="20" fill="#fff" opacity=".7"/><ellipse cx="230" cy="106" rx="60" ry="18" fill="#fff" opacity=".7"/><ellipse cx="560" cy="170" rx="70" ry="14" fill="#fff" opacity=".55"/>`;
  s += skyline(r, { x0: -20, x1: W, base, minW: 70, maxW: 130, minH: 90, maxH: 160, fill: '#CFE0E6', bands: '#fff', bandOp: .5, gap: 16, gapVar: 30, crown: 0 });
  // hero block with balconies
  const bx = 190, bw = 430, top = 120;
  s += `<rect x="${bx}" y="${top}" width="${bw}" height="${base - top}" fill="${hue}"/><rect x="${bx}" y="${top - 12}" width="${bw}" height="14" fill="#fff"/><rect x="${bx + bw - 120}" y="${top - 40}" width="90" height="30" fill="${hue}"/>`;
  s += `<rect x="${bx + bw / 2 - 34}" y="${top}" width="68" height="${base - top}" fill="#C96F4A"/>`;
  for (let j = 0; j < 9; j++) for (let i = 0; i < 6; i++) {
    const x = bx + 22 + i * 68 + (i > 2 ? 22 : 0) - (i > 2 ? 22 : 0), y = top + 16 + j * 31;
    if (i === 2 || i === 3) { s += `<rect x="${bx + bw / 2 - 22}" y="${y}" width="44" height="18" rx="2" fill="url(#gl)" opacity=".9"/>`; continue; }
    const xx = i < 2 ? bx + 22 + i * 82 : bx + bw - 22 - 62 - (5 - i) * 82;
    s += `<rect x="${xx}" y="${y}" width="62" height="20" rx="2" fill="url(#gl)"/><rect x="${xx - 4}" y="${y + 19}" width="70" height="7" rx="1.500" fill="#fff"/><rect x="${xx - 4}" y="${y + 13}" width="70" height="2" fill="#8FA3A8" opacity=".7"/>`;
    if (r() > .7) s += `<rect x="${xx + 6}" y="${y + 6}" width="10" height="13" rx="2" fill="#3F8F68"/>`;
  }
  s += `<rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#C9C2B4"/><rect x="0" y="${base + 26}" width="${W}" height="40" fill="#6B7377"/><rect x="0" y="${base + 44}" width="${W}" height="3" fill="#F1E6C7" opacity=".8" stroke-dasharray="30 22"/>`;
  s += `<rect x="${bx + bw / 2 - 40}" y="${base - 44}" width="80" height="44" fill="#22302D"/><rect x="${bx + bw / 2 - 60}" y="${base - 54}" width="120" height="10" rx="2" fill="#fff"/>`;
  s += palm(110, base + 4, 150) + palm(690, base + 4, 170, '#1E5A45', '#6B4B33', -10) + tree(60, base + 2, 1.300) + tree(742, base + 2, 1.100, '#4FA07A') + tree(640, base + 2, .9);
  return wrap(s, defs);
}

function villa(seed = 5) {
  const r = rng(seed), base = 400;
  const defs = grad('sky', SKIES.gold) + grad('gl', [[0, '#9CCBE2'], [1, '#4E86AE']]) + grad('pool', [[0, '#7FD4E3'], [1, '#3BA7C4']]);
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="130" cy="110" r="52" fill="#FFF1C2" opacity=".95"/>`;
  s += `<ellipse cx="560" cy="96" rx="110" ry="18" fill="#fff" opacity=".6"/><ellipse cx="640" cy="80" rx="60" ry="16" fill="#fff" opacity=".6"/>`;
  s += `<path d="M0,330 Q200,290 400,318 T800,300 V${base} H0 Z" fill="#DCCBA8" opacity=".7"/>`;
  s += `<rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#8FBF7A"/><path d="M0,${base} h${W} v10 h-${W} z" fill="#7BAF68"/>`;
  // villa volumes
  s += `<rect x="150" y="250" width="250" height="150" fill="#FBF7EF"/><rect x="138" y="240" width="274" height="14" fill="#E8DFD0"/>`;
  s += `<rect x="330" y="170" width="300" height="230" fill="#FFFDF8"/><rect x="318" y="158" width="324" height="16" fill="#E8DFD0"/>`;
  s += `<rect x="560" y="290" width="150" height="110" fill="#F3ECE0"/><rect x="550" y="282" width="170" height="12" fill="#E8DFD0"/>`;
  s += `<rect x="330" y="170" width="70" height="230" fill="#C9A77B"/>`; for (let y = 180; y < 400; y += 12) s += `<rect x="330" y="${y}" width="70" height="2" fill="#A98558" opacity=".5"/>`;
  s += `<rect x="420" y="192" width="190" height="78" rx="3" fill="url(#gl)"/><rect x="513" y="192" width="4" height="78" fill="#fff"/><rect x="420" y="300" width="120" height="100" rx="3" fill="url(#gl)"/><rect x="478" y="300" width="4" height="100" fill="#fff"/>`;
  s += `<rect x="412" y="270" width="206" height="8" fill="#22302D" opacity=".8"/><rect x="172" y="276" width="96" height="60" rx="3" fill="url(#gl)"/><rect x="290" y="300" width="50" height="100" rx="3" fill="#5C4632"/><circle cx="300" cy="352" r="3" fill="#E8C98A"/>`;
  s += `<rect x="576" y="312" width="118" height="88" rx="3" fill="#D8D0C2"/>`; for (let y = 322; y < 400; y += 14) s += `<rect x="580" y="${y}" width="110" height="2" fill="#B8AE9C"/>`;
  s += `<path d="M60,${H} L130,${base + 26} H520 L560,${H} Z" fill="url(#pool)"/><path d="M130,${base + 26} H520 l6,10 H122 z" fill="#fff" opacity=".7"/>`;
  s += palm(96, base + 6, 190) + palm(730, base + 6, 210, '#1E5A45', '#6B4B33', -12) + palm(668, base + 6, 130, '#2A6B52', '#6B4B33', 6);
  for (let i = 0; i < 7; i++) s += `<ellipse cx="${160 + i * 26}" cy="${base - 4}" rx="16" ry="12" fill="${i % 2 ? '#3F8F68' : '#4FA07A'}"/>`;
  s += `<ellipse cx="216" cy="${base - 8}" rx="5" ry="5" fill="#F0653A"/><ellipse cx="268" cy="${base - 10}" rx="5" ry="5" fill="#F0653A"/>`;
  return wrap(s, defs);
}

function townhouse(seed = 6) {
  const r = rng(seed), base = 404;
  const defs = grad('sky', SKIES.morn) + grad('gl', [[0, '#A7D3E6'], [1, '#5F97BC']]);
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="650" cy="100" r="44" fill="#FFF3C9"/>`;
  s += `<ellipse cx="200" cy="96" rx="100" ry="18" fill="#fff" opacity=".75"/><ellipse cx="420" cy="140" rx="70" ry="13" fill="#fff" opacity=".6"/>`;
  const cols = ['#F6EEDF', '#EAD9BF', '#F6EEDF', '#E7CDB0'];
  for (let i = 0; i < 4; i++) {
    const x = 40 + i * 182, top = 190 - (i % 2) * 18;
    s += `<rect x="${x}" y="${top}" width="176" height="${base - top}" fill="${cols[i]}"/><rect x="${x - 4}" y="${top - 10}" width="184" height="12" fill="#C96F4A"/>`;
    s += `<rect x="${x + 18}" y="${top + 24}" width="58" height="52" rx="3" fill="url(#gl)"/><rect x="${x + 100}" y="${top + 24}" width="58" height="52" rx="3" fill="url(#gl)"/><rect x="${x + 46}" y="${top + 24}" width="3" height="52" fill="#fff"/><rect x="${x + 128}" y="${top + 24}" width="3" height="52" fill="#fff"/>`;
    s += `<rect x="${x + 12}" y="${top + 76}" width="70" height="6" fill="#fff"/><rect x="${x + 94}" y="${top + 76}" width="70" height="6" fill="#fff"/>`;
    s += `<rect x="${x + 18}" y="${base - 96}" width="70" height="96" rx="3" fill="#B9AE9B"/>`; for (let y = base - 86; y < base; y += 14) s += `<rect x="${x + 22}" y="${y}" width="62" height="2" fill="#9A8F7C"/>`;
    s += `<path d="M${x + 112},${base} v-70 a22,22 0 0 1 44,0 v70 z" fill="#5C4632"/><circle cx="${x + 148}" cy="${base - 40}" r="2.500" fill="#E8C98A"/>`;
  }
  s += `<rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#D6CEBF"/><rect x="0" y="${base + 30}" width="${W}" height="${H - base - 30}" fill="#70787C"/>`;
  s += tree(30, base + 2, 1.400) + tree(222, base + 2, 1.100, '#4FA07A') + tree(404, base + 2, 1.200) + tree(586, base + 2, 1.100, '#4FA07A') + palm(770, base + 6, 170, '#1E5A45', '#6B4B33', -12);
  s += `<g transform="translate(250,${base + 40})"><rect width="120" height="30" rx="10" fill="#0B6B5D"/><rect x="18" y="-16" width="76" height="20" rx="8" fill="#0B6B5D"/><rect x="24" y="-12" width="30" height="13" rx="3" fill="#CFE6F2"/><rect x="58" y="-12" width="30" height="13" rx="3" fill="#CFE6F2"/><circle cx="26" cy="30" r="11" fill="#22302D"/><circle cx="94" cy="30" r="11" fill="#22302D"/></g>`;
  return wrap(s, defs);
}

function lakeside(seed = 7) {
  const r = rng(seed), base = 350;
  const defs = grad('sky', SKIES.morn) + grad('wtr', [[0, '#7FC3CF'], [1, '#3F8F9C']]) + grad('gl', [[0, '#A7D3E6'], [1, '#5F97BC']]);
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="120" cy="90" r="40" fill="#FFF3C9"/>`;
  s += skyline(r, { x0: -20, x1: W, base, minW: 50, maxW: 90, minH: 120, maxH: 230, fill: '#BCD6DD', bands: '#fff', bandOp: .45, gap: 30, gapVar: 60 });
  for (let b = 0; b < 3; b++) {
    const x = 60 + b * 250, top = 170 + (b % 2) * 26, w = 210;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="${b % 2 ? '#F0E2CB' : '#F8F1E4'}"/><path d="M${x - 8},${top} h${w + 16} l-18,-22 h-${w - 20} z" fill="#B9603E"/>`;
    for (let j = 0; j < Math.floor((base - top - 16) / 30); j++) for (let i = 0; i < 4; i++) { const xx = x + 14 + i * 49, yy = top + 14 + j * 30; s += `<rect x="${xx}" y="${yy}" width="36" height="18" rx="2" fill="url(#gl)"/><rect x="${xx - 3}" y="${yy + 17}" width="42" height="5" rx="1" fill="#fff"/>`; }
  }
  s += `<path d="M0,${base} h${W} v14 h-${W} z" fill="#6FA863"/>`;
  for (let i = 0; i < 14; i++) s += tree(20 + i * 60 + r() * 20, base + 6, .9 + r() * .5, i % 2 ? '#3F8F68' : '#57A57E');
  s += `<rect x="0" y="${base + 12}" width="${W}" height="${H - base - 12}" fill="url(#wtr)"/>`;
  for (let i = 0; i < 40; i++) s += `<rect x="${f(r() * W)}" y="${f(base + 20 + r() * (H - base - 26))}" width="${f(24 + r() * 80)}" height="2" rx="1" fill="#fff" opacity="${f(.15 + r() * .3)}"/>`;
  s += palm(730, base + 10, 170, '#1E5A45', '#6B4B33', -12);
  return wrap(s, defs);
}

/* ---------- Interiors ---------- */
function windowView(x, y, w, h, sky, r) {
  let s = `<clipPath id="wv"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/></clipPath><g clip-path="url(#wv)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#vsky)"/>`;
  let xx = x - 10; while (xx < x + w) { const tw = 22 + r() * 34, th = h * (.2 + r() * .5); s += `<rect x="${f(xx)}" y="${f(y + h - th)}" width="${f(tw)}" height="${f(th)}" fill="#fff" opacity="${f(.28 + r() * .25)}"/>`; xx += tw + 4 + r() * 10; }
  s += `</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="#fff" stroke-width="8"/>`;
  for (let i = 1; i < 3; i++) s += `<rect x="${f(x + (w * i) / 3 - 2)}" y="${y}" width="4" height="${h}" fill="#fff"/>`;
  return s;
}
function plant(x, y, s = 1) {
  let o = `<path d="M${x - 14 * s},${y} h${28 * s} l-${4 * s},${26 * s} h-${20 * s} z" fill="#C96F4A"/>`;
  [[-22, -40, -30], [0, -62, 0], [22, -40, 30], [-10, -52, -14], [10, -52, 14]].forEach(([dx, dy, rot]) => { o += `<ellipse cx="${x + dx * s * .5}" cy="${y + dy * s * .5}" rx="${9 * s}" ry="${26 * s}" fill="${rot === 0 ? '#2F7D5C' : '#3F8F68'}" transform="rotate(${rot} ${x} ${y})"/>`; });
  return o;
}
function living(seed = 11, p = {}) {
  const r = rng(seed); const wall = p.wall || '#EFE7DA', sofa = p.sofa || '#2F7C70', acc = p.acc || '#F0653A', sky = p.sky || 'gold';
  const defs = grad('vsky', SKIES[sky]) + grad('fl', [[0, '#D8BF9C'], [1, '#C4A780']]);
  let s = `<rect width="${W}" height="${H}" fill="${wall}"/><rect x="0" y="340" width="${W}" height="160" fill="url(#fl)"/>`;
  for (let i = 0; i < 9; i++) s += `<line x1="${i * 100 - 40}" y1="340" x2="${i * 130 - 160}" y2="500" stroke="#B4966E" stroke-width="1.500" opacity=".5"/>`;
  s += `<rect x="0" y="334" width="${W}" height="8" fill="#fff" opacity=".8"/>`;
  s += windowView(250, 60, 380, 220, sky, r);
  s += `<path d="M228,44 h36 q-6,130 6,262 h-42 z" fill="#fff" opacity=".85"/><path d="M616,44 h36 v262 h-42 q12,-132 6,-262 z" fill="#fff" opacity=".85"/><rect x="214" y="40" width="452" height="6" rx="3" fill="#8C7B62"/>`;
  s += `<rect x="60" y="90" width="110" height="140" rx="3" fill="#fff"/><rect x="70" y="100" width="90" height="120" fill="${acc}" opacity=".18"/><circle cx="115" cy="150" r="26" fill="${acc}"/><path d="M70,220 l34,-44 26,26 18,-18 12,12 v24 z" fill="${sofa}"/>`;
  s += `<ellipse cx="420" cy="446" rx="300" ry="42" fill="#F6EFE3"/><ellipse cx="420" cy="446" rx="270" ry="34" fill="none" stroke="${acc}" stroke-width="2" opacity=".5"/>`;
  s += `<rect x="216" y="300" width="400" height="94" rx="22" fill="${sofa}"/><rect x="200" y="322" width="46" height="84" rx="18" fill="${sofa}"/><rect x="586" y="322" width="46" height="84" rx="18" fill="${sofa}"/><rect x="240" y="346" width="352" height="54" rx="14" fill="#fff" opacity=".12"/><rect x="232" y="398" width="8" height="18" fill="#5C4632"/><rect x="592" y="398" width="8" height="18" fill="#5C4632"/>`;
  s += `<rect x="262" y="312" width="64" height="52" rx="12" fill="${acc}"/><rect x="336" y="318" width="56" height="46" rx="12" fill="#F6EFE3"/><rect x="512" y="314" width="62" height="50" rx="12" fill="#E7C987"/>`;
  s += `<rect x="330" y="424" width="180" height="16" rx="8" fill="#5C4632"/><rect x="346" y="440" width="6" height="26" fill="#5C4632"/><rect x="488" y="440" width="6" height="26" fill="#5C4632"/><rect x="380" y="410" width="44" height="14" rx="3" fill="#fff"/><circle cx="462" cy="414" r="10" fill="${acc}" opacity=".85"/>`;
  s += `<line x1="700" y1="190" x2="700" y2="420" stroke="#22302D" stroke-width="4"/><path d="M670,190 h60 l-12,-50 h-36 z" fill="#F7E3B5"/><ellipse cx="700" cy="424" rx="26" ry="6" fill="#22302D"/>`;
  s += plant(110, 392, 1.300);
  return wrap(s, defs);
}
function bedroom(seed = 12, p = {}) {
  const r = rng(seed); const wall = p.wall || '#E9E4DC', acc = p.acc || '#0B6B5D', sky = p.sky || 'morn';
  const defs = grad('vsky', SKIES[sky]) + grad('fl', [[0, '#D9C6A8'], [1, '#C9B28E']]);
  let s = `<rect width="${W}" height="${H}" fill="${wall}"/><rect x="0" y="360" width="${W}" height="140" fill="url(#fl)"/><rect x="0" y="354" width="${W}" height="8" fill="#fff" opacity=".8"/>`;
  s += windowView(520, 70, 230, 200, sky, r) + `<path d="M500,54 h34 q-6,120 4,240 h-38 z" fill="#fff" opacity=".9"/><path d="M736,54 h34 v240 h-38 q10,-120 4,-240 z" fill="#fff" opacity=".9"/>`;
  s += `<rect x="110" y="150" width="360" height="150" rx="18" fill="${acc}"/>`; for (let i = 1; i < 5; i++) s += `<line x1="${110 + i * 72}" y1="158" x2="${110 + i * 72}" y2="292" stroke="#fff" stroke-width="2" opacity=".18"/>`;
  s += `<rect x="96" y="280" width="388" height="120" rx="14" fill="#fff"/><rect x="96" y="330" width="388" height="84" rx="14" fill="#F3E8D6"/><path d="M96,344 q194,-34 388,0 v20 q-194,-30 -388,0 z" fill="${p.throw || '#F0653A'}" opacity=".9"/>`;
  s += `<rect x="130" y="262" width="130" height="56" rx="16" fill="#FBF8F3" stroke="#E7E1D6"/><rect x="320" y="262" width="130" height="56" rx="16" fill="#FBF8F3" stroke="#E7E1D6"/><rect x="104" y="410" width="10" height="20" fill="#5C4632"/><rect x="466" y="410" width="10" height="20" fill="#5C4632"/>`;
  s += `<rect x="24" y="320" width="60" height="80" rx="6" fill="#B58E62"/><rect x="24" y="356" width="60" height="3" fill="#8F6C45"/><rect x="50" y="286" width="8" height="34" fill="#22302D"/><path d="M34,286 h40 l-8,-34 h-24 z" fill="#F7E3B5"/>`;
  s += `<ellipse cx="300" cy="452" rx="250" ry="30" fill="#F6EFE3"/>` + plant(690, 392, 1.200);
  s += `<rect x="190" y="60" width="90" height="70" rx="3" fill="#fff"/><circle cx="235" cy="95" r="20" fill="${p.throw || '#F0653A'}" opacity=".8"/><rect x="300" y="60" width="90" height="70" rx="3" fill="#fff"/><path d="M308,122 l26,-34 20,20 14,-12 14,26 z" fill="${acc}"/>`;
  return wrap(s, defs);
}
function kitchen(seed = 13, p = {}) {
  const cab = p.cab || '#2F5D57', top = '#F4EFE6', acc = p.acc || '#F0653A';
  const defs = grad('fl', [[0, '#DDD3C3'], [1, '#CBBFAC']]) + grad('vsky', SKIES.day);
  let s = `<rect width="${W}" height="${H}" fill="#F1EBDF"/><rect x="0" y="380" width="${W}" height="120" fill="url(#fl)"/>`;
  for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) s += `<rect x="${60 + i * 44}" y="${170 + j * 24}" width="42" height="22" fill="#fff" opacity="${(i + j) % 2 ? .75 : .5}"/>`;
  s += `<rect x="60" y="50" width="520" height="110" rx="4" fill="${cab}"/>`; for (let i = 1; i < 5; i++) s += `<line x1="${60 + i * 104}" y1="54" x2="${60 + i * 104}" y2="156" stroke="#fff" stroke-width="2" opacity=".2"/>`;
  s += `<rect x="620" y="50" width="130" height="330" rx="6" fill="#D9DDDD"/><line x1="620" y1="180" x2="750" y2="180" stroke="#AEB6B6" stroke-width="3"/><rect x="632" y="110" width="5" height="50" rx="2" fill="#8D9797"/><rect x="632" y="200" width="5" height="70" rx="2" fill="#8D9797"/>`;
  s += `<rect x="60" y="270" width="540" height="110" fill="${cab}"/><rect x="52" y="262" width="556" height="14" rx="3" fill="${top}"/>`; for (let i = 1; i < 5; i++) s += `<line x1="${60 + i * 108}" y1="280" x2="${60 + i * 108}" y2="376" stroke="#fff" stroke-width="2" opacity=".2"/>`;
  s += `<rect x="390" y="286" width="96" height="80" rx="4" fill="#22302D"/><rect x="398" y="296" width="80" height="44" rx="3" fill="#39494A"/><circle cx="410" cy="352" r="4" fill="#D9DDDD"/><circle cx="430" cy="352" r="4" fill="#D9DDDD"/>`;
  s += `<path d="M200,262 v-34 q0,-14 14,-14 h10" stroke="#8D9797" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="150" y="256" width="110" height="8" rx="2" fill="#C9CFCF"/>`;
  s += `<rect x="300" y="236" width="24" height="26" rx="4" fill="${acc}"/><rect x="330" y="244" width="18" height="18" rx="4" fill="#E7C987"/><rect x="520" y="226" width="40" height="36" rx="6" fill="#fff"/>`;
  s += `<rect x="150" y="402" width="470" height="20" rx="4" fill="${top}"/><rect x="170" y="422" width="430" height="78" fill="#B58E62"/>`;
  [240, 385, 530].forEach(x => { s += `<line x1="${x}" y1="0" x2="${x}" y2="96" stroke="#22302D" stroke-width="2"/><path d="M${x - 26},130 q26,-52 52,0 z" fill="#E7C987"/><ellipse cx="${x}" cy="130" rx="26" ry="5" fill="#FFF3C9"/>`; });
  s += plant(700, 372, .9);
  return wrap(s, defs);
}
function bathroom(seed = 14, p = {}) {
  const acc = p.acc || '#0B6B5D';
  const defs = grad('fl', [[0, '#DAD5CB'], [1, '#C6C0B4']]);
  let s = `<rect width="${W}" height="${H}" fill="#EEF2EF"/>`;
  for (let i = 0; i < 20; i++) for (let j = 0; j < 9; j++) s += `<rect x="${i * 40 + 1}" y="${j * 40 + 1}" width="38" height="38" fill="#fff" opacity="${(i + j) % 2 ? .7 : .4}"/>`;
  s += `<rect x="0" y="372" width="${W}" height="128" fill="url(#fl)"/>`;
  s += `<rect x="80" y="70" width="230" height="170" rx="14" fill="#CFE6EE"/><rect x="80" y="70" width="230" height="170" rx="14" fill="none" stroke="#C9A77B" stroke-width="7"/><path d="M110,220 l70,-120 40,60 30,-34 40,94 z" fill="#fff" opacity=".4"/>`;
  s += `<rect x="60" y="280" width="270" height="20" rx="4" fill="#F4EFE6"/><rect x="72" y="300" width="246" height="92" fill="#C9A77B"/><line x1="195" y1="304" x2="195" y2="388" stroke="#A98558" stroke-width="2"/><ellipse cx="195" cy="280" rx="56" ry="10" fill="#fff"/><path d="M195,270 v-24 q0,-10 12,-10" stroke="#8D9797" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M420,300 h320 q0,96 -50,96 h-220 q-50,0 -50,-96 z" fill="#fff"/><rect x="408" y="290" width="344" height="16" rx="8" fill="#fff" stroke="#E0E5E2"/><path d="M700,290 v-70 q0,-16 -16,-16 h-10" stroke="#8D9797" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="440" y="120" width="8" height="150" rx="4" fill="#8D9797"/><rect x="440" y="150" width="120" height="96" rx="6" fill="${acc}"/><rect x="440" y="150" width="120" height="14" rx="6" fill="#fff" opacity=".2"/>`;
  s += plant(370, 372, .8);
  return wrap(s, defs);
}

/* ---------- Stylised Dubai map (for search & listing pages) ---------- */
function map(pins = []) {
  const defs = grad('sea', [[0, '#BFE2EA'], [1, '#D8EEF0']]);
  let s = `<rect width="${W}" height="${H}" fill="#EEF0E6"/>`;
  s += `<path d="M0,0 H800 V120 Q640,150 520,210 T250,330 T0,420 Z" fill="url(#sea)"/>`;
  // palm island
  s += `<g transform="translate(250,200) rotate(-38)" fill="#EEF0E6"><rect x="-5" y="-8" width="10" height="70" rx="5"/>`;
  for (let i = -3; i <= 3; i++) if (i) s += `<rect x="${i > 0 ? 0 : -44}" y="${-4 + Math.abs(i) * 9 - 6}" width="44" height="5" rx="2.500" transform="rotate(${i * 9} 0 20)"/>`;
  s += `<path d="M-58,-6 A60,60 0 0 1 58,-6" stroke="#EEF0E6" stroke-width="7" fill="none"/></g>`;
  // creek
  s += `<path d="M700,90 Q650,160 690,220 T660,330" stroke="#BFE2EA" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  // parks
  [[140, 430, 60, 34], [470, 420, 80, 30], [620, 300, 46, 26], [340, 370, 40, 22]].forEach(([x, y, a, b]) => s += `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#DCE9D2"/>`);
  // roads
  s += `<path d="M-10,470 Q230,380 400,300 T810,170" stroke="#fff" stroke-width="10" fill="none"/><path d="M-10,470 Q230,380 400,300 T810,170" stroke="#F3C98F" stroke-width="3" fill="none"/>`;
  s += `<path d="M60,500 Q300,430 520,380 T810,330" stroke="#fff" stroke-width="7" fill="none"/><path d="M180,500 Q220,400 300,350 M430,500 Q470,380 560,260 M620,500 Q640,400 720,330 M330,330 Q420,400 520,500" stroke="#fff" stroke-width="5" fill="none"/>`;
  [[105, 392, 'Dubai Marina'], [215, 420, 'JLT'], [300, 470, 'JVC'], [395, 345, 'Al Barsha'], [540, 250, 'Business Bay'], [610, 215, 'Downtown'], [690, 150, 'Deira'], [500, 450, 'Dubai Hills'], [200, 250, 'Palm Jumeirah']].forEach(([x, y, t]) => s += `<text x="${x}" y="${y}" font-family="Figtree, system-ui, sans-serif" font-size="15" font-weight="600" fill="#6B7A76" text-anchor="middle">${t}</text>`);
  pins.forEach(([x, y, label, hot]) => {
    const w = label.length * 9.5 + 22;
    s += `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-34" width="${w}" height="30" rx="15" fill="${hot ? '#F0653A' : '#0F1F1C'}"/><path d="M-7,-6 L0,4 L7,-6 Z" fill="${hot ? '#F0653A' : '#0F1F1C'}"/><text y="-13.500" font-family="Figtree, system-ui, sans-serif" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">${label}</text></g>`;
  });
  return wrap(s, defs);
}

module.exports = { marina, downtown, canal, midrise, villa, townhouse, lakeside, living, bedroom, kitchen, bathroom, map, rng };
