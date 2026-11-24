const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sectionHead, sheet, field, choice, tabs, panel, bar, chips, toggle, table } = ui;
const B = '../../';

// Editable quote line (label, qty x rate, amount)
const qline = (title, qty, rate, amt, note) => `<div class="row" style="align-items:flex-start">
  <div class="row-main"><div class="row-title">${title}</div><div class="row-sub">${qty} × AED ${rate}${note ? ' · ' + note : ''}</div></div>
  <div class="row-end"><b>AED ${amt}</b><button type="button" class="link small" data-sheet="sheet-qline">Edit</button></div></div>`;

const quotes = {
  slug: 'quotes', nav: 'quotes', title: 'Quotes', sub: '2 awaiting approval',
  body: () => `
${pageHead({ title: 'Quotes', sub: 'Price a job in a minute. The customer sees one clear figure; you see exactly what lands in your account.', actions: btn('New quote', { variant: 'primary', icon: 'plus', sheet: 'sheet-newquote' }) })}

${tabs('q', [{ id: 'build', label: 'MR-2304' }, { id: 'all', label: 'All quotes', n: 6 }], 'build')}

${panel('q', 'build', `
<div class="split">
<div class="stack">
  <div class="card pad stack stack-md">
    <div class="between-top"><div><span class="eyebrow">Quote Q-2304-1 · AC</span><h2 class="mt-1">AC not cooling — living room unit</h2><div class="small muted mt-1">Zahra Townhouse 114 · Town Square · tenant Hassan El-Sayed</div></div>${badge('Awaiting landlord', 'warn', { lg: true })}</div>
    <div class="callout neutral" style="padding:10px 12px">${icon('search', 18)}<p class="grow"><b>Diagnosis (09:00 visit):</b> compressor run capacitor failed and system pressure low. Capacitor to replace, leak-test, top up refrigerant. Outdoor unit otherwise healthy.</p></div>
    <div class="photo-grid"><div class="ph"><img src="${B}assets/img/p7.svg" alt="Outdoor unit"></div><div class="ph"><img src="${B}assets/img/living-d.svg" alt="Indoor unit"></div><button type="button" class="ph add" data-toast="Camera opened (demo)">${icon('camera', 22)}</button></div>
  </div>

  ${card({ title: 'Line items', headEnd: `<button type="button" class="link" data-sheet="sheet-qline">Add line</button>`, flush: true, body: `<div class="list">
    ${qline('Call-out and diagnosis', '1', '150', '150.00', 'already carried out')}
    ${qline('Labour — AC technician', '2 h', '120', '240.00')}
    ${qline('Compressor run capacitor 45 µF', '1 pc', '110', '110.00', 'in van stock')}
    ${qline('Refrigerant R-410A top-up', '1.4 kg', '250', '350.00', 'incl. leak test')}
  </div>` })}

  ${card({ title: 'What everyone sees', body: `
    ${kv([['Subtotal', 'AED 850.00'], ['VAT 5%', 'AED 42.50'], ['Landlord is charged', 'AED 892.50']], 'total')}
    <div class="divider mt-4 mb-4"></div>
    ${kv([['Your price (subtotal)', 'AED 850.00'], ['Platform fee 10%', '− AED 85.00'], ['VAT you collect and remit', 'AED 42.50'], ['You receive', 'AED 765.00 + VAT']], 'total')}
    <p class="small muted mt-3">The fee is taken only when the job is paid. Nothing is charged for quotes that are declined.</p>` })}

  <div class="form-grid c2">
    ${field({ label: 'Valid until', type: 'date', value: '2026-12-01' })}
    ${field({ label: 'Earliest start', type: 'select', options: ['Today, 17:00–19:00', 'Wed 25 Nov, 09:00–11:00', 'Wed 25 Nov, 14:00–16:00'], value: 'Wed 25 Nov, 09:00–11:00' })}
    ${field({ label: 'Warranty on this work', type: 'select', options: ['30 days', '90 days', '6 months', '12 months'], value: '90 days', cls: 'span2', hint: 'Parts and labour. Longer warranties win more approvals.' })}
  </div>
  <div class="btn-row">${btn('Withdraw', { toast: 'Quote withdrawn (demo)' })}${btn('Update & resend', { variant: 'primary', icon: 'send', toast: 'Quote Q-2304-2 sent to the landlord (demo)' })}</div>
</div>

<aside class="stack">
  ${card({ title: 'Approval', body: timeline([
    { state: 'done', icon: 'search', title: 'Diagnosed on site', when: 'Today, 09:35' },
    { state: 'done', icon: 'send', title: 'Quote sent to Fatima Al Hashimi', body: 'Landlord · pays for AC plant faults.', when: 'Today, 09:48' },
    { state: 'now', icon: 'hourglass', title: 'Waiting for approval', body: 'Opened at 10:02. Typical reply time 25 minutes; your manager steps in after 2 hours because cooling is urgent.', when: '1 h 07 min so far' },
    { icon: 'calendar', title: 'Tenant picks a slot' },
    { icon: 'wrench', title: 'Repair' },
  ]) })}
  ${guard({ title: 'Quote checks', sub: 'Run before a quote is sent', checks: [
    { state: 'ok', title: 'Landlord pays — tenant is not charged', sub: 'AC plant is the landlord’s responsibility and cannot be moved to the tenant.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'ok', title: 'Within the fair-price range', sub: 'Similar repairs on openrent.me: AED 720 – 980.' },
    { state: 'info', title: 'Cooling fault = urgent', sub: 'If nobody approves by 12:00, openrent.me can authorise up to AED 1,500 so the tenant is not left without cooling.', rule: rule('OR-104', 'Emergency standard') },
  ] })}
  ${callout({ tone: 'neutral', icon: 'message-square-text', title: 'Tenant update sent', body: '“The technician has found the fault and sent a quote to your landlord. We will message you as soon as a visit is booked.”' })}
</aside>
</div>`, true)}

${panel('q', 'all', `
  <div class="card">${list([
    { icon: 'hourglass', tone: 'warn', title: 'AC not cooling — capacitor & gas', sub: 'MR-2304 · Zahra Townhouse 114 · sent today 09:48', end: 'AED 850', endBadge: badge('Awaiting', 'warn') },
    { icon: 'hourglass', tone: 'warn', title: 'Booster pump replacement', sub: 'MR-2276 · Palma Villa 27 · sent Fri 20 Nov · reminder sent Mon', end: 'AED 1,950', endBadge: badge('Awaiting', 'warn'), toast: 'Quote opened (demo)' },
    { icon: 'circle-check', tone: 'ok', title: 'Extractor fan motor', sub: 'MR-2283 · Executive Towers K 1807 · approved in 18 min', end: 'AED 460', endBadge: badge('Approved', 'ok'), toast: 'Quote opened (demo)' },
    { icon: 'circle-check', tone: 'ok', title: 'Irrigation timer replacement', sub: 'MR-2260 · Palma Villa 27 · approved in 2 h', end: 'AED 340', endBadge: badge('Approved', 'ok'), toast: 'Quote opened (demo)' },
    { icon: 'x', tone: 'danger', title: 'Full kitchen re-seal and regrout', sub: 'MR-2241 · Al Ghozlan 3, Apt 412 · landlord chose a smaller scope', end: 'AED 1,280', endBadge: badge('Declined', 'danger'), toast: 'Quote opened (demo)' },
    { icon: 'clock', tone: '', title: 'Water heater replacement 50 L', sub: 'MR-2198 · Bloom Towers B 915 · not answered in 7 days', end: 'AED 990', endBadge: badge('Expired'), toast: 'Quote opened (demo)' },
  ])}</div>
  <div class="grid g2 sm4">${[['78%', 'approved'], ['41 min', 'median approval'], ['AED 640', 'average quote'], ['0', 'price disputes']].map(([n, l]) => `<div class="card pad center"><b class="display" style="font-size:22px">${n}</b><div class="small muted">${l}</div></div>`).join('')}</div>`)}
`,
  sheets: () => sheet('sheet-qline', 'Quote line',
    `<div class="field"><span class="label">Type</span>${ui.seg('ql', [{ id: 'labour', label: 'Labour' }, { id: 'part', label: 'Part' }, { id: 'callout', label: 'Call-out' }], 'part', 'block')}</div>
     ${field({ label: 'Description', value: 'Compressor run capacitor 45 µF' })}
     <div class="form-grid c2">${field({ label: 'Quantity', value: '1', inputmode: 'numeric' })}${field({ label: 'Unit price', value: '110.00', prefix: 'AED', inputmode: 'decimal' })}</div>
     ${callout({ tone: 'neutral', body: 'Typical price on openrent.me for this part: AED 90 – 130.' })}`,
    btn('Remove line', { variant: 'danger', toast: 'Line removed (demo)' }) + btn('Save line', { variant: 'primary', toast: 'Line saved (demo)' }))
  + sheet('sheet-newquote', 'New quote',
    `<div class="field"><span class="label">For which job?</span>
       ${choice('nq', 'MR-2309 · Pre-check-out snag list', 'Al Ghozlan 3, Apt 412 · visit today 14:00', true)}
       ${choice('nq', 'MR-2311 · Water heater not heating', 'Executive Towers K 1807 · accept the offer first', false, { locked: true })}</div>
     <div class="field"><span class="label">Start from</span>${chips(['Blank', 'AC service', 'Tap / mixer', 'Water heater', 'Paint touch-up', 'Snag list'], 5, 'wrap')}</div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Start quote', { variant: 'primary', toast: 'Draft quote created for MR-2309 (demo)' })),
};

const slot = (time, tone, title, where, tech, techTone, tag) => `<div class="slot"><time>${time}</time><div class="slot-card ${tone}"><div class="between-top"><b class="strong" style="font-size:14.5px;line-height:1.3">${title}</b>${tag || ''}</div><div class="small muted mt-1">${where}</div><div class="inline small mt-2">${avatar(tech, { size: 'xs', tone: techTone })}<span class="muted">${tech}</span></div></div></div>`;

const days = [['Mon', 23, 5], ['Tue', 24, 6, 1], ['Wed', 25, 4], ['Thu', 26, 5], ['Fri', 27, 3], ['Sat', 28, 2], ['Sun', 29, 0]];

const schedule = {
  slug: 'schedule', nav: 'schedule', title: 'Schedule', sub: 'Week of 23 Nov',
  body: () => `
${pageHead({ title: 'Schedule', sub: 'Your whole team in one view. Customers can only book slots you have marked as free.', actions: btn('Block time', { size: 'sm', icon: 'ban', sheet: 'sheet-block' }) + btn('Working hours', { size: 'sm', icon: 'clock', sheet: 'sheet-hours' }) })}

<div class="daystrip">${days.map(([d, n, c, a]) => `<button type="button" class="day${a ? ' is-active' : ''}${c ? ' has' : ''}">${d}<b>${n}</b></button>`).join('')}</div>
${chips(['Everyone', 'Imran', 'Bilal', 'Sanjay', 'Kelvin'])}

<div class="split">
<div class="stack">
  <div class="section-head"><h2>Tuesday 24 November</h2><span class="small muted">6 jobs · 4 people</span></div>
  <div class="stack stack-md">
    ${slot('09:00', 'ok', 'AC not cooling — diagnosis', 'MR-2304 · Zahra Townhouse 114 · Town Square', 'Imran Sheikh', 'c3', badge('Done', 'ok'))}
    ${slot('09:00', 'ok', 'AC service — 4 units', 'MR-2301 · Palma Villa 12 · Arabian Ranches 2', 'Bilal Ahmed', 'c2', badge('Done', 'ok'))}
    ${slot('10:05', 'info', 'AC service — 4 units', 'MR-2306 · Palma Villa 41 · Arabian Ranches 2', 'Bilal Ahmed', 'c2', badge('On site', 'info', { dot: true }))}
    ${slot('11:30', '', 'Kitchen mixer tap leaking', 'MR-2291 · Marina Gate 1, Apt 2304 · Dubai Marina', 'Imran Sheikh', 'c3', badge('Next', 'gold', { dot: true }))}
    <div class="slot"><time>13:00</time><div class="slot-card muted-card small muted">Lunch and travel · Marina → The Greens, 14 min</div></div>
    ${slot('14:00', 'info', 'Pre-check-out snag list — quote visit', 'MR-2309 · Al Ghozlan 3, Apt 412 · The Greens', 'Imran Sheikh', 'c3')}
    ${slot('16:30', '', 'Touch-up painting before photos', 'MR-2312 · Bloom Towers B, Studio 915 · JVC', 'Sanjay Thapa', 'c6')}
    <div class="slot"><time>20:00</time><div class="slot-card warn"><div class="between-top"><b class="strong" style="font-size:14.5px">Emergency rota</b>${badge('Standby', 'warn')}</div><div class="small muted mt-1">20:00 – 08:00 · Marina, JLT, The Greens</div><div class="inline small mt-2">${avatar('Kelvin Otieno', { size: 'xs', tone: 'c4' })}<span class="muted">Kelvin Otieno</span></div></div></div>
  </div>

  ${card({ title: 'This week by technician', flush: true, body: table({ cols: [{ label: 'Technician' }, { label: 'Mon', r: true }, { label: 'Tue', r: true }, { label: 'Wed', r: true }, { label: 'Thu', r: true }, { label: 'Fri', r: true }, { label: 'Booked', r: true }], stack: false, rows: [
    [`<span class="cell">${avatar('Imran Sheikh', { size: 'xs', tone: 'c3' })}<b>Imran</b></span>`, '2', '3', '1', '2', '1', '<b>58%</b>'],
    [`<span class="cell">${avatar('Bilal Ahmed', { size: 'xs', tone: 'c2' })}<b>Bilal</b></span>`, '2', '2', '2', '2', '1', '<b>71%</b>'],
    [`<span class="cell">${avatar('Sanjay Thapa', { size: 'xs', tone: 'c6' })}<b>Sanjay</b></span>`, '1', '1', '1', '1', '1', '<b>44%</b>'],
    [`<span class="cell">${avatar('Kelvin Otieno', { size: 'xs', tone: 'c4' })}<b>Kelvin</b></span>`, '0', '0', '0', '0', '0', '<span class="muted">Rota</span>'],
  ] }).replace('class="table"', 'class="table compact"') })}
</div>

<aside class="stack">
  ${card({ title: 'Coming up', flush: true, body: list([
    { icon: 'fan', tone: 'info', title: 'Wed 25 · AC deep clean', sub: 'MR-2315 · Burj Vista 1 · offer not yet accepted', endBadge: badge('Offer', 'warn') },
    { icon: 'camera', tone: '', title: 'Thu 26 · Photographer at Burj Vista', sub: 'No work can be booked 10:00–13:00', endBadge: badge('Blocked') },
    { icon: 'package', tone: 'gold', title: 'Mon 30 · Check-out, Al Ghozlan 412', sub: 'Snag works must finish before re-listing', endBadge: badge('Deadline', 'gold') },
    { icon: 'thermometer-snowflake', tone: 'brand', title: 'Tue 1 Dec · AC service, Palma Villa 27', sub: 'MR-2318 · Bilal · 09:00–12:00' },
    { icon: 'thermometer-snowflake', tone: 'brand', title: 'Thu 3 Dec · AC service, Marina Gate 2304', sub: 'MR-2207 · Bilal · 09:00–10:30' },
  ]) })}
  ${card({ title: 'Working hours', headEnd: `<button type="button" class="link" data-sheet="sheet-hours">Edit</button>`, body: kv([['Sat – Thu', '08:00 – 18:00'], ['Friday', '14:00 – 18:00'], ['Emergency rota', 'Mon, Wed, Fri nights'], ['Lead time for routine jobs', '4 hours'], ['Max travel between jobs', '40 minutes']]) })}
  ${card({ title: 'Service areas', body: `${chips(['Dubai Marina', 'JLT', 'The Greens', 'JVC', 'Business Bay', 'Downtown', 'Town Square', 'Arabian Ranches'], -1, 'wrap').replace('data-chips', 'data-chips data-multi').replace(/class="chip"/g, 'class="chip is-active"')}<p class="small muted mt-3">Offers outside these areas are not sent to you.</p>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-block', 'Block time',
    `<div class="field"><span class="label">Who?</span>${chips(['Whole team', 'Imran', 'Bilal', 'Sanjay', 'Kelvin'], 1, 'wrap')}</div>
     <div class="form-grid c2">${field({ label: 'From', type: 'datetime-local', value: '2026-11-27T08:00' })}${field({ label: 'To', type: 'datetime-local', value: '2026-11-27T14:00' })}</div>
     ${field({ label: 'Reason (only you see this)', type: 'select', options: ['Leave', 'Training', 'Vehicle service', 'Private job', 'Other'], value: 'Vehicle service' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Block time', { variant: 'primary', toast: 'Time blocked — no offers will be sent (demo)' }))
  + sheet('sheet-hours', 'Working hours',
    `<div class="list card">${[['Saturday', '08:00 – 18:00', 1], ['Sunday', '08:00 – 18:00', 1], ['Monday', '08:00 – 18:00', 1], ['Tuesday', '08:00 – 18:00', 1], ['Wednesday', '08:00 – 18:00', 1], ['Thursday', '08:00 – 18:00', 1], ['Friday', '14:00 – 18:00', 1]].map(([d, h, on]) => `<div class="row"><div class="row-main"><div class="row-title">${d}</div><div class="row-sub">${h}</div></div>${toggle(on, { label: d })}</div>`).join('')}</div>
     ${callout({ tone: 'brand', icon: 'siren', body: 'Emergency rota nights earn a standby fee of AED 75 plus 1.5× labour on any call-out.', rules: [rule('OR-104', 'Emergency standard')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save hours', { variant: 'primary', toast: 'Working hours saved (demo)' })),
};

module.exports = [quotes, schedule];
