const S = require('../../lib/site');
const ui = require('../../lib/ui');
const { icon, btn, badge, avatar, kv } = ui;
const { phone, phoneFig, browser, ticks, secHead, ctaBand, calc } = S;

const journey = [
  ['List', 'Owner verified against the title deed. Form A signed. Trakheesi permit and QR on the advert.', ['Landlord', 'Manager']],
  ['View', 'Book a slot in two taps. Self-hosted or hosted by a field agent.', ['Tenant', 'Field agent']],
  ['Offer', 'Offers compared on verified facts — never on raw documents.', ['Tenant', 'Landlord']],
  ['Verify', 'UAE Pass identity, visa, income and credit bureau check.', ['Tenant']],
  ['Contract', 'Unified tenancy contract in Arabic and English. Every clause checked against the ruleset.', ['Both']],
  ['Deposit', 'Capped, held in a safeguarded client account — not by the landlord.', ['Tenant']],
  ['Ejari', 'Registered for you. Certificate in your documents the same day.', ['Manager']],
  ['Move in', 'Condition report with timestamped photos. DEWA and move-in permit sorted.', ['Field agent']],
  ['Live', 'Rent by direct debit or cheque. Repairs with a who-pays decision up front.', ['Everyone']],
  ['Renew', 'Rent change checked against the Smart Rental Index and the 90-day rule.', ['Both']],
  ['Move out', 'Same photos, same angles. Deductions need evidence.', ['Field agent']],
  ['Settle', 'Deposit back within 14 days. Ejari cancelled. Ready to re-let.', ['Manager']],
];

const dotme = [
  ['List', 'Advertise with a permit, QR and verified badge.', 'AED 299'],
  ['Let', 'Verification, contract, e-signature, deposit and Ejari.', 'AED 899'],
  ['Collect', 'Direct debit, cards and cheque custody.', '1% · max AED 150/mo'],
  ['Fix', 'Vetted contractors, photos before and after.', 'Pay per job'],
  ['Renew', 'Index check, addendum and Ejari renewal.', 'AED 349'],
  ['Protect', 'Safeguarded deposits and legal guardrails.', 'Included'],
  ['Move', 'Tenant move-in pack. No commission, ever.', 'AED 249'],
  ['Manage', 'Hands-off management with a named manager.', '3.5% of rent'],
];

module.exports = {
  slug: 'index',
  render: () => S.sitePage({
    title: 'openrent.me — renting in Dubai, start to finish', active: 'home',
    body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <span class="kicker"><b>NEW</b> Flexi Rent monthly payments are built in</span>
    <h1 class="d1">Find it. Let it.<br>Live in it.<br><span class="me-u">Sorted by <i class="me">me</i>.</span></h1>
    <p class="lead">openrent<b class="me">.me</b> is the start-to-finish renting platform for Dubai. Verified listings, Ejari-registered contracts, safeguarded deposits and repairs — for a small flat fee instead of 5% commission, with the law built into every step.</p>
    <div class="hero-cta">${btn('Find me a home', { href: 'search.html', variant: 'accent', size: 'lg', icon: 'search' })}${btn('Find me a tenant', { href: 'landlords.html', variant: 'dark', size: 'lg', icon: 'key-round' })}</div>
    <div class="hero-proof"><span>${icon('badge-check', 16)} Permit on every listing</span><span>${icon('file-badge', 16)} Ejari on every contract</span><span>${icon('lock-keyhole', 16)} Deposits safeguarded</span></div>
  </div>
  <div class="hero-art">
    ${phone('landlord-home', { cls: 'back l', alt: 'Landlord portfolio dashboard' })}
    ${phone('tenant-renewal', { cls: 'back r', alt: 'Renewal offer checked against the rent index' })}
    ${phone('tenant-home', { eager: true, alt: 'Tenant home dashboard' })}
    <div class="float-card a"><span class="row-ico ok" style="width:34px;height:34px">${icon('shield-check', 18)}</span><span>Rent increase checked<small>Within the legal cap</small></span></div>
    <div class="float-card b"><span class="row-ico accent" style="width:34px;height:34px">${icon('file-badge', 18)}</span><span>Ejari registered<small>Certificate ready</small></span></div>
  </div>
</div></section>

<section class="sec tight white"><div class="wrap">
  <div class="trust">
    <div>${icon('landmark', 22, 't-brand')}<span>RERA-licensed brokerage<small>${'ORN 31877 · demo'}</small></span></div>
    <div>${icon('qr-code', 22, 't-brand')}<span>Trakheesi permit & QR<small>on every advert</small></span></div>
    <div>${icon('fingerprint', 22, 't-brand')}<span>UAE Pass sign-in<small>and e-signature</small></span></div>
    <div>${icon('scale', 22, 't-brand')}<span>25 legal guardrails<small>Ruleset Dubai 2026.3</small></span></div>
    <div>${icon('languages', 22, 't-brand')}<span>Arabic & English<small>contracts and notices</small></span></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'Two sides, one tenancy', title: 'Whose side are we on? <span class="me">Both.</span>', sub: 'An estate agent works for whoever pays the commission. A platform can afford to be fair: the same record, the same rules and the same evidence for everyone on the contract.' })}
  <div class="grid lg2">
    <a class="tile big tenant" href="tenants.html">
      <span class="row-ico accent">${icon('key-round', 22)}</span>
      <h3 class="d3">“Find me a home I can trust.”</h3>
      <p>Every listing is posted by a verified owner with a live permit. You pay a flat AED 249 instead of 5% commission, your deposit is held safely, and you can see — in plain words — what your landlord can and cannot do.</p>
      ${ticks(['<b>No commission.</b> Ever.', '<b>Monthly rent</b> where the landlord offers Flexi Rent', '<b>Repairs</b> with a clear who-pays answer in minutes'])}
      <span class="link inline">For tenants ${icon('arrow-right', 16)}</span>
    </a>
    <a class="tile big landlord" href="landlords.html">
      <span class="row-ico brand">${icon('building-2', 22)}</span>
      <h3 class="d3">“Let it for me — and keep me legal.”</h3>
      <p>Advertise, vet, contract, register and collect from one dashboard. Guardrails stop a mistake before it becomes a Rental Disputes Center case, and you keep the 5–8% a managing agent would have taken.</p>
      ${ticks(['<b>AED 1,198</b> to find and sign a tenant', '<b>Rent-increase calculator</b> wired to the Smart Rental Index', '<b>Notices done properly</b> — notarised, dated, provable'])}
      <span class="link inline">For landlords ${icon('arrow-right', 16)}</span>
    </a>
  </div>
</div></section>

<section class="sec white"><div class="wrap feature">
  <div class="f-copy">
    <span class="eyebrow">A very small fee</span>
    <h2 class="d2">Keep the 5%. <span class="me">It’s on me.</span></h2>
    <p class="lead">Commission made sense when an agent drove you around in a car. The work is now verification, paperwork and payments — things software does better, for a flat price you can see before you start.</p>
    ${ticks(['Tenants: <b>AED 249</b> once per tenancy, government fees at cost', 'Landlords: <b>AED 299</b> to advertise, <b>AED 899</b> when you let', 'Optional extras priced individually — photos, inspections, notices'])}
    ${btn('See all pricing', { href: 'pricing.html', iconEnd: 'arrow-right' })}
  </div>
  <div class="f-art" style="display:block">${calc()}</div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'Start to finish', title: 'Twelve steps from “to let” to keys back', sub: 'One continuous record. Nothing gets retyped, lost in WhatsApp or left to a handshake.' })}
  <div class="journey">${journey.map(([t, d, who], i) => `<div class="jstep"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${t}</b><p>${d}</p><div class="who">${who.map(w => badge(w, 'outline')).join('')}</div></div>`).join('')}</div>
  <div class="mt-5">${btn('How it works in detail', { href: 'how-it-works.html', variant: 'ghost', iconEnd: 'arrow-right' })}</div>
</div></section>

<section class="sec dark"><div class="wrap feature flip">
  <div class="f-copy">
    <span class="eyebrow">Legal guardrails</span>
    <h2 class="d2">Offer more than the law asks. <span class="me">Never less.</span></h2>
    <p class="lead" style="color:#B9C8C3">Dubai’s tenancy rules are precise: a 90-day window to change terms, rent rises tied to the Smart Rental Index, 12 months’ notarised notice to recover a home. openrent.me turns each rule into a guardrail, so the wrong thing simply cannot be sent.</p>
    ${ticks(['Rent sliders <b>stop at the legal maximum</b> for that building', 'Notices are only offered for <b>lawful reasons and periods</b>', 'There is <b>no button</b> for cutting services or locking out', 'Better-than-law terms are highlighted for tenants as <b>“Better”</b>'])}
    <div class="cluster">${btn('Read the rulebook', { href: 'legal.html', variant: 'white', iconEnd: 'arrow-right' })}</div>
  </div>
  <div class="f-art">${phone('landlord-renewals', { cls: 'lg', alt: 'Landlord rent increase calculator blocked above the legal cap' })}</div>
</div></section>

<section class="sec dark" style="padding-top:0"><div class="wrap">
  ${secHead({ center: true, kicker: 'One platform, every role', title: 'Everyone sees the same tenancy — <span class="me">from their side</span>' })}
  <div class="role-tabs" data-tabs="roles">
    <button type="button" data-tab="tenant" class="is-active">Tenant</button><button type="button" data-tab="landlord">Landlord</button><button type="button" data-tab="contractor">Contractor</button><button type="button" data-tab="manager">Manager</button><button type="button" data-tab="admin">Super Admin</button>
  </div>
  <div data-panel="roles:tenant"><div class="phones spread">${phoneFig('tenant-home', 'My home', 'Rent, repairs and what needs you today')}${phoneFig('tenant-renewal', 'Renewal offer', 'Checked against the rent index for you')}${phoneFig('tenant-repair', 'Repairs', 'Track the plumber to your door')}${phoneFig('tenant-rights', 'My rights', 'The law in plain words')}</div><div class="center">${btn('Open the tenant dashboard', { href: 'app/tenant/index.html', variant: 'white', iconEnd: 'arrow-up-right' })}</div></div>
  <div data-panel="roles:landlord" hidden><div class="phones spread">${phoneFig('landlord-home', 'Portfolio', 'Seven properties, seven stages')}${phoneFig('landlord-contract', 'Contract builder', 'Legal minimums shown on every clause')}${phoneFig('landlord-renewals', 'Renewals', 'Increase capped by the index')}${phoneFig('landlord-arrears', 'Arrears', 'The lawful path, step by step')}</div><div class="center">${btn('Open the landlord dashboard', { href: 'app/landlord/index.html', variant: 'white', iconEnd: 'arrow-up-right' })}</div></div>
  <div data-panel="roles:contractor" hidden><div class="phones spread">${phoneFig('contractor-today', 'Today', 'Route, jobs and offers')}${phoneFig('contractor-job', 'Job sheet', 'Access, photos, parts, sign-off')}${phoneFig('contractor-earnings', 'Earnings', 'Paid two days after sign-off')}</div><div class="center">${btn('Open the contractor dashboard', { href: 'app/contractor/index.html', variant: 'white', iconEnd: 'arrow-up-right' })}</div></div>
  <div data-panel="roles:manager" hidden><div class="phones spread">${phoneFig('manager-queue', 'Work queue', 'Verification, Ejari, escalations')}${phoneFig('manager-tenancies', 'Pipeline', 'Every tenancy by stage')}${phoneFig('manager-dispute', 'Deposit dispute', 'Decided on the evidence')}</div><div class="center">${btn('Open the manager dashboard', { href: 'app/manager/index.html', variant: 'white', iconEnd: 'arrow-up-right' })}</div></div>
  <div data-panel="roles:admin" hidden><div class="phones spread">${phoneFig('admin-overview', 'Platform overview', 'Rent processed, revenue, SLAs')}${phoneFig('admin-rulesets', 'Rulesets', 'The law as versioned rules')}${phoneFig('admin-ruleset', 'Publishing a change', 'Impact, approvals, roll-out')}</div><div class="center">${btn('Open the admin dashboard', { href: 'app/admin/index.html', variant: 'white', iconEnd: 'arrow-up-right' })}</div></div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'Pick what you need', title: 'Services that end in <span class="me">.me</span>', sub: 'Use one, or all of them. No bundles you did not ask for.' })}
  <div class="grid g2 lg4">${dotme.map(([n, d, p]) => `<a class="tile" href="pricing.html"><span class="dotme">${n}<i>.me</i></span><p>${d}</p><span class="price">${p}</span></a>`).join('')}</div>
</div></section>

<section class="sec sand"><div class="wrap feature">
  <div class="f-copy">
    <span class="eyebrow">Rulesets</span>
    <h2 class="d2">When the law moves, <span class="me">your tenancy moves with it</span></h2>
    <p class="lead">We track every change from the Dubai Land Department, RERA and the Rental Disputes Center and publish it as a versioned ruleset. Each update says exactly who it applies to — every tenancy, new contracts only, or from the next renewal — and both sides are told in plain words.</p>
    <div class="card" style="width:100%">${ui.list([
      { icon: 'git-commit-horizontal', tone: 'accent', title: '2026.3 · Shared Housing Law', sub: 'All tenancies · room and bed-space letting needs a permit', endSub: 'Aug 2026' },
      { icon: 'git-commit-horizontal', tone: 'brand', title: '2026.2 · Flexi Rent', sub: 'New and renewed contracts · monthly instalments', endSub: 'Jun 2026' },
      { icon: 'git-commit-horizontal', tone: 'brand', title: '2025.1 · Smart Rental Index', sub: 'Renewals · building-level rent caps', endSub: 'Jan 2025' },
    ])}</div>
  </div>
  <div class="f-art">${browser('desk-admin-rulesets', 'openrent.me/admin/rulesets', 'Super admin rulesets screen')}</div>
</div></section>

<section class="sec"><div class="wrap">
  ${secHead({ kicker: 'In their words', title: 'What a fair tenancy feels like', sub: 'Illustrative quotes from the people in the demo.' })}
  <div class="grid lg3">
    <div class="quote"><p>“My renewal came with a little green badge saying it was within the law. I didn’t have to become a lawyer to check.”</p><div class="inline">${avatar('Maya Fernandes')}<span><b class="strong">Maya</b> <span class="muted small">· tenant, Dubai Marina</span></span></div></div>
    <div class="quote"><p>“Seven properties and I finally know where each one stands. It even stopped me sending a notice that would not have held up.”</p><div class="inline">${avatar('Fatima Al Hashimi')}<span><b class="strong">Fatima</b> <span class="muted small">· landlord, 7 units</span></span></div></div>
    <div class="quote"><p>“The job tells me who is paying before I leave the workshop, and I am paid two days after the tenant signs off.”</p><div class="inline">${avatar('Imran Sheikh', { tone: 'c3' })}<span><b class="strong">Imran</b> <span class="muted small">· Falcon Technical</span></span></div></div>
  </div>
</div></section>

${ctaBand('Ready when you are. <span class="me">Try me.</span>', 'Open the clickable demo and walk the whole tenancy from any side.', btn('Open the dashboards', { href: 'app/index.html', variant: 'white', size: 'lg', iconEnd: 'arrow-right' }), btn('Search homes', { href: 'search.html', variant: 'on-dark', size: 'lg' }))}`,
  }),
};
