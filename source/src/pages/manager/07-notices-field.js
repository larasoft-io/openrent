const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, field, choice, timeline, docIco, chips } = ui;
const { B } = require('./lib/h');

const ncard = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · ${o.prop}</div></div></div>${o.badge}</div>
  <div class="inline small">${avatar(o.from, { size: 'xs' })}<span>${o.from}</span>${icon('arrow-right', 14, 'faint')}${avatar(o.to, { size: 'xs' })}<span>${o.to}</span></div>
  ${o.kv ? kv(o.kv) : ''}${o.text ? `<p class="small muted">${o.text}</p>` : ''}
  <div class="between" style="gap:8px;flex-wrap:wrap"><div class="cluster">${o.rules}</div>${o.act || ''}</div>
</div>`;

const notices = {
  slug: 'notices', nav: 'notices', title: 'Legal notices', sub: '3 in the notary queue',
  body: () => `
${pageHead({ title: 'Legal notice desk', sub: 'A notice only counts if it says the right thing, is served the right way and can be proved later. Every one passes through here.', actions: btn('Notice register', { icon: 'download', size: 'sm', toast: 'Register exported (demo)' }) })}
${stats([
  { label: 'In notary queue', icon: 'stamp', value: '3', sub: 'next slot Thu 26 Nov' },
  { label: 'Served this month', icon: 'mail-check', value: '7', sub: 'all with proof on file' },
  { label: 'Running periods', icon: 'hourglass', value: '5', sub: '1 ends within 30 days' },
  { label: 'Drafts blocked', icon: 'ban', value: '2', sub: 'this month' },
])}
${tabs('nt', [{ id: 'run', label: 'Served & running', n: 5 }, { id: 'queue', label: 'Queue', n: 3 }, { id: 'blocked', label: 'Blocked', n: 2 }], 'run')}

<div class="split">
<div class="stack">
${panel('nt', 'run', `
  ${ncard({ icon: 'circle-alert', tone: 'danger', title: '30-day notice to pay — rent arrears', ref: 'LN-0312', prop: 'Zahra Townhouse 114, Town Square', badge: badge('15 days left', 'danger', { dot: true }), from: 'Fatima Al Hashimi', to: 'Hassan El-Sayed', kv: [['Amount demanded', money(36250) + ' · cheque 3 of 4'], ['Notarised', 'Mon 9 Nov 2026 · e-notary ref. 2026/1/284417'], ['Delivered', 'Tue 10 Nov, 11:26 · registered courier, signed by tenant'], ['Period ends', 'Wed 9 Dec 2026']], rules: rule('DXB-025A', 'Art. 25(1)'), act: btn('Delivery proof', { size: 'sm', icon: 'file-check', sheet: 'sheet-proof' }) })}
  ${ncard({ icon: 'house', tone: 'violet', title: '12-month notice — owner’s own use', ref: 'LN-0287', prop: 'Palma Villa 27, Arabian Ranches 2', badge: badge('294 days left', 'violet'), from: 'Fatima Al Hashimi', to: 'James & Claire Whitfield', kv: [['Reason stated', 'Use by first-degree relative (son)'], ['Notarised', 'Wed 2 Sep 2026 · notary public, Al Barsha'], ['Delivered', 'Thu 3 Sep · registered mail RR 4471 2087 1AE'], ['Vacate by', 'Tue 14 Sep 2027 · end of term']], rules: rule('DXB-025B', 'Art. 25(2)') + rule('DXB-026', 'No re-let 2 yrs'), act: btn('Delivery proof', { size: 'sm', icon: 'file-check', sheet: 'sheet-proof' }) })}
  <div class="card">${list([
    { icon: 'refresh-cw', tone: 'ok', title: 'Renewal terms — Marina Gate 2304', sub: 'LN-0321 · served in-app and by registered email Wed 18 Nov · 102 days before expiry', endBadge: badge('In time', 'ok'), extra: `<div class="mt-2">${rule('DXB-014', '90-day notice')}</div>` },
    { icon: 'tag', tone: 'violet', title: '12-month notice — sale · Maple 1 · TH 17', sub: 'LN-0266 · served 14 Jul 2026 · vacate by 31 Jul 2027', endBadge: badge('249 days', 'violet') },
    { icon: 'circle-alert', tone: 'ok', title: '30-day notice to pay — Lake Terrace 2 · 1402', sub: 'LN-0305 · served 27 Oct · tenant paid in full on 12 Nov — closed', endBadge: badge('Paid', 'ok') },
  ])}</div>`, true)}

${panel('nt', 'queue', `
  ${ncard({ icon: 'tag', tone: 'violet', title: '12-month notice — sale', ref: 'LN-0324', prop: 'Marina Arcade · 1903, Dubai Marina', badge: badge('Notary Thu 10:30', 'info', { dot: true }), from: 'Anastasia Volkova', to: 'Kenji & Yui Watanabe', text: 'Draft approved against the legal template. Signed sale-listing agreement attached as evidence of intent. Earliest lawful vacate date: 30 Nov 2027.', rules: rule('DXB-025B', 'Art. 25(2)') + rule('DXB-027', 'Sale keeps tenancy'), act: btn('Open draft', { size: 'sm', toast: 'Draft opened (demo)' }) })}
  ${ncard({ icon: 'circle-alert', tone: 'danger', title: '30-day notice to pay', ref: 'LN-0325', prop: 'Silicon Gates 2 · 311, Dubai Silicon Oasis', badge: badge('Needs signature', 'warn', { dot: true }), from: 'Olumide Adeyemi', to: 'Rahul Verma', text: 'Rent cheque 2 (AED 16,000) returned 19 Nov. The owner’s representative cannot sign — his power of attorney expired on 2 Nov.', rules: rule('DXB-025A', 'Art. 25(1)') + rule('DXB-003', 'Valid PoA'), act: btn('Chase owner', { size: 'sm', toast: 'Message sent to Olumide (demo)' }) })}
  ${ncard({ icon: 'refresh-cw', tone: 'warn', title: 'Renewal terms — must go by Thursday', ref: 'LN-0326', prop: 'Park Heights 1 · 214, Dubai Hills', badge: badge('2 days', 'warn', { dot: true }), from: 'Sophie Laurent', to: 'Thandiwe Nkosi', text: 'Index allows up to 5% (AED 117,600). Sophie has not chosen. If nothing is served by Thu 26 Nov the tenancy renews at AED 112,000.', rules: rule('DXB-014', '90-day notice') + rule('DXB-009', 'Rent cap'), act: btn('Call Sophie', { size: 'sm', icon: 'phone', toast: 'Calling Sophie… (demo)' }) })}`)}

${panel('nt', 'blocked', `
  ${ncard({ icon: 'ban', tone: 'danger', title: 'Eviction with 3 months’ notice', ref: 'Draft · 20 Nov', prop: 'Villa 14, Street 9, Mirdif', badge: badge('Blocked', 'danger'), from: 'Khalid Al Mazrouei', to: 'Ahmad & Layan Darwish', text: 'The landlord wants the villa back by 28 Feb 2027 for his brother. Two problems: recovery at expiry needs at least 12 months’ notarised notice, and a brother is not a first-degree relative. He has been sent the correct options — a 12-month notice for his own use, or a negotiated early surrender the tenants may refuse.', rules: rule('DXB-025B', 'Art. 25(2)'), act: btn('View reply', { size: 'sm', toast: 'Reply to Khalid opened (demo)' }) })}
  ${ncard({ icon: 'plug', tone: 'danger', title: '“Warning: DEWA will be disconnected”', ref: 'Draft · 11 Nov', prop: 'Silicon Gates 2 · 311', badge: badge('Blocked', 'danger'), from: 'Daniel Okafor (rep)', to: 'Rahul Verma', text: 'No such notice exists. Arrears are pursued with a 30-day notarised notice and, if unpaid, the RDC — never by cutting services.', rules: rule('DXB-034', 'Art. 34') + rule('DXB-025A', '30-day notice'), act: '' })}
  ${callout({ tone: 'brand', title: 'Blocked means redirected', body: 'The landlord is never just told “no”. They get the lawful route that achieves the nearest thing to what they wanted, with dates.' })}`)}
</div>

<aside class="stack">
  ${guard({ title: 'The only notices the product can send', checks: [
    { state: 'ok', title: 'Change of terms at renewal', sub: 'At least 90 days before expiry.', rule: rule('DXB-014', 'Art. 14') },
    { state: 'ok', title: 'Pay within 30 days (arrears)', sub: 'Notary public or registered mail.', rule: rule('DXB-025A', 'Art. 25(1)') },
    { state: 'ok', title: 'Vacate at expiry — 12 months', sub: 'Own use, sale, demolition or major works only.', rule: rule('DXB-025B', 'Art. 25(2)') },
    { state: 'block', title: 'Anything else', sub: 'Lock-out warnings, short-notice evictions and “penalty” letters cannot be generated.', rule: rule('DXB-034', 'Art. 34') },
  ] })}
  ${card({ title: 'Notary slots', flush: true, body: list([
    { icon: 'stamp', title: 'Thu 26 Nov · 10:30', sub: 'e-notary session · 2 notices booked · 1 free', endBadge: badge('Open', 'ok') },
    { icon: 'stamp', title: 'Mon 30 Nov · 14:00', sub: 'e-notary session · 3 free', endBadge: badge('Open', 'ok') },
  ]) })}
  ${callout({ tone: 'neutral', icon: 'languages', title: 'Arabic first', body: 'Notices are issued in Arabic with an English translation. The Arabic text prevails before the RDC.' })}
</aside>
</div>`,
  sheets: () => sheet('sheet-proof', 'Proof of service',
    `${timeline([
       { state: 'done', icon: 'file-text', title: 'Drafted from the legal template', body: 'Amount, cheque number and 30-day period inserted automatically.', when: 'Thu 5 Nov, 10:12' },
       { state: 'done', icon: 'pen-line', title: 'Signed by the landlord', body: 'UAE Pass signature · Fatima Al Hashimi', when: 'Fri 6 Nov, 08:40' },
       { state: 'done', icon: 'stamp', title: 'Attested by notary public', body: 'e-notary ref. 2026/1/284417', when: 'Mon 9 Nov, 11:05' },
       { state: 'done', icon: 'truck', title: 'Dispatched by registered courier', when: 'Mon 9 Nov, 15:30' },
       { state: 'done', icon: 'mail-check', title: 'Delivered and signed for', body: 'Received by Hassan El-Sayed in person · photo of handover on file', when: 'Tue 10 Nov, 11:26' },
       { state: 'now', icon: 'hourglass', title: '30-day period running', body: 'Ends Wed 9 Dec 2026. Payment in full closes the matter.' },
     ])}
     <div class="card">${list([
       { lead: docIco('PDF'), title: 'Notarised notice (AR / EN)', sub: '2 pages', toast: 'Downloaded (demo)' },
       { lead: docIco('PDF'), title: 'Notification report', sub: 'Courier proof of delivery', toast: 'Downloaded (demo)' },
       { lead: docIco('IMG', 'img'), title: 'Returned cheque and bank memo', sub: 'Cheque 000317 · “insufficient funds”', toast: 'Downloaded (demo)' },
     ])}</div>`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Add to RDC file', { variant: 'primary', toast: 'Added to draft RDC file for Zahra TH 114 (demo)' })),
};

const slot = (time, cls, o) => `<div class="slot"><time>${time}</time><div class="slot-card ${cls}"><div class="between-top"><b class="strong">${o.title}</b>${o.badge || ''}</div><div class="small muted mt-1">${o.sub}</div><div class="between mt-2"><div class="inline small">${avatar(o.who, { size: 'xs', tone: o.tone })}<span>${o.who}</span></div>${o.act || ''}</div></div></div>`;

const fieldPage = {
  slug: 'field', nav: 'field', title: 'Field schedule', sub: 'Tue 24 Nov · 8 visits',
  body: () => `
${pageHead({ title: 'Field schedule', sub: 'Viewings, inspections and key handovers for your tenancies. Agents check in on arrival, so you always know a home was actually shown.', actions: btn('Book a visit', { icon: 'plus', variant: 'primary', size: 'sm', sheet: 'sheet-visit' }) })}
<div class="daystrip">${[['Mon', 23], ['Tue', 24, 1, 1], ['Wed', 25, 0, 1], ['Thu', 26, 0, 1], ['Fri', 27], ['Sat', 28, 0, 1], ['Sun', 29, 0, 1], ['Mon', 30, 0, 1], ['Tue', 1]].map(([d, n, a, h]) => `<button type="button" class="day${a ? ' is-active' : ''}${h ? ' has' : ''}">${d}<b>${n}</b></button>`).join('')}</div>
${stats([
  { label: 'Viewings today', icon: 'eye', value: '5', sub: '2 done · all at Bloom Towers' },
  { label: 'Inspections', icon: 'clipboard-check', value: '2', sub: '1 mid-term · 1 pre-check-out' },
  { label: 'Key handovers', icon: 'key-round', value: '1', sub: 'Burj Vista 3102' },
  { label: 'On-time this week', icon: 'target', value: '100', unit: '%', sub: '14 of 14 visits' },
])}

<div class="split">
<div class="stack">
  ${chips([['Everyone', 8], ['Jun Reyes', 5], ['Mariam Saleh', 2], ['Peter Kovac', 1]])}
  <div class="stack stack-md">
    ${slot('09:00', 'ok', { title: 'Hosted viewing · Bloom Towers B 915', sub: 'JVC studio · Wanjiru Kamau · checked in 08:56, 18 min', who: 'Jun Reyes', tone: 'c5', badge: badge('Done', 'ok') })}
    ${slot('10:30', 'ok', { title: 'Hosted viewing · Bloom Towers B 915', sub: 'Couple relocating from Abu Dhabi · “very interested, will offer”', who: 'Jun Reyes', tone: 'c5', badge: badge('Done', 'ok') })}
    ${slot('12:00', '', { title: 'Key collection · Burj Vista 3102', sub: 'Downtown · collect 2 keys + 1 access card from the concierge for Thursday’s shoot', who: 'Jun Reyes', tone: 'c5', badge: badge('Next', 'accent', { dot: true }), act: btn('Track', { size: 'sm', toast: 'Jun is 12 minutes away (demo)' }) })}
    ${slot('13:30', 'info', { title: 'Mid-term inspection · Park Heights 1 · 214', sub: 'Dubai Hills · tenant present · 24 h notice given Mon 11:00', who: 'Mariam Saleh', badge: badge('Confirmed', 'info') })}
    ${slot('14:30', '', { title: 'Hosted viewings × 2 · Bloom Towers B 915', sub: 'Back to back, 20 minutes each · both applicants pre-verified', who: 'Jun Reyes', tone: 'c5', badge: badge('Confirmed') })}
    ${slot('16:00', 'warn', { title: 'Pre-check-out walk-through · Al Ghozlan 3 · 412', sub: 'The Greens · optional visit so Olena knows what to fix before Monday', who: 'Mariam Saleh', badge: badge('Tenant to confirm', 'warn') })}
    ${slot('17:30', '', { title: 'Hosted viewing · Bloom Towers B 915', sub: 'After-work slot · Farid Rahimi', who: 'Jun Reyes', tone: 'c5', badge: badge('Confirmed') })}
    ${slot('18:30', 'muted-card', { title: 'Self-guided viewing · Marina Arcade 2210', sub: 'Owner hosting · reminder sent · no agent needed', who: 'Anastasia Volkova', badge: badge('Owner-led') })}
  </div>
</div>

<aside class="stack">
  <div class="mapbox"><img src="${B}assets/img/map.svg" alt="Map of today’s visits across Dubai"></div>
  ${card({ title: 'Coming up for your tenancies', flush: true, body: list([
    { icon: 'camera', tone: 'info', title: 'Thu 26 Nov · 09:30', sub: 'Photo shoot and floor plan · Burj Vista 3102 · photographer + Jun' },
    { icon: 'clipboard-check', tone: 'gold', title: 'Mon 30 Nov · 10:00', sub: 'Check-out inspection · Al Ghozlan 412 · Jun · Olena and Fatima invited', extra: `<div class="mt-2">${rule('DXB-021', 'Condition evidence')}</div>` },
    { icon: 'pen-line', tone: '', title: 'Tue 1 Dec · 17:30', sub: 'Cheque custody appointment · Mehta · 4 cheques' },
    { icon: 'key-round', tone: 'accent', title: 'Sat 5 Dec · 09:00', sub: 'Move-in report and keys · Executive Towers 1807 · only if Ejari is active', extra: `<div class="mt-2">${rule('DXB-001', 'Ejari first')}</div>` },
  ]) })}
  ${card({ title: 'Field team', flush: true, body: list([
    { lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: '5 visits · JVC → Downtown → JVC', endBadge: badge('On route', 'ok', { dot: true }) },
    { lead: avatar('Mariam Saleh'), title: 'Mariam Saleh', sub: '2 visits · Dubai Hills, The Greens', endBadge: badge('Free to 13:00') },
    { lead: avatar('Peter Kovac'), title: 'Peter Kovac', sub: 'Inventory specialist · 1 visit', endBadge: badge('Free') },
  ]) })}
  ${callout({ tone: 'neutral', icon: 'door-open', title: 'Entering an occupied home', body: 'Inspections need the tenant’s agreement and at least 24 hours’ notice, in daytime hours. Agents never use a spare key without written consent on the job.' })}
</aside>
</div>`,
  sheets: () => sheet('sheet-visit', 'Book a visit',
    `${field({ label: 'Type', type: 'select', options: ['Hosted viewing', 'Move-in report', 'Mid-term inspection', 'Check-out inspection', 'Key handover', 'Photo shoot'], value: 'Hosted viewing' })}
     ${field({ label: 'Property', type: 'select', options: ['Bloom Towers B · Studio 915', 'Burj Vista 1 · 3102', 'Al Ghozlan 3 · 412', 'Executive Towers K · 1807'], value: 'Bloom Towers B · Studio 915' })}
     <div class="form-grid c2">${field({ label: 'Date', type: 'date', value: '2026-11-25' })}${field({ label: 'Time', type: 'time', value: '18:00' })}</div>
     ${choice('ag', 'Jun Reyes', 'Already at Bloom Towers until 17:50', true, { badge: badge('Closest', 'brand') })}${choice('ag', 'Mariam Saleh', '25 minutes away', false)}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Book', { variant: 'primary', toast: 'Visit booked · applicant and landlord notified (demo)' })),
};

module.exports = [notices, fieldPage];
