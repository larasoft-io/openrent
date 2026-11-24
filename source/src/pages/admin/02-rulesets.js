const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, stats, tabs, panel, sheet, timeline, table, barChart, lineChart, spark, legend, field, choice, toggle, avatar, pageHead, sectionHead, bar, lifecycle, seg } = ui;
const { hbar, tile } = require('./_h');

const KIND = { law: ['Law', 'brand', 'scale'], reg: ['Regulation', 'info', 'landmark'], std: ['Our standard', 'accent', 'plus'] };
const SCOPE = { all: 'All tenancies', new: 'New tenancies', renewal: 'Renewals', listing: 'Listings' };
// enforcement: [type, where in the product, times triggered in 30 days]
const ENF = {
  'DXB-001': ['block', 'Tenancy activation · rent release', 231], 'DXB-002': ['block', 'Listing publish · permit expiry job', 268], 'DXB-003': ['block', 'Listing verification · contract signing', 301],
  'DXB-006': ['default', 'Renewal engine', 64], 'DXB-009': ['block', 'Renewal form · contract builder', 1206], 'DXB-014': ['block', 'Renewal form (locks at T-90)', 402],
  'DXB-016': ['block', 'Contract builder · repair triage', 1911], 'DXB-019': ['warn', 'Tenant alteration requests', 88], 'DXB-020': ['default', 'Deposit ledger', 231],
  'DXB-021': ['warn', 'Check-out deductions (photo required)', 148], 'DXB-024': ['block', 'Sublet consent flow', 19], 'DXB-025A': ['block', 'Arrears workflow · notice generator', 41],
  'DXB-025B': ['block', 'Notice wizard (grounds + 12 months)', 27], 'DXB-026': ['block', 'Listing creation (24-month lock)', 6], 'DXB-027': ['default', 'Ownership transfer', 12],
  'DXB-034': ['block', 'No such action · 1-hour escalation', 1], 'DXB-OCC': ['warn', 'Move-in · household changes', 612], 'DXB-S04': ['block', 'Listing creation · sublet requests', 14],
  'DXB-PAY': ['default', 'Contract builder · payment plans', 231], 'DXB-RDC': ['default', 'Disputes · case-file export', 7], 'OR-101': ['block', 'Deposit field · release timer', 379],
  'OR-102': ['block', 'Contract builder sliders', 231], 'OR-103': ['block', 'Contract builder · job triage', 1911], 'OR-104': ['warn', 'Emergency timer · auto-dispatch', 96], 'OR-105': ['block', 'Fee table (no % tenant fees)', 0],
};
const ENF_BADGE = { block: ['Hard block', 'danger', 'ban'], warn: ['Warning', 'warn', 'triangle-alert'], default: ['Default', 'info', 'circle-dot'] };

const rulesets = {
  slug: 'rulesets', nav: 'rulesets', title: 'Rulesets', sub: 'Legal rules engine',
  body: ({ data }) => {
    const n = k => data.rules.filter(r => r.kind === k).length;
    const ruleRows = data.rules.map(r => {
      const e = ENF[r.id], eb = ENF_BADGE[e[0]], k = KIND[r.kind];
      const href = r.id === 'DXB-009' ? 'rule.html' : `../rulebook.html#${r.id}`;
      return `<tr data-tags="${r.kind} ${e[0]}"><td class="lead-cell" data-label="Rule"><a href="${href}" class="cell"><span class="badge solid">${r.id}</span><b>${r.title}</b></a></td><td data-label="Kind">${badge(k[0], k[1], { icon: k[2] })}</td><td data-label="Applies to">${badge(SCOPE[r.scope], 'outline')}</td><td data-label="Enforcement">${badge(eb[0], eb[1], { icon: eb[2] })}</td><td data-label="Enforced in"><span class="small">${e[1]}</span></td><td class="r" data-label="Triggered · 30 d"><b class="num">${e[2].toLocaleString('en-US')}</b></td></tr>`;
    }).join('');
    return `
${pageHead({ eyebrow: 'Legal rules engine', title: 'Rulesets', sub: 'One versioned source of truth for what Dubai law requires — and what openrent.me adds on top. Every guardrail in every dashboard reads from here. Landlords can offer more than a rule; nobody can offer less.', actions: btn('Rulebook', { icon: 'book-marked', size: 'sm', href: '../rulebook.html' }) + btn('New draft', { icon: 'plus', variant: 'primary', size: 'sm', sheet: 'sheet-draft' }) })}

<div class="split">
<div class="stack">
  <div class="card dark pad stack stack-md">
    <div class="between-top"><div><span class="eyebrow" style="color:#9FB1AB">Live in Dubai</span><h2 class="mt-2" style="font-size:24px">Dubai Residential 2026.3</h2><p class="small muted mt-1">In force since 26 Aug 2026 · last legal review 19 Nov 2026 by counsel</p></div>${badge('Live', 'ok', { dot: true, lg: true })}</div>
    <div class="grid g2 sm4 small">${tile(n('law'), 'rules from law')}${tile(n('reg'), 'regulatory rules')}${tile(n('std'), 'openrent.me standards')}${tile('4,860', 'tenancies covered')}</div>
    <div class="btn-row">${btn('Rent-cap rule in depth', { variant: 'white', size: 'sm', href: 'rule.html' })}${btn('Compare versions', { variant: 'on-dark', size: 'sm', icon: 'git-compare-arrows', toast: 'Version comparison (demo)' })}</div>
  </div>

  <a class="card pad link-card between" href="ruleset.html" style="border-color:rgba(91,75,183,.35);background:var(--violet-soft)">
    <div class="inline" style="gap:12px;align-items:flex-start"><span class="row-ico violet" style="background:#fff">${icon('flask-conical', 20)}</span><div><div class="cluster"><b class="strong">2027.1 draft</b>${badge('Sandbox · illustrative', 'warn')}</div><div class="small muted mt-1">3 changes · 2 of 3 approvals · proposed effective 1 Feb 2027</div></div></div>${icon('chevron-right', 20, 'faint')}
  </a>

  ${tabs('rs', [{ id: 'versions', label: 'Versions' }, { id: 'rules', label: 'Rules', n: data.rules.length }, { id: 'where', label: 'Jurisdictions' }, { id: 'watch', label: 'Legal watch', n: 2 }], 'versions')}

  ${panel('rs', 'versions', `
    <div class="card pad">${timeline([
      { state: 'now', icon: 'flask-conical', title: '2027.1 · Draft (illustrative sandbox scenario)', body: 'Deposit return deadline 14 → 10 days; emergency dispatch limit raised; occupant reminders every 6 months.', when: 'Proposed effective 1 Feb 2027 · awaiting Product sign-off', extra: badge('All tenancies', 'outline') + btn('Open draft', { size: 'sm', href: 'ruleset.html' }) },
      ...data.rulesets.map(r => ({ state: 'done', icon: 'git-commit-horizontal', title: `${r.v} · ${r.title}`, body: r.summary, when: `Effective ${r.date} · ${r.n} rule${r.n > 1 ? 's' : ''} changed`, extra: badge(r.scope, 'outline') + badge(r.state, 'ok', { dot: true }) })),
      { state: 'done', icon: 'flag', title: '2024.1 · Launch ruleset', body: 'Law 26/2007 as amended by Law 33/2008, Decree 43/2013, Decree 26/2013 and the first five openrent.me standards.', when: 'Effective at platform launch', extra: badge('All tenancies', 'outline') },
    ])}</div>
    ${callout({ tone: 'brand', title: 'How versions reach tenancies', body: 'Each change carries its own applicability: every existing tenancy at once, new contracts only, or from the next renewal. A tenancy always records the version it was signed under and the version protecting it today.' })}`, true)}

  ${panel('rs', 'rules', `
    <div class="chips" data-chips data-target="#rules-table">
      <button type="button" class="chip is-active" data-filter="*">All <span class="n">${data.rules.length}</span></button>
      <button type="button" class="chip" data-filter="law">Law <span class="n">${n('law')}</span></button>
      <button type="button" class="chip" data-filter="reg">Regulation <span class="n">${n('reg')}</span></button>
      <button type="button" class="chip" data-filter="std">Our standards <span class="n">${n('std')}</span></button>
      <button type="button" class="chip" data-filter="block">Hard blocks</button>
      <button type="button" class="chip" data-filter="warn">Warnings</button>
    </div>
    <div class="card" id="rules-table"><div class="table-wrap"><table class="table stackable"><thead><tr><th>Rule</th><th>Kind</th><th>Applies to</th><th>Enforcement</th><th>Enforced in</th><th class="r">Triggered · 30 d</th></tr></thead><tbody>${ruleRows}</tbody></table></div></div>
    <div class="grid sm3">
      ${callout({ tone: 'danger', icon: 'ban', title: 'Hard block', body: 'The action cannot be completed. Used where the law leaves no room.' })}
      ${callout({ tone: 'warn', title: 'Warning', body: 'The user can continue after an explanation, and the choice is logged.' })}
      ${callout({ icon: 'circle-dot', title: 'Default', body: 'The product behaves this way unless both parties lawfully agree otherwise.' })}
    </div>`)}

  ${panel('rs', 'where', `
    <div class="grid sm2">
      <div class="card pad stack stack-sm"><div class="between"><span class="row-ico brand">${icon('map-pin', 20)}</span>${badge('Live', 'ok', { dot: true })}</div><b class="strong" style="font-size:16px">Dubai</b><p class="small muted">Mainland and freehold communities. Tenancies registered through Ejari; disputes heard by the Rental Disputes Center.</p>${kv([['Ruleset', '2026.3'], ['Tenancies', '4,860'], ['Rules', String(data.rules.length)]])}</div>
      <div class="card pad stack stack-sm"><div class="between"><span class="row-ico violet">${icon('map-pin', 20)}</span>${badge('Draft · legal review', 'violet')}</div><b class="strong" style="font-size:16px">Abu Dhabi</b><p class="small muted">Separate tenancy law and the Tawtheeq registration system. A dedicated ruleset is being drafted with local counsel — nothing is enforced yet.</p>${kv([['Ruleset', 'AUH 0.4 (draft)'], ['Target', 'H2 2027'], ['Rules mapped', '14 of ~22']])}</div>
      <div class="card pad stack stack-sm"><div class="between"><span class="row-ico">${icon('map-pin', 20)}</span>${badge('Planned')}</div><b class="strong" style="font-size:16px">Sharjah</b><p class="small muted">Tenancy contracts are attested by the municipality. Research phase: mapping the rules and fees before any build.</p>${kv([['Ruleset', '—'], ['Target', 'Not scheduled']])}</div>
      <div class="card pad stack stack-sm"><div class="between"><span class="row-ico">${icon('building', 20)}</span>${badge('Out of scope')}</div><b class="strong" style="font-size:16px">DIFC and other free zones</b><p class="small muted">Zones with their own leasing law and registrar are excluded: listings there are blocked at address entry so the Dubai ruleset is never applied wrongly.</p>${kv([['Listings blocked · 30 d', '9']])}</div>
    </div>
    ${callout({ tone: 'neutral', title: 'One engine, many rulebooks', body: 'A property’s Makani number decides which jurisdiction — and so which ruleset — applies. Rules are never shared across emirates by assumption.' })}`)}

  ${panel('rs', 'watch', `
    ${callout({ tone: 'neutral', icon: 'radar', title: 'Sources monitored weekly by legal counsel', body: 'Items below are demo entries showing how a possible change travels from “spotted” to a draft ruleset.' })}
    <div class="card">${list([
      { icon: 'newspaper', tone: 'warn', title: 'Dubai Municipality — shared-housing permit guidance', badge: badge('Under review', 'warn'), sub: 'Implementation guidance for Law 4/2026. Could adjust what a permit upload must contain.', extra: `<div class="cluster mt-2">${rule('DXB-S04', 'Shared housing')}<span class="small muted">Owner: Legal counsel · due 4 Dec</span></div>` },
      { icon: 'newspaper', tone: 'warn', title: 'RERA — advertising permit display', badge: badge('Under review', 'warn'), sub: 'Clarification on how the permit QR code is shown on third-party portals.', extra: `<div class="cluster mt-2">${rule('DXB-002', 'Advertising permit')}<span class="small muted">Owner: Compliance · due 30 Nov</span></div>` },
      { icon: 'rss', tone: 'ok', title: 'Dubai Land Department — Smart Rental Index', badge: badge('No rule change', 'ok'), sub: 'Data refresh only. Bands in Decree 43/2013 are unchanged.', extra: `<div class="cluster mt-2">${rule('DXB-009', 'Rent cap')}<span class="small muted">Reviewed 19 Nov</span></div>` },
      { icon: 'rss', tone: 'ok', title: 'Rental Disputes Center — fee schedule', badge: badge('No rule change', 'ok'), sub: 'Filing fee remains 3.5% of annual rent, AED 500 minimum, AED 20,000 maximum.', extra: `<div class="cluster mt-2">${rule('DXB-RDC', 'Disputes')}<span class="small muted">Reviewed 12 Nov</span></div>` },
      { icon: 'rss', title: 'Official Gazette — weekly issue', badge: badge('Nothing relevant'), sub: 'No tenancy-related legislation in the latest issue.', extra: `<div class="mt-2 small muted">Reviewed 23 Nov</div>` },
    ])}</div>
    ${btn('Log something you have spotted', { icon: 'plus', block: true, sheet: 'sheet-watch' })}`)}
</div>

<aside class="stack">
  ${card({ title: 'Guardrails at work · 30 days', body: `<div class="between-top mb-3"><div><div class="hero-num" style="font-size:30px">1,284</div><div class="small muted">interventions</div></div>${spark([31, 40, 36, 44, 39, 47, 52, 41, 45, 49, 43, 51], 'violet', 110, 36)}</div>
    ${hbar('Rent increase above the cap', '142 blocked', 100, 'danger')}${hbar('Deposit above 5% / 10%', '97 blocked', 68, 'danger')}${hbar('Change proposed after the 90-day cut-off', '61 blocked', 43, 'danger')}${hbar('Repairs shifted to tenant', '58 blocked', 41, 'danger')}${hbar('Occupants not confirmed', '612 reminders', 100, 'warn')}` })}
  ${guard({ title: 'Who can change a rule', sub: 'Separation of duties', checks: [
    { state: 'ok', title: 'Drafted by Product or Legal', sub: 'Every draft starts from the live version; nothing is edited in place.' },
    { state: 'ok', title: 'Three approvals to publish', sub: 'Legal counsel, Compliance and Product — three different people.' },
    { state: 'ok', title: 'Protections only ratchet up mid-tenancy', sub: 'A change that would weaken an existing tenant’s position can only apply to new contracts.' },
    { state: 'info', title: 'Every version is permanent', sub: 'Rolling back means publishing a new version, never deleting one.' },
  ] })}
  ${card({ title: 'Legal team', flush: true, body: list([
    { lead: avatar('Reem Al Marzooqi', { tone: 'c4' }), title: 'Reem Al Marzooqi', sub: 'External legal counsel · ruleset approver' },
    { lead: avatar('Hana Suzuki', { tone: 'c6' }), title: 'Hana Suzuki', sub: 'Compliance Officer (MLRO)' },
    { lead: avatar('Sami Khoury', { tone: 'c2' }), title: 'Sami Khoury', sub: 'Product approver (you)' },
  ]) })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-draft', 'New draft ruleset',
    `${field({ label: 'Jurisdiction', type: 'select', options: ['Dubai', 'Abu Dhabi (draft only)'], value: 'Dubai' })}
     ${field({ label: 'Start from', type: 'select', options: ['2026.3 (live)', '2027.1 (draft)'], value: '2026.3 (live)' })}
     ${field({ label: 'Working title', placeholder: 'e.g. Advertising permit display' })}
     ${field({ label: 'Why is a change needed?', type: 'textarea', placeholder: 'Link the legal source or the product decision behind it' })}
     ${callout({ tone: 'neutral', body: 'A draft changes nothing for users. It can be simulated against live tenancies before anyone approves it.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Create draft', { variant: 'primary', toast: 'Draft 2027.2 created (demo)' }))
  + sheet('sheet-watch', 'Log a possible legal change',
    `${field({ label: 'Source', type: 'select', options: ['Dubai Land Department', 'RERA', 'Dubai Municipality', 'Rental Disputes Center', 'Official Gazette', 'Other'], value: 'RERA' })}
     ${field({ label: 'What did you see?', type: 'textarea', placeholder: 'Circular number, date, and a one-line summary' })}
     ${field({ label: 'Link or document', placeholder: 'Paste a link' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send to legal counsel', { variant: 'primary', toast: 'Logged for review — counsel notified (demo)' })),
};

/* ---------- Draft ruleset detail ---------- */
const change = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="cluster">${badge(o.id, 'solid')}${badge(o.kind, 'accent', { icon: 'plus' })}${badge(o.type)}</div><span class="small muted nowrap">Change ${o.n} of 3</span></div>
  <h3>${o.title}</h3>
  <div class="diff"><div class="was"><b class="tag">Live · 2026.3</b>${o.was}</div><div class="now"><b class="tag">Draft · 2027.1</b>${o.now}</div></div>
  <div class="field"><span class="label">Applies to</span>${seg('ap' + o.n, [{ id: 'all', label: 'All tenancies' }, { id: 'new', label: 'New only' }, { id: 'ren', label: 'Next renewal' }], o.ap, 'block')}</div>
  <p class="small muted">${o.why}</p></div>`;

const ruleset = {
  slug: 'ruleset', nav: 'rulesets', title: 'Draft 2027.1', sub: 'Illustrative sandbox scenario', back: 'rulesets.html',
  body: () => `
<div class="sandbox-tape">${icon('flask-conical', 20)}<div><b>Illustrative scenario for this demo.</b> Version 2027.1 is a made-up draft that shows how a rule change is prepared, simulated, approved and rolled out. It does not describe real or proposed law — the three changes below are to openrent.me’s own standards.</div></div>

<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top"><div><span class="eyebrow">Dubai Residential · draft</span><h1 class="mt-2">Ruleset 2027.1</h1><p class="muted small mt-1">Based on 2026.3 · created 9 Nov 2026 by Sami Khoury · 3 changes, 22 rules untouched</p></div>${badge('Draft', 'violet', { lg: true })}</div>
    ${lifecycle([{ label: 'Drafted', icon: 'square-pen' }, { label: 'Legal review', icon: 'gavel' }, { label: 'Compliance', icon: 'shield-check' }, { label: 'Product sign-off', icon: 'user-check' }, { label: 'Scheduled', icon: 'calendar-clock' }, { label: 'Live', icon: 'rocket' }], 3)}
  </div>

  ${sectionHead('What changes')}
  ${change({ n: 1, id: 'OR-101', kind: 'Our standard', type: 'Parameter', title: 'Deposits returned faster', ap: 'all',
    was: 'Deposits are returned within <del>14 days</del> of check-out unless a deduction is evidenced.', now: 'Deposits are returned within <ins>10 days</ins> of check-out unless a deduction is evidenced.',
    why: 'Better for tenants and does not alter anything a landlord agreed to pay, so it can protect every existing tenancy from the effective date.' })}
  ${change({ n: 2, id: 'OR-104', kind: 'Our standard', type: 'Parameter', title: 'Higher emergency dispatch limit', ap: 'new',
    was: 'If the landlord has not responded in 60 minutes, an approved contractor is dispatched up to <del>AED 1,500</del>.', now: 'If the landlord has not responded in 60 minutes, an approved contractor is dispatched up to <ins>AED 2,000</ins>.',
    why: 'This raises what a landlord may be charged without approval, so it applies to new contracts only; existing landlords are invited to opt in.' })}
  ${change({ n: 3, id: 'DXB-OCC', kind: 'Process', type: 'Enforcement', title: 'Occupant check every six months', ap: 'all',
    was: 'Tenants are prompted to confirm occupants at move-in and <del>when they tell us the household changed</del>.', now: 'Tenants are prompted to confirm occupants at move-in and <ins>every six months</ins>.',
    why: 'The underlying requirement is unchanged; only our reminder cadence moves. Safe for all tenancies.' })}

  ${card({ title: 'What “applies to” means', flush: true, body: list([
    { icon: 'users', tone: 'brand', title: 'All existing tenancies', sub: 'Takes effect for every active tenancy on the effective date. Use for legal changes that bind everyone, and for protections that only improve a tenant’s position.' },
    { icon: 'file-plus', tone: 'info', title: 'New tenancies only', sub: 'Contracts signed on or after the effective date. Existing tenancies keep the version they signed under — used when a change alters cost or risk that was priced into a contract.' },
    { icon: 'refresh-cw', tone: 'gold', title: 'From next renewal', sub: 'Each tenancy moves across when it renews, so the whole book migrates within twelve months without reopening live contracts.' },
  ]) })}

  ${card({ title: 'Impact simulation', headEnd: badge('Run 23 Nov against live data', 'outline'), body: `
    <div class="grid g2 sm4">${[['4,120', 'tenancies with a deposit held'], ['1,712', 'landlords affected'], ['37', 'open check-outs that would miss 10 days'], ['0', 'contract drafts made non-compliant']].map(([a, b]) => `<div><b class="display" style="font-size:24px">${a}</b><div class="small muted">${b}</div></div>`).join('')}</div>
    <div class="mt-4"><div class="between small mb-2"><b class="strong">Days from check-out to deposit release · last 90 days</b><span class="muted">% of releases</span></div>
    ${barChart({ labels: ['0–3', '4–6', '7–10', '11–14', '15+'], series: [{ tone: 'violet', data: [14, 31, 33, 18, 4] }], height: 150, label: 'Distribution of deposit release time' })}
    ${legend([['Meets a 10-day deadline: 78%', 'violet'], ['Would miss it today: 22%', 'danger']])}</div>
    <div class="mt-4">${callout({ tone: 'warn', title: 'Operations need to move first', body: 'Median release is 8.2 days, but 22% take longer than 10. The delay is mostly waiting for landlords to respond to check-out reports — the draft shortens that response window from 5 days to 3.' })}</div>` })}

  ${card({ title: 'Communication plan', body: `
    ${tabs('comm', [{ id: 'tenants', label: 'Tenants' }, { id: 'landlords', label: 'Landlords' }, { id: 'staff', label: 'Staff' }], 'tenants')}
    ${panel('comm', 'tenants', `<div class="tpl mt-3"><div><b class="strong">Good news about your deposit</b><br>From 1 February 2027 your deposit will be returned within 10 days of check-out, down from 14. You do not need to do anything.</div><div class="ar"><b>خبر سار بخصوص مبلغ التأمين</b><br>اعتباراً من ١ فبراير ٢٠٢٧ سيُعاد مبلغ التأمين خلال ١٠ أيام من تسليم العقار بدلاً من ١٤ يوماً. لا يلزمك اتخاذ أي إجراء.</div></div>
      <div class="list mt-2"><div class="row"><div class="row-main"><div class="row-title">In-app banner and “My rights” update</div><div class="row-sub">On the effective date</div></div>${toggle(true)}</div><div class="row"><div class="row-main"><div class="row-title">Email</div><div class="row-sub">14 days before</div></div>${toggle(true)}</div><div class="row"><div class="row-main"><div class="row-title">WhatsApp</div><div class="row-sub">Only for tenants with a check-out booked</div></div>${toggle(true)}</div></div>`, true)}
    ${panel('comm', 'landlords', `<div class="tpl mt-3"><div><b class="strong">Deposit decisions: 3 days to respond</b><br>From 1 February 2027 deposits are released within 10 days. Please review check-out reports within 3 days so any deduction can be considered.</div><div class="ar"><b>قرارات مبلغ التأمين: ٣ أيام للرد</b><br>اعتباراً من ١ فبراير ٢٠٢٧ يُعاد مبلغ التأمين خلال ١٠ أيام. يُرجى مراجعة تقرير التسليم خلال ٣ أيام للنظر في أي خصم.</div></div>
      <div class="list mt-2"><div class="row"><div class="row-main"><div class="row-title">Email and in-app notice</div><div class="row-sub">30 days before — with the list of affected properties</div></div>${toggle(true)}</div><div class="row"><div class="row-main"><div class="row-title">Opt-in prompt for the higher dispatch limit</div><div class="row-sub">Existing landlords choose; nothing changes if they ignore it</div></div>${toggle(true)}</div></div>`)}
    ${panel('comm', 'staff', `<div class="list mt-2"><div class="row"><div class="row-main"><div class="row-title">Manager playbook update</div><div class="row-sub">Check-out and dispute steps · 21 days before</div></div>${toggle(true)}</div><div class="row"><div class="row-main"><div class="row-title">Support macros</div><div class="row-sub">EN / AR answers for the top 6 questions</div></div>${toggle(true)}</div></div>`)}` })}

  ${card({ title: 'Roll-out', body: `
    <div class="form-grid c2">${field({ label: 'Effective date', type: 'date', value: '2027-02-01' })}${field({ label: 'Notice to landlords', type: 'select', options: ['30 days', '60 days', '90 days'], value: '30 days' })}</div>
    <div class="field mt-4"><label for="ro">Start with a share of check-outs</label><div class="between"><span class="hero-num" style="font-size:30px"><span data-out="ro">10</span><small>%</small></span><span class="small muted right">for 7 days, then 100%<br>auto-pause if SLA drops below 95%</span></div><input class="range" type="range" id="ro" min="5" max="100" step="5" value="10"></div>
    <div class="mt-4">${callout({ tone: 'neutral', icon: 'undo-2', title: 'Rolling back', body: 'Published versions are permanent. To undo this change we would publish 2027.2 restoring the 2026.3 values; a tenant never loses a protection for a period that has already passed.' })}</div>` })}
</div>

<aside class="stack sticky-side">
  ${card({ title: 'Approvals', headEnd: badge('2 of 3', 'violet'), flush: true, body: list([
    { lead: avatar('Reem Al Marzooqi', { tone: 'c4' }), title: 'Legal counsel', sub: 'Reem Al Marzooqi · “No conflict with Law 26/2007; standards may exceed it.”', endBadge: badge('Approved', 'ok'), endSub: '17 Nov' },
    { lead: avatar('Hana Suzuki', { tone: 'c6' }), title: 'Compliance', sub: 'Hana Suzuki · client-money procedure updated', endBadge: badge('Approved', 'ok'), endSub: '19 Nov' },
    { lead: avatar('Sami Khoury', { tone: 'c2' }), title: 'Product', sub: 'You · waiting for your decision', endBadge: badge('Pending', 'warn') },
  ]) + `<div class="card-body stack stack-sm">${btn('Approve and schedule', { variant: 'primary', block: true, icon: 'check', sheet: 'sheet-publish' })}${btn('Request changes', { block: true, toast: 'Sent back to draft with your comments (demo)' })}</div>` })}
  ${card({ title: 'Draft details', body: kv([['Version', '2027.1'], ['Based on', '2026.3'], ['Jurisdiction', 'Dubai'], ['Rules changed', '3 of 25'], ['Legal sources changed', 'None'], ['Simulation', 'Passed · 0 conflicts']]) })}
  ${card({ title: 'History', body: timeline([
    { state: 'done', title: 'Compliance approved', when: 'Thu 19 Nov, 15:02' },
    { state: 'done', title: 'Legal counsel approved', when: 'Tue 17 Nov, 10:26' },
    { state: 'done', icon: 'test-tube-diagonal', title: 'Simulation run on 4,860 tenancies', when: 'Mon 16 Nov, 09:00' },
    { state: 'done', icon: 'square-pen', title: 'Draft created from 2026.3', when: 'Mon 9 Nov, 14:12' },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-publish', 'Approve and schedule 2027.1',
    `${callout({ tone: 'warn', icon: 'flask-conical', body: 'Demo only — this draft is an illustrative scenario and nothing will be published.' })}
     ${kv([['Changes', '3 (2 parameters, 1 enforcement)'], ['Effective', 'Mon 1 Feb 2027, 00:00 GST'], ['Tenancies affected', '4,120 immediately · rest as they start'], ['Notices sent', '1,712 landlords · 30 days before'], ['Roll-out', '10% for 7 days, then 100%']])}
     ${field({ label: 'Type PUBLISH 2027.1 to confirm', placeholder: 'PUBLISH 2027.1' })}
     <label class="checkline"><input type="checkbox" checked> I have read the simulation and the communication plan</label>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Schedule', { variant: 'primary', icon: 'calendar-clock', toast: 'Demo — nothing was published.' })),
};

/* ---------- Single rule: DXB-009 ---------- */
const rulePage = {
  slug: 'rule', nav: 'rulesets', title: 'DXB-009 · Rent cap', sub: 'Rule definition', back: 'rulesets.html',
  body: ({ data }) => { const r = data.R['DXB-009']; return `
<div class="split">
<div class="stack">
  <div class="card pad stack stack-md">
    <div class="cluster">${badge('DXB-009', 'solid')}${badge('Law', 'brand', { icon: 'scale' })}${badge('Renewals', 'outline')}${badge('Hard block', 'danger', { icon: 'ban' })}</div>
    <h1>${r.title}</h1>
    <p>${r.plain}</p>
    <div class="small muted inline">${icon('book-marked', 14)} ${r.src}</div>
    <div class="btn-row">${btn('Propose a change', { icon: 'square-pen', size: 'sm', sheet: 'sheet-edit' })}${btn('Public rulebook entry', { icon: 'external-link', size: 'sm', href: '../rulebook.html#DXB-009' })}</div>
  </div>

  ${card({ title: 'Parameters', headEnd: badge('Set by Decree 43/2013', 'brand', { icon: 'lock' }), flush: true, body: table({ cols: [{ label: 'Current rent compared with index' }, { label: 'Maximum increase', r: true }, { label: 'Share of renewals · 30 d', r: true }], rows: [
    ['<b>Up to 10% below</b> the index rent (or above it)', '<b class="num">0%</b>', '46%'],
    ['<b>11% – 20%</b> below', '<b class="num">5%</b>', '29%'],
    ['<b>21% – 30%</b> below', '<b class="num">10%</b>', '15%'],
    ['<b>31% – 40%</b> below', '<b class="num">15%</b>', '7%'],
    ['<b>More than 40%</b> below', '<b class="num">20%</b>', '3%'],
  ] }) })}

  ${card({ title: 'Rule logic', headEnd: badge('Read-only · generated from the ruleset', 'outline'), body: `<pre class="codeblock">rule DXB-009 "Rent increase cap"
  applies_to   renewal
  jurisdiction dubai
  source       "Decree 43/2013" + smart_rental_index

  inputs       current_rent, proposed_rent, index_rent(unit)
  gap          = (index_rent - current_rent) / index_rent

  max_increase = 0%   when gap &lt;= 10%
                 5%   when gap &lt;= 20%
                 10%  when gap &lt;= 30%
                 15%  when gap &lt;= 40%
                 20%  otherwise

  requires     DXB-014            # 90 days' notice, else 0%
  enforce      BLOCK when proposed_rent &gt;
               current_rent * (1 + max_increase)
  on_missing   index_rent -&gt; manager_review
  explain      tenant, landlord   # EN + AR templates</pre>` })}

  ${card({ title: 'Where it is enforced', flush: true, body: list([
    { icon: 'building-2', tone: 'brand', title: 'Landlord · renewal form', sub: 'The rent slider stops at the permitted maximum and shows the band for the building.', endBadge: badge('Block', 'danger') },
    { icon: 'file-text', tone: 'brand', title: 'Contract builder · renewal addendum', sub: 'An addendum cannot be generated above the cap, including via the API.', endBadge: badge('Block', 'danger') },
    { icon: 'key-round', tone: 'accent', title: 'Tenant · renewal offer', sub: 'Shows the index check and maximum in plain words; counter-offers above the cap are refused too.', endBadge: badge('Explain', 'info') },
    { icon: 'user-check', tone: 'info', title: 'Manager · review queue', sub: 'Units with no index data are routed for a manual check with two-person approval.', endBadge: badge('Review', 'warn') },
  ]) })}

  ${card({ title: 'Test cases', headEnd: badge('8 of 8 passing', 'ok', { icon: 'check' }), flush: true, body: table({ cols: [{ label: 'Case' }, { label: 'Current', r: true }, { label: 'Index', r: true }, { label: 'Proposed', r: true }, { label: 'Expected' }, { label: 'Result', r: true }], rows: [
    ['<b>18% below, inside the cap</b><div class="small muted">Marina Gate 1 · 1 bed</div>', '105,000', '128,000', '110,000', 'Allow · max 110,250', badge('Pass', 'ok')],
    ['<b>18% below, above the cap</b>', '105,000', '128,000', '112,000', 'Block', badge('Pass', 'ok')],
    ['<b>4% below the index</b>', '96,000', '100,000', '98,000', 'Block · max 0%', badge('Pass', 'ok')],
    ['<b>Boundary: exactly 20% below</b>', '80,000', '100,000', '84,000', 'Allow · max 5%', badge('Pass', 'ok')],
    ['<b>45% below the index</b>', '60,000', '110,000', '72,000', 'Allow · max 20%', badge('Pass', 'ok')],
    ['<b>Rent above the index</b>', '140,000', '128,000', '141,000', 'Block · max 0%', badge('Pass', 'ok')],
    ['<b>Notice served 80 days before expiry</b>', '105,000', '128,000', '108,000', 'Block · DXB-014', badge('Pass', 'ok')],
    ['<b>No index data for the unit</b>', '70,000', '—', '73,000', 'Manager review', badge('Pass', 'ok')],
  ] }) })}
</div>

<aside class="stack">
  ${card({ title: 'Last 30 days', body: `<div class="grid g2">${[['1,206', 'renewals evaluated'], ['142', 'blocked above cap'], ['97', 'reduced by landlord'], ['3.8%', 'average increase agreed']].map(([a, b]) => `<div><b class="display" style="font-size:22px">${a}</b><div class="small muted">${b}</div></div>`).join('')}</div>
    <div class="mt-4">${lineChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'violet', data: [96, 104, 118, 127, 133, 142] }], height: 120, label: 'Blocks per month' })}</div><p class="small muted">Blocks rise as more tenancies reach renewal each month.</p>` })}
  ${card({ title: 'Data source', body: `<div class="inline mb-3" style="gap:10px"><span class="row-ico info">${icon('database', 20)}</span><div><b class="strong">Smart Rental Index</b><div class="small muted">Dubai Land Department · building-level</div></div></div>${kv([['Last sync', 'Today, 05:30'], ['Units with index data', '98.6%'], ['Fallback', 'Manager review'], ['Cache', '24 hours per unit']])}<div class="mt-3">${btn('Integration status', { size: 'sm', block: true, href: 'integrations.html' })}</div>` })}
  ${card({ title: 'Linked rules', body: `<div class="cluster">${rule('DXB-014', '90-day notice')}${rule('DXB-006', 'Automatic renewal')}${rule('DXB-025B', '12-month notice')}</div><p class="small muted mt-3">A landlord who cannot raise the rent may not use eviction as a workaround; the notice wizard enforces the grounds separately.</p>` })}
  ${card({ title: 'Change history', body: timeline([
    { state: 'done', title: '2026.2 · Explanation text simplified', body: 'Copy only, EN and AR.', when: '23 Jun 2026' },
    { state: 'done', title: '2025.1 · Index source switched', body: 'Now reads the building-level Smart Rental Index.', when: '2 Jan 2025' },
    { state: 'done', title: '2024.1 · Rule created', body: 'Bands from Decree 43/2013.', when: 'Launch' },
  ]) })}
</aside>
</div>`; },
  sheets: () => sheet('sheet-edit', 'Propose a change to DXB-009',
    `${callout({ tone: 'warn', icon: 'lock', title: 'These numbers come from legislation', body: 'The bands are set by Decree 43/2013. They can only change if the law does. A proposal opens a new draft ruleset and must cite the legal source.' })}
     ${field({ label: 'What is changing?', type: 'select', options: ['Explanation text shown to users', 'Fallback when no index data', 'Legal parameters (requires source)'], value: 'Explanation text shown to users' })}
     ${field({ label: 'Legal source or reason', type: 'textarea', placeholder: 'Decree / circular reference, date and link' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Open in new draft', { variant: 'primary', toast: 'Added to a new draft ruleset (demo)' })),
};

module.exports = [rulesets, ruleset, rulePage];
