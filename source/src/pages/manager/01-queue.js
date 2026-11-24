const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, bar, avatar, money, pageHead, sheet, tabs, panel, stats, thumb, donut, choice, field } = ui;
const { P } = require('../../lib/data');
const { B, timer, timerScript } = require('./lib/h');

const sla = (text, tone) => badge(text, tone, { dot: true });
const load = (name, n, pct, tone, note) => `<div class="mg-load"><div class="inline">${avatar(name, { size: 'sm' })}<div><b class="strong small">${name}</b><div class="micro muted">${note}</div></div></div><b class="num right small">${n} open</b>${bar(pct, tone, true)}</div>`;

const queue = {
  slug: 'index', nav: 'queue', title: 'My queue', sub: 'Tue 24 Nov 2026 · 10:58',
  body: () => `
${pageHead({ eyebrow: 'Good morning, Layla', title: '14 things need you', sub: 'Sorted by service level. Anything that touches the law is flagged with the rule it comes from.', actions: btn('New task', { icon: 'plus', size: 'sm', sheet: 'sheet-task' }) + btn('Hand over', { icon: 'handshake', size: 'sm', toast: 'Hand-over note drafted for the evening shift (demo)' }) })}

<a class="card accent pad stack stack-md" href="maintenance.html">
  <div class="between-top"><div class="inline" style="gap:12px;align-items:flex-start">${icon('siren', 26)}<div><span class="eyebrow" style="color:rgba(255,255,255,.8)">Emergency-class · MR-2304</span><div class="h2" style="color:#fff;margin-top:4px">AC failed at Zahra Townhouse 114</div><div class="small muted mt-1">Quote AED 850 + VAT sent to Fatima at 10:20. If she has not answered when the clock runs out, you dispatch.</div></div></div>${timer('t-ac', 22 * 60 + 14, 'landlord window')}</div>
  <div class="between small"><span class="inline">${icon('scale', 14)} OR-104 · respond in 60 min, fixed in 4 h</span><span class="inline strong">Open desk ${icon('arrow-right', 16)}</span></div>
</a>

${stats([
  { label: 'Open tasks', icon: 'list-checks', value: '14', sub: '4 due today · 1 overdue' },
  { label: 'SLA hit rate', icon: 'target', value: '96', unit: '%', delta: '2 pts', sub: 'last 30 days' },
  { label: 'Avg time to let', icon: 'timer', value: '11', unit: 'days', delta: '3 days', deltaDir: 'down', sub: 'faster than Q3' },
  { label: 'Tenancies in book', icon: 'house', value: '142', sub: '38 landlords' },
])}

<div class="split">
<div class="stack">
  ${tabs('q', [{ id: 'today', label: 'Due today', n: 4 }, { id: 'over', label: 'Overdue', n: 1 }, { id: 'week', label: 'This week', n: 6 }, { id: 'wait', label: 'Waiting on others', n: 3 }], 'today')}

  ${panel('q', 'today', `<div class="card">${list([
    { href: 'maintenance.html', icon: 'thermometer-snowflake', tone: 'danger', title: 'Approve or dispatch — AC at Zahra TH 114', badge: sla('22 min', 'danger'), sub: 'Hassan El-Sayed · indoor 31°C, child under 2 at home · quote AED 850 + VAT is above her AED 600 auto-approve limit', extra: `<div class="mt-2">${rule('OR-104', 'Emergency standard')}</div>` },
    { href: 'listing-review.html', icon: 'badge-check', tone: 'brand', title: 'Confirm title deed and queue the permit — Burj Vista 3102', badge: sla('by 13:00', 'warn'), sub: 'Fatima Al Hashimi · deed matched to DLD record · Form A still unsigned, so the Trakheesi permit cannot issue yet', extra: `<div class="mt-2">${rule('DXB-002', 'Advertising permit')}</div>` },
    { href: 'tenancy.html', icon: 'file-check', tone: 'accent', title: 'Ejari pack ready — Executive Towers 1807', badge: sla('by 17:00', 'warn'), sub: 'Arjun & Neha Mehta · tenant signed 22 Nov, deposit received · submits the moment Fatima countersigns · move-in Sat 5 Dec', extra: `<div class="mt-2">${rule('DXB-001', 'Ejari')}</div>` },
    { href: 'notices.html', icon: 'calendar-clock', tone: 'warn', title: 'Renewal cut-offs this week — 3 tenancies', badge: sla('first is Thu', 'warn'), sub: 'Park Heights 214 (Thu 26) no proposal yet · Shoreline 402 (Sat 28) +12% blocked, max is 5% · Marina Gate 2304 (Mon 30) offer sent in time', extra: `<div class="mt-2 cluster">${rule('DXB-014', '90-day notice')}${rule('DXB-009', 'Rent cap')}</div>` },
  ])}</div>`, true)}

  ${panel('q', 'over', `<div class="card">${list([
    { href: 'referencing.html', icon: 'user-search', tone: 'danger', title: 'Chase previous-landlord reference — Tomás Herrera', badge: sla('1 day late', 'danger'), sub: 'Creek Vista 1510 · reference requested Fri 20 Nov, two reminders sent · decide today with or without it' },
  ])}</div>
  ${callout({ tone: 'neutral', title: 'Why it is late', body: 'The previous landlord is abroad. Policy: after 3 working days a decision can be made on the remaining four checks, with the gap noted on file.' })}`)}

  ${panel('q', 'week', `<div class="card">${list([
    { href: 'disputes.html', icon: 'clipboard-check', tone: 'gold', title: 'Prepare deposit settlement — Al Ghozlan 3 · 412', badge: sla('Mon 30 Nov', ''), sub: 'Olena Kovalenko checks out Mon 10:00 · Jun Reyes assigned · move-in report (71 photos) pulled · AED 4,400 held', extra: `<div class="mt-2 cluster">${rule('DXB-021', 'Fair wear & tear')}${rule('OR-101', '14-day return')}</div>` },
    { href: 'dispute.html', icon: 'scale', tone: 'violet', title: 'Decide deposit dispute DSP-0093', badge: sla('Fri 27 Nov', ''), sub: 'Lake Terrace 1204, JLT · landlord claims AED 1,850 of a AED 6,000 deposit · evidence complete from both sides' },
    { href: 'notices.html', icon: 'scroll-text', tone: 'danger', title: 'Arrears: 30-day notice ends Wed 9 Dec — Zahra TH 114', badge: sla('15 days', ''), sub: 'Cheque 3 (AED 36,250) returned 3 Nov · notarised notice served 9 Nov · draft the RDC file so it is ready if unpaid', extra: `<div class="mt-2 cluster">${rule('DXB-025A', '30-day notice')}${rule('DXB-RDC', 'RDC')}</div>` },
    { href: 'field.html', icon: 'camera', tone: 'info', title: 'Photo shoot — Burj Vista 3102', badge: sla('Thu 26 Nov', ''), sub: 'Photographer and Jun Reyes on site 09:30 · keys collected from Fatima today 12:00' },
    { href: 'referencing.html', icon: 'user-check', tone: 'brand', title: 'Manual referencing decision — Bongani Dlamini', badge: sla('Wed 25 Nov', ''), sub: 'Park Heights 608 · new to the UAE, no credit file yet · employer letter received' },
    { href: 'contractors.html', icon: 'hard-hat', tone: 'warn', title: 'Trade licence expiring — Desert Breeze AC', badge: sla('12 Dec', ''), sub: 'Renewal proof requested · jobs after 12 Dec will not be offered without it' },
  ])}</div>`)}

  ${panel('q', 'wait', `<div class="card">${list([
    { href: 'tenancy.html', lead: avatar('Fatima Al Hashimi'), title: 'Fatima to sign the tenancy contract', badge: badge('2 days', 'warn'), sub: 'Executive Towers 1807 · nudged Mon 09:00 and today 08:30 · she is travelling until tonight' },
    { href: 'listing-review.html', lead: avatar('Fatima Al Hashimi'), title: 'Fatima to sign Form A', badge: badge('1 day', ''), sub: 'Burj Vista 3102 · opened yesterday 18:02, not yet signed' },
    { href: 'inbox.html', lead: avatar('Maya Fernandes'), title: 'Maya to answer the renewal offer', badge: badge('by 18 Dec', ''), sub: 'Marina Gate 2304 · AED 110,000 checked against the index · she is considering a two-year fix' },
  ])}</div>`)}

  ${card({ title: 'Fatima Al Hashimi · 7 properties', link: ['Open pipeline', 'tenancies.html'], flush: true, body: list(Object.values(P).map(p => ({ lead: thumb(p.img, '', B), title: p.short, badge: badge(p.status, p.tone === 'neutral' ? '' : p.tone), sub: p.note, href: p.id === 'p4' ? 'tenancy.html' : p.id === 'p6' ? 'listing-review.html' : p.id === 'p7' ? 'notices.html' : p.id === 'p5' ? 'disputes.html' : 'tenancies.html' }))) })}
</div>

<aside class="stack">
  ${card({ title: 'My book by stage', body: donut({ center: '142', sub: 'tenancies', segments: [
    { label: 'Active', value: 115, tone: 'brand', show: '115' }, { label: 'Renewal window', value: 9, tone: 'gold', show: '9' }, { label: 'Onboarding', value: 14, tone: 'accent', show: '14' }, { label: 'Move-out', value: 4, tone: 'violet', show: '4' }] }) })}

  ${card({ title: 'Team load', body: `<div class="stack stack-md">
    ${load('Layla Haddad', 14, 58, 'accent', 'You · BRN 61204')}
    ${load('Omar Farouk', 11, 46, '', 'BRN 58813')}
    ${load('Priya Menon', 19, 82, 'warn', 'BRN 60277 · on leave Thu–Fri')}
    ${load('Sara Lindqvist', 9, 38, '', 'BRN 62540')}
    </div><div class="mt-4">${btn('Take 3 from Priya', { size: 'sm', block: true, toast: '3 tasks moved to your queue (demo)' })}</div>` })}

  ${guard({ title: 'What only a licensed manager signs off', sub: 'RERA broker BRN 61204 · ORN 31877', checks: [
    { state: 'ok', title: 'Owner is who the title deed says', rule: rule('DXB-003', 'Owner or PoA') },
    { state: 'ok', title: 'Permit and QR on every advert', rule: rule('DXB-002', 'Trakheesi') },
    { state: 'ok', title: 'Ejari before any tenancy goes active', rule: rule('DXB-001', 'Ejari') },
    { state: 'info', title: 'Deposit releases and deductions', sub: 'Both parties agree, or you decide on the evidence.', rule: rule('OR-101', 'Deposits') },
  ] })}
</aside>
</div>${timerScript}`,
  sheets: () => sheet('sheet-task', 'New task',
    `${field({ label: 'What needs doing?', placeholder: 'e.g. Call building management about lift booking' })}
     <div class="form-grid c2">${field({ label: 'Related tenancy', type: 'select', options: ['Executive Towers 1807 · Mehta', 'Marina Gate 2304 · Fernandes', 'Zahra TH 114 · El-Sayed', 'Al Ghozlan 412 · Kovalenko', 'None'], value: 'Executive Towers 1807 · Mehta' })}${field({ label: 'Due', type: 'date', value: '2026-11-25' })}</div>
     ${choice('own', 'Me', 'Layla Haddad', true)}${choice('own', 'Field team', 'Jun Reyes and colleagues', false)}${choice('own', 'Another manager', 'Pick after saving', false)}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Add to queue', { variant: 'primary', toast: 'Task added to your queue (demo)' })),
};

module.exports = [queue];
