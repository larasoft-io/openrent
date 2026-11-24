const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sectionHead, sheet, field, choice, tabs, panel, bar, chips, toggle, table, stats, stars, docIco, barChart, legend, donut, chat, composer } = ui;

/* ------------------------------ Earnings ------------------------------ */
const earnings = {
  slug: 'earnings', nav: 'earnings', title: 'Earnings', sub: 'November 2026',
  body: () => `
${pageHead({ title: 'Earnings', sub: 'Paid two working days after sign-off. Free to join — a flat 10% fee only on jobs that are completed and paid.', actions: btn('Statement', { size: 'sm', icon: 'download', toast: 'November statement downloaded (demo)' }) + btn('Instant payout', { size: 'sm', icon: 'zap', variant: 'primary', sheet: 'sheet-instant' }) })}

<div class="grid g2 lg4">
  <div class="card dark pad stack stack-sm" style="grid-column:span 2">
    <div class="between"><span class="eyebrow" style="color:#9FB1AB">Available balance</span>${badge('Next payout Thu 26 Nov', 'solid')}</div>
    <div class="hero-num">AED 1,485</div>
    <div class="small muted">3 signed-off jobs · to Mashreq ••7730 · plus AED 82.50 VAT</div>
  </div>
  ${ui.stat({ label: 'Awaiting sign-off', icon: 'pen-line', value: '2,310', unit: 'AED', sub: '4 jobs · auto-release 72 h' })}
  ${ui.stat({ label: 'Net this month', icon: 'trending-up', value: '17,076', unit: 'AED', delta: '6%', sub: 'vs October to date' })}
</div>

${tabs('earn', [{ id: 'overview', label: 'Overview' }, { id: 'payouts', label: 'Payouts' }, { id: 'invoices', label: 'Invoices' }], 'overview')}

${panel('earn', 'overview', `
<div class="split">
<div class="stack">
  ${card({ title: 'Last six months', headEnd: legend([['You receive', 'gold'], ['Platform fee', 'sand']]), body: barChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], stacked: true, hi: 5, series: [{ name: 'Net', tone: 'gold', data: [11160, 13590, 16020, 14580, 17370, 16776] }, { name: 'Fee', tone: 'sand', data: [1240, 1510, 1780, 1620, 1930, 1864] }], label: 'Monthly earnings' }) + `<p class="small muted mt-2">November is month to date (24 days). At this pace: about AED 21,000 net.</p>` })}
  ${card({ title: 'November so far', body: kv([['Jobs completed', '31'], ['Job value (before VAT)', 'AED 18,640.00'], ['Platform fee 10%', '− AED 1,864.00'], ['Instant payout fees', '− AED 0.00'], ['Standby fees (4 rota nights)', 'AED 300.00'], ['Net earnings', 'AED 17,076.00']], 'total') + `<div class="divider mt-4 mb-4"></div>${kv([['VAT collected for you (5%)', 'AED 932.00'], ['VAT on platform fee (reclaimable)', 'AED 93.20']])}<p class="small muted mt-3">VAT is paid out with each job so you can remit it on your own return. Tax invoices are issued in your company’s name automatically.</p>` })}
  ${card({ title: 'Where the work comes from', body: donut({ segments: [{ label: 'AC & ventilation', value: 46, tone: 'brand', show: '46%' }, { label: 'Plumbing', value: 27, tone: 'info', show: '27%' }, { label: 'Handyman & painting', value: 18, tone: 'gold', show: '18%' }, { label: 'Electrical', value: 9, tone: 'accent', show: '9%' }], center: '31', sub: 'jobs' }) })}
</div>
<aside class="stack">
  ${card({ title: 'How you get paid', body: timeline([
    { state: 'done', icon: 'check', title: 'You complete the job', body: 'Photos and line items recorded.' },
    { state: 'done', icon: 'pen-line', title: 'Tenant or landlord signs off', body: 'Or 72 hours pass with no problem raised.' },
    { state: 'now', icon: 'clock', title: '2 working days', body: 'Covers the short window for a quality complaint.' },
    { icon: 'banknote', title: 'Paid to your bank', body: 'Every Monday and Thursday. Or instantly for a 1% fee.' },
  ]) })}
  ${guard({ title: 'Payment protection', checks: [
    { state: 'ok', title: 'You are paid by openrent.me, not the customer', sub: 'Approved jobs are funded before you travel — no chasing landlords.' },
    { state: 'ok', title: 'No fee on declined quotes or free visits' },
    { state: 'info', title: 'Disputed job?', sub: 'A manager reviews your before / after photos within 2 working days. The undisputed part is paid straight away.' },
  ] })}
</aside>
</div>`, true)}

${panel('earn', 'payouts', `
  <div class="card">${list([
    { icon: 'calendar-clock', tone: 'gold', title: 'Thu 26 Nov — scheduled', sub: 'MR-2279, MR-2281, MR-2285 · 3 jobs', end: 'AED 1,485.00', endBadge: badge('Scheduled', 'gold'), sheet: 'sheet-instant', chev: true },
    { icon: 'check', tone: 'ok', title: 'Mon 23 Nov', sub: 'PO-2611-0188 · 5 jobs · Mashreq ••7730', end: 'AED 2,142.00', endBadge: badge('Paid', 'ok'), toast: 'Payout advice downloaded (demo)' },
    { icon: 'check', tone: 'ok', title: 'Thu 19 Nov', sub: 'PO-2611-0171 · 4 jobs', end: 'AED 1,908.00', endBadge: badge('Paid', 'ok'), toast: 'Payout advice downloaded (demo)' },
    { icon: 'check', tone: 'ok', title: 'Mon 16 Nov', sub: 'PO-2611-0149 · 6 jobs', end: 'AED 2,763.00', endBadge: badge('Paid', 'ok'), toast: 'Payout advice downloaded (demo)' },
    { icon: 'zap', tone: 'info', title: 'Sat 14 Nov — instant', sub: 'PO-2611-0140 · 1 job · 1% fee AED 8.10', end: 'AED 801.90', endBadge: badge('Instant', 'info'), toast: 'Payout advice downloaded (demo)' },
    { icon: 'check', tone: 'ok', title: 'Thu 12 Nov', sub: 'PO-2611-0122 · 5 jobs', end: 'AED 2,385.00', endBadge: badge('Paid', 'ok'), toast: 'Payout advice downloaded (demo)' },
  ])}</div>
  ${card({ title: 'Payout account', body: `<div class="between"><div class="inline" style="gap:12px"><span class="row-ico brand">${icon('landmark', 20)}</span><div><b class="strong">Mashreq Bank ••7730</b><div class="small muted">Falcon Technical Services L.L.C · IBAN AE•• •••• •••• ••77 30</div></div></div>${badge('Verified', 'ok', { dot: true })}</div>` })}`)}

${panel('earn', 'invoices', `
  <div class="card">${list([
    { lead: docIco(), title: 'Tax invoice — MR-2283 extractor fan motor', sub: 'FTS-INV-1184 · 23 Nov 2026 · billed to Fatima Al Hashimi', end: 'AED 483.00', toast: 'Invoice downloaded (demo)' },
    { lead: docIco(), title: 'Tax invoice — MR-2260 irrigation timer', sub: 'FTS-INV-1183 · 23 Nov 2026 · billed to Fatima Al Hashimi', end: 'AED 357.00', toast: 'Invoice downloaded (demo)' },
    { lead: docIco(), title: 'Platform fee invoice — November (to date)', sub: 'OR-FEE-2611-0077 · openrent.me · AED 1,864.00 + 5% VAT', end: 'AED 1,957.20', toast: 'Invoice downloaded (demo)' },
    { lead: docIco('XLS', 'xls'), title: 'Job ledger — November', sub: '31 jobs · for your accountant', end: 'CSV', toast: 'Ledger exported (demo)' },
    { lead: docIco(), title: 'Tax invoice — MR-2135 washing machine', sub: 'FTS-INV-1102 · 14 Oct 2026 · billed to Maya Fernandes (tenant-side repair)', end: 'AED 189.00', toast: 'Invoice downloaded (demo)' },
  ])}</div>
  <p class="small muted center">Invoices are issued in your company’s name with your TRN. openrent.me invoices you separately for its fee.</p>`)}
`,
  sheets: () => sheet('sheet-instant', 'Instant payout',
    `${kv([['Available now', 'AED 1,485.00'], ['VAT to pass on', 'AED 82.50'], ['Instant fee 1%', '− AED 14.85'], ['Arrives in minutes', 'AED 1,552.65']], 'total')}
     ${choice('ip', 'Wait for Thursday', 'Free · arrives Thu 26 Nov by 12:00', true)}
     ${choice('ip', 'Pay me now', '1% fee · usually under 10 minutes, 24/7', false)}
     ${callout({ tone: 'neutral', body: 'Jobs still waiting for sign-off (AED 2,310) cannot be paid early.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Confirm', { variant: 'primary', toast: 'Payout choice saved (demo)' })),
};

/* -------------------------------- Team -------------------------------- */
const tech = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:12px">${avatar(o.name, { size: 'lg', tone: o.tone })}<div><b class="strong" style="font-size:16px">${o.name}</b><div class="small muted">${o.role}</div><div class="inline small mt-1">${stars(o.rating)}<span class="muted nowrap">${o.rating.toFixed(1)} · ${o.jobs} jobs</span></div></div></div>${o.status}</div>
  <div class="cluster">${o.tags.map(t => badge(t, 'outline')).join('')}</div>
  <div class="grid g2 small"><div><div class="muted">Today</div><b class="strong">${o.today}</b></div><div><div class="muted">On time (90 days)</div><b class="strong">${o.ontime}</b></div></div>
  <div class="cluster">${badge('ID verified', 'ok', { icon: 'badge-check' })}${o.cert.map(c => badge(c[0], c[1] || 'brand')).join('')}</div>
  <div class="btn-row">${btn('Schedule', { size: 'sm', icon: 'calendar-days', href: 'schedule.html' })}${btn('Manage', { size: 'sm', icon: 'pencil', sheet: 'sheet-manage' })}</div>
</div>`;

const team = {
  slug: 'team', nav: 'team', title: 'Team', sub: '4 people · 3 vans',
  body: () => `
${pageHead({ title: 'Team', sub: 'Everyone who enters a customer’s home is identity-checked and named in the tenant’s app before they arrive.', actions: btn('Add technician', { variant: 'primary', icon: 'user-plus', sheet: 'sheet-addtech' }) })}
<div class="split">
<div class="stack">
  <div class="grid sm2">
    ${tech({ name: 'Imran Sheikh', tone: 'c3', role: 'Owner · lead technician', rating: 4.9, jobs: 212, status: badge('Driving', 'gold', { dot: true }), tags: ['AC', 'Plumbing', 'Electrical'], today: '3 stops', ontime: '97%', cert: [['Account admin', 'solid']] })}
    ${tech({ name: 'Bilal Ahmed', tone: 'c2', role: 'AC technician', rating: 4.9, jobs: 164, status: badge('On site', 'ok', { dot: true }), tags: ['AC & ventilation', 'Duct cleaning'], today: '2 AC services', ontime: '98%', cert: [['Refrigerant handling']] })}
    ${tech({ name: 'Sanjay Thapa', tone: 'c6', role: 'Handyman & painter', rating: 4.8, jobs: 97, status: badge('Free till 16:00'), tags: ['Handyman', 'Painting', 'Sealant & grout'], today: '1 job · 16:30', ontime: '93%', cert: [['Working at height']] })}
    ${tech({ name: 'Kelvin Otieno', tone: 'c4', role: 'Plumber & electrician', rating: 4.9, jobs: 121, status: badge('Standby', 'info'), tags: ['Plumbing', 'Electrical', 'Water heaters'], today: 'Emergency rota 20:00', ontime: '96%', cert: [['Electrical competency']] })}
  </div>
  ${card({ title: 'Vehicles', flush: true, body: list([
    { icon: 'truck', title: 'Toyota Hiace · Dubai T 61938', sub: 'Imran · AC & plumbing stock', endBadge: badge('Registered', 'ok') },
    { icon: 'truck', title: 'Nissan Urvan · Dubai K 20417', sub: 'Bilal · AC service kit', endBadge: badge('Registered', 'ok') },
    { icon: 'car', title: 'Suzuki Carry · Dubai P 55102', sub: 'Sanjay / Kelvin · tools and paint', endBadge: badge('Registration due 9 Jan', 'warn') },
  ]) })}
</div>
<aside class="stack">
  ${guard({ title: 'Before someone can take jobs', checks: [
    { state: 'ok', title: 'Emirates ID and visa under your company', sub: 'Checked with UAE Pass — only your own employees can be added.' },
    { state: 'ok', title: 'Named for each visit', sub: 'The tenant sees the technician’s name, photo and door code.' },
    { state: 'ok', title: 'Right trade for the job', sub: 'Offers are matched to certified trades; AC gas work needs a refrigerant certificate.' },
    { state: 'block', title: 'No subcontracting', sub: 'Passing a job to someone not on this list ends the partnership.' },
  ] })}
  ${card({ title: 'Team performance · 90 days', body: `<div class="stack stack-md">
    ${[['On-time arrival', 96, 'ok'], ['Fixed on first visit', 88, 'ok'], ['Offers accepted', 81, ''], ['Jobs with complete photos', 99, 'ok']].map(([l, v, t]) => `<div class="stack stack-sm"><div class="between small"><span class="muted">${l}</span><b class="num">${v}%</b></div>${bar(v, t, true)}</div>`).join('')}</div>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-addtech', 'Add a technician',
    `${field({ label: 'Full name (as on Emirates ID)', placeholder: 'e.g. Rashid Khan' })}
     <div class="form-grid c2">${field({ label: 'Mobile', type: 'tel', placeholder: '+971 5X XXX XXXX' })}${field({ label: 'Emirates ID', placeholder: '784-YYYY-NNNNNNN-N', inputmode: 'numeric' })}</div>
     <div class="field"><span class="label">Trades</span>${chips(['AC', 'Plumbing', 'Electrical', 'Handyman', 'Painting', 'Pest control'], 0, 'wrap').replace('data-chips', 'data-chips data-multi')}</div>
     <div class="field"><span class="label">Certificates</span><button type="button" class="btn block" data-toast="Upload (demo)">${icon('upload', 18)}<span>Upload trade certificates</span></button></div>
     ${callout({ tone: 'brand', icon: 'fingerprint', body: 'They will get a link to confirm their identity with UAE Pass. We check the visa is sponsored by Falcon Technical Services before they can accept jobs.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send invite', { variant: 'primary', toast: 'Invite sent — verification usually takes a few minutes (demo)' }))
  + sheet('sheet-manage', 'Manage technician',
    `<div class="list card"><div class="row"><div class="row-main"><div class="row-title">Can accept offers</div><div class="row-sub">Otherwise only you assign their jobs</div></div>${toggle(false, { label: 'Can accept offers' })}</div><div class="row"><div class="row-main"><div class="row-title">Can send quotes</div><div class="row-sub">Up to AED 1,000 without your approval</div></div>${toggle(true, { label: 'Can send quotes' })}</div><div class="row"><div class="row-main"><div class="row-title">On emergency rota</div></div>${toggle(true, { label: 'On emergency rota' })}</div><div class="row"><div class="row-main"><div class="row-title">Sees earnings</div></div>${toggle(false, { label: 'Sees earnings' })}</div></div>
     ${btn('Remove from team', { variant: 'danger', block: true, toast: 'This is a demo — nobody was removed.' })}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Save', { variant: 'primary', toast: 'Permissions saved (demo)' })),
};

/* ------------------------------- Reviews ------------------------------ */
const review = (name, who, n, text, job, when, reply) => `<div class="card pad stack stack-sm">
  <div class="between-top"><div class="inline" style="gap:10px">${avatar(name)}<div><b class="strong">${name}</b><div class="small muted">${who} · ${when}</div></div></div>${stars(n)}</div>
  <p>“${text}”</p>
  <div class="cluster">${badge(job, 'outline')}</div>
  ${reply ? `<div class="callout neutral" style="padding:10px 12px">${icon('reply', 18)}<p class="grow"><b>Your reply:</b> ${reply}</p></div>` : `<div>${btn('Reply', { size: 'sm', icon: 'reply', toast: 'Reply box opened (demo)' })}</div>`}
</div>`;

const reviews = {
  slug: 'reviews', nav: 'reviews', title: 'Reviews', sub: '4.9 from 212 jobs',
  body: () => `
${pageHead({ title: 'Reviews', sub: 'Only customers whose job you completed can leave a review — one per job, after sign-off.' })}
<div class="split">
<div class="stack">
  <div class="card pad"><div class="grid sm2" style="align-items:center;gap:20px">
    <div class="center stack stack-sm"><div class="hero-num" style="font-size:56px">4.9</div><div style="display:flex;justify-content:center">${stars(5).replace('class="stars"', 'class="stars stars-lg"')}</div><div class="small muted mt-2">212 reviewed jobs · top 5% in Dubai</div></div>
    <div class="stack stack-sm">${[[5, 188], [4, 19], [3, 4], [2, 1], [1, 0]].map(([s, n]) => `<div class="inline small" style="gap:10px"><span class="num strong" style="width:14px">${s}</span><div class="grow">${bar(Math.round(n / 212 * 100), s >= 4 ? 'ok' : 'warn', true)}</div><span class="num muted" style="width:30px;text-align:right">${n}</span></div>`).join('')}</div>
  </div></div>

  ${chips(['All', ['Tenants', 141], ['Landlords', 71], ['4 stars or less', 24]])}

  ${review('Fatima Al Hashimi', 'Landlord', 5, 'Quote was clear, the price matched it, and I could see the before and after photos from my phone. Exactly what I need across seven properties.', 'MR-2283 · Extractor fan motor', 'Sat 21 Nov')}
  ${review('Maya Fernandes', 'Tenant', 5, 'Arrived on time, explained it was lint in the pump filter and showed me how to clean it myself next time.', 'MR-2135 · Washing machine', 'Wed 14 Oct', 'Thank you Ms Maya — glad it is draining properly again.')}
  ${review('Hassan El-Sayed', 'Tenant', 4, 'Good work on the water heater but the technician was about 20 minutes late.', 'MR-2249 · Water heater thermostat', 'Thu 19 Nov', 'Apologies for the delay — traffic on Al Qudra Road. We have added more travel time to Town Square jobs.')}
  ${review('James Whitfield', 'Tenant', 5, 'Bilal serviced all six AC units, covered the furniture and left the place spotless.', 'MR-2112 · AC service', 'Tue 6 Oct')}
</div>
<aside class="stack">
  ${stats([
    { label: 'On time', icon: 'clock', value: '96', unit: '%', sub: 'within the booked window' },
    { label: 'First-visit fix', icon: 'check', value: '88', unit: '%' },
    { label: 'Offer response', icon: 'timer', value: '14', unit: 'min', sub: 'median' },
    { label: 'Sign-off, no dispute', icon: 'pen-line', value: '99', unit: '%' },
  ], 'g2')}
  ${card({ title: 'What customers mention', body: `<div class="cluster">${[['On time', 131], ['Explained the fix', 96], ['Tidy', 88], ['Friendly', 74], ['Fair price', 52]].map(([t, n]) => `<span class="badge lg brand">${t} · ${n}</span>`).join('')}</div>` })}
  ${callout({ tone: 'brand', icon: 'award', title: 'Preferred contractor', body: 'Rating above 4.7 and on-time above 95% puts Falcon Technical first in line for offers in your areas — and on the emergency rota.' })}
  ${callout({ tone: 'neutral', title: 'Think a review is unfair?', body: 'You can reply publicly, or ask a manager to check it against the job photos and timeline.', actions: btn('Ask for a review check', { size: 'sm', toast: 'Sent to your manager (demo)' }) })}
</aside>
</div>`,
};

/* ------------------------------- Profile ------------------------------ */
const profile = {
  slug: 'profile', nav: 'profile', title: 'Profile & compliance', sub: 'Approved contractor',
  body: ({ data }) => { const c = data.people.contractor; return `
<div class="split">
<div class="stack">
  <div class="card pad"><div class="inline" style="gap:14px">${avatar('Falcon Technical', { size: 'xl', tone: 'c3', initials: 'FT', ring: true })}<div><h1>${c.company}</h1><p class="muted">${c.name} · owner · <span class="nowrap">${c.phone}</span></p><div class="cluster mt-2">${badge('Approved contractor', 'ok', { icon: 'badge-check' })}${badge('Preferred', 'gold', { icon: 'award' })}${badge('Partner since Feb 2025')}</div></div></div></div>

  ${callout({ tone: 'warn', icon: 'file-badge', title: 'Trade licence expires in 24 days', body: 'Upload your renewed DET licence by Fri 18 Dec 2026. After that date new offers pause automatically; booked jobs are unaffected for 7 days.', actions: btn('Upload renewal', { size: 'sm', variant: 'primary', icon: 'upload', sheet: 'sheet-licence' }) })}

  ${card({ title: 'Company verification', headEnd: `<span class="small muted">Checked by openrent.me</span>`, flush: true, body: list([
    { icon: 'file-badge', tone: 'warn', title: 'DET trade licence', sub: 'No. 1029384 · Technical services (AC, plumbing, electrical) · expires 18 Dec 2026', endBadge: badge('Renew soon', 'warn'), sheet: 'sheet-licence', chev: true },
    { icon: 'umbrella', tone: 'ok', title: 'Public liability insurance', sub: 'AED 1,000,000 per claim · valid to 30 Jun 2027', endBadge: badge('Valid', 'ok') },
    { icon: 'hard-hat', tone: 'ok', title: 'Workmen’s compensation cover', sub: '4 employees · valid to 30 Jun 2027', endBadge: badge('Valid', 'ok') },
    { icon: 'receipt-text', tone: 'ok', title: 'VAT registration', sub: 'TRN 1003 4471 2200 003', endBadge: badge('Verified', 'ok') },
    { icon: 'landmark', tone: 'ok', title: 'Payout bank account', sub: 'Mashreq ••7730 · name matches licence', endBadge: badge('Verified', 'ok') },
    { icon: 'fingerprint', tone: 'ok', title: 'Owner identity — UAE Pass', sub: 'Imran Sheikh · licence manager on record', endBadge: badge('Verified', 'ok') },
  ]) })}

  ${card({ title: 'Trade certificates', flush: true, body: list([
    { icon: 'snowflake', tone: 'brand', title: 'Refrigerant handling', sub: 'Imran Sheikh, Bilal Ahmed · valid to Mar 2028', endBadge: badge('On file', 'ok') },
    { icon: 'zap', tone: 'brand', title: 'Electrical competency', sub: 'Kelvin Otieno · valid to Sep 2027', endBadge: badge('On file', 'ok') },
    { icon: 'construction', tone: 'brand', title: 'Working at height', sub: 'Sanjay Thapa · valid to Jan 2027', endBadge: badge('On file', 'ok') },
    { icon: 'plus', title: 'Add a certificate', sub: 'Unlocks more job types — e.g. gas, pest control, pool', toast: 'Upload (demo)', chev: true },
  ]) })}

  ${card({ title: 'Trades and areas', body: `<div class="field"><span class="label">Trades you take</span>${chips(['AC & ventilation', 'Plumbing', 'Electrical', 'Handyman', 'Painting', 'Deep cleaning', 'Pest control'], -1, 'wrap').replace('data-chips', 'data-chips data-multi').replace(/class="chip">(AC|Plumbing|Electrical|Handyman|Painting)/g, 'class="chip is-active">$1')}</div>
    <div class="field mt-4"><span class="label">Areas you cover</span>${chips(['Dubai Marina', 'JLT', 'The Greens', 'JVC', 'Business Bay', 'Downtown', 'Town Square', 'Arabian Ranches', 'Dubai Hills', 'Mirdif'], -1, 'wrap').replace('data-chips', 'data-chips data-multi').replace(/class="chip">(Dubai Marina|JLT|The Greens|JVC|Business Bay|Downtown|Town Square|Arabian Ranches)/g, 'class="chip is-active">$1')}</div>
    <div class="form-grid c2 mt-4">${field({ label: 'Call-out and first hour', value: '180', prefix: 'AED', inputmode: 'numeric' })}${field({ label: 'Hourly rate after that', value: '120', prefix: 'AED', inputmode: 'numeric' })}</div>` })}
</div>

<aside class="stack">
  ${card({ title: 'Emergency rota', body: `<div class="between"><div><b class="strong">Take emergency call-outs</b><div class="small muted">Mon, Wed, Fri nights · 20:00 – 08:00</div></div>${toggle(true, { label: 'Emergency rota' })}</div>
    <p class="small muted mt-3">No cooling, flooding, no power or a security risk. If a landlord is silent for 60 minutes, openrent.me dispatches the rota contractor up to a pre-agreed limit — you are paid either way.</p>
    <div class="cluster mt-3">${rule('OR-104', 'Emergency standard')}${badge('AED 75 standby / night', 'gold')}${badge('1.5× labour', 'gold')}</div>` })}

  ${guard({ title: 'Code of conduct', sub: 'Accepted 3 Feb 2025 · version 4', checks: [
    { state: 'ok', title: 'Door code before entry', sub: 'Say the four digits shown in the job. The tenant checks them against their app.' },
    { state: 'ok', title: 'Photos before and after every job' },
    { state: 'ok', title: 'Quote first, then work', sub: 'Never exceed the approved limit without a variation.' },
    { state: 'block', title: 'No cash from tenants or landlords', sub: 'Who pays is decided by the tenancy rules, not on the doorstep.', rule: rule('OR-103', 'Small repairs') },
    { state: 'block', title: 'Never cut off a tenant’s services', sub: 'Even if a landlord asks. Report the request to your manager.', rule: rule('DXB-034', 'Art. 34') },
    { state: 'info', title: 'Respect the home', sub: 'Shoe covers, tidy up, ask before moving belongings, no photos of people.' },
  ] })}

  ${card({ title: 'Platform terms', body: kv([['Joining fee', 'AED 0'], ['Platform fee', '10% of completed jobs'], ['Payouts', '2 working days after sign-off'], ['Instant payout', '1% (optional)'], ['VAT', '5% on your invoices']]) })}

  ${card({ title: 'Account', flush: true, body: list([
    { icon: 'bell', title: 'Notifications', sub: 'Offers by push and WhatsApp', toast: 'Notification settings (demo)', chev: true },
    { icon: 'languages', title: 'Language', sub: 'English · العربية · हिन्दी · اردو', toast: 'Language settings (demo)', chev: true },
    { icon: 'life-buoy', title: 'Contractor support', sub: '800 RENT ME · 07:00 – 22:00', toast: 'Calling support… (demo)', chev: true },
  ]) })}
  ${btn('Sign out', { block: true, icon: 'log-out', href: '../index.html' })}
</aside></div>`; },
  sheets: () => sheet('sheet-licence', 'Renew trade licence',
    `${kv([['Licence number', '1029384'], ['Issued by', 'Dubai Department of Economy & Tourism'], ['Current expiry', '18 Dec 2026'], ['Activities', 'AC, plumbing, electrical fitting']])}
     <div class="field"><span class="label">Renewed licence (PDF or photo)</span><button type="button" class="btn block" data-toast="Upload (demo)">${icon('upload', 18)}<span>Choose file</span></button></div>
     ${field({ label: 'New expiry date', type: 'date', value: '2027-12-18' })}
     ${callout({ tone: 'neutral', body: 'We verify the licence number against the DET register, usually within one working day.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Submit for check', { variant: 'primary', toast: 'Submitted — we will confirm within 1 working day (demo)' })),
};

/* ------------------------------ Messages ------------------------------ */
const messages = {
  slug: 'messages', nav: 'messages', title: 'Messages', sub: '2 unread',
  body: () => `
${pageHead({ title: 'Messages', sub: 'Each conversation belongs to a job, so nothing gets lost — and customers never see your personal number.' })}
${chips(['All', ['Unread', 2], 'Tenants', 'Landlords', 'openrent.me'])}
<div class="card">${list([
  { href: 'job.html#sheet-chat', unread: true, lead: avatar('Maya Fernandes'), title: 'Maya Fernandes', badge: badge('MR-2291', 'gold'), sub: 'Great, thank you. Visitor parking is on P1, tell security apartment 2304.', endSub: '10:54' },
  { sheet: 'sheet-hassan', unread: true, lead: avatar('Hassan El-Sayed'), title: 'Hassan El-Sayed', badge: badge('MR-2304', 'warn'), sub: 'Thanks for coming early. Any idea when the part will be fitted? It is getting warm upstairs.', endSub: '10:31', chev: true },
  { toast: 'Thread opened (demo)', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla · openrent.me', badge: badge('Dispatch', 'brand'), sub: 'I have nudged the landlord on MR-2304. If no reply by 12:00 I will authorise it under the emergency standard.', endSub: '10:40', chev: true },
  { toast: 'Thread opened (demo)', lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', badge: badge('MR-2283'), sub: 'Thank you — the extractor is much quieter. Please go ahead with the snag list visit at The Greens.', endSub: 'Mon', chev: true },
  { toast: 'Thread opened (demo)', lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun · field agent', badge: badge('MR-2312'), sub: 'Key for Bloom Towers 915 is with reception under “openrent.me”. Photos are Thursday so paint must be dry.', endSub: 'Mon', chev: true },
  { toast: 'Thread opened (demo)', lead: `<span class="row-ico brand">${icon('bot', 20)}</span>`, title: 'openrent.me updates', sub: 'Payout of AED 2,142.00 sent to Mashreq ••7730.', endSub: 'Mon', chev: true },
])}</div>
<p class="demo-note">${icon('lock', 14)} Calls and messages use masked numbers and are saved to the job record.</p>`,
  sheets: () => sheet('sheet-hassan', 'Hassan · tenant, Zahra TH 114',
    chat([{ day: 'Today' }, { who: 'sys', text: `${icon('thermometer-snowflake', 13)} MR-2304 · AC not cooling · quote with the landlord` }, { who: 'me', text: 'Mr Hassan, the capacitor on the outdoor unit has failed and the gas is low. I have sent the quote to your landlord — I can fit it as soon as it is approved.', time: '09:50' }, { text: 'Thanks for coming early. Any idea when the part will be fitted? It is getting warm upstairs.', time: '10:31' }, { who: 'me', text: 'I have the part in the van. Earliest is 17:00 today if approved by noon, otherwise tomorrow 09:00. openrent.me is chasing.', time: '10:36' }, { who: 'sys', text: `${icon('shield-check', 13)} Cooling faults are treated as urgent. If the landlord has not answered by 12:00, openrent.me can approve the repair.` }]) + composer('Message Hassan…')),
};

module.exports = [earnings, team, reviews, profile, messages];
