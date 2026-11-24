const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, bar, timeline, money, pageHead, sheet, tabs, panel, choice, docIco, stats } = ui;

const months = [['Mar', '1 Mar 2026'], ['Apr', '1 Apr 2026'], ['May', '1 May 2026'], ['Jun', '1 Jun 2026'], ['Jul', '1 Jul 2026'], ['Aug', '1 Aug 2026'], ['Sep', '1 Sep 2026'], ['Oct', '1 Oct 2026'], ['Nov', '1 Nov 2026'], ['Dec', '1 Dec 2026'], ['Jan', '1 Jan 2027'], ['Feb', '1 Feb 2027']];

const payments = {
  slug: 'payments', nav: 'payments', title: 'Payments', sub: 'Marina Gate 1 · Apt 2304',
  body: () => `
${pageHead({ title: 'Payments', sub: 'Your rent is AED 105,000 a year, paid in 12 monthly direct debits. The total is the same whichever plan you choose.', actions: btn('Statement', { icon: 'download', size: 'sm', toast: 'Statement downloaded (demo)' }) + btn('Change plan', { icon: 'sliders-horizontal', size: 'sm', sheet: 'sheet-plan' }) })}

<div class="grid g2 lg4">
  <div class="card brand pad stack stack-sm" style="grid-column:span 2">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Next payment</span>${badge('In 7 days', 'solid')}</div>
    <div class="hero-num">AED 8,750</div>
    <div class="small muted">Tue 1 Dec 2026 · direct debit from Emirates NBD ••4417</div>
  </div>
  ${ui.stat({ label: 'Paid this year', icon: 'circle-check', value: '78,750', unit: 'AED', sub: '9 of 12 on time' })}
  ${ui.stat({ label: 'Still to pay', icon: 'calendar-clock', value: '26,250', unit: 'AED', sub: '3 instalments' })}
</div>

${tabs('pay', [{ id: 'schedule', label: 'Schedule' }, { id: 'history', label: 'Receipts' }, { id: 'deposit', label: 'Deposit' }, { id: 'method', label: 'Method' }], 'schedule')}

${panel('pay', 'schedule', `
  <div class="split">
  <div class="card">${list(months.map(([m, d], i) => i < 9
    ? { icon: 'check', tone: 'ok', title: `${m} rent`, sub: `Collected ${d}`, end: money(8750), endBadge: badge('Paid', 'ok'), toast: `Receipt for ${m} downloaded (demo)` }
    : i === 9
      ? { icon: 'calendar-clock', tone: 'accent', title: `${m} rent`, sub: `Due ${d} · collects automatically`, end: money(8750), endBadge: badge('Due in 7 days', 'accent'), sheet: 'sheet-pay' }
      : { icon: 'calendar', tone: '', title: `${m} rent`, sub: `Due ${d}`, end: money(8750), endBadge: badge('Scheduled') }))}</div>
  <aside class="stack">
    ${card({ title: 'This tenancy year', body: `<div class="stack stack-md">
      <div class="stack stack-sm"><div class="between small"><span class="muted">Paid</span><b class="num">75%</b></div>${bar(75, 'ok')}</div>
      ${kv([['Annual rent', money(105000)], ['Plan', '12 × AED 8,750'], ['Collected on', '1st of each month'], ['Late payments', '0']])}</div>` })}
    ${callout({ tone: 'neutral', icon: 'landmark', title: 'Housing fee is separate', body: 'Dubai Municipality charges 5% of your annual rent through your DEWA bill — about AED 437.50 a month. It is not paid to your landlord or to us.' })}
    ${callout({ tone: 'brand', title: 'Monthly payments, same rent', body: 'Your landlord opted in to Flexi Rent, so paying monthly does not cost you more than paying by cheque.', rules: [rule('DXB-PAY', 'Payment terms')] })}
  </aside></div>`, true)}

${panel('pay', 'history', `
  <div class="card">${list([
    { lead: docIco(), title: 'November rent', sub: 'RCPT-2611-0042 · 1 Nov 2026 · direct debit', end: money(8750), toast: 'Receipt downloaded (demo)' },
    { lead: docIco(), title: 'October rent', sub: 'RCPT-2610-0039 · 1 Oct 2026 · direct debit', end: money(8750), toast: 'Receipt downloaded (demo)' },
    { lead: docIco(), title: 'Washing machine repair', sub: 'RCPT-2610-0977 · 14 Oct 2026 · card · tenant-side repair under AED 250', end: money(180), toast: 'Receipt downloaded (demo)' },
    { lead: docIco(), title: 'September rent', sub: 'RCPT-2609-0036 · 1 Sep 2026 · direct debit', end: money(8750), toast: 'Receipt downloaded (demo)' },
    { lead: docIco(), title: 'March rent (first instalment)', sub: 'RCPT-2603-0011 · 26 Feb 2026 · bank transfer', end: money(8750), toast: 'Receipt downloaded (demo)' },
    { lead: docIco(), title: 'Security deposit', sub: 'DEP-2602-0311 · 26 Feb 2026 · held in safeguarded account', end: money(5250), toast: 'Deposit certificate downloaded (demo)' },
    { lead: docIco(), title: 'Move.me tenancy fee', sub: 'INV-2602-1180 · 26 Feb 2026 · AED 249 + 5% VAT', end: money(261.45, { dp: 2 }), toast: 'Tax invoice downloaded (demo)' },
    { lead: docIco(), title: 'Ejari registration (government fee, at cost)', sub: 'INV-2602-1181 · 27 Feb 2026', end: money(177.75, { dp: 2 }), toast: 'Receipt downloaded (demo)' },
  ])}</div>
  <p class="small muted center">Receipts are official records and can be used for visa, schooling and tax purposes.</p>`)}

${panel('pay', 'deposit', `
  <div class="split">
  <div class="stack">
    <div class="card pad stack stack-md">
      <div class="between-top"><div><span class="eyebrow">Security deposit</span><div class="hero-num mt-2">AED 5,250</div><div class="small muted mt-1">5% of annual rent · unfurnished</div></div><span class="row-ico ok">${icon('lock-keyhole', 20)}</span></div>
      ${kv([['Held by', 'openrent.me client account · Emirates NBD'], ['Certificate', 'DEP-2602-0311'], ['Paid on', '26 Feb 2026'], ['Released', 'Within 14 days of check-out']])}
      ${btn('Download deposit certificate', { icon: 'download', block: true, toast: 'Deposit certificate downloaded (demo)' })}
    </div>
    ${card({ title: 'How you get it back', body: timeline([
      { state: 'done', icon: 'camera', title: 'Move-in condition report', body: '84 photos agreed by you and your landlord on 1 Mar 2026.' },
      { icon: 'clipboard-check', title: 'Check-out inspection', body: 'Same rooms, same angles, compared side by side.' },
      { icon: 'scale', title: 'Any deduction must be evidenced', body: 'Fair wear and tear is not chargeable. You can accept, or dispute with one tap.' },
      { icon: 'banknote', title: 'Paid to your bank within 14 days', body: 'If you and your landlord disagree, a manager decides on the evidence — or you can take it to the RDC.' },
    ]) })}
  </div>
  <aside class="stack">
    ${guard({ title: 'Deposit rules', checks: [
      { state: 'ok', title: 'Refundable by law', sub: 'A landlord must return the deposit or its balance when the tenancy ends.', rule: rule('DXB-020', 'Art. 20') },
      { state: 'ok', title: 'Fair wear and tear excluded', sub: 'Faded paint and worn carpet are not damage.', rule: rule('DXB-021', 'Art. 21') },
      { state: 'plus', title: 'Capped and safeguarded', sub: 'The law sets no cap or holding rule — openrent.me does.', rule: rule('OR-101', 'Our standard') },
    ] })}
  </aside></div>`)}

${panel('pay', 'method', `
  <div class="split">
  <div class="stack">
    <div class="card pad stack stack-md">
      <div class="between"><div class="inline"><span class="row-ico brand">${icon('landmark', 20)}</span><div><b class="strong">Direct debit mandate</b><div class="small muted">UAE Direct Debit System · Emirates NBD ••4417</div></div></div>${badge('Active', 'ok', { dot: true })}</div>
      ${kv([['Mandate reference', 'DDA-ENBD-77120934'], ['Maximum per collection', money(8750)], ['Valid until', '28 Feb 2027'], ['Collections', '1st of each month']])}
      <div class="btn-row">${btn('Change account', { size: 'sm', toast: 'Bank change flow (demo)' })}${btn('Pause / dispute', { size: 'sm', toast: 'A manager will contact you (demo)' })}</div>
    </div>
    ${card({ title: 'Backup card', flush: true, body: list([{ icon: 'credit-card', title: 'Visa ending 2291', sub: 'Used only if a direct debit fails, after we message you · 1.9% card fee', endBadge: badge('Backup') }]) })}
  </div>
  <aside class="stack">${callout({ tone: 'neutral', title: 'If a payment fails', body: 'We tell you the same day and retry once after 3 days. Nothing is reported to your landlord as “late” until then, and no penalty fees are added by openrent.me.' })}</aside></div>`)}
`,
  sheets: () => sheet('sheet-plan', 'Change payment plan',
    `<p class="small muted">Plans can change at renewal, or mid-term if your landlord agrees. Your annual rent stays AED 105,000.</p>
     ${choice('plan', '12 monthly direct debits', 'AED 8,750 on the 1st', true, { badge: badge('Current', 'brand') })}
     ${choice('plan', '4 quarterly payments', 'AED 26,250 by direct debit or cheque', false)}
     ${choice('plan', '2 half-yearly cheques', 'AED 52,500 each', false)}
     ${choice('plan', '1 cheque', 'AED 105,000 · some landlords offer a discount', false)}
     ${callout({ tone: 'brand', body: 'Changing instalments never changes the rent itself.', rules: [rule('DXB-PAY', 'Payment terms')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Ask landlord', { variant: 'primary', toast: 'Request sent to Fatima (demo)' }))
  + sheet('sheet-pay', 'December rent',
    `${kv([['Amount', money(8750)], ['Due', 'Tue 1 Dec 2026'], ['Method', 'Direct debit · Emirates NBD ••4417'], ['Status', badge('Scheduled', 'accent')]])}
     ${callout({ tone: 'neutral', title: 'Collects automatically', body: 'Make sure funds are available by 30 Nov. Want to pay early by card instead? A 1.9% card fee applies.' })}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Pay by card now', { variant: 'primary', toast: 'Card payment started (demo)' })),
};

module.exports = [payments];
