const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, stats, tabs, panel, sheet, table, timeline, field, choice, avatar, pageHead, sectionHead, chips, bar, donut } = ui;
const { hbar, person } = require('./_h');

/* ---------- Risk & compliance ---------- */
const alert = (o) => ({ icon: o.icon, tone: o.tone, title: o.title, badge: badge(o.sev, o.sev === 'High' ? 'danger' : o.sev === 'Medium' ? 'warn' : ''), sub: o.sub, endBadge: badge(o.due, o.dueTone || ''), sheet: 'sheet-alert', chev: true, extra: o.extra });

const risk = {
  slug: 'risk', nav: 'risk', title: 'Risk & compliance', sub: '5 alerts open',
  body: () => `
${pageHead({ eyebrow: 'Governance', title: 'Risk and compliance', sub: 'We operate as a licensed brokerage, so knowing our customers, keeping permits valid and reporting properly are conditions of doing business — not features.', actions: btn('Compliance report', { icon: 'download', size: 'sm', toast: 'Monthly compliance report exported (demo)' }) })}

${stats([
  { label: 'AML alerts open', icon: 'shield-alert', value: '5', sub: '2 due today' },
  { label: 'KYC in progress', icon: 'scan-search', value: '38', sub: 'median 6 hours' },
  { label: 'Permits expiring', icon: 'file-warning', value: '23', sub: 'within 7 days' },
  { label: 'Complaints open', icon: 'life-buoy', value: '9', sub: '1 older than 10 days', delta: '2', deltaDir: 'down' },
])}

${tabs('risk', [{ id: 'aml', label: 'AML & KYC', n: 5 }, { id: 'permits', label: 'Licences & permits', n: 23 }, { id: 'housing', label: 'Housing rules', n: 4 }, { id: 'complaints', label: 'Complaints', n: 9 }, { id: 'data', label: 'Data requests', n: 4 }, { id: 'reports', label: 'Reporting' }], 'aml')}

${panel('risk', 'aml', `
  <div class="split">
  <div class="stack">
    ${card({ title: 'Alerts for the Compliance Officer', headEnd: `<span class="inline small muted">${avatar('Hana Suzuki', { size: 'xs', tone: 'c6' })} Hana Suzuki</span>`, flush: true, body: list([
      alert({ icon: 'user-round-cog', tone: 'danger', sev: 'High', title: 'Possible politically-exposed person', sub: 'New landlord applicant · name and date of birth similarity 87% against screening list. Onboarding paused.', due: 'Due today', dueTone: 'danger' }),
      alert({ icon: 'git-compare-arrows', tone: 'danger', sev: 'High', title: 'Rent paid by an unrelated third party', sub: 'AED 46,000 for Bay Square 6 arrived from a company account not linked to the tenant or a guarantor. Payout to landlord held.', due: 'Due today', dueTone: 'danger' }),
      alert({ icon: 'banknote', tone: 'warn', sev: 'Medium', title: 'Cash above our internal threshold', sub: 'Landlord reports receiving AED 62,000 in cash outside the platform (policy threshold AED 55,000). Source-of-funds questions sent.', due: 'Thu 26 Nov' }),
      alert({ icon: 'refresh-cw', tone: 'warn', sev: 'Medium', title: 'Screening re-hit after list update', sub: 'Existing contractor director matched a newly added entry — likely a false positive (different nationality).', due: 'Fri 27 Nov' }),
      alert({ icon: 'undo-2', tone: '', sev: 'Low', title: 'Deposit refunds redirected', sub: 'Six deposits refunded to an account different from the paying account in 30 days, across unrelated tenancies.', due: 'Mon 30 Nov' }),
    ]) })}
    ${card({ title: 'Verification pipeline', body: `${hbar('Identity matched with UAE Pass', '7,330 of 7,330', 100, 'ok')}${hbar('Landlord ownership verified against title deed', '1,882 of 1,920', 98, 'ok')}${hbar('Company landlords — beneficial owners identified', '61 of 64', 95, 'warn')}${hbar('Contractor trade licence and insurance valid', '183 of 186', 98, 'ok')}
      <p class="small muted mt-3">Nothing can be advertised, signed or paid out on an unverified account.</p>` })}
  </div>
  <aside class="stack">
    ${guard({ title: 'Controls', checks: [
      { state: 'ok', title: 'Owner must match the title deed', sub: 'Or hold a valid notarised power of attorney.', rule: rule('DXB-003', 'Ownership') },
      { state: 'ok', title: 'Screening on sign-up and nightly', sub: 'Sanctions and PEP lists refreshed every 24 hours.' },
      { state: 'ok', title: 'Payer must be a party', sub: 'Rent from anyone but the tenant, guarantor or employer is held for review.' },
      { state: 'info', title: 'Decisions belong to the MLRO', sub: 'Admins see that an alert exists, not the customer’s documents.' },
    ] })}
    ${card({ title: 'This quarter', body: kv([['Alerts raised', '61'], ['Closed as false positive', '49'], ['Escalated internally', '11'], ['Reports filed with the authorities', '1'], ['Median time to decision', '1.3 days']]) })}
  </aside></div>`, true)}

${panel('risk', 'permits', `
  <div class="grid lg2">
    ${card({ title: 'Company licences', flush: true, body: list([
      { icon: 'building', tone: 'ok', title: 'Brokerage trade licence', sub: 'DET Licence 1184220 · renews 14 Jul 2027', endBadge: badge('Valid', 'ok') },
      { icon: 'id-card', tone: 'ok', title: 'RERA office registration', sub: 'ORN 31877 · renews 14 Jul 2027', endBadge: badge('Valid', 'ok') },
      { icon: 'shield-check', tone: 'ok', title: 'Professional indemnity insurance', sub: 'AED 10M cover · renews 1 Mar 2027', endBadge: badge('Valid', 'ok') },
    ]) })}
    ${card({ title: 'Broker cards · 14 managers', flush: true, body: list([
      { icon: 'id-card', tone: 'warn', title: '2 cards expire within 30 days', sub: 'Renewal training booked for 2 Dec', endBadge: badge('Action', 'warn'), toast: 'Reminder sent to both managers (demo)' },
      { icon: 'id-card', tone: 'ok', title: '12 cards valid for 90+ days', sub: 'A manager with an expired card is locked out of listing verification automatically' },
    ]) })}
    ${card({ title: 'Advertising permits (Trakheesi)', headEnd: rule('DXB-002', 'Permit'), flush: true, body: `<div class="card-body" style="padding-bottom:6px"><div class="grid g2 sm4">${[['312', 'active'], ['23', 'expire ≤ 7 days'], ['4', 'adverts paused'], ['0', 'live without permit']].map(([a, b]) => `<div><b class="display" style="font-size:22px">${a}</b><div class="small muted">${b}</div></div>`).join('')}</div></div>` + list([
        { icon: 'pause', tone: 'danger', title: 'Paused: 4 listings with an expired permit', sub: 'JVC ×2, Al Barsha, Dubai Silicon Oasis · landlords and managers notified', toast: 'Opened in the manager queue (demo)', chev: true },
        { icon: 'clock', tone: 'warn', title: 'Expiring soon: 23 listings', sub: 'Renewal is one tap for the landlord if Form A is still valid', toast: 'Reminder sent to 23 landlords (demo)', chev: true },
      ]) })}
    ${card({ title: 'Contractor credentials', flush: true, body: list([
      { icon: 'ban', tone: 'danger', title: '3 companies suspended', sub: 'Trade licence expired ×2 · insurance lapsed ×1 · open jobs reassigned', endBadge: badge('Suspended', 'danger') },
      { icon: 'clock', tone: 'warn', title: '7 documents expire within 30 days', sub: 'Automatic reminders at 30, 14 and 3 days' },
    ]) })}
  </div>`)}

${panel('risk', 'housing', `
  <div class="split">
  <div class="stack">
    ${card({ title: 'Shared housing — detected and stopped', headEnd: rule('DXB-S04', 'Law 4/2026'), flush: true, body: list([
      { icon: 'ban', tone: 'danger', title: 'Listing draft blocked: “bed space available”', sub: 'International City · description analysed at draft stage. Landlord shown the permit requirement; no permit uploaded.', endBadge: badge('Blocked', 'danger'), endSub: '21 Nov' },
      { icon: 'search', tone: 'warn', title: 'Room advertised elsewhere in a platform property', sub: 'A classifieds advert matches a 2-bed in Al Barsha let to a single tenant. Manager has opened a case with tenant and landlord.', endBadge: badge('Investigating', 'warn'), endSub: '19 Nov' },
      { icon: 'users', tone: 'warn', title: 'Occupancy above the declared household', sub: 'Building management reported 7 people in a 1-bed, Deira. Inspection booked with 24 hours’ notice.', endBadge: badge('Inspection', 'warn'), endSub: '17 Nov' },
    ]) })}
    ${card({ title: 'Occupant registration', headEnd: rule('DXB-OCC', 'Co-occupants'), body: `<div class="between small mb-2"><span>Tenancies with occupants confirmed in the last 6 months</span><b class="num">4,648 of 4,860</b></div>${bar(96, 'ok')}<p class="small muted mt-3">212 tenants have been reminded. Confirmation is a warning, not a block — we never restrict a tenant’s use of their home over paperwork.</p>` })}
    ${card({ title: 'Service cut-off and lock-out reports', headEnd: rule('DXB-034', 'Art. 34'), flush: true, body: list([
      { icon: 'zap', tone: 'ok', title: '1 report this month — resolved in 41 minutes', sub: 'Landlord had asked building management to deactivate an access card over a late cheque. Card restored; landlord given a formal warning.', endBadge: badge('Closed', 'ok'), endSub: '12 Nov' },
    ]) })}
  </div>
  <aside class="stack">${callout({ tone: 'brand', title: 'Why this sits with risk', body: 'Fines under the 2026 shared-housing law can reach AED 1,000,000 and attach to whoever arranged the letting. Whole-unit listings only, unless a verified permit is on file.' })}${card({ title: 'Other rule breaches prevented · 30 d', body: `${hbar('Rent rise above the cap', '142', 100, 'danger')}${hbar('Deposit above the cap', '97', 68, 'danger')}${hbar('Eviction notice with an invalid ground', '11', 8, 'danger')}${hbar('Re-letting inside 24 months of own-use recovery', '6', 5, 'danger')}` })}</aside></div>`)}

${panel('risk', 'complaints', `
  <div class="card">${table({ cols: [{ label: 'Complaint' }, { label: 'From' }, { label: 'About' }, { label: 'Age', r: true }, { label: 'Owner' }, { label: 'Status', r: true }], rows: [
    ['<b>CMP-0412</b><div class="small muted">Deposit deduction disputed after manager decision</div>', 'Tenant', 'Decision quality', '12 days', 'Sami Khoury', badge('Escalated', 'danger')],
    ['<b>CMP-0431</b><div class="small muted">Contractor arrived 3 hours late, twice</div>', 'Tenant', 'Contractor', '6 days', 'Layla Haddad', badge('Investigating', 'warn')],
    ['<b>CMP-0436</b><div class="small muted">Charged List.me twice for one listing</div>', 'Landlord', 'Billing', '4 days', 'Priya Nair', badge('Refund issued', 'ok')],
    ['<b>CMP-0440</b><div class="small muted">Viewing cancelled without notice</div>', 'Applicant', 'Field service', '2 days', 'Layla Haddad', badge('Investigating', 'warn')],
    ['<b>CMP-0444</b><div class="small muted">Wants Arabic contract summary by email</div>', 'Landlord', 'Accessibility', '1 day', 'Omar Aziz', badge('In progress', 'info')],
  ] })}</div>
  ${callout({ tone: 'neutral', title: 'How complaints are handled', body: 'Acknowledged in 1 working day, answered in 10. Anyone unhappy with a tenancy decision can still go to the Rental Disputes Center; we export the case file for them.', rules: [rule('DXB-RDC', 'Disputes')] })}`)}

${panel('risk', 'data', `
  <div class="grid lg2">
    ${card({ title: 'Personal-data requests (PDPL)', flush: true, body: list([
      { icon: 'download', tone: 'info', title: 'Access request — former tenant', sub: 'Export prepared; identity re-checked before release', endBadge: badge('Due 3 Dec', 'info') },
      { icon: 'download', tone: 'info', title: 'Access request — landlord', sub: 'Includes messages and audit entries about the account', endBadge: badge('Due 8 Dec', 'info') },
      { icon: 'pencil', tone: 'ok', title: 'Correction — name spelling on contract', sub: 'Corrected and Ejari amended', endBadge: badge('Done', 'ok') },
      { icon: 'trash-2', tone: 'warn', title: 'Erasure request — applicant who did not proceed', sub: 'Application data deleted; anonymised statistics kept', endBadge: badge('Due 30 Nov', 'warn') },
    ]) })}
    ${card({ title: 'What we keep, and for how long', body: kv([['Tenancy contract, Ejari, ledger', 'Tenancy + 7 years'], ['Identity documents', 'Tenancy + 5 years'], ['Unsuccessful applications', '90 days'], ['Messages', 'Tenancy + 2 years'], ['Condition-report photos', 'Tenancy + 2 years'], ['Audit log', '10 years']]) + `<p class="small muted mt-3">Illustrative retention schedule for the demo. <a class="link" href="settings.html">Edit in settings</a></p>` })}
  </div>`)}

${panel('risk', 'reports', `
  <div class="card">${list([
    { icon: 'file-text', tone: 'brand', title: 'Monthly compliance report — October 2026', sub: 'To the board · KYC, alerts, permits, complaints, client money', endBadge: badge('Sent 5 Nov', 'ok'), toast: 'Report downloaded (demo)' },
    { icon: 'file-text', tone: 'brand', title: 'Client-money reconciliation statement — October', sub: 'Signed by Finance Officer and Compliance Officer', endBadge: badge('Signed', 'ok'), toast: 'Statement downloaded (demo)' },
    { icon: 'file-text', tone: 'warn', title: 'Suspicious activity report — Q4', sub: '1 filed by the MLRO · contents restricted', endBadge: badge('Restricted', 'warn') },
    { icon: 'file-text', title: 'Rental Disputes Center case files', sub: '7 exported this quarter for landlords and tenants', endBadge: badge('7'), toast: 'Register downloaded (demo)' },
    { icon: 'calendar-clock', tone: 'info', title: 'External client-money audit', sub: 'Fieldwork booked 11–15 Jan 2027 · auditor role will be enabled for 5 days', endBadge: badge('Scheduled', 'info') },
  ])}</div>`)}
`,
  sheets: () => sheet('sheet-alert', 'Alert details',
    `${callout({ tone: 'warn', icon: 'lock', title: 'Restricted to the Compliance Officer', body: 'As Super Admin you can see that this alert exists, its severity and its deadline. Customer documents and the screening result are visible only to the MLRO.' })}
     ${kv([['Reference', 'AML-2026-0418'], ['Raised', 'Mon 23 Nov, 14:06'], ['Assigned to', 'Hana Suzuki'], ['Deadline', 'Tue 24 Nov, 17:00'], ['Account status', 'Onboarding paused']])}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Message the MLRO', { variant: 'primary', toast: 'Message sent to Hana Suzuki (demo)' })),
};

/* ---------- Audit log ---------- */
const ev = (time, who, role, action, entity, change, tone = '') => [`<b>${action}</b><div class="small muted">${time}</div>`, `<span class="inline">${avatar(who, { size: 'xs' })} ${who}</span>`, badge(role, tone), entity, change, btn('', { size: 'sm', icon: 'ellipsis', cls: 'icon-only', sheet: 'sheet-event', attrs: { 'aria-label': 'Details' } })];
const audit = {
  slug: 'audit', nav: 'audit', title: 'Audit log', sub: 'Append-only',
  body: () => `
${pageHead({ eyebrow: 'Governance', title: 'Audit log', sub: 'Every change to a rule, price, permission, payment or tenancy — who did it, when, and what it was before. Entries cannot be edited or deleted, by anyone.', actions: btn('Verify integrity', { icon: 'shield-check', size: 'sm', toast: 'Hash chain verified — 2,418,306 entries intact (demo)' }) + btn('Export', { icon: 'download', size: 'sm', toast: 'Audit extract exported (demo)' }) })}

<div class="grid g2 sm4">${[['2.42M', 'entries since launch'], ['18,640', 'in the last 24 hours'], ['10 years', 'retention'], ['Intact', 'last integrity check 06:00']].map(([a, b]) => `<div class="card pad"><b class="display" style="font-size:22px">${a}</b><div class="small muted">${b}</div></div>`).join('')}</div>

<div class="form-grid c2"><div class="input-group"><span class="affix">${icon('search', 16)}</span><input class="input" placeholder="Search person, entity or reference" aria-label="Search audit log"></div><div class="input-group"><span class="affix">${icon('calendar-clock', 16)}</span><input class="input" value="Last 7 days" aria-label="Date range" readonly></div></div>
${chips(['All', 'Rulesets', 'Prices', 'Access', 'Client money', 'Tenancies', 'Impersonation', 'Integrations'])}

<div class="card">${table({ cols: [{ label: 'Event' }, { label: 'Who' }, { label: 'Role' }, { label: 'Entity' }, { label: 'Before → after' }, { label: '', r: true }], rows: [
  ev('Today, 08:22', 'Layla Haddad', 'Manager', 'Deposit dispute decided', 'Springs 4, Villa 18', 'AED 9,500 held → 1,150 landlord · 8,350 tenant', 'info'),
  ev('Today, 08:14', 'System', 'Automation', 'Integration marked degraded', 'Al Etihad Credit Bureau', 'Operational → Degraded'),
  ev('Mon 23 Nov, 16:18', 'Omar Aziz', 'Support', 'Read-only session opened', 'Tenant account', 'Reason: payment query · 6 min', 'warn'),
  ev('Mon 23 Nov, 11:40', 'Sami Khoury', 'Super Admin', 'Promo code created', 'RENEW2027', '— → free renewal pack', 'violet'),
  ev('Sun 22 Nov, 20:31', 'System', 'Automation', 'Deposit received into client account', 'DEP-2611-0498', '— → AED 6,750 held'),
  ev('Sun 22 Nov, 09:05', 'Sami Khoury', 'Super Admin', 'Role granted', 'Priya Nair', 'Support Agent → Finance Officer', 'violet'),
  ev('Sat 21 Nov, 19:20', 'Fatima Al Hashimi', 'Landlord', 'Repair approved', 'MR-2291', 'Awaiting approval → approved (limit AED 600)', 'brand'),
  ev('Thu 19 Nov, 15:02', 'Hana Suzuki', 'Compliance', 'Ruleset approval recorded', 'Draft 2027.1', '1 of 3 → 2 of 3', 'brand'),
  ev('Wed 18 Nov, 16:10', 'Fatima Al Hashimi', 'Landlord', 'Renewal offer served', 'Marina Gate 1 · 2304', 'AED 105,000 → 110,000 (cap 110,250)', 'brand'),
  ev('Wed 18 Nov, 16:09', 'System', 'Rule engine', 'Rent increase checked', 'DXB-009 · DXB-014', 'Allowed · 102 days before expiry'),
  ev('Tue 17 Nov, 10:26', 'Reem Al Marzooqi', 'Legal counsel', 'Ruleset approval recorded', 'Draft 2027.1', '0 of 3 → 1 of 3', 'accent'),
  ev('Mon 9 Nov, 11:02', 'Layla Haddad', 'Manager', '30-day payment notice sent to notary', 'Zahra Townhouse 114', 'Reminder stage → notice served', 'info'),
] })}</div>
<div class="between small muted"><span>Showing 12 of 131,208 entries in the last 7 days</span>${btn('Load more', { size: 'sm', toast: 'Loaded 50 more (demo)' })}</div>

${callout({ tone: 'brand', icon: 'link', title: 'Tamper-evident by design', body: 'Each entry stores the hash of the one before it. Staff, admins and engineers have no delete or edit permission; a regulator or auditor can be given time-boxed read access.' })}`,
  sheets: () => sheet('sheet-event', 'Event detail',
    `${kv([['Event', 'Renewal offer served'], ['When', 'Wed 18 Nov 2026, 16:10:42 GST'], ['Actor', 'Fatima Al Hashimi (Landlord)'], ['Signed in with', 'UAE Pass · iPhone · Dubai'], ['Entity', 'Tenancy TN-2026-0301-4417'], ['Ruleset in force', 'Dubai 2026.3']])}
     <pre class="codeblock">{
  "event": "renewal.offer.served",
  "before": { "annual_rent": 105000 },
  "after":  { "annual_rent": 110000 },
  "checks": [
    { "rule": "DXB-014", "result": "pass",
      "days_before_expiry": 102 },
    { "rule": "DXB-009", "result": "pass",
      "index_rent": 128000, "max": 110250 }
  ],
  "prev_hash": "9f2c…a71e",
  "hash": "4be0…c3d9"
}</pre>`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Copy reference', { variant: 'primary', icon: 'copy', toast: 'Reference copied (demo)' })),
};

module.exports = [risk, audit];
