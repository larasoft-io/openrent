const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, money, pageHead, sheet, tabs, panel, thumb, timeline, avatar, stars, barChart, legend, bar, choice, field, toggle, stagebar, sectionHead } = ui;
const { P } = require('../../lib/data');
const B = '../../';
const p7 = P.p7;

/* ------------------------------------------------------------------ Arrears */
const arrears = {
  slug: 'arrears', nav: 'arrears', title: 'Arrears', sub: 'Zahra TH 114 · 1 open case',
  body: () => `
${pageHead({ eyebrow: 'Case AR-0117 · opened 3 Nov 2026', title: 'Arrears', sub: 'One tenancy is behind. We run the process the law sets out, step by step, so that if this ends at the Rental Disputes Center your file is complete.' })}

<div class="split">
<div class="stack">
  <div class="card pad stack stack-md">
    <div class="between-top">
      <div class="inline" style="gap:12px">${thumb(p7.img, 'lg', B)}<div><b class="strong" style="font-size:16px">${p7.name}</b><div class="small muted">${p7.area} · ${p7.tenant}</div><div class="cluster mt-2">${badge('Arrears', 'danger', { dot: true })}${badge('Notice running', 'warn')}</div></div></div>
    </div>
    <div class="grid g2 sm4">
      <div><div class="small muted">Owed</div><b class="display t-danger" style="font-size:22px">AED 36,250</b></div>
      <div><div class="small muted">Overdue</div><b class="display" style="font-size:22px">23 days</b></div>
      <div><div class="small muted">Notice ends</div><b class="display" style="font-size:22px">9 Dec</b></div>
      <div><div class="small muted">Deposit held</div><b class="display" style="font-size:22px">AED 7,250</b></div>
    </div>
    <div class="stack stack-sm"><div class="between small"><span class="muted">30-day notice · day 15 of 30</span><span class="strong">15 days left</span></div>${bar(50, 'warn')}</div>
  </div>

  <div class="card accent pad stack stack-md">
    <div class="between"><div class="inline" style="gap:10px">${icon('handshake', 22)}<b class="strong" style="font-size:16px">Hassan has proposed a payment plan</b></div>${badge('Reply by 27 Nov', 'solid')}</div>
    <p class="small" style="opacity:.92">“My salary was delayed after a change of employer. I can pay a third now and the rest by mid-January. I am sorry for the trouble.” — sent Fri 20 Nov</p>
    <div class="card pad" style="background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.2);box-shadow:none;color:#fff">
      <dl class="kv"><div><dt style="color:rgba(255,255,255,.8)">On acceptance (card)</dt><dd>AED 12,250</dd></div><div style="border-color:rgba(255,255,255,.2)"><dt style="color:rgba(255,255,255,.8)">Tue 15 Dec 2026 (direct debit)</dt><dd>AED 12,000</dd></div><div style="border-color:rgba(255,255,255,.2)"><dt style="color:rgba(255,255,255,.8)">Fri 15 Jan 2027 (direct debit)</dt><dd>AED 12,000</dd></div></dl>
    </div>
    <div class="btn-row">${btn('Decline', { variant: 'on-dark', sheet: 'sheet-decline' })}${btn('Counter', { variant: 'on-dark', sheet: 'sheet-counter-plan' })}${btn('Accept plan', { variant: 'white', sheet: 'sheet-accept-plan' })}</div>
  </div>

  ${card({ title: 'The process, step by step', body: timeline([
    { state: 'danger', icon: 'x', title: 'Cheque 3 returned unpaid', body: 'Mashreq cheque 000433 for AED 36,250, dated 1 Nov. Reason given by the bank: insufficient funds.', when: 'Tue 3 Nov 2026' },
    { state: 'done', icon: 'bell', title: 'Reminder sent automatically', body: 'App, email and WhatsApp. Read by Hassan the same evening.', when: 'Tue 3 Nov, 14:10' },
    { state: 'done', icon: 'phone', title: 'Call from your manager', body: 'Layla Haddad spoke to Hassan. He confirmed a salary delay and asked for time.', when: 'Thu 5 Nov' },
    { state: 'done', icon: 'stamp', title: '30-day notice served through a notary public', body: 'Notice NP-2026-118834, in Arabic and English, sent by registered mail and email. Delivery confirmed 10 Nov.', when: 'Mon 9 Nov 2026', extra: rule('DXB-025A', '30-day notice') + `<a class="link small" href="notices.html">View notice</a>` },
    { state: 'now', icon: 'handshake', title: 'Payment plan proposed by tenant', body: 'Waiting for your decision. Accepting pauses the next step for as long as the plan is kept.', when: 'Fri 20 Nov' },
    { icon: 'hourglass', title: 'Notice period ends', body: 'If the rent is paid in full by this date, the ground for eviction falls away and the tenancy simply continues.', when: 'Wed 9 Dec 2026' },
    { icon: 'gavel', title: 'Rental Disputes Center', body: 'Only available after the notice has expired unpaid. We assemble the full case file for you.', extra: rule('DXB-RDC', 'RDC') },
  ]) })}

  ${card({ title: 'What is owed', body: kv([['Rent instalment 3 (1 Nov – 31 Jan)', money(36250)], ['Late fees', 'AED 0 · none in your contract'], ['Interest', 'AED 0 · not charged by openrent.me'], ['Bank return charge', 'Borne by the tenant’s bank account'], ['Total owed today', money(36250)]], 'total') + `<p class="small muted mt-3">Cheque 4 (AED 36,250, dated 1 Feb 2027) is still in custody and is not yet due.</p>` })}
</div>

<aside class="stack">
  ${guard({ title: 'What you must not do', sub: 'These actions are unlawful and are not available in openrent.me', checks: [
    { state: 'block', title: 'Do not lock the tenant out or change the locks', sub: 'Only an RDC judgment, enforced by its execution department, can remove a tenant.', rule: rule('DXB-034', 'Art. 34') },
    { state: 'block', title: 'Do not cut DEWA, cooling, water or internet', sub: 'Dubai Police can order services restored without a court order — and it damages your case.', rule: rule('DXB-034', 'Art. 34') },
    { state: 'block', title: 'Do not send your own “eviction letter”', sub: 'Only a notarised notice counts. Texts, emails and letters by hand do not start the 30 days.', rule: rule('DXB-025A', 'Art. 25(1)') },
    { state: 'block', title: 'Do not enter the home without consent', sub: 'Being in arrears does not end the tenant’s right to quiet use of the property.' },
    { state: 'block', title: 'Do not treat the deposit as rent', sub: 'It stays safeguarded until check-out, then follows the deduction process.', rule: rule('OR-101', 'Deposits') },
    { state: 'warn', title: 'Repairs still have to be done', sub: 'The AC fault reported on 23 Nov must be fixed regardless of the arrears.', rule: rule('DXB-016', 'Art. 16') },
  ] })}

  ${card({ title: 'If it goes to the RDC', body: kv([['Filing fee · 3.5% of AED 145,000', money(5075)], ['Half refunded if you settle', '− AED 2,537.50'], ['Case file preparation (add-on)', 'AED 699 + VAT'], ['Typical time to judgment', '3–6 weeks']]) + `<p class="small muted mt-3">The losing side usually bears the fees. A settlement approved by the judge is enforceable like a judgment.</p><div class="mt-3">${btn('Prepare RDC case file', { block: true, icon: 'gavel', sheet: 'sheet-rdc' })}</div>` })}

  ${card({ title: 'Tenant record', flush: true, body: list([
    { lead: avatar('Hassan El-Sayed', { size: 'lg' }), title: 'Hassan El-Sayed', sub: 'Tenant since 1 May 2026 · 2 of 3 payments on time', href: 'thread.html' },
    { icon: 'gauge', title: 'Credit check at move-in', sub: 'AECB band: Good · no previous returned cheques', endBadge: badge('Passed', 'ok') },
    { icon: 'message-circle', title: 'Responsive', sub: 'Replied to every message within a day' },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-accept-plan', 'Accept payment plan',
    `${kv([['Paid on acceptance', money(12250)], ['15 Dec 2026', money(12000)], ['15 Jan 2027', money(12000)], ['Total', money(36250)]], 'total')}
     ${callout({ tone: 'brand', title: 'What accepting does', body: 'We record a signed payment agreement, collect the first amount now and set up two direct debits. The notice stays on file: if an instalment is missed, you can go to the RDC without starting again.' })}
     <label class="checkline"><input type="checkbox" checked> Keep cheque 4 (1 Feb 2027) in custody as agreed</label>
     <label class="checkline"><input type="checkbox" checked> Send Hassan a written confirmation in Arabic and English</label>`,
    btn('Back', { attrs: { 'data-close': true } }) + btn('Accept and sign', { variant: 'primary', icon: 'fingerprint', toast: 'Plan accepted — Hassan has been asked to pay AED 12,250 (demo)' }))
  + sheet('sheet-counter-plan', 'Counter the plan',
    `<div class="form-grid c2">${field({ label: 'Pay now', prefix: 'AED', value: '18,250', inputmode: 'numeric' })}${field({ label: 'Second payment', prefix: 'AED', value: '18,000', inputmode: 'numeric' })}${field({ label: 'Second payment date', type: 'date', value: '2026-12-15', cls: 'span2', hint: 'Must total AED 36,250. You cannot add fees or interest that are not in the contract.' })}</div>
     ${field({ label: 'Message to Hassan (optional)', type: 'textarea', value: 'I can accept two payments rather than three.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send counter', { variant: 'primary', toast: 'Counter-proposal sent to Hassan (demo)' }))
  + sheet('sheet-decline', 'Decline the plan',
    `${callout({ tone: 'warn', title: 'Nothing else changes', body: 'The 30-day notice keeps running to 9 Dec. Hassan can still pay in full before then, and if he does the tenancy continues as normal.' })}
     ${field({ label: 'Reason (shared with the tenant)', type: 'select', options: ['I need the full amount by 9 Dec', 'Instalments are too spread out', 'Prefer not to say'], value: 'I need the full amount by 9 Dec' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Decline plan', { variant: 'danger', toast: 'Plan declined — Hassan has been told (demo)' }))
  + sheet('sheet-rdc', 'RDC case file',
    `<p class="small muted">Available to file from Thu 10 Dec 2026, once the notice has expired unpaid. We prepare it now so nothing is missing.</p>
     ${guard({ title: 'What goes in the file', checks: [
       { state: 'ok', title: 'Tenancy contract and Ejari certificate', sub: 'No. ' + p7.ejari },
       { state: 'ok', title: 'Title deed and owner ID' },
       { state: 'ok', title: 'Returned cheque and bank memo' },
       { state: 'ok', title: 'Notarised notice with proof of delivery', sub: 'NP-2026-118834 · delivered 10 Nov' },
       { state: 'ok', title: 'Rent ledger and message history' },
       { state: 'info', title: 'Arabic translation of all exhibits', sub: 'Included in the add-on' },
     ] })}
     ${kv([['Case file preparation', 'AED 699.00'], ['VAT 5%', 'AED 34.95'], ['RDC filing fee (paid to RDC when you file)', 'AED 5,075.00']])}`,
    btn('Not now', { attrs: { 'data-close': true } }) + btn('Prepare file · AED 699', { variant: 'primary', toast: 'Case file ordered — ready within 2 working days (demo)' })),
};

/* -------------------------------------------------------------- Maintenance */
const job = (o) => `<div class="card pad stack stack-md"${o.tags ? ` data-tags="${o.tags}"` : ''}>
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start">${thumb(o.p.img, '', B)}<div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · ${o.p.short} · ${o.when}</div></div></div>${o.badge}</div>
  ${o.progress != null ? stagebar(5, o.progress) : ''}
  ${o.body || ''}
  <div class="between small"><span class="muted">${o.line}</span><span class="strong nowrap">${o.pays}</span></div>
  ${o.actions ? `<div class="btn-row">${o.actions}</div>` : ''}</div>`;

const pro = (name, co, trade, rating, jobs, extra) => ({ lead: avatar(name, { size: 'lg' }), title: co, sub: `${name} · ${trade}`, extra: `<div class="inline small mt-1">${stars(rating)}<span class="muted">${rating} · ${jobs} jobs for you${extra ? ' · ' + extra : ''}</span></div>`, toast: `${co} profile (demo)`, chev: true });

const limitRow = (p, v, on = true) => `<div class="row">${thumb(p.img, '', B)}<div class="row-main"><div class="row-title">${p.short}</div><div class="row-sub">${on ? `Auto-approve up to <b class="strong">${money(v)}</b>` : 'Ask me every time'}</div></div>${toggle(on, { label: 'Auto-approve for ' + p.short })}</div>`;

const maintenance = {
  slug: 'maintenance', nav: 'maintenance', title: 'Maintenance', sub: '2 need you · 3 in progress',
  body: () => `
${pageHead({ title: 'Maintenance', sub: 'Every request from every property. Small jobs are approved for you within your limits; anything bigger waits for your decision — with a clock on it when it is urgent.', actions: btn('Spend limits', { icon: 'sliders-horizontal', size: 'sm', sheet: 'sheet-limits' }) + btn('Book a job', { icon: 'plus', size: 'sm', variant: 'primary', sheet: 'sheet-book' }) })}

${ui.stats([
  { label: 'Awaiting approval', icon: 'hourglass', value: '2', sub: 'AED 2,000 in quotes' },
  { label: 'In progress', icon: 'wrench', value: '3', sub: '1 visit today' },
  { label: 'Spent in 2026', icon: 'receipt-text', value: '11,480', unit: 'AED', sub: '1.5% of rent roll' },
  { label: 'Avg. time to fix', icon: 'timer', value: '1.8', unit: 'days', delta: '0.6', deltaDir: 'down', sub: 'vs last year' },
])}

${tabs('mnt', [{ id: 'approve', label: 'Needs approval', n: 2 }, { id: 'progress', label: 'In progress', n: 3 }, { id: 'done', label: 'Completed', n: 14 }], 'approve')}

<div class="split">
<div class="stack">
${panel('mnt', 'approve', `
  ${job({ p: P.p7, title: 'AC not cooling — whole first floor', ref: 'MR-2304', when: 'reported Mon 23 Nov, 21:10', badge: badge('Urgent', 'danger', { dot: true }), progress: 1,
    body: `<div class="callout warn" style="padding:10px 12px">${icon('timer', 18)}<div class="grow"><p><b>Decision needed within 22 minutes.</b> After that openrent.me approves the repair for you, up to AED 1,500.</p><div class="cluster">${rule('OR-104', 'Emergency standard')}</div></div></div>
      <p class="small">Imran (Falcon Technical) inspected at 09:00 today: failed compressor capacitor on the upstairs unit, refrigerant low. Bedrooms at 29°C overnight.</p>
      ${kv([['Compressor capacitor, supplied and fitted', money(380)], ['Refrigerant top-up (R410A)', money(320)], ['Labour and call-out', money(150)], ['Quote total', money(850)]], 'total')}`,
    line: 'Above your AED 600 auto-approve limit', pays: 'You pay',
    actions: btn('Ask a question', { toast: 'Message sent to Falcon Technical (demo)' }) + btn('Approve AED 850', { variant: 'primary', icon: 'check', sheet: 'sheet-approve' }) })}
  ${callout({ tone: 'neutral', icon: 'scale', title: 'This tenancy is in arrears — the repair still has to happen', body: 'Rent and repairs are separate duties. Withholding maintenance, like cutting services, would count against you at the RDC.', rules: [rule('DXB-016', 'Art. 16'), rule('DXB-034', 'Art. 34')] })}
  ${job({ p: P.p5, title: 'Pre-check-out snags — repaint feature wall, reseal bath', ref: 'MR-2298', when: 'quoted Sat 21 Nov', badge: badge('Quote', 'info'), progress: 1,
    body: kv([['Repaint living-room feature wall (tenant painted it grey)', money(650)], ['Reseal bath and basin', money(250)], ['Fill and touch up 6 wall-anchor holes', money(250)], ['Quote total', money(1150)]], 'total'),
    line: 'Who pays is settled at the 30 Nov inspection', pays: 'To be decided',
    actions: btn('Hold until inspection', { toast: 'Quote held until 30 Nov (demo)' }) + btn('Approve AED 1,150', { variant: 'primary', toast: 'Approved — booked for Tue 1 Dec (demo)' }) })}`, true)}

${panel('mnt', 'progress', `
  ${job({ p: P.p1, title: 'Kitchen mixer tap leaking', ref: 'MR-2291', when: 'reported Sat 21 Nov', badge: badge('Today 11:30', 'info', { dot: true }), progress: 2, line: 'Imran, Falcon Technical · estimate AED 220–380', pays: 'You pay', body: `<div class="cluster">${badge('Auto-approved within limit', 'brand')}${rule('DXB-016', 'Art. 16')}</div>` })}
  ${job({ p: P.p1, title: 'AC service (twice a year)', ref: 'MR-2207', when: 'auto-booked 20 Oct', badge: badge('Thu 3 Dec', 'brand'), progress: 2, line: 'Included in the contract · AED 180 per visit', pays: 'You pay' })}
  ${job({ p: P.p4, title: 'Pre-let deep clean and paint touch-up', ref: 'MR-2276', when: 'booked 16 Nov', badge: badge('Thu 3 Dec', 'brand'), progress: 2, line: 'SparkleNest Cleaning · before 5 Dec move-in', pays: 'AED 1,400' })}`)}

${panel('mnt', 'done', `
  <div class="card">${list([
    { icon: 'washing-machine', tone: 'ok', title: 'Washing machine not draining', sub: 'MR-2135 · Marina Gate 2304 · 14 Oct · lint blockage, tenant-side', end: 'AED 0', endSub: 'Tenant paid 180' },
    { icon: 'waves', tone: 'ok', title: 'Pool pump service and filter', sub: 'MR-2110 · Palma Villa 27 · 6 Oct · BlueLine Pools', end: money(1200), endSub: 'You paid' },
    { icon: 'door-open', tone: 'ok', title: 'Balcony door handle loose', sub: 'MR-1987 · Marina Gate 2304 · 12 Aug', end: money(150), endSub: 'You paid' },
    { icon: 'heater', tone: 'ok', title: 'Water heater replaced (50 L)', sub: 'MR-1904 · Zahra TH 114 · 9 Jul · 2-year warranty', end: money(950), endSub: 'You paid' },
    { icon: 'thermometer-snowflake', tone: 'ok', title: 'AC service — 4 units', sub: 'MR-1822 · Palma Villa 27 · 2 Jun', end: money(720), endSub: 'You paid' },
    { icon: 'paint-roller', tone: 'ok', title: 'Full repaint before letting', sub: 'MR-1701 · Zahra TH 114 · 18 Apr', end: money(3800), endSub: 'You paid' },
  ])}</div>
  <p class="small muted center">Showing 6 of 14 completed jobs this year.</p>`)}
</div>

<aside class="stack">
  ${guard({ title: 'Who pays for what', sub: 'Tagged on every job before a contractor is booked', checks: [
    { state: 'ok', title: 'You pay for faults with the home', sub: 'AC, plumbing, electrics, appliances you supplied, anything structural. A contract cannot move these to the tenant.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'ok', title: 'Tenants cover small items', sub: 'Up to AED 500 each by default. You set AED 250 at Marina Gate — lower is allowed, higher is not.', rule: rule('OR-103', 'Small repairs') },
    { state: 'info', title: 'Emergencies have a clock', sub: 'No reply from you in 60 minutes and we dispatch a contractor up to AED 1,500.', rule: rule('OR-104', 'Emergency standard') },
  ] })}
  ${card({ title: 'Spend by month · 2026', body: `${barChart({ labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N'], height: 150, label: 'Maintenance spend by month', series: [{ name: 'Spend', tone: 'accent', data: [0, 420, 260, 3800, 180, 720, 950, 150, 600, 1200, 3200] }] })}<div class="mt-3">${kv([['Biggest job', 'Repaint, Zahra TH · AED 3,800'], ['Most requests', 'Marina Gate · 4'], ['Open quotes', 'AED 2,000']])}</div>` })}
  ${card({ title: 'Your contractors', headEnd: `<span class="small muted">Vetted by openrent.me</span>`, flush: true, body: list([
    pro('Imran Sheikh', 'Falcon Technical Services', 'AC, plumbing, electrical', 4.9, 9, 'on time 96%'),
    pro('Grace Mwangi', 'SparkleNest Cleaning', 'Deep cleaning, move-out', 4.8, 4),
    pro('Tomas Petrov', 'BlueLine Pools', 'Pools and landscaping', 4.7, 3),
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-approve', 'Approve repair',
    `${kv([['Job', 'MR-2304 · AC not cooling'], ['Property', 'Zahra Townhouse 114'], ['Contractor', 'Falcon Technical Services'], ['Quote', money(850)], ['Earliest visit', 'Today, 15:00–17:00']])}
     ${callout({ tone: 'brand', body: 'You are charged only after the tenant confirms the cooling works. Parts carry a 6-month warranty.' })}
     <label class="checkline"><input type="checkbox"> Raise this property’s auto-approve limit to AED 1,000</label>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Approve AED 850', { variant: 'primary', toast: 'Approved — Imran is booked for 15:00 today (demo)' }))
  + sheet('sheet-limits', 'Auto-approve limits',
    `<p class="small muted">Jobs under the limit are approved instantly so tenants are not left waiting. You are always told, and can review the invoice afterwards.</p>
     <div class="card"><div class="list">${limitRow(P.p1, 600)}${limitRow(P.p3, 1000)}${limitRow(P.p7, 600)}${limitRow(P.p5, 0, false)}${limitRow(P.p4, 600)}</div></div>
     <div class="field"><label for="lim">Default limit for new tenancies</label><div class="between"><span class="hero-num">AED <span data-out="lim">600</span></span></div><input class="range" type="range" id="lim" min="0" max="2000" step="50" value="600"></div>
     ${callout({ tone: 'neutral', body: 'Emergencies are handled under the emergency standard whatever limit you set here.', rules: [rule('OR-104', 'Emergency standard')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save limits', { variant: 'primary', toast: 'Limits saved (demo)' }))
  + sheet('sheet-book', 'Book a job',
    `${field({ label: 'Property', type: 'select', options: [P.p1.short, P.p2.short, P.p3.short, P.p4.short, P.p5.short, P.p6.short, P.p7.short], value: P.p2.short })}
     <div class="field"><span class="label">Type of work</span>${ui.chips(['AC service', 'Deep clean', 'Painting', 'Plumbing', 'Electrical', 'Handyman', 'Pest control'], 0, 'wrap')}</div>
     ${field({ label: 'What needs doing?', type: 'textarea', placeholder: 'e.g. Service both AC units before the new tenant moves in' })}
     ${choice('bk', 'Get 3 quotes', 'Usually within 4 hours', true)}${choice('bk', 'Book my usual contractor', 'Falcon Technical Services', false)}
     ${callout({ tone: 'neutral', body: 'For an occupied home, the tenant is asked to agree an access time before anyone attends.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Request', { variant: 'primary', toast: 'Request sent to 3 contractors (demo)' })),
};

module.exports = [arrears, maintenance];
