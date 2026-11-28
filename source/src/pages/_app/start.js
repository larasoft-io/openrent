// First-run onboarding for each role, plus an index of every sign-up and setup screen. Built into app/start/.
const ui = require('../../lib/ui');
const { setupPage, upload, otp, password, FLOWS } = require('../../lib/auth');
const { icon, btn, badge, card, list, field, choice, toggle, callout, guard, rule, kv, avatar, qr, chips, stats, money } = ui;
const { people, P, fees } = require('../../lib/data');

const R = '../../';
const step = (flow, n) => `${flow}-${n}.html`;
const tick = (title, sub, on, o = {}) => `<div class="row"><div class="row-main"><div class="row-title">${title}${o.badge || ''}</div>${sub ? `<div class="row-sub">${sub}</div>` : ''}</div>${toggle(on, { label: title })}</div>`;
const check = (label, on) => `<label class="checkline"><input type="checkbox"${on ? ' checked' : ''}> <span>${label}</span></label>`;
const multi = items => `<div class="chips wrap" data-chips data-multi>${items.map(([l, on]) => `<button type="button" class="chip${on ? ' is-active' : ''}">${l}</button>`).join('')}</div>`;
const uaePassCard = (p, extra = []) => card({ title: 'Confirmed with UAE Pass', headEnd: badge('Verified', 'ok', { icon: 'badge-check' }), flush: true, body: list([
  { lead: avatar(p.name), title: p.name, sub: extra[0] || 'Name matches your Emirates ID' },
  { icon: 'id-card', title: 'Emirates ID', sub: p.eid || '784-19••-•••••••-•', endBadge: badge('Valid', 'ok') },
].concat(extra.slice(1))) });
const done = (o) => `<div class="card pad stack stack-md">${o.body}</div>`;

/* ---------------- Renter ---------------- */
const a = people.applicant;
const renter = [
  {
    slug: 'start/renter-1',
    render: () => setupPage({ flow: 'renter', step: 1, title: `Welcome, ${a.first}. Tell us about you.`, sub: 'Landlords see this when you book a viewing or make an offer. It takes about two minutes.', back: R + 'email-verified.html', next: step('renter', 2),
      body: `
${uaePassCard(a, ['Name and nationality filled in from UAE Pass', { icon: 'flag', title: 'Nationality', sub: 'India', endBadge: badge('From UAE Pass') }])}
${card({ title: 'Work', body: `<div class="form-grid c2">
  ${field({ label: 'Job title', value: 'Finance Director' })}
  ${field({ label: 'Employer', value: 'Gulfstar Logistics' })}
  ${field({ label: 'Employment', type: 'select', options: ['Employed', 'Self-employed', 'Business owner', 'Student', 'Retired'], value: 'Employed' })}
  ${field({ label: 'Annual household income', type: 'select', options: ['Prefer not to say', 'Under AED 120k', 'AED 120k–300k', 'AED 300k–600k', 'Over AED 600k'], value: 'AED 300k–600k', hint: 'Only shown to a landlord as a range, never the exact figure.' })}
</div>` })}
${card({ title: 'Who will live with you', body: `<div class="stack stack-md"><div class="form-grid c2">
  ${field({ label: 'Adults, including you', type: 'select', options: ['1', '2', '3', '4', '5+'], value: '2' })}
  ${field({ label: 'Children', type: 'select', options: ['0', '1', '2', '3', '4+'], value: '0' })}
</div>
${field({ label: 'Other adult', value: 'Neha Mehta · spouse', hint: 'Everyone who lives in the home goes on the Ejari as a co-occupant.' })}
${check('We have a pet', false)}</div>` })}`,
      aside: guard({ title: 'Why we ask', checks: [
        { state: 'ok', title: 'Everyone in the home is registered', sub: 'Co-occupants must be on the Ejari, so we ask now rather than at signing.', rule: rule('DXB-OCC', 'Co-occupants') },
        { state: 'info', title: 'Your income stays a range', sub: 'Landlords see a band, never your salary slip, until you choose to share it.' },
      ] }),
    }),
  },
  {
    slug: 'start/renter-2',
    render: () => setupPage({ flow: 'renter', step: 2, title: 'What are you looking for?', sub: 'We turn this into a saved search, and you can change it any time.', back: step('renter', 1), next: step('renter', 3),
      body: `
${card({ title: 'Areas', body: multi([['Business Bay', 1], ['Downtown Dubai', 1], ['DIFC', 1], ['Dubai Marina', 0], ['JLT', 0], ['Jumeirah Village Circle', 0], ['Dubai Hills', 0], ['Arabian Ranches', 0], ['The Greens', 0], ['Town Square', 0]]) })}
${card({ title: 'The home', body: `<div class="stack stack-md">
  <div class="field"><span class="label">Bedrooms</span>${ui.seg('beds', [{ id: '0', label: 'Studio' }, { id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' }, { id: '4', label: '4+' }], '2')}</div>
  <div class="field"><div class="between"><label for="budget">Top budget per year</label><b class="strong">AED <span data-out="budget">140,000</span></b></div><input class="range" id="budget" type="range" min="40000" max="400000" step="5000" value="140000"></div>
  <div class="form-grid c2">
    ${field({ label: 'Move in by', type: 'date', value: '2026-12-05' })}
    ${field({ label: 'Furnishing', type: 'select', options: ['Either', 'Furnished', 'Unfurnished'], value: 'Unfurnished' })}
  </div>
  ${multi([['Parking', 1], ['Gym', 1], ['Pool', 0], ['Balcony', 1], ['Near the Metro', 1], ['Pets allowed', 0]])}
</div>` })}
${card({ title: 'How you’d like to pay', body: `<div class="stack stack-sm">
  ${choice('pay', 'Cheques', 'Usually 1 to 4 a year. You lodge them once and we keep them safe.', true)}
  ${choice('pay', 'Monthly direct debit', 'Flexi Rent: 12 payments, where the landlord agrees.', false)}
</div><div class="mt-3">${rule('DXB-PAY', 'Payment terms', '../')}</div>` })}`,
      aside: `${card({ title: 'What 2-bed homes rent for', body: `<div class="stack stack-sm">${kv([['Business Bay', 'AED 120k–150k'], ['Downtown Dubai', 'AED 150k–210k'], ['DIFC', 'AED 140k–190k']])}<p class="micro muted">Illustrative ranges in the style of the Smart Rental Index. Demo figures.</p></div>` })}
${callout({ tone: 'brand', title: 'No commission, ever', body: `You pay a flat ${money(fees.tenant[0].price)} when you sign, not 5% of the rent.`, rules: [rule('OR-105', 'No commission', '../')] })}`,
    }),
  },
  {
    slug: 'start/renter-3',
    render: () => setupPage({ flow: 'renter', step: 3, title: 'Build your rent passport', sub: 'The documents landlords ask for, uploaded once. Homes go fast in Dubai, so being ready helps your offer.', back: step('renter', 2), next: step('renter', 4), skip: 'Do this later',
      body: `
${card({ title: 'Documents', body: `<div class="stack stack-sm">
  ${upload('Emirates ID', '', 'From UAE Pass', { badge: 'Verified', kind: 'ID' })}
  ${upload('Passport and residence visa', '', 'passport-visa-arjun.pdf', { status: '2 pages' })}
  ${upload('Salary certificate', '', 'salary-certificate-oct-2026.pdf', { status: 'issued 28 Oct' })}
  ${upload('Last 3 bank statements', 'Optional. Some landlords ask for it with 1 or 2 cheques.', '')}
  ${upload('Co-occupant ID · Neha Mehta', 'Needed for the Ejari. Neha can upload it herself.', '', { kind: 'ID' })}
</div>` })}
${card({ title: 'Who can see them', flush: true, body: list([
  tick('Share only when I make an offer', 'Landlords never see documents just because you viewed a home', true),
  tick('Watermark every copy', 'Each download is stamped with the landlord’s name and the date', true),
]) })}`,
      aside: guard({ title: 'Your documents, your call', checks: [
        { state: 'ok', title: 'Checked once, reused everywhere', sub: 'A manager checks them before your first offer, so you don’t send them again.' },
        { state: 'ok', title: 'Deleted when you’re done', sub: 'Removed 90 days after a search ends, unless they’re part of a signed tenancy.' },
      ] }),
    }),
  },
  {
    slug: 'start/renter-4',
    render: () => setupPage({ flow: 'renter', step: 4, title: 'How should we tell you about new homes?', sub: 'Your saved search: 2 beds in Business Bay, Downtown or DIFC, up to AED 140,000 a year.', back: step('renter', 3), next: 'renter-done.html', nextLabel: 'Finish setup',
      body: `
${card({ title: 'New homes that match', body: `<div class="stack stack-sm">${choice('freq', 'As soon as they’re listed', 'Best when you need to move within a month', true)}${choice('freq', 'Once a day, at 8 AM', 'A single summary of new matches', false)}${choice('freq', 'Weekly', 'Every Sunday morning', false)}</div>` })}
${card({ title: 'Where', flush: true, body: list([
  tick('WhatsApp', '+971 50 ••• 0163', true),
  tick('Email', 'a•••@example.com', true),
  tick('App notifications', 'On this device', false),
]) })}
${card({ title: 'Also tell me about', flush: true, body: list([
  tick('Price drops on homes I saved', '', true),
  tick('Viewing reminders and changes', 'Always on while a viewing is booked', true, { badge: ' ' + badge('Required', 'outline') }),
  tick('Tips for renting in Dubai', 'About one email a month', false),
]) })}`,
    }),
  },
  {
    slug: 'start/renter-done',
    render: () => setupPage({ flow: 'renter', step: 'done', title: `You’re all set, ${a.first}.`, sub: 'Your profile and rent passport are ready. Book a viewing in two taps.',
      body: done({ body: `
${stats([{ label: 'Homes match now', value: '14', icon: 'house' }, { label: 'New this week', value: '5', icon: 'sparkles' }], 'g2')}
${list([
  { icon: 'search', tone: 'brand', title: 'Browse your matches', sub: '2 beds · Business Bay, Downtown, DIFC · up to AED 140k', href: R + 'search.html' },
  { icon: 'calendar-check', title: 'Book a viewing', sub: 'Pick a slot the landlord or a field agent has offered', href: R + 'listing.html' },
  { icon: 'receipt-text', title: `Pay ${money(fees.tenant[0].price)} only when you sign`, sub: 'Searching, viewings and offers are free', href: R + 'pricing.html' },
])}
<div class="btn-row">${btn('Start searching', { href: R + 'search.html', variant: 'primary', size: 'lg', iconEnd: 'arrow-right' })}</div>
${callout({ tone: 'neutral', icon: 'route', title: 'See where this leads', body: 'Arjun found Executive Towers 1807 in Business Bay. Follow his move-in from offer to keys.', actions: btn('Open the applicant dashboard', { href: '../applicant/index.html', size: 'sm' }) })}` }),
    }),
  },
];

/* ---------------- Landlord ---------------- */
const f = people.landlord, p6 = P.p6;
const [list_, let_, collect_, manage_] = fees.landlord;
const landlord = [
  {
    slug: 'start/landlord-1',
    render: () => setupPage({ flow: 'landlord', step: 1, title: `Welcome, ${f.first}. First, it’s really you.`, sub: 'Only a home’s owner, or someone with a valid power of attorney, can let it. UAE Pass proves it in seconds.', back: R + 'email-verified.html?as=landlord', next: step('landlord', 2),
      body: `
${uaePassCard({ name: f.name, eid: '784-1979-•••••••-2' }, ['Matched to Dubai Land Department records'])}
${card({ title: 'Whose property is it?', body: `<div class="stack stack-sm">
  ${choice('own', 'Mine, the name on the title deed', 'Including joint ownership. Each co-owner confirms before a listing goes live.', true)}
  ${choice('own', 'I’m letting it for the owner', 'You’ll need a notarised power of attorney.', false, { end: `<a class="link small nowrap" href="${R}signup-details.html?as=rep">Switch</a>` })}
</div>` })}
${card({ title: 'Where do you live?', body: `<div class="stack stack-sm">${choice('res', 'In the UAE', '', true)}${choice('res', 'Abroad', 'Fine too. You can sign everything online, and a field agent can host viewings.', false)}</div>` })}`,
      aside: guard({ title: 'Ownership checks', checks: [
        { state: 'ok', title: 'Identity confirmed', sub: 'Your Emirates ID matches UAE Pass.', rule: rule('DXB-003', 'Owner check', '../') },
        { state: 'plus', title: 'Title deed next', sub: 'We match it to your name in the next step.' },
      ] }),
    }),
  },
  {
    slug: 'start/landlord-2',
    render: () => setupPage({ flow: 'landlord', step: 2, title: 'Add your first property', sub: 'Enter the title deed number and we look it up with Dubai Land Department. Add the rest later, or import them all at once.', back: step('landlord', 1), next: step('landlord', 3),
      body: `
${card({ title: 'Title deed', body: `<div class="stack stack-md"><div class="form-grid c2">
  ${field({ label: 'Title deed number', value: '4471/2019', state: 'ok', hint: 'Found and matched to your name', hintTone: 'good' })}
  ${field({ label: 'Makani number', value: '25371 90422', hint: 'On the building plate or the DEWA bill' })}
</div>
${upload('Title deed copy', '', 'title-deed-burj-vista-3102.pdf', { badge: 'Matched' })}</div>` })}
${card({ title: 'What we found', flush: true, body: list([
  { lead: ui.thumb(p6.img, '', R), title: p6.name, sub: `${p6.area} · ${p6.type} · ${p6.beds} bed · ${p6.sqft.toLocaleString('en-US')} sq ft`, endBadge: badge('DLD match', 'ok', { icon: 'badge-check' }) },
  { icon: 'user-round', title: 'Registered owner', sub: `${f.name} · sole owner`, endBadge: badge('You', 'brand') },
  { icon: 'file-x', title: 'Current tenancy', sub: 'No live Ejari on this unit', endBadge: badge('Free to let') },
]) })}`,
      aside: `${callout({ tone: 'neutral', icon: 'sheet', title: 'More than one home?', body: 'Add them one by one from your dashboard, or send us a spreadsheet of title deed numbers and we’ll check them in a batch.', actions: btn('Import a list', { size: 'sm', toast: 'Spreadsheet import (demo)' }) })}
${guard({ title: 'Before it can be advertised', checks: [
  { state: 'ok', title: 'Title deed matches you', rule: rule('DXB-003', 'Owner check', '../') },
  { state: 'warn', title: 'Form A and permit', sub: 'You sign Form A when you create the listing. We then get the Trakheesi permit.', rule: rule('DXB-002', 'Permit', '../') },
] })}`,
    }),
  },
  {
    slug: 'start/landlord-3',
    render: () => setupPage({ flow: 'landlord', step: 3, title: 'How would you like to let?', sub: 'Pay per step and do it yourself, or hand the whole tenancy to a named OpenRent Manager. You can switch for each property.', back: step('landlord', 2), next: step('landlord', 4),
      body: `
<div class="stack stack-sm">
  ${choice('plan', `Let it myself · ${money(list_.price)} + ${money(let_.price)}`, `${list_.key} ${list_.unit}: ${list_.what.toLowerCase()}. ${let_.key} ${let_.unit}: ${let_.what.toLowerCase()}.`, true, { badge: badge('Most used', 'brand') })}
  ${choice('plan', `Fully managed · ${manage_.price} ${manage_.unit}`, `${manage_.key}: ${manage_.what.toLowerCase()}.`, false)}
</div>
${card({ title: 'Add-ons', flush: true, body: list([
  tick(`${collect_.key} · ${collect_.price} ${collect_.unit}`, collect_.what, true),
  tick('Field agent for viewings · AED 99 each', 'Handy if you live abroad or work long hours', false),
]) })}
<p class="small muted">Nothing is charged now. You pay ${list_.key} when the advert goes live, and ${let_.key} when a tenant signs.</p>`,
      aside: guard({ title: 'Built in, whichever you choose', checks: [
        { state: 'ok', title: 'Contract and Ejari', sub: 'One contract, signed online and registered.', rule: rule('DXB-001', 'Ejari', '../') },
        { state: 'ok', title: 'Rent increases checked', sub: 'We check any rise against the Smart Rental Index.', rule: rule('DXB-009', 'Rent index', '../') },
        { state: 'ok', title: 'Deposit safeguarded', rule: rule('OR-101', 'Deposits', '../') },
      ] }),
    }),
  },
  {
    slug: 'start/landlord-4',
    render: () => setupPage({ flow: 'landlord', step: 4, title: 'Where should rent go?', sub: 'Rent collected through openrent.me goes to this account. The name must match the title deed.', back: step('landlord', 3), next: 'landlord-done.html', nextLabel: 'Finish setup', skip: 'Add later',
      body: `
${card({ title: 'Bank account', body: `<div class="form-grid c2">
  ${field({ label: 'Account holder', value: f.name.toUpperCase(), state: 'ok', hint: 'Matches the title deed', hintTone: 'good', cls: 'span2' })}
  ${field({ label: 'IBAN', value: 'AE61 0260 0010 1534 2241 107', hint: 'Starts with AE and has 23 characters', cls: 'span2' })}
  ${field({ label: 'Bank', type: 'select', options: ['Emirates NBD', 'ADCB', 'FAB', 'Mashreq', 'Dubai Islamic Bank', 'Other'], value: 'Emirates NBD' })}
  ${field({ label: 'Statements to', type: 'email', value: f.email })}
</div>` })}
${callout({ tone: 'neutral', icon: 'landmark', body: 'We send AED 1 with a reference to confirm the account. It usually arrives within a working day.' })}`,
    }),
  },
  {
    slug: 'start/landlord-done',
    render: () => setupPage({ flow: 'landlord', step: 'done', title: `You’re ready to let, ${f.first}.`, sub: `${p6.short} is in verification. Here’s what happens next.`,
      body: done({ body: `
${ui.timeline([
  { state: 'done', title: 'Title deed matched', body: 'Dubai Land Department · Fri 20 Nov' },
  { state: 'now', icon: 'file-signature', title: 'Sign Form A', body: 'The marketing agreement we need before applying for a Trakheesi permit.' },
  { title: 'Photos and floor plan', body: 'Photographer booked for Thu 26 Nov', icon: 'camera' },
  { title: 'Listing goes live', body: 'With the permit number and QR code on the advert', icon: 'megaphone' },
])}
<div class="btn-row">${btn('Continue the listing', { href: '../landlord/listing-new.html', variant: 'primary', size: 'lg', iconEnd: 'arrow-right' })}${btn('Go to my dashboard', { href: '../landlord/index.html', size: 'lg' })}</div>` }),
    }),
  },
];

/* ---------------- Contractor ---------------- */
const c = people.contractor;
const contractor = [
  {
    slug: 'start/contractor-1',
    render: () => setupPage({ flow: 'contractor', step: 1, title: `Welcome, ${c.first}. Tell us about the company.`, sub: 'Landlords only see contractors with a valid trade licence and insurance. We check both before your first job.', back: R + 'email-verified.html?as=contractor', next: step('contractor', 2),
      body: `
${card({ title: 'Trade licence', body: `<div class="stack stack-md"><div class="form-grid c2">
  ${field({ label: 'Company name', value: c.company, cls: 'span2' })}
  ${field({ label: 'Licence number', value: '1029384' })}
  ${field({ label: 'Issued by', type: 'select', options: ['Dubai Economy and Tourism (DET)', 'A free zone authority', 'Another emirate'], value: 'Dubai Economy and Tourism (DET)' })}
  ${field({ label: 'Licence expires', type: 'date', value: '2026-12-18', state: 'error', hint: 'Expires in 24 days. You can still join, and we’ll remind you to upload the renewal.', hintTone: 'err' })}
  ${field({ label: 'VAT TRN', value: '1003 4471 2200 003', hint: 'Leave blank if you’re not VAT registered' })}
</div>
${upload('Trade licence', '', 'falcon-det-licence-2026.pdf', { badge: 'Checking', tone: 'info' })}</div>` })}
${card({ title: 'You, the licence holder or manager', flush: true, body: list([
  { lead: avatar(c.name), title: c.name, sub: 'Confirmed with UAE Pass · Manager on the licence', endBadge: badge('Verified', 'ok', { icon: 'badge-check' }) },
]) })}`,
      aside: guard({ title: 'What we check', checks: [
        { state: 'info', title: 'Licence is active and covers the work', sub: 'We check the DET register, usually within a working day.' },
        { state: 'warn', title: 'Renewal due 18 Dec 2026', sub: 'Jobs pause automatically if a licence lapses.' },
      ] }),
    }),
  },
  {
    slug: 'start/contractor-2',
    render: () => setupPage({ flow: 'contractor', step: 2, title: 'What do you do, and where?', sub: 'We only send you jobs that match. Landlords see your trades and response time.', back: step('contractor', 1), next: step('contractor', 3),
      body: `
${card({ title: 'Trades', body: multi(c.trades.map(t => [t, 1]).concat([['Painting', 0], ['Carpentry', 0], ['Pest control', 0], ['Pool maintenance', 0], ['Deep cleaning', 0], ['Locksmith', 0]])) })}
${card({ title: 'Areas you cover', body: multi([['Dubai Marina', 1], ['JLT', 1], ['The Greens', 1], ['Business Bay', 1], ['Downtown Dubai', 1], ['JVC', 1], ['Arabian Ranches', 0], ['Town Square', 0], ['Deira', 0], ['Mirdif', 0]]) })}
${card({ title: 'Hours and call-outs', body: `<div class="stack stack-md"><div class="form-grid c2">
  ${field({ label: 'Working hours', value: 'Sat–Thu, 8 AM – 7 PM' })}
  ${field({ label: 'Standard call-out fee', value: '150', prefix: 'AED', inputmode: 'numeric' })}
</div></div>` + list([tick('Take emergency jobs, 24/7', 'No AC in summer, leaks, power cuts. Paid at your emergency rate.', true)]) })}`,
      aside: callout({ tone: 'brand', icon: 'siren', title: 'Emergencies within 4 hours', body: 'If you take emergency jobs, you agree to be on site within 4 hours. That is the promise landlords make to tenants.', rules: [rule('OR-104', 'Emergency response', '../')] }),
    }),
  },
  {
    slug: 'start/contractor-3',
    render: () => setupPage({ flow: 'contractor', step: 3, title: 'Insurance and your team', sub: 'Add the technicians who’ll go into homes. Tenants see who’s coming before they arrive.', back: step('contractor', 2), next: step('contractor', 4),
      body: `
${card({ title: 'Insurance', body: `<div class="stack stack-sm">${upload('Public liability insurance', '', 'falcon-liability-2026-27.pdf', { status: 'AED 1,000,000 per claim · to 30 Jun 2027' })}<p class="small muted">We need at least AED 1,000,000 cover per claim.</p></div>` })}
${card({ title: 'Technicians', headEnd: btn('Invite', { size: 'sm', icon: 'user-plus', toast: 'Invite sent by WhatsApp (demo)' }), flush: true, body: list([
  { lead: avatar(c.name), title: c.name, sub: 'Owner · all trades', endBadge: badge('You', 'brand') },
  { lead: avatar('Sanjay Thapa'), title: 'Sanjay Thapa', sub: 'AC & ventilation · Emirates ID checked', endBadge: badge('Joined', 'ok') },
  { lead: avatar('Kelvin Otieno'), title: 'Kelvin Otieno', sub: 'Plumbing · invite sent by WhatsApp', endBadge: badge('Invited', 'warn') },
]) })}`,
      aside: guard({ title: 'Going into people’s homes', checks: [
        { state: 'ok', title: 'Every technician is named', sub: 'Tenants get a name and photo before the visit.' },
        { state: 'ok', title: 'No entry without notice', sub: 'Visits are booked with the tenant, except real emergencies.', rule: rule('DXB-016', 'Repairs', '../') },
      ] }),
    }),
  },
  {
    slug: 'start/contractor-4',
    render: () => setupPage({ flow: 'contractor', step: 4, title: 'How you get paid', sub: 'Free to join. No lead fees and no subscription.', back: step('contractor', 3), next: 'contractor-done.html', nextLabel: 'Submit for review',
      body: `
${card({ title: 'Bank account', body: `<div class="form-grid c2">
  ${field({ label: 'Account holder', value: c.company.toUpperCase(), cls: 'span2', state: 'ok', hint: 'Matches the trade licence', hintTone: 'good' })}
  ${field({ label: 'IBAN', value: 'AE33 0350 0000 0912 4477 730', cls: 'span2' })}
</div>` })}
${card({ title: 'Payout speed', body: `<div class="stack stack-sm">${choice('payout', 'Two working days after sign-off', 'Free', true)}${choice('payout', 'Instant, when you ask for it', '1% of the payout', false)}</div>` })}
${card({ title: 'Our fee', body: kv([['On completed jobs', '10% of job value'], ['Joining, leads, subscription', 'Free'], ['Invoices', 'We invoice our fee separately, with VAT']]) })}`,
    }),
  },
  {
    slug: 'start/contractor-done',
    render: () => setupPage({ flow: 'contractor', step: 'done', title: 'Thanks. We’re checking your licence.', sub: 'This usually takes less than one working day. We’ll WhatsApp you when you can take jobs.',
      body: done({ body: `
${list([
  { icon: 'file-check', tone: 'brand', title: 'Trade licence', sub: 'No. 1029384 · DET', endBadge: badge('Checking', 'info') },
  { icon: 'shield-check', title: 'Public liability insurance', sub: 'AED 1,000,000 · to 30 Jun 2027', endBadge: badge('Accepted', 'ok') },
  { icon: 'users', title: 'Team', sub: '2 joined · 1 invited', endBadge: badge('Ready', 'ok') },
])}
${callout({ tone: 'warn', title: 'Licence renewal due 18 Dec 2026', body: 'Upload the renewed licence before then to keep receiving jobs.' })}
<div class="btn-row">${btn('Go to my dashboard', { href: '../contractor/index.html', variant: 'primary', size: 'lg', iconEnd: 'arrow-right' })}</div>` }),
    }),
  },
];

/* ---------------- Owner's representative ---------------- */
const d = people.rep;
const rep = [
  {
    slug: 'start/rep-1',
    render: () => setupPage({ flow: 'rep', step: 1, title: `Welcome, ${d.first}. Confirm who you are.`, sub: 'You’ll act for owners who aren’t in Dubai, so we check you first, then each power of attorney.', back: R + 'email-verified.html?as=rep', next: step('rep', 2),
      body: `
${uaePassCard({ name: d.name, eid: '784-1984-•••••••-9' })}
${card({ title: 'You act as', body: `<div class="stack stack-md"><div class="stack stack-sm">
  ${choice('as', 'A RERA-licensed broker or property manager', 'You can hold rent in your company’s client account.', true)}
  ${choice('as', 'A private holder of a power of attorney', 'For example, a relative or friend of the owner. Rent goes straight to the owner.', false)}
</div><div class="form-grid c2">
  ${field({ label: 'Company', value: 'Okafor Property Management' })}
  ${field({ label: 'RERA BRN', value: '58817' })}
</div></div>` })}`,
      aside: guard({ title: 'Acting for someone else', checks: [
        { state: 'ok', title: 'Your identity first', sub: 'Every action you take is recorded under your name.' },
        { state: 'info', title: 'Then each mandate', sub: 'You can only do what each power of attorney allows.', rule: rule('DXB-003', 'Owner or PoA', '../') },
      ] }),
    }),
  },
  {
    slug: 'start/rep-2',
    render: () => setupPage({ flow: 'rep', step: 2, title: 'Add a power of attorney', sub: 'Start with one owner. Add the others from your dashboard.', back: step('rep', 1), next: step('rep', 3),
      body: `
${card({ title: 'The owner', body: `<div class="form-grid c2">
  ${field({ label: 'Owner’s full name', value: 'Chen Wei' })}
  ${field({ label: 'Lives in', value: 'Singapore' })}
  ${field({ label: 'Owner’s email', type: 'email', value: 'chen.wei@example.com', cls: 'span2', hint: 'We email the owner to confirm you in the next step.' })}
</div>` })}
${card({ title: 'The document', body: `<div class="stack stack-md">${upload('Notarised power of attorney', '', 'poa-chen-wei-notarised.pdf', { status: '6 pages · English & Arabic' })}
<div class="form-grid c2">
  ${field({ label: 'Notarised in', type: 'select', options: ['Dubai Courts notary', 'Abroad, attested by the UAE embassy', 'Abroad, apostilled'], value: 'Abroad, attested by the UAE embassy' })}
  ${field({ label: 'Valid until', type: 'date', value: '2027-09-02' })}
</div></div>` })}
${card({ title: 'What it lets you do', body: `<div class="stack stack-sm">
  ${check('Advertise and choose tenants', true)}
  ${check('Sign tenancy contracts and register Ejari', true)}
  ${check('Collect rent and hold deposits', true)}
  ${check('Serve notices, including eviction notices', false)}
  ${check('Sell or mortgage the property', false)}
</div><p class="small muted mt-3">Tick only what the document says. A manager checks it against the text.</p>` })}`,
      aside: callout({ tone: 'neutral', icon: 'languages', title: 'Not in Arabic?', body: 'A PoA signed abroad needs a legal translation into Arabic before Dubai authorities accept it. We can arrange one.' }),
    }),
  },
  {
    slug: 'start/rep-3',
    render: () => setupPage({ flow: 'rep', step: 3, title: 'The owner confirms you', sub: 'Chen Wei gets an email to confirm you act for them. Owners abroad confirm with their passport and a short selfie video.', back: step('rep', 2), next: step('rep', 4),
      body: `
${card({ title: 'Progress', body: ui.timeline([
  { state: 'done', title: 'PoA uploaded', body: 'poa-chen-wei-notarised.pdf' },
  { state: 'done', title: 'Email sent to Chen Wei', body: 'chen.wei@example.com' },
  { state: 'now', icon: 'user-check', title: 'Owner confirms identity', body: 'Passport and selfie video, about 3 minutes' },
  { title: 'Manager checks the PoA', body: `${people.manager.name}, OpenRent Manager · usually 1 working day`, icon: 'scale' },
]) })}
<div class="btn-row">${btn('Resend to Chen Wei', { icon: 'rotate-cw', toast: 'Reminder sent' })}${btn('Copy the link', { icon: 'link', toast: 'Link copied' })}</div>`,
      aside: callout({ tone: 'brand', icon: 'info', title: 'You can carry on', body: 'Finish setup now. You can add the owner’s homes once the PoA is approved.' }),
    }),
  },
  {
    slug: 'start/rep-4',
    render: () => setupPage({ flow: 'rep', step: 4, title: 'Where does the rent go?', sub: 'Choose for each owner. You can change it later, with the owner’s consent.', back: step('rep', 3), next: 'rep-done.html', nextLabel: 'Finish setup',
      body: `
<div class="stack stack-sm">
  ${choice('money', 'Straight to the owner', 'Rent goes to the owner’s own account. You see every payment.', true, { badge: badge('Recommended', 'brand') })}
  ${choice('money', 'To my company’s client account', 'Only for RERA-licensed brokers with a separate client account.', false)}
</div>
${card({ title: 'Chen Wei’s account', body: `<div class="form-grid c2">
  ${field({ label: 'Account holder', value: 'CHEN WEI', cls: 'span2' })}
  ${field({ label: 'IBAN or overseas account', value: 'AE58 0330 0000 1928 3746 501', cls: 'span2', hint: 'Overseas accounts are paid by international transfer at the bank’s rate.' })}
</div>` })}`,
    }),
  },
  {
    slug: 'start/rep-done',
    render: () => setupPage({ flow: 'rep', step: 'done', title: 'Your account is ready.', sub: 'We’ll let you know as soon as Chen Wei confirms and the PoA is approved.',
      body: done({ body: `
${list([
  { icon: 'fingerprint', tone: 'brand', title: 'Your identity', sub: `${d.name} · RERA BRN 58817`, endBadge: badge('Verified', 'ok') },
  { icon: 'stamp', title: 'PoA · Chen Wei', sub: 'Valid to 2 Sep 2027', endBadge: badge('Under review', 'info') },
  { icon: 'landmark', title: 'Rent goes to', sub: 'Chen Wei’s account', endBadge: badge('Set', 'ok') },
])}
<div class="btn-row">${btn('Go to my dashboard', { href: '../rep/index.html', variant: 'primary', size: 'lg', iconEnd: 'arrow-right' })}</div>` }),
    }),
  },
];

/* ---------------- OpenRent team ---------------- */
const m = people.manager;
const staff = [
  {
    slug: 'start/staff-1',
    render: () => setupPage({ flow: 'staff', step: 1, title: `Welcome to the team, ${m.first}. Lock down your account.`, sub: 'Team accounts can see tenants’ documents and move client money, so they need a password and an authenticator app.', back: R + 'invite.html', next: step('staff', 2),
      body: `
${card({ title: 'Password', body: `<div class="stack stack-md">${field({ label: 'Work email', value: m.email, readonly: true })}${password({ id: 'pw-staff', hint: '' })}</div>` })}
${card({ title: 'Authenticator app', body: `<div class="stack stack-md"><div class="inline" style="gap:16px;align-items:flex-start"><div style="width:120px;flex:none">${qr('openrent-staff-layla')}</div><p class="small">Scan with Google Authenticator, Microsoft Authenticator or 1Password. Can’t scan? Enter <span class="code">KZ4F 7QPM 2H6D XA3W</span>.</p></div>
<div class="field"><span class="label">Enter the 6-digit code from the app</span>${otp('', { label: 'Authenticator code' })}</div></div>` })}
${card({ title: 'Backup codes', body: `<div class="stack stack-sm"><p class="small muted">Each works once if you lose your phone. Keep them somewhere safe.</p><div class="grid g2 small"><span class="code">4821-7730</span><span class="code">1953-0846</span><span class="code">6607-2219</span><span class="code">3398-5172</span></div>${btn('Download codes', { size: 'sm', icon: 'download', toast: 'backup-codes.txt downloaded (demo)' })}</div>` })}`,
      aside: guard({ title: 'Team account rules', checks: [
        { state: 'ok', title: 'Two-step sign-in, always', sub: 'No way to turn it off for team accounts.' },
        { state: 'ok', title: 'Signed out after 12 hours', sub: 'And whenever you sign in on a new device.' },
        { state: 'info', title: 'Every action is logged', sub: 'The audit trail is visible to admins and compliance.' },
      ] }),
    }),
  },
  {
    slug: 'start/staff-2',
    render: () => setupPage({ flow: 'staff', step: 2, title: 'Your licence and profile', sub: 'Tenants and landlords see your name, photo and licence on anything you sign or approve.', back: step('staff', 1), next: step('staff', 3),
      body: `
${uaePassCard({ name: m.name, eid: '784-1990-•••••••-1' })}
${card({ title: 'RERA licence', body: `<div class="stack stack-md"><div class="form-grid c2">
  ${field({ label: 'Broker registration number (BRN)', value: '61204', state: 'ok', hint: 'Active on the RERA register', hintTone: 'good' })}
  ${field({ label: 'Card expires', type: 'date', value: '2027-06-30' })}
</div>${upload('Broker card', '', 'rera-brn-61204.pdf', { badge: 'Verified' })}</div>` })}
${card({ title: 'Profile', body: `<div class="stack stack-md">${field({ label: 'Display name', value: m.name })}<div class="field"><span class="label">Languages you work in</span>${multi([['English', 1], ['Arabic', 1], ['French', 1], ['Hindi', 0], ['Urdu', 0], ['Russian', 0], ['Tagalog', 0]])}</div></div>` })}`,
      aside: callout({ tone: 'neutral', icon: 'users', title: 'Other team roles', body: 'Field agents add their driving licence and the areas they cover. Compliance officers add their MLRO appointment letter.' }),
    }),
  },
  {
    slug: 'start/staff-3',
    render: () => setupPage({ flow: 'staff', step: 3, title: 'Read and accept our policies', sub: 'You can find these again any time in the team handbook.', back: step('staff', 2), next: 'staff-done.html', nextLabel: 'Finish setup',
      body: `
${card({ title: 'Training', flush: true, body: list([
  { icon: 'shield-alert', tone: 'brand', title: 'Anti-money laundering', sub: '25 minutes · required before you approve payments', endBadge: badge('Completed', 'ok', { icon: 'check' }) },
  { icon: 'scale', title: 'The rulebook: Dubai tenancy law', sub: '40 minutes · the guardrails in the product', endBadge: badge('Completed', 'ok', { icon: 'check' }) },
  { icon: 'lock-keyhole', title: 'Handling personal data', sub: '15 minutes', toast: 'Training module opens here (demo)', endBadge: badge('Start', 'warn') },
]) })}
${card({ title: 'I confirm that', body: `<div class="stack stack-sm">
  ${check('I have read the code of conduct, including the rules on gifts and conflicts of interest', true)}
  ${check('I will only open a tenant’s documents when a task needs it', true)}
  ${check('I will never ask for or accept rent in cash or into a personal account', true)}
  ${check('I will report suspicious activity to the compliance officer the same day', false)}
</div>` })}`,
      aside: guard({ title: 'Why these matter', checks: [
        { state: 'ok', title: 'Client money stays separate', sub: 'Rent and deposits only move through the safeguarded account.', rule: rule('OR-101', 'Deposits', '../') },
        { state: 'ok', title: 'Disputes go the proper way', sub: 'Managers mediate. Anything unresolved goes to the Rental Disputes Center.', rule: rule('DXB-RDC', 'Disputes', '../') },
      ] }),
    }),
  },
  {
    slug: 'start/staff-done',
    render: () => setupPage({ flow: 'staff', step: 'done', title: `You’re in, ${m.first}.`, sub: 'Your queue is ready. Finish the data module this week to unlock document access.',
      body: done({ body: `
${list([
  { icon: 'lock-keyhole', tone: 'brand', title: 'Two-step sign-in', sub: 'Authenticator app · 4 backup codes', endBadge: badge('On', 'ok') },
  { icon: 'badge-check', title: 'RERA BRN 61204', sub: 'Valid to 30 Jun 2027', endBadge: badge('Verified', 'ok') },
  { icon: 'graduation-cap', title: 'Training', sub: '2 of 3 modules done', endBadge: badge('1 to go', 'warn') },
])}
<div class="btn-row">${btn('Open my queue', { href: '../manager/index.html', variant: 'primary', size: 'lg', iconEnd: 'arrow-right' })}</div>` }),
    }),
  },
];

/* ---------------- Index of every flow ---------------- */
const index = {
  slug: 'start/index',
  render: ({ shell }) => {
    const authPages = [
      ['signup.html', 'user-plus', 'Create an account', 'Pick a role'], ['signup-details.html', 'id-card', 'Your details', 'UAE Pass or email, with password strength'],
      ['verify.html', 'smartphone', 'Confirm your mobile', 'Six-digit SMS code'], ['verify-email.html', 'mail-check', 'Confirm your email', 'Link by email'],
      ['email-verified.html', 'badge-check', 'You’re verified', 'Hand-off to setup'], ['signin.html', 'log-in', 'Sign in', 'UAE Pass, password or one-time code'],
      ['signin-code.html', 'key-round', 'Sign-in code', 'Passwordless sign-in'], ['forgot-password.html', 'life-buoy', 'Forgot password', 'Request a reset link'],
      ['reset-sent.html', 'mail', 'Reset link sent', 'Check your email'], ['reset-password.html', 'lock-keyhole', 'New password', 'Choose and confirm'],
      ['reset-done.html', 'circle-check', 'Password updated', 'Signed out elsewhere'], ['invite.html', 'mail-open', 'Team invite', 'For OpenRent staff'],
    ];
    const flowTile = (id, signup) => {
      const fl = FLOWS[id];
      return `<div class="card pad flow-tile ${fl.roleCls}"><div class="between"><span class="row-ico">${icon(fl.icon, 24)}</span>${badge(`${fl.steps.length} steps`, 'outline')}</div>
      <div><h2>${fl.label}</h2><p class="small muted mt-1">${fl.person} · ${fl.steps.map(s => s[0]).join(' → ')}</p></div>
      <div class="cluster">${btn('Start at step 1', { href: `${id}-1.html`, size: 'sm', variant: 'primary' })}${signup ? btn('From sign-up', { href: R + signup, size: 'sm', variant: 'ghost' }) : ''}</div></div>`;
    };
    const body = `
${ui.pageHead({ eyebrow: 'Clickable mock-up · demo data', title: 'Sign-up and setup', sub: 'Every screen a new user sees, from creating an account to their first dashboard. The role picked at sign-up is carried through verification, so each path ends in the right setup.' })}
<div class="section-head"><h2>First-run setup by role</h2></div>
<div class="grid sm2 lg3">${flowTile('renter', 'signup-details.html?as=renter')}${flowTile('landlord', 'signup-details.html?as=landlord')}${flowTile('contractor', 'signup-details.html?as=contractor')}${flowTile('rep', 'signup-details.html?as=rep')}${flowTile('staff', 'invite.html')}</div>
<div class="section-head"><h2>Account screens</h2></div>
<div class="card">${list(authPages.map(([href, ic, t, s]) => ({ icon: ic, title: t, sub: s, href: R + href })))}</div>`;
    return shell.plainPage({ title: 'Sign-up and setup', base: R, back: '../index.html', body });
  },
};

module.exports = [index, ...renter, ...landlord, ...contractor, ...rep, ...staff];
