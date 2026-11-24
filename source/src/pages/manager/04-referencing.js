const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, field, choice, table, bar } = ui;

const ck = (state, title, sub) => `<div class="check ${state === 'ok' ? '' : state}"><span class="ck">${icon({ ok: 'check', warn: 'triangle-alert', block: 'x', info: 'hourglass' }[state], 13)}</span><div class="grow"><b>${title}</b><span>${sub}</span></div></div>`;
const applicant = (o) => `<div class="card stack" style="gap:0;overflow:hidden">
  <div class="card-body stack stack-md" style="padding-bottom:12px">
    <div class="between-top"><div class="inline" style="gap:12px">${avatar(o.name, { size: 'lg' })}<div><b class="strong" style="font-size:16px">${o.name}</b><div class="small muted">${o.job}</div></div></div>${o.badge}</div>
    <div class="between small"><span class="muted">${o.prop}</span><b class="num nowrap">${o.rent}</b></div>
  </div>
  <div class="checks" style="border-top:1px solid var(--line-2)">${o.checks.join('')}</div>
  <div class="card-foot">${o.foot}</div>
</div>`;

const referencing = {
  slug: 'referencing', nav: 'referencing', title: 'Referencing', sub: '2 need a decision',
  body: () => `
${pageHead({ title: 'Tenant referencing', sub: 'Five checks, mostly automatic. You step in when the answer is not a clean yes — and the landlord only ever sees the result.', actions: btn('Policy', { icon: 'book-open-check', size: 'sm', sheet: 'sheet-policy' }) })}
${stats([
  { label: 'In progress', icon: 'hourglass', value: '6', sub: '4 fully automatic' },
  { label: 'Need my decision', icon: 'user-search', value: '2', sub: '1 overdue' },
  { label: 'Median completion', icon: 'timer', value: '9', unit: 'hours', delta: '2 h', deltaDir: 'down', sub: 'faster' },
  { label: 'Pass rate', icon: 'user-check', value: '91', unit: '%', sub: '6% pass with conditions' },
])}
${tabs('ref', [{ id: 'mine', label: 'Needs my review', n: 2 }, { id: 'run', label: 'In progress', n: 4 }, { id: 'done', label: 'Completed' }], 'mine')}

<div class="split">
<div class="stack">
${panel('ref', 'mine', `
  ${applicant({ name: 'Tomás Herrera', job: 'Freelance motion designer · Dubai Media City freelance permit', prop: 'Creek Vista 1510 · Chen Wei', rent: 'AED 98,000', badge: badge('1 day late', 'danger', { dot: true }), checks: [
    ck('ok', 'Identity — UAE Pass', 'Emirates ID matched · liveness passed 19 Nov'),
    ck('ok', 'Right to reside through the term', 'Visa valid to 30 Mar 2028 · term ends 30 Nov 2027'),
    ck('warn', 'Affordability — rent is 38% of income', 'Self-employed: 6 months of bank statements average AED 21,500 a month. Guideline is 35%.'),
    ck('warn', 'Credit — AECB band “Fair”', 'One late card payment in Aug 2024, since cleared. No returned cheques.'),
    ck('info', 'Previous landlord', 'Requested Fri 20 Nov · two reminders · no reply (landlord abroad)'),
  ], foot: `<span class="small muted">Suggested: pass with conditions</span>${btn('Decide', { variant: 'primary', size: 'sm', sheet: 'sheet-decide' })}` })}
  ${applicant({ name: 'Bongani Dlamini', job: 'Site engineer · Al Reem Contracting · joined Oct 2026', prop: 'Park Heights 2 · 608 · Sophie Laurent', rent: 'AED 112,000', badge: badge('Due Wed', 'warn', { dot: true }), checks: [
    ck('ok', 'Identity — UAE Pass', 'Emirates ID matched 21 Nov'),
    ck('ok', 'Right to reside through the term', 'Visa valid to 11 Oct 2028'),
    ck('ok', 'Affordability — rent is 29% of income', 'Salary certificate AED 32,000 a month · employer confirmed by phone'),
    ck('warn', 'Credit — no file yet', 'New to the UAE: AECB has less than 3 months of history. Not a negative, but not a pass.'),
    ck('ok', 'Previous landlord (Johannesburg)', 'Letter received · 4 years, rent always on time'),
  ], foot: `<span class="small muted">Suggested: pass · monthly direct debit</span>${btn('Decide', { variant: 'primary', size: 'sm', sheet: 'sheet-decide' })}` })}`, true)}

${panel('ref', 'run', `<div class="card">${list([
    { lead: avatar('Aiko Tanaka'), title: 'Aiko Tanaka', sub: 'Lake Terrace 2 · 908 · 4 of 5 checks passed · AECB report expected in ~2 hours', extra: `<div class="mt-2">${bar(80, 'ok', true)}</div>`, endBadge: badge('Automatic') },
    { lead: avatar('Carlos Mendes'), title: 'Carlos & Inês Mendes', sub: 'Villa 22, Al Barsha 2 · joint application · waiting for Inês’s employer', extra: `<div class="mt-2">${bar(70, 'ok', true)}</div>`, endBadge: badge('Automatic') },
    { lead: avatar('Elena Petrova'), title: 'Elena Petrova', sub: 'Shoreline 7 · 105 · company lease — trade licence and signatory check running', extra: `<div class="mt-2">${bar(40, '', true)}</div>`, endBadge: badge('Corporate', 'info') },
    { lead: avatar('Mohammed Al Amin'), title: 'Mohammed Al Amin', sub: 'Bay Square 7 · 1204 · invited, has not started', extra: `<div class="mt-2">${bar(5, '', true)}</div>`, endBadge: badge('Invited') },
  ])}</div>
  ${callout({ tone: 'neutral', icon: 'megaphone', title: 'Bloom Towers B · Studio 915', body: 'Both applicants on Fatima’s JVC studio finished referencing yesterday. Their results — not their documents — are on her offers page.' })}`)}

${panel('ref', 'done', `<div class="card">${table({ cols: [{ label: 'Applicant' }, { label: 'Property' }, { label: 'Result' }, { label: 'Decided by' }, { label: 'Completed', r: true }], rows: [
    [`<div class="cell">${avatar('Arjun Mehta', { size: 'sm' })}<b>Arjun & Neha Mehta</b></div>`, 'Executive Towers 1807', badge('Pass', 'ok'), 'Automatic · confirmed by Layla', 'Fri 20 Nov'],
    [`<div class="cell">${avatar('Nour Khalil', { size: 'sm' })}<b>Nour Khalil</b></div>`, 'Bay Square 7 · 903', badge('Pass', 'ok'), 'Automatic', 'Tue 17 Nov'],
    [`<div class="cell">${avatar('Park Ji-ho', { size: 'sm' })}<b>Park Ji-ho & Kim Soo-ah</b></div>`, 'Maple 2 · TH 41', badge('Pass with conditions', 'gold'), 'Layla Haddad · quarterly cheques', 'Mon 16 Nov'],
    [`<div class="cell">${avatar('Liam OConnor', { size: 'sm' })}<b>Liam & Aoife O’Connor</b></div>`, 'Arabella 3 · TH 88', badge('Pass', 'ok'), 'Automatic', 'Thu 12 Nov'],
    [`<div class="cell">${avatar('Viktor Sokolov', { size: 'sm' })}<b>Viktor Sokolov</b></div>`, 'Lake Terrace 2 · 1711', badge('Declined', 'danger'), 'Omar Farouk · identity mismatch', 'Mon 9 Nov'],
  ] })}</div>`)}
</div>

<aside class="stack">
  ${card({ title: 'What the landlord sees', headEnd: badge('Preview', 'outline'), body: `<div class="stack stack-sm">
    <div class="inline" style="gap:10px">${avatar('Tomás Herrera')}<div><b class="strong">Tomás H.</b><div class="small muted">Verified applicant</div></div></div>
    ${kv([['Identity', '<span class="t-ok">Verified</span>'], ['Right to reside', '<span class="t-ok">Covers the full term</span>'], ['Affordability', 'Moderate'], ['Credit', 'Fair'], ['Rental history', 'Not available'], ['openrent.me view', badge('Pass with conditions', 'gold')]])}
    <p class="small muted">No salary figure, bank statement, passport, nationality or employer name is ever shown.</p></div>` })}
  ${guard({ title: 'Guardrails on referencing', checks: [
    { state: 'ok', title: 'Results, not documents', sub: 'Applicants’ files stay with openrent.me under UAE data-protection law (PDPL) and are deleted 90 days after an unsuccessful application.' },
    { state: 'ok', title: 'Decide on verified facts only', sub: 'Nationality, religion, gender and family status are not criteria and cannot be entered as a reason.' },
    { state: 'ok', title: 'Identity confirmed before any contract', rule: rule('DXB-003', 'Identity') },
    { state: 'info', title: 'Applicants can ask why', sub: 'Every decision carries a reason code and a right to a human review.' },
  ] })}
</aside>
</div>`,
  sheets: () => sheet('sheet-decide', 'Referencing decision',
    `<p class="small muted">Tomás Herrera · Creek Vista 1510 · AED 98,000</p>
     ${choice('dec', 'Pass', 'All five checks satisfied', false)}
     ${choice('dec', 'Pass with conditions', 'Recommend safeguards to the landlord', true, { badge: badge('Suggested', 'brand') })}
     ${choice('dec', 'Refer for second review', 'Another manager looks within 1 working day', false)}
     ${choice('dec', 'Decline', 'A reason code is required and shared with the applicant', false)}
     <div class="field"><span class="label">Conditions</span>
       <label class="checkline"><input type="checkbox" checked> Monthly direct debit instead of cheques</label>
       <label class="checkline"><input type="checkbox"> Guarantor (UAE resident)</label>
       <label class="checkline"><input type="checkbox" checked> Note on file: previous-landlord reference unavailable</label></div>
     ${field({ label: 'Reason shown to the landlord', type: 'select', options: ['Affordability slightly above guideline', 'Limited credit history', 'Reference not available', 'Other (verified fact)'], value: 'Affordability slightly above guideline' })}
     ${callout({ tone: 'neutral', body: 'A higher deposit is not offered as a condition — deposits are capped at 5% (10% furnished).', rules: [rule('OR-101', 'Deposit cap')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Record decision', { variant: 'primary', toast: 'Decision recorded · Chen Wei and Tomás notified (demo)' }))
  + sheet('sheet-policy', 'Referencing policy',
    `${kv([['Identity', 'UAE Pass or Emirates ID + liveness'], ['Right to reside', 'Visa covers the term, or renewal evidence'], ['Affordability', 'Rent ≤ 35% of verified income'], ['Credit', 'AECB band Good or better · no returned cheques in 24 months'], ['History', 'Previous landlord or 12 months of rent payments']])}
     ${callout({ tone: 'brand', body: 'Anything short of a clean pass comes to a licensed manager. Automatic declines do not exist.' })}`,
    btn('Close', { attrs: { 'data-close': true } })),
};

module.exports = [referencing];
