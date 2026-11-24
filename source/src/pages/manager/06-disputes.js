const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, field, choice, donut, timeline, stagebar, seg, lifecycle, chips } = ui;
const { B } = require('./lib/h');

const STAGE = ['Mediation', 'Decision', 'RDC referral'];
const dcard = (o) => `<${o.href ? `a href="${o.href}"` : 'div'} class="card pad ${o.href ? 'link-card ' : ''}stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · ${o.prop}</div></div></div>${o.badge}</div>
  <div class="inline small">${avatar(o.a, { size: 'xs' })}<span>${o.a}</span><span class="muted">vs</span>${avatar(o.b, { size: 'xs' })}<span>${o.b}</span></div>
  <p class="small muted">${o.text}</p>
  <div>${stagebar(3, o.stage)}<div class="between micro muted mt-1"><span>${STAGE[0]}</span><span>${STAGE[1]}</span><span>${STAGE[2]}</span></div></div>
  ${o.rules ? `<div class="cluster">${o.href ? o.rules.replace(/<a class="rule-chip"[^>]*>([\s\S]*?)<\/a>/g, '<span class="rule-chip">$1</span>') : o.rules}</div>` : ''}
</${o.href ? 'a' : 'div'}>`;

const disputes = {
  slug: 'disputes', nav: 'disputes', title: 'Disputes', sub: '6 open · 2 for decision',
  body: () => `
${pageHead({ title: 'Disputes & mediation', sub: 'Most disagreements end here, on the evidence, without anyone paying a court fee. When they cannot, the case file goes to the Rental Disputes Center complete.', actions: btn('Open a case', { icon: 'plus', size: 'sm', toast: 'New case form (demo)' }) })}
${stats([
  { label: 'Open cases', icon: 'scale', value: '6', sub: '3 in mediation' },
  { label: 'Awaiting my decision', icon: 'gavel', value: '2', sub: 'first due Fri 27 Nov' },
  { label: 'Settled without RDC', icon: 'handshake', value: '94', unit: '%', sub: 'last 12 months' },
  { label: 'Median time to close', icon: 'timer', value: '6', unit: 'days', sub: 'target 10 working days' },
])}
${chips(['All', ['Deposit', 2], ['Repairs', 1], ['Rent & renewal', 1], ['Arrears', 1], ['With RDC', 1]])}

<div class="split">
<div class="grid">
  ${dcard({ href: 'dispute.html', icon: 'lock-keyhole', tone: 'violet', title: 'Deposit deductions', ref: 'DSP-0093', prop: 'Lake Terrace · Apt 1204, JLT', a: 'Vikram Nair', b: 'Grace Mwangi', badge: badge('Decide by Fri', 'warn', { dot: true }), stage: 1, text: 'Landlord claims AED 1,850 of a AED 6,000 deposit for repainting, oven cleaning and a blind. Tenant accepts the oven clean only.', rules: rule('DXB-021', 'Fair wear & tear') + rule('OR-101', 'Deposits') })}
  ${dcard({ icon: 'calendar-clock', tone: 'warn', title: 'Late renewal notice', ref: 'DSP-0091', prop: 'Villa 8, Al Barsha 3', a: 'Yusuf Demir', b: 'Farah Siddiqui', badge: badge('Decide by Mon', 'warn', { dot: true }), stage: 1, text: 'Landlord proposed a 5% rise 84 days before expiry and says “a few days makes no difference”. Tenant asks for the same terms.', rules: rule('DXB-014', '90-day notice') + rule('DXB-006', 'Same terms') })}
  ${dcard({ icon: 'wrench', tone: 'info', title: 'Who pays for the water heater', ref: 'DSP-0095', prop: 'Shoreline 7 · 402, Palm Jumeirah', a: 'Anastasia Volkova', b: 'Peter Lindholm', badge: badge('Mediation · day 2', 'info'), stage: 0, text: 'Replacement cost AED 1,400. Landlord says misuse; contractor report says the tank failed from age (9 years).', rules: rule('DXB-016', 'Art. 16') })}
  ${dcard({ icon: 'circle-alert', tone: 'danger', title: 'Rent arrears', ref: 'DSP-0088', prop: 'Zahra Townhouse 114, Town Square', a: 'Fatima Al Hashimi', b: 'Hassan El-Sayed', badge: badge('Notice ends 9 Dec', 'danger'), stage: 0, text: 'Cheque 3 (AED 36,250) returned. Hassan has offered AED 12,000 now and the balance by 15 Jan. Fatima is considering it; the RDC file is drafted in case.', rules: rule('DXB-025A', '30-day notice') + rule('DXB-RDC', 'RDC') })}
  ${dcard({ icon: 'door-open', tone: 'gold', title: 'Early-exit charge', ref: 'DSP-0084', prop: 'Bay Square 7 · 611, Business Bay', a: 'Rania Aziz', b: 'Dmitri Volkov', badge: badge('With RDC', 'violet'), stage: 2, text: 'Pre-platform contract with a 3-month penalty. Mediation failed; case file exported 2 Nov. Hearing date awaited.', rules: rule('DXB-RDC', 'RDC') })}
  ${dcard({ icon: 'clipboard-check', tone: 'gold', title: 'Deposit settlement (pre-emptive)', ref: 'DSP-0097', prop: 'Al Ghozlan 3 · Apt 412, The Greens', a: 'Fatima Al Hashimi', b: 'Olena Kovalenko', badge: badge('Not yet a dispute', ''), stage: 0, text: 'Check-out is Mon 30 Nov. Move-in report and AED 4,400 deposit record are prepared so any deduction can be agreed on the day.', rules: rule('OR-101', '14-day return') })}
</div>

<aside class="stack">
  ${card({ title: 'How a case moves', body: timeline([
    { state: 'done', icon: 'message-circle', title: 'Mediation — up to 5 working days', body: 'Both sides see the same evidence and can settle with one tap.' },
    { state: 'now', icon: 'gavel', title: 'Manager decision — within 5 more', body: 'On documents and photos only. Reasons are written down and cite the rule.' },
    { icon: 'landmark', title: 'Rental Disputes Center', body: 'Either side can still go. We export the complete file; the RDC fee is 3.5% of annual rent, AED 500 – 20,000.', extra: rule('DXB-RDC', 'RDC') },
  ]) })}
  ${card({ title: 'Outcomes, last 12 months', body: donut({ center: '87', sub: 'cases', segments: [
    { label: 'Settled in mediation', value: 58, tone: 'brand', show: '58' }, { label: 'Manager decision accepted', value: 24, tone: 'gold', show: '24' }, { label: 'Went to RDC', value: 5, tone: 'accent', show: '5' }] }) })}
  ${callout({ tone: 'brand', title: 'Deposits are never used as leverage', body: 'The undisputed part is released within 14 days of check-out; only the amount in question is held.', rules: [rule('OR-101', 'Deposits')] })}
</aside>
</div>`,
};

const item = (o) => `<section class="card stack" style="gap:0;overflow:hidden" id="${o.id}">
  <div class="card-body stack stack-md">
    <div class="between-top"><div><span class="eyebrow">Item ${o.n} of 3</span><h2 class="mt-1">${o.title}</h2></div><div class="right"><div class="small muted">Claimed</div><b class="num" style="font-size:18px">${money(o.claim)}</b></div></div>
    <div class="mg-cmp">
      <figure><img src="${B}assets/img/${o.before}.svg" alt="Move-in photo"><figcaption>${ui.glass('Move-in · ' + o.beforeDate, 'camera', true)}</figcaption></figure>
      <figure class="after"><img src="${B}assets/img/${o.after}.svg" alt="Check-out photo"><figcaption>${ui.glass('Check-out · 14 Nov 2026', 'camera')}</figcaption></figure>
    </div>
    <div class="grid sm2">
      <div class="callout neutral" style="padding:10px 12px">${avatar('Vikram Nair', { size: 'sm' })}<p class="grow small"><b>Landlord:</b> ${o.ll}</p></div>
      <div class="callout neutral" style="padding:10px 12px">${avatar('Grace Mwangi', { size: 'sm' })}<p class="grow small"><b>Tenant:</b> ${o.tt}</p></div>
    </div>
    <div class="field"><span class="label">Your decision</span>${seg('d' + o.n, [{ id: 'a', label: 'Allow' }, { id: 'r', label: 'Reduce' }, { id: 'x', label: 'Reject' }], o.dec, 'block')}</div>
    <div class="callout ${o.tone}">${icon(o.icon, 20)}<div class="grow"><h4>${o.head}</h4><p>${o.why}</p><div class="cluster">${o.rules}</div></div></div>
  </div>
  <div class="card-foot"><span class="small muted">Awarded to landlord</span><b class="num">${money(o.award)}</b></div>
</section>`;

const dispute = {
  slug: 'dispute', nav: 'disputes', title: 'DSP-0093 · Deposit', sub: 'Lake Terrace 1204 · decide by Fri 27 Nov', back: 'disputes.html',
  body: () => `
<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top"><div><span class="eyebrow">Deposit dispute · opened 16 Nov 2026</span><h1 class="mt-1">Lake Terrace · Apt 1204</h1><p class="muted">Jumeirah Lake Towers · 2 bed · tenancy 15 Nov 2024 – 14 Nov 2026 (24 months)</p></div>${badge('Decision', 'warn', { dot: true, lg: true })}</div>
    <div class="grid g2 sm4 small">
      <div><div class="muted">Landlord</div><b>Vikram Nair</b></div><div><div class="muted">Tenant</div><b>Grace Mwangi</b></div>
      <div><div class="muted">Deposit held</div><b class="num">${money(6000)}</b></div><div><div class="muted">In dispute</div><b class="num t-warn">${money(1600)}</b></div>
    </div>
    ${lifecycle([{ label: 'Check-out', icon: 'clipboard-check' }, { label: 'Claim made', icon: 'flag' }, { label: 'Mediation', icon: 'message-circle' }, { label: 'Decision', icon: 'gavel' }, { label: 'Paid out', icon: 'banknote' }], 3)}
  </div>

  ${callout({ tone: 'ok', title: 'AED 4,150 already returned', body: 'The undisputed balance went back to Grace on 19 Nov, five days after check-out. Only the contested AED 1,850 is still held; she has accepted AED 250 of it.', rules: [rule('OR-101', '14-day return')] })}

  ${item({ id: 'i1', n: 1, title: 'Repaint living room and hall', claim: 1200, before: 'living-a', beforeDate: '15 Nov 2024', after: 'living-d', ll: '“Walls are marked and dull. It needs a full repaint before I can re-let.”', tt: '“Two years of normal living. I never painted or hung anything heavy. The scuff by the sofa is in the move-in report.”', dec: 'x', tone: 'danger', icon: 'circle-x', head: 'Rejected — fair wear and tear', why: 'Check-out photos show light scuffs and general fading, no stains, holes or colour change. Photo 7 of the move-in report already records the mark behind the sofa. After 24 months, repainting is an ordinary re-letting cost for the owner.', rules: rule('DXB-021', 'Art. 21'), award: 0 })}
  ${item({ id: 'i2', n: 2, title: 'Professional oven clean', claim: 250, before: 'kitchen-a', beforeDate: '15 Nov 2024', after: 'kitchen-b', ll: '“Oven was left with burnt-on grease. Invoice attached.”', tt: '“Fair enough — I ran out of time on the last day.”', dec: 'a', tone: 'ok', icon: 'circle-check', head: 'Allowed in full', why: 'Move-in report lists the oven as “as new”. Check-out photos 31–33 show heavy residue. The invoice is from an approved cleaner at the standard rate, and the tenant agrees.', rules: rule('DXB-021', 'Art. 21'), award: 250 })}
  ${item({ id: 'i3', n: 3, title: 'Replace bedroom roller blind', claim: 400, before: 'bedroom-a', beforeDate: '15 Nov 2024', after: 'bedroom-c', ll: '“The blind is torn at the bottom rail and will not retract. A new one is AED 400.”', tt: '“It jammed and tore when I pulled it. It was already stiff when I moved in.”', dec: 'r', tone: 'warn', icon: 'triangle-alert', head: 'Reduced to AED 200', why: 'The tear is damage, not wear. But the blind was installed in 2021 and noted as “stiff” at move-in, so the landlord cannot recover the price of a brand-new one. Half the replacement cost reflects its remaining life.', rules: rule('DXB-021', 'Art. 21'), award: 200 })}
</div>

<aside class="stack sticky-side">
  ${card({ title: 'Outcome', body: kv([['Deposit held at check-out', money(6000)], ['Returned on 19 Nov', '− AED 4,150'], ['Repaint', '<span class="t-danger">AED 0</span> of 1,200'], ['Oven clean', '<span class="t-ok">AED 250</span> of 250'], ['Roller blind', '<span class="t-warn">AED 200</span> of 400'], ['To landlord', money(450)], ['Further refund to tenant', money(1400)]], 'total') + `<div class="stack stack-sm mt-4">${btn('Issue decision letter', { variant: 'primary', block: true, icon: 'gavel', sheet: 'sheet-letter' })}${btn('Ask for more evidence', { block: true, icon: 'image', toast: 'Evidence request sent to both parties (demo)' })}</div>` })}
  ${card({ title: 'Evidence on file', flush: true, body: list([
    { icon: 'camera', tone: 'brand', title: 'Move-in report', sub: '92 photos · agreed by both, 18 Nov 2024', toast: 'Report opened (demo)', chev: true },
    { icon: 'camera', tone: 'brand', title: 'Check-out report', sub: '96 photos · Jun Reyes, 14 Nov 2026', toast: 'Report opened (demo)', chev: true },
    { icon: 'receipt-text', title: '3 landlord invoices / quotes', sub: 'Painter, cleaner, blinds supplier', toast: 'Files opened (demo)', chev: true },
    { icon: 'message-circle', title: 'Mediation thread', sub: '14 messages · 16–20 Nov', toast: 'Thread opened (demo)', chev: true },
  ]) })}
  ${callout({ tone: 'neutral', icon: 'landmark', title: 'If either side disagrees', body: 'They may file at the Rental Disputes Center. For this tenancy (AED 120,000 a year) the fee would be AED 4,200 — more than twice the amount in dispute. Half is refunded on settlement.', rules: [rule('DXB-RDC', 'RDC fee 3.5%')] })}
</aside>
</div>`,
  sheets: () => sheet('sheet-letter', 'Decision letter',
    `<div class="paper stack stack-sm" style="box-shadow:none">
       <div class="between"><span class="eyebrow">Decision DSP-0093</span><span class="ar small">قرار رقم ٠٠٩٣</span></div>
       <p><b>To:</b> Mr Vikram Nair (landlord) and Ms Grace Mwangi (tenant)<br><b>Re:</b> Security deposit, Apt 1204, Lake Terrace, JLT</p>
       <p>Having reviewed the agreed move-in report (18 Nov 2024), the check-out report (14 Nov 2026) and both parties’ statements, I decide that <b>AED 450</b> is payable to the landlord and <b>AED 1,400</b> is returned to the tenant.</p>
       <p><span class="clause-n">1.</span> Repainting — not allowed: fair wear and tear.<br><span class="clause-n">2.</span> Oven clean — allowed: AED 250.<br><span class="clause-n">3.</span> Roller blind — allowed in part: AED 200.</p>
       <p class="small muted">Layla Haddad · RERA BRN 61204 · openrent.me, ORN 31877. This decision does not limit either party’s right to apply to the Rental Disputes Center.</p>
     </div>
     <label class="checkline"><input type="checkbox" checked> Send in Arabic and English</label>
     <label class="checkline"><input type="checkbox" checked> Release both payments on sending</label>`,
    btn('Back', { attrs: { 'data-close': true } }) + btn('Sign & send', { variant: 'primary', icon: 'pen-line', toast: 'Decision sent · AED 450 and AED 1,400 released (demo)' })),
};

module.exports = [disputes, dispute];
