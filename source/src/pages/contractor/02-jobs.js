const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, lifecycle, avatar, money, pageHead, sheet, field, choice, stars, chat, composer, tabs, panel, bar, chips } = ui;
const B = '../../';

const job = (o) => `<${o.href ? `a href="${o.href}"` : 'div'} class="card pad${o.href ? ' link-card' : ''} stack stack-md">
  <div class="between-top"><div class="inline" style="gap:10px;align-items:flex-start"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong" style="line-height:1.3;display:block">${o.title}</b><div class="small muted">${o.ref} · ${o.where}</div></div></div>${o.badge}</div>
  ${o.progress != null ? ui.stagebar(6, o.progress) : ''}
  <div class="between small"><span class="inline muted">${o.tech ? avatar(o.tech, { size: 'xs', tone: o.techTone }) : icon('calendar', 14)}<span>${o.line}</span></span><span class="strong nowrap">${o.value}</span></div>
  ${o.actions ? `<div class="btn-row">${o.actions}</div>` : ''}
</${o.href ? 'a' : 'div'}>`;

const jobs = {
  slug: 'jobs', nav: 'jobs', title: 'Jobs', sub: '13 active · 31 done this month',
  body: () => `
${pageHead({ title: 'Jobs', sub: 'Every job from offer to payout. You always see who pays and the approved limit before you travel.', actions: btn('Filter', { size: 'sm', icon: 'sliders-horizontal', sheet: 'sheet-filter' }) })}

${tabs('jobs', [{ id: 'offers', label: 'Offers', n: 2 }, { id: 'quoted', label: 'Quoted', n: 2 }, { id: 'scheduled', label: 'Scheduled', n: 4 }, { id: 'progress', label: 'In progress', n: 2 }, { id: 'signoff', label: 'Sign-off', n: 1 }, { id: 'paid', label: 'Paid', n: 31 }], 'scheduled')}

${panel('jobs', 'offers', `
  ${callout({ tone: 'warn', icon: 'timer', title: 'Offers expire', body: 'Urgent jobs are held for you for 60 minutes, routine jobs for 4 hours. After that they go to the next approved contractor.' })}
  <div class="grid lg2">
  ${job({ icon: 'flame', tone: 'danger', title: 'Water heater not heating', ref: 'MR-2311', where: 'Executive Towers K 1807 · Business Bay', badge: badge('42 min left', 'danger', { icon: 'timer' }), line: 'Urgent · within 48 h · landlord pays', value: 'Est. AED 300–650', actions: btn('Decline', { size: 'sm', toast: 'MR-2311 declined (demo)' }) + btn('Accept', { size: 'sm', variant: 'primary', toast: 'MR-2311 accepted — pick a slot (demo)' }) })}
  ${job({ icon: 'fan', tone: 'info', title: 'AC deep clean before photo shoot', ref: 'MR-2315', where: 'Burj Vista 1, Apt 3102 · Downtown', badge: badge('3 h 10 min left', 'warn', { icon: 'timer' }), line: 'Wed 25 Nov · landlord pays', value: 'AED 480 fixed', actions: btn('Decline', { size: 'sm', toast: 'MR-2315 declined (demo)' }) + btn('Accept', { size: 'sm', variant: 'primary', toast: 'MR-2315 accepted — pick a slot (demo)' }) })}
  </div>`)}

${panel('jobs', 'quoted', `<div class="grid lg2">
  ${job({ href: 'quotes.html', icon: 'thermometer-snowflake', tone: 'warn', title: 'AC not cooling — capacitor & gas top-up', ref: 'MR-2304', where: 'Zahra Townhouse 114 · Town Square', badge: badge('Awaiting landlord', 'warn'), tech: 'Imran Sheikh', techTone: 'c3', line: 'Sent today 09:48', value: 'AED 850 + VAT' })}
  ${job({ href: 'quotes.html', icon: 'droplets', tone: 'warn', title: 'Booster pump replacement', ref: 'MR-2276', where: 'Palma Villa 27 · Arabian Ranches 2', badge: badge('Awaiting landlord', 'warn'), tech: 'Kelvin Otieno', techTone: 'c4', line: 'Sent Fri 20 Nov · reminder sent', value: 'AED 1,950 + VAT' })}
  </div>`)}

${panel('jobs', 'scheduled', `<div class="grid lg2">
  ${job({ href: 'jobs.html', icon: 'clipboard-check', tone: 'info', title: 'Pre-check-out snag list — visit to quote', ref: 'MR-2309', where: 'Al Ghozlan 3, Apt 412 · The Greens', badge: badge('Today 14:00', 'info', { dot: true }), progress: 1, tech: 'Imran Sheikh', techTone: 'c3', line: 'Tenant moving out 30 Nov', value: 'Free visit' })}
  ${job({ href: 'jobs.html', icon: 'paint-roller', tone: 'gold', title: 'Touch-up painting before photos', ref: 'MR-2312', where: 'Bloom Towers B, Studio 915 · JVC', badge: badge('Today 16:30', 'gold', { dot: true }), progress: 1, tech: 'Sanjay Thapa', techTone: 'c6', line: 'Vacant · key at reception', value: 'AED 420 fixed' })}
  ${job({ href: 'jobs.html', icon: 'thermometer-snowflake', tone: 'brand', title: 'AC service — 6 units', ref: 'MR-2318', where: 'Palma Villa 27 · Arabian Ranches 2', badge: badge('Tue 1 Dec', 'brand'), progress: 1, tech: 'Bilal Ahmed', techTone: 'c2', line: '09:00–12:00 · included in tenancy', value: 'AED 720 fixed' })}
  ${job({ href: 'jobs.html', icon: 'thermometer-snowflake', tone: 'brand', title: 'AC service (twice a year)', ref: 'MR-2207', where: 'Marina Gate 1, Apt 2304 · Dubai Marina', badge: badge('Thu 3 Dec', 'brand'), progress: 1, tech: 'Bilal Ahmed', techTone: 'c2', line: '09:00–10:30 · included in tenancy', value: 'AED 240 fixed' })}
  </div>`, true)}

${panel('jobs', 'progress', `<div class="grid lg2">
  ${job({ href: 'job.html', icon: 'droplets', tone: 'gold', title: 'Kitchen mixer tap leaking', ref: 'MR-2291', where: 'Marina Gate 1, Apt 2304 · Dubai Marina', badge: badge('On the way', 'gold', { dot: true }), progress: 2, tech: 'Imran Sheikh', techTone: 'c3', line: 'Arrive 11:25 · limit AED 600', value: 'Est. AED 220–380' })}
  ${job({ href: 'jobs.html', icon: 'thermometer-snowflake', tone: 'ok', title: 'AC service — 4 units', ref: 'MR-2306', where: 'Palma Villa 41 · Arabian Ranches 2', badge: badge('On site', 'ok', { dot: true }), progress: 3, tech: 'Bilal Ahmed', techTone: 'c2', line: 'Started 10:05 · 2 of 4 units done', value: 'AED 480 fixed' })}
  </div>`)}

${panel('jobs', 'signoff', `
  ${job({ icon: 'bath', tone: 'gold', title: 'Bathroom sealant renewed', ref: 'MR-2287', where: 'Al Ghozlan 3, Apt 412 · The Greens', badge: badge('Waiting for tenant', 'gold'), progress: 4, tech: 'Sanjay Thapa', techTone: 'c6', line: 'Completed Sun 22 Nov, 16:10', value: 'AED 220', actions: btn('Nudge tenant', { size: 'sm', icon: 'bell', toast: 'Reminder sent to the tenant (demo)' }) + btn('View photos', { size: 'sm', icon: 'camera', toast: '6 before / after photos (demo)' }) })}
  ${callout({ tone: 'brand', icon: 'shield-check', title: 'You will not be left waiting', body: 'If a tenant does not sign off or raise a problem within 72 hours, the job is released automatically and joins your next payout.' })}`)}

${panel('jobs', 'paid', `
  <div class="card">${list([
    { icon: 'check', tone: 'ok', title: 'Extractor fan motor replaced', sub: 'MR-2283 · Executive Towers K 1807 · paid Mon 23 Nov', end: 'AED 460', endSub: 'net 414', toast: 'Job record opened (demo)' },
    { icon: 'check', tone: 'ok', title: 'Irrigation timer replaced', sub: 'MR-2260 · Palma Villa 27 · paid Mon 23 Nov', end: 'AED 340', endSub: 'net 306', toast: 'Job record opened (demo)' },
    { icon: 'check', tone: 'ok', title: 'Water heater thermostat', sub: 'MR-2249 · Zahra Townhouse 114 · paid Thu 19 Nov', end: 'AED 290', endSub: 'net 261', toast: 'Job record opened (demo)' },
    { icon: 'check', tone: 'ok', title: 'Washing machine not draining', sub: 'MR-2135 · Marina Gate 1, Apt 2304 · paid Fri 16 Oct · tenant paid', end: 'AED 180', endBadge: stars(5), toast: 'Job record opened (demo)' },
    { icon: 'check', tone: 'ok', title: 'Balcony door handle', sub: 'MR-1987 · Marina Gate 1, Apt 2304 · paid Fri 14 Aug', end: 'AED 150', endSub: 'net 135', toast: 'Job record opened (demo)' },
  ])}</div>
  <p class="small muted center">Showing 5 of 31 jobs paid in November · <a class="link" href="earnings.html">see earnings</a></p>`)}
`,
  sheets: () => sheet('sheet-filter', 'Filter jobs',
    `<div class="field"><span class="label">Trade</span>${chips(['All', 'AC', 'Plumbing', 'Electrical', 'Handyman', 'Painting'], 0, 'wrap')}</div>
     <div class="field"><span class="label">Technician</span>${chips(['Everyone', 'Imran', 'Bilal', 'Sanjay', 'Kelvin'], 0, 'wrap')}</div>
     <div class="field"><span class="label">Area</span>${chips(['All areas', 'Dubai Marina', 'JVC', 'The Greens', 'Business Bay', 'Downtown', 'Town Square', 'Arabian Ranches'], 0, 'wrap')}</div>`,
    btn('Reset', { attrs: { 'data-close': true } }) + btn('Show 13 jobs', { variant: 'primary', attrs: { 'data-close': true } })),
};

const line = (title, sub, amt) => ({ title, sub, end: amt });

const detail = {
  slug: 'job', nav: 'jobs', title: 'Kitchen tap leak', sub: 'MR-2291 · on the way', back: 'jobs.html',
  body: () => `
<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top"><div><span class="eyebrow">MR-2291 · Plumbing · urgent</span><h1 class="mt-2">Kitchen mixer tap leaking</h1></div>${badge('On the way', 'gold', { dot: true, lg: true })}</div>
    ${lifecycle([{ label: 'Accepted', icon: 'thumbs-up' }, { label: 'On the way', icon: 'truck' }, { label: 'On site', icon: 'map-pin' }, { label: 'Fixing', icon: 'wrench' }, { label: 'Sign-off', icon: 'pen-line' }, { label: 'Paid', icon: 'banknote' }], 1)}
  </div>

  <div class="card" style="overflow:hidden">
    <div class="mapbox" style="border:0;border-radius:0;aspect-ratio:16/8"><img src="${B}assets/img/map-marina.svg" alt="Map showing Marina Gate 1"></div>
    <div class="card-body stack stack-md">
      <div class="between-top"><div><b class="strong" style="font-size:16px">Marina Gate 1 · Apt 2304</b><div class="small muted">Al Marsa Street, Dubai Marina · floor 23</div></div><div class="right"><b class="display" style="font-size:20px">31 min</b><div class="small muted">arrive 11:25</div></div></div>
      ${kv([['Window', '11:30 – 12:30 today'], ['Parking', 'Visitor bays on P1 — tell security “2304”'], ['Access', 'Tenant will be home · call first'], ['At home', 'One cat — keep the front door closed'], ['Isolation valve', 'Under the sink, tenant has turned it off']])}
      <div class="btn-row">${btn('Navigate', { icon: 'navigation', variant: 'primary', size: 'sm', toast: 'Opening maps… (demo)' })}${btn('Message', { icon: 'message-circle', size: 'sm', sheet: 'sheet-chat' })}${btn('Call', { icon: 'phone', size: 'sm', toast: 'Calling via masked number (demo)' })}</div>
    </div>
  </div>

  <div class="card accent pad between"><div><span class="eyebrow" style="color:rgba(255,255,255,.8)">Door code — say it before you enter</span><div class="hero-num num mt-1" style="letter-spacing:.18em">4 7 1 9</div><div class="small muted mt-1">Maya’s app shows the same code. No match, no entry.</div></div>${icon('id-card', 34)}</div>

  ${card({ title: 'What the tenant reported', body: `<div class="inline" style="gap:10px">${avatar('Maya Fernandes')}<div><b class="strong">Maya Fernandes</b><div class="small muted">Tenant · reported Sat 21 Nov, 18:42</div></div></div>
    <p class="mt-3">“Water drips from the base of the kitchen mixer tap whenever it is running, and the cupboard underneath is getting damp.”</p>
    <div class="photo-grid mt-3"><div class="ph"><img src="${B}assets/img/kitchen-a.svg" alt=""></div><div class="ph"><img src="${B}assets/img/kitchen-b.svg" alt=""></div><div class="ph"><img src="${B}assets/img/kitchen-c.svg" alt=""></div></div>` })}

  ${card({ title: 'Job steps', body: timeline([
    { state: 'done', icon: 'thumbs-up', title: 'You accepted the job', body: 'Landlord approved up to AED 600 without further sign-off.', when: 'Sun 22 Nov, 08:05' },
    { state: 'now', icon: 'truck', title: 'On the way', body: 'Tenant has been told you arrive about 11:25.', when: 'Today, 10:52' },
    { icon: 'map-pin', title: 'Arrive and give the door code', extra: btn('I have arrived', { size: 'sm', variant: 'primary', icon: 'map-pin', toast: 'Arrival logged 11:24 — tenant notified (demo)' }) },
    { icon: 'camera', title: 'Before photos', body: 'At least 3: the fault, the area around it, the cupboard below.' },
    { icon: 'search', title: 'Diagnose', body: 'If the fix will exceed AED 600, stop and request more budget.' },
    { icon: 'list-checks', title: 'Record parts and labour' },
    { icon: 'camera', title: 'After photos' },
    { icon: 'pen-line', title: 'Tenant signs off in their app', body: 'Payment joins your next payout 2 working days later.' },
  ]) })}

  ${card({ title: 'Photos', body: `<div class="between small mb-2"><b class="strong">Before</b><span class="muted">0 of 3</span></div>
    <div class="photo-grid"><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button></div>
    <div class="between small mt-4 mb-2"><b class="strong">After</b><span class="muted">unlocks when the repair is recorded</span></div>
    <div class="photo-grid" style="opacity:.5"><div class="ph add">${icon('lock', 20)}</div><div class="ph add">${icon('lock', 20)}</div><div class="ph add">${icon('lock', 20)}</div></div>` })}

  ${card({ title: 'Parts and labour', headEnd: badge('Draft', ''), flush: true, body: list([
    line('Call-out and first hour', 'Standard plumbing rate', 'AED 180'),
    line('Ceramic cartridge 35 mm', 'From van stock · 1 pc', 'AED 65'),
    line('Braided flexi hose ½"', 'From van stock · 1 pc', 'AED 35'),
  ]) + `<div class="card-body stack stack-md" style="border-top:1px solid var(--line-2)">
      ${btn('Add a line', { size: 'sm', icon: 'plus', sheet: 'sheet-line' })}
      <div class="stack stack-sm"><div class="between small"><span class="muted">AED 280 of AED 600 approved limit</span><b class="num">47%</b></div>${bar(47, 'ok')}</div>
      ${kv([['Subtotal', 'AED 280.00'], ['VAT 5%', 'AED 14.00'], ['Landlord is charged', 'AED 294.00'], ['Platform fee (10% of subtotal)', '− AED 28.00'], ['You receive', 'AED 252.00 + AED 14.00 VAT']], 'total')}
    </div>` })}
</div>

<aside class="stack sticky-side">
  ${guard({ title: 'Cost and who pays', sub: 'Decided before you were booked', checks: [
    { state: 'ok', title: 'The landlord pays for this job', sub: 'A plumbing fault is the landlord’s responsibility — the tenant owes nothing.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'ok', title: 'Approved up to AED 600', sub: 'Fatima Al Hashimi pre-approved this limit on Sat 21 Nov. Estimate given to the tenant: AED 220 – 380.' },
    { state: 'warn', title: 'Above the limit? Stop and ask', sub: 'Send a variation with photos. Work beyond the limit without approval is not paid.' },
    { state: 'block', title: 'No cash, no side jobs', sub: 'Extra requests from the tenant must be raised as a new repair in their app.' },
  ] })}
  <div class="stack stack-sm">
    ${btn('Complete job', { variant: 'primary', block: true, icon: 'check', sheet: 'sheet-complete' })}
    ${btn('Need more budget', { block: true, icon: 'hand-coins', sheet: 'sheet-budget' })}
    ${btn('Cannot complete today', { block: true, variant: 'ghost', sheet: 'sheet-cannot' })}
  </div>
  ${card({ title: 'People on this job', flush: true, body: list([
    { lead: avatar('Maya Fernandes'), title: 'Maya Fernandes', sub: 'Tenant · will be home', sheet: 'sheet-chat', chev: true },
    { lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · pays · approves variations' },
    { lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', sub: 'openrent.me manager · escalations', toast: 'Calling dispatch… (demo)', chev: true },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-chat', 'Maya · tenant, Apt 2304',
    chat([{ day: 'Today' }, { who: 'sys', text: 'Numbers are masked. Messages are saved to the repair record.' }, { who: 'me', text: 'Good morning Ms Maya, I am leaving my last job now. Around 11:25 at your building.', time: '10:52' }, { text: 'Great, thank you. Visitor parking is on P1, tell security apartment 2304.', time: '10:54' }, { who: 'me', text: 'Noted, see you soon 👍', time: '10:55' }]) + composer('Message Maya…'))
  + sheet('sheet-budget', 'Request more budget',
    `<p class="small muted">Sends a variation to the landlord for approval. Work pauses until she answers; the tenant is kept informed.</p>
     ${field({ label: 'What did you find?', type: 'textarea', value: 'Tap body is corroded at the base — cartridge alone will not stop the leak. Recommend replacing the mixer.' })}
     <div class="form-grid c2">${field({ label: 'New total needed', value: '780', prefix: 'AED', inputmode: 'numeric', hint: 'Current limit AED 600' })}${field({ label: 'Extra time on site', type: 'select', options: ['None', '30 minutes', '1 hour', 'Return visit needed'], value: '30 minutes' })}</div>
     <div class="field"><span class="label">Evidence (required)</span><div class="photo-grid"><div class="ph"><img src="${B}assets/img/kitchen-b.svg" alt=""></div><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button><button type="button" class="ph add" aria-label="Add from photo library" data-toast="Library opened (demo)">${icon('image-plus', 22)}</button></div></div>
     ${callout({ tone: 'neutral', icon: 'timer', body: 'Landlords answer variations in 25 minutes on average. If there is no answer in 2 hours, your manager decides.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send for approval', { variant: 'primary', toast: 'Variation sent to Fatima — work paused (demo)' }))
  + sheet('sheet-line', 'Add a line',
    `<div class="field"><span class="label">Type</span>${ui.seg('lt', [{ id: 'part', label: 'Part' }, { id: 'labour', label: 'Labour' }, { id: 'other', label: 'Other' }], 'part', 'block')}</div>
     ${field({ label: 'Description', placeholder: 'e.g. Single-lever kitchen mixer, chrome' })}
     <div class="form-grid c2">${field({ label: 'Quantity', value: '1', inputmode: 'numeric' })}${field({ label: 'Unit price', value: '', placeholder: '0.00', prefix: 'AED', inputmode: 'decimal' })}</div>
     <label class="checkline"><input type="checkbox"> Attach supplier receipt (needed for parts over AED 200)</label>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Add line', { variant: 'primary', toast: 'Line added (demo)' }))
  + sheet('sheet-complete', 'Complete job',
    `${kv([['Before photos', badge('0 of 3', 'warn')], ['After photos', badge('0 of 3', 'warn')], ['Parts and labour', 'AED 280.00 · within limit'], ['Tested with tenant present', badge('Not yet', 'warn')]])}
     ${field({ label: 'What did you do? (shown to tenant and landlord)', type: 'textarea', placeholder: 'e.g. Replaced worn ceramic cartridge and flexi hose, tested for 10 minutes, cupboard dried.' })}
     <label class="checkline"><input type="checkbox"> Work area left clean, isolation valve reopened</label>
     ${callout({ tone: 'warn', body: 'Add your before and after photos to finish. They are your evidence if the job is ever questioned.' })}`,
    btn('Back', { attrs: { 'data-close': true } }) + btn('Send for sign-off', { variant: 'primary', cls: 'is-disabled' }))
  + sheet('sheet-cannot', 'Cannot complete today',
    `${choice('cc', 'Part needs ordering', 'Book a return visit — tenant picks the slot', true)}${choice('cc', 'No access', 'Nobody home / security refused entry · call-out fee applies after 15 minutes’ wait', false)}${choice('cc', 'Outside my trade', 'Hand back to dispatch without penalty', false)}${choice('cc', 'Unsafe to proceed', 'A manager calls you straight away', false, { badge: badge('Escalates', 'danger') })}
     ${field({ label: 'Notes', type: 'textarea', placeholder: 'What happens next?' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Submit', { variant: 'primary', toast: 'Logged — tenant and landlord updated (demo)' })),
};

module.exports = [jobs, detail];
