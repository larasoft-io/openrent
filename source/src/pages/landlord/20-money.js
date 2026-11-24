const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, money, pageHead, sheet, tabs, panel, thumb, docIco, barChart, legend, bar, choice, sectionHead } = ui;
const { P } = require('../../lib/data');
const B = '../../';

const cheque = (o) => `<div class="cheque ${o.state || ''}">
  <div class="ch-top"><span>${o.bank}</span><span>${o.n}</span></div>
  <div class="ch-amt">${money(o.amt)}</div>
  <div class="small"><b class="strong">${o.date}</b><br><span class="muted">${o.who}</span></div>
  <div class="ch-micr">⑈${o.no}⑈ ${o.micr || '0260 3301'}</div>
  <span class="stamp${o.state ? '' : ' held'}">${o.stamp || (o.state === 'cleared' ? 'Cleared' : o.state === 'bounced' ? 'Returned' : 'In custody')}</span>
</div>`;
const chequeGroup = (p, sub, items, end = '') => `<div class="stack stack-md">
  <div class="between"><div class="inline" style="gap:10px">${thumb(p.img, '', B)}<div><b class="strong">${p.short}</b><div class="small muted">${sub}</div></div></div>${end}</div>
  <div class="hscroll w66 lg-grid">${items.map(cheque).join('')}</div></div>`;

const rollRow = (p, o) => ({ href: o.href || 'property.html', lead: thumb(p.img, '', B), title: p.short, badge: badge(o.status, o.tone, { dot: true }), sub: `${o.tenant || p.tenant} · ${o.plan || p.pay}`, end: o.amt, endSub: o.due });

const payout = (ref, date, title, gross, fee, o = {}) => ({ icon: o.icon || 'banknote', tone: o.tone || 'ok', title, sub: `${ref} · ${date}${fee ? ` · rent ${money(gross)} − Collect.me ${money(fee, { dp: 2 })} − VAT ${money(fee * 0.05, { dp: 2 })}` : ''}`, end: money(gross - fee * 1.05, { dp: 2 }), endBadge: o.badge || badge('Paid to ••7731', 'ok'), toast: `Payout advice ${ref} downloaded (demo)` });

const moneyPage = {
  slug: 'money', nav: 'money', title: 'Money', sub: '5 tenancies · AED 783,000 rent roll',
  body: () => `
${pageHead({ title: 'Money', sub: 'Rent collected, cheques in custody and what has been paid to your bank. Tenants pay openrent.me; we pay you within one working day of funds clearing.', actions: btn('Export', { icon: 'download', size: 'sm', toast: 'Ledger exported to Excel (demo)' }) + btn('Payout settings', { icon: 'landmark', size: 'sm', href: 'profile.html' }) })}

${ui.stats([
  { label: 'Collected in 2026', icon: 'circle-check', value: '519,750', unit: 'AED', sub: '16 of 17 payments on time' },
  { label: 'Due in next 30 days', icon: 'calendar-clock', value: '42,500', unit: 'AED', sub: '2 payments · 1 Dec, 5 Dec' },
  { label: 'In arrears', icon: 'circle-alert', value: '36,250', unit: 'AED', sub: '<a class="link t-danger" href="arrears.html">1 returned cheque</a>' },
  { label: 'Paid to your bank', icon: 'landmark', value: '517,821', unit: 'AED', sub: 'after AED 1,929 fees incl. VAT' },
])}

<a class="callout danger" href="arrears.html">${icon('octagon-alert', 20)}<div class="grow"><h4>Zahra Townhouse 114 — cheque 3 was returned</h4><p>AED 36,250 dated 1 Nov 2026. A 30-day notarised notice is running and ends Wed 9 Dec. Hassan has proposed a payment plan.</p><div class="cluster">${badge('15 days left on notice', 'danger')}<span class="link small">Open arrears case</span></div></div></a>

${tabs('mon', [{ id: 'roll', label: 'Rent roll', n: 5 }, { id: 'cheques', label: 'Cheques', n: 9 }, { id: 'payouts', label: 'Payouts' }, { id: 'statements', label: 'Statements' }], 'roll')}

${panel('mon', 'roll', `
<div class="split">
  <div class="stack">
    <div class="card">${list([
      rollRow(P.p1, { status: 'On time', tone: 'ok', plan: '12 direct debits · Flexi Rent', amt: money(8750), due: 'Tue 1 Dec' }),
      rollRow(P.p4, { status: 'Starts 5 Dec', tone: 'accent', plan: '4 cheques · first on move-in', amt: money(33750), due: 'Sat 5 Dec', href: 'contract.html' }),
      rollRow(P.p7, { status: 'Arrears', tone: 'danger', plan: '4 cheques · cheque 3 returned', amt: money(36250), due: 'Overdue 23 days', href: 'arrears.html' }),
      rollRow(P.p3, { status: 'On time', tone: 'ok', plan: '2 cheques', amt: money(155000), due: 'Mon 15 Mar 2027' }),
      rollRow(P.p5, { status: 'Paid in full', tone: 'brand', plan: '4 of 4 cheques cleared', amt: 'AED 0', due: 'Ends 30 Nov', href: 'moveout.html' }),
    ])}</div>
    <div class="card sunk">${list([
      { lead: thumb(P.p2.img, '', B), href: 'listing.html', title: P.p2.short, badge: badge('Not let yet'), sub: 'Live listing · asking AED 54,000 · 2 offers to review', end: '—' },
      { lead: thumb(P.p6.img, '', B), href: 'listing-new.html', title: P.p6.short, badge: badge('Not let yet'), sub: 'In verification · target AED 195,000', end: '—' },
    ])}</div>
  </div>
  <aside class="stack">
    ${card({ title: 'Income by month · 2026', body: `${barChart({ labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], stacked: true, height: 180, label: 'Rent income by month', series: [
      { name: 'Collected', tone: 'brand', data: [0, 8.75, 169.5, 8.75, 45, 30.75, 8.75, 45, 185.75, 8.75, 8.75, 0] },
      { name: 'Returned', tone: 'danger', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36.25, 0] },
      { name: 'Scheduled', tone: 'sand', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42.5] },
    ] })}<div class="mt-3">${legend([['Collected', 'brand'], ['Returned', 'danger'], ['Scheduled', 'sand']])}</div><p class="small muted mt-3">Cheque-paying tenancies make income lumpy — March and September carry the villa’s two cheques.</p>` })}
    ${card({ title: 'Next 12 months', body: kv([['Contracted rent', money(352500)], ['Secured by cheques in custody', money(326250)], ['By direct debit', money(26250)], ['Vacant / not yet let', '2 units · AED 249,000 potential']]) })}
    ${callout({ tone: 'neutral', icon: 'percent', title: 'VAT', body: 'Residential rent carries no VAT, so your rent is paid to you in full. openrent.me service fees are charged with 5% VAT and shown separately on every payout advice.' })}
  </aside>
</div>`, true)}

${panel('mon', 'cheques', `
  ${callout({ tone: 'brand', icon: 'lock-keyhole', title: 'Cheque custody', body: 'Post-dated cheques are scanned, stored in our vault and presented on their date. You see each one here; nothing is banked early, and replaced cheques are returned to the tenant against a receipt.' })}
  ${chequeGroup(P.p7, 'Hassan El-Sayed · 4 × AED 36,250', [
    { state: 'cleared', bank: 'Mashreq', n: 'Cheque 1 of 4', amt: 36250, date: '1 May 2026', who: 'Cleared 4 May', no: '000431' },
    { state: 'cleared', bank: 'Mashreq', n: 'Cheque 2 of 4', amt: 36250, date: '1 Aug 2026', who: 'Cleared 3 Aug', no: '000432' },
    { state: 'bounced', bank: 'Mashreq', n: 'Cheque 3 of 4', amt: 36250, date: '1 Nov 2026', who: 'Returned 3 Nov · insufficient funds', no: '000433' },
    { bank: 'Mashreq', n: 'Cheque 4 of 4', amt: 36250, date: '1 Feb 2027', who: 'Presents in 69 days', no: '000434' },
  ], badge('1 returned', 'danger'))}
  ${callout({ tone: 'warn', title: 'A returned cheque is not an eviction', body: 'It starts a defined process: reminder, notarised 30-day notice, then the Rental Disputes Center. The returned cheque itself can also be enforced through the courts as an executive instrument.', rules: [rule('DXB-025A', '30-day notice')], actions: `<a class="link small" href="arrears.html">See the case</a>` })}
  ${chequeGroup(P.p3, 'James & Claire Whitfield · 2 × AED 155,000', [
    { state: 'cleared', bank: 'HSBC', n: 'Cheque 1 of 2', amt: 155000, date: '15 Sep 2026', who: 'Cleared 17 Sep', no: '118204', micr: '0200 4417' },
    { bank: 'HSBC', n: 'Cheque 2 of 2', amt: 155000, date: '15 Mar 2027', who: 'Presents in 111 days', no: '118205', micr: '0200 4417' },
  ], badge('On time', 'ok'))}
  ${chequeGroup(P.p4, 'Arjun & Neha Mehta · 4 × AED 33,750', [
    { bank: 'ADCB', n: 'Cheque 1 of 4', amt: 33750, date: '5 Dec 2026', who: 'Presents on move-in day', no: '004871', micr: '0030 9920' },
    { bank: 'ADCB', n: 'Cheque 2 of 4', amt: 33750, date: '5 Mar 2027', who: 'In custody', no: '004872', micr: '0030 9920' },
    { bank: 'ADCB', n: 'Cheque 3 of 4', amt: 33750, date: '5 Jun 2027', who: 'In custody', no: '004873', micr: '0030 9920' },
    { bank: 'ADCB', n: 'Cheque 4 of 4', amt: 33750, date: '5 Sep 2027', who: 'In custody', no: '004874', micr: '0030 9920' },
  ], badge('Received 22 Nov', 'brand'))}
  <div class="card">${list([{ lead: thumb(P.p5.img, '', B), title: P.p5.short, sub: 'Olena Kovalenko · 4 of 4 cheques cleared (Dec 2025 – Sep 2026)', endBadge: badge('Complete', 'ok'), href: 'moveout.html' }])}</div>`)}

${panel('mon', 'payouts', `
<div class="split">
  <div class="stack">
    <div class="card">${list([
      { icon: 'hourglass', tone: 'warn', title: 'Zahra TH 114 — cheque 3', sub: 'No payout: cheque returned 3 Nov · arrears case open', end: money(0), endBadge: badge('On hold', 'danger'), href: 'arrears.html' },
      payout('PO-2611-014', 'Mon 2 Nov 2026', 'Marina Gate 2304 — November rent', 8750, 87.5),
      payout('PO-2610-009', 'Thu 1 Oct 2026', 'Marina Gate 2304 — October rent', 8750, 87.5),
      payout('PO-2609-031', 'Thu 17 Sep 2026', 'Palma Villa 27 — cheque 1 of 2', 155000, 150),
      payout('PO-2609-006', 'Thu 3 Sep 2026', 'Al Ghozlan 412 — cheque 4 of 4', 22000, 150),
      payout('PO-2609-002', 'Tue 1 Sep 2026', 'Marina Gate 2304 — September rent', 8750, 87.5),
      payout('PO-2608-011', 'Tue 4 Aug 2026', 'Zahra TH 114 — cheque 2 of 4', 36250, 150),
      payout('PO-2608-003', 'Mon 3 Aug 2026', 'Marina Gate 2304 — August rent', 8750, 87.5),
    ])}</div>
    <p class="small muted center">Showing the last 7 of 16 payouts this year.</p>
  </div>
  <aside class="stack">
    ${card({ title: 'Payout account', body: `<div class="inline" style="gap:12px"><span class="row-ico brand">${icon('landmark', 20)}</span><div><b class="strong">Emirates Islamic ••7731</b><div class="small muted">AE•• •••• •••• •••• ••7 731 · Fatima Al Hashimi</div></div></div><div class="mt-3">${kv([['Speed', 'Next working day after clearing'], ['Verified', 'Name matches title deed'], ['Collect.me fee', '1% · max AED 150 a month per tenancy']])}</div>` })}
    ${card({ title: 'Fees this year', body: kv([['Collect.me — Marina Gate (9 months)', 'AED 787.50'], ['Collect.me — cheque tenancies (7)', 'AED 1,050.00'], ['VAT 5%', 'AED 91.88'], ['Total deducted', 'AED 1,929.38']], 'total') + `<p class="small muted mt-3">That is 0.37% of the rent collected.</p>` })}
    ${callout({ tone: 'neutral', icon: 'shield-check', title: 'Deposits are not income', body: 'AED 39,150 in tenant deposits is held in the safeguarded client account, not paid out to you.', rules: [rule('OR-101', 'Deposits')] })}
  </aside>
</div>`)}

${panel('mon', 'statements', `
<div class="grid lg2">
  ${card({ title: 'Monthly statements', flush: true, body: list([['November 2026', 'In progress · closes 30 Nov', 'Draft'], ['October 2026', '1 payout · AED 8,658.12', ''], ['September 2026', '3 payouts · AED 185,343.12', ''], ['August 2026', '2 payouts · AED 44,750.62', ''], ['July 2026', '1 payout · AED 8,658.12', '']].map(([t, s, b]) => ({ lead: docIco('PDF'), title: t, sub: s, endBadge: b ? badge(b, 'warn') : '', toast: `${t} statement downloaded (demo)` }))) })}
  <div class="stack">
    ${card({ title: 'Annual and per property', flush: true, body: list([
      { lead: docIco('XLS', 'xls'), title: 'Income & expense ledger 2026', sub: 'All properties · rent, fees, maintenance', toast: 'Ledger downloaded (demo)' },
      { lead: docIco('PDF'), title: 'Annual owner statement 2025', sub: 'Issued 8 Jan 2026', toast: 'Statement downloaded (demo)' },
      { lead: docIco('PDF'), title: 'Per-property yield report', sub: 'Gross and net yield vs purchase price', toast: 'Report downloaded (demo)' },
      { lead: docIco('PDF'), title: 'Tax invoices — openrent.me fees', sub: '14 invoices this year', href: 'services.html' },
    ]) })}
    ${card({ title: 'Send statements automatically', body: `<div class="stack stack-sm">${choice('stm', 'To me only', 'fatima@alhashimi.example', true)}${choice('stm', 'To me and my accountant', 'Add an email address', false)}</div>` })}
  </div>
</div>`)}
`,
};

module.exports = [moneyPage];
