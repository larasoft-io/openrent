const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, field, choice, stars, table, chips, thumb, timeline } = ui;
const { P } = require('../../lib/data');
const { B, search } = require('./lib/h');

const person = (name, sub, flag, o = {}) => ({ lead: avatar(name, o.av || {}), title: name, sub, endBadge: flag, sheet: o.sheet, toast: o.sheet ? null : `${name} · profile opened (demo)`, chev: true, badge: o.badge });

const people = {
  slug: 'people', nav: 'people', title: 'People', sub: '38 landlords · 171 tenants',
  body: () => `
${pageHead({ title: 'People', sub: 'Everyone in your book, with the one thing you most need to know about each of them today.' })}
${search('Search by name, building, Ejari or phone')}
${tabs('pp', [{ id: 'll', label: 'Landlords', n: 38 }, { id: 'tt', label: 'Tenants', n: 171 }, { id: 'ap', label: 'Applicants', n: 9 }], 'll')}

${panel('pp', 'll', `
  ${chips(['All', ['Action due', 4], ['Blocked something', 2], ['New this month', 3], 'Overseas'])}
  <div class="card">${list([
    person('Fatima Al Hashimi', '7 properties · AED 1.03m rent roll · with openrent.me since Feb 2025', badge('2 signatures due', 'warn', { dot: true }), { sheet: 'sheet-person' }),
    person('Anastasia Volkova', '5 properties · Palm Jumeirah, Dubai Marina · lives in Limassol', badge('Increase blocked', 'danger')),
    person('Vikram Nair', '4 properties · JLT', badge('Dispute open', 'violet')),
    person('Sophie Laurent', '4 properties · Dubai Hills', badge('Renewal cut-off Thu', 'warn', { dot: true })),
    person('Rania Aziz', '4 properties · Business Bay, Silicon Oasis', badge('All good', 'ok')),
    person('Khalid Al Mazrouei', '3 properties · Mirdif, Mudon', badge('Notice blocked', 'danger')),
    person('Chen Wei', '3 properties · Sobha Hartland', badge('Permit ready', 'ok')),
    person('Yusuf Demir', '3 properties · Al Barsha', badge('Dispute open', 'violet')),
    person('Olumide Adeyemi', '2 properties · Silicon Oasis · represented by Daniel Okafor', badge('PoA expired', 'danger'), { badge: badge('Via rep', 'info') }),
  ])}</div><p class="small muted center">Showing 9 of 38</p>`, true)}

${panel('pp', 'tt', `
  ${chips(['All', ['Arrears', 2], ['Renewal window', 9], ['Moving out', 4], ['Open repair', 11]])}
  <div class="card">${list([
    person('Maya Fernandes', 'Marina Gate 2304 · 9 of 9 payments on time · renewal offer open', badge('Excellent', 'brand')),
    person('Hassan El-Sayed', 'Zahra TH 114 · cheque 3 returned · emergency repair open', badge('Arrears', 'danger', { dot: true })),
    person('James Whitfield', 'Palma Villa 27 · with Claire Whitfield · 12-month notice running', badge('Notice', 'violet')),
    person('Olena Kovalenko', 'Al Ghozlan 412 · checks out Mon 30 Nov', badge('Moving out', 'gold')),
    person('Arjun Mehta', 'Executive Towers 1807 · with Neha Mehta · moves in Sat 5 Dec', badge('Onboarding', 'accent')),
    person('Grace Mwangi', 'Formerly Lake Terrace 1204 · deposit decision due Fri', badge('Dispute', 'violet')),
    person('Sana Mirza', 'Lake Terrace 2 · 1711 · urgent leak reported 10:23', badge('Repair', 'warn', { dot: true })),
    person('Thandiwe Nkosi', 'Park Heights 1 · 214 · renewal cut-off Thu 26 Nov', badge('Renewal', 'gold')),
    person('Peter Lindholm', 'Shoreline 7 · 402 · with Hanna Lindholm · heater dispute in mediation', badge('Mediation', 'info')),
  ])}</div><p class="small muted center">Showing 9 of 171</p>`)}

${panel('pp', 'ap', `<div class="card">${list([
    person('Tomás Herrera', 'Creek Vista 1510 · referencing decision overdue', badge('Decide', 'danger', { dot: true })),
    person('Bongani Dlamini', 'Park Heights 2 · 608 · thin credit file', badge('Decide', 'warn', { dot: true })),
    person('Aiko Tanaka', 'Lake Terrace 2 · 908 · credit report pending', badge('Automatic')),
    person('Mohammed Al Amin', 'Bay Square 7 · 1204 · invited today', badge('Invited')),
  ])}</div>
  ${callout({ tone: 'neutral', icon: 'lock', title: 'Applicant data is short-lived', body: 'Files for unsuccessful applications are deleted after 90 days. Landlords never see them at any point.' })}`)}
`,
  sheets: () => sheet('sheet-person', 'Fatima Al Hashimi',
    `<div class="inline" style="gap:12px">${avatar('Fatima Al Hashimi', { size: 'lg' })}<div><b class="strong">Landlord · 7 properties</b><div class="small muted">Verified owner · UAE Pass · prefers WhatsApp, evenings</div></div></div>
     ${kv([['Rent roll (let)', 'AED 783,000'], ['Occupancy', '5 of 7 let'], ['Plan', 'Collect.me on 5 · à la carte on 2'], ['Avg response', '2 h 10 min'], ['Guardrail blocks', '1 this year (deposit above cap)']])}
     <div class="card">${list(Object.values(P).slice(0, 4).map(p => ({ lead: thumb(p.img, '', B), title: p.short, sub: p.note, endBadge: badge(p.status, p.tone === 'neutral' ? '' : p.tone) })))}</div>
     ${callout({ tone: 'warn', title: 'Waiting on her', body: 'Tenancy contract for Executive Towers 1807 and Form A for Burj Vista 3102. She lands at 19:40.' })}`,
    btn('Message', { icon: 'message-circle', href: 'inbox.html' }) + btn('Call', { variant: 'primary', icon: 'phone', toast: 'Calling Fatima… (demo)' })),
};

const lic = (text, tone) => `<span class="badge ${tone || ''}">${text}</span>`;
const cdet = (name, lead, trades, o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:12px">${avatar(name, { size: 'lg', initials: o.ini, tone: o.tone })}<div><b class="strong" style="font-size:15.5px">${name}</b><div class="small muted">${lead} · ${trades}</div><div class="inline small mt-1">${stars(o.rating)}<span class="muted">${o.rating.toFixed(1)} · ${o.jobs} jobs</span></div></div></div>${o.state}</div>
  <div class="grid g2 small">
    <div><div class="muted">Trade licence</div>${o.licence}</div><div><div class="muted">Liability insurance</div>${o.ins}</div>
    <div><div class="muted">On time</div><b class="num">${o.ontime}</b></div><div><div class="muted">Fixed first visit</div><b class="num">${o.ffv}</b></div>
  </div>
  ${o.note ? `<p class="small muted">${o.note}</p>` : ''}
  <div class="btn-row">${o.acts}</div>
</div>`;

const contractors = {
  slug: 'contractors', nav: 'contractors', title: 'Contractors', sub: '38 approved · 3 need attention',
  body: () => `
${pageHead({ title: 'Contractor network', sub: 'Only companies with a current Dubai trade licence and liability insurance are offered jobs. When a document lapses, so does their access.', actions: btn('Invite a contractor', { icon: 'user-plus', size: 'sm', toast: 'Invitation link copied (demo)' }) })}
${stats([
  { label: 'Approved', icon: 'hard-hat', value: '38', sub: '9 trades covered' },
  { label: 'Documents expiring', icon: 'calendar-clock', value: '3', sub: 'within 30 days' },
  { label: 'Suspended', icon: 'pause', value: '1', sub: 'insurance lapsed' },
  { label: 'Network rating', icon: 'star', value: '4.7', sub: '1,940 rated jobs' },
])}
${chips(['All', ['Needs attention', 3], 'AC', 'Plumbing', 'Electrical', 'Cleaning', 'Pest control', ['Applications', 1]])}

<div class="split">
<div class="grid">
  ${cdet('Falcon Technical Services', 'Imran Sheikh', 'AC · plumbing · electrical · handyman', { tone: 'c3', ini: 'FT', rating: 4.9, jobs: 212, state: badge('Approved', 'ok', { dot: true }), licence: lic('Valid to 14 Aug 2027', 'ok'), ins: lic('Valid to 31 Mar 2027', 'ok'), ontime: '97%', ffv: '91%', note: 'Top-ranked for AC in Dubai Marina, JLT and Town Square. On two of your jobs today.', acts: btn('Profile', { size: 'sm', toast: 'Profile opened (demo)' }) + btn('Message', { size: 'sm', icon: 'message-circle', toast: 'Thread opened (demo)' }) })}
  ${cdet('Desert Breeze AC', 'Karim Mansour', 'AC & ventilation', { ini: 'DB', rating: 4.7, jobs: 96, state: badge('Expiring', 'warn', { dot: true }), licence: lic('Expires 12 Dec 2026', 'warn'), ins: lic('Valid to 30 Jun 2027', 'ok'), ontime: '94%', ffv: '88%', note: 'Renewal receipt requested on 16 Nov. Jobs dated after 12 Dec are held back until the new licence is uploaded.', acts: btn('Chase documents', { size: 'sm', variant: 'primary', toast: 'Reminder sent to Karim (demo)' }) + btn('Profile', { size: 'sm', toast: 'Profile opened (demo)' }) })}
  ${cdet('SparkSafe Electrical', 'Deepak Rao', 'Electrical', { ini: 'SS', rating: 4.5, jobs: 71, state: badge('Suspended', 'danger', { dot: true }), licence: lic('Valid to 2 May 2027', 'ok'), ins: lic('Lapsed 20 Nov 2026', 'danger'), ontime: '92%', ffv: '86%', note: 'Suspended automatically at midnight on 20 Nov. One booked job was moved to Al Noor. Reinstates as soon as a valid certificate is verified.', acts: btn('Review upload', { size: 'sm', variant: 'primary', sheet: 'sheet-reinstate' }) + btn('Call', { size: 'sm', icon: 'phone', toast: 'Calling Deepak… (demo)' }) })}
  ${cdet('Al Noor Maintenance', 'Ibrahim Al Noor', 'Plumbing · electrical · handyman', { ini: 'AN', rating: 4.6, jobs: 148, state: badge('Approved', 'ok', { dot: true }), licence: lic('Valid to 9 Jan 2027', 'ok'), ins: lic('Valid to 9 Jan 2027', 'ok'), ontime: '95%', ffv: '89%', acts: btn('Profile', { size: 'sm', toast: 'Profile opened (demo)' }) + btn('Message', { size: 'sm', icon: 'message-circle', toast: 'Thread opened (demo)' }) })}
  ${cdet('BluePipe Plumbing', 'Samuel Otieno', 'Plumbing', { ini: 'BP', rating: 4.4, jobs: 31, state: badge('Probation', 'info'), licence: lic('Valid to 18 Sep 2027', 'ok'), ins: lic('Valid to 1 Oct 2027', 'ok'), ontime: '90%', ffv: '84%', note: 'Joined in September. Probation ends after 40 rated jobs with an average of 4.3 or more.', acts: btn('Profile', { size: 'sm', toast: 'Profile opened (demo)' }) + btn('End probation', { size: 'sm', toast: 'Needs 9 more rated jobs (demo)' }) })}
  ${cdet('GreenLeaf Pest Control', 'Maria Santos', 'Pest control', { ini: 'GL', rating: 0, jobs: 0, state: badge('Application', 'accent', { dot: true }), licence: lic('Uploaded · to verify', 'warn'), ins: lic('Uploaded · to verify', 'warn'), ontime: '—', ffv: '—', note: 'Pest control also needs a Dubai Municipality permit for the company and each technician. Permit uploaded for 3 of 4 technicians.', acts: btn('Approve', { size: 'sm', variant: 'primary', sheet: 'sheet-approve' }) + btn('Ask for more', { size: 'sm', toast: 'Request sent to Maria (demo)' }) })}
</div>

<aside class="stack">
  ${guard({ title: 'What it takes to get a job offer', checks: [
    { state: 'ok', title: 'Current Dubai trade licence', sub: 'Activity must match the trade offered.' },
    { state: 'ok', title: 'Public liability insurance', sub: 'Minimum AED 1,000,000 cover.' },
    { state: 'ok', title: 'Verified technicians', sub: 'Emirates ID for everyone who enters a home; ID code confirmed at the door.' },
    { state: 'info', title: 'Paid only after sign-off', sub: 'The tenant confirms the fix, then the payout is released less the 10% platform fee.' },
  ] })}
  ${card({ title: 'Expiring soon', flush: true, body: list([
    { icon: 'calendar-clock', tone: 'warn', title: 'Desert Breeze AC', sub: 'Trade licence · 12 Dec 2026', endBadge: badge('18 days', 'warn') },
    { icon: 'calendar-clock', tone: 'warn', title: 'CleanNest Services', sub: 'Insurance · 19 Dec 2026', endBadge: badge('25 days', 'warn') },
    { icon: 'calendar-clock', tone: '', title: 'Al Noor Maintenance', sub: 'Licence and insurance · 9 Jan 2027', endBadge: badge('46 days') },
  ]) })}
  ${callout({ tone: 'neutral', title: 'No favourites', body: 'Landlords can name a preferred contractor, but it must be in the network. Managers cannot take a referral fee from any of them.' })}
</aside>
</div>`,
  sheets: () => sheet('sheet-reinstate', 'Reinstate SparkSafe Electrical',
    `${kv([['Uploaded', 'Insurance certificate · today 09:14'], ['Insurer', 'Gulf Crescent Insurance'], ['Cover', 'AED 2,000,000 public liability'], ['Period', '24 Nov 2026 – 23 Nov 2027'], ['Gap in cover', '<span class="t-warn">20 – 23 Nov (4 days)</span>']])}
     ${callout({ tone: 'warn', body: 'No SparkSafe jobs took place during the gap — the one booking was reassigned. Safe to reinstate once the certificate is confirmed with the insurer.' })}
     <label class="checkline"><input type="checkbox" checked> I have verified the policy number with the insurer</label>`,
    btn('Keep suspended', { attrs: { 'data-close': true } }) + btn('Reinstate', { variant: 'primary', toast: 'SparkSafe reinstated · back in job ranking (demo)' }))
  + sheet('sheet-approve', 'Approve GreenLeaf Pest Control',
    `${guard({ title: 'Onboarding checks', checks: [
       { state: 'ok', title: 'Trade licence matches activity', sub: 'Pest control services · valid to 3 Mar 2027' },
       { state: 'ok', title: 'Insurance AED 1,000,000', sub: 'Valid to 28 Feb 2027' },
       { state: 'warn', title: 'Municipality permit — 3 of 4 technicians', sub: 'The fourth cannot be sent to jobs until his permit is uploaded.' },
       { state: 'ok', title: 'Two trade references', sub: 'Both from facilities managers, both positive.' },
     ] })}
     ${choice('ap', 'Approve on probation', '40 rated jobs · restricted to the 3 permitted technicians', true)}
     ${choice('ap', 'Hold until all permits are in', '', false)}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Confirm', { variant: 'primary', toast: 'GreenLeaf approved on probation (demo)' })),
};

module.exports = [people, contractors];
