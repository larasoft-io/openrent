const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sectionHead, sheet, field, choice, toggle, tabs, panel, stats, bar, table, lineChart, barChart, donut, legend, chips, docIco } = ui;

const sev = { high: ['High', 'danger'], med: ['Medium', 'warn'], low: ['Low', 'info'] };
const alert = (s, ic, title, sub, o = {}) => ({ href: o.href, toast: o.href ? null : (o.toast || 'Alert opened (demo)'), icon: ic, tone: sev[s][1], title, badge: badge(sev[s][0], sev[s][1], { dot: true }), sub, endSub: o.when, chev: true });

const home = {
  slug: 'index', nav: 'home', title: 'Risk overview', sub: 'Tue 24 Nov 2026',
  body: () => `
${pageHead({ eyebrow: 'Money-laundering reporting officer · finance control', title: 'Risk overview', sub: 'Know your customer, client money and regulator deadlines on one page. Anything red blocks the action it relates to until you clear it.', actions: btn('Daily report', { icon: 'download', size: 'sm', toast: 'Daily control report downloaded (demo)' }) })}

${stats([
  { label: 'KYC to review', icon: 'user-search', value: '7', sub: '2 high risk', delta: '3 since Fri', deltaDir: 'down' },
  { label: 'Alerts open', icon: 'siren', value: '4', sub: 'oldest 19 h' },
  { label: 'Client money', icon: 'landmark', value: '1.70', unit: 'M AED', sub: `<span class="t-ok strong inline">${icon('check', 13)} reconciled 06:00</span>` },
  { label: 'Licences expiring', icon: 'id-card', value: '2', sub: 'within 60 days' },
])}

<div class="split">
<div class="stack">
  ${sectionHead('Open alerts', 'KYC queue', 'kyc.html')}
  <div class="card">${list([
    alert('high', 'coins', 'Cash rent payment of AED 60,000 declared', 'Tenant logged a cash payment made directly to a landlord · above our AED 55,000 cash threshold', { href: 'kyc.html', when: '19 h' }),
    alert('high', 'network', 'Complex ownership behind a new landlord', 'Chen Wei · two units held via a Singapore company · representative acting under PoA', { href: 'kyc.html', when: '3 d' }),
    alert('med', 'scan-search', 'Possible name match on screening', 'New tenant applicant · 72% match to a watch-list entry · date of birth differs', { href: 'kyc.html', when: '5 h' }),
    alert('med', 'git-compare-arrows', 'Unallocated receipt of AED 12,250', 'Bank transfer with no tenancy reference · likely Zahra Townhouse 114', { href: 'money.html', when: '1 d' }),
  ])}</div>

  <div class="grid lg2">
    ${card({ title: 'KYC turnaround', headEnd: badge('Target: 1 working day', 'outline'), body: lineChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'brand', data: [19, 17, 22, 14, 11, 9] }, { tone: 'sand', data: [24, 24, 24, 24, 24, 24], dash: true, area: false }], min: 0, height: 150, label: 'Median hours to clear a KYC review' }) + `<p class="small muted mt-2">Median hours to clear a review. November so far: <b class="strong">9 h</b>.</p>` })}
    ${card({ title: 'Customers by risk rating', body: donut({ center: '2,418', sub: 'verified', segments: [{ label: 'Standard', value: 2190, tone: 'brand', show: '2,190' }, { label: 'Medium', value: 187, tone: 'gold', show: '187' }, { label: 'High · enhanced checks', value: 41, tone: 'danger', show: '41' }], label: 'Verified customers by risk rating' }) })}
  </div>

  ${card({ title: 'Platform controls — last 24 hours', flush: true, body: list([
    { icon: 'file-badge', tone: 'ok', title: 'Every active tenancy has an Ejari number', sub: '1,206 of 1,206', endBadge: badge('Pass', 'ok'), extra: `<div class="mt-2">${rule('DXB-001', 'Ejari')}</div>` },
    { icon: 'megaphone', tone: 'ok', title: 'No advert live without a valid permit', sub: '142 live listings · 3 permits expire this week and will pause automatically', endBadge: badge('Pass', 'ok'), extra: `<div class="mt-2">${rule('DXB-002', 'Permits')}</div>` },
    { icon: 'stamp', tone: 'warn', title: 'Landlords matched to title deed or valid PoA', sub: '2 mandates awaiting verification — their units are read-only', endBadge: badge('2 pending', 'warn'), extra: `<div class="mt-2">${rule('DXB-003', 'Owner or PoA')}</div>` },
    { icon: 'lock-keyhole', tone: 'ok', title: 'Deposits released inside 14 days', sub: '31 released this month · slowest 11 days', endBadge: badge('Pass', 'ok'), extra: `<div class="mt-2">${rule('OR-101', 'Deposits')}</div>` },
    { icon: 'bed-double', tone: 'warn', title: 'Shared-housing checks', sub: '0 room-by-room listings · 2 reports of suspected subletting under review', endBadge: badge('2 open', 'warn'), extra: `<div class="mt-2">${rule('DXB-S04', 'Law 4/2026')}</div>` },
  ]) })}
</div>

<aside class="stack">
  ${card({ title: 'Deadlines', link: ['All reports', 'reports.html'], flush: true, body: list([
    { href: 'reports.html', icon: 'id-card', tone: 'warn', title: '3 broker cards expire', sub: 'RERA BRN renewals · first on 18 Dec 2026', endBadge: badge('24 days', 'warn') },
    { href: 'reports.html', icon: 'landmark', tone: 'warn', title: 'Brokerage licence & ORN renewal', sub: 'DET licence 1184220 · ORN 31877', endBadge: badge('31 Jan', 'warn') },
    { href: 'reports.html', icon: 'receipt-text', title: 'VAT return — Q4', sub: 'Platform fees only; residential rent is outside scope here', endBadge: badge('28 Jan') },
    { href: 'reports.html', icon: 'graduation-cap', title: 'AML refresher training', sub: '52 of 54 staff complete', endBadge: badge('96%', 'ok') },
  ]) })}
  ${guard({ title: 'What compliance can stop', sub: 'Holds apply instantly across every dashboard', checks: [
    { state: 'block', title: 'Listing, signing or payout for an unverified party', rule: rule('DXB-003', 'Owner or PoA') },
    { state: 'block', title: 'Release of client money without two approvals', sub: 'Maker and checker must be different people.' },
    { state: 'info', title: 'What you cannot see', sub: 'Tenant messages and repair photos are outside your access unless attached to a case.' },
  ] })}
  ${card({ title: 'Today', body: timeline([
    { state: 'done', icon: 'check', title: 'Client account reconciled', body: 'Ledger and bank agree to the fils.', when: '06:00' },
    { state: 'done', icon: 'scan-search', title: 'Overnight re-screening', body: '2,418 customers · 1 new possible match', when: '06:20' },
    { state: 'now', icon: 'user-search', title: 'KYC queue', body: '7 to review · 2 high risk', when: 'Now' },
    { icon: 'users', title: 'Risk committee', body: 'Cash-payment case on the agenda', when: '15:00' },
  ]) })}
</aside>
</div>`,
};

const kcase = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico ${sev[o.sev][1]}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · opened ${o.when}</div></div></div>${badge(sev[o.sev][0] + ' risk', sev[o.sev][1], { dot: true })}</div>
  <p class="small">${o.body}</p>
  ${o.kv ? kv(o.kv) : ''}
  ${o.extra || ''}
  <div class="between small"><span class="inline muted">${o.hold ? icon('lock', 14) + o.hold : icon('circle-check', 14) + 'Nothing on hold'}</span></div>
  <div class="btn-row">${btn('Evidence', { icon: 'folder-open', toast: 'Case file opened (demo)' })}${btn('Decide', { variant: 'primary', icon: 'gavel', sheet: 'sheet-decide' })}</div>
</div>`;

const kyc = {
  slug: 'kyc', nav: 'kyc', title: 'KYC & AML', sub: '7 to review',
  body: () => `
${pageHead({ title: 'KYC & AML reviews', sub: 'Most customers clear automatically through UAE Pass. These are the ones a person needs to look at.', actions: btn('Screening settings', { icon: 'sliders-horizontal', size: 'sm', toast: 'Screening thresholds (demo)' }) })}
${tabs('kq', [{ id: 'review', label: 'Needs review', n: 7 }, { id: 'wait', label: 'Waiting on customer', n: 3 }, { id: 'done', label: 'Cleared today', n: 12 }], 'review')}

${panel('kq', 'review', `
${chips(['All', ['High', 2], ['Medium', 3], ['Low', 2], 'Landlords', 'Tenants', 'Contractors'])}
<div class="split"><div class="stack">
  ${kcase({ sev: 'high', icon: 'coins', title: 'Cash payment above threshold', ref: 'AML-0412', when: 'Mon 23 Nov, 14:20',
    body: 'A tenant recorded that he paid a quarterly instalment in cash, by hand, to the landlord and asked for a receipt. Cash is outside the platform’s payment rails.',
    kv: [['Tenant', 'Verified · standard risk'], ['Landlord', 'Verified owner · 1 unit'], ['Amount declared', money(60000)], ['Platform cash threshold', money(55000)], ['Source-of-funds evidence', badge('Requested', 'warn')]],
    extra: callout({ tone: 'warn', body: 'Decide whether this needs reporting through goAML. Record your reasoning either way.' }),
    hold: 'Receipt not issued until decided' })}
  ${kcase({ sev: 'high', icon: 'network', title: 'Complex ownership · PoA signatory', ref: 'KYC-2291', when: 'Fri 20 Nov, 16:05',
    body: 'Chen Wei’s two units (Bay Square 7 · 903 and Shoreline 9 · 304) are registered to Wei Family Holdings Pte. Ltd. Daniel Okafor has uploaded a power of attorney to act.',
    kv: [['Title deeds', '2 · company name matches'], ['Beneficial owners found', '2 of 3 identified'], ['PoA', 'Notarised Singapore · attestation being checked'], ['Screening', badge('Clear', 'ok')]],
    extra: `<div class="cluster">${rule('DXB-003', 'Owner or PoA')}</div>`,
    hold: 'Listing, signing and payouts locked for both units' })}
  ${kcase({ sev: 'med', icon: 'scan-search', title: 'Possible watch-list name match', ref: 'SCR-8830', when: 'Today, 06:20',
    body: 'A tenant applicant’s name is a 72% match to a politically exposed person entry. Date of birth and nationality differ; passport number does not match.',
    kv: [['Name similarity', '72%'], ['Date of birth', 'Different (11 years apart)'], ['Nationality', 'Different'], ['Suggested outcome', badge('False positive', 'brand')]],
    hold: 'Application can proceed; contract signing on hold' })}
  <div class="card">${list([
    { sheet: 'sheet-decide', icon: 'id-card', tone: 'warn', title: 'Landlord’s Emirates ID expired', badge: badge('Medium', 'warn', { dot: true }), sub: 'KYC-2304 · expired 2 Nov 2026 · 1 active tenancy · payouts continue, new listings paused', chev: true },
    { sheet: 'sheet-decide', icon: 'building', tone: 'warn', title: 'Rent paid by a third party', badge: badge('Medium', 'warn', { dot: true }), sub: 'KYC-2307 · employer paying an employee’s rent · company trade licence requested', chev: true },
    { sheet: 'sheet-decide', icon: 'hammer', tone: 'info', title: 'Contractor trade licence renewed — re-verify', badge: badge('Low', 'info', { dot: true }), sub: 'KYC-2311 · Falcon Technical Services L.L.C · new licence uploaded yesterday', chev: true },
    { sheet: 'sheet-decide', icon: 'map-pin', tone: 'info', title: 'Sign-in from a new country', badge: badge('Low', 'info', { dot: true }), sub: 'KYC-2312 · landlord account · step-up verification passed', chev: true },
  ])}</div>
</div>

<aside class="stack sticky-side">
  ${card({ title: 'Audit notes · AML-0412', body: timeline([
    { state: 'done', icon: 'flag', title: 'Raised automatically', body: 'Tenant selected “paid in cash” when logging a payment of AED 60,000.', when: 'Mon 23 Nov, 14:20' },
    { state: 'done', icon: 'message-square-text', title: 'Layla Haddad (manager) added a note', body: '“Tenant says landlord insisted on cash for this quarter. Previous payments were cheques.”', when: 'Mon 23 Nov, 15:02' },
    { state: 'done', icon: 'send', title: 'Source-of-funds request sent to tenant', body: 'Bank withdrawal slip or salary record.', when: 'Mon 23 Nov, 15:10' },
    { state: 'now', icon: 'gavel', title: 'Awaiting MLRO decision', body: 'Hana Suzuki', when: 'Due today, 17:00' },
  ]) })}
  ${guard({ title: 'Review standards', checks: [
    { state: 'ok', title: 'Identity through UAE Pass first', sub: 'Documents are only requested when the automatic check cannot conclude.' },
    { state: 'ok', title: 'Write the reason, every time', sub: 'Decisions without a note cannot be saved. Notes are immutable.' },
    { state: 'block', title: 'Never tell a customer about a report', sub: 'Messages to customers from a case use neutral wording only.' },
    { state: 'info', title: 'Records are kept for at least five years', sub: 'After a tenancy or relationship ends.' },
  ] })}
</aside></div>`, true)}

${panel('kq', 'wait', `<div class="card">${list([
  { icon: 'hourglass', tone: 'warn', title: 'Proof of address for overseas owner', sub: 'KYC-2279 · requested 19 Nov · reminder sent yesterday', endBadge: badge('5 days'), toast: 'Case opened (demo)', chev: true },
  { icon: 'hourglass', tone: 'warn', title: 'Company trade licence — corporate tenant', sub: 'KYC-2307 · requested 22 Nov', endBadge: badge('2 days'), toast: 'Case opened (demo)', chev: true },
  { icon: 'hourglass', tone: 'warn', title: 'Third beneficial owner ID — Wei Family Holdings', sub: 'KYC-2291 · requested 21 Nov via representative', endBadge: badge('3 days'), toast: 'Case opened (demo)', chev: true },
])}</div>`)}

${panel('kq', 'done', `<div class="card">${table({ cols: [{ label: 'Case' }, { label: 'Type' }, { label: 'Outcome' }, { label: 'By', r: true }], rows: [
  ['<b>SCR-8821</b><div class="small muted">Tenant applicant · name match 64%</div>', 'Screening', badge('False positive', 'brand'), 'H. Suzuki · 08:41'],
  ['<b>KYC-2298</b><div class="small muted">Landlord · new title deed added</div>', 'Ownership', badge('Approved', 'ok'), 'Auto · 08:02'],
  ['<b>KYC-2301</b><div class="small muted">Contractor · insurance certificate</div>', 'Supplier', badge('Approved', 'ok'), 'H. Suzuki · 09:15'],
  ['<b>KYC-2296</b><div class="small muted">Tenant · visa renewed</div>', 'Identity', badge('Approved', 'ok'), 'Auto · 07:30'],
] })}</div><p class="small muted center">8 more cleared automatically today.</p>`)}`,
  sheets: () => sheet('sheet-decide', 'Record a decision',
    `${choice('dec', 'Approve — clear the hold', 'Evidence is sufficient; customer continues as normal', false)}
     ${choice('dec', 'Request more information', 'Customer gets a neutral request; hold stays', true)}
     ${choice('dec', 'Escalate to risk committee', 'Adds the case to today’s 15:00 agenda', false)}
     ${choice('dec', 'File a report with the FIU', 'Opens the goAML form pre-filled from this case; relationship stays restricted', false, { badge: badge('MLRO only', 'danger') })}
     ${field({ label: 'Risk rating after decision', type: 'select', options: ['Standard', 'Medium', 'High — enhanced due diligence'], value: 'Medium' })}
     ${field({ label: 'Reason (required)', type: 'textarea', placeholder: 'What you checked and why you decided this' })}
     ${callout({ tone: 'neutral', icon: 'lock', body: 'Decisions and notes are timestamped, signed with your account and cannot be edited afterwards.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save decision', { variant: 'primary', toast: 'Decision recorded in the audit trail (demo)' })),
};

const moneyPage = {
  slug: 'money', nav: 'money', title: 'Client money', sub: 'Reconciled 06:00 today',
  body: () => `
${pageHead({ title: 'Client money', sub: 'Deposits and rent in transit belong to tenants and landlords, never to openrent.me. They sit in a separate safeguarded account and are matched to the ledger every morning.', actions: btn('Reconciliation report', { icon: 'download', size: 'sm', toast: 'Reconciliation report downloaded (demo)' }) })}

<div class="grid lg3">
  <div class="card brand pad stack stack-sm" style="grid-column:span 1">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Safeguarded balance</span>${badge('Reconciled', 'solid', { icon: 'check' })}</div>
    <div class="hero-num">AED 1,696,950</div>
    <div class="small muted">Emirates NBD client account ••8804 · as at 06:00, Tue 24 Nov</div>
  </div>
  ${ui.stat({ label: 'Ledger total', icon: 'book-open-check', value: '1,696,950', unit: 'AED', sub: '<span class="t-ok strong">Difference AED 0.00</span>' })}
  ${ui.stat({ label: 'Days fully reconciled', icon: 'calendar-check', value: '212', sub: 'in a row · last break 26 Apr' })}
</div>

<div class="split">
<div class="stack">
  <div class="grid lg2">
    ${card({ title: 'What the balance is made of', body: (() => { const segs = [{ label: 'Deposits — active tenancies', value: 1214300, tone: 'brand' }, { label: 'Deposits — awaiting release', value: 52150, tone: 'gold' }, { label: 'Deposits — in dispute', value: 18200, tone: 'danger' }, { label: 'Rent in transit to landlords', value: 367300, tone: 'info' }, { label: 'Unallocated receipts', value: 45000, tone: 'sand' }];
      return `<div style="width:150px;margin:0 auto">${donut({ center: '1.70M', sub: 'AED', legend: false, segments: segs, label: 'Client money by category' })}</div><div class="mt-3">${kv(segs.map(g => [`<span class="inline"><i style="width:9px;height:9px;border-radius:3px;background:${ui.tone(g.tone)};flex:none"></i>${g.label}</span>`, `<span class="num">${g.value.toLocaleString('en-US')}</span>`]), 'legend-kv')}</div>`; })() })}
    ${card({ title: 'Balance, last 6 months', body: lineChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'brand', data: [1.02, 1.18, 1.26, 1.41, 1.58, 1.70] }], min: 0.8, height: 150, label: 'Client account balance in millions of dirhams' }) + `<p class="small muted mt-2">AED millions · grows with active tenancies, not with revenue.</p>` })}
  </div>

  ${card({ title: 'Deposits due for release', headEnd: badge('14-day standard', 'accent', { icon: 'timer' }), flush: true, body: table({ cols: [{ label: 'Tenancy' }, { label: 'Deposit', r: true }, { label: 'Check-out' }, { label: 'Release by' }, { label: 'Status', r: true }], rows: [
    ['<b>Al Ghozlan 3 · Apt 412</b><div class="small muted">Olena Kovalenko</div>', `<span class=\"nowrap\">${money(4400)}</span>`, '<span class=\"nowrap\">Mon 30 Nov</span>', '<span class=\"nowrap\">Mon 14 Dec</span>', badge('Inspection booked', 'gold')],
    ['<b>Sparkle Tower 2 · Apt 1503</b><div class="small muted">R. Delgado</div>', `<span class=\"nowrap\">${money(6500)}</span>`, '<span class=\"nowrap\">Sun 15 Nov</span>', '<span class=\"nowrap\">Sun 29 Nov</span>', badge('5 days left · agreed', 'ok')],
    ['<b>Mudon Arabella · TH 62</b><div class="small muted">The Petrov family</div>', `<span class=\"nowrap\">${money(8250)}</span>`, '<span class=\"nowrap\">Thu 12 Nov</span>', '<span class=\"nowrap\">Thu 26 Nov</span>', badge('2 days left · 1 deduction disputed', 'danger')],
    ['<b>Binghatti Canal · Apt 709</b><div class="small muted">Y. Tanaka</div>', `<span class=\"nowrap\">${money(5000)}</span>`, '<span class=\"nowrap\">Fri 20 Nov</span>', '<span class=\"nowrap\">Fri 4 Dec</span>', badge('Awaiting landlord', 'warn')],
  ] }), foot: `<div class="stack stack-sm"><span class="small muted">If a landlord has not proposed evidenced deductions in 5 days, the full deposit is released.</span>${ui.rule('OR-101', 'Deposits')}</div>` })}

  ${card({ title: 'Unallocated receipts', headEnd: badge('2 items · AED 45,000', 'warn'), flush: true, body: list([
    { sheet: 'sheet-allocate', icon: 'circle-help', tone: 'warn', title: 'AED 12,250 · bank transfer', sub: 'Received Mon 23 Nov · payer “H ELSAYED” · no reference. Matches the first instalment of the payment plan proposed for Zahra Townhouse 114.', badge: badge('Suggested match', 'brand'), chev: true },
    { sheet: 'sheet-allocate', icon: 'circle-help', tone: 'warn', title: 'AED 32,750 · bank transfer', sub: 'Received Sun 22 Nov · reference “RENT Q4” · payer not recognised. 3 tenancies have this instalment amount.', badge: badge('Needs payer contact'), chev: true },
  ]) })}

  ${card({ title: 'Movements today', flush: true, body: table({ cols: [{ label: 'Entry' }, { label: 'Type' }, { label: 'In', r: true }, { label: 'Out', r: true }], rows: [
    ['<b>Executive Towers K 1807</b><div class="small muted">Deposit · Mehta</div>', 'Deposit received', money(6750), '—'],
    ['<b>Sparkle Tower 2 · 1503</b><div class="small muted">Release to tenant · 2 approvals</div>', 'Deposit release', '—', money(6500)],
    ['<b>Landlord payouts · batch 2411-A</b><div class="small muted">38 landlords</div>', 'Rent payout', '—', money(184920)],
    ['<b>Direct debit collections</b><div class="small muted">UAEDDS file · 41 items, 0 returned</div>', 'Rent received', money(212400), '—'],
  ] }) })}
</div>

<aside class="stack sticky-side">
  ${guard({ title: 'Safeguarding controls', checks: [
    { state: 'ok', title: 'Separate from company money', sub: 'Platform fees are swept to the operating account only after they are earned and invoiced.' },
    { state: 'ok', title: 'Deposits stay refundable', sub: 'Held for the tenant until check-out; only evidenced deductions are paid to a landlord.', rule: rule('DXB-020', 'Art. 20') },
    { state: 'ok', title: 'Two people for every payment out', sub: 'The person who prepares a release cannot approve it.' },
    { state: 'plus', title: 'Released within 14 days', sub: 'A countdown starts at check-out. Breaches are reported to the board.', rule: rule('OR-101', 'Our standard') },
    { state: 'block', title: 'Landlords cannot draw on deposits mid-tenancy' },
  ] })}
  ${card({ title: 'This morning’s reconciliation', body: kv([['Bank statement balance', 'AED 1,696,950.00'], ['Ledger balance', 'AED 1,696,950.00'], ['Unmatched bank lines', '0'], ['Unmatched ledger lines', '0'], ['Prepared by', 'System · 06:00'], ['Reviewed by', 'H. Suzuki · 07:48'], ['Difference', 'AED 0.00']], 'total') })}
  ${card({ title: 'Deposits in dispute', flush: true, body: list([
    { icon: 'scale', tone: 'danger', title: 'Mudon Arabella · TH 62', sub: 'AED 2,400 of 8,250 disputed · garden reinstatement · with manager', badge: badge('Day 12', 'danger'), toast: 'Dispute opened (demo)', chev: true },
    { icon: 'scale', tone: 'warn', title: 'JLT Cluster D · Apt 2206', sub: 'AED 15,800 held · case filed at the Rental Disputes Center', badge: badge('RDC', 'warn'), toast: 'Dispute opened (demo)', chev: true, extra: `<div class="mt-2">${rule('DXB-RDC', 'RDC')}</div>` },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-allocate', 'Allocate receipt',
    `${kv([['Amount', money(36250)], ['Received', 'Mon 23 Nov 2026, 11:42'], ['Payer name on transfer', 'H ELSAYED'], ['Reference', '— none —']])}
     ${choice('al', 'Zahra Townhouse 114 · Hassan El-Sayed', 'Arrears of AED 36,250 after cheque 3 was returned · AED 12,250 is the first instalment the tenant proposed', true, { badge: badge('98% match', 'ok') })}
     ${choice('al', 'Hold as unallocated', 'Contact the bank for payer details', false)}
     ${choice('al', 'Return to sender', 'Requires MLRO approval', false)}
     ${callout({ tone: 'brand', body: 'Allocating reduces the arrears to AED 24,000. The 30-day notice keeps running until the landlord accepts the payment plan or the balance is paid. Landlord and manager are told automatically.', rules: [rule('DXB-025A', 'Arrears process')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Allocate · needs 2nd approval', { variant: 'primary', toast: 'Sent to finance approver (demo)' })),
};

const rep = (ic, tone, title, sub, due, b, toast) => ({ icon: ic, tone, title, badge: b, sub: `${sub}<span class="faint" style="display:block;margin-top:2px">${due}</span>`, toast: toast || `${title} exported (demo)`, chev: true });

const reports = {
  slug: 'reports', nav: 'reports', title: 'Reports', sub: '2 due within 60 days',
  body: () => `
${pageHead({ title: 'Reports & registers', sub: 'What the regulators expect from a licensed brokerage, and what we hold ourselves to. Each line exports with its evidence attached.', actions: btn('Export pack', { icon: 'download', variant: 'primary', sheet: 'sheet-export' }) })}
${tabs('rp', [{ id: 'reg', label: 'Regulator', n: 6 }, { id: 'int', label: 'Internal registers', n: 6 }, { id: 'cal', label: 'Calendar' }], 'reg')}

${panel('rp', 'reg', `<div class="split"><div class="stack">
  ${card({ title: 'Licences and registrations', flush: true, body: list([
    rep('landmark', 'warn', 'Brokerage trade licence — DET 1184220', 'OpenRent ME Real Estate Brokerage L.L.C · renewal pack 60% ready', 'Due 31 Jan 2027', badge('68 days', 'warn'), 'Renewal checklist opened (demo)'),
    rep('building-2', 'warn', 'RERA office registration — ORN 31877', 'Renews with the trade licence · office inspection passed Mar 2026', 'Due 31 Jan 2027', badge('68 days', 'warn'), 'Renewal checklist opened (demo)'),
    rep('id-card', 'danger', 'Broker cards (BRN)', '14 registered brokers · 3 expire within 60 days · exam booked for 2', 'First: 18 Dec 2026', badge('3 expiring', 'danger')),
  ]) })}
  ${card({ title: 'Advertising and tenancy registration', flush: true, body: list([
    { ...rep('megaphone', 'ok', 'Trakheesi permit audit', '142 live adverts · 142 valid permits · 3 expire this week · 0 adverts without Form A', 'Weekly · last run today 05:00', badge('Clean', 'ok')), extra: `<div class="mt-2">${rule('DXB-002', 'Permits')}</div>` },
    { ...rep('file-badge', 'ok', 'Ejari coverage', '1,206 active tenancies · 1,206 registered · median 1.4 days from signing to certificate', 'Daily', badge('100%', 'ok')), extra: `<div class="mt-2">${rule('DXB-001', 'Ejari')}</div>` },
    { ...rep('users', 'warn', 'Co-occupant records', '1,171 of 1,206 tenancies have occupants confirmed in the last 12 months', 'Monthly', badge('97%', 'warn')), extra: `<div class="mt-2">${rule('DXB-OCC', 'Co-occupants')}</div>` },
  ]) })}
  ${card({ title: 'Financial crime and tax', flush: true, body: list([
    rep('shield-alert', 'ok', 'goAML filings log', 'This quarter: 1 report filed, 2 considered and not filed (reasons recorded)', 'Quarterly review · 31 Dec', badge('Up to date', 'ok')),
    rep('clipboard-list', '', 'Annual AML business risk assessment', 'Last approved by the board 14 Jan 2026', 'Due 15 Jan 2027', badge('52 days')),
    rep('receipt-text', '', 'VAT return — Q4 2026', 'Platform fees at 5% · AED 1.42M taxable supplies so far', 'Due 28 Jan 2027', badge('65 days')),
  ]) })}
</div>
<aside class="stack sticky-side">
  ${ui.stats([{ label: 'Due in 60 days', icon: 'calendar-clock', value: '2' }, { label: 'Overdue', icon: 'circle-alert', value: '0' }, { label: 'Permits live', icon: 'megaphone', value: '142' }, { label: 'Staff trained', icon: 'graduation-cap', value: '96', unit: '%' }], 'g2')}
  ${callout({ tone: 'brand', title: 'Why the platform holds a broker licence', body: 'Property adverts in Dubai need a permit issued through a licensed brokerage and the owner’s signed marketing agreement. Holding the licence is what lets landlords list directly.', rules: [rule('DXB-002', 'Advertising permit')] })}
  ${card({ title: 'Shared-housing checks', body: kv([['Room-by-room listings live', '0'], ['Listings blocked at creation', '9 this month'], ['Subletting reports under review', '2'], ['Shared-housing permits on file', '0']]) + `<div class="mt-3">${rule('DXB-S04', 'Law 4/2026')}</div>` })}
</aside></div>`, true)}

${panel('rp', 'int', `<div class="grid lg2">
  ${card({ title: 'Data-protection requests (PDPL)', headEnd: badge('Internal target: 30 days', 'outline'), flush: true, body: table({ cols: [{ label: 'Request' }, { label: 'Received' }, { label: 'Status', r: true }], rows: [
    ['<b>Access — copy of my data</b><div class="small muted">Tenant</div>', '19 Nov', badge('In progress · day 5', 'accent')],
    ['<b>Erasure after tenancy ended</b><div class="small muted">Former tenant · legal retention applies to contract and ledger</div>', '11 Nov', badge('Partly fulfilled', 'brand')],
    ['<b>Correction — name spelling</b><div class="small muted">Landlord</div>', '9 Nov', badge('Done · 1 day', 'ok')],
    ['<b>Access — copy of my data</b><div class="small muted">Contractor</div>', '2 Nov', badge('Done · 6 days', 'ok')],
  ] }), foot: `<span class="small muted">4 this month · 0 breaches reported</span>${btn('Export log', { size: 'sm', icon: 'download', toast: 'PDPL request log exported (demo)' })}` })}
  ${card({ title: 'Complaints register', body: barChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'accent', data: [6, 4, 7, 3, 5, 3] }], height: 130, label: 'Complaints received per month' }) + `<div class="mt-3">${kv([['This quarter', '11 complaints'], ['Median time to resolve', '3.2 days'], ['Upheld', '4 of 11'], ['Went to the Rental Disputes Center', '1']])}</div><div class="mt-3">${rule('DXB-RDC', 'RDC')}</div>`, foot: `<span class="small muted">Top theme: repair delays</span>${btn('Export', { size: 'sm', icon: 'download', toast: 'Complaints register exported (demo)' })}` })}
  ${card({ title: 'Other registers', flush: true, body: list([
    rep('lock-keyhole', 'ok', 'Deposit release times', '31 released in November · slowest 11 days · 0 over 14 days', 'Monthly', badge('Pass', 'ok')),
    rep('siren', 'ok', 'Emergency response times', '18 emergencies · median 1 h 52 min · 0 over 4 hours', 'Monthly', badge('Pass', 'ok')),
    rep('ban', 'warn', 'Service cut-off / lock-out reports', '1 report this quarter · escalated in 22 minutes · resolved same day', 'Quarterly', badge('1 case', 'warn')),
    rep('history', '', 'Access and permission review', 'Staff roles reviewed against job function', 'Next: 15 Dec', badge('21 days')),
  ]) })}
  ${card({ title: 'Guardrail overrides', body: `<p class="small muted">Times a manager tried to proceed against a rule. Hard legal rules cannot be overridden by anyone; platform standards need a recorded reason.</p><div class="mt-3">${kv([['Hard-rule overrides', '0 — not possible'], ['Platform-standard exceptions', '3 this quarter'], ['Most common', 'Deposit above cap for a furnished villa (declined)'], ['Reviewed by compliance', '3 of 3']])}</div>`, foot: `<span class="small muted">Feeds the board report</span>${btn('Export', { size: 'sm', icon: 'download', toast: 'Override log exported (demo)' })}` })}
</div>`)}

${panel('rp', 'cal', `<div class="card pad">${timeline([
  { state: 'warn', icon: 'megaphone', title: '3 Trakheesi permits expire', body: 'Adverts pause automatically unless renewed.', when: 'Thu 26 – Sat 28 Nov' },
  { icon: 'history', title: 'Quarterly access review', when: 'Tue 15 Dec' },
  { state: 'danger', icon: 'id-card', title: 'First broker card expires', body: 'Renewal submitted; awaiting RERA.', when: 'Fri 18 Dec' },
  { icon: 'shield-alert', title: 'goAML quarterly review', when: 'Thu 31 Dec' },
  { icon: 'clipboard-list', title: 'AML business risk assessment to board', when: 'Fri 15 Jan 2027' },
  { icon: 'receipt-text', title: 'VAT return — Q4', when: 'Thu 28 Jan 2027' },
  { state: 'warn', icon: 'landmark', title: 'Trade licence and ORN renewal', when: 'Sun 31 Jan 2027' },
])}</div>`)}`,
  sheets: () => sheet('sheet-export', 'Export a report pack',
    `${choice('ex', 'Regulator pack', 'Licences, permit audit, Ejari coverage, broker cards', true)}
     ${choice('ex', 'Board pack', 'Risk overview, client money, complaints, overrides', false)}
     ${choice('ex', 'Auditor pack', 'Reconciliations, deposit ledger, payout approvals', false)}
     <div class="form-grid c2">${field({ label: 'From', type: 'date', value: '2026-10-01' })}${field({ label: 'To', type: 'date', value: '2026-11-24' })}</div>
     <label class="checkline"><input type="checkbox" checked> Remove personal data not needed by the recipient</label>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Generate PDF', { variant: 'primary', icon: 'download', toast: 'Report pack generated (demo)' })),
};

module.exports = [home, kyc, moneyPage, reports];
