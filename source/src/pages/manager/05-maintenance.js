const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sheet, tabs, panel, stats, field, choice, stars, barChart, legend, timeline, stagebar } = ui;
const { pays, prio, timer, timerScript } = require('./lib/h');

const tri = (o) => `<div class="card pad stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · ${o.prop}</div></div></div>${prio(o.prio)}</div>
  <p class="small">${o.text}</p>
  <div class="cluster">${o.chips}</div>
  <div class="between small" style="padding-top:10px;border-top:1px solid var(--line-2)"><span class="muted">${o.age}</span><div class="inline">${o.act}</div></div>
</div>`;
const sug = (n, name, sub, rating, meta, best) => `<label class="choice"><input type="radio" name="ctr"${n === 1 ? ' checked' : ''}><span class="mg-rank${n === 1 ? '' : ' alt'}">${n}</span><span class="grow"><b>${name}${best ? ' ' + badge('Best match', 'brand') : ''}</b><span class="d">${sub}</span><span class="d inline" style="margin-top:4px">${stars(rating)} ${meta}</span></span></label>`;

const maintenance = {
  slug: 'maintenance', nav: 'maintenance', title: 'Maintenance desk', sub: '23 open · 1 emergency',
  body: () => `
${pageHead({ title: 'Maintenance desk', sub: 'Triage what comes in, decide who pays before anyone is booked, and make sure emergencies never wait on a landlord’s phone.', actions: btn('Log a job', { icon: 'plus', size: 'sm', toast: 'New job form (demo)' }) })}

<div class="card accent pad stack stack-md">
  <div class="between-top"><div><span class="eyebrow" style="color:rgba(255,255,255,.8)">Emergency-class · MR-2304 · Zahra Townhouse 114</span><div class="h2 mt-1" style="color:#fff">AC not cooling — compressor capacitor failed</div></div>${timer('t-desk', 22 * 60 + 14, 'until you can dispatch')}</div>
  <div class="grid g2 sm4 small">
    <div><div class="muted">Reported</div><b>Mon 21:10 · Hassan El-Sayed</b></div><div><div class="muted">Diagnosed</div><b>09:20 · Imran, Falcon Technical</b></div>
    <div><div class="muted">Quote</div><b class="num">AED 850 + VAT · part in stock</b></div><div><div class="muted">4-hour target</div><b>14:20 · part in stock</b></div>
  </div>
  <p class="small muted">Indoor temperature 31°C with a child under two at home. The quote is above Fatima’s AED 600 auto-approve limit, so she was asked at 10:20. She is on a flight.</p>
  <div class="btn-row">${btn('Dispatch now', { variant: 'white', icon: 'zap', sheet: 'sheet-dispatch' })}${btn('Call landlord', { variant: 'on-dark', icon: 'phone', toast: 'Calling Fatima — voicemail (demo)' })}</div>
</div>

${stats([
  { label: 'Open jobs', icon: 'wrench', value: '23', sub: '4 unassigned' },
  { label: 'Median first response', icon: 'timer', value: '41', unit: 'min', delta: '6 min', deltaDir: 'down', sub: 'this month' },
  { label: 'Breaching SLA', icon: 'alarm-clock', value: '2', sub: 'both awaiting parts' },
  { label: 'Fixed first visit', icon: 'circle-check', value: '84', unit: '%', delta: '3 pts', sub: 'vs October' },
])}

${tabs('mt', [{ id: 'triage', label: 'Triage', n: 4 }, { id: 'prog', label: 'In progress', n: 12 }, { id: 'breach', label: 'Breaching', n: 2 }, { id: 'sign', label: 'Sign-off', n: 5 }], 'triage')}

<div class="split">
<div class="stack">
${panel('mt', 'triage', `
  ${tri({ icon: 'droplets', tone: 'warn', title: 'Water heater leaking into ceiling void', ref: 'MR-2301', prop: 'Lake Terrace 2 · 1711 · Sana Mirza', prio: 'Urgent', text: '“Brown stain spreading on the bathroom ceiling and it is dripping.” Photos show an active leak; tenant has turned off the heater isolator.', chips: pays('Landlord') + rule('DXB-016', 'Art. 16'), age: 'Unassigned for 35 min', act: btn('Assign', { variant: 'primary', size: 'sm', sheet: 'sheet-assign' }) })}
  ${tri({ icon: 'cooking-pot', tone: '', title: 'Kitchen sink blocked', ref: 'MR-2300', prop: 'Park Heights 1 · 214 · Thandiwe Nkosi', prio: 'Routine', text: 'Slow drain for a week, now standing water. No leak. Tenant confirms food waste went down the sink.', chips: pays('Tenant') + rule('OR-103', 'Small repairs'), age: 'Tenant accepted the AED 160 estimate', act: btn('Assign', { variant: 'primary', size: 'sm', sheet: 'sheet-assign' }) })}
  ${tri({ icon: 'bell', tone: 'info', title: 'Intercom not ringing', ref: 'MR-2299', prop: 'Shoreline 7 · 402 · Lindholm', prio: 'Routine', text: 'Handset is fine; the panel in the lobby does not call the flat. Three neighbours report the same.', chips: badge('Building management', 'info', { icon: 'building-2' }), age: 'Not a landlord repair', act: btn('Send to FM', { size: 'sm', toast: 'Forwarded to Shoreline FM with tenant consent (demo)' }) })}
  ${tri({ icon: 'paint-roller', tone: '', title: 'Tenant wants to paint the nursery', ref: 'AR-0412', prop: 'Villa 8, Al Barsha 3 · Farah Siddiqui', prio: 'Routine', text: 'Alteration request, not a repair. Pale green, one room, will repaint white at move-out.', chips: badge('Needs landlord consent', 'gold') + rule('DXB-019', 'Art. 19'), age: 'Sent to Yusuf Demir yesterday', act: btn('Nudge', { size: 'sm', toast: 'Reminder sent to Yusuf (demo)' }) })}`, true)}

${panel('mt', 'prog', `<div class="card">${list([
    { icon: 'droplets', tone: 'info', title: 'Kitchen tap leak · Marina Gate 2304', badge: badge('On schedule', 'ok', { dot: true }), sub: 'MR-2291 · Imran, Falcon Technical arriving 11:25 · Maya Fernandes at home · landlord pays', extra: `<div class="mt-2">${stagebar(5, 2)}</div>` },
    { icon: 'thermometer-snowflake', tone: 'brand', title: 'AC service · Marina Gate 2304', badge: badge('Thu 3 Dec', ''), sub: 'MR-2207 · twice-yearly service included in the tenancy', extra: `<div class="mt-2">${stagebar(5, 2)}</div>` },
    { icon: 'zap', tone: 'warn', title: 'Tripping breaker in kitchen · Bay Square 7 · 903', badge: badge('Today 15:00', 'info', { dot: true }), sub: 'MR-2288 · SparkSafe replaced by Al Noor after insurance lapse', extra: `<div class="mt-2">${stagebar(5, 2)}</div>` },
    { icon: 'sparkles', tone: '', title: 'Pre-listing deep clean · Burj Vista 3102', badge: badge('Wed 25 Nov', ''), sub: 'SV-0931 · before Thursday’s photo shoot · landlord add-on', extra: `<div class="mt-2">${stagebar(5, 1)}</div>` },
  ])}</div><p class="small muted center">Showing 4 of 12</p>`)}

${panel('mt', 'breach', `<div class="card">${list([
    { icon: 'alarm-clock', tone: 'danger', title: 'Oven element · Villa 14, Mirdif', badge: badge('2 days over', 'danger'), sub: 'MR-2254 · part on back-order until Thu · tenant given a countertop oven on loan', toast: 'Job opened (demo)', chev: true },
    { icon: 'alarm-clock', tone: 'danger', title: 'Balcony door seal · Maple 1 · TH 17', badge: badge('1 day over', 'danger'), sub: 'MR-2260 · contractor no-show yesterday · reassigned to Al Noor, tomorrow 09:00', toast: 'Job opened (demo)', chev: true },
  ])}</div>
  ${callout({ tone: 'warn', title: 'A no-show costs the contractor', body: 'Missed visits without 2 hours’ notice lower a contractor’s ranking. Three in 90 days triggers a review.' })}`)}

${panel('mt', 'sign', `<div class="card">${list([
    { icon: 'circle-check', tone: 'ok', title: 'Shower mixer replaced · Marina Arcade · 1903', sub: 'MR-2270 · tenant signed off, 5 stars · AED 420 · release payout', endBadge: btn('Release', { size: 'sm', toast: 'AED 378 released to contractor after 10% fee (demo)' }) },
    { icon: 'circle-help', tone: 'warn', title: 'Dishwasher repair · Silicon Gates 2 · 311', sub: 'MR-2263 · tenant says it still leaks · contractor disputes', endBadge: btn('Review', { size: 'sm', toast: 'Return visit booked at no charge (demo)' }) },
    { icon: 'circle-check', tone: 'ok', title: 'Pest treatment · Villa 8, Al Barsha 3', sub: 'MR-2258 · signed off · 30-day guarantee logged', endBadge: btn('Release', { size: 'sm', toast: 'Payout released (demo)' }) },
  ])}</div>`)}
</div>

<aside class="stack">
  ${guard({ title: 'Who pays — decided before booking', checks: [
    { state: 'ok', title: 'Faults with the home are the landlord’s', sub: 'AC, plumbing, electrics, supplied appliances, structure.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'info', title: 'Small items up to AED 500 are the tenant’s', sub: 'Or less, if the landlord set a lower limit. Never more.', rule: rule('OR-103', 'Small repairs') },
    { state: 'plus', title: 'Emergencies do not wait', sub: 'No landlord reply in 60 minutes → you dispatch, up to the pre-agreed cap.', rule: rule('OR-104', 'Emergency') },
    { state: 'block', title: 'Cutting off services is never a remedy', sub: 'Not for arrears, not for anything.', rule: rule('DXB-034', 'Art. 34') },
  ] })}
  ${card({ title: 'Jobs this month by trade', body: barChart({ labels: ['AC', 'Plumb', 'Elec', 'Appl', 'Doors', 'Pest', 'Other'], series: [{ tone: 'brand', data: [34, 27, 14, 11, 8, 6, 9] }], height: 150, hi: 0 }) + `<p class="small muted mt-2">109 jobs · AED 61,400 of work · 71% paid by landlords</p>` })}
  ${card({ title: 'On call now', flush: true, body: list([
    { lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Falcon Technical', sub: 'AC · plumbing · 2 crews out', endBadge: badge('Busy to 13:00', 'warn') },
    { lead: avatar('Noor Maintenance', { initials: 'AN' }), title: 'Al Noor Maintenance', sub: 'Electrical · handyman', endBadge: badge('Free', 'ok', { dot: true }) },
    { lead: avatar('Desert Breeze', { initials: 'DB' }), title: 'Desert Breeze AC', sub: 'AC only', endBadge: badge('Free 12:30', 'ok') },
  ]) })}
</aside>
</div>${timerScript}`,
  sheets: () => sheet('sheet-dispatch', 'Dispatch without landlord approval',
    `${callout({ tone: 'warn', title: 'Available in 22 minutes', body: 'The landlord’s 60-minute window ends at 11:20. After that you may approve work up to AED 1,500 on her behalf.', rules: [rule('OR-104', 'Emergency standard')] })}
     ${kv([['Contractor', 'Falcon Technical · Bilal Ahmed (AC) — Imran is at Marina Gate'], ['Work', 'Replace compressor capacitor and top up refrigerant'], ['Quote', 'AED 850 + VAT'], ['Emergency cap', money(1500)], ['Paid by', 'Landlord · deducted from next rent payout'], ['Earliest arrival', '11:35']])}
     ${field({ label: 'Reason recorded on the job', type: 'textarea', value: 'Emergency-class: no cooling, infant in home, landlord unreachable (in flight). Dispatched under OR-104 at the pre-agreed cap.' })}
     <label class="checkline"><input type="checkbox" checked> Tell Fatima by push, email and WhatsApp with the quote and photos</label>`,
    btn('Not yet', { attrs: { 'data-close': true } }) + btn('Arm auto-dispatch at 11:20', { variant: 'accent', toast: 'Armed — Falcon crew 2 dispatches at 11:20 unless Fatima replies (demo)' }))
  + sheet('sheet-assign', 'Assign a contractor',
    `<p class="small muted">MR-2301 · water heater leak · Lake Terrace 2, JLT · landlord pays</p>
     ${sug(1, 'Al Noor Maintenance', 'Plumbing certified · 4.2 km away · free now', 4.6, '4.6 · 148 jobs · 95% on time', true)}
     ${sug(2, 'Falcon Technical Services', 'Plumbing · AC · 9.8 km · free from 13:00', 4.9, '4.9 · 212 jobs · 97% on time')}
     ${sug(3, 'BluePipe Plumbing', 'Plumbing only · 6.1 km · tomorrow 08:00', 4.4, '4.4 · 31 jobs · new to the network')}
     ${callout({ tone: 'neutral', body: 'Ranking weighs arrival time, rating, first-visit fix rate and distance. Only contractors with a valid trade licence and insurance are shown.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Offer job', { variant: 'primary', toast: 'Job offered to Al Noor — 10 minutes to accept (demo)' })),
};

module.exports = [maintenance];
