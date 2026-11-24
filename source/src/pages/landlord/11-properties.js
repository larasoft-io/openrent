const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, cover, glass, facts, bar, stagebar, lifecycle, timeline, avatar, money, sectionHead, sheet, stats, pageHead, tabs, panel, docIco, qr, field } = ui;
const { properties, P, STAGES } = require('../../lib/data');
const B = '../../';

const LINK = { p1: 'property.html', p2: 'listing.html', p3: 'notices.html', p4: 'contract.html', p5: 'moveout.html', p6: 'listing-new.html', p7: 'arrears.html' };
const TAGS = { p1: 'occupied ending', p2: 'letting', p3: 'occupied ending', p4: 'letting', p5: 'ending', p6: 'letting', p7: 'occupied' };
const NEXT = {
  p1: ['hourglass', 'Renewal window closes 30 Nov'], p2: ['hand-coins', 'Review 2 offers'], p3: ['scroll-text', 'Own-use notice runs to 14 Sep 2027'],
  p4: ['file-signature', 'Sign contract today'], p5: ['clipboard-check', 'Check-out Mon 30 Nov, 10:00'], p6: ['pen-line', 'Sign Form A'], p7: ['scale', 'Payment notice ends 9 Dec'],
};
const bedLabel = p => p.beds ? `${p.beds} bed` : 'Studio';

const propCard = p => `<a class="prop-card" href="${LINK[p.id]}" data-tags="${TAGS[p.id]}">
  ${cover(p.img, { alt: p.name, tags: glass(p.status, null, true), br: p.tenant ? glass(p.tenant.split(' ')[0] + (p.tenant.includes('&') ? ' & ' + p.tenant.split('& ')[1].split(' ')[0] : ''), 'user-round') : glass('Vacant', 'door-open') }, B)}
  <div class="pc-body">
    <div class="between-top"><div class="grow"><div class="pc-title">${p.name}</div><div class="pc-sub">${p.area}</div></div><div class="pc-price nowrap">${money(p.rent, { noCur: true })}<small> AED/yr</small></div></div>
    ${facts([['bed-double', bedLabel(p)], ['bath', p.baths + ' bath'], ['ruler', p.sqft.toLocaleString('en-US') + ' sq ft'], ['sofa', p.furnished ? 'Furnished' : 'Unfurnished']])}
    <div>${stagebar(12, p.stage)}<div class="between micro muted mt-1"><span>${STAGES[p.stage]}</span><span>Stage ${p.stage + 1} of 12</span></div></div>
    <div class="between small" style="padding-top:8px;border-top:1px solid var(--line-2)"><span class="inline strong">${icon(NEXT[p.id][0], 16, 't-brand')}${NEXT[p.id][1]}</span>${icon('chevron-right', 18, 'faint')}</div>
  </div></a>`;

const propertiesPage = {
  slug: 'properties', nav: 'properties', title: 'Properties', sub: '7 properties · 5 let',
  body: () => `
${pageHead({ title: 'Properties', sub: 'Each home shows where it is in the 12-step rental journey, and the one thing it needs next.', actions: btn('Add property', { icon: 'plus', variant: 'primary', href: 'listing-new.html' }) })}
<div class="chips" data-chips data-target="#prop-grid">
  <button type="button" class="chip is-active" data-filter="*">All <span class="n">7</span></button>
  <button type="button" class="chip" data-filter="letting">Letting <span class="n">3</span></button>
  <button type="button" class="chip" data-filter="occupied">Occupied <span class="n">3</span></button>
  <button type="button" class="chip" data-filter="ending">Ending <span class="n">3</span></button>
</div>
<div class="grid sm2 lg3" id="prop-grid">${properties.map(propCard).join('')}
  <a class="card pad link-card stack stack-sm center" href="listing-new.html" style="justify-content:center;align-items:center;border-style:dashed;box-shadow:none;background:transparent;min-height:180px"><span class="row-ico brand" style="width:52px;height:52px;border-radius:16px">${icon('plus', 24)}</span><b class="strong">Add another property</b><span class="small muted">Title deed in, advert out — usually within 2 working days</span></a>
</div>
${card({ title: 'The 12 steps', body: `<div class="cluster">${STAGES.map((s, i) => `<span class="badge outline">${i + 1} · ${s}</span>`).join('')}</div><p class="small muted mt-3">A property can only move forward when the legal check for that step passes — for example, it cannot go Live without a Trakheesi permit, or become Occupied without an Ejari number.</p>` })}`,
};

const p = P.p1;
const dd = [['Mar', 1], ['Apr', 1], ['May', 1], ['Jun', 1], ['Jul', 1], ['Aug', 1], ['Sep', 1], ['Oct', 1], ['Nov', 1], ['Dec', 0], ['Jan', 0], ['Feb', 0]];

const property = {
  slug: 'property', nav: 'properties', title: p.short, sub: `${p.area} · Renewal window`, back: 'properties.html',
  body: () => `
<div class="card" style="overflow:hidden">
  ${cover(p.img, { cls: 'banner flat', alt: p.name, tags: glass('Occupied', 'house') + glass('Renewal window', 'refresh-cw', true), br: glass('1 / 14', 'images') }, B)}
  <div class="card-body stack stack-md">
    <div><h1>${p.name}</h1><p class="muted">Marina Gate 1, Al Marsa Street, ${p.area}</p></div>
    <div class="between" style="flex-wrap:wrap"><div class="hero-num nowrap" style="font-size:26px">${money(p.rent)}<small> / year</small></div>${badge('Maya Fernandes', 'brand', { icon: 'user-round' })}</div>
    ${facts([['bed-double', '1 bedroom'], ['bath', '2 bathrooms'], ['ruler', '812 sq ft'], ['car', '1 parking bay'], ['sofa', 'Unfurnished'], ['waves', 'Marina view']])}
    ${lifecycle(STAGES.map(s => ({ label: s })), 9)}
  </div>
</div>

${callout({ tone: 'warn', icon: 'hourglass', title: 'Your renewal offer is with Maya — 6 days until terms lock', body: 'AED 110,000 (+4.8%) was served on 18 Nov, 102 days before expiry. If nothing is agreed, the tenancy renews at AED 105,000 on the same terms.', rules: [rule('DXB-014', '90-day notice'), rule('DXB-006', 'Automatic renewal')], actions: `<a class="link small" href="renewals.html">Open renewal</a>` })}

${tabs('prop', [{ id: 'overview', label: 'Overview' }, { id: 'money', label: 'Money' }, { id: 'maint', label: 'Maintenance', n: 2 }, { id: 'docs', label: 'Documents' }, { id: 'comp', label: 'Compliance' }], 'overview')}

${panel('prop', 'overview', `<div class="split">
<div class="stack">
  ${card({ title: 'Tenant', body: `
    <div class="between-top"><div class="inline" style="gap:12px">${avatar('Maya Fernandes', { size: 'lg' })}<div><b class="strong" style="font-size:16px">Maya Fernandes</b><div class="small muted">Senior Brand Manager · tenant since 1 Mar 2026</div><div class="cluster mt-2">${badge('Verified', 'ok', { icon: 'badge-check' })}${badge('9 of 9 on time', 'brand')}</div></div></div></div>
    <div class="grid g2 sm4 mt-4 small">
      <div><div class="muted">Identity</div><b class="t-ok">UAE Pass matched</b></div>
      <div><div class="muted">Visa</div><b class="t-ok">Valid to Jun 2028</b></div>
      <div><div class="muted">Rent to income</div><b class="t-ok">31%</b></div>
      <div><div class="muted">Credit (AECB)</div><b class="t-ok">Very good</b></div>
    </div>
    <p class="small muted mt-3">You see verification results, not Maya’s documents. Household: 2 registered occupants and one cat (permitted by addendum).</p>
    <div class="btn-row mt-3">${btn('Message', { icon: 'message-circle', size: 'sm', href: 'thread.html' })}${btn('Tenant reference', { icon: 'file-text', size: 'sm', toast: 'Reference drafted for your review (demo)' })}</div>` })}
  ${card({ title: 'Tenancy', body: kv([['Term', '1 Mar 2026 → 28 Feb 2027'], ['Annual rent', money(105000)], ['Paid as', '12 direct debits · Flexi Rent'], ['Deposit', 'AED 5,250 · safeguarded'], ['Ejari number', p.ejari], ['DEWA premise', p.dewa], ['Makani', p.makani], ['Contract form', 'Unified tenancy contract']]) })}
  ${card({ title: 'Terms you offered above the legal minimum', flush: true, body: list([
    { icon: 'door-open', tone: 'accent', title: 'Early exit for one month’s rent', sub: 'The platform standard is two months.', endBadge: badge('Better', 'accent') },
    { icon: 'wrench', tone: 'accent', title: 'Tenant pays small repairs only up to AED 250', sub: 'Standard ceiling is AED 500.', endBadge: badge('Better', 'accent') },
    { icon: 'thermometer-snowflake', tone: 'accent', title: 'Two AC services a year', sub: 'April and December, booked automatically.', endBadge: badge('Extra', 'accent') },
  ]) })}
</div>
<aside class="stack">
  ${card({ title: 'Key dates', flush: true, body: list([
    { icon: 'send', tone: 'ok', title: 'Wed 18 Nov 2026', sub: 'Renewal offer served — 102 days before expiry' },
    { icon: 'hourglass', tone: 'warn', title: 'Mon 30 Nov 2026', sub: 'Last day to propose changed terms', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'reply', tone: 'accent', title: 'Fri 18 Dec 2026', sub: 'Maya’s reply is due' },
    { icon: 'flag', title: 'Sun 28 Feb 2027', sub: 'Contract ends — renews automatically if nobody acts', extra: `<div class="mt-2">${rule('DXB-006', 'Art. 6')}</div>` },
  ]) })}
  ${card({ title: 'This tenancy year', body: kv([['Rent received', money(78750)], ['Collect.me fee (1%)', '− AED 787.50'], ['Repairs paid by you', '− AED 310'], ['Net to you so far', money(77652.5, { dp: 2 })]], 'total') })}
</aside></div>`, true)}

${panel('prop', 'money', `<div class="split">
<div class="stack">
  <div class="card pad stack stack-md">
    <div class="between"><b class="strong">12 monthly direct debits</b><span class="small strong t-ok">9 of 12 collected</span></div>
    ${bar(75, 'ok')}
    <div class="grid g2 sm4" style="gap:8px">${dd.map(([m, paid]) => `<div class="card sunk pad center" style="padding:10px 6px;border-radius:12px"><div class="micro muted">${m}</div><b class="num small">8,750</b><div class="mt-1">${paid ? badge('Paid', 'ok') : m === 'Dec' ? badge('1 Dec', 'accent') : badge('Due')}</div></div>`).join('')}</div>
  </div>
  ${card({ title: 'Recent payouts', flush: true, body: list([
    { icon: 'arrow-down-to-line', tone: 'ok', title: 'November rent', sub: 'Collected 1 Nov · paid out 2 Nov to Emirates Islamic ••8830', end: 'AED 8,662.50' },
    { icon: 'arrow-down-to-line', tone: 'ok', title: 'October rent', sub: 'Collected 1 Oct · paid out 2 Oct', end: 'AED 8,662.50' },
    { icon: 'arrow-down-to-line', tone: 'ok', title: 'September rent', sub: 'Collected 1 Sep · paid out 2 Sep', end: 'AED 8,662.50' },
  ]), foot: `<span class="small muted">AED 8,750 less 1% Collect.me</span><a class="link small" href="money.html">Full statement</a>` })}
</div>
<aside class="stack">
  ${card({ title: 'Deposit', body: `<div class="between-top"><div><div class="hero-num">AED 5,250</div><div class="small muted mt-1">5% of rent · held in the client account</div></div><span class="row-ico ok">${icon('lock-keyhole', 20)}</span></div><div class="mt-3">${rule('OR-101', 'Safeguarded deposit')}</div>` })}
  ${callout({ tone: 'brand', title: 'Monthly rent, same total', body: 'You opted in to Flexi Rent for this home. The plan changes when the rent arrives, not how much.', rules: [rule('DXB-PAY', 'Payment terms')] })}
</aside></div>`)}

${panel('prop', 'maint', `<div class="grid lg2">
  <div class="card pad stack stack-md">
    <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico info">${icon('droplets', 20)}</span><div><b class="strong">Kitchen mixer tap leaking</b><div class="small muted">MR-2291 · reported Sat 21 Nov</div></div></div>${badge('Today 11:30', 'info', { dot: true })}</div>
    ${stagebar(5, 2)}
    <div class="between small"><span class="muted">You approved up to AED 600 · Falcon Technical</span><span class="strong nowrap">You pay</span></div>
    <div class="between">${rule('DXB-016', 'Landlord repairs')}<a class="link small" href="maintenance.html">Open job</a></div>
  </div>
  <div class="card pad stack stack-md">
    <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico brand">${icon('thermometer-snowflake', 20)}</span><div><b class="strong">AC service (twice a year)</b><div class="small muted">MR-2207 · auto-booked 20 Oct</div></div></div>${badge('Thu 3 Dec', 'brand')}</div>
    ${stagebar(5, 2)}
    <div class="between small"><span class="muted">Fixed price · a term you added to the contract</span><span class="strong nowrap">AED 180</span></div>
    <div class="right"><a class="link small" href="maintenance.html">Open job</a></div>
  </div>
</div>
${card({ title: 'Completed', flush: true, body: list([
  { icon: 'circle-check', tone: 'ok', title: 'Washing machine not draining', sub: 'MR-2135 · 14 Oct · lint blockage — tenant-side repair under AED 250', end: 'Tenant paid' },
  { icon: 'circle-check', tone: 'ok', title: 'Balcony door handle loose', sub: 'MR-1987 · 12 Aug · Falcon Technical', end: 'AED 130' },
]) })}`)}

${panel('prop', 'docs', `<div class="grid lg2">
  ${card({ title: 'Ownership & letting', flush: true, body: list([
    { lead: docIco(), title: 'Title deed', sub: 'Verified against DLD · 14 Jan 2026', endBadge: badge('Verified', 'ok'), toast: 'Title deed downloaded (demo)' },
    { lead: docIco(), title: 'Form A — marketing agreement', sub: 'Signed 16 Jan 2026 · ended when let', toast: 'Form A downloaded (demo)' },
    { lead: docIco(), title: 'Trakheesi permit', sub: `No. ${p.permit} · closed 27 Feb 2026`, toast: 'Permit downloaded (demo)' },
  ]) })}
  ${card({ title: 'Tenancy', flush: true, body: list([
    { lead: docIco(), title: 'Unified tenancy contract', sub: 'Signed by both parties · 24 Feb 2026', endBadge: badge('Signed', 'ok'), toast: 'Contract downloaded (demo)' },
    { lead: docIco(), title: 'Ejari certificate', sub: `No. ${p.ejari}`, endBadge: badge('Active', 'ok'), toast: 'Ejari certificate downloaded (demo)' },
    { lead: docIco(), title: 'Move-in condition report', sub: '84 photos · agreed 4 Mar 2026', toast: 'Report downloaded (demo)' },
    { lead: docIco(), title: 'Renewal offer 2027/28', sub: 'Served 18 Nov 2026 · delivery receipt attached', endBadge: badge('Sent', 'warn'), toast: 'Offer downloaded (demo)' },
  ]) })}
</div><a class="link small" href="documents.html">All documents for every property</a>`)}

${panel('prop', 'comp', `<div class="split">
<div class="stack">
  ${guard({ title: 'Marina Gate 2304 — compliance', sub: '8 of 8 checks pass · Ruleset Dubai 2026.3', checks: [
    { state: 'ok', title: 'Tenancy registered in Ejari', sub: `Certificate ${p.ejari}, valid to 28 Feb 2027.`, rule: rule('DXB-001', 'Ejari') },
    { state: 'ok', title: 'You are the owner on the title deed', sub: 'Re-checked before the contract was signed.', rule: rule('DXB-003', 'Owner check') },
    { state: 'ok', title: 'Advert ran under a valid permit', sub: `Trakheesi ${p.permit} · 18 Jan – 27 Feb 2026, then closed.`, rule: rule('DXB-002', 'Advert permit') },
    { state: 'ok', title: 'Deposit capped and safeguarded', sub: 'AED 5,250 (5%) held in the client account.', rule: rule('OR-101', 'Deposit standard') },
    { state: 'ok', title: 'Occupants registered', sub: 'Maya Fernandes and Rohan D’Souza are on the Ejari.', rule: rule('DXB-OCC', 'Co-occupants') },
    { state: 'ok', title: 'Renewal notice served in time', sub: '102 days before expiry; increase is AED 250 under the cap.', rule: rule('DXB-009', 'Rent cap') },
    { state: 'ok', title: 'Whole-unit let', sub: 'No room or bed-space letting on this home.', rule: rule('DXB-S04', 'Shared housing') },
    { state: 'plus', title: '3 terms better than the law requires', sub: 'Early exit, repairs limit and AC servicing.' },
  ] })}
</div>
<aside class="stack">
  ${card({ title: 'What you cannot do here', flush: true, body: list([
    { icon: 'ban', tone: 'danger', title: 'Raise the rent above AED 110,250', sub: 'The index puts this home in the 5% band.', extra: `<div class="mt-2">${rule('DXB-009', 'Rent cap')}</div>` },
    { icon: 'ban', tone: 'danger', title: 'Change terms after 30 Nov', sub: 'The option locks until the next renewal.', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'ban', tone: 'danger', title: 'Ask Maya to leave without 12 months’ notarised notice', sub: 'And only for the reasons the law lists.', extra: `<div class="mt-2">${rule('DXB-025B', '12 months')}</div>` },
  ]) })}
</aside></div>`)}`,
};

module.exports = [propertiesPage, property];
