// Marketing-site shell and shared blocks.
const ui = require('./ui');
const { icon, logo, btn, esc, badge } = ui;
const { company } = require('./data');

const NAV = [['search', 'Find a home', 'Verified listings'], ['landlords', 'Landlords', 'Let it yourself, legally'], ['tenants', 'Tenants', 'Rent without commission'], ['contractors', 'Pros', 'Jobs for contractors'], ['pricing', 'Pricing', 'Flat fees, no 5%'], ['legal', 'Rulebook', 'The law, built in']];

/** iOS-style status bar drawn above each screenshot so the camera notch never covers the app header */
const STATUS = '<div class="phone-status" aria-hidden="true"><span>9:41</span><svg viewBox="0 0 66 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="6" width="3" height="6" rx="1"/><rect x="9" y="3.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="1" width="3" height="11" rx="1"/><path d="M30 2.2c2.6 0 5 1 6.8 2.7l-1.4 1.5A7.8 7.8 0 0 0 30 4.2c-2 0-3.9.8-5.4 2.2l-1.4-1.5A9.8 9.8 0 0 1 30 2.2Zm0 3.9c1.6 0 3 .6 4.1 1.6l-1.4 1.5a4 4 0 0 0-5.4 0l-1.4-1.5c1.1-1 2.5-1.6 4.1-1.6Zm0 3.8c.6 0 1.1.2 1.5.6L30 12l-1.5-1.5c.4-.4.9-.6 1.5-.6Z"/><rect x="41.5" y="1.5" width="20" height="9" rx="2.6" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="43.5" y="3.5" width="14" height="5" rx="1.3"/><path d="M63.5 4.5v3a1.6 1.6 0 0 0 0-3Z" fill-opacity=".4"/></svg></div>';
/** Phone frame around a dashboard screenshot */
function phone(shot, o = {}) {
  return `<div class="phone ${o.cls || ''}"><div class="phone-screen">${STATUS}<img src="assets/shots/${shot}.webp" alt="${esc(o.alt || 'openrent.me app screen')}" loading="${o.eager ? 'eager' : 'lazy'}" width="390" height="800"></div></div>`;
}
function phoneFig(shot, title, sub, cls = '') { return `<figure>${phone(shot, { alt: title, cls })}<figcaption>${title}<span>${sub}</span></figcaption></figure>`; }
function browser(shot, url, alt) {
  return `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${url}</span></div><img src="assets/shots/${shot}.webp" alt="${esc(alt || 'openrent.me dashboard')}" loading="lazy" width="1360" height="850"></div>`;
}
const ticks = items => `<ul class="ticks">${items.map(t => `<li>${icon('circle-check', 20)}<span>${t}</span></li>`).join('')}</ul>`;
const secHead = (o) => `<div class="sec-head ${o.center ? 'center' : ''}">${o.kicker ? `<span class="eyebrow">${o.kicker}</span>` : ''}<h2 class="d2">${o.title}</h2>${o.sub ? `<p>${o.sub}</p>` : ''}</div>`;
const ctaBand = (title, sub, a, b) => `<section class="sec tight"><div class="wrap"><div class="cta-band"><div><h2 class="d2">${title}</h2><p class="mt-3" style="opacity:.85;max-width:46ch">${sub}</p></div><div class="cluster" style="flex:none">${a}${b || ''}</div></div></div></section>`;

/** Savings calculator (wired up by assets/js/site.js) */
function calc() {
  return `<div class="calc" data-calc>
    <div class="between"><span class="label">Annual rent</span><span class="display" style="font-size:24px;font-weight:700">AED <span data-calc-rent>105,000</span></span></div>
    <input class="range mt-2" type="range" min="30000" max="400000" step="5000" value="105000" aria-label="Annual rent">
    <div class="between micro muted"><span>AED 30k</span><span>AED 400k</span></div>
    <div class="calc-out">
      <div><span class="small muted">Typical agent · 5% commission</span><b>AED <span data-calc-agent>5,250</span></b></div>
      <div class="win"><span class="small" style="opacity:.8">openrent.me · tenant fee</span><b>AED 249</b></div>
    </div>
    <div class="calc-save"><span>A tenant keeps</span><b>AED <span data-calc-save>5,001</span></b></div>
    <p class="micro muted mt-3">Illustration before VAT. Agency commission in Dubai is typically 5% of annual rent, usually paid by the tenant. Landlords pay openrent.me AED 1,198 per let (List.me + Let.me).</p>
  </div>`;
}

function sitePage(o) {
  const nav = NAV.map(([s, l]) => `<a href="${s}.html" class="${o.active === s ? 'is-active' : ''}">${l}</a>`).join('');
  const mnav = ui.sheet('sheet-nav', 'Menu', `<nav class="mnav">${NAV.map(([s, l, d]) => `<a href="${s}.html">${l}<span>${d}</span></a>`).join('')}<a href="how-it-works.html">How it works<span>Listing to keys back</span></a><a href="help.html">Help<span>Questions answered</span></a></nav>
    <div class="btn-row">${btn('Sign in', { href: 'signin.html' })}${btn('See the dashboards', { href: 'app/index.html', variant: 'primary' })}</div>`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F7F3EC">
<meta name="format-detection" content="telephone=no">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc || 'openrent.me — the start-to-finish renting platform for Dubai. Verified listings, Ejari-registered contracts, safeguarded deposits and repairs, for a flat fee.')}">
<link rel="icon" href="assets/img/favicon.svg">
<link rel="stylesheet" href="assets/css/app.css">
<link rel="stylesheet" href="assets/css/site.css">
</head>
<body class="site ${o.cls || ''}">
<header class="site-head" id="topbar"><div class="wrap">
  <a href="index.html" aria-label="openrent.me home">${logo()}</a>
  <nav class="site-nav" aria-label="Main">${nav}</nav>
  <div class="grow"></div>
  ${btn('Sign in', { href: 'signin.html', size: 'sm', variant: 'ghost', cls: 'only-wide' })}
  ${btn('Open the demo', { href: 'app/index.html', size: 'sm', variant: 'dark' })}
  <button type="button" class="icon-btn nav-toggle" data-sheet="sheet-nav" aria-label="Menu">${icon('menu', 22)}</button>
</div></header>
<main>
${o.body}
</main>
<footer class="site-foot"><div class="wrap">
  <div class="foot-grid">
    <div class="stack stack-md">${logo('on-dark lg')}<p style="max-width:34ch">Renting in Dubai, start to finish — for me, for you, for everyone on the contract.</p><p class="ar" style="font-size:18px;color:#fff;text-align:left;direction:rtl">استأجر بثقة</p></div>
    <div><h4>Rent</h4><ul><li><a href="search.html">Find a home</a></li><li><a href="tenants.html">For tenants</a></li><li><a href="legal.html">Your rights</a></li><li><a href="app/tenant/index.html">Tenant dashboard</a></li></ul></div>
    <div><h4>Let</h4><ul><li><a href="landlords.html">For landlords</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="how-it-works.html">How it works</a></li><li><a href="app/landlord/index.html">Landlord dashboard</a></li></ul></div>
    <div><h4>Work</h4><ul><li><a href="contractors.html">For contractors</a></li><li><a href="app/contractor/index.html">Contractor dashboard</a></li><li><a href="app/manager/index.html">Manager dashboard</a></li><li><a href="app/admin/index.html">Admin dashboard</a></li></ul></div>
    <div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="help.html">Help centre</a></li><li><a href="app/rulebook.html">Full rulebook</a></li><li><a href="signin.html">Sign in</a></li></ul></div>
  </div>
  <div class="foot-legal">
    <span>${company.legal} · ${company.orn} · ${company.licence} · ${company.address}</span>
    <span>Concept mock-up with invented people, properties, licence numbers and figures. Legal summaries are simplified and are not legal advice. Not affiliated with any existing letting platform or government body.</span>
    <span>© 2026 openrent.me</span>
  </div>
</div></footer>
${mnav}${o.sheets || ''}
${o.buybar || ''}
<div class="toast" id="toast" role="status" style="bottom:calc(24px + var(--sab));left:50%">${icon('circle-check', 18)}<span></span></div>
<script src="assets/js/app.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/states.js"></script>
</body></html>`;
}

module.exports = { sitePage, phone, phoneFig, browser, ticks, secHead, ctaBand, calc, NAV };
