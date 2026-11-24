const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, stats, tabs, panel, sheet, table, field, choice, toggle, avatar, pageHead, sectionHead, chips, stars } = ui;
const { person } = require('./_h');

/* ---------- Users ---------- */
const open = () => btn('Open', { size: 'sm', sheet: 'sheet-user' });
const ok = t => badge(t, 'ok', { icon: 'badge-check' });
const users = {
  slug: 'users', nav: 'users', title: 'Users', sub: '7,557 accounts',
  body: () => `
${pageHead({ eyebrow: 'Directory', title: 'Users', sub: 'Everyone with an account, and what we have verified about them. Looking inside an account is always read-only, time-limited and logged.', actions: btn('Export', { icon: 'download', size: 'sm', toast: 'Directory exported (demo)' }) + btn('Invite staff', { icon: 'plus', size: 'sm', variant: 'primary', sheet: 'sheet-invite' }) })}

${stats([
  { label: 'Landlords', icon: 'building-2', value: '1,920', delta: '4.6%', sub: '38 awaiting KYC' },
  { label: 'Tenants', icon: 'key-round', value: '5,410', delta: '3.3%', sub: '+3,870 occupants' },
  { label: 'Contractors', icon: 'wrench', value: '186', sub: 'companies · 3 suspended' },
  { label: 'Staff', icon: 'id-card', value: '41', sub: '14 RERA-carded managers' },
])}

<div class="input-group"><span class="affix">${icon('search', 16)}</span><input class="input" placeholder="Search name, email, Emirates ID, Ejari or property" aria-label="Search users"></div>

${tabs('usr', [{ id: 'landlords', label: 'Landlords', n: '1,920' }, { id: 'tenants', label: 'Tenants', n: '5,410' }, { id: 'contractors', label: 'Contractors', n: 186 }, { id: 'staff', label: 'Staff', n: 41 }], 'landlords')}

${panel('usr', 'landlords', `
  ${chips(['All', ['Verified', '1,882'], ['KYC pending', 38], ['Via PoA', 211], 'Companies', 'Suspended'])}
  <div class="card">${table({ cols: [{ label: 'Landlord' }, { label: 'Status' }, { label: 'Verification' }, { label: 'Portfolio', r: true }, { label: 'Joined' }, { label: '', r: true }], rows: [
    [person('Fatima Al Hashimi', 'fatima@alhashimi.example'), badge('Active', 'ok', { dot: true }), ok('Title deeds · ID'), '7 properties', 'Feb 2025', open()],
    [person('Al Noor Holdings LLC', 'leasing@alnoor.example · company', { tone: 'c7' }), badge('Active', 'ok', { dot: true }), ok('Trade licence · UBO'), '24 properties', 'May 2025', open()],
    [person('Sunita Kapoor', 'Represented by Daniel Okafor (PoA to Mar 2028)'), badge('Active', 'ok', { dot: true }), ok('Title deeds · PoA'), '12 properties', 'Aug 2025', open()],
    [person('Omar Darwish', 'omar.darwish@example.com'), badge('Active', 'ok', { dot: true }), ok('Title deeds · ID'), '3 properties', 'Jan 2026', open()],
    [person('Viktor Petrov', 'v.petrov@example.com', { tone: 'c5' }), badge('Payouts held', 'warn', { dot: true }), badge('Bank account check', 'warn'), '2 properties', 'Oct 2026', open()],
    [person('Grace Mwangi', 'grace.mwangi@example.com'), badge('Onboarding', 'info', { dot: true }), badge('Title deed in review', 'info'), '1 draft', 'Nov 2026', open()],
  ] })}</div>`, true)}

${panel('usr', 'tenants', `
  ${chips(['All', ['Verified', '5,286'], ['Applicants', 124], ['In arrears', 41], 'Moving out'])}
  <div class="card">${table({ cols: [{ label: 'Tenant' }, { label: 'Status' }, { label: 'Verification' }, { label: 'Home' }, { label: 'On-time payments', r: true }, { label: '', r: true }], rows: [
    [person('Maya Fernandes', 'maya.fernandes@example.com'), badge('Active', 'ok', { dot: true }), ok('ID · income · credit'), 'Marina Gate 1 · 2304', '9 of 9', open()],
    [person('Arjun Mehta', 'with Neha Mehta · joint tenants'), badge('Signing', 'accent', { dot: true }), ok('ID · income · credit'), 'Executive Towers K · 1807', '—', open()],
    [person('James Whitfield', 'with Claire Whitfield'), badge('Active', 'ok', { dot: true }), ok('ID · income'), 'Palma Villa 27', '2 of 2', open()],
    [person('Hassan El-Sayed', 'hassan.elsayed@example.com', { tone: 'c5' }), badge('Arrears', 'danger', { dot: true }), ok('ID · income'), 'Zahra Townhouse 114', '2 of 3', open()],
    [person('Olena Kovalenko', 'olena.k@example.com'), badge('Moving out', 'gold', { dot: true }), ok('ID · income · credit'), 'Al Ghozlan 3 · 412', '4 of 4', open()],
    [person('Chen Wei', 'chen.wei@example.com'), badge('Applicant', 'info', { dot: true }), badge('Credit check queued', 'warn'), 'Offer on Bloom Towers 915', '—', open()],
  ] })}</div>`)}

${panel('usr', 'contractors', `
  ${chips(['All', ['Approved', 183], ['Suspended', 3], 'AC', 'Plumbing', 'Cleaning', 'Locksmith'])}
  <div class="card">${table({ cols: [{ label: 'Company' }, { label: 'Status' }, { label: 'Licence & insurance' }, { label: 'Rating' }, { label: 'Jobs · 90 d', r: true }, { label: '', r: true }], rows: [
    [person('Falcon Technical Services', 'Imran Sheikh · AC, plumbing, electrical', { tone: 'c3' }), badge('Approved', 'ok', { dot: true }), ok('Valid to Aug 2027'), `<span class="inline">${stars(5)} 4.9</span>`, '212', open()],
    [person('BrightHome Cleaning', 'End-of-tenancy and regular cleaning', { tone: 'c2' }), badge('Approved', 'ok', { dot: true }), ok('Valid to Mar 2027'), `<span class="inline">${stars(5)} 4.8</span>`, '418', open()],
    [person('KeyMaster Locksmiths', '24-hour call-out', { tone: 'c4' }), badge('Approved', 'ok', { dot: true }), badge('Insurance ends 12 Dec', 'warn'), `<span class="inline">${stars(4)} 4.4</span>`, '96', open()],
    [person('Desert Cool AC', 'AC servicing', { tone: 'c7' }), badge('Suspended', 'danger', { dot: true }), badge('Trade licence expired', 'danger'), `<span class="inline">${stars(4)} 4.1</span>`, '0', open()],
  ] })}</div>`)}

${panel('usr', 'staff', `
  ${chips(['All', ['Managers', 14], ['Field agents', 9], ['Support', 7], ['Finance', 4], ['Compliance', 2], ['Admins', 3], ['External', 2]])}
  <div class="card">${table({ cols: [{ label: 'Person' }, { label: 'Role' }, { label: 'Credentials' }, { label: 'Sign-in' }, { label: 'Last active' }, { label: '', r: true }], rows: [
    [person('Sami Khoury', 'sami@openrent.me', { tone: 'c2' }), badge('Super Admin', 'violet'), '—', badge('SSO + passkey', 'ok'), 'Now', open()],
    [person('Layla Haddad', 'layla@openrent.me', { tone: 'c2' }), badge('OpenRent Manager', 'info'), ok('RERA BRN 61204 · to Jun 2027'), badge('SSO + passkey', 'ok'), '4 min ago', open()],
    [person('Jun Reyes', 'jun@openrent.me', { tone: 'c5' }), badge('Field Agent'), 'Inspection certified', badge('SSO + app PIN', 'ok'), '22 min ago', open()],
    [person('Hana Suzuki', 'hana@openrent.me', { tone: 'c6' }), badge('Compliance Officer', 'brand'), 'MLRO appointed', badge('SSO + passkey', 'ok'), '1 h ago', open()],
    [person('Priya Nair', 'priya@openrent.me'), badge('Finance Officer', 'gold'), 'Second approver for payouts', badge('SSO + passkey', 'ok'), '35 min ago', open()],
    [person('Omar Aziz', 'omar@openrent.me'), badge('Support Agent'), 'Arabic · English · Urdu', badge('SSO + passkey', 'ok'), '2 min ago', open()],
    [person('Reem Al Marzooqi', 'External · Al Marzooqi Legal', { tone: 'c4' }), badge('Legal Counsel', 'accent'), 'Ruleset approver only', badge('Guest SSO', 'info'), '19 Nov', open()],
  ] })}</div>`)}

${callout({ tone: 'brand', icon: 'eye', title: 'Looking inside an account', body: 'Staff see a verification result, not the documents behind it. Identity files are visible only to the Compliance Officer. “View as user” is read-only, limited to 15 minutes, needs a reason and notifies the user afterwards.' })}`,
  sheets: () => sheet('sheet-user', 'Fatima Al Hashimi',
    `<div class="inline" style="gap:12px">${avatar('Fatima Al Hashimi', { size: 'lg' })}<div><b class="strong">Landlord · 7 properties</b><div class="small muted">fatima@alhashimi.example · +971 50 555 0107</div><div class="cluster mt-2">${badge('Verified', 'ok', { icon: 'badge-check' })}${badge('Since Feb 2025')}</div></div></div>
     ${kv([['Identity', 'UAE Pass · Emirates ID matched'], ['Ownership', '7 title deeds verified with DLD'], ['Rent roll', 'AED 1,032,000 a year'], ['Products', 'List.me · Let.me · Collect.me'], ['Open items', '1 arrears case · 1 contract to sign'], ['Manager', 'Layla Haddad']])}
     <div class="stack stack-sm">${btn('View as user (read-only)', { block: true, icon: 'eye', sheet: 'sheet-impersonate' })}${btn('Reset two-step sign-in', { block: true, icon: 'key', toast: 'Reset link sent to the user (demo)' })}${btn('Export this user’s data (PDPL)', { block: true, icon: 'download', toast: 'Export queued — the user is notified (demo)' })}${btn('Suspend account', { block: true, variant: 'danger', icon: 'ban', toast: 'Suspension needs a second admin — request sent (demo)' })}</div>`)
  + sheet('sheet-impersonate', 'View as Fatima Al Hashimi',
    `${callout({ tone: 'warn', icon: 'eye', title: 'Read-only, 15 minutes, on the record', body: 'You will see what Fatima sees but cannot sign, pay, message or change anything. She is told afterwards who looked, when and why.' })}
     ${field({ label: 'Reason', type: 'select', options: ['Customer asked for help', 'Investigating a bug', 'Payment query', 'Complaint investigation', 'Compliance review'], value: 'Customer asked for help' })}
     ${field({ label: 'Ticket or case reference', placeholder: 'e.g. SUP-48211' })}
     <div class="list"><div class="row" style="padding-left:0;padding-right:0"><div class="row-main"><div class="row-title">Read-only</div><div class="row-sub">Cannot be switched off</div></div>${toggle(true, { disabled: true })}</div><div class="row" style="padding-left:0;padding-right:0"><div class="row-main"><div class="row-title">Hide identity documents and bank details</div><div class="row-sub">Always hidden for this role</div></div>${toggle(true, { disabled: true })}</div></div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Start session', { variant: 'primary', icon: 'eye', href: '../landlord/index.html' }))
  + sheet('sheet-invite', 'Invite a member of staff',
    `${field({ label: 'Work email', type: 'email', placeholder: 'name@openrent.me' })}
     ${field({ label: 'Role', type: 'select', options: ['OpenRent Manager', 'Field Agent', 'Support Agent', 'Finance Officer', 'Compliance Officer', 'Super Admin'], value: 'OpenRent Manager' })}
     ${field({ label: 'RERA broker card number (managers only)', placeholder: 'BRN' , hint: 'Managers cannot verify listings or sign Form A until their card is checked.' })}
     ${callout({ tone: 'neutral', body: 'Staff sign in with company SSO and a passkey. New Super Admins need approval from an existing one.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send invite', { variant: 'primary', toast: 'Invitation sent (demo)' })),
};

/* ---------- Roles & permissions ---------- */
const COLS = [['Tenant', 0], ['Landlord', 0], ['Contractor', 0], ['Manager', 0], ['Super Admin', 0], ['Owner’s rep', 1], ['Occupant', 1], ['Guarantor', 1], ['Field agent', 1], ['Compliance', 1], ['Finance', 1], ['Support', 1], ['Building mgr', 1], ['Legal counsel', 1], ['Auditor', 1]];
const MATRIX = [
  ['View tenancy and contract', 'pp-ffppppfpp--p'],
  ['Sign a tenancy contract', 'pp---p-p-------'],
  ['Create or edit a listing', '-p-p-p---------'],
  ['Verify a listing and issue its permit', '---f-----------'],
  ['Propose or accept a rent change', 'pp---p---------'],
  ['Serve a legal notice', '-p-p-p---------'],
  ['Pay or collect rent', 'pp---p-p--p----'],
  ['Release a deposit', 'pp-f-p----p----'],
  ['Report a repair', 'fp-f-pp-p--pp--'],
  ['Approve repair spending', '-f-p-p---------'],
  ['Accept and complete jobs', '--f------------'],
  ['Host viewings and inspections', '-p-f-p--f------'],
  ['See identity documents', 'p--p-----f----p'],
  ['Decide a dispute', '---f-----------'],
  ['Issue building permits and NOCs', '------------f--'],
  ['Draft a ruleset', '----f--------p-'],
  ['Approve a ruleset for publishing', '----p----p---p-'],
  ['Change prices', '----p-----p----'],
  ['View as another user (read-only)', '----p------p---'],
  ['Read the audit log', '---pf----fp---f'],
];
const pm = c => c === 'f' ? `<span class="pm full" title="Yes">${icon('check', 13)}</span>` : c === 'p' ? `<span class="pm part" title="Limited">${icon('minus', 13)}</span>` : `<span class="pm none" title="No">·</span>`;
const roleCard = (ic, tone, name, n, why, scope, state) => `<div class="card pad stack stack-sm"><div class="between"><span class="row-ico ${tone}">${icon(ic, 20)}</span>${badge(state, state === 'Live' ? 'ok' : state === 'Beta' ? 'info' : '', { dot: state === 'Live' })}</div><div><b class="strong" style="font-size:15.5px">${name}</b><div class="small muted">${n}</div></div><p class="small">${why}</p><p class="small muted" style="display:flex;gap:6px;align-items:flex-start"><span style="flex:none;margin-top:2px">${icon('lock', 13)}</span><span>${scope}</span></p></div>`;

const roles = {
  slug: 'roles', nav: 'roles', title: 'Roles & permissions', sub: '15 roles',
  body: () => `
${pageHead({ eyebrow: 'Governance', title: 'Roles and permissions', sub: 'Five core roles run a tenancy. Ten supporting roles exist because real tenancies involve more people than a landlord and a tenant — each gets the least access that lets them do their part.', actions: btn('Custom role', { icon: 'plus', size: 'sm', variant: 'primary', sheet: 'sheet-role' }) })}

${sectionHead('Core roles')}
<div class="hscroll w66 lg-grid">
  ${roleCard('key-round', 'accent', 'Tenant', '5,410 accounts', 'Rents one home. Pays, reports repairs, renews, moves out.', 'Own tenancy only', 'Live')}
  ${roleCard('building-2', 'brand', 'Landlord', '1,920 accounts', 'Owns one or many properties at different stages of the letting cycle.', 'Own properties only', 'Live')}
  ${roleCard('wrench', 'gold', 'Contractor', '186 companies', 'Quotes for and completes maintenance, cleaning and inspections.', 'Assigned jobs only', 'Live')}
  ${roleCard('user-check', 'info', 'OpenRent Manager', '14 staff', 'RERA-carded broker who verifies, registers, mediates and decides.', 'Assigned portfolio', 'Live')}
  ${roleCard('shield', 'violet', 'Super Admin', '3 staff', 'Runs the platform: rulesets, prices, roles and integrations.', 'Platform-wide · no client-money actions alone', 'Live')}
</div>

${sectionHead('Supporting roles')}
<div class="grid sm2 lg3">
  ${roleCard('handshake', 'info', 'Owner’s Representative', '64 people acting for 211 owners', 'Many Dubai owners live abroad. A family member or property manager acts for them under a notarised power of attorney.', 'Exactly what the PoA allows, until it expires', 'Live')}
  ${roleCard('users', 'accent', 'Co-tenant / Occupant', '3,870 registered', 'Partners, children and flatmates live in the home and must be on the Ejari, but did not sign the contract.', 'Can report repairs and see house information; cannot sign or pay', 'Live')}
  ${roleCard('briefcase', 'gold', 'Guarantor / Corporate tenant', '142 employers', 'Companies often lease homes for staff. HR pays and signs; the employee lives there.', 'Pays and signs; cannot see the occupant’s messages', 'Beta')}
  ${roleCard('camera', 'accent', 'Field Agent', '9 staff', 'Hosts viewings, hands over keys, and photographs move-in and check-out condition.', 'Today’s appointments and their properties', 'Live')}
  ${roleCard('scan-search', 'brand', 'Compliance Officer (MLRO)', '2 staff', 'A licensed brokerage must know its customers and report suspicious activity.', 'Identity documents and alerts; no pricing or product access', 'Live')}
  ${roleCard('calculator', 'gold', 'Finance Officer', '4 staff', 'Reconciles client accounts and is the second approver on every payout.', 'Ledgers and payouts; cannot edit tenancies', 'Live')}
  ${roleCard('headset', 'info', 'Support Agent', '7 staff', 'First line for questions in Arabic, English, Hindi and Urdu.', 'Read-only view of an account, with a reason', 'Live')}
  ${roleCard('building', '', 'Building / Community Manager', '58 partner communities', 'Issues move-in and move-out permits and NOCs, and announces building works.', 'Their building’s units and permit requests only', 'Beta')}
  ${roleCard('gavel', 'violet', 'Legal Counsel', '1 external firm', 'Reviews every ruleset change against the legislation before it can be published.', 'Rulesets and legal templates only', 'Live')}
  ${roleCard('binoculars', '', 'Auditor / Regulator', '1 external', 'Client-money auditors and regulators need to inspect without being able to change anything.', 'Time-boxed, read-only, everything logged', 'Planned')}
</div>

${card({ title: 'Permission matrix', headEnd: `<span class="legend"><span>${pm('f')} Yes</span><span>${pm('p')} Limited</span></span>`, flush: true, body: `<div class="table-wrap"><table class="table matrix"><thead><tr><th>Capability</th>${COLS.map(([c, g]) => `<th${g ? ' class="grp"' : ''}>${c}</th>`).join('')}</tr></thead><tbody>${MATRIX.map(([cap, v]) => `<tr><td><b>${cap}</b></td>${v.split('').map(c => `<td>${pm(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`, foot: `<span class="small muted">“Limited” means own records, assigned work, read-only, or needing a second person. Swipe sideways to see every role.</span>` })}

<div class="split">
  ${guard({ title: 'Separation of duties', sub: 'Built into the matrix — cannot be granted away', checks: [
    { state: 'ok', title: 'Nobody publishes a rule alone', sub: 'Legal counsel, Compliance and Product must each approve.' },
    { state: 'ok', title: 'Nobody moves client money alone', sub: 'Maker and checker are different people, and neither manages the account.' },
    { state: 'ok', title: 'Whoever verifies a listing cannot own it', sub: 'Managers cannot hold a landlord account on the platform.' },
    { state: 'ok', title: 'Admins cannot read identity documents', sub: 'Only the Compliance Officer can, and each view is logged.' },
    { state: 'block', title: 'No role can disconnect services or lock a tenant out', sub: 'The capability does not exist.', rule: rule('DXB-034', 'Art. 34') },
  ] })}
  <aside class="stack">
    ${card({ title: 'Recent access changes', flush: true, body: list([
      { icon: 'key-round', tone: 'gold', title: 'Finance Officer granted to Priya Nair', sub: 'By Sami Khoury · approved by Hana Suzuki', endSub: '22 Nov' },
      { icon: 'handshake', tone: 'info', title: 'PoA scope narrowed for Daniel Okafor', sub: 'Can no longer serve legal notices for Sunita Kapoor', endSub: '18 Nov' },
      { icon: 'user-x', tone: 'danger', title: 'Manager access removed — leaver', sub: '31 tenancies reassigned to Layla Haddad', endSub: '14 Nov' },
    ]) })}
    ${callout({ tone: 'neutral', title: 'Access review', body: 'Every staff role is re-confirmed each quarter. Next review: 4 Jan 2027.' })}
  </aside>
</div>`,
  sheets: () => sheet('sheet-role', 'Create a custom role',
    `${field({ label: 'Role name', placeholder: 'e.g. Portfolio accountant' })}
     ${field({ label: 'Start from', type: 'select', options: ['Owner’s Representative', 'Finance Officer', 'Support Agent', 'Field Agent', 'Blank'], value: 'Owner’s Representative' })}
     ${field({ label: 'Scope', type: 'select', options: ['Named properties', 'One landlord’s portfolio', 'One building', 'Platform-wide (staff only)'], value: 'One landlord’s portfolio' })}
     <div class="list">${[['View tenancy and money', true], ['Download statements', true], ['Approve repair spending', false], ['Sign contracts', false], ['Serve legal notices', false]].map(([t, on]) => `<div class="row" style="padding-left:0;padding-right:0"><div class="row-main"><div class="row-title">${t}</div></div>${toggle(on)}</div>`).join('')}</div>
     ${callout({ tone: 'neutral', icon: 'lock', body: 'Capabilities protected by separation of duties are not offered here. Signing and notices on behalf of an owner need a valid power of attorney on file.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Create role', { variant: 'primary', toast: 'Role created — pending second-admin approval (demo)' })),
};

module.exports = [users, roles];
