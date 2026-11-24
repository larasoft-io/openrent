const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, stats, tabs, panel, sheet, table, timeline, field, choice, toggle, avatar, pageHead, sectionHead, chips, seg, logo } = ui;
const { sdot, ticks } = require('./_h');

/* ---------- Integrations ---------- */
const integ = (o) => `<div class="card pad stack stack-md"${o.state === 'warn' ? ' style="border-color:rgba(154,100,8,.4)"' : ''}>
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone || 'violet'}">${icon(o.icon, 20)}</span><div><b class="strong">${o.name}</b><div class="small muted">${o.what}</div></div></div>${o.state === 'warn' ? badge('Degraded', 'warn', { dot: true }) : badge('Operational', 'ok', { dot: true })}</div>
  <div>${ticks(o.bad)}<div class="between micro muted mt-1"><span>30 days ago</span><span>${o.up}% uptime</span><span>Today</span></div></div>
  ${kv([['Last sync', o.sync], [o.k || 'Calls today', o.v]])}
  ${o.state === 'warn' ? btn('View incident', { size: 'sm', block: true, sheet: 'sheet-incident', icon: 'activity' }) : ''}</div>`;

const integrations = {
  slug: 'integrations', nav: 'integrations', title: 'Integrations', sub: '11 healthy · 1 degraded',
  body: () => `
${pageHead({ eyebrow: 'Platform', title: 'Integrations', sub: 'The government, banking and messaging services the tenancy journey depends on. When one slows down, the product falls back to a manual queue instead of blocking people.', actions: btn('Status page', { icon: 'external-link', size: 'sm', toast: 'Public status page (demo)' }) + btn('API keys', { icon: 'key', size: 'sm', toast: 'Key management (demo)' }) })}

${stats([
  { label: 'Connected', icon: 'plug', value: '12', sub: '11 healthy' },
  { label: 'Degraded', icon: 'triangle-alert', value: '1', sub: 'credit bureau · since 08:14' },
  { label: 'Uptime · 30 days', icon: 'activity', value: '99.94', unit: '%' },
  { label: 'Calls today', icon: 'server', value: '184k', sub: 'p95 latency 410 ms' },
])}

${callout({ tone: 'warn', title: 'Credit checks are slow this morning', body: 'Responses from the credit bureau are taking over 20 seconds. 17 tenant applications have moved to manual referencing so no letting is held up.', actions: btn('View incident', { size: 'sm', sheet: 'sheet-incident' }) })}

${sectionHead('Government and registration')}
<div class="grid sm2 lg3">
  ${integ({ icon: 'file-badge', tone: 'brand', name: 'Ejari · Dubai REST', what: 'Register, renew and cancel tenancy contracts; occupants', up: '99.97', sync: '2 min ago', k: 'Registrations today', v: '14', bad: { 11: 'w' } })}
  ${integ({ icon: 'megaphone', tone: 'brand', name: 'Trakheesi permits', what: 'Advertising permits and QR codes for listings', up: '99.91', sync: '6 min ago', k: 'Permits issued today', v: '9', bad: { 4: 'w', 19: 'w' } })}
  ${integ({ icon: 'chart-line', tone: 'brand', name: 'Smart Rental Index', what: 'Building-level index rent for the rent-increase cap', up: '100', sync: 'Today, 05:30', k: 'Units covered', v: '98.6%' })}
  ${integ({ icon: 'fingerprint', tone: 'brand', name: 'UAE Pass', what: 'Sign-in, identity match and digital signatures', up: '99.99', sync: 'Live', v: '21,406' })}
  ${integ({ icon: 'zap', tone: 'brand', name: 'DEWA', what: 'Move-in and move-out requests, final bills', up: '99.82', sync: '18 min ago', k: 'Move-ins today', v: '11', bad: { 8: 'w', 9: 'd', 23: 'w' } })}
  ${integ({ icon: 'stamp', tone: 'brand', name: 'Notary e-services', what: 'Notarised 30-day and 12-month legal notices', up: '99.90', sync: '1 h ago', k: 'Notices this week', v: '8', bad: { 15: 'w' } })}
</div>

${sectionHead('Money and verification')}
<div class="grid sm2 lg3">
  ${integ({ icon: 'gauge', tone: 'warn', name: 'Al Etihad Credit Bureau', what: 'Tenant credit reports and bounced-cheque history', up: '99.41', sync: '08:14 (slow)', k: 'Queued checks', v: '17', state: 'warn', bad: { 21: 'w', 28: 'w', 29: 'd' } })}
  ${integ({ icon: 'landmark', tone: 'info', name: 'Direct debit · UAEDDS', what: 'Mandates and monthly rent collection through partner banks', up: '99.98', sync: '4 min ago', k: 'Collections due 1 Dec', v: '2,950' })}
  ${integ({ icon: 'credit-card', tone: 'info', name: 'Card payments', what: 'Card rent payments, fees and refunds', up: '99.99', sync: 'Live', v: '1,832' })}
  ${integ({ icon: 'scan-search', tone: 'info', name: 'Sanctions & PEP screening', what: 'Nightly re-screening of every customer', up: '100', sync: 'Today, 02:00', k: 'Screened last night', v: '7,557' })}
</div>

${sectionHead('Reach')}
<div class="grid sm2 lg3">
  ${integ({ icon: 'message-circle', tone: 'accent', name: 'WhatsApp, SMS and email', what: 'Notifications in English and Arabic', up: '99.95', sync: 'Live', k: 'Messages today', v: '12,940', bad: { 2: 'w' } })}
  ${integ({ icon: 'share-2', tone: 'accent', name: 'Property portals', what: 'Listing syndication with permit number and QR', up: '99.88', sync: '11 min ago', k: 'Listings syndicated', v: '312', bad: { 6: 'w', 26: 'w' } })}
</div>

<div class="split">
  ${card({ title: 'What happens when something is down', flush: true, body: list([
    { icon: 'file-badge', tone: 'brand', title: 'Ejari unavailable', sub: 'Contracts can still be signed; registration queues and the Ejari desk is alerted. Rent is not released until the certificate arrives.', extra: `<div class="mt-2">${rule('DXB-001', 'Ejari')}</div>` },
    { icon: 'chart-line', tone: 'brand', title: 'No index data for a unit', sub: 'The rent-increase check goes to a manager with two-person approval — never “allow by default”.', extra: `<div class="mt-2">${rule('DXB-009', 'Rent cap')}</div>` },
    { icon: 'megaphone', tone: 'brand', title: 'Permit service unavailable', sub: 'Listings stay in “ready” and go live automatically once a permit is issued.', extra: `<div class="mt-2">${rule('DXB-002', 'Advertising permit')}</div>` },
    { icon: 'landmark', tone: 'info', title: 'Direct debit file rejected', sub: 'Tenants are told, nothing is marked late, and the file is re-presented the next banking day.' },
  ]) })}
  <aside class="stack">
    ${card({ title: 'Webhooks and API', body: kv([['Partner API clients', '9'], ['Webhook deliveries today', '48,210'], ['Failed and retried', '36'], ['Oldest unrotated key', '61 days']]) + `<div class="mt-3">${btn('Rotate keys', { size: 'sm', block: true, toast: 'Key rotation scheduled (demo)' })}</div>` })}
    ${callout({ tone: 'neutral', title: 'About this page', body: 'Service names show the connections the product is designed around. This is a mock-up: nothing here is a live connection.' })}
  </aside>
</div>`,
  sheets: () => sheet('sheet-incident', 'Credit bureau — degraded',
    `${kv([['Started', 'Today, 08:14'], ['Impact', 'Credit checks > 20 s or timing out'], ['Applications affected', '17 · moved to manual referencing'], ['Owner', 'Platform on-call']])}
     ${timeline([
       { state: 'now', icon: 'activity', title: 'Monitoring — responses improving', when: '10:40' },
       { state: 'done', title: 'Fallback switched on: manual referencing queue', body: 'Managers verify income and rental history by hand; credit report added when available.', when: '08:31' },
       { state: 'warn', icon: 'triangle-alert', title: 'Latency alarm', when: '08:14' },
     ])}`,
    btn('Close', { attrs: { 'data-close': true } }) + btn('Notify managers', { variant: 'primary', toast: 'Update posted to the manager channel (demo)' })),
};

/* ---------- Templates ---------- */
const v = t => `<span class="var-chip">{{${t}}}</span>`;
const tplRow = (ic, tone, title, sub, ch, edited) => ({ icon: ic, tone, title, sub, extra: `<div class="cluster mt-2">${ch.map(c => badge(c, 'outline')).join('')}${badge('EN · AR', 'brand', { icon: 'languages' })}</div>`, endSub: edited, sheet: 'sheet-template', chev: true });

const templates = {
  slug: 'templates', nav: 'templates', title: 'Templates', sub: 'English · العربية',
  body: () => `
${pageHead({ eyebrow: 'Platform', title: 'Templates', sub: 'Every message, notice and clause the platform sends — in English and Arabic. Legal wording is locked to the ruleset; everything else can be edited here.', actions: btn('New template', { icon: 'plus', size: 'sm', variant: 'primary', toast: 'Template builder (demo)' }) })}

${tabs('tpl', [{ id: 'notif', label: 'Notifications', n: 64 }, { id: 'docs', label: 'Documents', n: 18 }, { id: 'clauses', label: 'Clause library', n: 31 }], 'notif')}

${panel('tpl', 'notif', `
  <div class="split">
  <div class="stack">
    ${chips(['All', 'Tenants', 'Landlords', 'Contractors', 'Legal', 'Payments', 'Repairs'])}
    <div class="card">${list([
      tplRow('refresh-cw', 'accent', 'Renewal offer received', 'To tenant when a landlord serves a renewal offer', ['Push', 'Email', 'WhatsApp'], '23 Jun'),
      tplRow('hourglass', 'warn', '90-day window closing', 'To both parties 14 and 3 days before the cut-off', ['Push', 'Email'], '2 Jan 2025'),
      tplRow('banknote', 'ok', 'Rent collected', 'Receipt to tenant, remittance advice to landlord', ['Push', 'Email'], '11 Mar'),
      tplRow('circle-alert', 'danger', 'Direct debit failed', 'To tenant the same day; landlord only after the retry fails', ['Push', 'SMS', 'WhatsApp'], '4 Sep'),
      tplRow('truck', 'info', 'Contractor on the way', 'To tenant with arrival time and door code', ['Push', 'WhatsApp'], '19 May'),
      tplRow('megaphone', 'violet', 'Your protections were updated', 'To tenants and landlords when a ruleset goes live', ['Push', 'Email'], '26 Aug'),
      tplRow('lock-keyhole', 'brand', 'Deposit released', 'To tenant with amount, date and any evidenced deduction', ['Push', 'Email'], '2 Feb'),
    ])}</div>
  </div>
  <aside class="stack sticky-side">
    ${card({ title: 'Preview · Renewal offer received', body: `<div class="tpl" style="grid-template-columns:minmax(0,1fr)"><div><b class="strong">Your landlord has sent a renewal offer</b><br>Hi ${v('tenant.first_name')}, ${v('landlord.first_name')} has offered ${v('offer.rent')} a year from ${v('offer.start')}. We checked it against the Smart Rental Index: the most your rent could legally rise to is ${v('rule.max_rent')}. Reply by ${v('offer.reply_by')}.</div>
      <div class="ar"><b>أرسل المؤجر عرضاً لتجديد عقد الإيجار</b><br>مرحباً ${v('tenant.first_name')}، عرض ${v('landlord.first_name')} إيجاراً سنوياً قدره ${v('offer.rent')} اعتباراً من ${v('offer.start')}. تحققنا من العرض وفق مؤشر الإيجارات الذكي: الحد الأقصى القانوني للإيجار هو ${v('rule.max_rent')}. يُرجى الرد قبل ${v('offer.reply_by')}.</div></div>
      <div class="cluster mt-3">${rule('DXB-009', 'Rent cap')}${rule('DXB-014', '90-day notice')}</div>
      <div class="btn-row mt-3">${btn('Send test', { size: 'sm', toast: 'Test sent to sami@openrent.me (demo)' })}${btn('Edit', { size: 'sm', variant: 'primary', sheet: 'sheet-template' })}</div>` })}
    ${callout({ tone: 'neutral', icon: 'languages', title: 'Two languages, always', body: 'A template cannot be published until both the English and Arabic versions are complete and reviewed by a native speaker.' })}
  </aside></div>`, true)}

${panel('tpl', 'docs', `
  <div class="card">${table({ cols: [{ label: 'Document' }, { label: 'Used for' }, { label: 'Wording' }, { label: 'Linked rules' }, { label: 'Version', r: true }], rows: [
    ['<b>Unified tenancy contract</b><div class="small muted">Official bilingual form</div>', 'Every new tenancy', badge('Fixed by regulator', 'brand', { icon: 'lock' }), rule('DXB-001', 'Ejari'), 'v2026.3'],
    ['<b>Renewal addendum</b>', 'Changed rent or terms at renewal', badge('Locked to ruleset', 'brand', { icon: 'lock' }), rule('DXB-009', 'Rent cap'), 'v2026.3'],
    ['<b>Marketing agreement (Form A)</b>', 'Owner authorises advertising', badge('Fixed by regulator', 'brand', { icon: 'lock' }), rule('DXB-002', 'Permit'), 'v2026.1'],
    ['<b>30-day payment notice</b>', 'Unpaid rent, served via notary', badge('Locked · legal counsel', 'brand', { icon: 'lock' }), rule('DXB-025A', '30 days'), 'v2026.1'],
    ['<b>12-month notice to vacate</b>', 'Own use, sale, demolition or major works', badge('Locked · legal counsel', 'brand', { icon: 'lock' }), rule('DXB-025B', '12 months'), 'v2026.1'],
    ['<b>Sublet consent</b>', 'Whole-unit sublet with landlord’s agreement', badge('Locked to ruleset', 'brand', { icon: 'lock' }), rule('DXB-S04', 'Shared housing'), 'v2026.3'],
    ['<b>Deposit certificate</b>', 'Issued when a deposit is safeguarded', badge('Editable', 'outline'), rule('OR-101', 'Deposits'), 'v2026.1'],
    ['<b>Condition report</b>', 'Move-in and check-out', badge('Editable', 'outline'), rule('DXB-021', 'Art. 21'), 'v2025.4'],
    ['<b>Rent receipt and statement</b>', 'Every payment', badge('Editable', 'outline'), '—', 'v2025.2'],
  ] })}</div>
  ${callout({ tone: 'brand', icon: 'lock', title: 'Why some wording is locked', body: 'A notice with the wrong ground or period can be thrown out at the Rental Disputes Center. Locked documents can only change through a ruleset draft approved by legal counsel.' })}`)}

${panel('tpl', 'clauses', `
  <div class="grid lg2">
    ${[['door-open', 'Early exit (break clause)', 'OR-102', 'Fair way out', 'Tenant may leave with 60 days’ notice and a payment of up to two months’ rent.', 'Notice ≤ 60 days · payment ≤ 2 months', 'Shorter notice, smaller or no payment'],
       ['wrench', 'Minor repairs', 'OR-103', 'Small repairs', 'Tenant covers minor fixes up to a per-item limit; landlord covers everything else.', 'Limit ≤ AED 500', 'A lower limit, or AED 0'],
       ['lock-keyhole', 'Security deposit', 'OR-101', 'Deposits', 'Deposit held in a safeguarded client account and returned within 14 days of check-out.', '≤ 5% unfurnished · ≤ 10% furnished', 'A smaller deposit'],
       ['trending-up', 'Rent review on renewal', 'DXB-009', 'Rent cap', 'Any increase follows the Smart Rental Index band and 90 days’ notice.', 'Band maximum from Decree 43/2013', 'A fixed rent for 2 or 3 years'],
       ['users', 'Occupancy and subletting', 'DXB-S04', 'Shared housing', 'Whole-unit letting; no rooms or bed spaces; sublet only with written consent.', 'Cannot be removed', 'Named additional occupants'],
       ['paw-print', 'Pets', 'DXB-019', 'Consent', 'Pets allowed with landlord’s consent and subject to building rules.', 'Optional clause', 'Named pet permitted in contract']].map(([ic, t, id, lab, text, floor, better]) => `<div class="card pad stack stack-sm"><div class="between"><div class="inline" style="gap:10px"><span class="row-ico violet">${icon(ic, 20)}</span><b class="strong">${t}</b></div>${rule(id, lab)}</div><p class="small">${text}</p>${kv([['Limit the product enforces', floor], ['Landlords may offer', `<span class="t-accent">${better}</span>`]])}</div>`).join('')}
  </div>
  ${callout({ tone: 'neutral', title: 'How clauses become guardrails', body: 'Each clause has parameters with a limit taken from a rule. In the contract builder a landlord can move a slider towards the tenant’s favour, never past the limit.' })}`)}
`,
  sheets: () => sheet('sheet-template', 'Edit template',
    `${field({ label: 'Subject (English)', value: 'Your landlord has sent a renewal offer' })}
     ${field({ label: 'Body (English)', type: 'textarea', value: 'Hi {{tenant.first_name}}, {{landlord.first_name}} has offered {{offer.rent}} a year from {{offer.start}}…' })}
     <div class="field"><label>الموضوع (العربية)</label><input class="input ar" value="أرسل المؤجر عرضاً لتجديد عقد الإيجار" aria-label="Subject in Arabic"></div>
     <div class="field"><span class="label">Variables</span><div class="cluster">${['tenant.first_name', 'landlord.first_name', 'offer.rent', 'offer.start', 'offer.reply_by', 'rule.max_rent'].map(v).join('')}</div></div>
     <div class="field"><span class="label">Channels</span>${chips(['Push', 'Email', 'WhatsApp', 'SMS'], 0, 'wrap').replace('data-chips', 'data-chips data-multi')}</div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save for review', { variant: 'primary', toast: 'Saved — sent for Arabic review (demo)' })),
};

/* ---------- Settings ---------- */
const flag = (t, s, on, o = {}) => `<div class="row"><div class="row-main"><div class="row-title">${t}${o.badge || ''}</div><div class="row-sub">${s}</div>${o.extra ? `<div class="mt-2">${o.extra}</div>` : ''}</div>${toggle(on, { disabled: o.locked, label: t })}</div>`;
const settings = {
  slug: 'settings', nav: 'settings', title: 'Settings', sub: 'Platform configuration',
  body: ({ data }) => { const c = data.company; return `
${pageHead({ eyebrow: 'Platform', title: 'Settings', sub: 'How the platform behaves day to day. Anything with legal weight lives in rulesets instead, so it is versioned and approved.' })}

<div class="split">
<div class="stack">
  ${card({ title: 'Where we operate', flush: true, body: `<div class="list">
    ${flag('Dubai', 'Ruleset 2026.3 · AED · Ejari registration', true, { locked: true, badge: badge('Live', 'ok') })}
    ${flag('Abu Dhabi', 'Needs an approved ruleset and price book before it can be switched on', false, { locked: true, badge: badge('Draft', 'violet') })}
    ${flag('Sharjah', 'Research phase', false, { locked: true, badge: badge('Planned') })}</div>` })}

  ${card({ title: 'Service standards', body: `<div class="form-grid c2">
    ${field({ label: 'Landlord response before we step in', value: '60', suffix: 'minutes', inputmode: 'numeric' })}
    ${field({ label: 'Emergency response', value: '4', suffix: 'hours', readonly: true, hint: 'Set by the ruleset (OR-104)' })}
    ${field({ label: 'Ejari registration target', value: '2', suffix: 'working days', inputmode: 'numeric' })}
    ${field({ label: 'Deposit return', value: '14', suffix: 'days', readonly: true, hint: 'Set by the ruleset (OR-101)' })}
    ${field({ label: 'Routine repair target', value: '5', suffix: 'working days', inputmode: 'numeric' })}
    ${field({ label: 'Complaint answer', value: '10', suffix: 'working days', inputmode: 'numeric' })}</div>
    <div class="cluster mt-3">${rule('OR-104', 'Emergency')}${rule('OR-101', 'Deposits')}<a class="link small" href="rulesets.html">Change through a ruleset</a></div>` })}

  ${card({ title: 'Feature flags', flush: true, body: `<div class="list">
    ${flag('Flexi Rent payment plans', 'Monthly, quarterly and half-yearly instalments in the contract builder', true, { extra: rule('DXB-PAY', 'Payment terms') })}
    ${flag('Arabic interface', 'Full right-to-left experience for every role', true)}
    ${flag('WhatsApp notifications', 'Opt-in per user', true)}
    ${flag('Room-by-room letting', 'Only with a verified shared-housing permit', false, { locked: true, badge: badge('Locked by ruleset', 'danger'), extra: rule('DXB-S04', 'Shared housing') })}
    ${flag('Rent guarantee', 'Partner insurer · landlords in Dubai Marina, JVC and Business Bay', true, { badge: badge('Beta', 'info') })}
    ${flag('Corporate tenants', 'Employer signs and pays; employee occupies', true, { badge: badge('Beta', 'info') })}
    ${flag('Assisted listing descriptions', 'Drafts a description from photos and facts; landlord must approve', false, { badge: badge('Experiment') })}</div>` })}

  ${card({ title: 'Data retention', headEnd: `<a class="link small" href="risk.html#tab=risk:data">Data requests</a>`, body: `<div class="form-grid c2">
    ${field({ label: 'Tenancy records', type: 'select', options: ['Tenancy + 5 years', 'Tenancy + 7 years', 'Tenancy + 10 years'], value: 'Tenancy + 7 years' })}
    ${field({ label: 'Identity documents', type: 'select', options: ['Tenancy + 2 years', 'Tenancy + 5 years'], value: 'Tenancy + 5 years' })}
    ${field({ label: 'Unsuccessful applications', type: 'select', options: ['30 days', '90 days', '180 days'], value: '90 days' })}
    ${field({ label: 'Data stored in', value: 'United Arab Emirates', readonly: true })}</div>` })}

  ${card({ title: 'Staff security', flush: true, body: `<div class="list">
    ${flag('Company single sign-on', 'Required for every staff account', true, { locked: true })}
    ${flag('Passkey or hardware key', 'Second factor for all staff', true, { locked: true })}
    ${flag('Office and VPN addresses only', 'For Finance, Compliance and Super Admin roles', true)}
    ${flag('Second admin for sensitive changes', 'Prices, roles, suspensions and integrations', true, { locked: true })}</div>
    <div class="card-body"><div class="form-grid c2">${field({ label: 'Staff session timeout', type: 'select', options: ['15 minutes', '30 minutes', '60 minutes'], value: '15 minutes' })}${field({ label: 'Read-only “view as user” limit', type: 'select', options: ['10 minutes', '15 minutes', '30 minutes'], value: '15 minutes' })}</div></div>` })}
</div>

<aside class="stack">
  ${card({ title: 'Brand', body: `<div class="stack stack-md"><div class="card sunk pad center">${logo('lg')}</div>
    <div class="cluster">${[['#0B6B5D', 'Lagoon'], ['#F0653A', 'Sunset'], ['#0F1F1C', 'Ink'], ['#F7F3EC', 'Sand'], ['#B98A34', 'Gold']].map(([c, n]) => `<span class="inline small"><span class="swatch" style="background:${c}"></span>${n}</span>`).join('')}</div>
    ${kv([['Domain', 'openrent.me'], ['Sender', c.email], ['Support line', c.phone], ['Languages', 'English · العربية']])}</div>` })}
  ${card({ title: 'Company details', headEnd: badge('Shown on invoices', 'outline'), body: kv([['Legal name', c.legal], ['Office registration', c.orn], ['Trade licence', c.licence], ['Tax registration', c.vatTrn], ['Address', c.address]]) })}
  ${card({ title: 'Maintenance mode', body: `<p class="small muted">Shows a banner and pauses non-urgent writes. Emergency repairs, payments already scheduled and legal deadlines keep running.</p><div class="mt-3">${btn('Schedule a maintenance window', { block: true, icon: 'calendar-clock', toast: 'Needs a second admin — request sent (demo)' })}</div>` })}
  <div class="sticky-cta">${btn('Discard', { toast: 'Changes discarded (demo)' })}${btn('Save changes', { variant: 'primary', toast: 'Saved — 2 changes need a second admin (demo)' })}</div>
</aside>
</div>`; },
};

module.exports = [integrations, templates, settings];
