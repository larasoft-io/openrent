const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, cover, glass, bar, timeline, avatar, money, sectionHead, sheet, field, stats } = ui;
const { P } = require('../../lib/data');
const B = '../../';
const p = P.p1;

const quick = (ic, label, href, tone = 'role') => `<a class="card pad link-card stack stack-sm" href="${href}"><span class="row-ico ${tone}">${icon(ic, 20)}</span><b class="strong" style="font-size:14px;line-height:1.25">${label}</b></a>`;

const home = {
  slug: 'index', nav: 'home', title: 'Home', sub: 'Tue 24 Nov 2026',
  body: () => `
<header class="page-head"><div class="ph-text"><span class="eyebrow">Good morning</span><h1>Welcome home, Maya</h1></div></header>

<div class="split">
<div class="stack">
  <a href="tenancy.html" class="card link-card" style="overflow:hidden">
    ${cover(p.img, { cls: 'banner flat', alt: 'Marina Gate 1', tags: glass('Ejari registered', 'badge-check') + glass('Month 9 of 12', null, true), grad: `<div class="between"><div><div class="h2" style="color:#fff">${p.name}</div><div class="small" style="opacity:.85">${p.area} · 1 bed · ${p.sqft} sq ft</div></div>${icon('chevron-right', 22)}</div>` }, B)}
    <div class="card-body stack stack-sm">
      <div class="between small"><span class="muted">1 Mar 2026</span><span class="strong">96 days left</span><span class="muted">28 Feb 2027</span></div>
      ${bar(74, 'accent', true)}
    </div>
  </a>

  ${sectionHead('Needs your attention')}
  <div class="card">
    ${list([
      { href: 'renewal.html', icon: 'refresh-cw', tone: 'accent', title: 'Renewal offer from Fatima', badge: badge('Reply by 18 Dec', 'warn'), sub: 'AED 110,000 for next year (+4.8%). Checked against the Smart Rental Index — it is within the legal limit.' },
      { href: 'repair-detail.html', icon: 'wrench', tone: 'info', title: 'Plumber arriving today, 11:30–12:30', badge: badge('On schedule', 'ok', { dot: true }), sub: 'Imran from Falcon Technical · kitchen tap leak · your landlord is paying' },
      { href: 'household.html', icon: 'user-plus', tone: 'brand', title: 'Confirm who lives with you', sub: 'Rohan is registered. Tell us if anyone else has moved in so your Ejari stays accurate.' },
    ])}
  </div>

  <div class="grid g2 sm4">
    ${quick('wrench', 'Report a repair', 'repairs.html#sheet-new-repair')}
    ${quick('receipt-text', 'Receipts & statements', 'payments.html#tab=pay:history')}
    ${quick('file-badge', 'Ejari certificate', 'documents.html')}
    ${quick('message-circle', 'Message landlord', 'thread.html')}
  </div>

  ${sectionHead('Recent activity', 'See all', 'notifications.html')}
  <div class="card pad">
    ${timeline([
      { state: 'now', icon: 'truck', title: 'Imran is on the way', body: 'Estimated arrival 11:25. You will get a doorbell notification.', when: 'Today, 10:52' },
      { state: 'done', icon: 'refresh-cw', title: 'Renewal offer received', body: 'Sent 102 days before your contract ends — inside the 90-day rule.', when: 'Wed 18 Nov', extra: rule('DXB-014', '90-day notice') },
      { state: 'done', icon: 'banknote', title: 'November rent collected', body: 'AED 8,750 by direct debit · receipt RCPT-2611-0042', when: 'Sun 1 Nov' },
      { state: 'done', icon: 'wrench', title: 'Washing machine repair completed', body: 'You rated Falcon Technical 5 stars.', when: 'Wed 14 Oct' },
    ])}
  </div>
</div>

<aside class="stack">
  <div class="card brand pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Next rent payment</span>${badge('Direct debit', 'solid')}</div>
    <div><div class="hero-num">AED 8,750</div><div class="small muted mt-1">Tue 1 Dec 2026 · Emirates NBD ••4417</div></div>
    <div class="stack stack-sm"><div class="between small"><span class="muted">9 of 12 instalments paid</span><span class="strong">AED 78,750</span></div><div class="bar thin" style="background:rgba(255,255,255,.22)"><i style="width:75%;background:#fff"></i></div></div>
    <div class="btn-row">${btn('Payment schedule', { href: 'payments.html', variant: 'white', size: 'sm' })}${btn('Pay early', { variant: 'on-dark', size: 'sm', sheet: 'sheet-pay' })}</div>
  </div>

  ${guard({ title: 'You are protected', sub: 'Ruleset Dubai 2026.3 applies to your tenancy', checks: [
    { state: 'ok', title: 'Rent cannot rise above the index', sub: 'Any increase must follow Decree 43/2013 and be notified 90 days ahead.' },
    { state: 'ok', title: 'Deposit of AED 5,250 is safeguarded', sub: 'Held in a client account, not by your landlord.' },
    { state: 'plus', title: '3 terms better than the law requires', sub: 'Early exit, repairs and AC servicing.' },
  ], end: `<a class="link small" href="rights.html">View</a>` })}

  ${card({ title: 'Your people', flush: true, body: list([
    { href: 'thread.html', lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · usually replies within 2 hours' },
    { href: 'messages.html', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', sub: 'Your openrent.me manager · RERA BRN 61204' },
    { toast: 'Calling Marina Gate security desk… (demo)', lead: `<span class="row-ico">${icon('building-2', 20)}</span>`, title: 'Marina Gate front desk', sub: 'Building management · 24 hours', chev: true },
  ]) })}

  ${callout({ tone: 'neutral', icon: 'droplets', title: 'Building notice', body: 'Water will be off Thu 26 Nov, 10:00–12:00 for pump maintenance (Marina Gate FM).' })}
</aside>
</div>`,
  sheets: () => sheet('sheet-pay', 'Pay December early',
    `${kv([['December rent', money(8750)], ['Due date', 'Tue 1 Dec 2026'], ['Method', 'Direct debit · Emirates NBD ••4417']])}
     ${callout({ tone: 'neutral', title: 'Nothing to do', body: 'Your direct debit will collect automatically on the due date. Paying early by card is optional and adds a 1.9% card fee (AED 166.25).' })}`,
    btn('Keep direct debit', { attrs: { 'data-close': true } }) + btn('Pay by card now', { variant: 'primary', toast: 'Card payment started (demo)' })),
};

const notifications = {
  slug: 'notifications', nav: 'home', title: 'Notifications', back: 'index.html', narrow: true,
  body: () => `
${ui.pageHead({ title: 'Notifications', actions: btn('Mark all read', { size: 'sm', toast: 'All notifications marked as read' }) })}
${ui.chips(['All', ['Action needed', 2], 'Payments', 'Repairs', 'Legal'])}
<div class="hr-label">Today</div>
<div class="card">${list([
  { href: 'repair-detail.html', unread: true, icon: 'truck', tone: 'info', title: 'Imran is on the way', sub: 'Falcon Technical · arriving about 11:25 for your kitchen tap', endSub: '10:52' },
  { href: 'messages.html', unread: true, icon: 'droplets', tone: '', title: 'Water shut-off on Thursday', sub: 'Marina Gate FM · 26 Nov, 10:00–12:00', endSub: '09:10' },
])}</div>
<div class="hr-label">This week</div>
<div class="card">${list([
  { href: 'renewal.html', unread: true, icon: 'refresh-cw', tone: 'accent', title: 'Your landlord sent a renewal offer', sub: 'AED 110,000 · within the legal limit · reply by 18 Dec', endSub: 'Wed' },
  { href: 'repairs.html', icon: 'circle-check', tone: 'ok', title: 'Repair approved by your landlord', sub: 'Kitchen tap leak · landlord pays', endSub: 'Sat' },
  { href: 'rights.html', icon: 'shield-check', tone: 'brand', title: 'Reminder: the 90-day window closes on 30 Nov', sub: 'After that date your terms cannot be changed for the coming year.', endSub: 'Fri' },
])}</div>
<div class="hr-label">Earlier</div>
<div class="card">${list([
  { href: 'payments.html', icon: 'banknote', tone: 'ok', title: 'November rent collected', sub: 'AED 8,750 by direct debit', endSub: '1 Nov' },
  { href: 'rights.html', icon: 'scale', tone: 'brand', title: 'Your protections were updated', sub: 'Ruleset 2026.3 · Shared Housing Law now applies to all tenancies', endSub: '26 Aug' },
  { href: 'setup.html', icon: 'thermometer-snowflake', tone: 'info', title: 'AC service booked', sub: 'Thu 3 Dec, 09:00 · included in your tenancy', endSub: '20 Oct' },
])}</div>`,
};

module.exports = [home, notifications];
