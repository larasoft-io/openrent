const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, stats, tabs, panel, sheet, timeline, table, barChart, lineChart, donut, legend, field, choice, toggle, avatar, pageHead, sectionHead, bar, money, chips } = ui;
const { hbar, person, sdot } = require('./_h');

/* ---------- Fees & pricing ---------- */
const edit = (label = 'Edit') => btn(label, { size: 'sm', sheet: 'sheet-price' });
const fees = {
  slug: 'fees', nav: 'fees', title: 'Fees & pricing', sub: 'Dubai price book',
  body: ({ data }) => `
${pageHead({ eyebrow: 'Commercial', title: 'Fees and pricing', sub: 'Flat, published prices instead of a 5% commission. Every change here is previewed, dated and written to the audit log before it reaches a customer.', actions: btn('Price history', { icon: 'history', size: 'sm', href: 'audit.html' }) + btn('New product', { icon: 'plus', size: 'sm', variant: 'primary', toast: 'Product builder (demo)' }) })}

${stats([
  { label: 'Take rate', icon: 'percent', value: '2.7', unit: '%', sub: 'of rent processed' },
  { label: 'Revenue per tenancy', icon: 'receipt-text', value: '2,740', unit: 'AED / yr', delta: '4.2%' },
  { label: 'Saving vs an agent', icon: 'piggy-bank', value: '72', unit: '%', sub: 'on a typical let' },
  { label: 'Tenant commission', icon: 'hand-coins', value: '0', unit: 'AED', sub: 'always' },
])}

<div class="split">
<div class="stack">
  ${card({ title: 'Landlord products', flush: true, body: table({ cols: [{ label: 'Product' }, { label: 'Price', r: true }, { label: 'VAT' }, { label: 'Sold in Nov', r: true }, { label: '', r: true }], rows: [
    ...data.fees.landlord.map((f, i) => [`<b>${f.key}</b><div class="small muted">${f.what}</div>`, `<b class="num">${typeof f.price === 'number' ? money(f.price) : f.price}</b><div class="small muted">${f.unit}</div>`, '5% added', ['268 listings', '231 tenancies', '2,950 tenancies', '610 tenancies'][i], edit()]),
  ] }) })}

  ${card({ title: 'Tenant and contractor fees', flush: true, body: table({ cols: [{ label: 'Fee' }, { label: 'Price', r: true }, { label: 'VAT' }, { label: 'Volume in Nov', r: true }, { label: '', r: true }], rows: [
    [`<b>Move.me</b> ${badge('Tenant', 'accent')}<div class="small muted">${data.fees.tenant[0].what}</div>`, `<b class="num">${money(249)}</b><div class="small muted">once per tenancy</div>`, '5% added', '231 tenancies', edit()],
    [`<b>Card payment fee</b> ${badge('Tenant', 'accent')}<div class="small muted">Only when a tenant chooses card over direct debit</div>`, '<b class="num">1.9%</b><div class="small muted">passed through at cost</div>', 'Included', 'AED 1.24M paid by card', edit()],
    [`<b>Platform fee</b> ${badge('Contractor', 'gold')}<div class="small muted">Taken from completed, signed-off jobs</div>`, '<b class="num">10%</b><div class="small muted">of job value</div>', '5% added', '3,480 jobs · AED 1.18M', edit()],
    [`<b>Instant payout</b> ${badge('Contractor', 'gold')}<div class="small muted">Same-day instead of two working days</div>`, '<b class="num">1%</b><div class="small muted">optional</div>', '5% added', '412 payouts', edit()],
  ] }) })}

  ${card({ title: 'Add-ons', flush: true, body: table({ cols: [{ label: 'Add-on' }, { label: 'Price', r: true }, { label: 'Sold in Nov', r: true }, { label: '', r: true }], rows: data.fees.addons.map(([n, p], i) => [`<b>${n}</b>`, `<b class="num">${typeof p === 'number' ? money(p) : p}</b>`, ['58', '332', '104', '87', '14', '7', '86 policies'][i], edit()]) }) })}

  ${card({ title: 'Government fees — passed on at cost', headEnd: badge('No mark-up allowed', 'brand', { icon: 'lock' }), flush: true, body: list([
    { icon: 'file-badge', tone: 'brand', title: 'Ejari registration or renewal', sub: 'Dubai Land Department · charged to whoever the contract names', end: 'AED 177.75' },
    { icon: 'stamp', tone: 'brand', title: 'Notary fees for legal notices', sub: 'Added to the notice service at the notary’s own rate', end: 'At cost' },
    { icon: 'gavel', tone: 'brand', title: 'Rental Disputes Center filing', sub: '3.5% of annual rent · min AED 500 · max AED 20,000 · paid by the claimant', end: 'At cost', extra: `<div class="mt-2">${rule('DXB-RDC', 'Disputes')}</div>` },
  ]) })}

  ${card({ title: 'Promo codes', headEnd: btn('New code', { size: 'sm', icon: 'plus', toast: 'Promo code builder (demo)' }), flush: true, body: table({ cols: [{ label: 'Code' }, { label: 'Offer' }, { label: 'Used', r: true }, { label: 'Ends' }, { label: 'Status', r: true }], rows: [
    ['<span class="code">WELCOME25</span>', '25% off first List.me', '412', '31 Dec 2026', badge('Active', 'ok', { dot: true })],
    ['<span class="code">RENEW2027</span>', 'Free renewal pack for Manage.me landlords', '38', '31 Mar 2027', badge('Active', 'ok', { dot: true })],
    ['<span class="code">PORTFOLIO5</span>', '15% off Let.me from the 5th property', '96', 'No end date', badge('Active', 'ok', { dot: true })],
    ['<span class="code">SUMMER-LIST</span>', 'Free professional photos', '204', '31 Aug 2026', badge('Expired')],
  ] }) })}
</div>

<aside class="stack">
  ${card({ title: 'Us against a 5% agent', body: `<p class="small muted mb-3">A one-bedroom let at AED 105,000 a year.</p>
    ${hbar('Traditional agent · tenant pays 5% + VAT', 'AED 5,512.50', 100, 'danger')}
    ${hbar('openrent.me · landlord: List.me + Let.me', 'AED 1,198', 22, '')}
    ${hbar('openrent.me · tenant: Move.me', 'AED 249', 5, 'accent')}
    <div class="mt-4">${kv([['Total with openrent.me', 'AED 1,447 + VAT'], ['Total with an agent', 'AED 5,250 + VAT'], ['Saved', '<span class="t-ok">AED 3,803 (72%)</span>']], 'total')}</div>` })}

  ${guard({ title: 'Pricing guardrails', sub: 'Applied before a price can be saved', checks: [
    { state: 'ok', title: 'Tenants never pay a percentage of rent', sub: 'A tenant-side product can only be a flat amount.', rule: rule('OR-105', 'No commission') },
    { state: 'ok', title: 'Government fees carry no mark-up', sub: 'Stored as pass-through lines; the price field is locked.' },
    { state: 'ok', title: 'Changing instalments never changes rent', sub: 'No surcharge products may be attached to payment plans.', rule: rule('DXB-PAY', 'Payment terms') },
    { state: 'info', title: 'Existing quotes are honoured for 30 days', sub: 'Drafts and unpaid invoices keep the old price.' },
  ] })}

  ${card({ title: 'What if: Let.me price', body: `<div class="field"><label for="lp">Price per tenancy</label><div class="between"><span class="hero-num" style="font-size:30px">AED <span data-out="lp">899</span></span>${badge('Current', 'brand')}</div><input class="range" type="range" id="lp" min="699" max="1199" step="50" value="899"><div class="between micro muted"><span>699</span><span>1,199</span></div></div>
    <div class="mt-3">${kv([['Monthly volume (model)', '231 tenancies'], ['Elasticity assumed', '−0.4'], ['Each AED 50 changes revenue by', '≈ AED 9,200 / month']])}</div>
    <p class="small muted mt-3">A planning model, not a forecast. Use “Edit” on a product to preview a real change.</p>` })}

  ${card({ title: 'Price books', flush: true, body: list([
    { lead: sdot(), title: 'Dubai', sub: '21 prices · AED · VAT 5%', endBadge: badge('Live', 'ok') },
    { lead: sdot('warn'), title: 'Abu Dhabi', sub: 'Copy of Dubai with 4 overrides · not published', endBadge: badge('Draft', 'violet') },
    { icon: 'plus', title: 'Add an emirate', sub: 'Needs a ruleset for that jurisdiction first', toast: 'Create the jurisdiction’s ruleset first (demo)', chev: true },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-price', 'Preview a price change',
    `${field({ label: 'Product', type: 'select', options: ['Let.me — per tenancy', 'List.me — per listing', 'Collect.me — % of rent', 'Manage.me — % of annual rent', 'Move.me — tenant fee'], value: 'Let.me — per tenancy' })}
     <div class="form-grid c2">${field({ label: 'Current price', value: '899', prefix: 'AED', readonly: true })}${field({ label: 'New price', value: '949', prefix: 'AED', inputmode: 'numeric' })}</div>
     <div class="form-grid c2">${field({ label: 'Effective from', type: 'date', value: '2027-01-01' })}${field({ label: 'Existing quotes', type: 'select', options: ['Honour for 30 days', 'Honour for 60 days', 'Reprice immediately'], value: 'Honour for 30 days' })}</div>
     ${kv([['Estimated revenue change', '+ AED 9,200 / month'], ['Customers with open drafts', '84 landlords · keep AED 899'], ['Still cheaper than an agent by', 'AED 3,753 on a AED 105k let']])}
     ${callout({ tone: 'neutral', body: 'Saving creates a scheduled change that a second admin must approve. Customers see the new price on the pricing page from the effective date.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send for approval', { variant: 'primary', toast: 'Price change sent to a second admin for approval (demo)' })),
};

/* ---------- Revenue ---------- */
const heat = v => { const t = Math.max(0, Math.min(1, (v - 50) / 50)); return `<span class="heat" style="background:rgba(91,75,183,${(0.1 + t * 0.5).toFixed(2)});color:var(--ink)">${v}%</span>`; };
const revenue = {
  slug: 'revenue', nav: 'revenue', title: 'Revenue', sub: 'November to date',
  body: () => `
${pageHead({ eyebrow: 'Commercial', title: 'Revenue', sub: 'Where the money comes from, and how much of it repeats.', actions: btn('Nov 2026', { icon: 'calendar-clock', size: 'sm', toast: 'Period picker (demo)' }) + btn('Export', { icon: 'download', size: 'sm', toast: 'Revenue report exported (demo)' }) })}

${stats([
  { label: 'Revenue · Nov to date', icon: 'trending-up', value: '1.11M', unit: 'AED', delta: '8.9%', sub: 'vs Oct' },
  { label: 'Recurring share', icon: 'refresh-cw', value: '45', unit: '%', delta: '2 pts', sub: 'Collect + Manage' },
  { label: 'Run-rate', icon: 'gauge', value: '14.6M', unit: 'AED / yr' },
  { label: 'Per landlord', icon: 'users', value: '578', unit: 'AED / mo', delta: '3.4%' },
])}

<div class="split">
<div class="stack">
  ${card({ title: 'Monthly revenue', headEnd: legend([['Recurring', 'violet'], ['Transactional', 'gold']]), body: barChart({ labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], stacked: true, height: 190, series: [{ tone: 'violet', data: [232, 254, 281, 302, 318, 344, 372, 401, 432, 458, 482, 504] }, { tone: 'gold', data: [380, 401, 420, 440, 450, 467, 484, 501, 526, 546, 579, 606] }], label: 'Revenue per month in AED thousands' }) + `<p class="small muted">AED thousands. Recurring revenue has more than doubled in twelve months as landlords add rent collection after their first let.</p>` })}

  ${card({ title: 'By product · November', body: `
    ${hbar('Collect.me · 2,950 tenancies', 'AED 283k', 100, '')}${hbar('Manage.me · 610 tenancies', 'AED 221k', 78, '')}${hbar('Let.me · 231 new tenancies', 'AED 208k', 73, 'accent')}${hbar('Add-ons', 'AED 142k', 50, 'accent')}${hbar('Contractor platform fees', 'AED 118k', 42, 'warn')}${hbar('List.me · 268 listings', 'AED 80k', 28, 'accent')}${hbar('Move.me · 231 tenants', 'AED 58k', 20, 'accent')}` })}

  ${card({ title: 'By community', flush: true, body: table({ cols: [{ label: 'Community' }, { label: 'Tenancies', r: true }, { label: 'Rent processed', r: true }, { label: 'Revenue', r: true }, { label: 'Take rate', r: true }], rows: [
    ['<b>Dubai Marina</b>', '612', 'AED 6.1M', 'AED 158k', '2.6%'], ['<b>Jumeirah Village Circle</b>', '588', 'AED 3.4M', 'AED 121k', '3.6%'], ['<b>Business Bay</b>', '471', 'AED 4.3M', 'AED 119k', '2.8%'],
    ['<b>Downtown Dubai</b>', '402', 'AED 5.2M', 'AED 127k', '2.4%'], ['<b>Dubai Hills Estate</b>', '366', 'AED 4.9M', 'AED 116k', '2.4%'], ['<b>Jumeirah Lake Towers</b>', '341', 'AED 2.9M', 'AED 84k', '2.9%'],
    ['<b>Arabian Ranches</b>', '214', 'AED 4.6M', 'AED 96k', '2.1%'], ['<b>48 other communities</b>', '1,866', 'AED 9.8M', 'AED 289k', '2.9%'],
  ] }) })}

  ${card({ title: 'Landlord retention by joining quarter', headEnd: `<span class="small muted">% with an active tenancy</span>`, flush: true, body: table({ stack: false, cols: [{ label: 'Joined' }, { label: 'Landlords', r: true }, { label: '3 mo', r: true }, { label: '6 mo', r: true }, { label: '12 mo', r: true }, { label: '18 mo', r: true }], rows: [
    ['<b>Q1 2025</b>', '142', heat(96), heat(91), heat(86), heat(82)], ['<b>Q2 2025</b>', '188', heat(95), heat(92), heat(88), heat(84)], ['<b>Q3 2025</b>', '231', heat(97), heat(93), heat(89), '—'],
    ['<b>Q4 2025</b>', '264', heat(96), heat(94), heat(90), '—'], ['<b>Q1 2026</b>', '302', heat(98), heat(95), '—', '—'], ['<b>Q2 2026</b>', '347', heat(97), heat(94), '—', '—'], ['<b>Q3 2026</b>', '389', heat(98), '—', '—', '—'],
  ] }) })}
</div>

<aside class="stack">
  ${card({ title: 'Revenue mix', body: donut({ center: '45%', sub: 'recurring', segments: [{ label: 'Recurring (Collect, Manage)', value: 504, tone: 'violet', show: '504k' }, { label: 'Per let (List, Let, Move)', value: 346, tone: 'accent', show: '346k' }, { label: 'Add-ons', value: 142, tone: 'gold', show: '142k' }, { label: 'Contractor fees', value: 118, tone: 'info', show: '118k' }] }) })}
  ${card({ title: 'Top add-ons · November', flush: true, body: list([
    { icon: 'calendar-days', title: 'Hosted viewings', sub: '332 sold · 61% of listings buy at least one', end: 'AED 32.9k' },
    { icon: 'camera', title: 'Inventory & condition reports', sub: '104 sold', end: 'AED 41.5k' },
    { icon: 'refresh-cw', title: 'Renewal packs', sub: '87 sold', end: 'AED 30.4k' },
    { icon: 'badge-check', title: 'Photos & floor plans', sub: '58 sold', end: 'AED 26.0k' },
    { icon: 'stamp', title: 'Notarised notices', sub: '14 sold', end: 'AED 6.3k' },
  ]) + `<div class="card-body" style="padding-top:8px"><p class="small muted">Rent guarantee premiums are collected for the partner insurer and shown net of what we pass on.</p></div>` })}
  ${card({ title: 'Unit economics', body: kv([['Cost to acquire a landlord', 'AED 310'], ['Payback', '2.1 months'], ['Gross margin', '71%'], ['Properties per landlord', '2.5'], ['Landlords using 2+ products', '64%']]) })}
  ${callout({ tone: 'brand', icon: 'handshake', title: 'Revenue we choose not to earn', body: 'No tenant commission, no mark-up on government fees, no surcharge for paying monthly. These are locked by pricing guardrails.', rules: [rule('OR-105', 'No commission')] })}
</aside>
</div>`,
};

/* ---------- Client money ---------- */
const acct = (ic, tone, name, num, bal, sub, ok = true) => `<div class="card pad stack stack-sm"><div class="between"><span class="row-ico ${tone}">${icon(ic, 20)}</span>${ok ? badge('Matched to ledger', 'ok', { icon: 'check' }) : badge('Company funds', 'outline')}</div><div><b class="strong">${name}</b><div class="small muted">${num}</div></div><div class="hero-num" style="font-size:26px">${bal}</div><div class="small muted">${sub}</div></div>`;

const finance = {
  slug: 'finance', nav: 'finance', title: 'Client money', sub: 'Safeguarding & payouts',
  body: () => `
${pageHead({ eyebrow: 'Finance', title: 'Client money', sub: 'Rent and deposits belong to landlords and tenants, not to us. They sit in segregated client accounts and are reconciled to the ledger every morning.', actions: btn('Run reconciliation', { icon: 'refresh-cw', size: 'sm', toast: 'Reconciliation started — usually takes 4 minutes (demo)' }) + btn('Export ledger', { icon: 'download', size: 'sm', toast: 'Ledger exported (demo)' }) })}

${stats([
  { label: 'Deposits held', icon: 'lock-keyhole', value: '31.6M', unit: 'AED', sub: '4,120 deposits' },
  { label: 'Rent in transit', icon: 'banknote', value: '3.84M', unit: 'AED', sub: 'collected, not yet paid out' },
  { label: 'Payouts tomorrow', icon: 'send', value: '6.1M', unit: 'AED', sub: '212 landlords' },
  { label: 'Failed direct debits', icon: 'circle-alert', value: '37', sub: '1.1% of collections', delta: '0.2 pts', deltaDir: 'down' },
])}

${tabs('fin', [{ id: 'safe', label: 'Safeguarding' }, { id: 'payouts', label: 'Payouts', n: 212 }, { id: 'recon', label: 'Reconciliation', n: 3 }, { id: 'exc', label: 'Exceptions', n: 57 }, { id: 'vat', label: 'VAT' }], 'safe')}

${panel('fin', 'safe', `
  <div class="split">
  <div class="stack">
    <div class="grid sm3">
      ${acct('lock-keyhole', 'brand', 'Client account — deposits', 'Emirates NBD ••7001', 'AED 31,604,250', '4,120 deposits · average AED 7,671')}
      ${acct('banknote', 'info', 'Client account — rent', 'Emirates NBD ••7002', 'AED 3,842,900', 'Paid out T+2 after collection')}
      ${acct('building', '', 'Operating account', 'Emirates NBD ••1140', 'AED 2,214,600', 'Fees and VAT only', false)}
    </div>
    ${card({ title: 'Deposit ledger · today', flush: true, body: list([
      { icon: 'arrow-down-right', tone: 'ok', title: 'Deposit received — Executive Towers K 1807', sub: 'Arjun & Neha Mehta · DEP-2611-0498 · contract awaiting landlord signature', end: '+ AED 6,750', endSub: '09:12' },
      { icon: 'arrow-up-right', tone: 'info', title: 'Deposit released in full — JLT Cluster D 2204', sub: 'Both parties agreed · day 6 after check-out', end: '− AED 4,100', endSub: '08:40' },
      { icon: 'git-compare-arrows', tone: 'warn', title: 'Partial release with deduction — Springs 4, Villa 18', sub: 'AED 1,150 to landlord (evidenced: garden damage) · AED 8,350 to tenant · manager decision', end: '− AED 9,500', endSub: '08:22' },
      { icon: 'hourglass', tone: 'gold', title: 'Held pending check-out — Al Ghozlan 3, Apt 412', sub: 'Olena Kovalenko · inspection Mon 30 Nov · 14-day clock starts then', end: 'AED 4,400', endSub: 'held' },
    ]) })}
    ${card({ title: 'Deposits held — last 12 months', body: lineChart({ labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'brand', data: [20.8, 21.9, 23.0, 24.2, 25.1, 26.0, 27.2, 28.1, 29.3, 30.1, 30.9, 31.6] }], min: 18, height: 150, label: 'Deposits held in AED millions' }) + '<p class="small muted">AED millions. Interest earned on client money is disclosed in the terms and reported quarterly.</p>' })}
  </div>
  <aside class="stack">
    ${guard({ title: 'Safeguarding controls', checks: [
      { state: 'ok', title: 'Client money is never mixed with company money', sub: 'Separate accounts; fees are swept only after an invoice exists.' },
      { state: 'ok', title: 'Deposits capped and returned on a timer', sub: '96.4% released within 14 days this quarter.', rule: rule('OR-101', 'Deposits') },
      { state: 'ok', title: 'No rent released before Ejari', sub: 'First payout waits for the certificate number.', rule: rule('DXB-001', 'Ejari') },
      { state: 'ok', title: 'Two people for every manual payment', sub: 'Maker–checker; neither can be the account’s manager.' },
      { state: 'info', title: 'Deductions need evidence', sub: 'A photo from the check-out report must be attached.', rule: rule('DXB-021', 'Art. 21') },
    ] })}
    ${card({ title: 'Cover check', body: kv([['Owed to tenants (deposits)', 'AED 31,604,250'], ['Owed to landlords (rent)', 'AED 3,842,900'], ['Total client liabilities', 'AED 35,447,150'], ['Cash in client accounts', 'AED 35,447,150'], ['Shortfall', '<span class="t-ok">AED 0</span>']], 'total') })}
  </aside></div>`, true)}

${panel('fin', 'payouts', `
  <div class="between"><div class="chips wrap" data-chips>${['All', 'Landlords', 'Contractors', 'Held'].map((c, i) => `<button type="button" class="chip${i ? '' : ' is-active'}">${c}</button>`).join('')}</div></div>
  <div class="card">${table({ cols: [{ label: 'Payee' }, { label: 'For' }, { label: 'Gross', r: true }, { label: 'Our fee', r: true }, { label: 'Net', r: true }, { label: 'Due' }, { label: 'Status', r: true }], rows: [
    [person('Fatima Al Hashimi', 'ENBD ••3382'), 'Dec rent · Marina Gate 2304', '8,750.00', '87.50', '<b class="num">8,662.50</b>', 'Thu 3 Dec', badge('Scheduled', 'info')],
    [person('Al Noor Holdings LLC', 'ADCB ••9017', { tone: 'c7' }), 'Q4 rent · 9 units', '412,500.00', '1,350.00', '<b class="num">411,150.00</b>', 'Wed 25 Nov', badge('Approved', 'ok')],
    [person('Sunita Kapoor', 'Mashreq ••4410 · via PoA Daniel Okafor'), 'Nov rent · 5 units', '61,400.00', '2,149.00', '<b class="num">59,251.00</b>', 'Wed 25 Nov', badge('Approved', 'ok')],
    [person('Falcon Technical Services', 'RAKBANK ••2208 · contractor', { tone: 'c3' }), '9 jobs · 16–22 Nov', '4,310.00', '431.00', '<b class="num">3,879.00</b>', 'Wed 25 Nov', badge('Approved', 'ok')],
    [person('Viktor Petrov', 'Account being verified', { tone: 'c5' }), 'Nov rent · Bay Square 6', '11,250.00', '112.50', '<b class="num">11,137.50</b>', '—', badge('Held · KYC', 'warn')],
    [person('Omar Darwish', 'ENBD ••6150'), 'Deposit deduction · Springs 4', '1,150.00', '0.00', '<b class="num">1,150.00</b>', 'Wed 25 Nov', badge('Approved', 'ok')],
  ] })}</div>
  <div class="sticky-cta">${btn('Hold selected', { toast: 'Select payouts first (demo)' })}${btn('Release 211 payouts · AED 6.1M', { variant: 'primary', sheet: 'sheet-release' })}</div>`)}

${panel('fin', 'recon', `
  <div class="split">
  <div class="stack">
    <div class="card pad stack stack-md"><div class="between"><div><b class="strong">Daily reconciliation · Tue 24 Nov, 06:00</b><div class="small muted">Bank statements against the client ledger</div></div>${badge('3 to resolve', 'warn')}</div>${bar(99.98, 'ok')}<div class="grid g2 sm4 small">${[['12,421', 'bank lines'], ['12,418', 'matched automatically'], ['3', 'unmatched'], ['AED 26,250', 'unmatched value']].map(([a, b]) => `<div><b class="display" style="font-size:20px">${a}</b><div class="muted">${b}</div></div>`).join('')}</div></div>
    ${card({ title: 'Unmatched items', flush: true, body: list([
      { icon: 'circle-help', tone: 'warn', title: 'Incoming transfer AED 17,500 — no reference', sub: 'ENBD ••7002 · 23 Nov · likely two months’ rent for Bloom Heights 1104 (name match 92%)', endBadge: badge('Suggest match', 'info'), toast: 'Match suggested to Finance Officer (demo)' },
      { icon: 'circle-help', tone: 'warn', title: 'Cheque deposit AED 8,000 — amount differs from schedule', sub: 'Expected AED 8,250 · Silicon Gates 2, Apt 307 · tenant short-paid by AED 250', endBadge: badge('Contact tenant', 'warn'), toast: 'Task sent to the tenancy manager (demo)' },
      { icon: 'circle-help', tone: 'warn', title: 'Outgoing AED 750 — duplicate contractor payout?', sub: 'Two identical payments to KeyMaster Locksmiths on 22 Nov', endBadge: badge('Investigate', 'danger'), toast: 'Assigned to Priya Nair, Finance (demo)' },
    ]) })}
  </div>
  <aside class="stack">${card({ title: 'Last 7 runs', body: barChart({ labels: ['W', 'T', 'F', 'S', 'S', 'M', 'T'], series: [{ tone: 'ok', data: [2, 0, 1, 0, 0, 4, 3] }], height: 120, label: 'Unmatched items per day' }) + '<p class="small muted">Unmatched items per day. Anything open for more than 3 working days is escalated to you.</p>' })}${callout({ tone: 'neutral', title: 'Month-end', body: 'October closed on 3 Nov with zero unreconciled items. External client-money audit is booked for January.' })}</aside></div>`)}

${panel('fin', 'exc', `
  <div class="grid lg2">
    ${card({ title: 'Failed direct debits · 37', flush: true, body: `<div class="card-body">${hbar('Insufficient funds', '29', 100, 'warn')}${hbar('Mandate cancelled by payer', '5', 17, 'danger')}${hbar('Bank technical error', '3', 10, '')}</div>` + list([
      { icon: 'refresh-cw', tone: 'info', title: '31 will retry automatically in 3 days', sub: 'Tenants told the same day; nothing is marked late until the retry fails' },
      { icon: 'user-x', tone: 'danger', title: '6 need a new mandate', sub: 'Tenancy managers are contacting the tenants', toast: 'Opened in manager queue (demo)', chev: true },
    ]) })}
    ${card({ title: 'Returned cheques · 6', flush: true, body: list([
      { icon: 'circle-x', tone: 'danger', title: 'AED 36,250 — Zahra Townhouse 114, Town Square', sub: 'Hassan El-Sayed · cheque 3 of 4 · 30-day notarised notice served 9 Nov', endBadge: badge('Notice running', 'danger'), extra: `<div class="mt-2">${rule('DXB-025A', '30-day notice')}</div>` },
      { icon: 'circle-x', tone: 'warn', title: 'AED 18,000 — Sulafa Tower 1902, Dubai Marina', sub: 'Replaced by bank transfer on day 4', endBadge: badge('Resolved', 'ok') },
      { icon: 'circle-x', tone: 'warn', title: '4 others', sub: 'AED 61,750 in total · all within the reminder stage', toast: 'Full list (demo)', chev: true },
    ]) })}
    ${card({ title: 'Refunds pending · 14', flush: true, body: list([
      { icon: 'undo-2', title: 'AED 38,420 across 14 refunds', sub: 'Cancelled add-ons, duplicate card payments, unused prepaid rent after early exit' },
      { icon: 'clock', tone: 'warn', title: '2 older than 5 working days', sub: 'Waiting for tenants to confirm bank details', toast: 'Reminder sent (demo)', chev: true },
    ]) })}
    ${card({ title: 'Card disputes · 2', flush: true, body: list([
      { icon: 'credit-card', tone: 'warn', title: 'Chargeback AED 8,925 — rent paid by card', sub: 'Evidence due to the processor by 27 Nov · contract and receipt attached', endBadge: badge('Responding', 'info') },
      { icon: 'credit-card', title: 'Chargeback AED 261.45 — Move.me fee', sub: 'Won on 20 Nov', endBadge: badge('Won', 'ok') },
    ]) })}
  </div>`)}

${panel('fin', 'vat', `
  <div class="split">
  <div class="stack">
    ${card({ title: 'VAT · quarter to date (Oct – Dec 2026)', body: kv([['Platform fees invoiced (net)', 'AED 2,171,000'], ['Output VAT at 5%', 'AED 108,550'], ['Input VAT recoverable', '− AED 31,240'], ['Net VAT payable so far', 'AED 77,310']], 'total') + '<p class="small muted mt-3">VAT applies to our fees. Rent and deposits pass through client accounts and are not our supply. Return for the quarter is due 28 Jan 2027.</p>' })}
    ${card({ title: 'Tax invoices', flush: true, body: list([
      { icon: 'file-text', title: '18,942 tax invoices issued this quarter', sub: 'Sequential numbering · EN and AR · TRN shown on every invoice', toast: 'Invoice register exported (demo)', chev: true },
      { icon: 'file-text', title: '212 credit notes', sub: 'Refunds and promo corrections', toast: 'Credit note register exported (demo)', chev: true },
    ]) })}
  </div>
  <aside class="stack">${callout({ tone: 'neutral', icon: 'calculator', title: 'Mock figures', body: 'Tax treatment shown is illustrative for the demo. The real position would be confirmed with a UAE tax adviser.' })}</aside></div>`)}
`,
  sheets: () => sheet('sheet-release', 'Release payouts',
    `${kv([['Payouts', '211 of 212'], ['Total', 'AED 6,098,862.50'], ['Held back', '1 · KYC not complete'], ['From', 'Client account — rent ••7002'], ['Value date', 'Wed 25 Nov 2026']])}
     ${callout({ tone: 'brand', icon: 'users', title: 'Second approver needed', body: 'You prepared this batch. Priya Nair (Finance Officer) will be asked to approve it before the bank file is sent.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send for approval', { variant: 'primary', toast: 'Batch sent to Priya Nair for approval (demo)' })),
};

module.exports = [fees, revenue, finance];
