const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, cover, glass, facts, bar, timeline, avatar, money, sectionHead, sheet, stats, pageHead, tabs, panel, docIco, qr, field, choice, toggle, lineChart, thumb, chips } = ui;
const { P, company } = require('../../lib/data');
const B = '../../';
const p6 = P.p6, p2 = P.p2;

const stepTab = (id, n, label, done) => ({ id, label: `${done ? icon('circle-check', 15, 't-ok') : `<span class="n">${n}</span>`} ${label}` });
const next = (to, label = 'Continue') => `<div class="btn-row">${btn('Save draft', { toast: 'Draft saved' })}<a class="btn primary" href="#tab=wiz:${to}" onclick="var b=document.querySelector('[data-tabs=wiz] [data-tab=${to}]');if(b){b.click();window.scrollTo({top:0,behavior:'smooth'})}return false"><span>${label}</span>${icon('arrow-right', 18)}</a></div>`;
const amenity = (label, on) => `<button type="button" class="chip${on ? ' is-active' : ''}">${label}</button>`;
const tick = (title, sub, on, o = {}) => `<div class="row"><div class="row-main"><div class="row-title">${title}${o.badge || ''}</div>${sub ? `<div class="row-sub">${sub}</div>` : ''}</div>${toggle(on, o)}</div>`;

const listingNew = {
  slug: 'listing-new', nav: 'listing', title: 'Create listing', sub: 'Burj Vista 3102 · step 4 of 6', back: 'properties.html',
  body: () => `
<div class="card pad stack stack-md">
  <div class="inline" style="gap:12px">${thumb(p6.img, 'lg', B)}<div class="grow"><span class="eyebrow">New listing · draft</span><h1 style="font-size:22px" class="mt-1">${p6.name}</h1><p class="small muted">${p6.area} · 2 bed · ${p6.sqft.toLocaleString('en-US')} sq ft · furnished</p></div></div>
  <div class="stepper-head"><span class="small strong nowrap">3 of 6 complete</span>${bar(50, 'accent')}<span class="small muted nowrap">≈ 6 min left</span></div>
</div>

${tabs('wiz', [stepTab('own', 1, 'Ownership', true), stepTab('details', 2, 'Details', true), stepTab('photos', 3, 'Photos', true), stepTab('rent', 4, 'Rent & terms'), stepTab('forma', 5, 'Form A & permit'), stepTab('review', 6, 'Review')], 'rent')}

${panel('wiz', 'own', `<div class="split">
<div class="stack">
  ${card({ title: 'Prove it is yours to let', flush: true, body: list([
    { lead: docIco(), title: 'Title deed', sub: 'No. 4471/2019 · Burj Khalifa district, plot 345-1182 · matched to Dubai Land Department on Fri 20 Nov', endBadge: badge('Verified', 'ok', { icon: 'badge-check' }) },
    { icon: 'fingerprint', tone: 'ok', title: 'Owner identity — UAE Pass', sub: 'Fatima Al Hashimi · Emirates ID matches the name on the deed', endBadge: badge('Matched', 'ok') },
    { icon: 'users', title: 'Co-owners', sub: 'None on this deed. Joint owners must each confirm before publishing.', endBadge: badge('Not needed') },
    { icon: 'stamp', title: 'Letting through a representative?', sub: 'Upload a notarised power of attorney and we verify it before they can act.', toast: 'Power of attorney upload (demo)', chev: true },
  ]) })}
  ${next('details')}
</div>
<aside class="stack">
  ${guard({ title: 'Ownership checks', checks: [
    { state: 'ok', title: 'Deed and ID agree', sub: 'Only the owner — or a verified PoA holder — can let a home.', rule: rule('DXB-003', 'Owner check') },
    { state: 'ok', title: 'No live tenancy on this unit', sub: 'The last Ejari was cancelled on 2 Nov 2026.', rule: rule('DXB-001', 'Ejari') },
    { state: 'ok', title: 'Free to re-let', sub: 'No own-use recovery in the past 24 months.', rule: rule('DXB-026', 'Re-letting lock') },
  ] })}
</aside></div>`)}

${panel('wiz', 'details', `<div class="split">
<div class="stack">
  ${card({ title: 'The home', body: `<div class="form-grid c2">
    ${field({ label: 'Property type', type: 'select', options: ['Apartment', 'Villa', 'Townhouse', 'Studio', 'Penthouse'], value: 'Apartment' })}
    ${field({ label: 'Furnishing', type: 'select', options: ['Furnished', 'Unfurnished', 'Part furnished'], value: 'Furnished' })}
    ${field({ label: 'Bedrooms', type: 'select', options: ['Studio', '1', '2', '3', '4', '5+'], value: '2' })}
    ${field({ label: 'Bathrooms', type: 'select', options: ['1', '2', '3', '4+'], value: '2' })}
    ${field({ label: 'Size', value: '1,180', suffix: 'sq ft', inputmode: 'numeric' })}
    ${field({ label: 'Floor', value: '31', inputmode: 'numeric' })}
    ${field({ label: 'Available from', type: 'date', value: '2026-12-10' })}
    ${field({ label: 'Parking bays', type: 'select', options: ['0', '1', '2'], value: '1' })}
    ${field({ label: 'Headline', value: 'Furnished 2-bed with full Burj Khalifa and fountain view', cls: 'span2' })}
    ${field({ label: 'Description', type: 'textarea', value: 'High-floor corner apartment in Burj Vista 1, five minutes’ walk to Dubai Mall through the air-conditioned link. Fully furnished, two en-suite bedrooms, fitted kitchen with appliances, and a balcony facing the fountain.', cls: 'span2' })}
  </div>` })}
  ${card({ title: 'Amenities', body: `<div class="chips wrap" data-chips data-multi>${[['Balcony', 1], ['Burj view', 1], ['Shared pool', 1], ['Gym', 1], ['Covered parking', 1], ['Concierge', 1], ['Built-in wardrobes', 1], ['Kitchen appliances', 1], ['Pets considered', 0], ['Maid’s room', 0], ['Private garden', 0], ['Study', 0]].map(([l, on]) => amenity(l, on)).join('')}</div>` })}
  ${next('photos')}
</div>
<aside class="stack">
  ${callout({ tone: 'brand', title: 'Describe it as it is', body: 'Size, bedroom count and view are checked against the title deed and floor plan. Adverts that overstate are paused by a manager before they go live.' })}
  ${card({ title: 'Who can live here', body: `<div class="stack stack-sm">${choice('unit', 'Whole apartment', 'One contract for the full unit', true)}${choice('unit', 'Room by room or bed spaces', 'Needs a Dubai Municipality shared-housing permit', false, { locked: true, badge: badge('Locked', 'danger', { icon: 'lock' }) })}</div><div class="mt-3">${rule('DXB-S04', 'Shared housing')}</div>` })}
</aside></div>`)}

${panel('wiz', 'photos', `<div class="split">
<div class="stack">
  ${card({ title: 'Photos', headEnd: badge('Pro shoot booked', 'ok', { icon: 'camera' }), body: `
    <div class="photo-grid">${['living-c', 'bedroom-b', 'kitchen-b', 'bath-a', 'p6'].map(i => `<div class="ph"><img src="${B}assets/img/${i}.svg" alt=""></div>`).join('')}<button type="button" class="ph add" data-toast="Photo library opened (demo)">${icon('image-plus', 22)}</button></div>
    <p class="small muted mt-3">These five are your own phone shots. They will be replaced by the professional set after Thursday’s shoot — you approve the final order.</p>` })}
  <div class="card pad between"><div class="inline" style="gap:12px"><span class="row-ico accent">${icon('camera', 20)}</span><div><b class="strong">Professional photos & floor plan</b><div class="small muted">Thu 26 Nov, 10:00 · Jun Reyes will let the photographer in</div></div></div><div class="right nowrap"><b class="num">AED 449</b><div class="micro muted">add-on</div></div></div>
  ${next('rent')}
</div>
<aside class="stack">
  ${card({ title: 'Photo checklist', body: `<ul class="stack stack-sm small">${['Every room, in daylight', 'The actual view from the balcony', 'Kitchen appliances and bathrooms', 'Building entrance, pool and gym', 'No people, no number plates'].map(t => `<li class="inline">${icon('check', 16, 't-ok')} ${t}</li>`).join('')}</ul>` })}
  ${callout({ tone: 'neutral', icon: 'scan-eye', title: 'Real photos only', body: 'Renders, stock images and photos of a different unit are not accepted for a let property.' })}
</aside></div>`)}

${panel('wiz', 'rent', `<div class="split">
<div class="stack">
  ${card({ title: 'Asking rent', body: `
    ${field({ label: 'Annual rent', value: '195,000', prefix: 'AED', suffix: 'per year', inputmode: 'numeric', hint: 'That is AED 16,250 a month. New lets are priced by agreement — the index cap applies from the first renewal.', hintTone: 'good' })}
    <div class="mt-4">
      <div class="between small"><b class="strong">Furnished 2-beds let in Burj Vista · last 90 days</b><span class="muted">11 lets</span></div>
      <div class="meter">
        <div class="meter-track" style="background:linear-gradient(to right,#E4DDD0 0 25.7%,#CFE6DF 25.7% 74.3%,#E4DDD0 74.3%)"></div>
        <div class="meter-pin bottom" style="left:25.700%" data-label="Lowest 178k"></div>
        <div class="meter-pin accent top" style="left:50%" data-label="Your ask 195k"></div>
        <div class="meter-pin bottom" style="left:74.300%" data-label="Highest 212k"></div>
      </div>
      <p class="small muted">You are priced at the middle of what has actually been agreed in the building. Homes at this level have let in a median of <b class="strong">16 days</b>. The Smart Rental Index average for this unit type is <b class="strong num">AED 196,000</b>.</p>
    </div>` })}

  ${card({ title: 'Security deposit', body: `
    <div class="field"><label for="dep">Deposit to request</label>
      <div class="between"><span class="hero-num">AED <span data-out="dep">19,500</span></span>${badge('At the cap · 10%', 'warn')}</div>
      <input class="range" type="range" id="dep" min="0" max="19500" step="250" value="19500">
      <div class="between micro muted"><span>AED 0</span><span>Maximum AED 19,500 — the slider stops here</span></div>
    </div>
    <p class="small muted mt-3">Furnished homes may ask for up to 10% of annual rent. The deposit is held in the safeguarded client account, not paid to you, and released within 14 days of check-out.</p>
    <div class="mt-3">${rule('OR-101', 'Deposit standard')} ${rule('DXB-020', 'Art. 20')}</div>` })}

  ${card({ title: 'Payment plans you will accept', flush: true, body: `<div class="list">
    ${tick('1 cheque', 'AED 195,000 up front', true)}
    ${tick('2 cheques', 'AED 97,500 each', true)}
    ${tick('4 cheques', 'AED 48,750 each', true)}
    ${tick('12 monthly direct debits', 'AED 16,250 · Flexi Rent — widens your pool of tenants', true, { badge: badge('Recommended', 'brand') })}
  </div><div class="card-body" style="padding-top:0"><p class="small muted">The annual rent is the same whichever plan a tenant picks. You may discount for fewer cheques; you may not add a surcharge for more.</p><div class="mt-2">${rule('DXB-PAY', 'Payment terms')}</div></div>` })}
  ${next('forma')}
</div>
<aside class="stack">
  ${guard({ title: 'Checked as you type', sub: 'Ruleset Dubai 2026.3', checks: [
    { state: 'ok', title: 'Deposit is within the cap', sub: 'AED 19,500 is exactly 10% of AED 195,000.', rule: rule('OR-101', 'Deposit standard') },
    { state: 'ok', title: 'Rent is the only recurring charge', sub: 'No “admin”, “key” or “renewal” fees can be added to an advert.', rule: rule('OR-105', 'No hidden fees') },
    { state: 'ok', title: 'Whole-unit let', sub: 'Room-by-room letting is locked without a shared-housing permit.', rule: rule('DXB-S04', 'Shared housing') },
    { state: 'info', title: 'Service charges stay with you', sub: 'Owners’ association fees cannot be passed to the tenant unless the contract says so.' },
  ] })}
  ${card({ title: 'What a tenant pays on day one', body: kv([['First instalment (monthly plan)', money(16250)], ['Deposit (refundable)', money(19500)], ['Move.me fee + VAT', 'AED 261.45'], ['Ejari (government fee)', 'AED 177.75'], ['Agency commission', '<span class="t-ok">AED 0</span>'], ['Total', 'AED 36,189.20']], 'total') + `<p class="small muted mt-3">With a traditional agent the same tenant would add AED 9,750 + VAT in commission.</p>` })}
</aside></div>`, true)}

${panel('wiz', 'forma', `<div class="split">
<div class="stack">
  ${card({ title: 'Form A — marketing agreement', headEnd: badge('Needs your signature', 'accent'), body: `
    <p class="small muted">Dubai only allows a home to be advertised by a licensed broker with the owner’s signed agreement. This is the standard RERA Form A.</p>
    <div class="mt-3">${kv([['Owner', 'Fatima Al Hashimi'], ['Broker', `${company.legal.replace(' (demo entity)', '')}`], ['Office registration', company.orn], ['Responsible broker', 'Layla Haddad · BRN 61204'], ['Property', p6.name], ['Asking rent', money(195000) + ' / year'], ['Agreement', 'Non-exclusive · 90 days · cancel any time'], ['Commission', 'None — flat List.me fee']])}</div>
    <div class="mt-4">${btn('Sign Form A with UAE Pass', { variant: 'primary', icon: 'fingerprint', block: true, sheet: 'sheet-forma' })}</div>` })}
  <div class="permit" style="align-items:flex-start">${qr('permit-pending-p6').replace('class="qr"', 'class="qr" style="opacity:.25"')}<div class="grow"><b class="strong">Trakheesi advertising permit</b><div class="mt-1">${badge('Waiting for Form A', 'warn')}</div><div class="small muted mt-2">Requested by openrent.me the moment Form A is signed, and usually issued within one working day. The number and QR code are printed on your advert automatically.</div></div></div>
  ${next('review')}
</div>
<aside class="stack">
  ${guard({ title: 'Why this step exists', checks: [
    { state: 'warn', title: 'No permit, no advert', sub: 'The listing cannot go live — here or on partner portals — until the permit is active.', rule: rule('DXB-002', 'Advert permit') },
    { state: 'ok', title: 'One permit per unit', sub: 'Stops duplicate and fake listings of your home.' },
    { state: 'info', title: 'Expiry is handled for you', sub: 'If a permit lapses the advert pauses and we renew it; you are told either way.' },
  ] })}
  ${card({ title: 'Your broker of record', body: `<div class="inline" style="gap:12px">${avatar('Layla Haddad', { size: 'lg', tone: 'c2' })}<div><b class="strong">Layla Haddad</b><div class="small muted">RERA-certified broker · BRN 61204</div><div class="small muted">${company.orn} · ${company.licence}</div></div></div>` })}
</aside></div>`)}

${panel('wiz', 'review', `<div class="split">
<div class="stack">
  ${card({ title: 'Ready to publish?', flush: true, body: list([
    { icon: 'circle-check', tone: 'ok', title: 'Ownership', sub: 'Title deed and UAE Pass identity verified', endBadge: badge('Done', 'ok') },
    { icon: 'circle-check', tone: 'ok', title: 'Details', sub: '2 bed · furnished · 1,180 sq ft · available 10 Dec', endBadge: badge('Done', 'ok') },
    { icon: 'circle-check', tone: 'ok', title: 'Photos', sub: '5 uploaded · professional shoot Thu 26 Nov', endBadge: badge('Done', 'ok') },
    { icon: 'circle-check', tone: 'ok', title: 'Rent & terms', sub: 'AED 195,000 · deposit AED 19,500 · 4 payment plans', endBadge: badge('Passes', 'ok') },
    { icon: 'pen-line', tone: 'accent', title: 'Form A', sub: 'Waiting for your signature', endBadge: badge('To do', 'accent') },
    { icon: 'qr-code', tone: 'warn', title: 'Trakheesi permit', sub: 'Requested automatically after Form A', endBadge: badge('Pending', 'warn') },
  ]) })}
  ${callout({ tone: 'warn', title: 'Two steps left before this can go live', body: 'Sign Form A now and the advert publishes by itself when the permit arrives — normally the next working day.', rules: [rule('DXB-002', 'Advert permit')] })}
  <div class="btn-row">${btn('Preview advert', { icon: 'eye', toast: 'Advert preview (demo)' })}${btn('Publish listing', { variant: 'primary', cls: 'is-disabled', icon: 'megaphone' })}</div>
</div>
<aside class="stack">
  ${card({ title: 'What you pay', body: kv([['List.me — permit, advert, enquiries', money(299)], ['Professional photos & floor plan', money(449)], ['VAT 5%', 'AED 37.40'], ['Commission', '<span class="t-ok">AED 0</span>'], ['Total today', 'AED 785.40']], 'total') + `<p class="small muted mt-3">Let.me (AED 899) is only charged when a tenant signs. A 5% agent would cost AED 9,750.</p>` })}
</aside></div>`)}`,
  sheets: () => sheet('sheet-forma', 'Sign Form A',
    `${kv([['Document', 'RERA Form A — marketing agreement'], ['Property', p6.name], ['Broker', company.orn + ' · BRN 61204'], ['Term', '90 days, non-exclusive']])}
     <label class="checkline"><input type="checkbox" checked> I am the owner named on the title deed and I authorise openrent.me to advertise this property.</label>
     ${callout({ tone: 'brand', icon: 'fingerprint', body: 'You will approve the signature in the UAE Pass app. We then request the Trakheesi permit and tell you when the advert is live.', rules: [rule('DXB-002', 'Advert permit')] })}`,
    btn('Not now', { attrs: { 'data-close': true } }) + btn('Sign with UAE Pass', { variant: 'primary', icon: 'fingerprint', toast: 'Form A signed. Permit requested — we will notify you (demo)' })),
};

const lead = (name, tone, sub, when, badges, o = {}) => ({ lead: avatar(name, { tone }), title: name, badge: badges, sub, endSub: when, unread: o.unread, toast: o.href ? null : `Conversation with ${name.split(' ')[0]} opened (demo)`, href: o.href, chev: true });

const listing = {
  slug: 'listing', nav: 'listing', title: 'Listings', sub: '1 live · 2 drafts',
  body: () => `
${pageHead({ eyebrow: 'Live for 14 days', title: 'Bloom Towers B · Studio 915', sub: 'Jumeirah Village Circle · furnished studio · asking AED 54,000 a year', actions: btn('Edit', { icon: 'pencil', size: 'sm', sheet: 'sheet-edit' }) + btn('Share', { icon: 'share-2', size: 'sm', toast: 'Link copied: openrent.me/l/bloom-915' }) + btn('Pause', { icon: 'pause', size: 'sm', sheet: 'sheet-pause' }) })}

<div class="grid g2 lg4">
  ${ui.stat({ label: 'Views', icon: 'eye', value: '1,842', delta: '12%', sub: 'vs last week' })}
  ${ui.stat({ label: 'Saved', icon: 'heart', value: '96' })}
  ${ui.stat({ label: 'Enquiries', icon: 'message-circle', value: '23', sub: '14 verified' })}
  ${ui.stat({ label: 'Viewings', icon: 'calendar-days', value: '6', sub: '4 done last week' })}
</div>

<div class="split">
<div class="stack">
  <a class="card accent pad between" href="offers.html"><div class="inline" style="gap:12px">${icon('hand-coins', 24)}<div><b class="strong">2 offers to review</b><div class="small muted">AED 54,000 in 4 cheques · AED 52,000 paid monthly</div></div></div>${icon('chevron-right', 20)}</a>

  ${card({ title: 'Views per day', headEnd: `<span class="small muted">10 – 23 Nov</span>`, body: lineChart({ labels: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], series: [{ tone: 'brand', data: [212, 188, 141, 120, 164, 171, 118, 102, 96, 110, 139, 122, 84, 75] }], min: 0, label: 'Listing views per day over 14 days' }) + `<p class="small muted mt-2">A second wave on Sat 14 Nov followed the weekend boost on partner portals.</p>` })}

  ${card({ title: 'Enquiries', link: ['All 23', 'messages.html'], flush: true, body: list([
    lead('Sofia Marchetti', 'c5', 'Viewed Thu 19 Nov · made an offer of AED 54,000', 'Sun', badge('Offer', 'accent') + badge('Verified', 'ok', { icon: 'badge-check' }), { href: 'offers.html' }),
    lead('Kwame Mensah', 'c2', 'Viewed Sat 21 Nov · made an offer of AED 52,000', 'Mon', badge('Offer', 'accent') + badge('Verified', 'ok', { icon: 'badge-check' }), { href: 'offers.html' }),
    lead('Daniela Costa', 'c1', '“Is the washing machine included? Free this evening.”', '09:14', badge('Viewing today', 'info') + badge('Verified', 'ok', { icon: 'badge-check' }), { unread: true }),
    lead('Omar Farouk', 'c3', 'Booked 18:15 today · relocating from Abu Dhabi in January', 'Mon', badge('Viewing today', 'info')),
    lead('Li Wei', 'c4', 'Asked about parking and chiller fees', 'Sun', badge('ID pending', 'warn')),
    lead('Aditya Rao', 'c6', 'Wants a 13-month contract — viewing Thursday', 'Sat', badge('Verified', 'ok', { icon: 'badge-check' })),
  ]) })}

  ${card({ title: 'Your other listings', flush: true, body: list([
    { href: 'listing-new.html', lead: thumb(P.p6.img, 'wide', B), title: 'Burj Vista 3102', badge: badge('Draft · step 4 of 6'), sub: 'Downtown Dubai · AED 195,000 · Form A to sign' },
    { href: 'moveout.html', lead: thumb(P.p5.img, 'wide', B), title: 'Al Ghozlan 412', badge: badge('Re-list ready', 'gold'), sub: 'The Greens · AED 92,000 · publishes after check-out on 30 Nov' },
  ]) })}
</div>

<aside class="stack">
  <div class="card" style="overflow:hidden">
    ${cover(p2.img, { cls: 'flat', alt: p2.name, tags: glass('Live', 'radio') + glass('Furnished', null, true), grad: `<div class="between"><b class="display" style="font-size:20px">AED 54,000<span class="small" style="opacity:.8"> / year</span></b><span class="small">410 sq ft</span></div>` }, B)}
    <div class="card-body stack stack-md">
      <div class="permit">${qr('trakheesi-' + p2.permit)}<div class="grow"><b class="strong">Trakheesi permit</b><div class="small muted">No. ${p2.permit}<br>Valid 10 Nov 2026 – 8 Feb 2027</div></div>${badge('Active', 'ok', { dot: true })}</div>
      <div>${rule('DXB-002', 'Advert permit')}</div>
    </div>
  </div>

  ${card({ title: 'Price check', body: `
    <div class="meter" style="margin-bottom:26px">
      <div class="meter-track" style="background:linear-gradient(to right,#E4DDD0 0 20%,#CFE6DF 20% 76%,#E4DDD0 76%)"></div>
      <div class="meter-pin bottom" style="left:20%" data-label="50k"></div>
      <div class="meter-pin accent top" style="left:58%" data-label="You 54k"></div>
      <div class="meter-pin bottom" style="left:76%" data-label="57k"></div>
    </div>
    <p class="small muted">Furnished studios in JVC have let between AED 50,000 and 57,000 this quarter, in a median of 19 days. You are on day 14 with two offers — no change suggested.</p>` })}

  ${card({ title: 'Where it is showing', flush: true, body: list([
    { icon: 'globe', tone: 'brand', title: 'openrent.me', sub: 'Search and map', endBadge: badge('Live', 'ok', { dot: true }) },
    { icon: 'layout-grid', title: 'Partner portals', sub: 'Syndicated with the same permit number', endBadge: badge('Live', 'ok', { dot: true }) },
    { icon: 'signpost', title: 'To-let board', sub: 'Not allowed in this community', endBadge: badge('Off') },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-edit', 'Edit listing',
    `${field({ label: 'Asking rent', value: '54,000', prefix: 'AED', suffix: 'per year', inputmode: 'numeric' })}
     ${field({ label: 'Available from', type: 'date', value: '2026-12-01' })}
     ${field({ label: 'Headline', value: 'Bright furnished studio with pool view, bills-ready' })}
     ${callout({ tone: 'neutral', body: 'Price and date changes go live immediately. Changes to size, bedrooms or photos are re-checked by a manager first.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save changes', { variant: 'primary', toast: 'Listing updated' }))
  + sheet('sheet-pause', 'Pause this listing?',
    `<p class="small muted">The advert disappears from search and partner portals. Booked viewings stay in place unless you cancel them, and your two offers remain open.</p>
     ${choice('pz', 'Pause for now', 'Resume any time while the permit is valid (to 8 Feb 2027)', true)}${choice('pz', 'Mark as let elsewhere', 'Closes the permit and cancels viewings', false)}`,
    btn('Keep live', { attrs: { 'data-close': true } }) + btn('Pause listing', { variant: 'primary', toast: 'Listing paused (demo)' })),
};

module.exports = [listingNew, listing];
