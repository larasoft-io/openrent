const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, money, pageHead, sheet, tabs, panel, thumb, timeline, lifecycle, avatar, bar, choice, field, table, docIco, sectionHead, toggle, glass, facts } = ui;
const { P, properties } = require('../../lib/data');
const B = '../../';
const p5 = P.p5;

/* ----------------------------------------------------------------- Move-out */
const pair = (img, pos, o) => `<div class="stack stack-sm">
  <div class="grid g2" style="gap:6px">
    <div class="cover tall" style="border-radius:12px"><img src="${B}assets/img/${img}.svg" alt="Move-in photo" style="object-position:${pos}% 50%"><div class="cover-tags">${glass('Move-in · 1 Dec 2025', null, true)}</div></div>
    <div class="cover tall" style="border-radius:12px"><img src="${B}assets/img/${o.img2 || img}.svg" alt="Check-out photo" style="object-position:${pos}% 50%"><div class="cover-tags">${glass('Pre-check · 20 Nov 2026')}</div>${o.pin ? `<span style="position:absolute;left:${o.pin[0]}%;top:${o.pin[1]}%;width:26px;height:26px;margin:-13px;border-radius:50%;border:3px solid #fff;background:${o.ok ? 'var(--ok)' : 'var(--accent)'};box-shadow:0 2px 8px rgba(0,0,0,.35)"></span>` : ''}</div>
  </div>
  <div class="between-top small"><div><b class="strong">${o.title}</b><div class="muted">${o.note}</div></div>${o.badge}</div>
</div>`;

const ded = (o) => `<div class="row" style="align-items:flex-start">
  <span class="thumb"><img src="${B}assets/img/${o.img}.svg" alt=""></span>
  <div class="row-main"><div class="row-title">${o.title}${o.badge || ''}</div><div class="row-sub">${o.sub}</div>${o.extra ? `<div class="cluster mt-2">${o.extra}</div>` : ''}</div>
  <div class="row-end"><b class="${o.locked ? 'faint' : ''}">${o.amt}</b>${o.locked ? `<span class="inline micro">${icon('lock', 12)} Not chargeable</span>` : toggle(true, { label: 'Include ' + o.title })}</div>
</div>`;

const moveout = {
  slug: 'moveout', nav: 'moveout', title: 'Move-outs', sub: 'Al Ghozlan 412 · check-out Mon 30 Nov',
  body: () => `
${pageHead({ eyebrow: 'Tenant gave notice 28 Sep 2026', title: 'Move-out', sub: 'Olena leaves Al Ghozlan 412 at the end of her contract. Here is the check-out, the deposit settlement and the re-let, in the order they happen.' })}

<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top"><div class="inline" style="gap:12px">${thumb(p5.img, 'lg', B)}<div><b class="strong" style="font-size:16px">${p5.name}</b><div class="small muted">${p5.area} · Olena Kovalenko · 1 Dec 2025 – 30 Nov 2026</div><div class="cluster mt-2">${badge('Rent paid in full', 'ok', { icon: 'check' })}${badge('Deposit AED 4,400 held', 'brand')}</div></div></div></div>
    ${lifecycle([{ label: 'Notice', icon: 'send' }, { label: 'Pre-check', icon: 'search' }, { label: 'Inspection', icon: 'clipboard-check' }, { label: 'Settlement', icon: 'scale' }, { label: 'Deposit out', icon: 'banknote' }, { label: 'Re-let', icon: 'megaphone' }], 2)}
  </div>

  <div class="card brand pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Check-out inspection</span>${badge('In 6 days', 'solid')}</div>
    <div class="between"><div><div class="hero-num" style="font-size:30px">Mon 30 Nov · 10:00</div><div class="small muted mt-1">About 75 minutes · every room re-photographed from the move-in angles</div></div></div>
    <div class="inline" style="gap:10px">${avatar('Jun Reyes', { tone: 'c5' })}<div class="small"><b class="strong">Jun Reyes</b> · openrent.me field agent<br><span class="muted">Olena will attend. You are welcome but not required.</span></div></div>
    <div class="btn-row">${btn('I will attend', { variant: 'white', size: 'sm', toast: 'Added to your calendar (demo)' })}${btn('Reschedule', { variant: 'on-dark', size: 'sm', toast: 'Olena and Jun have been asked for new times (demo)' })}</div>
  </div>

  ${card({ title: 'Then and now', headEnd: `<span class="small muted nowrap">18 of 62 retaken</span>`, body: `
    ${tabs('cmp', [{ id: 'living', label: 'Living room', n: 2 }, { id: 'bed', label: 'Bedroom', n: 1 }, { id: 'kit', label: 'Kitchen' }, { id: 'bath', label: 'Bathroom', n: 1 }], 'living')}
    <div class="mt-4">
    ${panel('cmp', 'living', `
      ${pair('living-b', 20, { title: 'Feature wall repainted dark grey', note: 'Was white at move-in. No alteration request on file.', badge: badge('Chargeable', 'accent'), pin: [42, 38] })}
      ${pair('living-b', 80, { title: '6 wall-anchor holes above sofa', note: 'Shelving removed; holes not filled.', badge: badge('Chargeable', 'accent'), pin: [30, 30] })}`, true)}
    ${panel('cmp', 'bed', pair('bedroom-b', 40, { title: 'Paint faded on window wall', note: 'Sun exposure over 12 months.', badge: badge('Fair wear', 'ok'), pin: [70, 40], ok: true }))}
    ${panel('cmp', 'kit', pair('kitchen-b', 50, { title: 'No change found', note: 'Appliances tested and working.', badge: badge('As move-in', 'ok') }))}
    ${panel('cmp', 'bath', pair('bath-b', 60, { title: 'Sealant discoloured around bath', note: 'Normal ageing; resealing is routine maintenance.', badge: badge('Fair wear', 'ok'), pin: [62, 62], ok: true }))}
    </div>` })}

  <div class="card">
    <div class="card-head"><h3>Deposit settlement</h3>${badge('Draft', 'warn')}</div>
    <div class="list mt-2">
      ${ded({ img: 'living-b', title: 'Repaint feature wall to original white', sub: 'Tenant alteration without consent · contractor quote MR-2298', amt: 'AED 650', extra: badge('Photo L-07', 'info', { icon: 'camera' }) + rule('DXB-019', 'Art. 19') })}
      ${ded({ img: 'living-b', title: 'Fill and touch up 6 anchor holes', sub: 'Damage beyond normal use · contractor quote MR-2298', amt: 'AED 250', extra: badge('Photo L-11', 'info', { icon: 'camera' }) })}
      ${ded({ img: 'bedroom-b', title: 'Faded paint, bedroom', sub: 'Fair wear and tear cannot be deducted.', amt: 'AED 0', locked: true, extra: rule('DXB-021', 'Art. 21') })}
      ${ded({ img: 'bath-b', title: 'Reseal bath and basin', sub: 'Ageing sealant is the landlord’s upkeep.', amt: 'AED 0', locked: true, extra: rule('DXB-021', 'Art. 21') })}
    </div>
    <div class="card-body">
      ${kv([['Deposit held', money(4400)], ['Proposed deductions (2)', '− AED 900'], ['Returned to Olena', money(3500)]], 'total')}
      <div class="btn-row mt-4">${btn('Add deduction', { icon: 'plus', sheet: 'sheet-deduct' })}${btn('Send', { variant: 'primary', cls: 'is-disabled', icon: 'lock' })}</div>
      <p class="small muted mt-3">You can send the settlement once Jun has signed off the inspection on 30 Nov. Olena then has 5 days to accept or dispute each line.</p>
    </div>
  </div>

  ${card({ title: 'What happens next', body: timeline([
    { state: 'done', icon: 'send', title: 'Olena gave notice in the app', body: '63 days before the end of term — more than the 60 days her contract asks for.', when: 'Mon 28 Sep 2026' },
    { state: 'done', icon: 'search', title: 'Pre-check visit', body: 'Optional walk-through so the tenant has time to put things right.', when: 'Fri 20 Nov' },
    { state: 'now', icon: 'clipboard-check', title: 'Check-out inspection and key return', body: '2 keys, 2 access cards, 1 parking tag to be handed to Jun.', when: 'Mon 30 Nov, 10:00' },
    { icon: 'scale', title: 'Settlement sent to tenant', body: 'Each deduction needs a photo and a reason. Unevidenced lines are removed automatically.', when: 'by Wed 2 Dec' },
    { icon: 'banknote', title: 'Deposit released', body: 'Agreed amount to Olena, deductions to you. If a line is disputed, the undisputed part is still released on time.', when: 'by Mon 14 Dec 2026', extra: rule('OR-101', '14-day release') },
    { icon: 'file-x', title: 'Ejari cancelled · DEWA final reading', body: 'Filed by openrent.me so the next tenancy can be registered.' },
  ]) })}
</div>

<aside class="stack">
  <div class="card pad stack stack-sm">
    <div class="between"><b class="strong">Deposit release clock</b>${badge('Starts 30 Nov', '')}</div>
    <div class="hero-num">14 <small>days</small></div>
    ${bar(0, 'accent')}
    <p class="small muted">Release is due by <b class="strong">Mon 14 Dec 2026</b>. Dubai law sets no deadline; openrent.me does.</p>
    <div>${rule('OR-101', 'Our standard')}</div>
  </div>

  ${guard({ title: 'Deduction rules', checks: [
    { state: 'ok', title: 'Evidence on every line', sub: 'A check-out photo matched to a move-in photo, plus a quote or invoice.' },
    { state: 'block', title: 'Fair wear and tear is never chargeable', sub: 'Faded paint, worn sealant, light scuffs and carpet wear are locked.', rule: rule('DXB-021', 'Art. 21') },
    { state: 'block', title: 'No “standard” cleaning or repainting fee', sub: 'A blanket charge with no evidence of damage is removed.', rule: rule('DXB-020', 'Art. 20') },
    { state: 'info', title: 'If you disagree', sub: 'A manager decides on the photos within 5 working days. Either side can still go to the RDC.', rule: rule('DXB-RDC', 'RDC') },
  ] })}

  <div class="card" style="overflow:hidden">
    <div class="cover flat" style="aspect-ratio:16/8"><img src="${B}assets/img/${p5.img}" alt=""><div class="cover-tags">${glass('Re-list draft ready', 'megaphone')}</div></div>
    <div class="card-body stack stack-sm">
      <b class="strong">Let it again from 7 Dec</b>
      <div class="between small"><span class="muted">Suggested asking rent</span><b class="num">AED 92,000</b></div>
      <div class="between small"><span class="muted">Index average, 1 bed</span><b class="num">AED 96,000</b></div>
      <p class="small muted">A new tenancy is not bound by the renewal cap. Your existing photos and floor plan carry over; a new advertising permit is requested when you publish.</p>
      <div class="cluster">${rule('DXB-002', 'Permit')}</div>
      ${btn('Review listing draft', { href: 'listing.html', block: true, icon: 'megaphone' })}
    </div>
  </div>

  ${card({ title: 'Final accounts', body: kv([['Rent', 'Paid in full · 4 of 4 cheques'], ['DEWA final bill', 'Tenant · due at move-out'], ['Chiller (Emicool)', 'Tenant · final reading 30 Nov'], ['Move-out permit', 'Requested from Emaar FM'], ['Ejari cancellation', 'After key return']]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-deduct', 'Add a deduction',
    `<div class="field"><span class="label">Evidence photo (required)</span><div class="photo-grid"><div class="ph"><img src="${B}assets/img/kitchen-b.svg" alt=""></div><button type="button" class="ph add" data-toast="Choose from check-out photos (demo)">${icon('images', 22)}</button><button type="button" class="ph add" data-toast="Camera opened (demo)">${icon('camera', 22)}</button></div><span class="hint">Pick the matching move-in photo too — we show them side by side to the tenant.</span></div>
     <div class="field"><span class="label">Reason</span>
       ${choice('dr', 'Damage beyond normal use', 'Broken, burnt, stained or holed', true)}
       ${choice('dr', 'Alteration not put back', 'Paint colour, fixtures, locks', false)}
       ${choice('dr', 'Missing item from the inventory', 'Keys, cards, appliances, furniture', false)}
       ${choice('dr', 'Cleaning beyond a normal end-of-tenancy clean', 'Needs photos showing the condition', false)}
       ${choice('dr', 'General wear, fading or ageing', 'Fair wear and tear cannot be deducted', false, { locked: true, end: rule('DXB-021', '') })}
       ${choice('dr', 'Unpaid rent', 'Use the arrears process — the deposit is not rent', false, { locked: true })}</div>
     ${field({ label: 'Amount', prefix: 'AED', placeholder: '0', inputmode: 'numeric', hint: 'Attach a quote or invoice. Total deductions cannot exceed the AED 4,400 deposit.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Add line', { variant: 'primary', toast: 'Deduction added to the draft (demo)' })),
};

/* ---------------------------------------------------------------- Documents */
const d = (tag, kind, title, sub, o = {}) => ({ lead: docIco(kind, o.cls), title, sub, endBadge: o.badge, toast: o.toast || `${title} downloaded (demo)`, attrs: { 'data-tags': tag }, extra: o.extra });
const chip = (f, label, n, on) => `<button type="button" class="chip${on ? ' is-active' : ''}" data-filter="${f}">${label}${n != null ? ` <span class="n">${n}</span>` : ''}</button>`;
const group = (title, tags, rows, headEnd) => `<section class="card" data-tags="${tags}"><div class="card-head"><h3>${title}</h3>${headEnd || ''}</div><div class="mt-2">${list(rows)}</div></section>`;

const documents = {
  slug: 'documents', nav: 'documents', title: 'Documents', sub: '7 properties · 61 files',
  body: () => `
${pageHead({ title: 'Documents', sub: 'One vault per property: ownership, letting authority, tenancies, legal notices and money. Everything is timestamped and kept for at least 5 years after a tenancy ends.', actions: btn('Upload', { icon: 'upload', size: 'sm', toast: 'Upload (demo)' }) + btn('Share with accountant', { icon: 'send', size: 'sm', toast: 'Secure link created, valid 7 days (demo)' }) })}

<div class="chips" data-chips data-target="#vault">${chip('*', 'All properties', null, true)}${properties.map(p => chip(p.id, p.short)).join('')}</div>

<div class="grid lg2" id="vault">
<div class="stack">
  ${group('Ownership', 'p1 p2 p3 p4 p5 p6 p7', [
    ...properties.map(p => d(p.id, 'PDF', `Title deed — ${p.short}`, `${p.area} · matched to DLD records${p.id === 'p6' ? ' 19 Nov 2026' : ''}`, { badge: badge('Verified', 'ok') })),
  ], badge('Private', '', { icon: 'lock' }))}
  ${group('Legal notices', 'p3 p7', [
    d('p3', 'PDF', '12-month notice — Palma Villa 27', 'NP-2026-094417 · owner’s own use · served 2 Sep 2026', { badge: badge('Served', 'ok') }),
    d('p3', 'PDF', 'Notary notification report', 'Palma Villa 27 · delivered 2 Sep 2026 · signed J. Whitfield'),
    d('p7', 'PDF', '30-day notice — Zahra TH 114', 'NP-2026-118834 · unpaid rent · served 9 Nov 2026', { badge: badge('Running', 'warn') }),
    d('p7', 'PDF', 'Returned cheque memo', 'Mashreq 000433 · AED 36,250 · 3 Nov 2026'),
  ])}
  ${group('Money', 'p1 p2 p3 p4 p5 p6 p7', [
    d('p1 p2 p3 p4 p5 p6 p7', 'XLS', 'Income & expense ledger 2026', 'All properties · updated today', { cls: 'xls' }),
    d('p1', 'PDF', 'Rent statement — Marina Gate 2304', '9 collections · Mar – Nov 2026'),
    d('p3', 'PDF', 'Rent statement — Palma Villa 27', '1 of 2 cheques cleared'),
    d('p7', 'PDF', 'Rent statement — Zahra TH 114', '2 cleared · 1 returned'),
    d('p4', 'PDF', 'Tax invoice — Let.me', 'INV-2611-2204 · AED 943.95 incl. VAT'),
    d('p2', 'PDF', 'Tax invoice — List.me', 'INV-2610-3310 · AED 313.95 incl. VAT'),
  ])}
</div>
<div class="stack">
  ${group('Letting authority', 'p2 p4 p5 p6', [
    d('p2', 'PDF', 'Form A — Bloom Towers 915', 'Marketing agreement · signed 27 Oct 2026', { cls: 'sig', badge: badge('Signed', 'ok') }),
    d('p2', 'PDF', 'Trakheesi permit 71460017342', 'Bloom Towers 915 · valid to 14 Dec 2026', { badge: badge('Active', 'ok') }),
    d('p4', 'PDF', 'Trakheesi permit 71458830117', 'Executive Towers 1807 · advert closed 19 Nov', { badge: badge('Closed') }),
    d('p6', 'PDF', 'Form A — Burj Vista 3102', 'Waiting for your signature', { cls: 'sig', badge: badge('To sign', 'accent'), toast: 'Opening Form A for signature (demo)' }),
    d('p5', 'PDF', 'Form A — Al Ghozlan 412 (re-let)', 'Draft · prepared for 7 Dec', { cls: 'sig', badge: badge('Draft') }),
  ])}
  ${group('Tenancies', 'p1 p3 p4 p5 p7', [
    d('p1', 'PDF', 'Tenancy contract — Marina Gate 2304', 'Maya Fernandes · 1 Mar 2026 – 28 Feb 2027', { badge: badge('Signed', 'ok') }),
    d('p1', 'PDF', 'Ejari certificate ' + P.p1.ejari, 'Valid to 28 Feb 2027', { badge: badge('Active', 'ok') }),
    d('p1', 'PDF', 'Renewal offer 2027/28', 'AED 110,000 · sent 18 Nov · index check attached', { badge: badge('Sent', 'accent') }),
    d('p4', 'PDF', 'Tenancy contract — Executive Towers 1807', 'Arjun & Neha Mehta · tenants signed 22 Nov', { cls: 'sig', badge: badge('Your signature', 'accent'), toast: 'Opening contract for signature (demo)' }),
    d('p3', 'PDF', 'Tenancy contract — Palma Villa 27', 'J. & C. Whitfield · 15 Sep 2026 – 14 Sep 2027', { badge: badge('Signed', 'ok') }),
    d('p3', 'PDF', 'Ejari certificate ' + P.p3.ejari, 'Valid to 14 Sep 2027', { badge: badge('Active', 'ok') }),
    d('p7', 'PDF', 'Tenancy contract — Zahra TH 114', 'Hassan El-Sayed · 1 May 2026 – 30 Apr 2027', { badge: badge('Signed', 'ok') }),
    d('p7', 'PDF', 'Ejari certificate ' + P.p7.ejari, 'Valid to 30 Apr 2027', { badge: badge('Active', 'ok') }),
    d('p5', 'PDF', 'Tenancy contract — Al Ghozlan 412', 'Olena Kovalenko · ends 30 Nov 2026', { badge: badge('Ending') }),
  ])}
  ${group('Condition reports', 'p1 p3 p5 p7', [
    d('p1', 'PDF', 'Move-in report — Marina Gate 2304', '84 photos · agreed 4 Mar 2026', { badge: badge('Agreed', 'ok') }),
    d('p5', 'PDF', 'Move-in report — Al Ghozlan 412', '62 photos · agreed 3 Dec 2025', { badge: badge('Agreed', 'ok') }),
    d('p5', 'PDF', 'Pre-check-out findings', '18 photos · 20 Nov 2026'),
    d('p7', 'PDF', 'Move-in report — Zahra TH 114', '131 photos · agreed 4 May 2026', { badge: badge('Agreed', 'ok') }),
    d('p3', 'PDF', 'Renewal condition check — Palma Villa 27', '48 photos · 12 Sep 2026'),
  ])}
</div>
</div>
<p class="demo-note">${icon('lock', 14)} Tenants’ identity documents are never stored here — you see a verification result only.</p>`,
};

/* --------------------------------------------------------------- Compliance */
const ok = (t = 'OK') => badge(t, 'ok', { icon: 'check' });
const na = (t = 'n/a') => `<span class="faint small">${t}</span>`;
const amber = (t) => badge(t, 'warn', { icon: 'triangle-alert' });
const pcell = (p) => `<div class="cell">${thumb(p.img, '', B)}<div><b>${p.short}</b><div class="small muted">${p.status}</div></div></div>`;

const affected = { '2026.3': ['4 tenancies · 2 listings', 'Room-by-room letting is switched off on all your units. Sublet requests from tenants now need your signed consent in-app.', false], '2026.2': ['1 tenancy using it · offered on 1 new contract', 'Marina Gate is on 12 monthly direct debits. You chose 4 cheques for Executive Towers — both are fine.', true], '2026.1': ['4 tenancies', 'No action for you. Reports of a lock-out or service cut-off now reach a manager within an hour.', true], '2025.1': ['2 upcoming renewals', 'Renewal offers read the building-level index. Marina Gate: up to 5%. Zahra TH: 0%.', true] };

const compliance = {
  slug: 'compliance', nav: 'compliance', title: 'Compliance', sub: 'Ruleset Dubai 2026.3',
  body: ({ data }) => `
${pageHead({ title: 'Compliance', sub: 'Where each property stands against Dubai’s rules today, and what has changed. If something here is green, it has been checked — not assumed.', actions: btn('Open the rulebook', { icon: 'scale', size: 'sm', href: '../rulebook.html' }) })}

<div class="split">
<div class="stack">
  <div class="card dark pad stack stack-md">
    <div class="between"><div class="inline" style="gap:10px"><span class="row-ico" style="background:rgba(255,255,255,.1);color:#7FE0B8">${icon('shield-check', 20)}</span><div><b class="strong" style="font-size:16px">5 of 7 properties all clear</b><div class="small muted">2 need a signature from you · nothing is in breach</div></div></div>${badge('2026.3', 'ok', { dot: true })}</div>
    <div class="bar" style="background:rgba(255,255,255,.14)"><i style="width:71%;background:#7FE0B8"></i></div>
    <div class="grid g2 sm4 small"><div><b class="display" style="font-size:22px">4</b><div class="muted">Ejari certificates active</div></div><div><b class="display" style="font-size:22px">AED 39,150</b><div class="muted">deposits safeguarded</div></div><div><b class="display" style="font-size:22px">2</b><div class="muted">notices, both validly served</div></div><div><b class="display" style="font-size:22px">0</b><div class="muted">blocked actions this month</div></div></div>
  </div>

  ${sectionHead('Needs you')}
  <div class="card">${list([
    { icon: 'file-signature', tone: 'warn', title: 'Sign the Executive Towers contract', badge: badge('Before 5 Dec', 'warn'), sub: 'The tenants signed on 22 Nov. Ejari cannot be registered — and move-in cannot go ahead — until you countersign.', extra: `<div class="cluster mt-2">${rule('DXB-001', 'Ejari')}<a class="link small" href="contract.html">Review and sign</a></div>` },
    { icon: 'pen-line', tone: 'warn', title: 'Sign Form A for Burj Vista 3102', sub: 'The advertising permit can only be requested once the marketing agreement is signed.', extra: `<div class="cluster mt-2">${rule('DXB-002', 'Permit')}<a class="link small" href="listing-new.html">Open Form A</a></div>` },
    { toast: 'Permit renewal requested — free of charge (demo)', icon: 'megaphone', tone: 'info', title: 'Bloom Towers permit expires 14 Dec', sub: 'We will renew it automatically if the listing is still live on 7 Dec. Nothing to do.', chev: true },
  ])}</div>

  ${card({ title: 'Property by property', flush: true, body: table({ cols: [{ label: 'Property' }, { label: 'Ownership' }, { label: 'Advert permit' }, { label: 'Ejari' }, { label: 'Deposit' }, { label: 'Occupants' }, { label: 'Notices' }], rows: [
    [pcell(P.p1), ok('Deed'), na('Not advertised'), ok('Active'), ok('Safeguarded'), ok('2 registered'), na('None')],
    [pcell(P.p2), ok('Deed'), ok('To 14 Dec'), na('Not let'), na(), na(), na('None')],
    [pcell(P.p3), ok('Deed'), na('Not advertised'), ok('Active'), ok('Safeguarded'), ok('5 registered'), ok('12-month · valid')],
    [pcell(P.p4), ok('Deed'), ok('Closed'), amber('Awaiting contract'), ok('Safeguarded'), na('At move-in'), na('None')],
    [pcell(P.p5), ok('Deed'), na('Draft'), ok('To 30 Nov'), ok('Safeguarded'), ok('1 registered'), na('None')],
    [pcell(P.p6), ok('Deed'), amber('Form A to sign'), na('Not let'), na(), na(), na('None')],
    [pcell(P.p7), ok('Deed'), na('Not advertised'), ok('Active'), ok('Safeguarded'), ok('4 registered'), ok('30-day · valid')],
  ] }) })}

  ${sectionHead('Ruleset updates')}
  ${data.rulesets.map(r => { const a = affected[r.v]; return `<div class="card pad stack stack-md">
    <div class="between-top"><div><div class="cluster">${badge(r.v, r.v === '2026.3' ? 'accent' : 'solid')}${badge(r.scope, 'outline')}</div><h3 class="mt-2">${r.title}</h3><div class="small muted">In force ${r.date}</div></div>${a[2] ? badge('Acknowledged', 'ok', { icon: 'check' }) : badge('New', 'accent', { dot: true })}</div>
    <p class="small">${r.summary}</p>
    <div class="callout neutral" style="padding:10px 12px">${icon('building-2', 18)}<div class="grow"><p><b>Affects you: ${a[0]}.</b> ${a[1]}</p></div></div>
    ${a[2] ? '' : `<div class="btn-row">${btn('Read the change', { size: 'sm', href: '../rulebook.html#DXB-S04' })}${btn('Acknowledge', { size: 'sm', variant: 'primary', icon: 'check', toast: 'Acknowledged — recorded against your account (demo)' })}</div>`}
  </div>`; }).join('')}
</div>

<aside class="stack">
  ${callout({ tone: 'brand', title: 'Better than the law is always allowed. Less never is.', body: 'Every setting in openrent.me has a legal floor. You can move above it — a longer notice, a smaller deposit, a kinder exit clause — and your listing earns a “Better terms” badge. You cannot move below it, however the contract is worded.' })}

  ${card({ title: 'Your terms against the floor', flush: true, body: table({ stack: false, cols: [{ label: 'Term' }, { label: 'Legal floor' }, { label: 'Yours', r: true }], rows: [
    ['Notice to change terms', '90 days', `<span class="t-ok strong nowrap">102 days</span>`],
    ['Notice to recover a home', '12 months', `<span class="t-ok strong nowrap">377 days</span>`],
    ['Rent rise, Marina Gate', 'max 5%', `<span class="t-ok strong nowrap">4.8%</span>`],
    ['Deposit, unfurnished', 'max 5%*', '5%'],
    ['Tenant early exit', '2 months*', `<span class="t-ok strong nowrap">1 month</span>`],
    ['Small repairs on tenant', 'AED 500*', `<span class="t-ok strong nowrap">AED 250</span>`],
  ] }) + `<div class="card-body" style="padding-top:12px"><p class="small muted">*openrent.me standard — the law itself is silent or leaves it to the contract.</p><div class="cluster mt-2">${rule('OR-101', 'Deposits')}${rule('OR-102', 'Exit')}${rule('OR-103', 'Repairs')}</div></div>` })}

  ${guard({ title: 'Always on', checks: [
    { state: 'ok', title: 'No advert without a permit', rule: rule('DXB-002', 'Trakheesi') },
    { state: 'ok', title: 'No active tenancy without Ejari', rule: rule('DXB-001', 'Ejari') },
    { state: 'ok', title: 'No rent rise above the index band', rule: rule('DXB-009', 'Rent cap') },
    { state: 'ok', title: 'No room or bed-space letting without a permit', rule: rule('DXB-S04', 'Law 4/2026') },
    { state: 'ok', title: 'No lock-outs or service cut-offs', rule: rule('DXB-034', 'Art. 34') },
  ] })}

  ${card({ title: 'How updates reach you', body: `<p class="small muted">When the law changes we publish a new ruleset version and tell you which of your tenancies it touches: <b class="strong">all tenancies</b> immediately, <b class="strong">new contracts</b> only, or <b class="strong">at the next renewal</b>. Existing signed contracts are never rewritten silently.</p><div class="mt-3">${btn('See every rule', { block: true, variant: 'ghost', href: '../rulebook.html' })}</div>` })}
  <p class="small muted">General information for a product mock-up, not legal advice.</p>
</aside>
</div>`,
};

module.exports = [moveout, documents, compliance];
