const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sheet, field, choice, tabs, panel, docIco, toggle, bar, sectionHead } = ui;
const B = '../../';

const doc = (kind, title, sub, o = {}) => ({ lead: docIco(kind, o.cls), title, sub, endBadge: o.badge, toast: `${title} downloaded (demo)`, chev: false, extra: o.extra });

const documents = {
  slug: 'documents', nav: 'documents', title: 'Documents', sub: '18 files',
  body: () => `
${pageHead({ title: 'Documents', sub: 'Every paper for your tenancy, signed and timestamped. Download any time — even after you move out.', actions: btn('Request a letter', { icon: 'file-plus', size: 'sm', sheet: 'sheet-letter' }) + btn('Upload', { icon: 'upload', size: 'sm', toast: 'Upload (demo)' }) })}
${ui.chips(['All', 'Tenancy', 'Money', 'Home', 'Identity'])}
<div class="grid lg2">
<div class="stack">
  ${card({ title: 'Tenancy', flush: true, body: list([
    doc('PDF', 'Unified tenancy contract', 'Signed by both parties · 24 Feb 2026 · 6 pages', { badge: badge('Signed', 'ok') }),
    doc('PDF', 'Ejari certificate', 'No. 0120260301004417 · valid to 28 Feb 2027', { badge: badge('Active', 'ok') }),
    doc('PDF', 'Renewal offer — 2027/28', 'Received 18 Nov 2026 · awaiting your reply', { badge: badge('New', 'accent') }),
    doc('PDF', 'Addendum: pet permission', 'Signed 24 Feb 2026'),
    doc('PDF', 'Tenancy confirmation letter', 'For visa / school · issued 3 Sep 2026'),
  ]) })}
  ${card({ title: 'Home', flush: true, body: list([
    doc('PDF', 'Move-in condition report', '84 photos · agreed 1 Mar 2026', { badge: badge('Agreed', 'ok') }),
    doc('PDF', 'DEWA move-in confirmation', 'Account 2030148866'),
    doc('PDF', 'Building move-in permit', 'Marina Gate FM · 28 Feb 2026'),
    doc('PDF', 'Community rules', 'Marina Gate owners’ association'),
    doc('PDF', 'Appliance manuals', 'Oven, hob, washer-dryer, fridge'),
  ]) })}
</div>
<div class="stack">
  ${card({ title: 'Money', flush: true, body: list([
    doc('PDF', 'Deposit certificate', 'DEP-2602-0311 · AED 5,250 safeguarded'),
    doc('PDF', 'Direct debit mandate', 'DDA-ENBD-77120934'),
    doc('XLS', 'Rent statement 2026', '9 payments · updated 1 Nov', { cls: 'xls' }),
    doc('PDF', 'Tax invoice — Move.me fee', 'INV-2602-1180 · AED 261.45 incl. VAT'),
  ]) })}
  ${card({ title: 'Identity', headEnd: badge('Private', '', { icon: 'lock' }), flush: true, body: list([
    doc('IMG', 'Emirates ID', 'Expires 14 Jun 2028 · verified with UAE Pass', { cls: 'img', badge: badge('Verified', 'ok') }),
    doc('IMG', 'Residence visa', 'Expires 14 Jun 2028', { cls: 'img' }),
    doc('IMG', 'Passport', 'Expires 02 Sep 2031', { cls: 'img' }),
    doc('PDF', 'Salary certificate', 'Meridian Hospitality Group · Jan 2026'),
  ]) + `<div class="card-body" style="padding-top:0"><p class="small muted">Your landlord saw a verification result only — never these files.</p></div>` })}
</div></div>`,
  sheets: () => sheet('sheet-letter', 'Request a letter',
    `${choice('let', 'Tenancy confirmation', 'For visas, banks or schools · instant · free', true)}${choice('let', 'Rent payment history', 'Stamped statement of rent paid · instant · free', false)}${choice('let', 'No-objection letter (NOC)', 'e.g. for a home-business licence · landlord approval needed', false)}${choice('let', 'Landlord reference', 'For your next home', false)}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Generate', { variant: 'primary', toast: 'Letter generated and added to Documents (demo)' })),
};

const moveout = {
  slug: 'moveout', nav: 'moveout', title: 'Moving out', sub: 'Nothing planned',
  body: () => `
${pageHead({ title: 'Moving out', sub: 'Not leaving yet? Good. When you are, this is everything that needs to happen — in order — so your deposit comes back in full.', actions: btn('Start move-out', { variant: 'primary', icon: 'package', sheet: 'sheet-moveout' }) })}
<div class="split">
<div class="stack">
  <div class="grid sm2">
    <div class="card pad stack stack-sm"><span class="row-ico brand">${icon('flag', 20)}</span><b class="strong">Leave at the end of your contract</b><p class="small muted">No penalty. Let us know by <b class="strong">Wed 30 Dec 2026</b> and move out on or before Sun 28 Feb 2027.</p>${badge('AED 0', 'ok')}</div>
    <div class="card pad stack stack-sm"><span class="row-ico accent">${icon('door-open', 20)}</span><b class="strong">Leave early</b><p class="small muted">Give 60 days’ notice and pay one month’s rent. Unused rent is refunded pro rata.</p>${badge('AED 8,750 exit payment', 'accent')}<div>${rule('OR-102', 'Fair way out')}</div></div>
  </div>

  ${card({ title: 'Early-exit calculator', body: `
    <div class="field"><label for="mo">Notice given today — you would leave in</label><div class="between"><span class="hero-num"><span data-out="mo">60</span> <small>days</small></span><span class="muted small">earliest Sat 23 Jan 2027</span></div><input class="range" type="range" id="mo" min="60" max="96" step="1" value="60"><div class="between micro muted"><span>60 days (minimum)</span><span>96 days (end of term)</span></div></div>
    <div class="mt-4">${kv([['Exit payment (1 month’s rent)', money(8750)], ['Rent due up to your leaving date', 'Paid monthly as usual'], ['Deposit returned (if no deductions)', '− AED 5,250'], ['Net cost of leaving early', 'AED 3,500']], 'total')}</div>
    <p class="small muted mt-3">Illustration only. Cheque payers get unused cheques back; monthly payers simply stop after the last month.</p>` })}

  ${card({ title: 'Move-out checklist', body: timeline([
    { icon: 'send', title: 'Give notice in the app', body: 'Your landlord and manager are notified instantly, with a dated record.' },
    { icon: 'calendar-check', title: 'Book the check-out inspection', body: 'A field agent compares every room with your move-in photos.' },
    { icon: 'sparkles', title: 'Clean, and repair anything you changed', body: 'Optional: book end-of-tenancy cleaning from AED 380.' },
    { icon: 'truck', title: 'Get a move-out permit from building management', body: 'We request it for you once your final DEWA bill is settled.' },
    { icon: 'plug', title: 'Close DEWA, internet and chiller accounts', body: 'DEWA returns your AED 2,000 deposit to your bank.' },
    { icon: 'key-round', title: 'Hand back keys, cards and parking tag', body: 'Logged against the inventory.' },
    { icon: 'banknote', title: 'Deposit returned within 14 days', body: 'Straight to your account. Any deduction must come with photo evidence.' },
    { icon: 'file-x', title: 'Ejari cancelled', body: 'So you can register your next home without delay.' },
  ]) })}
</div>
<aside class="stack">
  ${guard({ title: 'Know before you go', checks: [
    { state: 'ok', title: 'Normal wear is not chargeable', sub: 'Light scuffs, faded paint and worn sealant are fair wear and tear.', rule: rule('DXB-021', 'Art. 21') },
    { state: 'ok', title: 'Deposit comes back in 14 days', rule: rule('OR-101', 'Our standard') },
    { state: 'info', title: 'Your landlord cannot ask you to leave without due process', sub: 'Ending your tenancy at expiry needs 12 months’ notarised notice and a legal reason.', rule: rule('DXB-025B', '12-month notice') },
  ] })}
  ${card({ title: 'Book help', flush: true, body: list([
    { icon: 'sparkles', title: 'End-of-tenancy clean', sub: '1-bed apartment', end: 'AED 380', toast: 'Added to basket (demo)' },
    { icon: 'paint-roller', title: 'Touch-up painting', sub: 'Only if you repainted', end: 'from AED 450', toast: 'Added to basket (demo)' },
    { icon: 'truck', title: 'Movers', sub: 'Partner quotes in 1 hour', end: 'Quote', toast: 'Quote requested (demo)' },
  ]) })}
</aside></div>`,
  sheets: () => sheet('sheet-moveout', 'Start move-out',
    `${choice('mv', 'At the end of my contract', 'Leave by Sun 28 Feb 2027 · no charge', true)}${choice('mv', 'Earlier than that', '60 days’ notice · exit payment AED 8,750', false)}
     ${field({ label: 'Intended last day', type: 'date', value: '2027-02-27' })}
     ${field({ label: 'Reason (optional — helps your landlord)', type: 'select', options: ['Prefer not to say', 'Relocating abroad', 'Bought a home', 'Need more space', 'Rent too high', 'Other'], value: 'Prefer not to say' })}
     ${callout({ tone: 'warn', body: 'Notice is binding once sent. You can withdraw it only if your landlord agrees.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Give notice', { variant: 'primary', toast: 'This is a demo — no notice was sent.' })),
};

const household = {
  slug: 'household', nav: 'household', title: 'Household', sub: '2 people · 1 pet',
  body: () => `
${pageHead({ title: 'Household', sub: 'Dubai asks for everyone living in a home to be registered against the Ejari. Keep this list current and we keep the paperwork right.', actions: btn('Add someone', { variant: 'primary', icon: 'user-plus', sheet: 'sheet-occupant' }) })}
<div class="split">
<div class="stack">
  ${card({ title: 'People living here', headEnd: badge('Synced with Ejari · 2 Mar 2026', 'ok', { icon: 'refresh-cw' }), flush: true, body: list([
    { lead: avatar('Maya Fernandes', { size: 'lg', ring: true }), title: 'Maya Fernandes', badge: badge('Lead tenant', 'accent'), sub: 'Emirates ID 784-1991-•••••••-4 · signed the contract', endBadge: badge('Verified', 'ok') },
    { lead: avatar('Rohan Dsouza', { size: 'lg' }), title: 'Rohan D’Souza', badge: badge('Partner'), sub: 'Emirates ID 784-1990-•••••••-1 · registered occupant since 2 Mar 2026', endBadge: badge('Registered', 'ok') },
  ]) })}
  ${card({ title: 'Also at home', flush: true, body: list([
    { icon: 'paw-print', tone: 'gold', title: 'Miso', sub: 'Cat · microchipped · permitted by contract addendum', endBadge: badge('Allowed', 'ok') },
    { icon: 'car', title: 'White Mazda CX-5 · Dubai R 48172', sub: 'Parking bay P3-217 · tag issued', toast: 'Vehicle details (demo)' },
    { icon: 'key-round', title: '2 access cards · 2 door keys · 1 mailbox key', sub: 'Logged in your condition report', href: 'inventory.html' },
  ]) })}
  ${card({ title: 'Guests and visitors', body: `<p class="small muted">Friends and family can stay with you. If someone will live here for more than 30 days, add them above so the Ejari record is right.</p><div class="btn-row mt-3">${btn('Register a long-stay guest', { size: 'sm', sheet: 'sheet-occupant' })}${btn('Visitor parking pass', { size: 'sm', toast: 'Pass requested from Marina Gate FM (demo)' })}</div>` })}
</div>
<aside class="stack">
  ${guard({ title: 'Household rules', checks: [
    { state: 'ok', title: 'Everyone here is registered', sub: 'Name, Emirates ID and date of birth are recorded via Dubai REST.', rule: rule('DXB-OCC', 'Co-occupants') },
    { state: 'block', title: 'Renting out a room or bed space is not allowed', sub: 'Since Aug 2026 only owners or licensed operators with a shared-housing permit may do this. Fines reach AED 1,000,000.', rule: rule('DXB-S04', 'Law 4/2026') },
    { state: 'info', title: 'Subletting the whole flat needs written consent', sub: 'Ask Fatima through the app so there is a record.', rule: rule('DXB-024', 'Art. 24') },
  ] })}
  ${callout({ tone: 'neutral', icon: 'baby', title: 'Family changing?', body: 'A new baby, a parent moving in, a flatmate leaving — update the list and we refresh the Ejari occupants for you, free.' })}
</aside></div>`,
  sheets: () => sheet('sheet-occupant', 'Add someone to your home',
    `${field({ label: 'Full name (as on Emirates ID or passport)', placeholder: 'e.g. Anita Fernandes' })}
     <div class="form-grid c2">${field({ label: 'Relationship', type: 'select', options: ['Spouse / partner', 'Child', 'Parent', 'Sibling', 'Flatmate', 'Domestic worker', 'Other'], value: 'Parent' })}${field({ label: 'Date of birth', type: 'date', value: '1962-05-17' })}</div>
     ${field({ label: 'Emirates ID or passport number', placeholder: '784-YYYY-NNNNNNN-N', inputmode: 'numeric' })}
     ${field({ label: 'Moving in on', type: 'date', value: '2026-12-01' })}
     ${callout({ tone: 'brand', body: 'We add them to your Ejari through Dubai REST. Your landlord is informed, but family members do not need approval.', rules: [rule('DXB-OCC', 'Co-occupants')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Add to household', { variant: 'primary', toast: 'Added — Ejari occupants will update within 1 working day (demo)' })),
};

const util = (ic, title, sub, state, extra) => ({ icon: ic, tone: state === 'Active' || state === 'Done' ? 'ok' : state === 'Optional' ? '' : 'warn', title, sub, endBadge: badge(state, state === 'Optional' ? '' : 'ok', { dot: state !== 'Optional' }), extra });

const setup = {
  slug: 'setup', nav: 'setup', title: 'Home set-up', sub: 'All essentials connected',
  body: () => `
${pageHead({ title: 'Home set-up', sub: 'Utilities, permits and services for your flat. We set most of this up for you on move-in day.' })}
<div class="split">
<div class="stack">
  <div class="card pad stack stack-sm"><div class="between"><b class="strong">Move-in checklist</b><span class="small strong t-ok">9 of 9 complete</span></div>${bar(100, 'ok')}</div>
  ${card({ title: 'Utilities', flush: true, body: list([
    util('zap', 'DEWA — electricity & water', 'Account 2030148866 · AED 2,000 deposit paid · last bill AED 612.40 (incl. AED 437.50 housing fee)', 'Active'),
    util('snowflake', 'Cooling', 'District cooling is included in the building service charge — nothing for you to pay', 'Active'),
    util('wifi', 'Home internet', 'du Home Starter 500 Mbps · router in hall cupboard', 'Active'),
    util('flame', 'Cooking', 'Electric hob — no gas connection in this building', 'Done'),
  ]) })}
  ${card({ title: 'Permits and access', flush: true, body: list([
    util('truck', 'Move-in permit', 'Marina Gate FM · used 1 Mar 2026', 'Done'),
    util('file-badge', 'Ejari registration', 'Needed for DEWA, visas and school places', 'Done'),
    util('users', 'Occupants registered', '2 people on the Ejari', 'Done'),
    util('key-round', 'Keys & access cards', '2 cards, 2 keys, parking tag', 'Done'),
    util('camera', 'Condition report agreed', '84 photos — protects your deposit', 'Done'),
  ]) })}
  ${card({ title: 'Nice to have', flush: true, body: list([
    { icon: 'umbrella', title: 'Home contents insurance', sub: 'Your landlord’s policy covers the building, not your belongings · from AED 29 / month', endBadge: badge('Optional'), toast: 'Partner quotes (demo)' },
    { icon: 'sparkles', title: 'Regular cleaning', sub: 'Vetted cleaners, same person each time · from AED 35 / hour', endBadge: badge('Optional'), toast: 'Cleaning plans (demo)' },
  ]) })}
</div>
<aside class="stack">
  ${card({ title: 'What moving in cost', body: kv([['First month’s rent', money(8750)], ['Security deposit (refundable)', money(5250)], ['Move.me tenancy fee + VAT', 'AED 261.45'], ['Ejari (government fee)', 'AED 177.75'], ['DEWA deposit (refundable)', money(2000)], ['DEWA activation', 'AED 130'], ['Agency commission', '<span class="t-ok">AED 0</span>'], ['Total on day one', 'AED 16,569.20']], 'total') + `<p class="small muted mt-3">A typical agent would have added 5% commission: AED 5,250 + VAT.</p>` })}
  ${callout({ tone: 'neutral', icon: 'landmark', title: 'About the housing fee', body: 'Dubai Municipality collects 5% of annual rent from tenants through the DEWA bill. For you that is AED 5,250 a year, spread monthly.' })}
</aside></div>`,
};

const rooms = [['Living room', 'living-a', 18, 'Good', 'Small scuff on wall behind sofa (photo 7)'], ['Bedroom', 'bedroom-a', 14, 'Good', 'Wardrobe door slightly misaligned'], ['Kitchen', 'kitchen-a', 21, 'Good', 'All appliances tested and working'], ['Bathroom 1', 'bath-a', 11, 'Good', 'Hairline crack in one floor tile near door'], ['Bathroom 2', 'bath-b', 9, 'As new', ''], ['Balcony', 'p1', 6, 'Good', 'Light rust on railing bracket'], ['Hall & entrance', 'living-d', 5, 'As new', '']];

const inventory = {
  slug: 'inventory', nav: 'inventory', title: 'Condition report', sub: 'Move-in · 1 Mar 2026',
  body: () => `
${pageHead({ eyebrow: 'Agreed by both parties', title: 'Move-in condition report', sub: 'This is the evidence your deposit is judged against. 84 timestamped photos, room by room.', actions: btn('Download PDF', { icon: 'download', size: 'sm', toast: 'Report downloaded (demo)' }) })}
<div class="split">
<div class="stack">
  <div class="grid g2 sm4">${[['84', 'photos'], ['7', 'rooms'], ['5', 'notes added'], ['2', 'signatures']].map(([n, l]) => `<div class="card pad center"><b class="display" style="font-size:24px">${n}</b><div class="small muted">${l}</div></div>`).join('')}</div>
  ${rooms.map(([name, img, n, cond, note]) => `<div class="card pad stack stack-md">
    <div class="between"><div><b class="strong" style="font-size:16px">${name}</b><div class="small muted">${n} photos</div></div>${badge(cond, cond === 'As new' ? 'ok' : 'brand')}</div>
    <div class="photo-grid">${[0, 1, 2].map(i => `<div class="ph"><img src="${B}assets/img/${img}.svg" alt="${name} photo" style="object-position:${i * 50}% 50%"></div>`).join('')}</div>
    ${note ? `<div class="callout neutral" style="padding:10px 12px">${icon('message-square-text', 18)}<p class="grow">${note}</p></div>` : ''}</div>`).join('')}
</div>
<aside class="stack sticky-side">
  ${card({ title: 'Sign-off', flush: true, body: list([
    { lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'openrent.me field agent · carried out the report', endSub: '1 Mar, 10:40' },
    { lead: avatar('Maya Fernandes'), title: 'Maya Fernandes', sub: 'Tenant · agreed with 5 notes', endBadge: badge('Signed', 'ok'), endSub: '3 Mar' },
    { lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · accepted tenant notes', endBadge: badge('Signed', 'ok'), endSub: '4 Mar' },
  ]) })}
  ${card({ title: 'Meter readings at move-in', body: kv([['Electricity', '48,217 kWh'], ['Water', '1,932 m³'], ['Keys handed over', '2 keys · 2 cards · 1 tag']]) })}
  ${callout({ tone: 'brand', title: 'Why this matters', body: 'At check-out the same photos are retaken from the same angles. Anything already noted here cannot be charged to you.', rules: [rule('DXB-021', 'Art. 21')] })}
</aside></div>`,
};

const pref = (title, sub, on, o) => `<div class="row"><div class="row-main"><div class="row-title">${title}</div>${sub ? `<div class="row-sub">${sub}</div>` : ''}</div>${toggle(on, o)}</div>`;

const profile = {
  slug: 'profile', nav: 'profile', title: 'Profile & ID', sub: 'Verified tenant',
  body: ({ data }) => { const t = data.people.tenant; return `
<div class="split">
<div class="stack">
  <div class="card pad"><div class="inline" style="gap:14px">${avatar(t.name, { size: 'xl', ring: true })}<div><h1>${t.name}</h1><p class="muted">${t.job}</p><div class="cluster mt-2">${badge('Verified tenant', 'ok', { icon: 'badge-check' })}${badge('Tenant since Mar 2026')}</div></div></div></div>

  ${card({ title: 'Verification', headEnd: `<span class="small muted">Shared as a result, not as documents</span>`, flush: true, body: list([
    { icon: 'fingerprint', tone: 'ok', title: 'Identity — UAE Pass', sub: 'Emirates ID ' + t.eid + ' · matched 20 Feb 2026', endBadge: badge('Verified', 'ok') },
    { icon: 'stamp', tone: 'ok', title: 'Residence visa', sub: 'Valid to 14 Jun 2028 · we remind you 60 days before expiry', endBadge: badge('Valid', 'ok') },
    { icon: 'briefcase', tone: 'ok', title: 'Employment & income', sub: 'Salary certificate checked · rent is 31% of income', endBadge: badge('Passed', 'ok') },
    { icon: 'gauge', tone: 'ok', title: 'Credit check — Al Etihad Credit Bureau', sub: 'Score band: Very good · no bounced cheques on record', endBadge: badge('Passed', 'ok') },
    { icon: 'history', tone: 'ok', title: 'Rental history', sub: '9 of 9 payments on time · 2 repairs signed off · 5.0 landlord rating', endBadge: badge('Excellent', 'brand') },
  ]) })}

  ${card({ title: 'Contact details', body: `<div class="form-grid c2">${field({ label: 'Email', type: 'email', value: t.email })}${field({ label: 'Mobile', type: 'tel', value: t.phone })}${field({ label: 'Emergency contact', value: 'Rohan D’Souza · +971 52 555 0171', cls: 'span2' })}</div>` })}

  ${card({ title: 'Notifications', flush: true, body: `<div class="list">${pref('Rent reminders', '3 days before each collection', true)}${pref('Repair updates', 'Push and WhatsApp', true)}${pref('Legal and rule changes', 'Always on — these affect your rights', true, { disabled: true })}${pref('Offers from partners', 'Insurance, movers, cleaning', false)}</div>` })}
</div>
<aside class="stack">
  ${card({ title: 'Language', body: `${ui.seg('lang', [{ id: 'en', label: 'English' }, { id: 'ar', label: 'العربية' }], 'en', 'block')}<p class="small muted mt-3">Contracts and legal notices are always issued in both Arabic and English.</p>` })}
  ${card({ title: 'Your data', flush: true, body: list([
    { icon: 'eye', title: 'Who can see what', sub: 'Landlord: name, verification result, messages', toast: 'Sharing settings (demo)', chev: true },
    { icon: 'download', title: 'Download my data', sub: 'Under UAE data-protection law (PDPL)', toast: 'Export requested (demo)', chev: true },
    { icon: 'shield', title: 'Two-step sign-in', sub: 'UAE Pass + device passcode', endBadge: badge('On', 'ok') },
  ]) })}
  ${btn('Sign out', { block: true, icon: 'log-out', href: '../index.html' })}
</aside></div>`; },
};

module.exports = [documents, moveout, household, setup, inventory, profile];
