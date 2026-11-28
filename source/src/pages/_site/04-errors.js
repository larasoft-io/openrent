// Full-page states served by the host: 404 (not found), 500 (server error), offline fallback and no access.
// They sit at the site root so a static host can serve them for any path.
const S = require('../../lib/site');

/** The brand doorway, drawn large, with a small prop that says what went wrong. */
function door(kind) {
  const prop = {
    404: `<g transform="translate(150 54)"><path d="M12 0v14" stroke="#B98A34" stroke-width="2"/><rect x="-14" y="14" width="52" height="34" rx="6" fill="#F6ECD6" stroke="#B98A34" stroke-width="2" transform="rotate(8 12 31)"/><text x="12" y="38" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="18" fill="#7A5A1C" transform="rotate(8 12 31)">?</text></g>`,
    500: `<g transform="translate(160 118)"><path d="M18 0 32 52H4z" fill="#F0653A"/><path d="M11 22h14l3 11H8z" fill="#fff"/><rect x="-4" y="50" width="44" height="8" rx="3" fill="#B8401A"/></g>`,
    offline: `<g transform="translate(140 40)"><path d="M18 40h40a14 14 0 0 0 0-28 20 20 0 0 0-38-2A15 15 0 0 0 18 40z" fill="#fff" stroke="#C9C0B1" stroke-width="2"/><path d="M14 4l52 44" stroke="#B8322B" stroke-width="3" stroke-linecap="round"/></g>`,
    lock: `<g transform="translate(108 104)"><path d="M6 14v-6a10 10 0 0 1 20 0v6" fill="none" stroke="#5C6B65" stroke-width="4"/><rect x="0" y="14" width="32" height="26" rx="6" fill="#E7A93B"/><circle cx="16" cy="25" r="3.5" fill="#7A5A1C"/><path d="M16 27v6" stroke="#7A5A1C" stroke-width="3" stroke-linecap="round"/></g>`,
  }[kind] || '';
  const ajar = kind !== 'lock';
  return `<svg class="fs-art" viewBox="0 0 240 200" aria-hidden="true">
  <ellipse cx="120" cy="182" rx="96" ry="10" fill="#E7E1D6"/>
  <path d="M62 180V84c0-32 26-58 58-58s58 26 58 58v96z" fill="#DDEFEA"/>
  <path d="M74 180V86c0-26 20.6-47 46-47s46 21 46 47v94z" fill="#0B6B5D"/>
  ${ajar ? `<path d="M120 39c25.400 0 46 21 46 47v94l-46-14z" fill="#0E1D1A" opacity=".92"/><path d="M74 180V86c0-26 20.600-47 46-47v127z" fill="#F7F3EC"/><circle cx="108" cy="118" r="4.500" fill="#F0653A"/>` : `<path d="M120 39v141" stroke="#074A41" stroke-width="2"/>`}
  ${prop}
</svg>`;
}

const links = items => `<div class="fs-links">${items.map(([href, ic, label]) => `<a href="${href}">${ic}<span>${label}</span></a>`).join('')}</div>`;

module.exports = [
  {
    slug: '404',
    render: ({ ui }) => S.sitePage({
      title: 'Page not found · openrent.me', desc: 'This page doesn’t exist or has moved.',
      body: `<section class="sec"><div class="wrap"><div class="full-state"><div class="fs-inner">
  ${door(404)}
  <span class="fs-code">Error 404</span>
  <h1 class="d2">This door doesn’t lead anywhere</h1>
  <p>The page may have moved, or the link has a typo. If you followed a link from an email about your tenancy, sign in and you’ll find it on your dashboard.</p>
  <div class="cluster" style="justify-content:center">${ui.btn('Go to the home page', { href: 'index.html', variant: 'primary', icon: 'house' })}${ui.btn('Sign in', { href: 'signin.html', icon: 'log-in' })}</div>
  ${links([['search.html', ui.icon('search', 18), 'Find a home'], ['landlords.html', ui.icon('building-2', 18), 'Let my home'], ['help.html', ui.icon('life-buoy', 18), 'Help centre'], ['app/index.html', ui.icon('layout-dashboard', 18), 'All dashboards']])}
</div></div></div></section>`,
    }),
  },
  {
    slug: '500',
    render: ({ ui, shell }) => shell.plainPage({
      title: 'Something went wrong', base: './', narrow: true,
      body: `<div class="full-state"><div class="fs-inner">
  ${door(500)}
  <span class="fs-code">Error 500</span>
  <h1>Something went wrong on our side</h1>
  <p>It’s not you, and nothing you entered has been lost. We’ve been alerted and are on it. Please try again in a minute.</p>
  <div class="cluster" style="justify-content:center">${ui.btn('Try again', { variant: 'primary', icon: 'refresh-cw', attrs: { onclick: 'location.reload()' } })}${ui.btn('Go to the home page', { href: 'index.html', icon: 'house' })}</div>
  <div class="callout ok" style="text-align:left;width:100%">${ui.icon('shield-check', 20)}<div class="grow"><h4>Your money and contracts are safe</h4><p>Direct debits, cheque lodging and Ejari registrations run separately from this website and are not affected.</p></div></div>
  <p class="fs-meta">Ref <span class="code">ERR-2411-5XX0</span> · quote this if you contact support · <a class="link" href="help.html">Help centre</a></p>
</div></div>`,
    }),
  },
  {
    slug: 'offline',
    render: ({ ui, shell }) => shell.plainPage({
      title: 'You’re offline', base: './', narrow: true,
      body: `<div class="full-state"><div class="fs-inner">
  ${door('offline')}
  <span class="fs-code" style="background:var(--warn-soft);color:var(--warn)">No connection</span>
  <h1>You’re offline</h1>
  <p>Check your Wi-Fi or mobile data. The pages you opened recently are saved on this device, and anything you do is sent when you’re back online.</p>
  <div class="cluster" style="justify-content:center">${ui.btn('Try again', { variant: 'primary', icon: 'refresh-cw', attrs: { onclick: 'location.reload()' } })}</div>
  <div class="card" style="width:100%;text-align:left">
    <div class="card-head"><h3>Still available offline</h3></div>
    ${ui.list([
      { icon: 'file-text', tone: 'brand', title: 'Tenancy contract', sub: 'Saved 24 Nov · PDF', href: 'app/tenant/tenancy.html' },
      { icon: 'badge-check', tone: 'brand', title: 'Ejari certificate', sub: 'Saved 24 Nov · with QR code', href: 'app/tenant/documents.html' },
      { icon: 'key-round', tone: 'brand', title: 'Building access and Wi-Fi details', sub: 'Saved 24 Nov', href: 'app/tenant/setup.html' },
    ])}
  </div>
  <div class="card" style="width:100%;text-align:left">
    <div class="card-head"><h3>Emergency numbers</h3></div>
    ${ui.list([
      { icon: 'siren', tone: 'danger', title: 'Police', end: '<a href="tel:999">999</a>' },
      { icon: 'ambulance', tone: 'danger', title: 'Ambulance', end: '<a href="tel:998">998</a>' },
      { icon: 'flame', tone: 'danger', title: 'Civil Defence (fire)', end: '<a href="tel:997">997</a>' },
      { icon: 'zap', tone: 'warn', title: 'DEWA emergency (power and water)', end: '<a href="tel:991">991</a>' },
    ])}
  </div>
</div></div>`,
    }),
  },
  {
    slug: 'no-access',
    render: ({ ui, shell }) => shell.plainPage({
      title: 'You don’t have access to this page', base: './', narrow: true,
      body: `<div class="full-state"><div class="fs-inner">
  ${door('lock')}
  <span class="fs-code" style="background:var(--sunk);color:var(--ink-2)">Error 403</span>
  <h1>This page belongs to another account</h1>
  <p>You’re signed in as <b class="strong" style="color:var(--ink)">Maya Fernandes (Tenant)</b>. This page is part of a landlord’s dashboard. Tenancy records are only shown to the people on the contract and their licensed manager.</p>
  <div class="cluster" style="justify-content:center">${ui.btn('Go to my dashboard', { href: 'app/tenant/index.html', variant: 'primary', icon: 'layout-dashboard' })}${ui.btn('Switch account', { href: 'signin.html', icon: 'repeat' })}</div>
  <p class="fs-meta">Think you should have access? Ask the landlord to add you, or <a class="link" href="help.html">contact support</a>.</p>
</div></div>`,
    }),
  },
];
