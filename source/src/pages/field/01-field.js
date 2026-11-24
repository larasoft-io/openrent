const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, lifecycle, avatar, money, pageHead, sectionHead, sheet, field, choice, toggle, tabs, panel, stats, bar, stagebar, qr, thumb, cover, glass, facts, seg, chips, docIco } = ui;
const { P } = require('../../lib/data');
const B = '../../';

const slot = (time, tone, body) => `<div class="slot"><time>${time}</time><div class="slot-card ${tone}">${body}</div></div>`;
const who = (name, sub, b) => `<div class="between"><div class="inline" style="gap:10px">${avatar(name, { size: 'sm' })}<div><b class="strong">${name}</b><div class="small muted">${sub}</div></div></div>${b || ''}</div>`;

const today = {
  slug: 'index', nav: 'home', title: 'Today', sub: 'Tue 24 Nov · 6 stops',
  body: () => `
<header class="page-head"><div class="ph-text"><span class="eyebrow">Tue 24 Nov 2026</span><h1>Morning, Jun</h1><p>Four viewings in JVC, then a snag check in Business Bay. Your next stop is in 18 minutes.</p></div></header>

<div class="daystrip">${[['Mon', 23], ['Tue', 24, 1, 1], ['Wed', 25, 0, 1], ['Thu', 26, 0, 1], ['Fri', 27], ['Sat', 28, 0, 1], ['Sun', 29], ['Mon', 30, 0, 1]].map(([d, n, a, h]) => `<button type="button" class="day${a ? ' is-active' : ''}${h ? ' has' : ''}" data-toast="${d} ${n} Nov (demo)">${d}<b>${n}</b></button>`).join('')}</div>

<div class="split">
<div class="stack">
  <div class="card accent pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.8)">Up next · 09:00</span>${badge('In 18 min', 'solid')}</div>
    <div><div class="h2" style="color:#fff">Viewing · Bloom Towers B, Studio 915</div><div class="small muted mt-1">Sofia Marchetti · ID verified · wants to move 1 Dec</div></div>
    <div class="btn-row">${btn('Start viewing', { href: 'viewing.html', variant: 'white', size: 'sm', icon: 'play' })}${btn('Directions · 6 min', { variant: 'on-dark', size: 'sm', icon: 'navigation', toast: 'Opening maps… (demo)' })}</div>
  </div>

  <div class="mapbox"><img src="${B}assets/img/map.svg" alt="Map of today's route across Dubai"></div>
  <div class="grid g2 sm4">
    ${[['6', 'stops today'], ['41 km', 'route'], ['2', 'key sets carried'], ['98%', 'on time this month']].map(([n, l]) => `<div class="card pad center"><b class="display" style="font-size:22px">${n}</b><div class="small muted">${l}</div></div>`).join('')}
  </div>

  ${sectionHead('Route')}
  <div class="stack stack-md">
    ${slot('08:30', 'ok', `<div class="between"><b class="strong">Collect keys · Bloom Towers B concierge</b>${badge('Done', 'ok', { icon: 'check' })}</div><div class="small muted mt-1">Key set K-0915 signed out at 08:27 · 1 door key, 1 access card</div>`)}
    ${slot('09:00', '', `${who('Sofia Marchetti', 'Viewing 1 of 4 · Studio 915', badge('ID verified', 'ok', { icon: 'badge-check' }))}<div class="btn-row mt-3">${btn('Start viewing', { href: 'viewing.html', variant: 'primary', size: 'sm', icon: 'play' })}${btn('Message', { size: 'sm', icon: 'message-circle', toast: 'Masked chat opened (demo)' })}</div>`)}
    ${slot('09:30', '', `${who('Tariq & Lina Aziz', 'Viewing 2 of 4 · Studio 915', badge('ID verified', 'ok', { icon: 'badge-check' }))}`)}
    ${slot('10:15', '', `${who('Kwame Mensah', 'Viewing 3 of 4 · Studio 915', badge('ID verified', 'ok', { icon: 'badge-check' }))}`)}
    ${slot('12:30', 'info', `<div class="between"><b class="strong">Snag check · Executive Towers K, Apt 1807</b>${badge('Business Bay', 'info')}</div><div class="small muted mt-1">Pre-move-in walk-round and meter readings before the Mehtas arrive on 5 Dec</div><div class="mt-2"><a class="link small" href="handovers.html">Open handover checklist</a></div>`)}
    ${slot('15:00', 'warn', `${who('Priya Nair', 'Viewing 4 of 4 · Studio 915', badge('ID pending', 'warn', { icon: 'hourglass' }))}<p class="small muted mt-2">Cannot start until she completes UAE Pass check-in. Reminder sent 08:00.</p>`)}
    ${slot('16:30', 'muted-card', `<b class="strong">Return keys · Bloom Towers B concierge</b><div class="small muted mt-1">Key set K-0915 must be signed back in today</div>`)}
  </div>
</div>

<aside class="stack">
  <div class="card pad stack stack-md">
    <div class="between"><div class="inline" style="gap:10px"><span class="row-ico ok">${icon('shield-check', 20)}</span><div><b class="strong">Lone-worker check-in</b><div class="small muted">Starts automatically with each viewing</div></div></div>${toggle(true, { label: 'Lone-worker check-in' })}</div>
    <p class="small muted">If you do not tap “I’m fine” within 25 minutes of starting, Layla is alerted with your location.</p>
  </div>

  ${card({ title: 'Coming up', flush: true, body: list([
    { href: 'inspection.html', icon: 'clipboard-check', tone: 'gold', title: 'Check-out inspection', badge: badge('Mon 30 Nov, 10:00', 'gold'), sub: 'Al Ghozlan 3 · Apt 412, The Greens · tenant Olena Kovalenko attending' },
    { toast: 'Shoot brief opened (demo)', icon: 'camera', tone: 'info', title: 'Photo shoot support', badge: badge('Thu 26 Nov, 11:00', 'info'), sub: 'Burj Vista 1 · Apt 3102, Downtown · let the photographer in, check staging', chev: true },
    { href: 'handovers.html', icon: 'key-round', tone: 'brand', title: 'Move-in handover', badge: badge('Sat 5 Dec, 10:00', 'brand'), sub: 'Executive Towers K · Apt 1807 · Arjun & Neha Mehta' },
  ]) })}

  ${card({ title: 'Prep for Monday’s check-out', body: `<div class="stack stack-sm">
    <label class="checkline"><input type="checkbox" checked> Move-in report downloaded for offline use (62 photos)</label>
    <label class="checkline"><input type="checkbox" checked> Tenant confirmed attendance</label>
    <label class="checkline"><input type="checkbox" checked> Landlord told she may attend or read the report after</label>
    <label class="checkline"><input type="checkbox"> Final DEWA reading request raised</label>
    <label class="checkline"><input type="checkbox"> Key and card count checked against inventory (2 keys, 2 cards, 1 tag)</label></div>
    <div class="mt-3">${rule('DXB-021', 'Fair wear and tear')}</div>` })}
</aside>
</div>`,
};

const step = (n, title, body, state = '') => `<section class="card pad stack stack-md"><div class="between"><div class="inline" style="gap:10px"><span class="pill-num" style="${state === 'done' ? 'background:var(--ok)' : state === 'now' ? 'background:var(--accent)' : 'background:#CFC8BA'}">${state === 'done' ? icon('check', 14) : n}</span><b class="strong" style="font-size:16px">${title}</b></div>${state === 'done' ? badge('Done', 'ok') : state === 'now' ? badge('Now', 'accent', { dot: true }) : ''}</div>${body}</section>`;

const viewing = {
  slug: 'viewing', nav: 'viewing', title: 'Host a viewing', sub: 'Bloom Towers B · Studio 915', back: 'index.html',
  body: () => { const p = P.p2; return `
<div class="split">
<div class="stack">
  <div class="card" style="overflow:hidden">
    ${cover(p.img, { cls: 'banner flat', alt: p.name, tags: glass('Viewing 1 of 4', 'door-open') + glass('09:00', null, true), grad: `<div class="h2" style="color:#fff">${p.name}</div><div class="small" style="opacity:.85">${p.area} · Studio · ${p.sqft} sq ft · furnished · ${money(p.rent)} / yr</div>` }, B)}
    <div class="card-body between"><div class="inline" style="gap:10px"><span class="row-ico ok">${icon('timer', 20)}</span><div><b class="strong num" style="font-size:18px">12:34</b><div class="small muted">Safety timer · check-in due at 25:00</div></div></div>${btn('I’m fine', { variant: 'primary', size: 'sm', icon: 'thumbs-up', toast: 'Checked in — timer reset (demo)' })}</div>
  </div>

  ${step(1, 'Check the attendee in', `
    ${who('Sofia Marchetti', 'Booked Sun 22 Nov · Italian · works at a DIFC law firm', badge('ID verified', 'ok', { icon: 'badge-check' }))}
    ${kv([['Verified with', 'UAE Pass · Emirates ID'], ['Door code she will show', '<b class="num">8 2 0 5</b>'], ['Looking for', 'Studio, furnished, up to AED 58,000'], ['Wants to move', 'Tue 1 Dec 2026'], ['Bringing', 'Just herself']])}
    <div class="btn-row">${btn('Code matches', { variant: 'primary', icon: 'check', toast: 'Sofia checked in at 09:01 (demo)' })}${btn('No-show', { icon: 'user-x', sheet: 'sheet-noshow' })}</div>`, 'done')}

  ${step(2, 'Show the permit if asked', `
    <div class="permit">${qr('trakheesi-' + p.permit)}<div class="grow"><b class="strong">Trakheesi permit ${p.permit}</b><div class="small muted">Issued to openrent.me · ${'ORN 31877'}<br>Valid to 9 Feb 2027 · scan to verify with DLD</div></div></div>
    <div class="cluster">${rule('DXB-002', 'Advertising permit')}${badge('Your BRN card: valid', 'ok', { icon: 'id-card' })}</div>`, 'done')}

  ${step(3, 'Talking points', `
    <ul class="stack stack-sm small">
      ${[['sofa', 'Furnished: bed, sofa, dining set, TV, washer-dryer — all on the inventory'], ['thermometer-snowflake', 'Chiller is billed to the tenant by the building (about AED 180 / month)'], ['car', 'One covered parking bay, P2-118'], ['dumbbell', 'Gym and pool on level 5, open 06:00–23:00'], ['train-front', 'Bus 25 minutes to the metro; Circle Mall 6 minutes on foot'], ['paw-print', 'Landlord will consider one small pet — goes in the contract if agreed']].map(([ic, t]) => `<li class="inline" style="align-items:flex-start">${icon(ic, 16, 't-brand')}<span>${t}</span></li>`).join('')}
    </ul>
    ${facts([['calendar', 'Available now'], ['wallet', '1–12 payments'], ['lock-keyhole', 'Deposit AED 5,400']])}`, 'now')}

  ${step(4, 'Capture feedback', `
    <div class="field"><span class="label">How interested is she?</span>${seg('int', [{ id: '1', label: 'No' }, { id: '2', label: 'Maybe' }, { id: '3', label: 'Keen' }, { id: '4', label: 'Offering' }], '3', 'block')}</div>
    <div class="field"><span class="label">What did she say?</span>${chips(['Loved the light', 'Kitchen small', 'Price fair', 'Price high', 'Wants pet clause', 'Noise concern', 'Parking matters'], 0, 'wrap').replace('data-chips', 'data-chips data-multi')}</div>
    ${field({ label: 'Notes for the landlord', type: 'textarea', value: 'Asked whether the sofa can be removed — has her own. Would pay in 4 cheques.' })}
    <div class="field"><span class="label">Anything to fix before the next viewing?</span><label class="checkline"><input type="checkbox"> Bulb out in bathroom</label><label class="checkline"><input type="checkbox" checked> Balcony door sticks — raise a repair</label></div>`)}

  <div class="sticky-cta">${btn('Pause', { icon: 'pause', toast: 'Viewing paused (demo)' })}${btn('End & send feedback', { variant: 'primary', icon: 'send', sheet: 'sheet-end' })}</div>
</div>

<aside class="stack">
  ${guard({ title: 'While you are hosting', sub: 'You represent a RERA-licensed broker', checks: [
    { state: 'ok', title: 'Quote only the advertised rent', sub: 'AED 54,000. Offers are made in the app, where the landlord sees them all.' },
    { state: 'block', title: 'Never take cash or a “holding deposit”', sub: 'Deposits are paid to the safeguarded client account after an offer is accepted.', rule: rule('OR-101', 'Deposits') },
    { state: 'block', title: 'No commission or tips from tenants', rule: rule('OR-105', 'No commission') },
    { state: 'info', title: 'Whole unit only', sub: 'If someone asks about sharing or bed spaces, explain that it needs a permit the owner does not hold.', rule: rule('DXB-S04', 'Shared housing') },
  ] })}
  ${card({ title: 'Today at Studio 915', flush: true, body: list([
    { lead: avatar('Sofia Marchetti', { size: 'sm' }), title: 'Sofia Marchetti', sub: '09:00', endBadge: badge('In progress', 'accent', { dot: true }) },
    { lead: avatar('Tariq Aziz', { size: 'sm' }), title: 'Tariq & Lina Aziz', sub: '09:30', endBadge: badge('Confirmed', 'ok') },
    { lead: avatar('Kwame Mensah', { size: 'sm' }), title: 'Kwame Mensah', sub: '10:15', endBadge: badge('Confirmed', 'ok') },
    { lead: avatar('Priya Nair', { size: 'sm' }), title: 'Priya Nair', sub: '15:00', endBadge: badge('ID pending', 'warn') },
  ]) })}
  ${card({ title: 'Access', body: kv([['Key set', 'K-0915 · with you'], ['Visitor parking', 'P1, tell security “915”'], ['Lift', 'Tower B, lifts 3–4'], ['Landlord', 'Fatima Al Hashimi · not attending']]) })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-end', 'End viewing',
    `${kv([['Attendee', 'Sofia Marchetti'], ['Duration', '14 minutes'], ['Interest', badge('Keen', 'ok')], ['Repair raised', 'Balcony door sticks']])}
     ${callout({ tone: 'brand', body: 'Fatima gets your notes straight away. Sofia gets a link to make an offer and a reminder of the move-in costs — with no agency commission.' })}
     <label class="checkline"><input type="checkbox" checked> Windows closed, lights and AC off, door locked</label>`,
    btn('Back', { attrs: { 'data-close': true } }) + btn('Send & next viewing', { variant: 'primary', toast: 'Feedback sent. Next: Tariq & Lina Aziz at 09:30 (demo)' }))
  + sheet('sheet-noshow', 'Mark as no-show',
    `<p class="small muted">Wait 10 minutes past the start time and try calling once before marking a no-show.</p>
     ${choice('ns', 'Did not arrive, did not answer', '', true)}${choice('ns', 'Cancelled at the door', '', false)}${choice('ns', 'Arrived but could not verify ID', 'Viewing cannot go ahead without a verified attendee', false)}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Confirm no-show', { variant: 'primary', toast: 'Marked as no-show. Landlord notified (demo)' })),
};

const roomRow = (name, n, state, note) => ({ icon: state === 'done' ? 'check' : state === 'now' ? 'camera' : 'circle', tone: state === 'done' ? 'ok' : state === 'now' ? 'accent' : '', title: name, sub: note, endBadge: state === 'done' ? badge('Done', 'ok') : state === 'now' ? badge('In progress', 'accent', { dot: true }) : badge(n + ' photos'), toast: `${name} opened (demo)`, chev: true });
const pair = (img, pos, label, taken) => `<div class="stack stack-sm"><div class="grid g2" style="gap:6px">
  <div class="cover tall"><img src="${B}assets/img/${img}" alt="Move-in photo: ${label}" style="object-position:${pos}"><div class="cover-tags">${glass('Move-in · 1 Dec 2025', null, true)}</div></div>
  ${taken ? `<div class="cover tall"><img src="${B}assets/img/${img}" alt="Check-out photo: ${label}" style="object-position:${pos}"><div class="cover-tags">${glass('Today', 'check')}</div><div class="cover-br"><button type="button" class="glass" data-toast="Camera opened with ghost overlay (demo)">${icon('rotate-ccw', 12)}Retake</button></div></div>`
    : `<button type="button" class="cover tall" style="display:grid;place-items:center;border:1.5px dashed #CFC8BA;background:transparent;color:var(--muted)" data-toast="Camera opened with ghost overlay of the move-in photo (demo)"><span class="stack stack-sm center" style="align-items:center">${icon('camera', 24)}<span class="small strong">Retake same angle</span></span></button>`}
</div><div class="between small"><b class="strong">${label}</b>${taken ? '' : badge('To do', 'warn')}</div></div>`;

const inspection = {
  slug: 'inspection', nav: 'inspection', title: 'Check-out inspection', sub: 'Al Ghozlan 3 · Apt 412', back: 'index.html',
  body: () => { const p = P.p5; return `
${callout({ tone: 'neutral', icon: 'calendar-clock', title: 'Scheduled for Mon 30 Nov 2026, 10:00', body: 'This workspace is pre-loaded with the move-in report. It is shown part-way through so you can see how capture works.' })}

<div class="split">
<div class="stack">
  <div class="card pad stack stack-md">
    <div class="between-top"><div class="inline" style="gap:12px">${thumb(p.img, 'lg', B)}<div><span class="eyebrow">Check-out · ${p.area}</span><h1 class="mt-1" style="font-size:22px">${p.name}</h1><div class="small muted">Tenant ${p.tenant} · tenancy ${p.start} – ${p.end}</div></div></div></div>
    <div class="stack stack-sm"><div class="between small"><span class="muted">3 of 6 rooms · 34 of 62 photos matched</span><b class="num">55%</b></div>${bar(55, 'accent')}</div>
  </div>

  ${card({ title: 'Rooms', flush: true, body: list([
    roomRow('Hall & entrance', 5, 'done', 'Same as move-in'),
    roomRow('Kitchen', 14, 'done', 'Fair wear: worktop edge · 1 item flagged (oven door seal)'),
    roomRow('Bathroom', 9, 'done', 'Same as move-in'),
    roomRow('Living room', 16, 'now', '6 of 16 photos retaken'),
    roomRow('Bedroom', 12, '', 'Not started'),
    roomRow('Balcony', 6, '', 'Not started'),
  ]) })}

  <section class="card pad stack">
    <div class="between"><div><span class="eyebrow">Room 4 of 6</span><h2 class="mt-1">Living room</h2></div>${badge('6 / 16', 'accent')}</div>
    ${pair('living-c.svg', '20% 50%', 'North wall and window', true)}
    <div class="field"><span class="label">Condition compared with move-in</span>${seg('c1', [{ id: 'same', label: 'Same' }, { id: 'wear', label: 'Fair wear' }, { id: 'dmg', label: 'Damage' }, { id: 'miss', label: 'Missing' }], 'same', 'block')}</div>
    <hr class="divider">
    ${pair('living-c.svg', '80% 60%', 'Wall behind sofa', true)}
    <div class="field"><span class="label">Condition compared with move-in</span>${seg('c2', [{ id: 'same', label: 'Same' }, { id: 'wear', label: 'Fair wear' }, { id: 'dmg', label: 'Damage' }, { id: 'miss', label: 'Missing' }], 'wear', 'block')}</div>
    ${field({ label: 'What you see', type: 'textarea', value: 'Two picture-hook holes and light scuffing at sofa height. Consistent with 12 months of normal use.' })}
    ${callout({ tone: 'ok', icon: 'scale', title: 'Recorded as fair wear and tear', body: 'Small fixing holes and light scuffs are normal use. You record what you see — you do not decide deductions.', rules: [rule('DXB-021', 'Art. 21')] })}
    <hr class="divider">
    ${pair('living-c.svg', '50% 90%', 'Floor by balcony door', false)}
    <div class="btn-row">${btn('Add extra photo', { icon: 'image-plus', toast: 'Camera opened (demo)' })}${btn('Next photo', { variant: 'primary', iconEnd: 'arrow-right', toast: 'Photo 8 of 16 (demo)' })}</div>
  </section>

  ${card({ title: 'Meter readings', body: `<div class="form-grid c2">${field({ label: 'Electricity', value: '61,904', suffix: 'kWh', inputmode: 'numeric', hint: 'Move-in: 54,310 kWh' })}${field({ label: 'Water', value: '2,418', suffix: 'm³', inputmode: 'numeric', hint: 'Move-in: 2,291 m³' })}</div><div class="mt-3">${btn('Photograph meters', { icon: 'camera', size: 'sm', toast: 'Camera opened (demo)' })}</div>` })}

  ${card({ title: 'Keys and access returned', body: `<div class="stack stack-sm">
    <label class="checkline"><input type="checkbox" checked> 2 of 2 door keys</label>
    <label class="checkline"><input type="checkbox" checked> 2 of 2 building access cards</label>
    <label class="checkline"><input type="checkbox"> 1 of 1 parking tag <span class="badge warn" style="margin-left:6px">Tenant to drop at concierge</span></label>
    <label class="checkline"><input type="checkbox" checked> Mailbox key</label></div>` })}

  ${card({ title: 'Sign-off', flush: true, body: list([
    { lead: avatar('Olena Kovalenko'), title: 'Olena Kovalenko', sub: 'Tenant · signs on your phone, can add her own comments', endBadge: badge('After last room'), sheet: 'sheet-sign', chev: true },
    { lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'Field agent · confirms the report is complete and unedited', endBadge: badge('After last room') },
    { lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · receives the report; has 5 days to propose deductions with photo references', endBadge: badge('Notified') },
  ]) })}

  <div class="sticky-cta">${btn('Save & exit', { icon: 'save', toast: 'Saved offline — syncs when you have signal (demo)' })}${btn('Finish room', { variant: 'primary', icon: 'check', toast: 'Living room: 10 photos still to retake (demo)' })}</div>
</div>

<aside class="stack">
  ${guard({ title: 'Fair inspection rules', checks: [
    { state: 'ok', title: 'Same rooms, same angles', sub: 'The camera overlays the move-in photo so comparisons are like for like.' },
    { state: 'ok', title: 'Wear is not damage', sub: 'Faded paint, worn sealant, light scuffs, small fixing holes: fair wear and tear.', rule: rule('DXB-021', 'Art. 21') },
    { state: 'info', title: 'You gather evidence, not verdicts', sub: 'Deductions are proposed by the landlord and need a photo from this report. The tenant can dispute each one.', rule: rule('OR-101', 'Deposit standard') },
    { state: 'block', title: 'Photos cannot be edited or deleted', sub: 'Every image carries time, location and device. Retakes are added, never replaced.' },
  ] })}
  ${card({ title: 'Deposit at stake', body: kv([['Held in client account', money(4400)], ['Due back to tenant by', 'Mon 14 Dec 2026'], ['Items flagged so far', '1 · oven door seal'], ['Already noted at move-in', '4 items — not chargeable']]) })}
  ${card({ title: 'Flagged items', flush: true, body: list([
    { icon: 'flag', tone: 'warn', title: 'Oven door seal torn', sub: 'Kitchen · photo 11 · not present at move-in · tenant says it perished', endBadge: badge('Damage?', 'warn'), toast: 'Item opened (demo)', chev: true },
  ]) })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-sign', 'Tenant sign-off',
    `<p class="small muted">Hand the phone to Olena. She can scroll every photo and note before signing.</p>
     ${field({ label: 'Tenant comments (optional)', type: 'textarea', placeholder: 'e.g. Oven seal was already brittle when I moved in' })}
     <div class="field"><span class="label">Signature</span><div style="height:120px;border:1.5px dashed #CFC8BA;border-radius:14px;display:grid;place-items:center;color:var(--faint)">${icon('signature', 28)}</div></div>
     <label class="checkline"><input type="checkbox"> I agree this is an accurate record of the home today. Signing does not mean I accept any deduction.</label>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Sign report', { variant: 'primary', icon: 'pen-line', toast: 'Available once all rooms are finished (demo)' })),
};

const keyRow = (prop, items, holder, since, state, tone) => [`<b>${prop}</b><div class="small muted">${items}</div>`, holder, since, badge(state, tone)];

const handovers = {
  slug: 'handovers', nav: 'handovers', title: 'Keys & handovers', sub: '5 key sets tracked',
  body: () => `
${pageHead({ title: 'Keys & handovers', sub: 'Who holds which keys, right now — and what must be true before a new tenant gets theirs.', actions: btn('Scan key tag', { icon: 'scan-line', variant: 'primary', toast: 'Scanner opened (demo)' }) })}

<div class="split">
<div class="stack">
  ${card({ title: 'Key log', flush: true, body: ui.table({ cols: [{ label: 'Key set' }, { label: 'Held by' }, { label: 'Since' }, { label: 'Status', r: true }], rows: [
    keyRow('K-0915 · Bloom Towers B 915', '1 key · 1 access card', 'Jun Reyes (you)', 'Today 08:27', 'With you', 'accent'),
    keyRow('K-1807 · Executive Towers K 1807', '2 keys · 2 cards · 1 parking tag', 'Office key safe · slot 14', 'Fri 20 Nov', 'In safe', 'ok'),
    keyRow('K-3102 · Burj Vista 1 3102', '1 key · 1 card', 'Building concierge', 'Mon 16 Nov', 'At concierge', 'brand'),
    keyRow('K-0412 · Al Ghozlan 3 412', '2 keys · 2 cards · 1 tag · mailbox', 'Tenant · Olena Kovalenko', '1 Dec 2025', 'Due back 30 Nov', 'gold'),
    keyRow('K-2304 · Marina Gate 1 2304', '2 keys · 2 cards · 1 tag', 'Tenant · Maya Fernandes', '1 Mar 2026', 'With tenant', ''),
  ] }), foot: `<span class="small muted">Every hand-over is scanned in and out. Nothing leaves the safe without a booking.</span>` })}

  ${card({ title: 'Smart locks and lockboxes', flush: true, body: list([
    { icon: 'lock-keyhole', tone: 'brand', title: 'Bloom Towers B 915 · door lock', sub: 'Viewing code valid today 08:30–17:00 only · changes daily', end: '•• •• 41', toast: 'Full code shown for 10 seconds (demo)', chev: true },
    { icon: 'key-square', tone: '', title: 'Burj Vista 1 3102 · concierge lockbox', sub: 'Photographer access Thu 26 Nov 10:30–13:00 · single use', end: 'Not yet issued', toast: 'Code is issued 30 minutes before the booking (demo)', chev: true },
    { icon: 'lock', tone: 'ok', title: 'Executive Towers K 1807 · door lock', sub: 'Tenant code will be created at handover and yours removed', endBadge: badge('Ready', 'ok') },
  ]) })}

  <section class="card pad stack">
    <div class="between-top"><div class="inline" style="gap:12px">${thumb('p4.svg', 'lg', B)}<div><span class="eyebrow">Move-in handover · Sat 5 Dec, 10:00</span><h2 class="mt-1">Executive Towers K · Apt 1807</h2><div class="small muted">Arjun &amp; Neha Mehta · Business Bay</div></div></div></div>
    ${lifecycle([{ label: 'Contract', icon: 'file-signature' }, { label: 'Payments', icon: 'banknote' }, { label: 'Ejari', icon: 'file-badge' }, { label: 'Snag check', icon: 'search-check' }, { label: 'Report', icon: 'camera' }, { label: 'Keys', icon: 'key-round' }], 0)}
    ${guard({ title: 'Keys stay locked until all of these are green', sub: 'The app will not let you record a handover before then', checks: [
      { state: 'warn', title: 'Contract signed by both parties', sub: 'Tenants signed Sun 22 Nov. Waiting for the landlord’s signature.' },
      { state: 'ok', title: 'Security deposit received', sub: 'AED 6,750 in the safeguarded client account.', rule: rule('OR-101', 'Deposits') },
      { state: 'warn', title: 'First cheque received and logged', sub: '4 cheques expected · tenants bringing them to the office Thu 26 Nov.' },
      { state: 'warn', title: 'Ejari certificate on file', sub: 'Submitted automatically once both have signed.', rule: rule('DXB-001', 'Ejari') },
      { state: 'info', title: 'Occupants confirmed', sub: '2 adults declared. Ask on the day if anyone else is moving in.', rule: rule('DXB-OCC', 'Co-occupants') },
    ] })}
    <div class="hr-label">On the day</div>
    <div class="stack stack-sm">
      ${['Walk the home together and take the move-in condition report (about 70 photos)', 'Record electricity and water meter readings', 'Test AC in every room, hot water, hob, oven and all taps', 'Show isolation valves, DB board and chiller controls', 'Hand over 2 keys, 2 access cards and the parking tag — scan each one', 'Create the tenants’ door code and delete yours', 'Give the building move-in permit to security', 'Both tenants sign the report on your phone'].map(t => `<label class="checkline"><input type="checkbox"> ${t}</label>`).join('')}
    </div>
    <div class="btn-row">${btn('Snag list from today', { icon: 'list-checks', sheet: 'sheet-snag' })}${btn('Start handover', { variant: 'primary', icon: 'key-round', cls: 'is-disabled' })}</div>
    <p class="small muted center">“Start handover” unlocks when the four checks above are green.</p>
  </section>
</div>

<aside class="stack">
  ${ui.stats([{ label: 'With you', icon: 'key-round', value: '1', sub: 'return by 17:00' }, { label: 'In office safe', icon: 'lock', value: '1' }, { label: 'Due back', icon: 'calendar-clock', value: '1', sub: 'Mon 30 Nov' }, { label: 'Lost this year', icon: 'shield-check', value: '0' }], 'g2')}
  ${callout({ tone: 'warn', icon: 'triangle-alert', title: 'If a key goes missing', body: 'Report it at once. The lock is changed the same day at openrent.me’s cost and the tenant or landlord is told.' })}
  ${card({ title: 'Recent scans', body: timeline([
    { state: 'done', icon: 'scan-line', title: 'K-0915 signed out', body: 'Bloom Towers concierge → Jun Reyes', when: 'Today, 08:27' },
    { state: 'done', icon: 'scan-line', title: 'K-1807 into office safe', body: 'Returned by previous tenant · slot 14', when: 'Fri 20 Nov, 16:10' },
    { state: 'done', icon: 'scan-line', title: 'K-3102 left with concierge', body: 'For photographer access on 26 Nov', when: 'Mon 16 Nov, 11:45' },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-snag', 'Snag list · Apt 1807',
    `<p class="small muted">From today’s 12:30 walk-round. Anything open is sent to the landlord to fix before 5 Dec.</p>
     <div class="card">${list([
       { icon: 'check', tone: 'ok', title: 'AC cooling in all 3 rooms', sub: 'Supply air 13°C' },
       { icon: 'check', tone: 'ok', title: 'Hot water in both bathrooms' },
       { icon: 'wrench', tone: 'warn', title: 'Master bathroom tap drips', sub: 'Raise repair — landlord pays', endBadge: badge('Open', 'warn') },
       { icon: 'wrench', tone: 'warn', title: 'Kitchen cupboard hinge loose', sub: 'Raise repair — landlord pays', endBadge: badge('Open', 'warn') },
     ])}</div>
     ${callout({ tone: 'brand', body: 'Defects found before move-in are the landlord’s to fix.', rules: [rule('DXB-016', 'Art. 16')] })}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Send 2 repairs to landlord', { variant: 'primary', toast: 'Two repairs raised for Fatima to approve (demo)' })),
};

module.exports = [today, viewing, inspection, handovers];
