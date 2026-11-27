// App shell: sidebar (desktop), top bar, bottom tab bar (phones), "More" sheet and role switcher.
const ui = require('./ui');
const { icon, logo, mark, avatar, esc } = ui;
const { people } = require('./data');

const ROLE_ORDER = ['tenant', 'landlord', 'contractor', 'manager', 'admin', 'rep', 'field', 'compliance'];
const ROLE_COLORS = { tenant: '#F0653A', landlord: '#0B6B5D', contractor: '#B98A34', manager: '#27619E', admin: '#5B4BB7', rep: '#0E7490', field: '#A2466C', compliance: '#3F5B4A' };

function head(title, base, extraCss = '') {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F7F3EC">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="format-detection" content="telephone=no">
<title>${esc(title)}</title>
<link rel="icon" href="${base}assets/img/favicon.svg">
<link rel="stylesheet" href="${base}assets/css/app.css">${extraCss}
</head>`;
}

/**
 * role: { id, label, home, nav:[{key,label,icon,href,tab,group,count,hot}] }
 * page: { title, sub, nav, back, body, sheets }
 */
function appPage(role, page, roles) {
  const base = '../../';
  const person = people[role.id];
  const tabs = role.nav.filter(n => n.tab).slice(0, 4);
  const rest = role.nav.filter(n => !tabs.includes(n));
  const active = page.nav;
  const moreActive = rest.some(n => n.key === active);

  let side = '', group = null;
  role.nav.forEach(n => {
    if (n.group && n.group !== group) { side += `<div class="side-group">${n.group}</div>`; group = n.group; }
    side += `<a href="${n.href}" class="${n.key === active ? 'is-active' : ''}">${icon(n.icon, 18)}<span>${n.label}</span>${n.count ? `<span class="count${n.hot ? ' hot' : ''}">${n.count}</span>` : ''}</a>`;
  });

  const tabbar = tabs.map(n => `<a href="${n.href}" class="${n.key === active ? 'is-active' : ''}"><span class="tab-ico">${icon(n.icon, 21)}</span><span>${n.short || n.label}</span>${n.count && n.hot ? `<span class="tab-badge">${n.count}</span>` : ''}</a>`).join('')
    + `<button type="button" data-sheet="sheet-more" class="${moreActive ? 'is-active' : ''}"><span class="tab-ico">${icon('layout-grid', 21)}</span><span>More</span></button>`;

  const roleList = ROLE_ORDER.filter(id => roles[id]).map(id => `<a href="../${id}/index.html" class="${id === role.id ? 'is-active' : ''}"><span class="rl-dot" style="background:${ROLE_COLORS[id]}"></span>${avatar(people[id].name, { size: 'sm' })}<span class="grow"><b class="strong" style="display:block;font-size:14px;line-height:1.2">${roles[id].label}</b><span class="small muted">${people[id].name} · ${people[id].sub}</span></span>${id === role.id ? icon('check', 18) : icon('chevron-right', 18, 'faint')}</a>`).join('');

  const moreSheet = ui.sheet('sheet-more', role.label + ' menu',
    `<div class="menu-grid">${role.nav.map(n => `<a href="${n.href}" class="${n.key === active ? 'is-active' : ''}"><span class="row-ico role">${icon(n.icon, 22)}</span>${n.label}</a>`).join('')}</div>
     <button type="button" class="btn block" data-sheet="sheet-roles">${icon('repeat', 18)}<span>Switch demo role</span></button>
     <a class="btn ghost block" href="${base}index.html">${icon('globe', 18)}<span>openrent.me website</span></a>`);

  const rolesSheet = ui.sheet('sheet-roles', 'View the demo as…',
    `<p class="small muted">This is a clickable mock-up. Every role sees the same tenancies from its own side.</p><div class="role-list">${roleList}</div>
     <a class="btn ghost block" href="../index.html">${icon('layout-dashboard', 18)}<span>All dashboards</span></a>`);

  const left = page.back
    ? `<a class="icon-btn back-btn" href="${page.back}" aria-label="Back">${icon('chevron-left', 22)}</a>`
    : `<a class="brandmark" href="${role.home || 'index.html'}" aria-label="openrent.me home">${mark().replace('class="mark"', 'class="mark" width="32" height="32"')}</a>`;

  return `${head(`${page.title} · ${role.label} · openrent.me`, base)}
<body class="app role-${role.id}">
<a class="skip-link" href="#main">Skip to content</a>
<aside class="sidenav" aria-label="${role.label} navigation">
  <a href="${role.home || 'index.html'}">${logo('on-dark')}</a>
  <button type="button" class="side-role" data-sheet="sheet-roles">${avatar(person.name, { ring: true })}<span class="grow"><b>${person.name}</b><span>${role.label} · ${person.sub}</span></span>${icon('chevrons-up-down', 16)}</button>
  <nav>${side}</nav>
  <div class="side-foot">
    <a class="btn on-dark sm block" href="${base}index.html">${icon('globe', 16)}<span>openrent.me website</span></a>
    <p class="side-legal">Clickable mock-up · demo data.<br>Today is Tue 24 Nov 2026.</p>
  </div>
</aside>
<header class="topbar" id="topbar">
  ${left}
  <div class="topbar-title">${/<h1[\s>]/.test(page.body) ? `<b>${page.title}</b>` : `<h1 class="topbar-h1">${page.title}</h1>`}${page.sub ? `<span>${page.sub}</span>` : ''}</div>
  <button type="button" class="topbar-search" data-toast="Search across ${role.label.toLowerCase()} records is not wired up in this mock-up">${icon('search', 16)}<span>Search</span><kbd>⌘K</kbd></button>
  <a class="icon-btn" href="${role.notifications || '#'}" aria-label="Notifications"${role.notifications ? '' : ' data-toast="You are all caught up (demo)"'}>${icon('bell', 21)}${role.notifications ? '<span class="dot"></span>' : ''}</a>
  <button type="button" class="icon-btn" data-sheet="sheet-roles" aria-label="Account and role">${avatar(person.name, { size: 'sm', ring: true })}</button>
</header>
<main class="main" id="main" tabindex="-1"><div class="page${page.narrow ? ' narrow' : ''}">
${page.body}
</div></main>
<nav class="tabbar" aria-label="Primary">${tabbar}</nav>
${moreSheet}${rolesSheet}${page.sheets || ''}
<div class="toast" id="toast" role="status">${icon('circle-check', 18)}<span></span></div>
<script src="${base}assets/js/app.js"></script>
</body></html>`;
}

/** Stand-alone app page (no role navigation) — used by the hub and the shared rulebook */
function plainPage(o) {
  const base = o.base || '../';
  return `${head(o.title + ' · openrent.me', base)}
<body class="app-plain ${o.cls || ''}">
<header class="topbar" id="topbar" style="padding-left:calc(12px + var(--sal))">
  ${o.back ? `<a class="icon-btn" href="${o.back}" aria-label="Back"${o.historyBack ? ' data-back' : ''}>${icon('chevron-left', 22)}</a>` : ''}
  <a href="${base}index.html" style="display:flex;align-items:center">${logo()}</a>
  <div class="grow"></div>
  ${o.actions || ''}
</header>
<main class="main" style="padding-bottom:calc(40px + var(--sab))"><div class="page${o.narrow ? ' narrow' : ''}">
${o.body}
</div></main>
${o.sheets || ''}
<div class="toast" id="toast" role="status">${icon('circle-check', 18)}<span></span></div>
<script src="${base}assets/js/app.js"></script>
</body></html>`;
}

module.exports = { appPage, plainPage, head, ROLE_ORDER, ROLE_COLORS };
