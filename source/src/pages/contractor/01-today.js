const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, avatar, money, pageHead, sectionHead, sheet, field, choice, stats, bar, chips } = ui;
const B = '../../';

// One stop on today's route
const stop = (o) => `<div class="slot"><time>${o.time}</time><${o.href ? `a href="${o.href}"` : 'div'} class="slot-card ${o.tone || ''}" style="display:block">
  <div class="between-top"><div class="grow"><div class="micro muted strong">${o.ref} · ${o.trade}</div><b class="strong" style="display:block;font-size:15px;line-height:1.3">${o.title}</b></div>${o.badge}</div>
  <div class="small muted mt-1 inline">${icon('map-pin', 14)}<span>${o.where}</span></div>
  <div class="between small mt-2"><span class="inline">${avatar(o.tech, { size: 'xs', tone: o.techTone })}<span class="muted">${o.tech.split(' ')[0]}</span></span><span class="strong">${o.value}</span></div>
</${o.href ? 'a' : 'div'}></div>`;

// A new job offer that needs a yes / no
const offer = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · ${o.where}</div></div></div>${badge(o.left, o.urgent ? 'danger' : 'warn', { icon: 'timer' })}</div>
  <div class="grid g2 small"><div><div class="muted">When</div><b class="strong">${o.when}</b></div><div><div class="muted">${o.priceLabel}</div><b class="strong">${o.price}</b></div><div><div class="muted">Who pays</div><b class="strong">${o.pays}</b></div><div><div class="muted">Travel</div><b class="strong">${o.travel}</b></div></div>
  <div class="btn-row">${btn('Decline', { size: 'sm', toast: `${o.ref} declined — offered to the next contractor (demo)` })}${btn('Accept job', { size: 'sm', variant: 'primary', icon: 'check', sheet: 'sheet-accept' })}</div>
</div>`;

const home = {
  slug: 'index', nav: 'home', title: 'Today', sub: 'Tue 24 Nov 2026',
  body: () => `
<header class="page-head"><div class="ph-text"><span class="eyebrow">4 stops · 2 offers waiting</span><h1>Morning, Imran</h1></div><div class="ph-actions">${btn('Go off duty', { size: 'sm', icon: 'moon', toast: 'You will not receive new offers until tomorrow 08:00 (demo)' })}</div></header>

<div class="split">
<div class="stack">
  <div class="card brand pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Next stop · 11:30 – 12:30</span>${badge('On the way', 'solid', { dot: true })}</div>
    <div><div class="h2" style="color:#fff">Kitchen mixer tap leaking</div><div class="small muted mt-1">MR-2291 · Marina Gate 1, Apt 2304 · Dubai Marina</div></div>
    <div class="card pad" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);box-shadow:none;color:#fff"><div class="between"><div><div class="small muted">Drive from Town Square</div><b class="display" style="font-size:22px">31 min · arrive 11:25</b></div><div class="right"><div class="small muted">Door code</div><b class="display num" style="font-size:22px;letter-spacing:.12em">4719</b></div></div></div>
    <div class="btn-row">${btn('Open job', { href: 'job.html', variant: 'white', size: 'sm', icon: 'clipboard-list' })}${btn('Navigate', { variant: 'on-dark', size: 'sm', icon: 'navigation', toast: 'Opening maps… (demo)' })}${btn('Message', { variant: 'on-dark', size: 'sm', icon: 'message-circle', href: 'job.html#sheet-chat' })}</div>
  </div>

  ${stats([
    { label: 'Today', icon: 'route', value: '1,550', unit: 'AED', sub: '4 stops · 62 km' },
    { label: 'This week', icon: 'wallet', value: '3,420', unit: 'AED', delta: '12%', sub: 'vs last week' },
    { label: 'November', icon: 'trending-up', value: '18,640', unit: 'AED', sub: '31 jobs done' },
    { label: 'Rating', icon: 'star', value: '4.9', unit: '/ 5', sub: '212 jobs · 96% on time' },
  ])}

  ${sectionHead('Today’s route', 'Full schedule', 'schedule.html')}
  <div class="stack stack-md">
    ${stop({ time: '09:00', ref: 'MR-2304', trade: 'AC', title: 'AC not cooling — diagnosed', where: 'Zahra Townhouse 114 · Town Square', tone: 'warn', badge: badge('Quote sent', 'warn'), tech: 'Imran Sheikh', techTone: 'c3', value: 'AED 850 quoted', href: 'quotes.html' })}
    ${stop({ time: '11:30', ref: 'MR-2291', trade: 'Plumbing', title: 'Kitchen mixer tap leaking', where: 'Marina Gate 1, Apt 2304 · Dubai Marina', tone: '', badge: badge('Next', 'gold', { dot: true }), tech: 'Imran Sheikh', techTone: 'c3', value: 'Est. AED 220–380', href: 'job.html' })}
    ${stop({ time: '14:00', ref: 'MR-2309', trade: 'Handyman', title: 'Pre-check-out snag list — visit to quote', where: 'Al Ghozlan 3, Apt 412 · The Greens', tone: 'info', badge: badge('Quote visit', 'info'), tech: 'Imran Sheikh', techTone: 'c3', value: 'Free visit', href: 'jobs.html#tab=jobs:scheduled' })}
    ${stop({ time: '16:30', ref: 'MR-2312', trade: 'Painting', title: 'Touch-up painting before photos', where: 'Bloom Towers B, Studio 915 · JVC', tone: 'muted-card', badge: badge('Sanjay'), tech: 'Sanjay Thapa', techTone: 'c6', value: 'AED 420 fixed', href: 'jobs.html#tab=jobs:scheduled' })}
  </div>

  ${sectionHead('New job offers', 'All jobs', 'jobs.html')}
  <div class="grid lg2">
    ${offer({ ref: 'MR-2311', icon: 'flame', tone: 'danger', title: 'Water heater not heating', where: 'Executive Towers K 1807 · Business Bay', left: '42 min left', urgent: true, when: 'Urgent · within 48 h', priceLabel: 'Estimate', price: 'AED 300 – 650', pays: 'Landlord', travel: '18 min from base' })}
    ${offer({ ref: 'MR-2315', icon: 'fan', tone: 'info', title: 'AC deep clean before photo shoot', where: 'Burj Vista 1, Apt 3102 · Downtown', left: '3 h 10 min left', when: 'Wed 25 Nov, any time', priceLabel: 'Fixed price', price: 'AED 480', pays: 'Landlord', travel: '22 min from base' })}
  </div>
</div>

<aside class="stack">
  <div class="card dark pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:#9FB1AB">Next payout</span>${badge('Thu 26 Nov', 'solid')}</div>
    <div><div class="hero-num">AED 1,485</div><div class="small muted mt-1">3 jobs signed off · to Mashreq ••7730</div></div>
    <div class="between small"><span class="muted">Waiting for sign-off</span><b class="num">AED 2,310</b></div>
    ${btn('Earnings', { href: 'earnings.html', variant: 'on-dark', size: 'sm', block: true, iconEnd: 'arrow-right' })}
  </div>

  ${card({ title: 'Needs attention', flush: true, body: list([
    { href: 'profile.html', icon: 'file-badge', tone: 'warn', title: 'Trade licence expires in 24 days', sub: 'Upload the renewed DET licence by 18 Dec to keep receiving offers.' },
    { href: 'quotes.html', icon: 'hourglass', tone: 'info', title: 'Quote MR-2304 awaiting approval', sub: 'AED 850 + VAT · sent to the landlord at 09:48 today' },
    { href: 'jobs.html#tab=jobs:signoff', icon: 'pen-line', tone: 'gold', title: '1 job waiting for tenant sign-off', sub: 'MR-2287 · auto-releases Wed 25 Nov, 16:10' },
    { href: 'profile.html', icon: 'shield-check', tone: 'ok', title: 'Insurance valid', sub: 'Public liability AED 1,000,000 · to 30 Jun 2027' },
  ]) })}

  ${card({ title: 'Team today', link: ['Team', 'team.html'], flush: true, body: list([
    { lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Imran', sub: '3 stops · Town Square → Marina → Greens', endBadge: badge('Driving', 'gold', { dot: true }) },
    { lead: avatar('Bilal Ahmed', { tone: 'c2' }), title: 'Bilal', sub: '2 AC services · Arabian Ranches 2', endBadge: badge('On site', 'ok', { dot: true }) },
    { lead: avatar('Sanjay Thapa', { tone: 'c6' }), title: 'Sanjay', sub: 'Painting 16:30 · JVC', endBadge: badge('Free till 16:00') },
    { lead: avatar('Kelvin Otieno', { tone: 'c4' }), title: 'Kelvin', sub: 'On emergency rota tonight', endBadge: badge('Standby', 'info') },
  ]) })}

  ${guard({ title: 'On every visit', checks: [
    { state: 'ok', title: 'Give the door code before entering', sub: 'The tenant’s app shows the same four digits.' },
    { state: 'block', title: 'Never take cash from a tenant', sub: 'All payments run through openrent.me — who pays is decided before you are booked.' },
    { state: 'ok', title: 'Photos before and after', sub: 'They protect you if a job is disputed.' },
  ] })}
</aside>
</div>`,
  sheets: () => sheet('sheet-accept', 'Accept this job',
    `<div class="field"><span class="label">Who will attend?</span>
       ${choice('tech', 'Kelvin Otieno', 'Plumbing & electrical · free tomorrow from 09:00', true)}
       ${choice('tech', 'Imran Sheikh', 'Fully booked today · free Wed afternoon', false)}
       ${choice('tech', 'Bilal Ahmed', 'AC specialist · not qualified for this job type', false, { locked: true })}</div>
     <div class="field"><span class="label">Offer the customer a slot</span>${chips(['Wed 09:00–11:00', 'Wed 11:00–13:00', 'Wed 14:00–16:00', 'Thu 09:00–11:00'], 0, 'wrap')}</div>
     ${callout({ tone: 'neutral', title: 'What you are agreeing to', body: 'Attend in the chosen window, work within the approved limit, and quote before doing anything that exceeds it. Platform fee is 10% of the job value, taken only when you are paid.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Confirm & notify', { variant: 'primary', toast: 'Job accepted — tenant and landlord notified (demo)' })),
};

const notifications = {
  slug: 'notifications', nav: 'home', title: 'Notifications', back: 'index.html', narrow: true,
  body: () => `
${pageHead({ title: 'Notifications', actions: btn('Mark all read', { size: 'sm', toast: 'All notifications marked as read' }) })}
${chips(['All', ['Offers', 2], 'Jobs', 'Money', 'Compliance'])}
<div class="hr-label">Today</div>
<div class="card">${list([
  { href: 'index.html', unread: true, icon: 'flame', tone: 'danger', title: 'New urgent offer: water heater, Business Bay', sub: 'MR-2311 · respond within 42 minutes or it moves on', endSub: '10:48' },
  { href: 'job.html#sheet-chat', unread: true, icon: 'message-circle', tone: 'gold', title: 'Maya replied about parking', sub: 'MR-2291 · “Visitor parking is on P1, tell security apartment 2304.”', endSub: '10:54' },
  { href: 'quotes.html', icon: 'send', tone: 'info', title: 'Quote sent to landlord', sub: 'MR-2304 · AED 850 + VAT · Zahra Townhouse 114', endSub: '09:48' },
  { href: 'index.html', icon: 'fan', tone: 'info', title: 'New offer: AC deep clean, Downtown', sub: 'MR-2315 · fixed price AED 480 · tomorrow', endSub: '08:20' },
])}</div>
<div class="hr-label">This week</div>
<div class="card">${list([
  { href: 'earnings.html', icon: 'banknote', tone: 'ok', title: 'Payout of AED 2,142 sent', sub: '5 jobs · Mashreq ••7730 · reference PO-2611-0188', endSub: 'Mon' },
  { href: 'jobs.html#tab=jobs:signoff', icon: 'pen-line', tone: 'gold', title: 'Waiting for tenant sign-off', sub: 'MR-2287 · bathroom sealant · auto-releases after 72 hours', endSub: 'Sun' },
  { href: 'reviews.html', icon: 'star', tone: 'ok', title: 'New 5-star review from Fatima Al Hashimi', sub: '“Quote was clear and the price matched.”', endSub: 'Sat' },
  { href: 'job.html', icon: 'thumbs-up', tone: 'ok', title: 'Job confirmed: kitchen tap, Marina Gate', sub: 'MR-2291 · landlord approved up to AED 600', endSub: 'Sat' },
])}</div>
<div class="hr-label">Earlier</div>
<div class="card">${list([
  { href: 'profile.html', icon: 'file-badge', tone: 'warn', title: 'Trade licence renewal reminder', sub: 'DET licence expires 18 Dec 2026 · upload the renewal to stay active', endSub: '18 Nov' },
  { href: '../rulebook.html#OR-104', icon: 'siren', tone: 'brand', title: 'Emergency standard updated', sub: 'Ruleset 2026.2 · contractors on rota are dispatched if a landlord is silent for 60 minutes', endSub: '23 Jun' },
])}</div>`,
};

module.exports = [home, notifications];
