const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, rule, money, pageHead, sectionHead } = ui;
const { p } = require('./_h');

const cheque = (n, date) => `<div class="cheque"><div class="ch-top"><span>ADCB</span><span>No. 00487${n}</span></div><div><div class="micro muted">Pay Fatima Al Hashimi</div><div class="ch-amt">AED 33,750</div></div><div class="between small"><span class="muted">Dated</span><b>${date}</b></div><span class="stamp held">In custody</span></div>`;

const costs = {
  slug: 'costs', nav: 'costs', title: 'Move-in costs', sub: 'All paid', back: 'index.html',
  body: () => `
${pageHead({ title: 'Move-in costs', sub: 'What you have paid, what is held for you, and what you will pay to the utilities. No commission, no holding fee.' })}

<div class="split">
<div class="stack">
  ${card({ title: 'Paid to openrent.me', headEnd: badge('Paid Sun 22 Nov', 'ok'), flush: true, body: list([
    { icon: 'lock-keyhole', tone: 'brand', title: 'Security deposit', sub: '5% of annual rent · held in the client account, refundable', end: money(p.deposit), endSub: 'DEP-2611-0498', chev: false },
    { icon: 'receipt-text', tone: '', title: 'Move.me tenancy fee', sub: 'AED 249 + VAT 5%', end: 'AED 261.45', endSub: 'INV-2611-3307', chev: false },
    { icon: 'landmark', tone: '', title: 'Ejari registration', sub: 'Government fee, charged at cost', end: 'AED 177.75', endSub: 'INV-2611-3308', chev: false },
    { icon: 'badge-percent', tone: 'ok', title: 'Agency commission', sub: 'A typical agent charges about 5% of the rent', end: '<span class="t-ok">AED 0</span>', chev: false },
  ]) })}
  ${card({ body: kv([['Paid with', 'Apple Pay · Mastercard ••2290'], ['Commission you did not pay', '<span class="t-ok">about AED 6,750</span>'], ['Total paid', '<b class="num">AED 7,189.20</b>']], 'total') })}

  ${sectionHead('Rent cheques')}
  ${callout({ tone: 'neutral', icon: 'vault', title: 'Held for you, not handed to the landlord', body: 'Your four cheques were lodged at our Business Bay office on Mon 23 Nov. Each one is deposited on its date. If anything goes wrong before move-in, they are returned to you uncashed.' })}
  <div class="grid sm2">${cheque(1, '5 Dec 2026')}${cheque(2, '5 Mar 2027')}${cheque(3, '5 Jun 2027')}${cheque(4, '5 Sep 2027')}</div>
  <p class="small muted">Cheque 1 is presented on move-in day, and only once Ejari is active.</p>
</div>

<aside class="stack">
  ${card({ title: 'Still to pay, to providers', flush: true, body: list([
    { icon: 'zap', tone: 'warn', title: 'DEWA', sub: 'Refundable deposit AED 2,000 + AED 130 activation · after Ejari', endBadge: badge('Later'), chev: false },
    { icon: 'snowflake', tone: 'info', title: 'District cooling', sub: 'Refundable deposit AED 2,000 · register with the provider', endBadge: badge('Later'), chev: false },
    { icon: 'wifi', tone: 'ok', title: 'Home internet', sub: 'du · installation Sun 6 Dec', endBadge: badge('Booked', 'ok'), chev: false },
  ]) })}
  ${card({ title: 'Your deposit back', body: `<div class="stack stack-sm small"><p>Returned within 14 days of check-out, minus only deductions you agree to or the Rental Disputes Center decides. Fatima can never hold it herself.</p><div class="cluster">${rule('OR-101', 'Deposit standard')}${rule('OR-105', 'No hidden fees')}</div></div>` })}
  ${btn('Download all receipts', { icon: 'download', block: true, toast: '3 receipts downloaded (demo)' })}
</aside>
</div>`,
};

module.exports = [costs];
