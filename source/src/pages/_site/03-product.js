const S = require('../../lib/site');
const ui = require('../../lib/ui');
const { icon, btn, badge, kv, rule, avatar, facts, glass, qr, callout, guard, field, choice, sheet, list, card } = ui;
const { phone, phoneFig, browser, ticks, secHead, ctaBand } = S;
const { rules, rulesets, R, company } = require('../../lib/data');
const rchip = (id, label) => rule(id, label, 'app/');

const legal = {
  slug: 'legal',
  render: () => {
    const pick = ['DXB-009', 'DXB-014', 'DXB-025B', 'DXB-025A', 'DXB-034', 'DXB-020', 'DXB-001', 'DXB-002', 'DXB-S04'];
    const kind = { law: ['Law', 'brand'], reg: ['Regulation', 'info'], std: ['Our standard', 'accent'] };
    return S.sitePage({
      title: 'The rulebook — Dubai tenancy law, built in · openrent.me', active: 'legal',
      body: `
<section class="sec" style="padding-bottom:24px"><div class="wrap">
  <div class="sec-head"><span class="kicker"><b>RULEBOOK</b> Dubai residential 2026.3</span><h1 class="d1">The law, built in.<br><span class="me">So nobody trips.</span></h1><p>Most tenancy disputes in Dubai start with an honest mistake — a notice sent late, an increase above the index, a deposit kept without evidence. openrent.me turns the rules into guardrails so the mistake cannot be made in the first place.</p></div>
  <div class="grid sm3">
    <div class="tile"><span class="big-num">${rules.filter(r => r.kind === 'law').length}</span><p>rules taken directly from Dubai tenancy law</p></div>
    <div class="tile"><span class="big-num">${rules.filter(r => r.kind === 'reg').length}</span><p>regulatory and registration requirements</p></div>
    <div class="tile"><span class="big-num">${rules.filter(r => r.kind === 'std').length}</span><p>openrent.me standards that go further than the law</p></div>
  </div>
</div></section>

<section class="sec white"><div class="wrap">
  ${secHead({ kicker: 'The principle', title: 'A floor, not a ceiling', sub: 'The law sets the minimum a tenant is owed. Landlords on openrent.me are free to offer more — a longer notice, a lower repair threshold, a friendlier break clause. What the product will not do is let anyone go below the line.' })}
  <div class="grid lg3">
    <div class="tile"><span class="row-ico danger">${icon('x', 22)}</span><h3>Blocked</h3><p>An action that would break a rule cannot be completed. The screen explains why and cites the source.</p><div class="callout danger" style="padding:10px 12px">${icon('octagon-alert', 18)}<p class="grow">AED 115,000 is above the AED 110,250 cap for this building.</p></div></div>
    <div class="tile"><span class="row-ico ok">${icon('check', 22)}</span><h3>Checked</h3><p>Lawful actions get a visible confirmation that both sides can rely on later.</p><div class="callout ok" style="padding:10px 12px">${icon('circle-check', 18)}<p class="grow">Sent 102 days before expiry — inside the 90-day rule.</p></div></div>
    <div class="tile"><span class="row-ico accent">${icon('plus', 22)}</span><h3>Better</h3><p>Terms more generous than the minimum are labelled, so good landlords get the credit.</p><div class="callout" style="padding:10px 12px;background:var(--accent-soft);color:var(--accent-ink);border-color:#F8D3C2">${icon('sparkles', 18)}<p class="grow">Early exit for one month’s rent, not two.</p></div></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'A few of the 25', title: 'Rules you will actually meet' })}
  <div class="grid lg3">${pick.map(id => { const r = R[id]; return `<a class="tile" href="app/rulebook.html#${id}"><div class="cluster">${badge(id, 'solid')}${badge(kind[r.kind][0], kind[r.kind][1])}</div><h3>${r.title}</h3><p>${r.plain}</p><span class="small muted inline">${icon('book-marked', 14)} ${r.src.split('·')[0]}</span></a>`; }).join('')}</div>
  <div class="mt-5">${btn('Open the full rulebook', { href: 'app/rulebook.html', variant: 'dark', iconEnd: 'arrow-right' })}</div>
</div></section>

<section class="sec dark"><div class="wrap feature">
  <div class="f-copy"><span class="eyebrow">Rulesets</span><h2 class="d2">Laws change. <span class="me">Tenancies should not have to guess.</span></h2>
    <p class="lead" style="color:#B9C8C3">Every legal change is published as a numbered ruleset with three answers attached: what changed, when it takes effect, and <b style="color:#fff">who it applies to</b>.</p>
    ${ticks(['<b>All tenancies</b> — protections that bite immediately, like the 2026 shared-housing rules', '<b>New tenancies only</b> — changes to how contracts are written', '<b>From next renewal</b> — anything that alters agreed terms', 'Both sides are told in plain words, in Arabic and English'])}
  </div>
  <div class="f-art" style="display:block"><div class="card" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff">${list(rulesets.map(r => ({ icon: 'git-commit-horizontal', tone: 'brand', title: `${r.v} · ${r.title}`, sub: `<span style="color:#9FB1AB">${r.summary}</span>`, endBadge: badge(r.scope, 'solid'), endSub: `<span style="color:#9FB1AB">${r.date}</span>` })))}</div></div>
</div></section>
<section class="sec tight"><div class="wrap narrow"><p class="small muted">These pages summarise Law No. 26 of 2007 as amended by Law No. 33 of 2008, Decree No. 43 of 2013, Decree No. 26 of 2013, Law No. 4 of 2026 and related Dubai Land Department and RERA procedures as understood in November 2026. They are a product concept, not legal advice — always check the official texts or a licensed adviser.</p></div></section>
${ctaBand('See a guardrail in action. <span class="me">Test me.</span>', 'Open the landlord renewal calculator and try to go over the cap.', btn('Try the rent calculator', { href: 'app/landlord/renewals.html', variant: 'white', size: 'lg' }))}`,
    });
  },
};

const how = {
  slug: 'how-it-works',
  render: () => {
    const stage = (n, title, t, l, o, chips = '') => `<div class="card pad stack stack-md"><div class="inline" style="gap:12px"><span class="pill-num">${n}</span><h3 class="d3">${title}</h3></div><div class="grid sm3"><div><span class="eyebrow t-accent">Tenant</span><p class="small mt-2">${t}</p></div><div><span class="eyebrow t-brand">Landlord</span><p class="small mt-2">${l}</p></div><div><span class="eyebrow">openrent.me</span><p class="small mt-2">${o}</p></div></div>${chips ? `<div class="cluster">${chips}</div>` : ''}</div>`;
    return S.sitePage({
      title: 'How it works — listing to keys back · openrent.me', active: 'how',
      body: `
<section class="sec" style="padding-bottom:20px"><div class="wrap"><div class="sec-head"><span class="kicker"><b>HOW IT WORKS</b> The whole tenancy</span><h1 class="d1">From “to let”<br>to <span class="me">keys back</span>.</h1><p>Who does what at each stage — and what the platform takes off everyone’s plate.</p></div></div></section>
<section class="sec tight"><div class="wrap stack">
  ${stage(1, 'Listing', 'Browse adverts that all carry a permit number and a verified-owner badge.', 'Upload the title deed, sign Form A, add photos, set rent and terms.', 'Matches owner to the DLD record, obtains the Trakheesi permit and QR, publishes.', rchip('DXB-002', 'Permit') + rchip('DXB-003', 'Owner check'))}
  ${stage(2, 'Viewings and offers', 'Book a slot, view, then offer a rent, payment plan and move-in date.', 'Host or delegate viewings. Compare offers on verified results.', 'Pre-qualifies enquiries, hosts viewings on request, keeps the record.')}
  ${stage(3, 'Verification and contract', 'Sign in with UAE Pass; consent to visa, income and credit checks. Sign the contract.', 'Set clauses — each shows its legal minimum. Countersign.', 'Runs checks, builds the bilingual unified contract, blocks unlawful terms.', rchip('DXB-001', 'Written & registered') + rchip('OR-102', 'Fair way out'))}
  ${stage(4, 'Money and Ejari', 'Pay the deposit and first instalment; set up direct debit or hand over cheques.', 'Receive rent to your bank; cheques held in custody.', 'Safeguards the deposit, registers Ejari, issues receipts.', rchip('OR-101', 'Deposit standard') + rchip('DXB-PAY', 'Payment terms'))}
  ${stage(5, 'Move-in', 'Walk through with the field agent; add notes within 7 days. Register who lives with you.', 'Approve the condition report.', 'Photographs every room, records meter readings and keys, guides DEWA set-up.', rchip('DXB-OCC', 'Co-occupants'))}
  ${stage(6, 'Living there', 'Pay rent, report repairs with photos, message your landlord.', 'Approve repairs within your spending limit; see rent arrive.', 'Decides who pays, dispatches vetted contractors, handles emergencies in 4 hours.', rchip('DXB-016', 'Repairs') + rchip('OR-104', 'Emergencies') + rchip('DXB-034', 'No cut-offs'))}
  ${stage(7, 'Renewal', 'Accept, counter or decline. Do nothing and the tenancy renews as is.', 'Propose changes at least 90 days ahead, within the index cap.', 'Calculates the cap, enforces the deadline, renews Ejari.', rchip('DXB-014', '90 days') + rchip('DXB-009', 'Rent cap') + rchip('DXB-006', 'Auto-renewal'))}
  ${stage(8, 'Ending and settling', 'Give notice, book check-out, get the deposit back in 14 days.', 'Serve lawful notices only; evidence any deduction.', 'Runs the inspection, mediates, cancels Ejari, prepares the RDC file if needed.', rchip('DXB-025B', '12-month notice') + rchip('DXB-021', 'Wear and tear') + rchip('DXB-RDC', 'Disputes'))}
</div></section>
${ctaBand('Walk it yourself. <span class="me">Follow me.</span>', 'The demo has one tenancy at every stage.', btn('Open the dashboards', { href: 'app/index.html', variant: 'white', size: 'lg' }))}`,
    });
  },
};

const listings = [
  ['listing.html', 'p2.svg', 'Furnished studio · Bloom Towers B', 'Jumeirah Village Circle', 54000, 'Studio', 1, 410, ['Monthly OK', 'Furnished'], true],
  ['#', 'x1.svg', '1 bed · Marina Promenade', 'Dubai Marina', 98000, '1 bed', 2, 790, ['Marina view'], false],
  ['#', 'x3.svg', '2 bed · Canal-side, Bay Square', 'Business Bay', 138000, '2 beds', 3, 1260, ['Monthly OK', 'Pets considered'], false],
  ['#', 'x4.svg', '1 bed · Boulevard Heights', 'Downtown Dubai', 125000, '1 bed', 2, 840, ['Burj view'], false],
  ['#', 'x5.svg', '1 bed · Al Ghozlan 3', 'The Greens', 92000, '1 bed', 1, 760, ['Coming 5 Dec'], false],
  ['#', 'p3.svg', '4 bed villa · Palma', 'Arabian Ranches 2', 295000, '4 beds', 5, 3480, ['Private pool'], false],
  ['#', 'p7.svg', '3 bed townhouse · Zahra', 'Town Square', 150000, '3 beds', 4, 2260, ['Pets considered'], false],
  ['#', 'x2.svg', '1 bed · Belgravia Square', 'Jumeirah Village Circle', 72000, '1 bed', 2, 720, ['Monthly OK'], false],
];
const lcard = ([href, img, title, area, rent, beds, baths, sqft, tags, hot]) => `<a class="prop-card" href="${href}"${href === '#' ? ' data-toast="Only the Bloom Towers studio has a full listing page in this demo"' : ''}>
  <div class="cover"><img src="assets/img/${img}" alt="${title}" loading="lazy"><div class="cover-tags">${glass('Verified owner', 'badge-check')}${tags.slice(0, 1).map(t => glass(t, null, true)).join('')}</div><div class="cover-br"><span class="glass light">${icon('heart', 13)}</span></div></div>
  <div class="pc-body"><div class="between"><span class="pc-price">AED ${rent.toLocaleString('en-US')}<small> / year</small></span>${hot ? badge('New', 'accent') : ''}</div><div><div class="pc-title">${title}</div><div class="pc-sub">${area}</div></div>${facts([['bed-double', beds], ['bath', baths + ' bath'], ['ruler', sqft.toLocaleString('en-US') + ' sq ft']])}<div class="small muted">≈ AED ${Math.round(rent / 12).toLocaleString('en-US')} a month · no commission</div></div></a>`;

const search = {
  slug: 'search',
  render: () => S.sitePage({
    title: 'Homes to rent in Dubai — verified, no commission · openrent.me', active: 'search',
    body: `
<section class="sec" style="padding:24px 0 12px"><div class="wrap stack">
  <h1 class="d2">Find <span class="me">me</span> a home in Dubai</h1>
  <div class="searchbar"><div class="input-group" style="border-color:transparent;background:var(--surface-2)"><span class="affix" style="background:transparent;border:0">${icon('search', 18)}</span><input class="input" style="background:transparent" value="Dubai Marina, JVC, Business Bay" aria-label="Where"></div><select class="select" aria-label="Type"><option>Any type</option><option>Apartment</option><option>Villa</option><option>Townhouse</option></select><select class="select" aria-label="Budget"><option>Up to AED 150,000</option><option>Up to AED 80,000</option><option>Up to AED 300,000</option><option>Any budget</option></select>${btn('Search', { variant: 'accent', icon: 'search', toast: 'Showing 312 verified homes (demo)' })}</div>
  ${ui.chips(['All homes', 'Studio', '1 bed', '2 beds', '3+ beds', 'Furnished', 'Monthly payments', 'Pets considered', 'Available now'])}
  <div class="between"><span class="small muted"><b class="strong" style="color:var(--ink)">312 homes</b> · every one with a live permit and verified owner</span>${ui.seg('view', [{ id: 'list', label: 'List' }, { id: 'map', label: 'Map' }], 'list')}</div>
</div></section>
<section class="sec" style="padding:8px 0 56px"><div class="wrap">
  <div class="search-grid">
    <div data-panel="view:list"><div class="results with-map">${listings.map(lcard).join('')}</div></div>
    <div class="mapbox only-desktop"><img src="assets/img/map.svg" alt="Map of Dubai with rent pins"></div>
    <div data-panel="view:map" hidden class="hide-desktop"><div class="mapbox" style="aspect-ratio:3/4"><img src="assets/img/map.svg" alt="Map of Dubai with rent pins"></div></div>
  </div>
  <div class="callout brand mt-5">${icon('shield-check', 20)}<div class="grow"><h4>Why every advert shows a permit</h4><p>Dubai requires a Trakheesi permit for each property advert. We check the owner against the title deed and display the permit QR on every listing, so what you see exists and is the owner’s to let.</p><div class="cluster">${rchip('DXB-002', 'Advertising permit')}${rchip('DXB-003', 'Owner check')}</div></div></div>
</div></section>`,
  }),
};

const listing = {
  slug: 'listing',
  render: () => S.sitePage({
    title: 'Furnished studio, Bloom Towers B, JVC — AED 54,000 · openrent.me', active: 'search', cls: 'has-buybar',
    body: `
<section class="sec" style="padding:16px 0 56px"><div class="wrap stack">
  <a class="link inline small" href="search.html">${icon('chevron-left', 16)} Back to results</a>
  <div class="gallery"><div><img src="assets/img/p2.svg" alt="Bloom Towers B exterior"><div class="cover-tags" style="position:absolute;left:10px;top:10px;display:flex;gap:6px">${glass('Verified owner', 'badge-check')}${glass('Live 14 days', null, true)}</div></div><div><img src="assets/img/living-b.svg" alt="Living area"></div><div><img src="assets/img/bedroom-b.svg" alt="Sleeping area"></div><div><img src="assets/img/kitchen-b.svg" alt="Kitchen"></div><div><img src="assets/img/bath-b.svg" alt="Bathroom"></div></div>

  <div class="split wide">
  <div class="stack stack-lg">
    <div class="stack stack-sm"><div class="cluster">${badge('Studio', 'solid')}${badge('Furnished', 'gold')}${badge('Monthly payments OK', 'brand')}</div>
      <h1 class="d2">Furnished studio in Bloom Towers B</h1><p class="muted">Jumeirah Village Circle, District 10 · Floor 9 · available now</p>
      ${facts([['bed-double', 'Studio'], ['bath', '1 bathroom'], ['ruler', '410 sq ft'], ['car', '1 parking bay'], ['sofa', 'Fully furnished'], ['waves', 'Pool & gym']])}</div>

    <div class="card pad stack stack-md"><div class="between-top"><div><span class="eyebrow">Asking rent</span><div class="big-num mt-1">AED 54,000</div><div class="small muted mt-1">per year · about AED 4,500 a month</div></div>${badge('Fair price', 'ok', { icon: 'chart-no-axes-column', lg: true })}</div>
      <div><div class="meter"><div class="meter-track" style="background:linear-gradient(to right,#CFE6DF 0 30%,#DDEFEA 30% 75%,#F4DFB4 75%)"></div><div class="meter-pin accent top" style="left:57%" data-label="This home 54k"></div><div class="meter-pin bottom edge-l" style="left:30%" data-label="50k"></div><div class="meter-pin bottom edge-r" style="left:75%" data-label="57k"></div></div><p class="small muted">Similar furnished studios in this building were registered between AED 50,000 and AED 57,000 in the last six months (Smart Rental Index).</p></div></div>

    <div class="stack stack-sm"><h2 class="d3">About this home</h2><p class="lead">A bright, fully furnished studio on the ninth floor with a proper kitchen, a balcony facing the community park and one covered parking space. Chiller is included; the building has a pool, gym and 24-hour security. Circle Mall is a six-minute walk.</p>
      ${ui.chips(['Balcony', 'Built-in wardrobes', 'Washer-dryer', 'Chiller included', 'Covered parking', 'Pool', 'Gym', '24h security'], -1, 'wrap')}</div>

    <div class="stack stack-sm"><h2 class="d3">What you will pay on day one</h2>
      <div class="card pad">${kv([['First instalment (1 of 12)', 'AED 4,500'], ['Security deposit · 10% furnished, refundable', 'AED 5,400'], ['Move.me tenancy fee + VAT', 'AED 261.45'], ['Ejari registration (government fee)', 'AED 177.75'], ['Agency commission', '<span class="t-ok">AED 0</span>'], ['Total to move in', 'AED 10,339.20']], 'total')}</div>
      <p class="small muted">Separately you will pay DEWA a refundable AED 2,000 deposit. With a typical agent you would add AED 5,000 commission.</p></div>

    <div class="stack stack-sm"><h2 class="d3">Terms offered by this landlord</h2>
      ${guard({ title: 'Checked against Dubai ruleset 2026.3', checks: [
        { state: 'ok', title: 'Pay in 1, 2, 4 or 12 instalments — same annual rent', rule: rchip('DXB-PAY', 'Payment terms') },
        { state: 'ok', title: 'Deposit capped at 10% and held in a safeguarded account', rule: rchip('OR-101', 'Deposit standard') },
        { state: 'plus', title: 'Leave early with 60 days’ notice and one month’s rent', sub: 'Better than our standard two months.', rule: rchip('OR-102', 'Fair way out') },
        { state: 'info', title: 'Whole home only — no room sharing or sub-letting', rule: rchip('DXB-S04', 'Shared housing') },
      ] })}</div>

    <div class="stack stack-sm"><h2 class="d3">Where it is</h2><div class="mapbox"><img src="assets/img/map.svg" alt="Map"></div></div>
  </div>

  <aside class="stack sticky-side" style="top:92px">
    <div class="card pad stack stack-md"><div class="inline" style="gap:12px">${avatar('Fatima Al Hashimi', { size: 'lg' })}<div><b class="strong">Fatima A.</b><div class="small muted">Owner · on openrent.me since 2025</div><div class="cluster mt-2">${badge('Title deed matched', 'ok', { icon: 'badge-check' })}${badge('Replies ~2 h', 'brand')}</div></div></div>
      ${btn('Book a viewing', { variant: 'accent', size: 'lg', block: true, icon: 'calendar-days', sheet: 'sheet-view' })}${btn('Make an offer', { size: 'lg', block: true, sheet: 'sheet-offer' })}${btn('Ask a question', { variant: 'ghost', block: true, toast: 'Sign in to message the landlord (demo)' })}</div>
    <div class="permit">${qr('permit-71460017342')}<div class="grow"><b class="strong">Advertising permit</b><div class="small muted">Trakheesi no. 71460017342<br>${company.orn} · valid to 9 Feb 2027</div></div></div>
    ${callout({ tone: 'neutral', icon: 'users', title: '6 viewings booked this week', body: '23 people have enquired. Two offers are with the landlord.' })}
  </aside></div>
</div></section>`,
    buybar: `<div class="buybar"><div class="grow"><b>AED 54,000</b><span class="small muted">per year · no commission</span></div>${btn('Offer', { sheet: 'sheet-offer' })}${btn('Book viewing', { variant: 'accent', sheet: 'sheet-view' })}</div>`,
    sheets: sheet('sheet-view', 'Book a viewing',
      `<div class="daystrip" style="margin:0;padding:2px 0">${[['Wed', 25, 1], ['Thu', 26], ['Fri', 27], ['Sat', 28], ['Sun', 29], ['Mon', 30]].map(([d, n, a]) => `<button type="button" class="day${a ? ' is-active' : ''}">${d}<b>${n}</b></button>`).join('')}</div>
       ${ui.chips(['17:30', '18:00', '18:30', '19:00'], 1, 'wrap')}
       ${choice('vt', 'In person with the owner', 'Fatima will meet you at the lobby', true)}${choice('vt', 'Hosted by an openrent.me agent', 'Jun shows you round · free for tenants', false)}${choice('vt', 'Live video viewing', '15 minutes on your phone', false)}`,
      btn('Cancel', { attrs: { 'data-close': true } }) + btn('Confirm viewing', { variant: 'accent', toast: 'Viewing booked for Wed 25 Nov, 18:00 (demo)' }))
    + sheet('sheet-offer', 'Make an offer',
      `${field({ label: 'Annual rent you offer', value: '54,000', prefix: 'AED', inputmode: 'numeric' })}
       <div class="field"><span class="label">Payment plan</span>${ui.seg('op', [{ id: '12', label: 'Monthly' }, { id: '4', label: '4 cheques' }, { id: '2', label: '2' }, { id: '1', label: '1' }], '12', 'block')}</div>
       ${field({ label: 'Move-in date', type: 'date', value: '2026-12-01' })}
       ${field({ label: 'Who will live there', type: 'select', options: ['Just me', '2 adults', '2 adults + children', 'Other'], value: 'Just me' })}
       ${callout({ tone: 'brand', icon: 'fingerprint', body: 'Verify once with UAE Pass and your offer shows a “Verified” badge. The landlord sees the result, never your documents.' })}`,
      btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send offer', { variant: 'accent', toast: 'Offer sent to the landlord (demo)' })),
  }),
};

const about = {
  slug: 'about',
  render: () => S.sitePage({
    title: 'About openrent.me', active: 'about',
    body: `
<section class="sec"><div class="wrap narrow stack stack-lg">
  <div class="sec-head"><span class="kicker"><b>ABOUT</b> Made in Dubai</span><h1 class="d1">.me is for the Middle East.<br>And for <span class="me">me</span>.</h1><p>Renting should feel like it was designed for the person doing it — the tenant signing a year of their life, the owner trusting someone with a home, the technician who turns up to fix the AC in August. That is the “me” in openrent.me.</p></div>
  <div class="grid sm2">
    <div class="tile"><h3>Open</h3><p>Open prices, open rules, an open record both sides can see. Nothing that depends on who you know.</p></div>
    <div class="tile"><h3>Rent</h3><p>The whole tenancy, not just the advert: verification, contract, Ejari, payments, repairs, renewal and move-out.</p></div>
    <div class="tile"><h3>.me — Middle East</h3><p>Built for Dubai’s laws first, with rulesets ready for other emirates and markets as we grow.</p></div>
    <div class="tile"><h3>.me — myself</h3><p>Do it yourself, with a licensed team behind you for the parts that need a person.</p></div>
  </div>
  <div class="card pad stack stack-md"><h2 class="d3">The people behind a tenancy</h2><p class="muted">Software does the routine. These roles handle judgement.</p>
    ${list([
      { icon: 'briefcase-business', tone: 'info', title: 'OpenRent Managers', sub: 'RERA-certified brokers who verify owners, issue permits, register Ejari and mediate.' },
      { icon: 'footprints', tone: 'accent', title: 'Field agents', sub: 'Host viewings, photograph move-ins and check-outs, hand over keys.' },
      { icon: 'hard-hat', tone: 'gold', title: 'Approved contractors', sub: 'Licensed, insured trades with ID-verified technicians.' },
      { icon: 'scale', tone: 'brand', title: 'Compliance and legal', sub: 'Maintain the rulesets, safeguard client money, answer to the regulator.' },
    ])}</div>
  <div class="card pad">${kv([['Legal entity', company.legal], ['Brokerage registration', company.orn], ['Trade licence', company.licence], ['VAT', company.vatTrn], ['Office', company.address], ['Contact', company.phone + ' · ' + company.email]])}<p class="small muted mt-3">All registration details on this concept site are invented for demonstration.</p></div>
</div></section>`,
  }),
};

const help = {
  slug: 'help',
  render: () => {
    const qa = (q, a) => `<details><summary>${q}${icon('plus', 20)}</summary><p>${a}</p></details>`;
    return S.sitePage({
      title: 'Help centre · openrent.me', active: 'help',
      body: `
<section class="sec"><div class="wrap narrow faq stack">
  <div class="sec-head"><h1 class="d1">Ask <span class="me">me</span> anything.</h1><p>The questions people ask most. For anything else, message your manager in the app or call ${company.phone}.</p></div>
  <h2 class="d3 mt-4">Renting</h2>
  ${qa('Is it really free to search and view?', 'Yes. You pay the AED 249 Move.me fee only when a tenancy is agreed. There is no commission.')}
  ${qa('What is Ejari and do I need it?', 'Ejari is the official registration of your tenancy with RERA. You need it to open a DEWA account, sponsor family visas and bring a case to the Rental Disputes Center. We register it for you and pass on the government fee at cost.')}
  ${qa('Can I pay monthly instead of with cheques?', 'Yes, where the landlord offers it. Under Dubai’s Flexi Rent initiative the annual rent is the same whether you pay monthly, quarterly or in one cheque; the plan is written into your contract.')}
  ${qa('How much can my rent go up at renewal?', 'Only as far as Decree 43 of 2013 allows, measured against the Smart Rental Index for your building, and only if your landlord tells you at least 90 days before the contract ends. We check both automatically.')}
  ${qa('Can I rent out a room to a friend?', 'Not on your own. Since the 2026 shared-housing law, letting rooms or bed spaces needs a permit held by the owner or a licensed operator. Family members and registered occupants are fine.')}
  <h2 class="d3 mt-4">Letting</h2>
  ${qa('Can I really advertise without an agent?', 'Adverts in Dubai need a Trakheesi permit, which is issued through a licensed brokerage. openrent.me is that brokerage: you sign a Form A marketing agreement in the app and we obtain the permit — you stay in control of viewings, tenant choice and terms.')}
  ${qa('I need my property back. What do I do?', 'For your own use, a sale, or major works you must give 12 months’ notice at the end of a term, stating the reason, through a notary public or registered mail. The notices tool drafts and serves it correctly and tracks the date.')}
  ${qa('My tenant has not paid.', 'Follow the arrears path: reminder, then a 30-day notice through the notary, then — if unpaid — a complete case file for the Rental Disputes Center. Cutting services or changing locks is unlawful and is not something the platform will help with.')}
  ${qa('Who holds the deposit?', 'We do, in a safeguarded client account. It is released within 14 days of check-out, less any deduction supported by photo evidence from the condition reports.')}
  <h2 class="d3 mt-4">The platform</h2>
  ${qa('What is a ruleset?', 'A numbered version of the legal rules the product enforces. When the law changes we publish a new one and tell you whether it affects existing tenancies, only new ones, or your next renewal.')}
  ${qa('Is my data safe?', 'Identity documents are verified through UAE Pass and never shown to the other party — they see a result. You can download or delete your data in line with UAE data-protection law.')}
</div></section>`,
    });
  },
};

const signin = {
  slug: 'signin',
  render: ({ roles, data }) => S.sitePage({
    title: 'Sign in · openrent.me', active: 'signin',
    body: `
<section class="sec"><div class="wrap feature" style="align-items:start">
  <div class="card pad stack" style="max-width:440px;width:100%;margin:0 auto">
    <div><h1 class="d2">Welcome back to <span class="me">me</span>.</h1><p class="muted mt-2">Sign in or create an account.</p></div>
    ${btn('Continue with UAE Pass', { href: 'app/index.html', variant: 'dark', size: 'lg', block: true, icon: 'fingerprint' })}
    <div class="hr-label">or</div>
    ${field({ label: 'Email or mobile', type: 'email', placeholder: 'you@example.com' })}
    ${btn('Send me a code', { href: 'app/index.html', variant: 'primary', size: 'lg', block: true })}
    <p class="small muted">Landlords and contractors verify with UAE Pass before listing or accepting jobs. By continuing you agree to the terms and privacy notice.</p>
  </div>
  <div class="stack"><span class="eyebrow">Demo shortcut</span><h2 class="d3">Jump straight into a dashboard</h2>
    <div class="role-list">${['tenant', 'landlord', 'contractor', 'manager', 'admin', 'rep', 'field', 'compliance'].filter(id => roles[id]).map(id => `<a href="app/${id}/index.html">${avatar(data.people[id].name, { size: 'sm' })}<span class="grow"><b class="strong" style="display:block;font-size:14px;line-height:1.2">${roles[id].label}</b><span class="small muted">${data.people[id].name} · ${data.people[id].sub}</span></span>${icon('chevron-right', 18, 'faint')}</a>`).join('')}</div>
  </div>
</div></section>`,
  }),
};

module.exports = [legal, how, search, listing, about, help, signin];
