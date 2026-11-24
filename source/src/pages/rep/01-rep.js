const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sectionHead, sheet, field, choice, toggle, tabs, panel, stats, stagebar, bar, barChart, legend, table, docIco, thumb } = ui;
const B = '../../';

// Three overseas owners Daniel acts for, each under a notarised power of attorney (demo data)
const owners = [
  { id: 'rao', name: 'Dr Anjali Rao', where: 'London, United Kingdom', flag: 'UK', units: 4, roll: 483000, poa: 'Valid', poaTone: 'ok', expires: '14 Mar 2028' },
  { id: 'lind', name: 'Henrik Lindqvist', where: 'Stockholm, Sweden', flag: 'SE', units: 3, roll: 295000, poa: 'Expires in 56 days', poaTone: 'warn', expires: '19 Jan 2027' },
  { id: 'chen', name: 'Chen Wei', where: 'Singapore', flag: 'SG', units: 2, roll: 336000, poa: 'Under review', poaTone: 'info', expires: '2 Sep 2027' },
];
const units = [
  { o: 'rao', img: 'x1.svg', name: 'Marina Promenade · Apt 1102', area: 'Dubai Marina', rent: 165000, stage: 9, status: 'Renewal window', tone: 'warn' },
  { o: 'rao', img: 'x6.svg', name: 'Princess Tower · Apt 4407', area: 'Dubai Marina', rent: 98000, stage: 8, status: 'Occupied', tone: 'ok' },
  { o: 'rao', img: 'x5.svg', name: 'Lake Terrace · Apt 1905', area: 'Jumeirah Lake Towers', rent: 92000, stage: 2, status: 'Ready to list', tone: 'info' },
  { o: 'rao', img: 'x4.svg', name: 'Boulevard Central 2 · Apt 806', area: 'Downtown Dubai', rent: 128000, stage: 8, status: 'Occupied · repair', tone: 'accent' },
  { o: 'lind', img: 'p5.svg', name: 'Park Heights 2 · Apt 512', area: 'Dubai Hills Estate', rent: 175000, stage: 8, status: 'Occupied', tone: 'ok' },
  { o: 'lind', img: 'x2.svg', name: 'Belgravia 3 · Apt 207', area: 'Jumeirah Village Circle', rent: 72000, stage: 9, status: 'Renewal window', tone: 'warn' },
  { o: 'lind', img: 'p2.svg', name: 'Oxford Residence · Studio 318', area: 'Jumeirah Village Circle', rent: 48000, stage: 1, status: 'Verification', tone: 'neutral' },
  { o: 'chen', img: 'x3.svg', name: 'Bay Square 7 · Apt 903', area: 'Business Bay', rent: 96000, stage: 8, status: 'Occupied', tone: 'ok' },
  { o: 'chen', img: 'p1.svg', name: 'Shoreline 9 · Apt 304', area: 'Palm Jumeirah', rent: 240000, stage: 8, status: 'Occupied', tone: 'ok' },
];
const O = Object.fromEntries(owners.map(o => [o.id, o]));
const oav = (o, opt) => avatar(o.name.replace('Dr ', ''), opt);
const ownerChip = id => `<span class="inline small muted">${oav(O[id], { size: 'xs' })}${O[id].name.replace('Dr ', '')}</span>`;

const home = {
  slug: 'index', nav: 'home', title: 'Portfolio', sub: 'Tue 24 Nov 2026',
  body: () => `
${pageHead({ eyebrow: 'Acting under power of attorney', title: 'Good morning, Daniel', sub: 'Nine homes for three owners abroad. You see exactly what each mandate lets you do — and what still needs the owner.' })}

${stats([
  { label: 'Homes managed', icon: 'building-2', value: '9', sub: 'for 3 owners' },
  { label: 'Occupied', icon: 'house', value: '7', unit: 'of 9', sub: '1 listing · 1 in verification' },
  { label: 'Annual rent roll', icon: 'banknote', value: '1.11', unit: 'M AED', sub: 'across all mandates' },
  { label: 'Waiting on owners', icon: 'hourglass', value: '3', sub: 'oldest: 2 days', delta: '1 urgent', deltaDir: 'down' },
])}

${callout({ tone: 'warn', icon: 'stamp', title: 'Henrik Lindqvist’s power of attorney expires on 19 Jan 2027', body: 'After that date you cannot sign, list or renew for his three homes. A renewed, attested PoA usually takes 3–4 weeks from Sweden.', rules: [rule('DXB-003', 'Owner or valid PoA')], actions: btn('Request renewal', { size: 'sm', sheet: 'sheet-poa' }) })}

<div class="split">
<div class="stack">
  ${sectionHead('Needs the owner', 'All approvals', 'approvals.html')}
  <div class="card">${list([
    { href: 'approvals.html', icon: 'thermometer-snowflake', tone: 'danger', title: 'AC compressor replacement — AED 4,200', badge: badge('Over your limit', 'danger'), sub: 'Boulevard Central 2 · Apt 806. Your mandate covers repairs up to AED 2,000. Sent to Dr Rao on Sun 22 Nov.', extra: `<div class="mt-2">${ownerChip('rao')}</div>` },
    { href: 'approvals.html', icon: 'refresh-cw', tone: 'warn', title: 'Renewal rent for Belgravia 3 · Apt 207', badge: badge('Decide by 12 Dec', 'warn'), sub: 'Index allows up to +5%. You recommended +3% (AED 74,160). Rent decisions are reserved to the owner.', extra: `<div class="mt-2">${ownerChip('lind')}</div>` },
    { href: 'approvals.html', icon: 'megaphone', tone: 'info', title: 'List Lake Terrace 1905 below the owner’s floor', sub: 'You propose AED 92,000; Dr Rao set a minimum asking rent of AED 95,000.', extra: `<div class="mt-2">${ownerChip('rao')}</div>` },
  ])}</div>

  ${sectionHead('You can do these yourself')}
  <div class="card">${list([
    { toast: 'Offer accepted on behalf of Dr Rao (demo)', icon: 'hand-coins', tone: 'ok', title: 'Accept offer on Princess Tower 4407 renewal', badge: badge('Within mandate', 'ok', { icon: 'check' }), sub: 'Tenant accepted like-for-like renewal at AED 98,000. Signing contracts is in scope.', chev: true },
    { toast: 'Quote approved — AED 640 (demo)', icon: 'wrench', tone: 'ok', title: 'Approve water-heater repair — AED 640', badge: badge('Within mandate', 'ok', { icon: 'check' }), sub: 'Park Heights 2 · Apt 512. Under the AED 1,500 limit set by Mr Lindqvist.', chev: true },
    { toast: 'Photos booked for Thu 26 Nov (demo)', icon: 'camera', tone: 'ok', title: 'Book photos for Oxford Residence 318', badge: badge('Within mandate', 'ok', { icon: 'check' }), sub: 'Listing preparation is in scope; going live still needs the title-deed check to finish.', chev: true },
  ])}</div>

  ${sectionHead('Homes', '9 units')}
  ${ui.chips(['All', ['Rao', 4], ['Lindqvist', 3], ['Chen', 2]])}
  <div class="card">${list(units.map(u => ({ lead: thumb(u.img, '', B), title: u.name, sub: `${u.area} · ${money(u.rent)} / yr`, extra: `<div class="mt-2">${stagebar(12, u.stage)}</div><div class="between mt-2">${ownerChip(u.o)}${badge(u.status, u.tone === 'neutral' ? '' : u.tone)}</div>`, toast: 'Property record opened (demo)', chev: true })))}</div>
</div>

<aside class="stack">
  ${card({ title: 'Owners', link: ['Mandates', 'owners.html'], flush: true, body: list(owners.map(o => ({ href: 'owners.html#' + o.id, lead: oav(o, { size: 'lg' }), title: o.name, sub: `${o.where} · ${o.units} homes · ${money(o.roll)} / yr`, extra: `<div class="mt-2">${badge('PoA: ' + o.poa, o.poaTone, { icon: 'stamp' })}</div>` }))) })}

  ${guard({ title: 'What a representative can never do', sub: 'Applies to every mandate', checks: [
    { state: 'ok', title: 'Act only inside the notarised scope', sub: 'Each action is checked against the PoA wording before it is allowed.', rule: rule('DXB-003', 'Valid PoA') },
    { state: 'block', title: 'Receive rent into your own account', sub: 'Payouts go only to a bank account in the owner’s name.' },
    { state: 'block', title: 'Go below the legal minimum for tenants', sub: 'The same guardrails apply to you as to any landlord.', rule: rule('DXB-009', 'Rent cap') },
    { state: 'info', title: 'Everything you do is logged for the owner', sub: 'Owners see a dated trail of each action taken in their name.' },
  ] })}

  ${card({ title: 'This week', flush: true, body: list([
    { icon: 'calendar-clock', tone: 'warn', title: 'Mon 30 Nov', sub: '90-day cut-off for Marina Promenade 1102 renewal terms', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'camera', title: 'Thu 26 Nov, 14:00', sub: 'Photos · Oxford Residence 318' },
    { icon: 'banknote', tone: 'ok', title: 'Tue 1 Dec', sub: 'Owner payouts for November · AED 63,488 net' },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-poa', 'Request PoA renewal',
    `<div class="inline" style="gap:12px">${avatar('Henrik Lindqvist', { size: 'lg' })}<div><b class="strong">Henrik Lindqvist</b><div class="small muted">Current PoA expires 19 Jan 2027</div></div></div>
     ${timeline([
       { icon: 'pen-line', title: 'Owner signs before a notary in Sweden', body: 'We send the bilingual template with the same scope as today.' },
       { icon: 'stamp', title: 'Legalised by the UAE Embassy, then attested by MOFA in Dubai', body: 'Courier tracking is added to this record.' },
       { icon: 'file-check', title: 'Legal translation and upload', body: 'A manager verifies it against the title deeds within one working day.' },
     ])}
     ${callout({ tone: 'neutral', body: 'Until the new PoA is verified, the current one keeps working. If it lapses, the three homes switch to read-only for you.' })}`,
    btn('Not now', { attrs: { 'data-close': true } }) + btn('Send to Henrik', { variant: 'primary', icon: 'send', toast: 'Renewal pack sent to Henrik Lindqvist (demo)' })),
};

const perm = (label, sub, on, o = {}) => `<div class="row"><span class="row-ico ${on ? 'ok' : ''}">${icon(o.icon || (on ? 'check' : 'lock'), 18)}</span><div class="row-main"><div class="row-title">${label}${o.badge || ''}</div><div class="row-sub">${sub}</div></div>${toggle(on, { disabled: true, label })}</div>`;
const poaCard = (o, docs, perms, foot) => `<section class="card" id="${o.id}" style="scroll-margin-top:76px">
  <div class="card-body stack stack-md">
    <div class="inline" style="gap:12px;align-items:flex-start">${oav(o, { size: 'lg' })}<div class="grow"><h2>${o.name}</h2><div class="small muted">${o.where} · ${o.units} homes</div><div class="mt-2">${badge('PoA: ' + o.poa, o.poaTone, { icon: 'stamp' })}</div></div></div>
    ${docs}
  </div>
  <div class="hr-label" style="margin:0 16px">What this PoA lets you do</div>
  <div class="list mt-2">${perms}</div>
  <div class="card-foot">${foot}</div>
</section>`;

const ownersPage = {
  slug: 'owners', nav: 'owners', title: 'Mandates', sub: '3 powers of attorney',
  body: () => `
${pageHead({ title: 'Mandates', sub: 'Your authority comes from each owner’s notarised power of attorney. The switches below mirror the document — they are set by verification, not by you.', actions: btn('Add an owner', { icon: 'plus', variant: 'primary', sheet: 'sheet-add-owner' }) })}

<div class="split">
<div class="stack">
  ${poaCard(owners[0],
    `<div class="permit">${docIco('PDF')}<div class="grow"><b class="strong">Power of attorney — Rao / Okafor</b><div class="small muted">Notarised London 9 Mar 2026 · legalised FCDO &amp; UAE Embassy · attested MOFA Dubai 21 Mar 2026 · Arabic legal translation</div></div></div>
     ${kv([['Verified against title deeds', '4 of 4 units'], ['Accepted until', o0exp()], ['Repair limit without asking', 'AED 2,000 per job'], ['Minimum asking rent', 'Set per unit by owner']])}`,
    perm('Advertise and manage listings', 'Sign Form A and request Trakheesi permits', true, { icon: 'megaphone' }) +
    perm('Sign and renew tenancy contracts', 'Including Ejari registration and renewal', true, { icon: 'file-signature' }) +
    perm('Collect rent for the owner', 'Paid out to HSBC UK account in the owner’s name', true, { icon: 'banknote' }) +
    perm('Serve legal notices', '30-day arrears notices and 12-month notices via notary', true, { icon: 'scroll-text' }) +
    perm('Sell or mortgage the property', 'Not granted in this PoA', false),
    `<span class="small muted">Last used: today 08:12 · renewal accepted</span>${btn('View PoA', { size: 'sm', icon: 'eye', toast: 'PoA document opened (demo)' })}`)}

  ${poaCard(owners[1],
    `<div class="permit">${docIco('PDF')}<div class="grow"><b class="strong">Power of attorney — Lindqvist / Okafor</b><div class="small muted">Notarised Stockholm 12 Jan 2025 · legalised UAE Embassy · attested MOFA Dubai 19 Jan 2025</div></div></div>
     <div class="stack stack-sm"><div class="between small"><span class="muted">Acceptance window used</span><b class="t-warn">56 days left</b></div>${bar(92, 'warn')}</div>
     ${kv([['Verified against title deeds', '3 of 3 units'], ['Accepted until', '19 Jan 2027'], ['Repair limit without asking', 'AED 1,500 per job'], ['Rent decisions', 'Reserved to owner']])}`,
    perm('Advertise and manage listings', 'Sign Form A and request Trakheesi permits', true, { icon: 'megaphone' }) +
    perm('Sign and renew tenancy contracts', 'On terms the owner has approved in the app', true, { icon: 'file-signature', badge: badge('Needs approval each time', 'warn') }) +
    perm('Collect rent for the owner', 'Not granted — tenants pay the owner directly by direct debit', false) +
    perm('Serve legal notices', 'Not granted — owner signs notices via e-notary', false) +
    perm('Sell or mortgage the property', 'Not granted in this PoA', false),
    `<span class="small t-warn strong">Renew before 19 Jan 2027</span>${btn('Request renewal', { size: 'sm', variant: 'primary', sheet: 'sheet-poa2' })}`)}

  ${poaCard(owners[2],
    `<div class="permit">${docIco('PDF')}<div class="grow"><b class="strong">Power of attorney — Chen / Okafor</b><div class="small muted">Uploaded Fri 20 Nov 2026 · notarised Singapore 2 Sep 2026 · attestation stamp being checked</div></div></div>
     ${callout({ tone: 'neutral', icon: 'hourglass', title: 'With an openrent.me manager', body: 'Both homes are held through Wei Family Holdings Pte. Ltd., so company documents and the signatory’s authority are being checked too. Usually 1–2 working days.' })}
     ${kv([['Verified against title deeds', '0 of 2 units'], ['Would be accepted until', '2 Sep 2027'], ['Submitted by', 'Daniel Okafor · 20 Nov, 16:05']])}`,
    perm('Advertise and manage listings', 'Locked until verification completes', false) +
    perm('Sign and renew tenancy contracts', 'Locked until verification completes', false) +
    perm('Collect rent for the owner', 'Locked until verification completes', false) +
    perm('View tenancies and messages', 'Read-only access granted by the owner in-app', true, { icon: 'eye' }),
    `<span class="small muted">You can read, but not act, for these homes</span>${btn('Upload company docs', { size: 'sm', icon: 'upload', toast: 'Upload (demo)' })}`)}
</div>

<aside class="stack sticky-side">
  ${guard({ title: 'How mandates are checked', checks: [
    { state: 'ok', title: 'The landlord on a contract must be the owner — or hold a valid PoA', sub: 'Matched to the title deed before listing and again before signing.', rule: rule('DXB-003', 'Owner or PoA') },
    { state: 'ok', title: 'Scope is read from the document', sub: 'A manager maps each clause to a permission. You cannot switch one on yourself.' },
    { state: 'warn', title: 'PoAs age out', sub: 'We stop accepting a PoA two years after it was issued, or earlier if the document says so. Reminders start 90 days before.' },
    { state: 'info', title: 'Owners can revoke in one tap', sub: 'Access ends immediately and pending actions are cancelled.' },
  ] })}
  ${card({ title: 'Your credentials', flush: true, body: list([
    { icon: 'fingerprint', tone: 'ok', title: 'Identity — UAE Pass', sub: 'Daniel Okafor · Emirates ID verified', endBadge: badge('Verified', 'ok') },
    { icon: 'id-card', tone: 'ok', title: 'Okafor Property Management L.L.C', sub: 'Trade licence valid to 30 Jun 2027', endBadge: badge('Valid', 'ok') },
    { icon: 'shield-check', tone: 'ok', title: 'Professional indemnity cover', sub: 'AED 2,000,000 · renews 1 Apr 2027', endBadge: badge('On file', 'ok') },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-add-owner', 'Add an owner',
    `<p class="small muted">The owner confirms the invitation from their own account, then you upload the PoA for verification.</p>
     ${field({ label: 'Owner’s full name (as on the title deed)', placeholder: 'e.g. Sofia Marchetti' })}
     ${field({ label: 'Owner’s email', type: 'email', placeholder: 'owner@example.com' })}
     <div class="field"><span class="label">Power of attorney</span><button type="button" class="permit" style="width:100%;text-align:left" data-toast="File picker (demo)">${docIco('PDF')}<span class="grow"><b class="strong">Upload notarised PoA</b><span class="small muted" style="display:block">PDF with attestation stamps and Arabic translation</span></span>${icon('upload', 20)}</button></div>
     ${callout({ tone: 'brand', body: 'Nothing can be listed or signed until a manager has verified the PoA against the title deed.', rules: [rule('DXB-003', 'Owner or PoA')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send invitation', { variant: 'primary', toast: 'Invitation sent (demo)' }))
  + sheet('sheet-poa2', 'Request PoA renewal',
    `${kv([['Owner', 'Henrik Lindqvist'], ['Current PoA accepted until', '19 Jan 2027'], ['Scope requested', 'Same as today']])}
     <label class="checkline"><input type="checkbox"> Also ask for authority to collect rent</label>
     <label class="checkline"><input type="checkbox"> Also ask for authority to serve legal notices</label>
     ${callout({ tone: 'neutral', body: 'Wider scope only takes effect once the new document is notarised, attested and verified.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send to Henrik', { variant: 'primary', icon: 'send', toast: 'Renewal pack sent (demo)' })),
};
function o0exp() { return '14 Mar 2028'; }

const appr = (o) => `<div class="card pad stack stack-md">
  <div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div class="grow"><b class="strong" style="font-size:16px">${o.title}</b><div class="small muted">${o.where}</div><div class="mt-2">${o.badge}</div></div></div>
  ${o.body}
  <div class="between small"><span class="inline muted">${oav(O[o.owner], { size: 'xs' })}${O[o.owner].name} · ${o.sent}</span></div>
  <div class="btn-row">${o.actions}</div>
</div>`;

const approvals = {
  slug: 'approvals', nav: 'approvals', title: 'Approvals', sub: '3 waiting on owners',
  body: () => `
${pageHead({ title: 'Owner approvals', sub: 'Anything outside your mandate goes to the owner with the facts attached. They approve from their phone; you get a dated record either way.' })}
${tabs('ap', [{ id: 'wait', label: 'Waiting', n: 3 }, { id: 'draft', label: 'To send', n: 1 }, { id: 'done', label: 'Decided', n: 14 }], 'wait')}

${panel('ap', 'wait', `<div class="split"><div class="stack">
  ${appr({ icon: 'thermometer-snowflake', tone: 'danger', title: 'AC compressor replacement', where: 'Boulevard Central 2 · Apt 806 · Downtown Dubai', badge: badge('Tenant without cooling', 'danger', { dot: true }), owner: 'rao', sent: 'sent Sun 22 Nov, 17:40',
    body: kv([['Quote (Falcon Technical)', money(4200)], ['Your limit under the PoA', money(2000)], ['Temporary fix in place', 'Portable unit delivered Sun'], ['Who pays', 'Landlord — major repair']]) + `<div class="cluster">${rule('DXB-016', 'Landlord repairs')}${rule('OR-104', 'Emergency standard')}</div>` + callout({ tone: 'warn', body: 'If Dr Rao has not replied by 18:00 today, openrent.me’s emergency standard lets a manager authorise the repair.' }),
    actions: btn('Remind owner', { icon: 'bell', toast: 'Reminder sent by WhatsApp and email (demo)' }) + btn('Call owner', { icon: 'phone', variant: 'primary', toast: 'Calling Dr Rao… (demo)' }) })}
  ${appr({ icon: 'refresh-cw', tone: 'warn', title: 'Renewal rent', where: 'Belgravia 3 · Apt 207 · JVC', badge: badge('Decide by 12 Dec', 'warn'), owner: 'lind', sent: 'sent Mon 23 Nov, 09:15',
    body: kv([['Current rent', money(72000)], ['Index average for the building', money(84000)], ['Legal maximum (+5%)', money(75600)], ['Your recommendation (+3%)', money(74160)]]) + `<div class="cluster">${rule('DXB-009', 'Rent cap')}${rule('DXB-014', '90-day notice')}</div>` + `<p class="small muted">Contract ends 12 Mar 2027. Any change must reach the tenant by Sat 12 Dec 2026 — after that the rent stays at AED 72,000.</p>`,
    actions: btn('Edit', { icon: 'pen-line', sheet: 'sheet-send' }) + btn('Remind owner', { icon: 'bell', variant: 'primary', toast: 'Reminder sent (demo)' }) })}
  ${appr({ icon: 'megaphone', tone: 'info', title: 'Asking rent below owner’s floor', where: 'Lake Terrace · Apt 1905 · JLT', badge: badge('Not urgent'), owner: 'rao', sent: 'sent Mon 23 Nov, 11:02',
    body: kv([['Owner’s minimum asking rent', money(95000)], ['Your proposed asking rent', money(92000)], ['Similar homes let in last 60 days', 'AED 89,000 – 94,000'], ['Days vacant', '18']]),
    actions: btn('Withdraw', { toast: 'Request withdrawn (demo)' }) + btn('Remind owner', { icon: 'bell', variant: 'primary', toast: 'Reminder sent (demo)' }) })}
</div>
<aside class="stack">
  ${card({ title: 'Audit trail', body: timeline([
    { state: 'done', icon: 'check', title: 'You accepted a like-for-like renewal', body: 'Princess Tower 4407 · within mandate (Rao)', when: 'Today, 08:12' },
    { state: 'done', icon: 'send', title: 'Sent for approval: asking rent', body: 'Lake Terrace 1905 → Dr Rao', when: 'Mon 23 Nov, 11:02' },
    { state: 'done', icon: 'send', title: 'Sent for approval: renewal rent', body: 'Belgravia 3 · 207 → Mr Lindqvist', when: 'Mon 23 Nov, 09:15' },
    { state: 'warn', icon: 'x', title: 'Blocked: sign contract for Bay Square 903', body: 'Chen mandate not yet verified. Nothing was sent to the tenant.', when: 'Sat 21 Nov, 12:30' },
    { state: 'done', icon: 'thumbs-up', title: 'Mr Lindqvist approved AED 1,850 plumbing repair', body: 'Park Heights 2 · 512 · approved in 3 h 10 min', when: 'Wed 18 Nov' },
  ]) })}
  ${callout({ tone: 'brand', title: 'Owners see the same record', body: 'Every action taken in an owner’s name shows who did it, under which PoA clause, and when.' })}
</aside></div>`, true)}

${panel('ap', 'draft', `<div class="card">${list([
  { sheet: 'sheet-send', icon: 'paint-roller', tone: 'gold', title: 'Repaint before re-letting — AED 2,900', sub: 'Oxford Residence · Studio 318 · over the AED 1,500 limit (Lindqvist) · draft saved yesterday', chev: true },
])}</div>`)}

${panel('ap', 'done', `<div class="card">${table({ cols: [{ label: 'Request' }, { label: 'Owner' }, { label: 'Decision' }, { label: 'Time to decide', r: true }], rows: [
  ['<b>Plumbing repair AED 1,850</b><div class="small muted">Park Heights 2 · 512</div>', 'Lindqvist', badge('Approved', 'ok'), '3 h 10 min'],
  ['<b>Tenant request: install EV charger</b><div class="small muted">Shoreline 9 · 304</div>', 'Chen', badge('Approved with conditions', 'brand'), '1 day'],
  ['<b>Rent reduction request −4%</b><div class="small muted">Marina Promenade 1102</div>', 'Rao', badge('Declined', 'danger'), '6 h'],
  ['<b>Pet permission (1 dog)</b><div class="small muted">Belgravia 3 · 207</div>', 'Lindqvist', badge('Approved', 'ok'), '40 min'],
  ['<b>New fridge AED 2,300</b><div class="small muted">Princess Tower 4407</div>', 'Rao', badge('Approved', 'ok'), '2 h 5 min'],
] })}</div>`)}`,
  sheets: () => sheet('sheet-send', 'Send for owner approval',
    `${field({ label: 'What are you asking for?', value: 'Repaint before re-letting' })}
     <div class="form-grid c2">${field({ label: 'Amount', value: '2,900', prefix: 'AED', inputmode: 'numeric' })}${field({ label: 'Decision needed by', type: 'date', value: '2026-11-30' })}</div>
     ${field({ label: 'Your recommendation', type: 'textarea', value: 'Walls marked after 3-year tenancy. Two quotes attached; the lower one includes ceilings. Repainting should shorten the void period.' })}
     <div class="field"><span class="label">Attachments</span><div class="cluster">${badge('Quote — Falcon Technical.pdf', 'outline', { icon: 'file-text' })}${badge('Quote — BrightCoat.pdf', 'outline', { icon: 'file-text' })}${badge('6 photos', 'outline', { icon: 'camera' })}</div></div>
     ${callout({ tone: 'neutral', body: 'Mr Lindqvist gets a push notification, WhatsApp message and email. Nothing is booked until he approves.' })}`,
    btn('Save draft', { attrs: { 'data-close': true } }) + btn('Send to owner', { variant: 'primary', icon: 'send', toast: 'Sent to Henrik Lindqvist for approval (demo)' })),
};

const st = (o, rent, fees, maint, net, state) => [`<div class="cell">${oav(O[o], { size: 'sm' })}<div><b>${O[o].name}</b><div class="small muted">${O[o].units} homes</div></div></div>`, money(rent), '− ' + money(fees), '− ' + money(maint), `<b>${money(net)}</b>`, state];

const statements = {
  slug: 'statements', nav: 'statements', title: 'Statements', sub: 'November 2026',
  body: () => `
${pageHead({ title: 'Statements & payouts', sub: 'One statement per owner, every month. Money never passes through your account — it goes from the tenant to the owner, with fees shown line by line.', actions: btn('Export all', { icon: 'download', size: 'sm', toast: 'November statements exported (demo)' }) })}

${stats([
  { label: 'Rent collected', icon: 'banknote', value: '66,584', unit: 'AED', sub: 'November · 6 payments' },
  { label: 'Paid to owners', icon: 'arrow-up-right', value: '63,488', unit: 'AED', sub: 'net of fees and repairs' },
  { label: 'Repairs charged', icon: 'wrench', value: '2,490', unit: 'AED', sub: '2 jobs' },
  { label: 'Your management fee', icon: 'briefcase-business', value: '1,618', unit: 'AED', sub: 'billed separately' },
])}

<div class="split">
<div class="stack">
  ${card({ title: 'Rent collected by owner', headEnd: legend([['Rao', 'brand'], ['Lindqvist', 'accent'], ['Chen', 'gold']]), body: barChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], stacked: true, series: [{ tone: 'brand', data: [41, 82, 24, 41, 57, 33] }, { tone: 'accent', data: [14, 58, 6, 14, 50, 6] }, { tone: 'gold', data: [8, 68, 8, 8, 68, 28] }], label: 'Rent collected per month by owner, thousands of dirhams' }) + `<p class="small muted mt-2">AED thousands. Peaks are quarterly cheques clearing.</p>` })}

  ${card({ title: 'November statements', flush: true, body: table({ cols: [{ label: 'Owner' }, { label: 'Rent in', r: true }, { label: 'Platform fees', r: true }, { label: 'Repairs', r: true }, { label: 'Net to owner', r: true }, { label: 'Payout', r: true }], rows: [
    st('rao', 32584, 326, 1850, 30408, badge('Scheduled 1 Dec', 'accent')),
    st('lind', 6000, 0, 640, 5360, badge('Direct to owner', 'brand')),
    st('chen', 28000, 280, 0, 27720, badge('On hold · PoA review', 'warn')),
  ] }), foot: `<span class="small muted">Platform fees are openrent.me Collect.me charges (1%, capped). Your own fee is invoiced by Okafor PM.</span>` })}

  ${card({ title: 'Dr Anjali Rao — November detail', link: ['Download PDF', '#'], flush: true, body: list([
    { icon: 'banknote', tone: 'ok', title: 'Marina Promenade 1102', sub: 'Direct debit · 1 Nov', end: '+ ' + money(13750) },
    { icon: 'banknote', tone: 'ok', title: 'Princess Tower 4407', sub: 'Direct debit · 1 Nov', end: '+ ' + money(8167) },
    { icon: 'banknote', tone: 'ok', title: 'Boulevard Central 2 · 806', sub: 'Direct debit · 5 Nov', end: '+ ' + money(10667) },
    { icon: 'wrench', tone: 'warn', title: 'New fridge — Princess Tower 4407', sub: 'Approved by owner 9 Nov · invoice FTS-3318', end: '− ' + money(1850) },
    { icon: 'receipt-text', title: 'Collect.me fee', sub: '1% of rent collected', end: '− ' + money(326) },
  ]) + `<div class="card-body">${kv([['Net payout', money(30408)], ['To', 'HSBC UK ••2210 · A RAO'], ['Reference', 'PO-2611-RAO-0007']], 'total')}</div>` })}
</div>

<aside class="stack sticky-side">
  ${card({ title: 'Payout accounts', flush: true, body: list([
    { lead: avatar('Anjali Rao'), title: 'HSBC UK ••2210', sub: 'In the name of A RAO · verified', endBadge: badge('Active', 'ok', { dot: true }) },
    { lead: avatar('Henrik Lindqvist'), title: 'Tenants pay owner directly', sub: 'Direct debit to Emirates NBD ••7741 · H LINDQVIST', endBadge: badge('Direct', 'brand') },
    { lead: avatar('Chen Wei'), title: 'DBS Singapore ••0935', sub: 'Company account · being verified', endBadge: badge('On hold', 'warn') },
  ]) })}
  ${guard({ title: 'Money guardrails', checks: [
    { state: 'ok', title: 'Payouts only to the owner', sub: 'The account name must match the title-deed owner or their company.' },
    { state: 'ok', title: 'Deposits are not yours or the owner’s to hold', sub: 'They sit in the safeguarded client account until check-out.', rule: rule('OR-101', 'Deposits') },
    { state: 'info', title: 'Annual pack each January', sub: 'Income, costs and Ejari records per unit — ready for the owner’s tax adviser at home.' },
  ] })}
</aside>
</div>`,
};

module.exports = [home, ownersPage, approvals, statements];
