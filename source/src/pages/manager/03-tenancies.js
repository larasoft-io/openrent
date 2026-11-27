const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, avatars, money, pageHead, sheet, tabs, panel, stats, thumb, cover, glass, lifecycle, table, field, timeline, chips, docIco, bar } = ui;
const { P } = require('../../lib/data');
const { B } = require('./lib/h');

const kc = (o) => `<${o.href ? `a href="${o.href}"` : 'div'} class="kcard">
  <div class="between"><b>${o.title}</b>${o.flag || ''}</div>
  <div class="small muted">${o.who}</div>
  <div class="between small"><span class="inline">${icon(o.icon || 'arrow-right', 14)}${o.next}</span><span class="muted nowrap">${o.when || ''}</span></div>
  <div class="inline micro muted">${avatar(o.owner, { size: 'xs' })}${o.owner}</div>
</${o.href ? 'a' : 'div'}>`;
const col = (title, n, cards, more) => `<div class="kcol"><div class="kcol-head"><span>${title}</span><span class="pill-num" style="background:var(--surface);color:var(--ink-2);min-width:24px;height:22px;font-size:11.5px">${n}</span></div>${cards.join('')}${more ? `<button type="button" class="btn sm ghost" data-toast="Showing all ${n} (demo)">+ ${more} more</button>` : ''}</div>`;
const F = 'Fatima Al Hashimi';

const tenancies = {
  slug: 'tenancies', nav: 'tenancies', title: 'Tenancies', sub: '142 in your book',
  body: () => `
${pageHead({ title: 'Tenancy pipeline', sub: 'Every tenancy you manage, from accepted offer to deposit returned. Swipe across the board; cards with a flag need you.', actions: btn('Export', { icon: 'download', size: 'sm', toast: 'Pipeline exported (demo)' }) })}
${stats([
  { label: 'Onboarding', icon: 'file-signature', value: '14', sub: '2 move in this week' },
  { label: 'Active', icon: 'house', value: '115', sub: '3 with a flag' },
  { label: 'Renewal window', icon: 'refresh-cw', value: '9', sub: '3 cut-offs this week' },
  { label: 'Moving out', icon: 'package', value: '4', sub: 'AED 21,900 deposits held' },
])}
${chips(['All landlords', ['Fatima Al Hashimi', 7], ['Flagged', 5], ['Moving this week', 2], 'Mine only'])}
${tabs('tv', [{ id: 'board', label: 'Board' }, { id: 'list', label: 'List' }], 'board')}

${panel('tv', 'board', `<div class="kanban">
  ${col('Offer accepted', 2, [
    kc({ title: P.p2.short, who: '2 verified offers · asking AED 54,000', icon: 'hand-coins', next: 'Landlord to choose', when: 'since Mon', owner: F, flag: badge('2 offers', 'info') }),
    kc({ title: 'Bay Square 7 · 1204', who: 'Mohammed Al Amin · AED 91,000', icon: 'send', next: 'Referencing invite sent', when: 'today', owner: 'Rania Aziz' }),
  ])}
  ${col('Referencing', 5, [
    kc({ title: 'Creek Vista 1510', who: 'Tomás Herrera · AED 98,000', icon: 'user-search', next: 'Your decision', when: '1 day late', owner: 'Chen Wei', flag: badge('Late', 'danger') }),
    kc({ title: 'Park Heights 2 · 608', who: 'Bongani Dlamini · AED 112,000', icon: 'user-search', next: 'Your decision', when: 'Wed', owner: 'Sophie Laurent', flag: badge('Review', 'warn') }),
    kc({ title: 'Lake Terrace 2 · 908', who: 'Aiko Tanaka · AED 124,000', icon: 'hourglass', next: 'AECB report pending', when: '~2 h', owner: 'Vikram Nair' }),
    kc({ title: 'Villa 22, Al Barsha 2', who: 'Carlos & Inês Mendes · AED 230,000', icon: 'hourglass', next: 'Employer confirmation', when: 'Wed', owner: 'Yusuf Demir' }),
  ], 1)}
  ${col('Contract', 2, [
    kc({ href: 'tenancy.html', title: P.p4.short, who: 'Arjun & Neha Mehta · AED 135,000', icon: 'pen-line', next: 'Landlord to sign', when: '2 days', owner: F, flag: badge('Chase', 'accent') }),
    kc({ title: 'Creek Vista 2 · 305', who: 'Sofia Rossi · AED 92,000', icon: 'file-text', next: 'Draft with tenant', when: 'Thu', owner: 'Chen Wei' }),
  ])}
  ${col('Deposit', 1, [
    kc({ title: 'Silicon Gates 2 · 507', who: 'Ahmed Qureshi · AED 61,000', icon: 'banknote', next: 'AED 3,050 due', when: 'Wed', owner: 'Rania Aziz' }),
  ])}
  ${col('Ejari', 2, [
    kc({ title: 'Arabella 3 · TH 88', who: 'Liam & Aoife O’Connor · AED 178,000', icon: 'file-check', next: 'Submitted to Dubai REST', when: 'today', owner: 'Khalid Al Mazrouei' }),
    kc({ title: 'Marina Arcade · 1407', who: 'Kwame Boateng · AED 118,000', icon: 'file-check', next: 'Certificate received', when: 'Mon', owner: 'Anastasia Volkova', flag: badge('Done', 'ok') }),
  ])}
  ${col('Move-in', 2, [
    kc({ title: 'Bay Square 7 · 903', who: 'Nour Khalil · AED 84,000', icon: 'key-round', next: 'Keys & condition report', when: 'Sat 28', owner: 'Rania Aziz' }),
    kc({ title: 'Maple 2 · TH 41', who: 'Park Ji-ho & Kim Soo-ah · AED 195,000', icon: 'truck', next: 'Move-in permit approved', when: 'Sun 29', owner: 'Sophie Laurent' }),
  ])}
  ${col('Active', 115, [
    kc({ title: P.p7.short, who: 'Hassan El-Sayed · AED 145,000', icon: 'circle-alert', next: '30-day notice running', when: '9 Dec', owner: F, flag: badge('Arrears', 'danger') }),
    kc({ title: P.p3.short, who: 'James & Claire Whitfield · AED 310,000', icon: 'scroll-text', next: '12-month notice served', when: 'Sep 2027', owner: F, flag: badge('Notice', 'violet') }),
    kc({ title: 'Lake Terrace 2 · 1711', who: 'Sana Mirza · AED 96,000', icon: 'droplets', next: 'Urgent repair to assign', when: 'now', owner: 'Vikram Nair', flag: badge('Repair', 'warn') }),
  ], 112)}
  ${col('Renewal', 9, [
    kc({ title: P.p1.short, who: 'Maya Fernandes · AED 105,000 → 110,000', icon: 'reply', next: 'Tenant to reply', when: '18 Dec', owner: F, flag: badge('In time', 'ok') }),
    kc({ title: 'Park Heights 1 · 214', who: 'Thandiwe Nkosi · AED 112,000', icon: 'calendar-clock', next: 'Cut-off Thu 26 Nov', when: '2 days', owner: 'Sophie Laurent', flag: badge('Nudge', 'warn') }),
    kc({ title: 'Shoreline 7 · 402', who: 'Peter & Hanna Lindholm · AED 240,000', icon: 'ban', next: '+12% blocked · max 5%', when: 'Sat 28', owner: 'Anastasia Volkova', flag: badge('Blocked', 'danger') }),
  ], 6)}
  ${col('Move-out', 4, [
    kc({ title: P.p5.short, who: 'Olena Kovalenko · deposit AED 4,400', icon: 'clipboard-check', next: 'Check-out inspection', when: 'Mon 30', owner: F }),
    kc({ href: 'dispute.html', title: 'Lake Terrace 1204', who: 'Grace Mwangi · deposit AED 6,000', icon: 'scale', next: 'Deposit dispute', when: 'Fri', owner: 'Vikram Nair', flag: badge('Decide', 'violet') }),
  ], 2)}
</div>
<p class="demo-note">${icon('move-horizontal', 14)} Swipe to see all nine stages</p>`, true)}

${panel('tv', 'list', `<div class="card">${table({ cols: [{ label: 'Property' }, { label: 'Tenant' }, { label: 'Stage' }, { label: 'Rent', r: true }, { label: 'Next date', r: true }], rows: Object.values(P).map(p => [
  `<div class="cell">${thumb(p.img, '', B)}<div><b>${p.short}</b><div class="small muted">${p.area}</div></div></div>`,
  p.tenant || '<span class="muted">—</span>', badge(p.status, p.tone === 'neutral' ? '' : p.tone), `<span class="num">${money(p.rent)}</span>`,
  { p1: '30 Nov · cut-off', p2: 'Today · 3 viewings', p3: '14 Sep 2027', p4: '5 Dec · move-in', p5: '30 Nov · check-out', p6: '26 Nov · photos', p7: '9 Dec · notice ends' }[p.id],
]) })}</div><p class="small muted">Showing Fatima Al Hashimi’s portfolio (7 of 142).</p>`)}
`,
};

const task = (state, title, d) => `<div class="mg-task ${state}"><span class="ck">${icon(state === 'block' ? 'lock' : state === 'now' ? 'circle-dot' : 'check', 13)}</span><div class="grow"><b>${title}</b>${d ? `<span class="d">${d}</span>` : ''}</div></div>`;
const docr = (name, sub, ok) => ({ lead: docIco('PDF'), title: name, sub, endBadge: ok === true ? badge('On file', 'ok') : badge(ok, 'warn'), chev: false });

const tenancy = {
  slug: 'tenancy', nav: 'tenancies', title: 'Executive Towers 1807', sub: 'Onboarding · move-in Sat 5 Dec', back: 'tenancies.html',
  body: () => { const p = P.p4; return `
<div class="split">
<div class="stack">
  <div class="card" style="overflow:hidden">
    ${cover(p.img, { cls: 'banner flat', tags: glass('Contract & Ejari', 'file-signature') + glass('11 days to move-in', null, true) }, B)}
    <div class="card-body stack stack-md">
      <div><span class="eyebrow">Tenancy TN-20418 · ruleset 2026.3</span><h1 class="mt-1">${p.name}</h1><p class="muted">${p.area} · 2 bed · ${p.sqft.toLocaleString('en-US')} sq ft · unfurnished</p></div>
      <div class="grid g2 sm4 small">
        <div><div class="muted">Tenants</div><b>Arjun & Neha Mehta</b></div><div><div class="muted">Landlord</div><b>Fatima Al Hashimi</b></div>
        <div><div class="muted">Rent</div><b class="num">${money(p.rent)} · 4 cheques</b></div><div><div class="muted">Term</div><b>${p.start} – ${p.end}</b></div>
      </div>
      ${lifecycle([{ label: 'Offer' }, { label: 'Referencing' }, { label: 'Deposit' }, { label: 'Contract', icon: 'pen-line' }, { label: 'Ejari', icon: 'file-check' }, { label: 'Move-in', icon: 'key-round' }, { label: 'Active', icon: 'house' }], 3)}
    </div>
  </div>

  ${callout({ tone: 'warn', icon: 'hourglass', title: 'One signature is holding everything up', body: 'Fatima has not countersigned. Ejari, the building move-in permit and DEWA all queue behind it — the permit alone needs 3 working days, so the practical deadline is Mon 30 Nov.', actions: btn('Nudge Fatima', { size: 'sm', icon: 'bell', toast: 'Reminder sent by push and WhatsApp (demo)' }) + btn('Call', { size: 'sm', icon: 'phone', toast: 'Calling Fatima… (demo)' }) })}

  ${tabs('tk', [{ id: 'all', label: 'Checklist', n: 17 }, { id: 'ejari', label: 'Ejari pack' }, { id: 'follow', label: 'Follow-ups' }, { id: 'audit', label: 'Audit trail' }], 'all')}

  ${panel('tk', 'all', `
    <div class="card pad stack stack-sm"><div class="between"><b class="strong">Before move-in</b><span class="small strong">11 of 17 done</span></div>${bar(65, 'accent')}</div>
    ${card({ title: 'Landlord · Fatima', headEnd: badge('1 blocking', 'danger'), body:
      task('now', 'Sign the tenancy contract with UAE Pass', 'Sent Sun 22 Nov · opened once · nudged twice') +
      task('done', 'Service charges up to date', 'Owners’ association confirmed 23 Nov — needed for the move-in permit') +
      task('done', 'Previous DEWA account closed', 'Final bill settled 14 Nov') +
      task('', 'Hand keys, 2 access cards and parking tag to the field agent', 'By Thu 3 Dec · Jun Reyes collects') })}
    ${card({ title: 'Tenants · Arjun & Neha', headEnd: badge('On track', 'ok'), body:
      task('done', 'Contract signed with UAE Pass', 'Both tenants · Sun 22 Nov, 20:14') +
      task('done', 'Deposit AED 6,750 paid into safeguarding', 'DEP-2611-0498 · 5% of annual rent') +
      task('done', 'Move.me fee and Ejari fee paid', 'AED 261.45 + AED 177.75') +
      task('done', 'Hand over 4 rent cheques for custody', '4 × AED 33,750 · first dated 5 Dec · lodged at our Business Bay office Mon 23 Nov') +
      task('now', 'Register everyone moving in', 'Arjun and Neha added · daughter Anika’s Emirates ID still to upload') +
      task('', 'Apply for DEWA move-in', 'Unlocks once the Ejari number exists') +
      task('', 'Book movers and lift slot', 'Executive Towers allows moves Sat–Thu, 09:00–17:00') })}
    ${card({ title: 'Me · Layla', headEnd: badge('2 blocked', 'warn'), body:
      task('done', 'Referencing signed off', 'Fri 20 Nov · all five checks passed') +
      task('done', 'Contract checked against ruleset 2026.3', '0 clauses below the legal floor · 1 better-than-law term') +
      task('done', 'Advert paused, permit 71458830117 retained', '') +
      task('block', 'Submit Ejari to Dubai REST', 'Needs both signatures') +
      task('block', 'Request building move-in permit', 'Needs Ejari certificate and signed contract') +
      task('', 'Book move-in condition report', 'Sat 5 Dec, 09:00 · Jun Reyes pencilled') })}`, true)}

  ${panel('tk', 'ejari', `
    ${card({ title: 'Ejari registration', headEnd: badge('Draft · 11 of 12 fields', 'warn'), body: kv([
      ['Contract type', 'New · residential'], ['Property', 'Executive Tower K, Unit 1807, Business Bay'], ['Title deed', '31907 / 2017 · matched'], ['DEWA premise no.', '681-22094-7'],
      ['Landlord', 'Fatima Al Hashimi · owner'], ['Tenant', 'Arjun Mehta · EID 784-1987-•••••••-6'], ['Co-occupants', '2 of 3 complete'],
      ['Term', '5 Dec 2026 – 4 Dec 2027'], ['Annual rent', money(135000)], ['Security deposit', money(6750)], ['Payment', '4 cheques'], ['Signed contract', '<span class="t-warn">1 of 2 signatures</span>'],
    ]) })}
    ${card({ title: 'Documents attached', flush: true, body: list([
      docr('Unified tenancy contract', 'Tenant signed 22 Nov · landlord pending', 'Incomplete'),
      docr('Title deed', 'Verified against DLD 11 Oct 2026', true),
      docr('Landlord Emirates ID', 'UAE Pass', true),
      docr('Tenant Emirates ID and residence visa', 'Visa valid to 9 Aug 2028', true),
      docr('Previous DEWA final bill', 'Paid 14 Nov 2026', true),
    ]) })}
    <div class="card pad between"><div><b class="strong">Government fee</b><div class="small muted">Collected from the tenant at cost</div></div><b class="num" style="font-size:18px">AED 177.75</b></div>
    ${guard({ title: 'Why this cannot be skipped', checks: [
      { state: 'block', title: 'No Ejari, no active tenancy', sub: 'Rent is not released to the landlord and keys are not handed over until the certificate number is on file.', rule: rule('DXB-001', 'Ejari') },
      { state: 'info', title: 'Everyone living there goes on the record', sub: 'Occupants are added through Dubai REST with the registration.', rule: rule('DXB-OCC', 'Co-occupants') },
    ] })}
    ${btn('Submit to Dubai REST', { variant: 'primary', block: true, icon: 'send', sheet: 'sheet-ejari' })}`)}

  ${panel('tk', 'follow', `<div class="card">${list([
    { icon: 'zap', tone: '', title: 'DEWA move-in', sub: 'Tenant applies with the Ejari number · AED 2,000 deposit + AED 130 activation · power on next working day', endBadge: badge('After Ejari') },
    { icon: 'truck', tone: '', title: 'Building move-in permit', sub: 'Executive Towers owners’ association · needs Ejari, contract, mover’s trade licence · 3 working days', endBadge: badge('After Ejari') },
    { icon: 'snowflake', tone: '', title: 'District cooling account', sub: 'Tenant registers with the cooling provider · refundable deposit AED 2,000', endBadge: badge('Tenant') },
    { icon: 'wifi', tone: 'ok', title: 'Home internet', sub: 'Tenant has booked installation for Sun 6 Dec', endBadge: badge('Booked', 'ok') },
    { icon: 'camera', tone: 'info', title: 'Move-in condition report', sub: 'Sat 5 Dec, 09:00 · Jun Reyes · both parties sign within 7 days', endBadge: badge('Pencilled', 'info') },
    { icon: 'banknote', tone: 'brand', title: 'First rent released to landlord', sub: 'Cheque 1 (AED 33,750) is presented on 5 Dec once Ejari is active', endBadge: badge('Held', 'brand') },
  ])}</div>`)}

  ${panel('tk', 'audit', card({ body: timeline([
    { state: 'now', icon: 'bell', title: 'Reminder sent to Fatima', body: 'Push + WhatsApp · “Your signature is the last step for Executive Towers 1807”', when: 'Today, 08:30 · Layla Haddad' },
    { state: 'done', icon: 'bell', title: 'Reminder sent to Fatima', when: 'Mon 23 Nov, 09:00 · automatic' },
    { state: 'done', icon: 'lock-keyhole', title: 'Deposit AED 6,750 received into client account', when: 'Sun 22 Nov, 20:31 · bank feed' },
    { state: 'done', icon: 'pen-line', title: 'Tenants signed the contract', body: 'UAE Pass signatures · document hash 9f3c…a71e', when: 'Sun 22 Nov, 20:14' },
    { state: 'done', icon: 'shield-check', title: 'Contract passed ruleset 2026.3', body: '14 clauses checked · 0 below the legal floor · annual AC service added (better than law)', when: 'Sun 22 Nov, 11:02 · automatic' },
    { state: 'done', icon: 'user-check', title: 'Referencing signed off', when: 'Fri 20 Nov, 16:40 · Layla Haddad' },
    { state: 'done', icon: 'handshake', title: 'Offer accepted at AED 135,000', body: 'Asking AED 138,000 · 4 cheques · move-in 5 Dec', when: 'Wed 18 Nov, 19:22 · Fatima Al Hashimi' },
  ]) }))}
</div>

<aside class="stack sticky-side">
  ${card({ title: 'People', flush: true, body: list([
    { lead: avatar('Arjun Mehta'), title: 'Arjun Mehta', sub: 'Lead tenant · verified', toast: 'Calling Arjun… (demo)', endBadge: badge('Signed', 'ok') },
    { lead: avatar('Neha Mehta'), title: 'Neha Mehta', sub: 'Joint tenant · verified', endBadge: badge('Signed', 'ok') },
    { lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · travelling, back tonight', endBadge: badge('Pending', 'warn') },
    { lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'Field agent · keys and move-in report' },
  ]) })}
  ${card({ title: 'Money on this tenancy', body: kv([['Deposit held', money(6750)], ['Cheques in custody', '4 of 4'], ['Let.me fee (landlord)', 'AED 899 · invoiced'], ['Move.me fee (tenant)', 'AED 249 · paid'], ['Ejari fee', 'AED 177.75 · paid']]) })}
  ${card({ title: 'Critical path', body: timeline([
    { state: 'now', icon: 'pen-line', title: 'Landlord signature', when: 'needed by Mon 30 Nov' },
    { icon: 'file-check', title: 'Ejari certificate', when: 'same day' },
    { icon: 'truck', title: 'Move-in permit', when: '+3 working days' },
    { icon: 'zap', title: 'DEWA live', when: '+1 working day' },
    { icon: 'key-round', title: 'Keys', when: 'Sat 5 Dec, 09:00' },
  ]) })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-ejari', 'Submit Ejari',
    `${guard({ title: 'Pre-flight check', sub: 'Dubai REST will reject an incomplete pack', checks: [
       { state: 'ok', title: 'Title deed and owner verified' },
       { state: 'ok', title: 'Tenant identity and visa valid for the term' },
       { state: 'ok', title: 'Fee AED 177.75 collected' },
       { state: 'warn', title: '1 occupant record incomplete', sub: 'Can be added after registration.' },
       { state: 'block', title: 'Contract has 1 of 2 signatures', sub: 'Submission unlocks automatically when Fatima signs.', rule: rule('DXB-001', 'Ejari') },
     ] })}
     ${callout({ tone: 'brand', body: 'Turn on auto-submit and the pack goes to Dubai REST the minute the contract is complete — day or night.' })}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Auto-submit when signed', { variant: 'primary', toast: 'Auto-submit armed for TN-20418 (demo)' })),
};

module.exports = [tenancies, tenancy];
