// Shared UI helpers — every page is composed from these so all roles look like one product.
const fs = require('fs');
const path = require('path');
const ICON_DIR = path.join(__dirname, '../../node_modules/lucide-static/icons');
const iconCache = {};

/** Inline Lucide icon. icon('home'), icon('home', 16), icon('home', 16, 'class') */
function icon(name, size = 20, cls = '') {
  if (!iconCache[name]) {
    const f = path.join(ICON_DIR, name + '.svg');
    if (!fs.existsSync(f)) throw new Error('Unknown icon: ' + name);
    const raw = fs.readFileSync(f, 'utf8');
    iconCache[name] = raw.replace(/<!--[\s\S]*?-->/g, '').match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1].replace(/\s*\n\s*/g, '');
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${cls ? ` class="${cls}"` : ''} aria-hidden="true">${iconCache[name]}</svg>`;
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n, opt = {}) => `${opt.noCur ? '' : 'AED '}${Number(n).toLocaleString('en-US', { maximumFractionDigits: opt.dp ?? 0, minimumFractionDigits: opt.dp ?? 0 })}`;
const attrs = o => Object.entries(o || {}).map(([k, v]) => v === true ? ` ${k}` : (v === false || v == null) ? '' : ` ${k}="${esc(v)}"`).join('');

/** The brand mark: an arched doorway standing ajar, the handle is the dot of ".me" */
function mark() {
  return `<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#0B6B5D"/><path d="M11 33V18.5C11 12.7 15 8 20 8s9 4.700 9 10.500V33z" fill="#fff"/><path d="M20 8c5 0 9 4.700 9 10.500V33l-9-3.200z" fill="#0E1D1A" opacity=".9"/><circle cx="23.300" cy="21.500" r="1.900" fill="#F0653A"/></svg>`;
}
function logo(cls = '') { return `<span class="logo ${cls}">${mark()}<span>openrent<i>.me</i></span></span>`; }

function badge(text, tone = '', opt = {}) {
  return `<span class="badge ${tone}${opt.dot ? ' dot' : ''}${opt.lg ? ' lg' : ''}">${opt.icon ? icon(opt.icon, 12) : ''}${text}</span>`;
}

/** Rule chip: ties a guardrail to a ruleset entry. rule('DXB-014','Art. 14 · 90-day notice') */
function rule(id, label, base = "../") {
  return `<a class="rule-chip" href="${base}rulebook.html#${id}" title="Open rule ${id}">${icon('scale', 12)}${id}${label ? ' · ' + label : ''}</a>`;
}

function btn(text, o = {}) {
  const cls = ['btn', o.variant, o.size, o.block && 'block', o.cls].filter(Boolean).join(' ');
  const inner = `${o.icon ? icon(o.icon, o.size === 'sm' ? 16 : 18) : ''}${text ? `<span>${text}</span>` : ''}${o.iconEnd ? icon(o.iconEnd, o.size === 'sm' ? 16 : 18) : ''}`;
  const a = attrs(Object.assign({}, o.attrs, o.sheet ? { 'data-sheet': o.sheet } : {}, o.toast ? { 'data-toast': o.toast } : {}));
  return o.href ? `<a class="${cls}" href="${o.href}"${a}>${inner}</a>` : `<button type="button" class="${cls}"${a}>${inner}</button>`;
}

function pageHead(o) {
  return `<header class="page-head"><div class="ph-text">${o.eyebrow ? `<span class="eyebrow">${o.eyebrow}</span>` : ''}<h1>${o.title}</h1>${o.sub ? `<p>${o.sub}</p>` : ''}</div>${o.actions ? `<div class="ph-actions">${o.actions}</div>` : ''}</header>`;
}
function sectionHead(title, linkText, href) {
  return `<div class="section-head"><h2>${title}</h2>${linkText ? `<a class="link" href="${href || '#'}">${linkText}</a>` : ''}</div>`;
}

/** card({title, link:[text,href], body, foot, flush, cls}) — flush = no body padding (for lists/tables) */
function card(o) {
  const head = o.title ? `<div class="card-head"><h3>${o.title}</h3>${o.link ? `<a class="link" href="${o.link[1]}">${o.link[0]}</a>` : (o.headEnd || '')}</div>` : '';
  const body = o.flush ? (o.title ? `<div class="mt-2">${o.body}</div>` : o.body) : `<div class="card-body">${o.body}</div>`;
  return `<section class="card ${o.cls || ''}"${o.id ? ` id="${o.id}"` : ''}>${head}${body}${o.foot ? `<div class="card-foot">${o.foot}</div>` : ''}</section>`;
}

function stat(o) {
  const d = o.delta ? `<span class="delta ${o.deltaDir || 'up'}">${icon(o.deltaDir === 'down' ? 'arrow-down-right' : o.deltaDir === 'flat' ? 'minus' : 'arrow-up-right', 12)}${o.delta}</span>` : '';
  return `<div class="stat"><div class="stat-label">${o.icon ? icon(o.icon, 15) : ''}${o.label}</div><div class="stat-value">${o.value}${o.unit ? `<small>${o.unit}</small>` : ''}</div>${(o.sub || d) ? `<div class="stat-sub">${d}${o.sub || ''}</div>` : ''}</div>`;
}
function stats(items, cls = 'g2 lg4') { return `<div class="grid ${cls}">${items.map(stat).join('')}</div>`; }

/** row({icon, tone, lead (custom leading html), title, sub, end, endSub, badge, href, chev, unread, attrs}) */
function row(o) {
  const tag = o.href ? 'a' : (o.sheet || o.toast) ? 'button' : 'div';
  const lead = o.lead != null ? o.lead : (o.icon ? `<span class="row-ico ${o.tone || ''}">${icon(o.icon, 20)}</span>` : '');
  const end = (o.end || o.endSub || o.endBadge) ? `<div class="row-end">${o.end ? `<b>${o.end}</b>` : ''}${o.endBadge || ''}${o.endSub ? `<span>${o.endSub}</span>` : ''}</div>` : '';
  const a = attrs(Object.assign({}, o.attrs, o.sheet ? { 'data-sheet': o.sheet } : {}, o.toast ? { 'data-toast': o.toast } : {}));
  const inner = v => (tag !== 'div' && v) ? String(v).replace(/<a class="rule-chip"[^>]*>([\s\S]*?)<\/a>/g, '<span class="rule-chip">$1</span>') : v;
  o = Object.assign({}, o, { sub: inner(o.sub), extra: inner(o.extra), badge: inner(o.badge) });
  return `<${tag} class="row${o.unread ? ' unread' : ''}"${o.href ? ` href="${o.href}"` : ''}${tag === 'button' ? ' type="button"' : ''}${a}>${lead}<div class="row-main"><div class="row-title">${o.title}${o.badge || ''}</div>${o.sub ? `<div class="row-sub">${o.sub}</div>` : ''}${o.extra || ''}</div>${end}${(o.chev || (o.href && o.chev !== false)) ? `<span class="row-chev">${icon('chevron-right', 18)}</span>` : ''}</${tag}>`;
}
function list(rows) { return `<div class="list">${rows.map(r => typeof r === 'string' ? r : row(r)).join('')}</div>`; }

function kv(pairs, cls = '') { return `<dl class="kv ${cls}">${pairs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`; }

/** callout({tone:'ok|warn|danger|brand|neutral|(info)', icon, title, body, rules:[html], actions}) */
function callout(o) {
  const ic = o.icon || { ok: 'circle-check', warn: 'triangle-alert', danger: 'octagon-alert', brand: 'shield-check', neutral: 'info' }[o.tone] || 'info';
  return `<div class="callout ${o.tone || ''}">${icon(ic, 20)}<div class="grow">${o.title ? `<h4>${o.title}</h4>` : ''}${o.body ? `<p>${o.body}</p>` : ''}${(o.rules || o.actions) ? `<div class="cluster">${(o.rules || []).join('')}${o.actions || ''}</div>` : ''}</div></div>`;
}

/** Guardrail panel: guard({title, sub, checks:[{state:'ok|warn|block|info|plus', title, sub, rule}]}) */
function guard(o) {
  const ico = { ok: 'check', warn: 'triangle-alert', block: 'x', info: 'info', plus: 'plus' };
  return `<div class="guard"><div class="guard-head"><span class="shield">${icon('shield-check', 16)}</span><div class="grow">${o.title || 'Legal guardrails'}${o.sub ? `<small>${o.sub}</small>` : ''}</div>${o.end || ''}</div><div class="checks">${o.checks.map(c => `<div class="check ${c.state === 'ok' ? '' : c.state}"><span class="ck">${icon(ico[c.state] || 'check', 13)}</span><div class="grow"><b>${c.title}</b>${c.sub ? `<span>${c.sub}</span>` : ''}${c.rule || ''}</div></div>`).join('')}</div></div>`;
}

function avatar(name, o = {}) {
  const ini = o.initials || name.split(/\s+/).filter(w => !/^(al|el|bin|de|van)$/i.test(w)).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 7;
  return `<span class="av ${o.size || ''} ${o.tone || 'c' + (h + 1)}${o.ring ? ' ring' : ''}" title="${esc(name)}">${ini}</span>`;
}
function avatars(names, size = 'sm') { return `<span class="av-stack">${names.map(n => avatar(n, { size })).join('')}</span>`; }

function thumb(img, size = '', base = '') { return `<span class="thumb ${size}"><img src="${base}assets/img/${img}" alt="" loading="lazy"></span>`; }
function cover(img, o = {}, base = '') {
  return `<div class="cover ${o.cls || ''}"><img src="${base}assets/img/${img}" alt="${esc(o.alt || '')}" loading="lazy">${o.tags ? `<div class="cover-tags">${o.tags}</div>` : ''}${o.br ? `<div class="cover-br">${o.br}</div>` : ''}${o.grad ? `<div class="cover-grad">${o.grad}</div>` : ''}</div>`;
}
function facts(items) { return `<div class="facts">${items.map(([ic, t]) => `<span>${icon(ic, 15)}${t}</span>`).join('')}</div>`; }
function glass(text, ic, light) { return `<span class="glass${light ? ' light' : ''}">${ic ? icon(ic, 12) : ''}${text}</span>`; }

function bar(pct, tone = '', thin) { return `<div class="bar ${tone}${thin ? ' thin' : ''}"><i style="width:${pct}%"></i></div>`; }
function stagebar(total, current) { return `<div class="stagebar">${Array.from({ length: total }, (_, i) => `<i class="${i < current ? 'done' : i === current ? 'now' : ''}"></i>`).join('')}</div>`; }

/** lifecycle([{label, icon}], currentIndex) – horizontal journey */
function lifecycle(steps, current) {
  return `<div class="lifecycle">${steps.map((s, i) => `<div class="lc-step ${i < current ? 'done' : i === current ? 'now' : ''}"><span class="lc-dot">${icon(i < current ? 'check' : (s.icon || 'circle'), 14)}</span><span>${s.label}</span></div>`).join('')}</div>`;
}
/** timeline([{state:'done|now|warn|danger|', icon, title, body, when, extra}]) */
function timeline(items) {
  return `<div class="timeline">${items.map(t => `<div class="tl ${t.state || ''}"><span class="tl-dot">${icon(t.icon || (t.state === 'done' ? 'check' : 'circle'), 14)}</span><div class="tl-body"><b>${t.title}</b>${t.body ? `<p>${t.body}</p>` : ''}${t.when ? `<span class="when">${t.when}</span>` : ''}${t.extra ? `<div class="cluster">${t.extra}</div>` : ''}</div></div>`).join('')}</div>`;
}

/** tabs — tabs('grp',[{id,label,n}], activeId). Panels: <div data-panel="grp:id"> */
function tabs(group, items, active) {
  return `<div class="tabs" data-tabs="${group}">${items.map(t => `<button type="button" data-tab="${t.id}" class="${t.id === active ? 'is-active' : ''}">${t.label}${t.n != null ? `<span class="n">${t.n}</span>` : ''}</button>`).join('')}</div>`;
}
function panel(group, id, body, active) { return `<div data-panel="${group}:${id}"${active ? '' : ' hidden'} class="stack">${body}</div>`; }
function seg(group, items, active, cls = '') {
  return `<div class="seg ${cls}" data-tabs="${group}">${items.map(t => `<button type="button" data-tab="${t.id}" class="${t.id === active ? 'is-active' : ''}">${t.label}</button>`).join('')}</div>`;
}
function chips(items, active = 0, cls = '') {
  return `<div class="chips ${cls}" data-chips>${items.map((c, i) => { const [label, n] = Array.isArray(c) ? c : [c]; return `<button type="button" class="chip${i === active ? ' is-active' : ''}">${label}${n != null ? ` <span class="n">${n}</span>` : ''}</button>`; }).join('')}</div>`;
}

/** table({cols:[{label, r}], rows:[[cell,...]], stack:true}) — stack collapses to label/value cards on phones; first cell is the lead cell */
function table(o) {
  const stack = o.stack !== false;
  return `<div class="table-wrap"><table class="table${stack ? ' stackable' : ''}"><thead><tr>${o.cols.map(c => `<th${c.r ? ' class="r"' : ''}>${c.label}</th>`).join('')}</tr></thead><tbody>${o.rows.map(r => `<tr>${r.map((cell, i) => `<td${o.cols[i].r ? ' class="r' + (i === 0 ? ' lead-cell' : '') + '"' : (i === 0 ? ' class="lead-cell"' : '')} data-label="${esc(o.cols[i].label)}">${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function sheet(id, title, body, foot) {
  return `<div class="sheet" id="${id}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-panel"><div class="sheet-grab"></div><div class="sheet-head"><h3>${title}</h3><button type="button" class="icon-btn" data-close aria-label="Close">${icon('x', 20)}</button></div><div class="sheet-body">${body}</div>${foot ? `<div class="sheet-foot">${foot}</div>` : ''}</div></div>`;
}

function field(o) {
  const id = o.id || 'f' + Math.random().toString(36).slice(2, 8);
  let control;
  if (o.type === 'select') control = `<select class="select" id="${id}">${o.options.map(v => `<option${v === o.value ? ' selected' : ''}>${v}</option>`).join('')}</select>`;
  else if (o.type === 'textarea') control = `<textarea class="textarea" id="${id}" placeholder="${esc(o.placeholder || '')}">${o.value || ''}</textarea>`;
  else {
    const inp = `<input class="input${o.state ? ' is-' + o.state : ''}" id="${id}" type="${o.type || 'text'}" value="${esc(o.value ?? '')}" placeholder="${esc(o.placeholder || '')}"${o.inputmode ? ` inputmode="${o.inputmode}"` : ''}${o.readonly ? ' readonly' : ''}${attrs(o.attrs)}>`;
    control = (o.prefix || o.suffix) ? `<div class="input-group">${o.prefix ? `<span class="affix">${o.prefix}</span>` : ''}${inp}${o.suffix ? `<span class="affix end">${o.suffix}</span>` : ''}</div>` : inp;
  }
  return `<div class="field ${o.cls || ''}"><label for="${id}">${o.label}</label>${control}${o.hint ? `<span class="hint ${o.hintTone || ''}">${o.hint}</span>` : ''}</div>`;
}
function toggle(checked, o = {}) { return `<span class="switch"><input type="checkbox"${checked ? ' checked' : ''}${o.disabled ? ' disabled' : ''} aria-label="${esc(o.label || 'Toggle')}"><i></i></span>`; }
function choice(name, title, desc, checked, o = {}) {
  return `<label class="choice${o.locked ? ' is-locked' : ''}"><input type="radio" name="${name}"${checked ? ' checked' : ''}${o.locked ? ' disabled' : ''}><span class="radio"></span><span class="grow"><b>${title}${o.badge ? ' ' + o.badge : ''}</b>${desc ? `<span class="d">${desc}</span>` : ''}</span>${o.end || ''}</label>`;
}
function stars(n) { return `<span class="stars" aria-label="${n} out of 5">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" class="${i <= Math.round(n) ? '' : 'off'}"><path d="M12 2.500l2.900 6.100 6.600.900-4.800 4.600 1.200 6.600L12 17.500l-5.900 3.200 1.200-6.600L2.500 9.500l6.600-.900z"/></svg>`).join('')}</span>`; }
function docIco(kind = 'PDF', cls = '') { return `<span class="doc-ico ${cls}">${kind}</span>`; }
function chat(msgs) {
  return `<div class="chat">${msgs.map(m => m.day ? `<span class="chat-day">${m.day}</span>` : `<div class="bubble ${m.who || ''}">${m.text}${m.time ? `<time>${m.time}</time>` : ''}</div>`).join('')}</div>`;
}
function composer(ph = 'Write a message…') {
  return `<div class="composer"><button type="button" class="icon-btn" aria-label="Attach">${icon('paperclip', 20)}</button><input class="input" placeholder="${ph}" aria-label="Message"><button type="button" class="btn primary icon-only" data-toast="Message sent (demo)" aria-label="Send">${icon('send', 18)}</button></div>`;
}
/** A deterministic fake QR (for Trakheesi permit / Ejari certificate mock-ups) */
function qr(seed = 'openrent.me') {
  let s = 0; for (const c of seed) s = (s * 131 + c.charCodeAt(0)) >>> 0;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const N = 21, cells = [];
  const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let on;
    if (finder(x, y)) { const fx = x >= N - 7 ? x - (N - 7) : x, fy = y >= N - 7 ? y - (N - 7) : y; on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4); }
    else on = rnd() > 0.52;
    if (on) cells.push(`<rect x="${x}" y="${y}" width="1.020" height="1.020"/>`);
  }
  return `<svg class="qr" viewBox="-1 -1 23 23" fill="#0F1F1C" aria-label="QR code">${cells.join('')}</svg>`;
}

/* ---------- Charts (inline SVG) ---------- */
const TONES = { brand: '#0B6B5D', accent: '#F0653A', gold: '#D6A84A', info: '#3D7EC2', violet: '#7A69D6', ok: '#2FA36F', danger: '#D2564E', sand: '#D8CFBD', ink: '#0F1F1C' };
const tone = t => TONES[t] || t;

/** barChart({labels, series:[{name,tone,data}], height, fmt, stacked}) */
function barChart(o) {
  const W = 340, H = o.height || 170, pl = 6, pr = 6, pt = 10, pb = 22;
  const n = o.labels.length, S = o.series.length;
  const totals = o.labels.map((_, i) => o.stacked ? o.series.reduce((a, s) => a + s.data[i], 0) : Math.max(...o.series.map(s => s.data[i])));
  const max = (o.max || Math.max(...totals)) * 1.08;
  const bw = (W - pl - pr) / n, innerH = H - pt - pb;
  let out = '';
  [0.25, 0.5, 0.75, 1].forEach(g => { const y = pt + innerH * (1 - g / 1.08); out += `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}"/>`; });
  o.labels.forEach((lab, i) => {
    const x0 = pl + i * bw; let yAcc = 0;
    const gw = o.stacked ? Math.min(bw * 0.56, 26) : Math.min((bw * 0.72) / S, 18);
    o.series.forEach((s, si) => {
      const h = (s.data[i] / max) * innerH;
      const x = o.stacked ? x0 + (bw - gw) / 2 : x0 + (bw - gw * S - (S - 1) * 3) / 2 + si * (gw + 3);
      const y = pt + innerH - h - yAcc;
      if (h > 0.5) out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${gw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(4, gw / 2)}" fill="${tone(s.tone)}"${o.hi != null && o.hi !== i ? ' opacity=".45"' : ''}/>`;
      if (o.stacked) yAcc += h;
    });
    out += `<text x="${(x0 + bw / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle">${lab}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || 'Bar chart')}">${out}</svg>`;
}

/** lineChart({labels, series:[{tone,data,area}], height}) */
function lineChart(o) {
  const W = 340, H = o.height || 160, pl = 6, pr = 6, pt = 12, pb = 22;
  const all = o.series.flatMap(s => s.data); const min = o.min != null ? o.min : Math.min(...all) * 0.92, max = Math.max(...all) * 1.06;
  const n = o.labels.length, innerW = W - pl - pr, innerH = H - pt - pb;
  const X = i => pl + (innerW * i) / (n - 1), Y = v => pt + innerH * (1 - (v - min) / (max - min));
  let out = '';
  [0, 0.33, 0.66, 1].forEach(g => { const y = pt + innerH * g; out += `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}"/>`; });
  o.series.forEach((s, si) => {
    const pts = s.data.map((v, i) => [X(i), Y(v)]);
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2; d += ` C${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`; }
    const id = 'lg' + Math.random().toString(36).slice(2, 7);
    if (s.area !== false && si === 0) out += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tone(s.tone)}" stop-opacity=".22"/><stop offset="1" stop-color="${tone(s.tone)}" stop-opacity="0"/></linearGradient></defs><path d="${d} L${X(n - 1).toFixed(1)},${pt + innerH} L${X(0).toFixed(1)},${pt + innerH} Z" fill="url(#${id})"/>`;
    out += `<path d="${d}" fill="none" stroke="${tone(s.tone)}" stroke-width="2.500" stroke-linecap="round"${s.dash ? ' stroke-dasharray="4 5"' : ''}/>`;
    if (!s.dash) { const [lx, ly] = pts[pts.length - 1]; out += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="4.500" fill="#fff" stroke="${tone(s.tone)}" stroke-width="2.500"/>`; }
  });
  const step = Math.ceil(n / 7);
  o.labels.forEach((lab, i) => { if (i % step === 0 || i === n - 1) out += `<text x="${X(i).toFixed(1)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}">${lab}</text>`; });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || 'Line chart')}">${out}</svg>`;
}

/** donut({segments:[{label,value,tone}], center, sub}) */
function donut(o) {
  const total = o.segments.reduce((a, s) => a + s.value, 0), R = 46, C = 2 * Math.PI * R; let acc = 0, out = '';
  o.segments.forEach(s => { const len = (s.value / total) * C; out += `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${tone(s.tone)}" stroke-width="14" stroke-dasharray="${Math.max(len - 2.5, 0).toFixed(2)} ${(C - len + 2.5).toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}" transform="rotate(-90 60 60)" stroke-linecap="butt"/>`; acc += len; });
  const svg = `<svg class="chart" viewBox="0 0 120 120" role="img" aria-label="${esc(o.label || 'Donut chart')}">${out}<text x="60" y="${o.sub ? 58 : 65}" text-anchor="middle" style="font:700 20px var(--font-display);fill:var(--ink);letter-spacing:-.02em">${o.center || ''}</text>${o.sub ? `<text x="60" y="75" text-anchor="middle">${o.sub}</text>` : ''}</svg>`;
  if (o.legend === false) return svg;
  return `<div class="donut-wrap">${svg}<div class="legend">${o.segments.map(s => `<span><i style="background:${tone(s.tone)}"></i>${s.label}${s.show ? ` <b class="num">${s.show}</b>` : ''}</span>`).join('')}</div></div>`;
}
function spark(data, t = 'brand', w = 84, h = 28) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => `${((w - 4) * i / (data.length - 1) + 2).toFixed(1)},${(h - 3 - (h - 6) * (v - min) / (max - min || 1)).toFixed(1)}`).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${tone(t)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function legend(items) { return `<div class="legend">${items.map(([l, t]) => `<span><i style="background:${tone(t)}"></i>${l}</span>`).join('')}</div>`; }

module.exports = { icon, esc, money, attrs, mark, logo, badge, rule, btn, pageHead, sectionHead, card, stat, stats, row, list, kv, callout, guard, avatar, avatars, thumb, cover, facts, glass, bar, stagebar, lifecycle, timeline, tabs, panel, seg, chips, table, sheet, field, toggle, choice, stars, docIco, chat, composer, qr, barChart, lineChart, donut, spark, legend, tone };
