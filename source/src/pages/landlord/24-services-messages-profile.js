const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, money, pageHead, sheet, tabs, panel, thumb, timeline, avatar, bar, choice, field, table, docIco, sectionHead, toggle, chat, composer, seg, chips } = ui;
const { P, fees, people } = require('../../lib/data');
const B = '../../';

/* ----------------------------------------------------------------- Services */
const planCard = (f, o) => `<div class="card pad stack stack-md"${o.muted ? ' style="background:var(--surface-2);box-shadow:none"' : ''}>
  <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="display" style="font-size:18px">${f.key}</b><div class="small muted">${o.tag}</div></div></div>${o.badge}</div>
  <div><span class="display" style="font-size:26px;font-weight:700;letter-spacing:-.02em">${typeof f.price === 'number' ? money(f.price) : f.price}</span> <span class="small muted">${f.unit}</span></div>
  <p class="small muted">${f.what}</p>
  <div class="between small" style="padding-top:10px;border-top:1px solid var(--line-2)"><span class="muted">${o.usedLabel}</span><b class="num">${o.used}</b></div>
  ${o.cta || ''}</div>`;

const addonMeta = { 'Professional photos & floor plan': ['camera', 'Used twice · Burj Vista booked Thu 26 Nov'], 'Hosted viewing': ['key-round', 'A field agent shows the home for you'], 'Inventory & condition report': ['clipboard-check', 'Used twice · protects every deposit'], 'Renewal pack (index check, addendum, Ejari)': ['refresh-cw', 'Used once · Palma Villa, Sep 2026'], 'Notarised legal notice service': ['stamp', 'Used twice · notary fees at cost'], 'RDC case file preparation': ['gavel', 'Bilingual, exhibit-ready'], 'Rent guarantee (partner insurer)': ['shield-check', 'Of annual rent · pays out if rent is unpaid'] };

const inv = (ref, date, what, net, extra = 0) => ({ lead: docIco('PDF'), title: what, sub: `${ref} · ${date} · ${money(net, { dp: 2 })} + VAT ${money(net * 0.05, { dp: 2 })}${extra ? ` + notary fee ${money(extra)} at cost` : ''}`, end: money(net * 1.05 + extra, { dp: 2 }), endBadge: badge('Paid', 'ok'), toast: `Tax invoice ${ref} downloaded (demo)` });

const services = {
  slug: 'services', nav: 'services', title: 'Services & fees', sub: 'Pay-as-you-go · no commission',
  body: () => `
${pageHead({ title: 'Services & fees', sub: 'Flat prices for what you actually use. No percentage of the rent for finding a tenant, no renewal commission, no mark-up on government fees.', actions: btn('Billing settings', { icon: 'credit-card', size: 'sm', toast: 'Card ending 6620 · receipts to fatima@alhashimi.example (demo)' }) })}

<div class="split">
<div class="stack">
  <div class="card brand pad stack stack-md">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Saved so far in 2026</span>${badge('vs 5% management', 'solid')}</div>
    <div class="hero-num">AED 30,357</div>
    <div class="stack stack-sm">
      <div class="between small"><span class="muted">Traditional management at 5% of AED 783,000</span><b class="num">AED 39,150</b></div>
      <div class="bar" style="background:rgba(255,255,255,.2)"><i style="width:100%;background:rgba(255,255,255,.55)"></i></div>
      <div class="between small"><span class="muted">What you paid openrent.me, incl. VAT</span><b class="num">AED 8,793</b></div>
      <div class="bar" style="background:rgba(255,255,255,.2)"><i style="width:22.5%;background:#fff"></i></div>
    </div>
    <p class="small muted">Your tenants saved too: three new lets this year would have cost them AED 19,250 in 5% agency commission. They paid a flat AED 249 each.</p>
  </div>

  ${sectionHead('What you use')}
  <div class="grid sm2">
    ${planCard(fees.landlord[0], { icon: 'megaphone', tone: 'brand', tag: 'Advertise', badge: badge('Active on 1', 'ok', { dot: true }), usedLabel: 'Used this year', used: '3 listings · AED 897' })}
    ${planCard(fees.landlord[1], { icon: 'file-signature', tone: 'brand', tag: 'Set up the tenancy', badge: badge('1 in progress', 'accent', { dot: true }), usedLabel: 'Used this year', used: '3 tenancies · AED 2,697' })}
    ${planCard(fees.landlord[2], { icon: 'banknote', tone: 'brand', tag: 'Collect the rent', badge: badge('Active on 4', 'ok', { dot: true }), usedLabel: 'Charged this year', used: 'AED 1,837.50' })}
    ${planCard(fees.landlord[3], { icon: 'crown', tone: 'gold', tag: 'Hand it all over', badge: badge('Not active'), muted: true, usedLabel: 'On your rent roll that would be', used: 'AED 27,405 / yr', cta: btn('See what is included', { block: true, sheet: 'sheet-manage' }) })}
  </div>

  ${card({ title: 'Add-ons', headEnd: `<span class="small muted">Prices exclude 5% VAT</span>`, flush: true, body: list(fees.addons.map(([name, price]) => ({ icon: addonMeta[name][0], tone: 'role', title: name, sub: addonMeta[name][1], end: typeof price === 'number' ? money(price) : price, endBadge: `<span class="link small">Add</span>`, sheet: 'sheet-addon' }))) })}

  ${card({ title: 'Invoices', link: ['All 14', '#'], flush: true, body: list([
    inv('INV-2611-2204', '22 Nov 2026', 'Let.me — Executive Towers 1807', 899),
    inv('INV-2611-2101', '16 Nov 2026', 'Photos & floor plan — Burj Vista 3102', 449),
    inv('INV-2611-1877', '9 Nov 2026', 'Notarised notice — Zahra TH 114', 449, 125),
    inv('INV-2611-1500', '2 Nov 2026', 'Collect.me — Marina Gate, November', 87.5),
    inv('INV-2610-3310', '28 Oct 2026', 'List.me — Bloom Towers 915', 299),
    inv('INV-2609-0412', '2 Sep 2026', 'Notarised notice — Palma Villa 27', 449, 125),
    inv('INV-2609-0388', '1 Sep 2026', 'Renewal pack — Palma Villa 27', 349),
  ]) })}
</div>

<aside class="stack">
  ${card({ title: 'This year, by service', body: kv([['List.me × 3', 'AED 897.00'], ['Let.me × 3', 'AED 2,697.00'], ['Collect.me', 'AED 1,837.50'], ['Photos & floor plan × 2', 'AED 898.00'], ['Condition reports × 2', 'AED 798.00'], ['Notarised notices × 2', 'AED 898.00'], ['Renewal pack × 1', 'AED 349.00'], ['VAT 5%', 'AED 418.73'], ['Total', 'AED 8,793.23']], 'total') + `<p class="small muted mt-3">Plus AED 250 notary fees and government charges passed on at cost.</p>` })}
  ${guard({ title: 'Fee promises', checks: [
    { state: 'ok', title: 'No commission from your tenants', sub: 'Tenants pay one flat fee. Agents typically charge them 5% of the annual rent.', rule: rule('OR-105', 'No commission') },
    { state: 'ok', title: 'Government fees at cost', sub: 'Ejari, permit and notary charges are passed on without a margin.' },
    { state: 'ok', title: 'Collect.me is capped', sub: '1% of rent collected, never more than AED 150 a month per tenancy.' },
    { state: 'info', title: 'Rent has no VAT; our fees do', sub: 'Every invoice is a UAE tax invoice showing TRN 1004 8821 9300 003.' },
  ] })}
  ${callout({ tone: 'neutral', icon: 'gift', title: 'Refer another owner', body: 'They get their first List.me free; you get AED 299 credit when their tenancy starts.', actions: `<a class="link small" href="#" data-toast="Referral link copied (demo)">Copy my link</a>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-manage', 'Manage.me — full management',
    `<p class="small muted">3.5% of annual rent, charged monthly as rent is collected. Typical Dubai management companies charge 5–8%.</p>
     ${guard({ title: 'Everything in List.me, Let.me and Collect.me, plus', checks: [
       { state: 'plus', title: 'A named manager for your portfolio', sub: 'Layla Haddad, RERA BRN 61204' },
       { state: 'plus', title: 'Maintenance coordinated end to end', sub: 'Quotes, access, sign-off — you approve only above your limit' },
       { state: 'plus', title: 'Renewals, notices and check-outs handled', sub: 'Renewal pack, condition reports and notary service included' },
       { state: 'plus', title: 'Hosted viewings included', sub: 'Up to 10 per letting' },
     ] })}
     <div class="field"><span class="label">Apply to</span>${choice('mg', 'All 7 properties', 'About AED 27,405 a year at today’s rents', true)}${choice('mg', 'Choose properties', 'e.g. only the villa and the townhouse', false)}</div>`,
    btn('Not now', { attrs: { 'data-close': true } }) + btn('Talk to Layla', { variant: 'primary', toast: 'Layla will call you today (demo)' }))
  + sheet('sheet-addon', 'Add a service',
    `${field({ label: 'Property', type: 'select', options: [P.p1.short, P.p2.short, P.p3.short, P.p4.short, P.p5.short, P.p6.short, P.p7.short], value: P.p5.short })}
     ${field({ label: 'Preferred date', type: 'date', value: '2026-12-01' })}
     ${callout({ tone: 'neutral', body: 'You are charged when the service is delivered. Cancel free of charge up to 24 hours before.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Add to property', { variant: 'primary', toast: 'Service booked (demo)' })),
};

/* ----------------------------------------------------------------- Messages */
const messages = {
  slug: 'messages', nav: 'messages', title: 'Messages', sub: '4 unread',
  body: () => `
${pageHead({ title: 'Messages', sub: 'Tenants, contractors and your manager in one inbox. Everything is kept with the tenancy record — useful if a question ever reaches the RDC.' })}
${chips(['All', ['Unread', 4], 'Tenants', 'Applicants', 'Contractors', 'openrent.me'])}
<div class="card">${list([
  { href: '#', toast: 'Thread opened (demo)', unread: true, lead: avatar('Hassan El-Sayed'), title: 'Hassan El-Sayed', badge: badge('Zahra TH 114', 'danger'), sub: 'Thank you for considering the plan. I can pay the first AED 12,250 today if you accept.', endSub: '10:20' },
  { href: '#', toast: 'Thread opened (demo)', unread: true, lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Imran · Falcon Technical', badge: badge('MR-2304', 'info'), sub: 'Quote sent for the Zahra AC: capacitor and gas top-up, AED 850. I can return at 15:00 today.', endSub: '09:48' },
  { href: 'thread.html', lead: avatar('Maya Fernandes'), title: 'Maya Fernandes', badge: badge('Marina Gate 2304'), sub: 'You: Of course — take your time. If two years suits you better I am happy to fix the rent…', endSub: '09:41' },
  { href: '#', toast: 'Thread opened (demo)', unread: true, lead: avatar('Arjun Mehta'), title: 'Arjun & Neha Mehta', badge: badge('Executive Towers 1807', 'accent'), sub: 'We have both signed. Would it be possible to collect keys on the evening of the 4th?', endSub: 'Mon' },
  { href: '#', toast: 'Thread opened (demo)', unread: true, lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla · openrent.me', badge: badge('Manager', 'brand'), sub: 'Burj Vista title deed is verified. Form A is ready for your signature, then I can request the permit.', endSub: 'Mon' },
  { href: '#', toast: 'Thread opened (demo)', lead: avatar('Olena Kovalenko'), title: 'Olena Kovalenko', badge: badge('Al Ghozlan 412', 'gold'), sub: 'I will hand the keys to Jun on Monday. Thank you for a lovely year in the flat.', endSub: 'Sun' },
  { href: '#', toast: 'Thread opened (demo)', lead: avatar('Sofia Marchetti'), title: 'Sofia Marchetti', badge: badge('Applicant · Bloom Towers'), sub: 'Is the building pet-friendly? I have a small dog.', endSub: 'Sat' },
  { href: '#', toast: 'Thread opened (demo)', lead: avatar('James Whitfield'), title: 'James Whitfield', badge: badge('Palma Villa 27'), sub: 'Pool pump is running quietly again — thanks for sorting it so quickly.', endSub: '7 Oct' },
  { href: '#', toast: 'Thread opened (demo)', lead: `<span class="row-ico brand">${icon('bot', 20)}</span>`, title: 'openrent.me updates', sub: 'Payout PO-2611-014 of AED 8,658.12 is on its way to ••7731.', endSub: '2 Nov' },
])}</div>
<p class="demo-note">${icon('lock', 14)} Phone numbers stay private on both sides. Applicants see your first name only until an offer is accepted.</p>`,
};

const thread = {
  slug: 'thread', nav: 'messages', title: 'Maya Fernandes', sub: 'Tenant · Marina Gate 2304', back: 'messages.html', narrow: true,
  body: () => `
<a class="card pad between link-card" href="renewals.html"><div class="inline" style="gap:10px">${thumb(P.p1.img, '', B)}<div><b class="strong">Renewal offer · AED 110,000</b><div class="small muted">Sent 18 Nov · awaiting Maya · change window closes 30 Nov</div></div></div>${icon('chevron-right', 18, 'faint')}</a>
${chat([
  { day: 'Wed 18 Nov' },
  { who: 'sys', text: `${icon('refresh-cw', 13)} You sent a renewal offer: AED 110,000 for 1 Mar 2027 – 29 Feb 2028. Checked against the rent cap.` },
  { who: 'me', text: 'Hi Maya, hope all is well. I have sent the renewal through the app. You have been a wonderful tenant and I would love you to stay.', time: '16:12' },
  { text: 'Thank you Fatima, that is kind! We love the flat. Let me look at the numbers this week and come back to you.', time: '18:30' },
  { day: 'Today' },
  { text: 'Morning — would you consider fixing the rent for two years if we commit to staying?', time: '09:15' },
  { who: 'me', text: 'Of course — take your time. If two years suits you better I am happy to fix the rent at AED 110,000 for both years. Send a counter-offer in the app and I will accept it.', time: '09:41' },
  { who: 'sys', text: `${icon('shield-check', 13)} Any change must be proposed by Mon 30 Nov to count for this renewal. <a class="link" href="renewals.html">Revise your offer</a>` },
])}
<div class="chips wrap" style="justify-content:flex-end">${['Happy to wait', 'I have updated the offer', 'Shall we speak on the phone?'].map(t => `<button type="button" class="chip" data-toast="Quick reply sent (demo)">${t}</button>`).join('')}</div>
<div style="position:sticky;bottom:calc(var(--tabbar-h) + var(--sab) + 10px)">${composer('Message Maya…')}</div>`,
};

/* ------------------------------------------------------------------ Profile */
const pref = (title, sub, on, o) => `<div class="row"><div class="row-main"><div class="row-title">${title}</div>${sub ? `<div class="row-sub">${sub}</div>` : ''}</div>${toggle(on, o)}</div>`;
const perm = (label, on, locked) => `<label class="checkline"><input type="checkbox"${on ? ' checked' : ''}${locked ? ' disabled' : ''}> <span>${label}${locked ? ` <span class="muted">— owner only</span>` : ''}</span></label>`;

const profile = {
  slug: 'profile', nav: 'profile', title: 'Profile & payouts', sub: 'Verified owner · 7 title deeds',
  body: () => { const l = people.landlord; return `
<div class="split">
<div class="stack">
  <div class="card pad"><div class="inline" style="gap:14px">${avatar(l.name, { size: 'xl', ring: true })}<div><h1>${l.name}</h1><p class="muted">Private landlord · Dubai</p><div class="cluster mt-2">${badge('Verified owner', 'ok', { icon: 'badge-check' })}${badge('Landlord since 2024')}${badge('4.9 from tenants', 'gold', { icon: 'star' })}</div></div></div></div>

  ${card({ title: 'Verification', flush: true, body: list([
    { icon: 'fingerprint', tone: 'ok', title: 'Identity — UAE Pass', sub: 'Emirates ID 784-1979-•••••••-2 · re-confirmed 19 Nov 2026', endBadge: badge('Verified', 'ok') },
    { icon: 'file-badge', tone: 'ok', title: 'Ownership — 7 title deeds', sub: 'Each matched to Dubai Land Department records by name and unit', endBadge: badge('7 of 7', 'ok'), extra: `<div class="cluster mt-2">${rule('DXB-003', 'Owner check')}<a class="link small" href="documents.html">View deeds</a></div>` },
    { icon: 'landmark', tone: 'ok', title: 'Payout account', sub: 'Account name matches the title-deed holder', endBadge: badge('Matched', 'ok') },
    { icon: 'shield-check', tone: 'ok', title: 'Screening', sub: 'Sanctions and PEP screening passed · reviewed annually', endBadge: badge('Clear', 'ok') },
  ]) })}

  ${card({ title: 'Payout account', body: `<div class="between-top"><div class="inline" style="gap:12px"><span class="row-ico brand">${icon('landmark', 20)}</span><div><b class="strong">Emirates Islamic Bank</b><div class="small muted num">AE•• •••• •••• •••• ••7 731</div></div></div>${badge('Default', 'brand')}</div>
    <div class="mt-3">${kv([['Account holder', 'Fatima Al Hashimi'], ['Paid out', 'Next working day after funds clear'], ['Split payouts', 'Off · all properties to this account'], ['Last payout', 'AED 8,658.12 · 2 Nov 2026']])}</div>
    <div class="btn-row mt-4">${btn('Change account', { size: 'sm', sheet: 'sheet-bank' })}${btn('Payout history', { size: 'sm', href: 'money.html#tab=mon:payouts' })}</div>` })}

  <div class="card">
    <div class="card-head"><h3>Delegates and power of attorney</h3>${btn('Add', { size: 'sm', icon: 'user-plus', sheet: 'sheet-delegate' })}</div>
    <div class="mt-2">${list([
      { lead: avatar('Saeed Al Hashimi'), title: 'Saeed Al Hashimi', badge: badge('Son'), sub: 'Can view everything, approve repairs up to AED 1,000 and message tenants. Cannot sign contracts or notices.', endBadge: badge('Delegate', 'brand'), sheet: 'sheet-delegate' },
      { lead: avatar('Daniel Okafor', { tone: 'c2' }), title: 'Daniel Okafor · Okafor Property Management', badge: badge('PoA'), sub: 'Notarised power of attorney for Palma Villa 27 only · valid to 30 Jun 2027 · can sign on your behalf', endBadge: badge('PoA verified', 'ok'), sheet: 'sheet-delegate' },
    ])}</div>
    <div class="card-body" style="padding-top:8px">${callout({ tone: 'neutral', icon: 'scale', body: 'Only the title-deed owner or the holder of a valid notarised power of attorney can sign a tenancy contract or a legal notice. Delegates can help with everything else.', rules: [rule('DXB-003', 'Owner or PoA')] })}</div>
  </div>

  ${card({ title: 'Contact details', body: `<div class="form-grid c2">${field({ label: 'Email', type: 'email', value: l.email })}${field({ label: 'Mobile', type: 'tel', value: l.phone })}${field({ label: 'Address for legal notices', value: 'Villa 12, Street 8, Al Barsha 2, Dubai', cls: 'span2', hint: 'Shown on tenancy contracts as the landlord’s address for service.' })}</div>` })}
</div>

<aside class="stack">
  ${card({ title: 'Notifications', flush: true, body: `<div class="list">${pref('Rent received and payouts', 'Push and email', true)}${pref('Missed or returned payments', 'Push, email and SMS — always on', true, { disabled: true })}${pref('Repairs needing approval', 'Push · urgent ones also by SMS', true)}${pref('Legal deadlines', '90-day windows, notice dates — always on', true, { disabled: true })}${pref('Rule changes', 'When a ruleset affects your tenancies', true, { disabled: true })}${pref('Market tips', 'Index movements for your buildings', false)}</div>` })}
  ${card({ title: 'Tax and invoicing', body: kv([['Landlord type', 'Individual'], ['VAT registration', 'Not registered'], ['Residential rent', 'No VAT charged'], ['Invoices to', 'fatima@alhashimi.example']]) + `<p class="small muted mt-3">Add a TRN if you also let commercial units — commercial rent carries 5% VAT.</p>` })}
  ${card({ title: 'Language', body: `${seg('lang', [{ id: 'en', label: 'English' }, { id: 'ar', label: 'العربية' }], 'en', 'block')}<p class="small muted mt-3">Contracts and legal notices are always issued in both Arabic and English.</p>` })}
  ${card({ title: 'Security and data', flush: true, body: list([
    { icon: 'shield', title: 'Two-step sign-in', sub: 'UAE Pass + device passcode', endBadge: badge('On', 'ok') },
    { icon: 'history', title: 'Signing history', sub: '14 documents signed with UAE Pass', toast: 'Signing history (demo)', chev: true },
    { icon: 'download', title: 'Download my data', sub: 'Under UAE data-protection law (PDPL)', toast: 'Export requested (demo)', chev: true },
  ]) })}
  ${btn('Sign out', { block: true, icon: 'log-out', href: '../index.html' })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-delegate', 'Add a representative',
    `${field({ label: 'Full name', placeholder: 'As on Emirates ID or passport' })}
     ${field({ label: 'Email or mobile', placeholder: 'They will be invited to verify with UAE Pass' })}
     <div class="field"><span class="label">Authority</span>
       ${choice('dg', 'Delegate', 'Helps you run things. No power to sign for you.', true)}
       ${choice('dg', 'Power of attorney', 'Upload the notarised PoA. We check its scope and expiry before anything can be signed.', false, { badge: badge('Document needed', 'warn') })}</div>
     <div class="field"><span class="label">Properties</span>${chips(['All 7', 'Marina Gate', 'Palma Villa', 'Zahra TH', 'Choose…'], 0, 'wrap')}</div>
     <div class="field"><span class="label">They can</span>
       ${perm('View properties, tenancies and documents', true)}${perm('Message tenants and contractors', true)}${perm('Approve repairs up to a limit', true)}${perm('Manage listings and viewings', false)}${perm('See rent and payout amounts', false)}${perm('Change the payout bank account', false, true)}${perm('Sign contracts, renewals and legal notices', false, true)}</div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send invitation', { variant: 'primary', toast: 'Invitation sent (demo)' }))
  + sheet('sheet-bank', 'Change payout account',
    `${field({ label: 'IBAN', placeholder: 'AE00 0000 0000 0000 0000 000', hint: 'Must be a UAE account in the name of the title-deed owner.' })}
     ${callout({ tone: 'warn', title: 'A safety hold applies', body: 'For your protection, payouts pause for 48 hours after a bank change and we confirm it with you by phone.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Verify with UAE Pass', { variant: 'primary', icon: 'fingerprint', toast: 'This is a demo — nothing was changed.' })),
};

module.exports = [services, messages, thread, profile];
