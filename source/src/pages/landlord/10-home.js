const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, thumb, bar, stagebar, timeline, avatar, money, sectionHead, sheet, stats, barChart, legend, pageHead, chips } = ui;
const { properties, P, STAGES } = require('../../lib/data');
const B = '../../';

// where each property's card should take the landlord
const LINK = { p1: 'property.html', p2: 'listing.html', p3: 'notices.html', p4: 'contract.html', p5: 'moveout.html', p6: 'listing-new.html', p7: 'arrears.html' };

const propRow = p => `<a class="row" href="${LINK[p.id]}">${thumb(p.img, 'lg', B)}<div class="row-main">
  <div class="row-title">${p.short}${badge(p.status, p.tone, { dot: true })}</div>
  <div class="row-sub">${p.area} · ${money(p.rent)}${p.tenant ? ' · ' + p.tenant : ''}</div>
  <div class="mt-2">${stagebar(12, p.stage)}</div>
  <div class="micro muted mt-1">Stage ${p.stage + 1} of 12 · ${STAGES[p.stage]} — ${p.note}</div>
</div><span class="row-chev">${icon('chevron-right', 18)}</span></a>`;

const home = {
  slug: 'index', nav: 'home', title: 'Portfolio', sub: 'Tue 24 Nov 2026',
  body: () => `
${pageHead({ eyebrow: 'Good morning', title: 'Welcome back, Fatima', sub: 'Seven properties, six things that need you today. Everything else is on track.', actions: btn('Add property', { icon: 'plus', variant: 'primary', href: 'listing-new.html' }) })}

${stats([
  { label: 'Rent roll', icon: 'banknote', value: '783,000', unit: 'AED / yr', sub: '5 let homes' },
  { label: 'Occupancy', icon: 'house', value: '5 / 7', sub: '2 being let now' },
  { label: 'Collected in Nov', icon: 'circle-check', value: '8,750', unit: 'AED', sub: 'of AED 45,000 due' },
  { label: 'Arrears', icon: 'circle-alert', value: '36,250', unit: 'AED', delta: '1 home', deltaDir: 'down', sub: 'notice running' },
])}

<div class="split">
<div class="stack">
  ${sectionHead('Needs you today')}
  <div class="card">${list([
    { href: 'contract.html', icon: 'file-signature', tone: 'accent', title: 'Sign the contract for Executive Towers 1807', badge: badge('Today', 'accent'), sub: 'Arjun & Neha Mehta signed on Sunday. Your signature starts Ejari registration — move-in is Sat 5 Dec.' },
    { href: 'renewals.html', icon: 'refresh-cw', tone: 'warn', title: 'Marina Gate 2304 — renewal window closes Mon 30 Nov', badge: badge('6 days', 'warn'), sub: 'Your offer of AED 110,000 was sent on 18 Nov, inside the 90-day rule. Waiting for Maya to reply.' },
    { href: 'arrears.html', icon: 'circle-alert', tone: 'danger', title: 'Zahra Townhouse 114 — cheque 3 returned', badge: badge('AED 36,250', 'danger'), sub: 'The notarised 30-day notice was served on 9 Nov and runs to 9 Dec. Nothing else may be done before then.' },
    { href: 'offers.html', icon: 'hand-coins', tone: 'brand', title: '2 offers on Bloom Towers studio', badge: badge('Reply by Thu', 'brand'), sub: 'AED 54,000 in 4 cheques, or AED 52,000 paid monthly. Both applicants are fully verified.' },
    { href: 'listing-new.html#tab=wiz:forma', icon: 'pen-line', tone: 'info', title: 'Sign Form A for Burj Vista 3102', sub: 'Title deed is verified. Your marketing agreement lets us request the Trakheesi permit before photos on Thu.' },
    { href: 'moveout.html', icon: 'package', tone: 'gold', title: 'Check-out at Al Ghozlan 412 on Mon 30 Nov, 10:00', sub: 'Jun Reyes will run the inspection. Decide whether you want to attend.' },
  ])}</div>

  ${sectionHead('Your portfolio', 'All properties', 'properties.html')}
  <div class="card"><div class="list">${properties.map(propRow).join('')}</div></div>

  ${card({ title: 'Rent received', headEnd: `<span class="small muted">last 6 months · AED thousands</span>`, body: `
    <div style="max-width:560px">${barChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ name: 'Due', tone: 'sand', data: [30.75, 8.75, 45, 185.75, 8.75, 45] }, { name: 'Received', tone: 'brand', data: [30.75, 8.75, 45, 185.75, 8.75, 8.75] }], label: 'Rent due against rent received, June to November 2026' })}</div>
    <div class="between mt-3" style="flex-wrap:wrap">${legend([['Due', 'sand'], ['Received', 'brand']])}<span class="small muted">Cheques land in lumps: Palma Villa paid AED 155,000 in September.</span></div>` })}
</div>

<aside class="stack">
  <div class="card brand pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Coming in · next 30 days</span>${badge('2 payments', 'solid')}</div>
    <div><div class="hero-num">AED 42,500</div><div class="small muted mt-1">Paid to Emirates Islamic ••8830 the day after it clears</div></div>
    <div class="stack stack-sm small">
      <div class="between"><span class="muted">1 Dec · Marina Gate direct debit</span><b class="num">8,750</b></div>
      <div class="between"><span class="muted">5 Dec · Executive Towers cheque 1</span><b class="num">33,750</b></div>
      <div class="between"><span class="muted">Not counted · Zahra TH arrears</span><b class="num" style="opacity:.7">36,250</b></div>
    </div>
    ${btn('Open money', { href: 'money.html', variant: 'white', size: 'sm' })}
  </div>

  ${card({ title: 'Key dates', flush: true, body: list([
    { icon: 'camera', tone: 'info', title: 'Thu 26 Nov', sub: 'Burj Vista 3102 — professional photos, 10:00' },
    { icon: 'hourglass', tone: 'warn', title: 'Mon 30 Nov', sub: 'Marina Gate — last day to change terms for next year', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'clipboard-check', tone: 'gold', title: 'Mon 30 Nov', sub: 'Al Ghozlan 412 — check-out inspection, 10:00' },
    { icon: 'key-round', tone: 'accent', title: 'Sat 5 Dec', sub: 'Executive Towers 1807 — move-in and key handover' },
    { icon: 'scale', tone: 'danger', title: 'Wed 9 Dec', sub: 'Zahra TH — 30-day payment notice expires', extra: `<div class="mt-2">${rule('DXB-025A', '30-day notice')}</div>` },
    { icon: 'flag', tone: 'violet', title: 'Tue 14 Sep 2027', sub: 'Palma Villa 27 — own-use notice takes effect', extra: `<div class="mt-2">${rule('DXB-025B', '12 months')}</div>` },
  ]) })}

  ${guard({ title: 'You are inside the law', sub: 'Ruleset Dubai 2026.3 · checked this morning', checks: [
    { state: 'ok', title: '4 of 4 tenancies registered in Ejari', sub: 'Executive Towers will be registered once you sign.' },
    { state: 'ok', title: 'All deposits safeguarded', sub: 'AED 32,400 held in the client account across 4 homes.' },
    { state: 'ok', title: 'Every advert carries a live permit', sub: 'Bloom Towers permit valid to 8 Feb 2027.' },
    { state: 'warn', title: '1 legal clock running', sub: 'Zahra TH payment notice — no further action is allowed until 9 Dec.' },
  ], end: `<a class="link small" href="compliance.html">View</a>` })}

  ${card({ title: 'Your team', flush: true, body: list([
    { href: 'messages.html', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', sub: 'Your openrent.me manager · RERA BRN 61204' },
    { href: 'viewings.html', lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'Field agent · viewings and inspections' },
    { href: 'maintenance.html', lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Falcon Technical', sub: 'Preferred contractor · 2 open jobs' },
  ]) })}
</aside>
</div>`,
};

const notifications = {
  slug: 'notifications', nav: 'home', title: 'Notifications', back: 'index.html', narrow: true,
  body: () => `
${pageHead({ title: 'Notifications', actions: btn('Mark all read', { size: 'sm', toast: 'All notifications marked as read' }) })}
${chips(['All', ['Action needed', 4], 'Letting', 'Money', 'Repairs', 'Legal'])}
<div class="hr-label">Today</div>
<div class="card">${list([
  { href: 'contract.html', unread: true, icon: 'file-signature', tone: 'accent', title: 'Contract ready for your signature', sub: 'Executive Towers 1807 · the Mehtas signed with UAE Pass on Sunday evening', endSub: '08:02' },
  { href: 'maintenance.html', unread: true, icon: 'truck', tone: 'info', title: 'Plumber on the way to Marina Gate 2304', sub: 'Kitchen tap leak · within your AED 600 approval', endSub: '10:52' },
  { href: 'viewings.html', icon: 'calendar-days', tone: 'brand', title: '2 viewings this evening at Bloom Towers', sub: 'Hosted by Jun Reyes · 17:30 and 18:15', endSub: '09:00' },
])}</div>
<div class="hr-label">This week</div>
<div class="card">${list([
  { href: 'offers.html', unread: true, icon: 'hand-coins', tone: 'brand', title: 'New offer from Kwame Mensah', sub: 'AED 52,000 · 12 monthly direct debits · verified', endSub: 'Mon' },
  { href: 'offers.html', unread: true, icon: 'hand-coins', tone: 'brand', title: 'New offer from Sofia Marchetti', sub: 'AED 54,000 · 4 cheques · verified', endSub: 'Sun' },
  { href: 'moveout.html', icon: 'clipboard-check', tone: 'gold', title: 'Check-out inspection booked', sub: 'Al Ghozlan 412 · Mon 30 Nov, 10:00', endSub: 'Sat' },
  { href: 'listing-new.html', icon: 'badge-check', tone: 'ok', title: 'Title deed verified for Burj Vista 3102', sub: 'Matched to Dubai Land Department records', endSub: 'Fri' },
  { href: 'renewals.html', icon: 'refresh-cw', tone: 'warn', title: 'Renewal offer delivered to Maya Fernandes', sub: 'Served 102 days before expiry — inside the 90-day rule', endSub: 'Wed' },
])}</div>
<div class="hr-label">Earlier</div>
<div class="card">${list([
  { href: 'arrears.html', icon: 'scale', tone: 'danger', title: 'Notarised payment notice served', sub: 'Zahra Townhouse 114 · 30 days run to 9 Dec', endSub: '9 Nov' },
  { href: 'arrears.html', icon: 'circle-alert', tone: 'danger', title: 'Cheque 3 returned unpaid', sub: 'Zahra Townhouse 114 · AED 36,250', endSub: '3 Nov' },
  { href: 'money.html', icon: 'banknote', tone: 'ok', title: 'November rent paid out', sub: 'Marina Gate 2304 · AED 8,662.50 after Collect.me fee', endSub: '2 Nov' },
  { href: 'compliance.html', icon: 'scale', tone: 'brand', title: 'Ruleset 2026.3 now applies to all your tenancies', sub: 'Shared Housing Law · room-by-room letting needs a permit', endSub: '26 Aug' },
])}</div>`,
};

module.exports = [home, notifications];
