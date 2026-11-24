const S = require('../../lib/site');
const ui = require('../../lib/ui');
const { icon, btn, badge, kv, rule } = ui;
const { phone, phoneFig, browser, ticks, secHead, ctaBand, calc } = S;
const { fees, rules, rulesets, R } = require('../../lib/data');

const step = (n, t, d) => `<div class="tile"><span class="pill-num">${n}</span><h3>${t}</h3><p>${d}</p></div>`;
const rchip = (id, label) => rule(id, label, 'app/');

const landlords = {
  slug: 'landlords',
  render: () => S.sitePage({
    title: 'For landlords — let it yourself, legally · openrent.me', active: 'landlords',
    body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <span class="kicker"><b>LANDLORDS</b> From AED 299</span>
    <h1 class="d1">Let it for <i class="me">me</i>.<br>Keep me legal.</h1>
    <p class="lead">Advertise with a proper permit, choose a verified tenant, sign a contract that cannot break the rules, register Ejari and collect rent — from your phone, for a flat fee.</p>
    <div class="hero-cta">${btn('List a property', { href: 'app/landlord/listing-new.html', variant: 'primary', size: 'lg', icon: 'plus' })}${btn('See the landlord dashboard', { href: 'app/landlord/index.html', size: 'lg' })}</div>
    <div class="hero-proof"><span>${icon('circle-check', 16)} No commission</span><span>${icon('circle-check', 16)} No contract lock-in</span><span>${icon('circle-check', 16)} Works for 1 or 100 units</span></div>
  </div>
  <div class="hero-art">${phone('landlord-properties', { cls: 'back l' })}${phone('landlord-contract', { cls: 'back r' })}${phone('landlord-home', { eager: true, alt: 'Landlord portfolio' })}</div>
</div></section>

<section class="sec white"><div class="wrap">
  ${secHead({ kicker: 'How letting works', title: 'Six steps. Most take minutes.' })}
  <div class="grid sm2 lg3">
    ${step(1, 'Prove it is yours', 'Upload the title deed and sign in with UAE Pass. We match it to the Dubai Land Department record. Acting for an owner abroad? Add your power of attorney.')}
    ${step(2, 'Advertise with a permit', 'Sign Form A in the app. As a licensed brokerage we obtain the Trakheesi permit and QR code, so your advert is lawful from the first minute.')}
    ${step(3, 'Viewings your way', 'Offer time slots and host them yourself, or send a field agent for AED 99. Enquiries arrive pre-qualified.')}
    ${step(4, 'Choose on facts', 'Compare offers side by side: verified identity, visa, income ratio and credit band. You see results, never someone’s private documents.')}
    ${step(5, 'Sign and register', 'The unified tenancy contract is built clause by clause with the legal minimum shown beside each one. Both sign with UAE Pass; we register Ejari.')}
    ${step(6, 'Collect and look after', 'Direct debit, card or cheque custody. Repairs with spending limits you set. Renewals and notices on rails.')}
  </div>
</div></section>

<section class="sec dark"><div class="wrap feature">
  <div class="f-copy">
    <span class="eyebrow">Guardrails that protect you</span>
    <h2 class="d2">The mistakes that lose cases at the RDC — <span class="me">made impossible</span></h2>
    ${ticks([
      '<b>Late rent increase?</b> After the 90-day cut-off the option locks and we tell you why.',
      '<b>Increase too high?</b> The slider stops at the Smart Rental Index maximum for your building.',
      '<b>Need the property back?</b> Only lawful reasons are offered, with 12 months’ notarised notice.',
      '<b>Rent unpaid?</b> A fixed path: reminder, notarised 30-day notice, complete RDC file.',
      '<b>Room-by-room letting?</b> Blocked without a shared-housing permit under the 2026 law.',
    ])}
    <div class="cluster">${rchip('DXB-014', '90-day notice')}${rchip('DXB-009', 'Rent cap')}${rchip('DXB-025B', '12-month notice')}${rchip('DXB-S04', 'Shared housing')}</div>
  </div>
  <div class="f-art">${phone('landlord-arrears', { cls: 'lg', alt: 'Arrears pathway with things a landlord must not do' })}</div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'Every stage covered', title: 'A portfolio where every property is somewhere different', sub: 'One being advertised, one mid-contract, one renewing, one moving out. The dashboard shows the stage and the next action for each.' })}
  <div class="phones spread">${phoneFig('landlord-listing', 'Live listing', 'Enquiries, viewings, permit')}${phoneFig('landlord-offers', 'Offers', 'Verified, side by side')}${phoneFig('landlord-renewals', 'Renewals', 'Index-checked increases')}${phoneFig('landlord-moveout', 'Check-out', 'Evidence-based deposit')}</div>
  <div class="mt-5">${browser('desk-landlord-home', 'openrent.me/landlord', 'Landlord portfolio on desktop')}</div>
</div></section>

<section class="sec white"><div class="wrap">
  ${secHead({ kicker: 'Pricing', title: 'Pay for what you use' })}
  <div class="grid sm2 lg4">${fees.landlord.map((f, i) => `<div class="price-card ${i === 1 ? 'pop' : ''}"><span style="font:700 24px/1 var(--font-display);letter-spacing:-.03em">${f.key.replace('.me', '')}<i class="me">.me</i></span><div class="amt">${typeof f.price === 'number' ? 'AED ' + f.price : f.price}</div><span class="small muted" style="margin-top:-8px">${f.unit}</span><p class="small">${f.what}</p></div>`).join('')}</div>
  <p class="small muted mt-4">Prices exclude 5% VAT. Residential rent itself is not subject to VAT. ${btn('Full pricing', { href: 'pricing.html', variant: 'ghost', size: 'sm', iconEnd: 'arrow-right' })}</p>
</div></section>
${ctaBand('Your next tenant is looking. <span class="me">Show me.</span>', 'Create a listing in about ten minutes. You only pay when it goes live.', btn('List a property', { href: 'app/landlord/listing-new.html', variant: 'white', size: 'lg' }))}`,
  }),
};

const tenants = {
  slug: 'tenants',
  render: () => S.sitePage({
    title: 'For tenants — rent without commission · openrent.me', active: 'tenants',
    body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <span class="kicker"><b>TENANTS</b> AED 249, not 5%</span>
    <h1 class="d1">A home that’s fair to <i class="me">me</i>.</h1>
    <p class="lead">Real owners, real permits, real prices. Sign from your phone, pay monthly where it is offered, get repairs done without the chase — and always know where you stand.</p>
    <div class="hero-cta">${btn('Search homes', { href: 'search.html', variant: 'accent', size: 'lg', icon: 'search' })}${btn('See the tenant dashboard', { href: 'app/tenant/index.html', size: 'lg' })}</div>
  </div>
  <div class="hero-art">${phone('tenant-payments', { cls: 'back l' })}${phone('tenant-rights', { cls: 'back r' })}${phone('tenant-home', { eager: true })}</div>
</div></section>

<section class="sec white"><div class="wrap">
  ${secHead({ kicker: 'What you get', title: 'Everything a good agent promised. <span class="me">Minus the invoice.</span>' })}
  <div class="grid sm2 lg3">
    <div class="tile"><span class="row-ico accent">${icon('badge-check', 22)}</span><h3>No fake listings</h3><p>Each advert carries a Trakheesi permit number and QR code issued for that exact unit, from an owner matched to the title deed.</p></div>
    <div class="tile"><span class="row-ico accent">${icon('wallet', 22)}</span><h3>See every dirham first</h3><p>Rent, deposit, Ejari, DEWA — the day-one total is shown on the listing, before you book a viewing.</p></div>
    <div class="tile"><span class="row-ico accent">${icon('calendar-sync', 22)}</span><h3>Pay monthly</h3><p>Where a landlord offers Flexi Rent, pay in 12 direct debits for the same annual rent. No post-dated cheque book needed.</p></div>
    <div class="tile"><span class="row-ico accent">${icon('lock-keyhole', 22)}</span><h3>Deposit held safely</h3><p>Capped at 5% (10% furnished), kept in a safeguarded client account and returned within 14 days of check-out.</p></div>
    <div class="tile"><span class="row-ico accent">${icon('wrench', 22)}</span><h3>Repairs that happen</h3><p>Report with a photo. You are told who pays before anyone is booked, and you sign off the work before the contractor is paid.</p></div>
    <div class="tile"><span class="row-ico accent">${icon('scale', 22)}</span><h3>Your rights, in plain words</h3><p>Rent caps, notice periods and what happens if things go wrong — personalised to your contract, with the legal source one tap away.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap feature flip">
  <div class="f-copy">
    <span class="eyebrow">Renewal without the dread</span>
    <h2 class="d2">“Is this increase even allowed?” <span class="me">We already checked.</span></h2>
    <p class="lead">When your landlord proposes new terms, we test them against the Smart Rental Index for your building and the 90-day rule — and show you the answer with the working.</p>
    ${ticks(['A clear <b>Within the law</b> or <b>Not allowed</b> badge', 'Counter-offer in the app — rent, a longer fix or a payment plan', 'If nobody acts, your tenancy <b>renews on the same terms</b>'])}
    <div class="cluster">${rchip('DXB-009', 'Rent cap')}${rchip('DXB-014', '90-day notice')}${rchip('DXB-006', 'Automatic renewal')}</div>
  </div>
  <div class="f-art">${phone('tenant-renewal', { cls: 'lg' })}</div>
</div></section>

<section class="sec white"><div class="wrap feature">
  <div class="f-copy">
    <span class="eyebrow">What moving in costs</span>
    <h2 class="d2">Same flat. <span class="me">AED 5,000 less</span> on day one.</h2>
    <p class="lead">Drag the slider to your budget. The saving is the commission you do not pay.</p>
    ${calc()}
  </div>
  <div class="f-art" style="display:block"><div class="compare" style="grid-template-columns:minmax(0,1fr)">
    <div class="col win"><span class="eyebrow" style="color:#7FD3BF">With openrent.me · AED 105,000 a year</span>${kv([['Tenancy fee (Move.me)', 'AED 249'], ['Agency commission', 'AED 0'], ['Ejari (government fee, at cost)', 'AED 177.75'], ['Security deposit (refundable)', 'AED 5,250'], ['Extra cost of renting', 'AED 426.75']], 'total').replace('class="kv total"', 'class="kv total mt-3"')}</div>
    <div class="col"><span class="eyebrow">Through a typical agent</span>${kv([['Agency commission 5%', 'AED 5,250'], ['Ejari via typing centre', 'AED 220'], ['Security deposit (refundable)', 'AED 5,250'], ['Extra cost of renting', 'AED 5,470']], 'total').replace('class="kv total"', 'class="kv total mt-3"')}</div>
  </div></div>
</div></section>
${ctaBand('Go on. <span class="me">Find me a home.</span>', 'Browse verified listings — no account needed until you book a viewing.', btn('Search homes', { href: 'search.html', variant: 'white', size: 'lg', icon: 'search' }))}`,
  }),
};

const contractors = {
  slug: 'contractors',
  render: () => S.sitePage({
    title: 'For contractors — steady jobs, fast pay · openrent.me', active: 'contractors',
    body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <span class="kicker"><b>PROS</b> Free to join</span>
    <h1 class="d1">Send the next job to <i class="me">me</i>.</h1>
    <p class="lead">AC, plumbing, electrical, cleaning, painting, inspections. Thousands of rented homes need someone reliable — we bring the jobs, the access details and the payment.</p>
    <div class="hero-cta">${btn('Apply to join', { href: 'signin.html', variant: 'primary', size: 'lg' })}${btn('See the contractor dashboard', { href: 'app/contractor/index.html', size: 'lg' })}</div>
    <div class="hero-proof"><span>${icon('circle-check', 16)} 10% fee only on completed jobs</span><span>${icon('circle-check', 16)} Paid 2 working days after sign-off</span></div>
  </div>
  <div class="hero-art">${phone('contractor-job', { cls: 'back l' })}${phone('contractor-earnings', { cls: 'back r' })}${phone('contractor-today', { eager: true })}</div>
</div></section>
<section class="sec white"><div class="wrap">
  ${secHead({ kicker: 'Why pros like it', title: 'Less chasing. More fixing.' })}
  <div class="grid sm2 lg4">
    <div class="tile"><span class="row-ico gold">${icon('map-pinned', 22)}</span><h3>A day that makes sense</h3><p>Jobs grouped by area and time window, with parking and access notes.</p></div>
    <div class="tile"><span class="row-ico gold">${icon('hand-coins', 22)}</span><h3>Who pays is settled</h3><p>Landlord or tenant is decided before you set off, with an approved limit.</p></div>
    <div class="tile"><span class="row-ico gold">${icon('camera', 22)}</span><h3>Proof built in</h3><p>Before and after photos, parts used and tenant sign-off in one job sheet.</p></div>
    <div class="tile"><span class="row-ico gold">${icon('banknote', 22)}</span><h3>No unpaid invoices</h3><p>We collect and pay out. Instant payout if you need it today.</p></div>
  </div>
</div></section>
<section class="sec"><div class="wrap feature">
  <div class="f-copy"><span class="eyebrow">Standards</span><h2 class="d2">What we ask of you</h2>
    ${ticks(['A valid <b>Dubai trade licence</b> and public liability insurance', '<b>ID-verified technicians</b> who confirm a door code with the tenant', '<b>No cash</b> taken from tenants — everything through the app', 'Emergency rota option: <b>on site within 4 hours</b>'])}
  </div>
  <div class="f-art">${phone('contractor-job', { cls: 'lg' })}</div>
</div></section>
${ctaBand('Got a van and a licence? <span class="me">Pick me.</span>', 'Approval usually takes two working days.', btn('Apply to join', { href: 'signin.html', variant: 'white', size: 'lg' }))}`,
  }),
};

const pricing = {
  slug: 'pricing',
  render: () => S.sitePage({
    title: 'Pricing — flat fees, no commission · openrent.me', active: 'pricing',
    body: `
<section class="sec" style="padding-bottom:20px"><div class="wrap">
  <div class="sec-head"><span class="kicker"><b>PRICING</b> All prices in AED, before 5% VAT</span><h1 class="d1">Small fees.<br>Shown <span class="me">up front</span>.</h1><p>We charge for the service you use, not a slice of the rent. Government fees are passed on at cost, with the receipt.</p></div>
</div></section>
<section class="sec tight"><div class="wrap">
  <h2 class="d3 mb-4">Landlords</h2>
  <div class="grid sm2 lg4">${fees.landlord.map((f, i) => `<div class="price-card ${i === 1 ? 'pop' : ''}">${i === 1 ? badge('Most used', 'brand') : ''}<span style="font:700 24px/1 var(--font-display);letter-spacing:-.03em">${f.key.replace('.me', '')}<i class="me">.me</i></span><div class="amt">${typeof f.price === 'number' ? 'AED ' + f.price : f.price}</div><span class="small muted" style="margin-top:-8px">${f.unit}</span><p class="small">${f.what}</p></div>`).join('')}</div>
  <h2 class="d3 mb-4 mt-6">Tenants</h2>
  <div class="grid lg2">
    <div class="price-card pop"><span style="font:700 24px/1 var(--font-display);letter-spacing:-.03em">Move<i class="me">.me</i></span><div class="amt">AED 249</div><span class="small muted" style="margin-top:-8px">once per tenancy · renewals are free for tenants</span>${ticks(['Searching, viewings and offers are <b>free</b>', 'Verification, contract, Ejari handling, condition report', '<b>No commission</b>, no admin fee, no renewal fee'])}</div>
    <div class="price-card"><span class="eyebrow">At cost — we add nothing</span>${kv([['Ejari registration (government)', 'AED 177.75'], ['DEWA security deposit (refundable)', 'AED 2,000 apartment · AED 4,000 villa'], ['Card payments (optional)', '1.9% card fee'], ['Direct debit', 'Free']])}</div>
  </div>
  <h2 class="d3 mb-4 mt-6">Contractors</h2>
  <div class="grid lg2"><div class="price-card"><div class="amt">10%<small> of completed job value</small></div><p class="small">Free to join. No lead fees, no subscription. Payout two working days after sign-off; instant payout for 1%.</p></div><div class="price-card"><span class="eyebrow">Add-ons for anyone</span>${kv(fees.addons.map(([n, p]) => [n, typeof p === 'number' ? 'AED ' + p : p]))}</div></div>
</div></section>
<section class="sec white"><div class="wrap feature">
  <div class="f-copy"><span class="eyebrow">Versus the usual</span><h2 class="d2">On a AED 105,000 flat</h2>
    <div class="compare" style="width:100%">
      <div class="col win"><span class="eyebrow" style="color:#7FD3BF">openrent.me</span><div class="big-num mt-2">AED 1,447</div><p class="small muted mt-2">Landlord AED 1,198 + tenant AED 249</p></div>
      <div class="col"><span class="eyebrow">Agent + management</span><div class="big-num mt-2">AED 10,500+</div><p class="small muted mt-2">5% commission + 5% management, first year</p></div>
    </div>
  </div>
  <div class="f-art" style="display:block">${calc()}</div>
</div></section>
<section class="sec"><div class="wrap narrow faq">
  ${secHead({ title: 'Pricing questions' })}
  ${[['Why is it so much cheaper than an agent?', 'Because the expensive parts of letting — verification, paperwork, registration and payment collection — are automated. People step in where judgement is needed: verification exceptions, viewings, inspections and disputes.'],
     ['Is the Trakheesi permit included?', 'Yes. List.me covers the advertising permit and QR code for that listing, issued through our brokerage licence under a Form A marketing agreement you sign in the app.'],
     ['Do I pay if my property does not let?', 'You pay List.me when the advert goes live. Let.me is only charged when a tenant signs.'],
     ['What does Collect.me actually cost?', '1% of rent collected, capped at AED 150 a month per tenancy. Cheque custody alone is free.'],
     ['Are there renewal fees?', 'Tenants pay only the government Ejari renewal fee. Landlords can renew themselves for free or buy the Renewal pack for AED 349.']].map(([q, a]) => `<details><summary>${q}${icon('plus', 20)}</summary><p>${a}</p></details>`).join('')}
</div></section>
${ctaBand('Fair price. Fair process. <span class="me">Fair to me.</span>', 'See exactly what each side pays in the demo dashboards.', btn('Open the demo', { href: 'app/index.html', variant: 'white', size: 'lg' }))}`,
  }),
};

module.exports = [landlords, tenants, contractors, pricing];
