const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, thumb, cover, glass, lifecycle, table, field, choice, qr, facts, timeline } = ui;
const { B, vp } = require('./lib/h');

const lcard = (o) => `<${o.href ? `a href="${o.href}"` : 'div'} class="card pad ${o.href ? 'link-card ' : ''}stack stack-md">
  <div class="inline" style="gap:12px;align-items:flex-start">${thumb(o.img, 'lg', B)}<div class="grow"><div class="between-top"><b class="strong">${o.name}</b>${o.state}</div><div class="small muted">${o.area} · ${o.type}</div><div class="inline small mt-1">${avatar(o.owner, { size: 'xs' })}<span>${o.owner}${o.via ? ` <span class="muted">via ${o.via}</span>` : ''}</span></div></div></div>
  <div class="mg-checks">${vp('Title deed', o.c[0])}${vp('Owner ID', o.c[1])}${vp('Form A', o.c[2])}${vp('Permit', o.c[3])}</div>
  <div class="between small"><span class="muted">${o.note}</span>${o.act || ''}</div>
</${o.href ? 'a' : 'div'}>`;

const listings = {
  slug: 'listings', nav: 'listings', title: 'Listing checks', sub: '5 awaiting review',
  body: () => `
${pageHead({ title: 'Listing checks', sub: 'Nothing is advertised until the owner, the title deed, Form A and the Trakheesi permit all line up. You are the licensed broker on the permit.', actions: btn('Permit register', { icon: 'download', size: 'sm', toast: 'Permit register exported (demo)' }) })}
${stats([
  { label: 'Awaiting review', icon: 'scan-search', value: '5', sub: '1 due by 13:00' },
  { label: 'Needs info', icon: 'circle-help', value: '2', sub: 'returned to owner' },
  { label: 'Approved this week', icon: 'badge-check', value: '11', delta: '4', sub: 'vs last week' },
  { label: 'Median turnaround', icon: 'timer', value: '3h 40', unit: 'm', sub: 'target 1 working day' },
])}
${tabs('lst', [{ id: 'pending', label: 'Pending', n: 5 }, { id: 'info', label: 'Needs info', n: 2 }, { id: 'ok', label: 'Approved', n: 4 }], 'pending')}

${panel('lst', 'pending', `<div class="grid lg2">
  ${lcard({ href: 'listing-review.html', img: 'p6.svg', name: 'Burj Vista 1 · Apt 3102', area: 'Downtown Dubai', type: '2 bed · furnished · AED 195,000', owner: 'Fatima Al Hashimi', state: badge('Due 13:00', 'warn', { dot: true }), c: ['ok', 'ok', 'wait', 'na'], note: 'Deed matched · Form A sent 23 Nov, unsigned', act: `<span class="link">Review</span>` })}
  ${lcard({ img: 'x3.svg', name: 'Creek Vista · Apt 2206', area: 'Sobha Hartland', type: '1 bed · unfurnished · AED 98,000', owner: 'Chen Wei', state: badge('Ready', 'ok', { dot: true }), c: ['ok', 'ok', 'ok', 'wait'], note: 'All checks passed · permit ready to issue', act: btn('Issue permit', { size: 'sm', variant: 'primary', toast: 'Permit 71463302258 issued · advert goes live (demo)' }) })}
  ${lcard({ img: 'p3.svg', name: 'Villa 6, Street 22', area: 'Mirdif', type: '5 bed villa · AED 265,000', owner: 'Khalid Al Mazrouei', state: badge('Check', 'warn', { dot: true }), c: ['wait', 'ok', 'ok', 'na'], note: 'Deed is in two names — second owner must co-sign Form A', act: btn('Request co-owner', { size: 'sm', toast: 'Co-owner signature request sent (demo)' }) })}
  ${lcard({ img: 'p5.svg', name: 'Al Ghozlan 3 · Apt 412', area: 'The Greens', type: 'Re-list · 1 bed · AED 92,000', owner: 'Fatima Al Hashimi', state: badge('Scheduled', ''), c: ['ok', 'ok', 'ok', 'wait'], note: 'Goes live after check-out on Mon 30 Nov', act: `<span class="muted">Auto</span>` })}
  ${lcard({ img: 'x1.svg', name: 'Lake Terrace · Apt 1204', area: 'Jumeirah Lake Towers', type: '2 bed · AED 124,000', owner: 'Vikram Nair', state: badge('Photos', 'warn', { dot: true }), c: ['ok', 'ok', 'ok', 'wait'], note: '3 photos carry another agency’s watermark', act: btn('Ask for new photos', { size: 'sm', toast: 'Photo request sent to Vikram (demo)' }) })}
</div>`, true)}

${panel('lst', 'info', `<div class="grid lg2">
  ${lcard({ img: 'x2.svg', name: 'Silicon Gates 1 · Apt 804', area: 'Dubai Silicon Oasis', type: '1 bed · AED 64,000', owner: 'Olumide Adeyemi', via: 'Daniel Okafor (PoA)', state: badge('Returned', 'danger'), c: ['ok', 'bad', 'wait', 'na'], note: 'Power of attorney expired 2 Nov 2026 — new notarised PoA needed', act: `<div>${rule('DXB-003', 'Owner or PoA')}</div>` })}
  ${lcard({ img: 'p7.svg', name: 'Room in 3-bed villa', area: 'Al Barsha 1', type: 'Room · AED 3,200 / month', owner: 'Yusuf Demir', state: badge('Blocked', 'danger'), c: ['ok', 'ok', 'na', 'bad'], note: 'Room-by-room letting needs a shared-housing permit. Offered: list the whole villa instead.', act: `<div>${rule('DXB-S04', 'Law 4/2026')}</div>` })}
</div>
${callout({ tone: 'neutral', title: 'Returned, not rejected', body: 'Owners get a plain-language note saying exactly what is missing and how to fix it. The draft listing is kept for 30 days.' })}`)}

${panel('lst', 'ok', `<div class="card">${table({ cols: [{ label: 'Listing' }, { label: 'Owner' }, { label: 'Permit no.' }, { label: 'Status' }, { label: 'Permit valid to', r: true }], rows: [
  [`<div class="cell">${thumb('p2.svg', '', B)}<div><b>Bloom Towers B · Studio 915</b><div class="small muted">JVC · AED 54,000</div></div></div>`, 'Fatima Al Hashimi', '<span class="num">71460017342</span>', badge('Live · 14 days', 'ok', { dot: true }), '8 Feb 2027'],
  [`<div class="cell">${thumb('p4.svg', '', B)}<div><b>Executive Towers K · 1807</b><div class="small muted">Business Bay · AED 135,000</div></div></div>`, 'Fatima Al Hashimi', '<span class="num">71458830117</span>', badge('Let agreed · advert paused', 'accent'), '21 Jan 2027'],
  [`<div class="cell">${thumb('x5.svg', '', B)}<div><b>Park Heights 2 · 608</b><div class="small muted">Dubai Hills · AED 112,000</div></div></div>`, 'Sophie Laurent', '<span class="num">71461190476</span>', badge('Offer accepted · advert paused', 'accent'), '16 Feb 2027'],
  [`<div class="cell">${thumb('x6.svg', '', B)}<div><b>Marina Arcade · 2210</b><div class="small muted">Dubai Marina · AED 128,000</div></div></div>`, 'Anastasia Volkova', '<span class="num">71455027781</span>', badge('Expires in 9 days', 'warn', { dot: true }), '3 Dec 2026'],
] })}</div>
<p class="small muted">Expired permits pause the advert automatically until renewed. ${rule('DXB-002', 'Advertising permit')}</p>`)}
`,
};

const cmp = (ok, text) => ok === 'ok' ? `<span class="inline t-ok strong">${icon('check', 15)}${text || 'Match'}</span>` : ok === 'info' ? `<span class="inline t-info strong">${icon('info', 15)}${text}</span>` : `<span class="inline t-warn strong">${icon('triangle-alert', 15)}${text}</span>`;
const photo = (img, flag) => `<div class="ph"><img src="${B}assets/img/${img}.svg" alt="">${flag ? `<span class="glass" style="position:absolute;left:5px;bottom:5px;background:${flag === 'ok' ? 'rgba(22,121,79,.9)' : 'rgba(184,50,43,.92)'}">${icon(flag === 'ok' ? 'check' : 'flag', 11)}${flag === 'ok' ? 'OK' : 'Flag'}</span>` : ''}</div>`;

const review = {
  slug: 'listing-review', nav: 'listings', title: 'Burj Vista 3102', sub: 'Listing check · due 13:00', back: 'listings.html',
  body: () => `
<div class="split">
<div class="stack">
  <div class="card" style="overflow:hidden">
    ${cover('p6.svg', { cls: 'banner flat', tags: glass('Verification', 'scan-search') + glass('Furnished', null, true) }, B)}
    <div class="card-body stack stack-md">
      <div class="between-top"><div><span class="eyebrow">Listing LS-4471 · submitted Sun 22 Nov</span><h1 class="mt-1">Burj Vista 1 · Apt 3102</h1><p class="muted">Downtown Dubai · asking ${money(195000)} a year</p></div></div>
      ${facts([['bed-double', '2 bedrooms'], ['bath', '2 bathrooms'], ['ruler', '1,180 sq ft'], ['building', 'Floor 31'], ['sofa', 'Furnished']])}
      ${lifecycle([{ label: 'Submitted' }, { label: 'Title deed' }, { label: 'Owner ID' }, { label: 'Form A', icon: 'pen-line' }, { label: 'Permit', icon: 'qr-code' }, { label: 'Live', icon: 'megaphone' }], 3)}
    </div>
  </div>

  ${card({ title: 'Owner’s entry vs DLD title-deed record', headEnd: badge('9 of 9 consistent', 'ok', { icon: 'check' }), flush: true, body: table({ cols: [{ label: 'Field' }, { label: 'Owner entered' }, { label: 'DLD record' }, { label: 'Result', r: true }], rows: [
    ['<b>Owner name</b>', 'Fatima Al Hashimi', 'FATIMA SAEED AL HASHIMI', cmp('ok')],
    ['<b>Title deed no.</b>', '48213 / 2019', '48213 / 2019', cmp('ok')],
    ['<b>Building</b>', 'Burj Vista 1', 'BURJ VISTA 1 · Burj Khalifa district', cmp('ok')],
    ['<b>Unit</b>', '3102', '3102', cmp('ok')],
    ['<b>Type & use</b>', 'Apartment · residential', 'Flat · residential', cmp('ok')],
    ['<b>Bedrooms</b>', '2', '2 B/R', cmp('ok')],
    ['<b>Area</b>', '1,180 sq ft', '109.61 m² (1,179.8 sq ft)', cmp('ok', 'Within 1%')],
    ['<b>Ownership share</b>', '100%', '100% · sole owner', cmp('ok')],
    ['<b>Charges on title</b>', 'None declared', 'Mortgage registered · Gulf Crescent Bank', cmp('info', 'Noted')],
  ] }) + `<div class="card-body" style="padding-top:12px">${callout({ tone: 'neutral', title: 'Mortgage on title', body: 'A registered mortgage does not stop the owner letting the home. It is recorded so rent payouts go to an account in the owner’s own name.' })}</div>` })}

  <div class="grid sm2">
    ${card({ title: 'Owner identity', body: `<div class="inline" style="gap:12px">${avatar('Fatima Al Hashimi', { size: 'lg' })}<div><b class="strong">Fatima Al Hashimi</b><div class="small muted">UAE Pass verified · 23 Nov 2026, 15:48</div></div></div><div class="mt-3">${kv([['Emirates ID', '784-1979-•••••••-2'], ['Name match to deed', '<span class="t-ok">Exact (Arabic & English)</span>'], ['Other listings', '6 verified since 2025']])}</div>` })}
    ${card({ title: 'Power of attorney', body: `<div class="empty" style="padding:8px 0 4px"><span class="row-ico ok">${icon('user-check', 24)}</span><b class="strong" style="color:var(--ink)">Not needed</b><span class="small">The owner is acting in person. If a representative is added later, a notarised PoA with letting powers and an expiry date is required.</span></div><div class="center">${rule('DXB-003', 'Owner or PoA')}</div>` })}
  </div>

  ${card({ title: 'Marketing agreement — Form A', headEnd: badge('Awaiting signature', 'warn', { dot: true }), body: timeline([
    { state: 'done', icon: 'send', title: 'Form A sent to owner', body: 'Exclusive to openrent.me for 90 days · asking rent AED 195,000 · no commission from tenant', when: 'Mon 23 Nov, 16:10' },
    { state: 'done', icon: 'eye', title: 'Opened by Fatima', when: 'Mon 23 Nov, 18:02' },
    { state: 'now', icon: 'pen-line', title: 'Signature with UAE Pass', body: 'Reminder sent today 08:30. She lands at 19:40 tonight.', extra: btn('Send reminder', { size: 'sm', icon: 'bell', toast: 'Reminder sent by push and WhatsApp (demo)' }) + btn('Call owner', { size: 'sm', icon: 'phone', toast: 'Calling Fatima… (demo)' }) },
    { icon: 'qr-code', title: 'Permit issues automatically', body: 'The request is already queued under BRN 61204.' },
  ]) })}

  ${card({ title: 'Photos', headEnd: `<span class="small muted">6 owner photos · pro shoot Thu 26 Nov</span>`, body: `<div class="photo-grid">${photo('p6', 'ok')}${photo('living-b', 'ok')}${photo('bedroom-b', 'ok')}${photo('kitchen-b', 'ok')}${photo('bath-a', 'ok')}${photo('living-c', 'flag')}</div>
    ${`<div class="mt-3">${callout({ tone: 'warn', title: '1 photo flagged', body: 'Photo 6 shows a marina view that does not match a Downtown unit on floor 31. Hidden from the advert until the owner confirms or replaces it.', actions: btn('Hide photo', { size: 'sm', toast: 'Photo hidden from advert (demo)' }) + btn('Ask owner', { size: 'sm', toast: 'Question sent to Fatima (demo)' }) })}</div>`}` })}

  ${card({ title: 'Advert copy', body: `<div class="paper" style="box-shadow:none"><b>Furnished 2-bed with Burj Khalifa view, Downtown</b><br>High-floor apartment in Burj Vista 1, five minutes’ walk to Dubai Mall. Fully furnished, two en-suite bedrooms, balcony facing the Burj. <mark style="background:var(--warn-soft);padding:0 3px;border-radius:3px">Cheapest furnished 2-bed in Downtown.</mark> Available from 1 December. No agency commission.</div>
    <div class="mt-3">${guard({ title: 'Copy checks', sub: 'Run on every save', checks: [
      { state: 'ok', title: 'Whole unit, one household', sub: 'No per-room or bed-space wording.', rule: rule('DXB-S04', 'Shared housing') },
      { state: 'ok', title: 'Price matches Form A', sub: 'AED 195,000 in both.' },
      { state: 'ok', title: 'Deposit AED 19,500 is inside the cap', sub: '10% for a furnished home.', rule: rule('OR-101', 'Deposit cap') },
      { state: 'ok', title: '“Burj Khalifa view” supported', sub: 'Unit faces north-east per the floor plan on the deed.' },
      { state: 'warn', title: '“Cheapest in Downtown” cannot be verified', sub: 'Suggested edit: remove the sentence. Superlatives need evidence.' },
      { state: 'info', title: 'Permit number and QR are stamped at go-live', rule: rule('DXB-002', 'Trakheesi') },
    ] })}</div>` })}
</div>

<aside class="stack sticky-side">
  ${guard({ title: 'Ready to advertise?', sub: 'All four must be green', checks: [
    { state: 'ok', title: 'Title deed matches DLD', sub: 'Confirmed by you · 23 Nov' },
    { state: 'ok', title: 'Owner identity verified' },
    { state: 'block', title: 'Form A not signed', sub: 'A permit cannot be requested without the owner’s signed marketing agreement.', rule: rule('DXB-002', 'Advertising permit') },
    { state: 'warn', title: '2 content fixes suggested', sub: 'One photo, one sentence.' },
  ] })}
  <div class="stack stack-sm">
    ${btn('Issue Trakheesi permit', { variant: 'primary', block: true, icon: 'qr-code', sheet: 'sheet-permit' })}
    ${btn('Return with notes', { block: true, icon: 'undo-2', sheet: 'sheet-return' })}
    ${btn('Approve listing', { block: true, icon: 'badge-check', cls: 'is-disabled' })}
  </div>
  ${card({ title: 'Rent guidance', body: kv([['Asking rent', money(195000)], ['Index range, this building', 'AED 182k – 204k'], ['Similar lets, last 90 days', '7 · median AED 191k'], ['Expected time to let', '9 – 14 days']]) + `<p class="small muted mt-3">New lets are priced freely. The index only caps increases at renewal.</p>` })}
  ${card({ title: 'Check history', body: timeline([
    { state: 'done', title: 'Listing submitted', when: 'Sun 22 Nov, 21:14' },
    { state: 'done', icon: 'scan-search', title: 'Deed auto-matched to DLD', when: 'Sun 22 Nov, 21:15' },
    { state: 'done', icon: 'user-check', title: 'Layla confirmed the deed', when: 'Mon 23 Nov, 15:55' },
    { state: 'now', icon: 'pen-line', title: 'Waiting for Form A' },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-permit', 'Issue Trakheesi permit',
    `<div class="permit">${qr('trakheesi-burj-vista-3102')}<div class="grow"><b class="strong">Permit 7146 4410 962</b><div class="small muted">Rent · residential · Burj Vista 1 – 3102<br>Reserved — activates when Form A is signed</div></div></div>
     ${kv([['Licensee', 'openrent.me · ORN 31877'], ['Responsible broker', 'Layla Haddad · BRN 61204'], ['Owner', 'Fatima Al Hashimi'], ['Advertised rent', money(195000)], ['Valid', '90 days from issue']])}
     ${guard({ title: 'Pre-flight', checks: [
       { state: 'ok', title: 'Title deed verified' }, { state: 'ok', title: 'Owner ID verified' },
       { state: 'block', title: 'Form A unsigned', sub: 'The request stays queued. Nothing is advertised until the permit is active.', rule: rule('DXB-002', 'Advertising permit') },
     ] })}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Queue for auto-issue', { variant: 'primary', toast: 'Queued — permit issues the moment Form A is signed (demo)' }))
  + sheet('sheet-return', 'Return to owner with notes',
    `<p class="small muted">Fatima sees these as a checklist on her listing. Keep them specific.</p>
     <label class="checkline"><input type="checkbox" checked> Photo 6 does not appear to be this apartment — please replace or confirm</label>
     <label class="checkline"><input type="checkbox" checked> Remove “Cheapest furnished 2-bed in Downtown”</label>
     <label class="checkline"><input type="checkbox"> Add a floor plan</label>
     ${field({ label: 'Note', type: 'textarea', value: 'Everything else is in order. Once Form A is signed the permit issues automatically and we go live after Thursday’s shoot.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send notes', { variant: 'primary', toast: 'Notes sent to Fatima (demo)' })),
};

module.exports = [listings, review];
