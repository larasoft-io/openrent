const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, cover, glass, facts, bar, timeline, lifecycle, avatar, money, sectionHead, sheet, stats, pageHead, tabs, panel, docIco, qr, field, choice, toggle, thumb, chips, table, stars, seg } = ui;
const { P, company } = require('../../lib/data');
const B = '../../';
const p2 = P.p2, p4 = P.p4;

/* ------------------------------------------------------------------ viewings */
const slot = (time, tone, title, sub, extra = '') => `<div class="slot"><time>${time}</time><div class="slot-card ${tone}"><div class="between-top"><b class="strong">${title}</b></div><div class="small muted mt-1">${sub}</div>${extra ? `<div class="cluster mt-2">${extra}</div>` : ''}</div></div>`;
const host = (who) => who === 'jun' ? `<span class="inline small">${avatar('Jun Reyes', { size: 'xs', tone: 'c5' })} Hosted by Jun · AED 99</span>` : `<span class="inline small">${avatar('Fatima Al Hashimi', { size: 'xs' })} You are hosting</span>`;

const viewings = {
  slug: 'viewings', nav: 'viewings', title: 'Viewings', sub: '6 booked this week',
  body: () => `
${pageHead({ title: 'Viewings', sub: 'Everyone who books has verified their ID first. Host yourself, or send a field agent for AED 99 a visit.', actions: btn('Offer new slots', { icon: 'plus', variant: 'primary', sheet: 'sheet-slots' }) })}

<div class="daystrip">${[['Mon', 23, 0, 0], ['Tue', 24, 1, 1], ['Wed', 25, 0, 1], ['Thu', 26, 0, 1], ['Fri', 27, 0, 0], ['Sat', 28, 0, 1], ['Sun', 29, 0, 0], ['Mon', 30, 0, 1]].map(([d, n, a, has]) => `<button type="button" class="day${a ? ' is-active' : ''}${has ? ' has' : ''}" data-toast="${d} ${n} Nov (demo)">${d}<b>${n}</b></button>`).join('')}</div>

<div class="split">
<div class="stack">
  <div class="hr-label">Today · Tue 24 Nov</div>
  ${slot('17:30', '', 'Daniela Costa — Bloom Towers 915', 'ID verified · moving from Al Barsha · wants to move in early December', host('jun') + badge('Confirmed', 'ok', { dot: true }))}
  ${slot('18:15', '', 'Omar Farouk — Bloom Towers 915', 'ID verified · relocating from Abu Dhabi in January', host('jun') + badge('Confirmed', 'ok', { dot: true }))}
  <div class="hr-label">Wed 25 Nov</div>
  ${slot('12:00', 'info', 'Li Wei — Bloom Towers 915', 'ID check still pending — the slot is released at 09:00 if it is not completed', host('me') + badge('Awaiting ID', 'warn'))}
  <div class="hr-label">Thu 26 Nov</div>
  ${slot('10:00', 'muted-card', 'Photo shoot — Burj Vista 3102', 'Professional photos and floor plan · Jun lets the photographer in', badge('Not a viewing'))}
  ${slot('18:00', 'info', 'Aditya Rao — Bloom Towers 915', 'ID verified · asked about a 13-month term', host('me') + badge('Confirmed', 'ok', { dot: true }))}
  <div class="hr-label">Sat 28 Nov</div>
  ${slot('10:30', '', 'Grace Mwangi — Bloom Towers 915', 'ID verified · first home in Dubai', host('jun') + badge('Confirmed', 'ok', { dot: true }))}
  ${slot('11:15', '', 'Tomás Herrera — Bloom Towers 915', 'ID verified · viewing with partner', host('jun') + badge('Confirmed', 'ok', { dot: true }))}
  <div class="hr-label">Mon 30 Nov</div>
  ${slot('10:00', 'warn', 'Check-out inspection — Al Ghozlan 412', 'Olena Kovalenko moves out · Jun compares against the move-in report', `<a class="link small" href="moveout.html">Open move-out</a>`)}

  ${card({ title: 'Feedback from last week', flush: true, body: list([
    { lead: avatar('Sofia Marchetti', { tone: 'c5' }), title: 'Sofia Marchetti', badge: stars(5), sub: '“Exactly like the photos. Loved the light and the pool view.” → made an offer', endSub: 'Thu 19' },
    { lead: avatar('Kwame Mensah', { tone: 'c2' }), title: 'Kwame Mensah', badge: stars(4), sub: '“Great condition. Would prefer to pay monthly.” → made an offer', endSub: 'Sat 21' },
    { lead: avatar('Rania Aziz', { tone: 'c4' }), title: 'Rania Aziz', badge: stars(3), sub: '“Nice, but I need a separate bedroom.”', endSub: 'Sat 21' },
    { lead: avatar('Peter Novak', { tone: 'c7' }), title: 'Peter Novak', badge: stars(4), sub: '“Asking if the rent is negotiable for one cheque.”', endSub: 'Sun 22' },
  ]) })}
</div>

<aside class="stack">
  <div class="grid g2">
    ${ui.stat({ label: 'This week', icon: 'calendar-days', value: '6', sub: '4 hosted · 2 by you' })}
    ${ui.stat({ label: 'Viewing → offer', icon: 'trending-up', value: '50%', sub: '2 offers from 4' })}
  </div>
  ${card({ title: 'Access for Bloom Towers 915', body: `${kv([['Entry', 'Smart lock · one-time code per viewing'], ['Today 17:30', '<span class="code">4 8 1 6 0 2</span>'], ['Today 18:15', '<span class="code">9 0 3 3 7 1</span>'], ['Building desk', 'Viewer list sent to security'], ['Spare key', 'Key safe with Jun Reyes']])}<p class="small muted mt-3">Codes work for 45 minutes from the slot time and are only shown to whoever is hosting.</p>` })}
  ${guard({ title: 'Viewing rules', checks: [
    { state: 'ok', title: 'Only verified people can book', sub: 'Emirates ID or passport is checked with UAE Pass before a slot is confirmed.' },
    { state: 'ok', title: 'The advert stays truthful', sub: 'Viewers see the permit number and QR code on the listing they booked from.', rule: rule('DXB-002', 'Advert permit') },
    { state: 'block', title: 'No holding deposits in cash', sub: 'Money only moves through the platform, once an offer is accepted.', rule: rule('OR-105', 'No hidden fees') },
  ] })}
  ${card({ title: 'Your field agent', body: `<div class="inline" style="gap:12px">${avatar('Jun Reyes', { size: 'lg', tone: 'c5' })}<div><b class="strong">Jun Reyes</b><div class="small muted">openrent.me field agent · 312 viewings hosted</div><div class="inline small mt-1">${stars(5)}<span class="muted">4.9</span></div></div></div><div class="btn-row mt-4">${btn('Message', { icon: 'message-circle', size: 'sm', href: 'messages.html' })}${btn('Brief Jun', { icon: 'notebook-pen', size: 'sm', toast: 'Viewing notes sent to Jun (demo)' })}</div>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-slots', 'Offer new viewing slots',
    `${field({ label: 'Property', type: 'select', options: ['Bloom Towers B · Studio 915', 'Burj Vista 1 · Apt 3102 (not live yet)'], value: 'Bloom Towers B · Studio 915' })}
     <div class="field"><span class="label">Day</span><div class="daystrip" style="margin:0;padding:2px 0">${[['Fri', 27, 1], ['Sat', 28], ['Sun', 29], ['Mon', 30], ['Tue', 1], ['Wed', 2]].map(([d, n, a]) => `<button type="button" class="day${a ? ' is-active' : ''}">${d}<b>${n}</b></button>`).join('')}</div></div>
     <div class="field"><span class="label">Times (30 minutes each)</span>${chips(['12:00', '12:45', '17:30', '18:15', '19:00', '19:45'], 2, 'wrap').replace('data-chips', 'data-chips data-multi')}</div>
     <div class="field"><span class="label">Who hosts?</span>${choice('host', 'I will be there', 'Free', false)}${choice('host', 'Send a field agent', 'AED 99 per viewing · charged only if the viewer turns up', true, { badge: badge('Popular', 'brand') })}</div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Publish slots', { variant: 'primary', toast: 'Slots published — enquirers have been notified' })),
};

/* ------------------------------------------------------------------ offers */
const vrow = (ic, label, result) => `<div class="between small" style="padding:7px 0;border-top:1px solid var(--line-2)"><span class="inline muted">${icon(ic, 15)}${label}</span><b class="t-ok inline">${result}${icon('check', 14)}</b></div>`;
const offerCard = o => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:12px">${avatar(o.name, { size: 'lg', tone: o.tone })}<div><b class="strong" style="font-size:16px">${o.name}</b><div class="small muted">${o.job}</div></div></div>${o.tag}</div>
  <div><div class="hero-num">${money(o.rent)}<small> / year</small></div><div class="small ${o.diff ? 't-warn' : 't-ok'} strong mt-1">${o.diffText}</div></div>
  ${kv([['Paid as', o.plan], ['Move-in', o.movein], ['Term', '12 months'], ['Living there', o.household], ['Deposit', 'AED 5,400 · 10% furnished']])}
  <div><div class="eyebrow mb-2">Verification results</div>
    ${vrow('fingerprint', 'Identity', 'UAE Pass matched')}${vrow('stamp', 'Residence visa', o.visa)}${vrow('briefcase', 'Rent to income', o.ratio)}${vrow('gauge', 'Credit (AECB)', o.credit)}${vrow('history', 'Rental history', o.history)}</div>
  <div class="btn-row">${btn('Decline', { size: 'sm', sheet: 'sheet-decline' })}${btn('Counter', { size: 'sm', icon: 'git-compare-arrows', sheet: 'sheet-counter' })}${btn('Accept', { size: 'sm', variant: 'primary', icon: 'check', sheet: o.sheet })}</div>
</div>`;

const offers = {
  slug: 'offers', nav: 'offers', title: 'Offers', sub: 'Bloom Towers 915 · 2 to review',
  body: () => `
${pageHead({ eyebrow: 'Asking AED 54,000 · live 14 days', title: 'Two offers on Bloom Towers studio', sub: 'Both applicants passed every check. You see the results of verification — never their documents — so you can compare like with like.' })}

<div class="grid lg2">
  ${offerCard({ name: 'Sofia Marchetti', tone: 'c5', job: 'Interior designer · in Dubai since 2023', tag: badge('Full asking rent', 'ok', { lg: true }), rent: 54000, diffText: 'At your asking rent', plan: '4 cheques of AED 13,500', movein: 'Tue 1 Dec 2026', household: '1 adult · no pets', visa: 'Valid to Mar 2028', ratio: '24%', credit: 'Good', history: '2 homes · no arrears', sheet: 'sheet-accept-a' })}
  ${offerCard({ name: 'Kwame Mensah', tone: 'c2', job: 'Software engineer · arrived Aug 2026', tag: badge('Pays monthly', 'brand', { lg: true }), rent: 52000, diff: true, diffText: 'AED 2,000 (3.7%) under asking', plan: '12 direct debits of AED 4,333.33', movein: 'Tue 15 Dec 2026', household: '1 adult · no pets', visa: 'Valid to Aug 2028', ratio: '18%', credit: 'Very good', history: 'First UAE tenancy', sheet: 'sheet-accept-b' })}
</div>

<div class="split">
<div class="stack">
  ${card({ title: 'Side by side', flush: true, body: table({ cols: [{ label: 'First-year view' }, { label: 'Sofia', r: true }, { label: 'Kwame', r: true }], rows: [
    ['<b>Annual rent</b>', 'AED 54,000', 'AED 52,000'],
    ['<b>Empty days before move-in</b>', '7 days', '21 days'],
    ['<b>Cost of those empty days</b>', '− AED 1,036', '− AED 3,107'],
    ['<b>Collect.me fee</b>', 'AED 0 · cheques', '− AED 520 · 1%'],
    ['<b>Cash in first 30 days</b>', 'AED 13,500', 'AED 4,333'],
    ['<b>First-year income after costs</b>', '<b class="t-ok">AED 52,964</b>', '<b>AED 48,373</b>'],
    ['<b>Income cover (rent ÷ income)</b>', '24%', '<b class="t-ok">18%</b>'],
  ] }), foot: `<span class="small muted">Empty days priced at AED 148 a day (asking rent ÷ 365).</span>` })}

  ${card({ title: 'What happens when you accept', body: timeline([
    { state: 'now', icon: 'check', title: 'You accept one offer', body: 'The other applicant is told politely and can stay on a waiting list for 48 hours.' },
    { icon: 'file-signature', title: 'Contract is built from the agreed terms', body: 'Every clause is checked against the ruleset before either side can sign.' },
    { icon: 'lock-keyhole', title: 'Deposit and first payment are collected', body: 'The deposit goes to the safeguarded client account, not to you.' },
    { icon: 'file-badge', title: 'We register Ejari and close the advert', body: 'The Trakheesi permit is closed the same day.' },
    { icon: 'key-round', title: 'Move-in inspection and keys', body: 'Photo report agreed by both sides.' },
  ]) })}
</div>
<aside class="stack">
  ${guard({ title: 'Choosing fairly', sub: 'What the platform will and will not let through', checks: [
    { state: 'ok', title: 'Decide on verified facts', sub: 'Affordability, credit and rental history are shown for every applicant in the same format.' },
    { state: 'block', title: 'No extra payments', sub: '“Key money”, admin fees or commission cannot be requested from an applicant.', rule: rule('OR-105', 'No hidden fees') },
    { state: 'block', title: 'Deposit cannot go above AED 5,400', sub: '10% of rent for a furnished home, held in the client account.', rule: rule('OR-101', 'Deposit standard') },
    { state: 'info', title: 'Monthly is the same rent, not a discount', sub: 'Kwame’s lower figure is his offer — not a penalty or premium for paying monthly.', rule: rule('DXB-PAY', 'Payment terms') },
    { state: 'info', title: 'Occupants are declared', sub: 'Each applicant has named everyone who will live there.', rule: rule('DXB-OCC', 'Co-occupants') },
  ] })}
  ${callout({ tone: 'neutral', icon: 'clock', title: 'Offers stay open until Thu 26 Nov, 18:00', body: 'After that applicants are free to withdraw. Four more viewings are booked this week if you would rather wait.', actions: `<a class="link small" href="viewings.html">See viewings</a>` })}
</aside>
</div>`,
  sheets: () => {
    const accept = (id, name, rent, plan, movein) => sheet(id, `Accept ${name.split(' ')[0]}’s offer`,
      `${kv([['Tenant', name], ['Rent', money(rent) + ' / year'], ['Paid as', plan], ['Move-in', movein], ['Deposit', 'AED 5,400 · safeguarded'], ['Let.me fee', 'AED 899 + VAT · charged at signing']])}
       ${callout({ tone: 'brand', body: 'Accepting is not yet a contract. It reserves the home for 5 days while both of you review and sign the unified tenancy contract.', rules: [rule('DXB-001', 'Written contract')] })}`,
      btn('Back', { attrs: { 'data-close': true } }) + btn('Accept offer', { variant: 'primary', toast: `Offer accepted — contract drafted for ${name.split(' ')[0]} (demo)` }));
    return accept('sheet-accept-a', 'Sofia Marchetti', 54000, '4 cheques of AED 13,500', 'Tue 1 Dec 2026')
      + accept('sheet-accept-b', 'Kwame Mensah', 52000, '12 direct debits', 'Tue 15 Dec 2026')
      + sheet('sheet-counter', 'Counter-offer',
        `<div class="field"><label for="cr">Your counter</label><div class="between"><span class="hero-num">AED <span data-out="cr">53,000</span></span><span class="muted small">per year</span></div><input class="range" type="range" id="cr" min="50000" max="54000" step="250" value="53000"><div class="between micro muted"><span>50,000</span><span>Asking 54,000 — cannot counter above your advert</span></div></div>
         <div class="field"><span class="label">Move-in no later than</span>${seg('mi', [{ id: '1', label: '1 Dec' }, { id: '8', label: '8 Dec' }, { id: '15', label: '15 Dec' }], '8', 'block')}</div>
         <div class="field"><span class="label">Payment plan</span>${seg('pl', [{ id: '12', label: 'Monthly' }, { id: '4', label: '4 cheques' }, { id: '2', label: '2 cheques' }], '12', 'block')}</div>
         ${field({ label: 'Message (optional)', type: 'textarea', value: 'Happy with monthly payments if you can start a week earlier.' })}`,
        btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send counter', { variant: 'primary', toast: 'Counter-offer sent (demo)' }))
      + sheet('sheet-decline', 'Decline this offer',
        `<p class="small muted">The applicant sees a short, neutral message. Your reason is kept on file in case of a complaint.</p>
         ${choice('dc', 'I accepted another offer', '', true)}${choice('dc', 'Rent offered is too low', '', false)}${choice('dc', 'Move-in date does not work', '', false)}${choice('dc', 'Payment plan does not work for me', '', false)}
         ${callout({ tone: 'neutral', icon: 'scale', body: 'Reasons based on nationality, religion, gender, family status or disability are not offered here and are not a lawful basis to refuse.' })}`,
        btn('Cancel', { attrs: { 'data-close': true } }) + btn('Decline offer', { variant: 'primary', toast: 'Offer declined — applicant notified (demo)' }));
  },
};

/* ------------------------------------------------------------------ contract */
const term = (o) => `<div class="row" style="align-items:flex-start"><span class="row-ico ${o.tone || 'brand'}">${icon(o.icon, 20)}</span><div class="row-main">
  <div class="row-title">${o.title}${o.badge}</div>
  <div class="row-sub"><b class="strong" style="color:var(--ink)">${o.setting}</b></div>
  <div class="row-sub"><span class="micro strong" style="letter-spacing:.07em;text-transform:uppercase;color:var(--brand-ink)">The rule</span> · ${o.floor}</div>
  ${o.extra || ''}
  <div class="cluster mt-2">${o.rules.join('')}</div>
</div></div>`;
const cheque = (n, date, state = 'held') => `<div class="cheque"><div class="ch-top"><span>Emirates NBD</span><span>No. 00014${n}</span></div><div><div class="micro muted">Pay Fatima Al Hashimi</div><div class="ch-amt">AED 33,750</div></div><div class="between small"><span class="muted">Dated</span><b>${date}</b></div><div class="ch-micr">⑆00014${n}⑆ 026 ⑈1017704417⑈</div><span class="stamp held">In custody</span></div>`;

const contract = {
  slug: 'contract', nav: 'contract', title: 'Contract', sub: 'Executive Towers 1807 · awaiting your signature',
  body: () => `
<div class="card pad stack">
  <div class="between-top"><div class="inline" style="gap:12px">${thumb(p4.img, 'lg', B)}<div><span class="eyebrow">Tenancy contract · TC-2611-0193</span><h1 style="font-size:22px" class="mt-1">${p4.name}</h1><p class="small muted">${p4.area} · 2 bed · unfurnished</p></div></div></div>
  <div class="cluster">${badge('Tenant signed 23 Nov', 'ok', { icon: 'check', lg: true })}${badge('Awaiting your signature', 'accent', { dot: true, lg: true })}</div>
  ${lifecycle([{ label: 'Terms agreed' }, { label: 'Tenants signed' }, { label: 'You sign', icon: 'pen-line' }, { label: 'Deposit & cheques', icon: 'lock-keyhole' }, { label: 'Ejari', icon: 'file-badge' }, { label: 'Move-in', icon: 'key-round' }], 2)}
</div>

<div class="split">
<div class="stack">
  ${tabs('ct', [{ id: 'terms', label: 'Terms' }, { id: 'paper', label: 'Contract' }, { id: 'cheques', label: 'Cheques', n: 4 }], 'terms')}

  ${panel('ct', 'terms', `
  <div class="card"><div class="list">
    ${term({ icon: 'banknote', title: 'Rent and payment plan', badge: badge('Agreed', 'ok'), setting: 'AED 135,000 a year · 4 cheques of AED 33,750', floor: 'No minimum number of cheques; the plan must be written into the contract.', rules: [rule('DXB-PAY', 'Payment terms')] })}
    ${term({ icon: 'lock-keyhole', title: 'Security deposit', badge: badge('At the cap', 'warn'), setting: 'AED 6,750 · 5% of annual rent', floor: 'Cap for an unfurnished home is 5%. Held in the client account and returned within 14 days.', rules: [rule('OR-101', 'Deposit standard'), rule('DXB-020', 'Art. 20')] })}
    ${term({ icon: 'wrench', title: 'Small repairs paid by the tenant', badge: badge('Platform standard'), setting: `Up to AED <span data-out="thr">500</span> per item`, floor: 'Ceiling is AED 500. You can lower it for the tenant’s benefit; you cannot raise it.', extra: `<div class="mt-2"><input class="range" type="range" id="thr" min="0" max="500" step="50" value="500" aria-label="Small repairs threshold"><div class="between micro muted"><span>AED 0 · you cover everything</span><span>AED 500 · maximum</span></div></div>`, rules: [rule('OR-103', 'Small repairs')] })}
    ${term({ icon: 'door-open', title: 'Early exit for the tenant', badge: badge('Platform standard'), setting: '60 days’ notice + 2 months’ rent', floor: 'The law gives no exit right; the platform requires at least this. Offer better with one tap.', extra: `<div class="mt-2">${seg('brk', [{ id: '2', label: '2 months' }, { id: '1', label: '1 month' }, { id: '0', label: 'No charge' }], '2')}</div>`, rules: [rule('OR-102', 'Fair way out')] })}
    ${term({ icon: 'hourglass', title: 'Notice to change terms at renewal', badge: badge('Legal minimum'), setting: '90 days before expiry', floor: 'At least 90 days unless both sides agree otherwise. For this tenancy the cut-off will be Sun 5 Sep 2027.', rules: [rule('DXB-014', '90 days')] })}
    ${term({ icon: 'hammer', title: 'Maintenance of the home', badge: badge('Fixed by law', 'brand', { icon: 'lock' }), setting: 'You maintain the home: structure, AC plant, plumbing, electrics', floor: 'This clause is locked. It cannot be moved to the tenant.', rules: [rule('DXB-016', 'Art. 16')] })}
    ${term({ icon: 'users', title: 'Who lives there, and subletting', badge: badge('Fixed by law', 'brand', { icon: 'lock' }), setting: 'Whole-unit let to Arjun and Neha Mehta + 1 child · no sublet without written consent', floor: 'Rooms and bed spaces cannot be let by the tenant. Occupants are registered against the Ejari.', rules: [rule('DXB-024', 'Art. 24'), rule('DXB-S04', 'Shared housing'), rule('DXB-OCC', 'Co-occupants')] })}
    ${term({ icon: 'thermometer-snowflake', tone: 'accent', title: 'AC service once a year', badge: badge('Better than law', 'accent', { icon: 'plus' }), setting: 'Included at your cost each April', floor: 'Not required — you added this.', rules: [] })}
  </div></div>

  ${sectionHead('Your own clauses')}
  <div class="card"><div class="list">
    <div class="row" style="align-items:flex-start"><span class="row-ico ok">${icon('circle-check', 20)}</span><div class="row-main"><div class="row-title">“No smoking inside the apartment.”${badge('Allowed', 'ok')}</div><div class="row-sub">Added as Additional Term 3 in Arabic and English.</div></div></div>
    <div class="row" style="align-items:flex-start;background:var(--danger-soft)"><span class="row-ico danger">${icon('octagon-x', 20)}</span><div class="row-main"><div class="row-title">“Tenant is responsible for all AC and plumbing repairs.”${badge('Blocked', 'danger')}</div><div class="row-sub" style="color:#74201B">This would move the landlord’s legal maintenance duty to the tenant, so it was not added to the contract.</div><div class="row-sub" style="color:#74201B"><b>Use instead:</b> the small-repairs threshold above — up to AED 500 per item.</div><div class="cluster mt-2">${rule('DXB-016', 'Art. 16')}${rule('OR-103', 'Small repairs')}</div></div></div>
    <button type="button" class="row" data-sheet="sheet-clause"><span class="row-ico">${icon('plus', 20)}</span><div class="row-main"><div class="row-title">Add a clause</div><div class="row-sub">Checked against the ruleset before it can be saved</div></div><span class="row-chev">${icon('chevron-right', 18)}</span></button>
  </div></div>`, true)}

  ${panel('ct', 'paper', `
    <div class="paper stack stack-sm">
      <div class="between"><span class="eyebrow">Unified Tenancy Contract</span><span class="ar small">عقد إيجار موحد</span></div>
      <h3>Tenancy Contract · <span class="ar">عقد الإيجار</span></h3>
      <div class="bi"><div><span class="clause-n">Landlord</span><br>Fatima Al Hashimi</div><div class="ar"><span class="clause-n">المؤجر</span><br>فاطمة الهاشمي</div></div>
      <div class="bi"><div><span class="clause-n">Tenants</span><br>Arjun Mehta and Neha Mehta</div><div class="ar"><span class="clause-n">المستأجران</span><br>أرجون ميهتا ونيها ميهتا</div></div>
      <div class="bi"><div><span class="clause-n">Property</span><br>Apt 1807, Executive Towers K, Business Bay · Residential</div><div class="ar"><span class="clause-n">العقار</span><br>شقة ١٨٠٧، الأبراج التنفيذية ك، الخليج التجاري · سكني</div></div>
      <div class="bi"><div><span class="clause-n">Period</span><br>From 5 Dec 2026 to 4 Dec 2027</div><div class="ar"><span class="clause-n">المدة</span><br>من ٥ ديسمبر ٢٠٢٦ إلى ٤ ديسمبر ٢٠٢٧</div></div>
      <div class="bi"><div><span class="clause-n">Annual rent</span><br>AED 135,000 in four cheques</div><div class="ar"><span class="clause-n">الإيجار السنوي</span><br>١٣٥٬٠٠٠ درهم على أربعة شيكات</div></div>
      <div class="bi"><div><span class="clause-n">Security deposit</span><br>AED 6,750, held by the broker in a client account</div><div class="ar"><span class="clause-n">مبلغ التأمين</span><br>٦٬٧٥٠ درهم، يُحفظ لدى الوسيط في حساب العملاء</div></div>
      <div class="bi"><div><span class="clause-n">Additional term 3</span><br>No smoking inside the apartment.</div><div class="ar"><span class="clause-n">شرط إضافي ٣</span><br>يُمنع التدخين داخل الشقة.</div></div>
      <div class="between small muted" style="padding-top:10px;border-top:1px solid var(--line-2)"><span class="inline">${icon('pen-line', 14)} Tenants signed with UAE Pass · 23 Nov 2026, 21:14</span><span>Page 1 of 6</span></div>
    </div>
    <div class="btn-row">${btn('Download draft PDF', { icon: 'download', toast: 'Draft contract downloaded (demo)' })}${btn('View all 6 pages', { icon: 'file-text', toast: 'Full contract viewer (demo)' })}</div>`)}

  ${panel('ct', 'cheques', `
    ${callout({ tone: 'neutral', icon: 'vault', title: 'Cheques are held for you, not handed over', body: 'The Mehtas’ four post-dated cheques were scanned and lodged at our Business Bay office on 23 Nov. Each is deposited on its date and the money is paid out to you the day after it clears.' })}
    <div class="grid sm2">${cheque(1, '5 Dec 2026')}${cheque(2, '5 Mar 2027')}${cheque(3, '5 Jun 2027')}${cheque(4, '5 Sep 2027')}</div>
    ${card({ body: kv([['Cheque 1 — with move-in', money(33750)], ['Cheque 2', money(33750)], ['Cheque 3', money(33750)], ['Cheque 4', money(33750)], ['Annual rent', money(135000)]], 'total') })}`)}

  <div class="sticky-cta">${btn('Ask Layla', { icon: 'message-circle', href: 'messages.html' })}${btn('Review & sign', { variant: 'primary', icon: 'fingerprint', sheet: 'sheet-sign' })}</div>
</div>

<aside class="stack">
  ${guard({ title: 'This contract passes 14 of 14 checks', sub: 'Ruleset Dubai 2026.3 · new-tenancy rules applied', checks: [
    { state: 'ok', title: 'Nothing is below the legal minimum', sub: '8 statutory rules checked clause by clause.' },
    { state: 'ok', title: 'Platform standards met', sub: 'Deposit, early exit, repairs and emergency response.' },
    { state: 'block', title: '1 clause was blocked and left out', sub: 'Shifting AC and plumbing repairs to the tenant.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'plus', title: '1 term better than required', sub: 'Annual AC service at your cost.' },
  ] })}

  ${card({ title: 'Tenants', flush: true, body: list([
    { lead: avatar('Arjun Mehta', { tone: 'c2' }), title: 'Arjun Mehta', sub: 'Finance director · lead tenant', endBadge: badge('Signed', 'ok') },
    { lead: avatar('Neha Mehta', { tone: 'c5' }), title: 'Neha Mehta', sub: 'Paediatric dentist · joint tenant', endBadge: badge('Signed', 'ok') },
  ]) + `<div class="card-body" style="padding-top:4px"><div class="grid g2 small"><div><div class="muted">Rent to income</div><b class="t-ok">21%</b></div><div><div class="muted">Credit (AECB)</div><b class="t-ok">Very good</b></div></div></div>` })}

  ${card({ title: 'After you sign', body: timeline([
    { state: 'done', title: 'Tenants signed', when: 'Mon 23 Nov, 21:14' },
    { state: 'now', icon: 'pen-line', title: 'You sign with UAE Pass', when: 'Today' },
    { icon: 'lock-keyhole', title: 'Deposit of AED 6,750 moves to the client account', body: 'Already paid by the tenants and waiting in escrow.' },
    { icon: 'file-badge', title: 'openrent.me registers Ejari', body: 'Within 1 working day. No Ejari, no keys.', extra: rule('DXB-001', 'Ejari') },
    { icon: 'zap', title: 'Tenants activate DEWA', body: 'They need the Ejari number to do it.' },
    { icon: 'camera', title: 'Move-in inspection', body: 'Jun Reyes · Sat 5 Dec, 09:00', when: 'Sat 5 Dec' },
    { icon: 'key-round', title: 'Keys handed over · cheque 1 deposited', when: 'Sat 5 Dec' },
  ]) })}

  ${card({ title: 'Your cost for this let', body: kv([['Let.me — verification, contract, Ejari', money(899)], ['VAT 5%', 'AED 44.95'], ['Commission', '<span class="t-ok">AED 0</span>'], ['Charged at signing', 'AED 943.95']], 'total') + `<p class="small muted mt-3">A 5% agency fee on this rent would be AED 6,750 + VAT.</p>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-sign', 'Sign the tenancy contract',
    `${kv([['Property', p4.name], ['Tenants', 'Arjun & Neha Mehta'], ['Term', '5 Dec 2026 – 4 Dec 2027'], ['Rent', 'AED 135,000 · 4 cheques'], ['Deposit', 'AED 6,750 · safeguarded']])}
     <label class="checkline"><input type="checkbox" checked> I have read all 6 pages, including 3 additional terms.</label>
     <label class="checkline"><input type="checkbox" checked> I understand one clause I proposed was not included because it conflicts with Art. 16.</label>
     ${callout({ tone: 'brand', icon: 'fingerprint', body: 'Approve the signature in UAE Pass. We then register the tenancy in Ejari — the tenancy only becomes active, and rent is only released, once the certificate number is on file.', rules: [rule('DXB-001', 'Ejari')] })}`,
    btn('Not yet', { attrs: { 'data-close': true } }) + btn('Sign with UAE Pass', { variant: 'primary', icon: 'fingerprint', toast: 'Signed. Ejari registration started (demo)' }))
  + sheet('sheet-clause', 'Add a clause',
    `${field({ label: 'Your clause (English — we add the Arabic)', type: 'textarea', value: 'The landlord may enter the property at any time to inspect it.' })}
     ${callout({ tone: 'danger', title: 'This wording cannot be added', body: 'A landlord must not interfere with the tenant’s use of the home. Access needs the tenant’s agreement except in an emergency.', rules: [rule('DXB-034', 'Art. 34')] })}
     ${callout({ tone: 'ok', title: 'Suggested wording that passes', body: '“The landlord may inspect the property with at least 48 hours’ written notice, at a time agreed with the tenant, no more than twice a year.”' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Use suggested wording', { variant: 'primary', toast: 'Clause added as Additional Term 4 — tenants will be asked to re-confirm (demo)' })),
};

module.exports = [viewings, offers, contract];
