const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, lifecycle, avatar, money, pageHead, sheet, field, choice, stars, chat, composer, tabs, panel } = ui;
const B = '../../';

const job = (o) => `<a class="card pad link-card stack stack-md" href="${o.href || '#'}"${o.href ? '' : ' data-toast="Repair record opened (demo)"'}>
  <div class="between-top"><div class="inline" style="gap:10px"><span class="row-ico ${o.tone}">${icon(o.icon, 20)}</span><div><b class="strong">${o.title}</b><div class="small muted">${o.ref} · reported ${o.when}</div></div></div>${o.badge}</div>
  ${o.progress != null ? ui.stagebar(5, o.progress) : ''}
  <div class="between small"><span class="muted">${o.line}</span><span class="strong nowrap">${o.pays}</span></div></a>`;

const repairs = {
  slug: 'repairs', nav: 'repairs', title: 'Repairs', sub: 'Marina Gate 1 · Apt 2304',
  body: () => `
${pageHead({ title: 'Repairs', sub: 'Report a problem in under a minute. We tell you who pays before anyone is booked.', actions: btn('Report a repair', { icon: 'plus', variant: 'primary', sheet: 'sheet-new-repair' }) })}

<a class="card accent pad between" href="#" data-sheet="sheet-emergency"><div class="inline" style="gap:12px">${icon('siren', 24)}<div><b class="strong">Emergency?</b><div class="small muted">No cooling, flooding, no power, or you are locked out</div></div></div>${icon('chevron-right', 20)}</a>

${tabs('rep', [{ id: 'open', label: 'Open', n: 2 }, { id: 'done', label: 'Completed', n: 2 }], 'open')}
${panel('rep', 'open', `<div class="grid lg2">
  ${job({ href: 'repair-detail.html', icon: 'droplets', tone: 'info', title: 'Kitchen mixer tap leaking', ref: 'MR-2291', when: 'Sat 21 Nov', badge: badge('Today 11:30', 'info', { dot: true }), progress: 2, line: 'Scheduled · Imran, Falcon Technical', pays: 'Landlord pays' })}
  ${job({ icon: 'thermometer-snowflake', tone: 'brand', title: 'AC service (twice a year)', ref: 'MR-2207', when: 'auto-booked 20 Oct', badge: badge('Thu 3 Dec', 'brand'), progress: 2, line: 'Included in your tenancy', pays: 'Landlord pays' })}
</div>`, true)}
${panel('rep', 'done', `<div class="grid lg2">
  ${job({ icon: 'washing-machine', tone: 'ok', title: 'Washing machine not draining', ref: 'MR-2135', when: 'Mon 12 Oct', badge: badge('Completed', 'ok'), line: 'Fixed in 2 days · lint blockage', pays: 'You paid AED 180' })}
  ${job({ icon: 'door-open', tone: 'ok', title: 'Balcony door handle loose', ref: 'MR-1987', when: 'Tue 11 Aug', badge: badge('Completed', 'ok'), line: 'Fixed next day', pays: 'Landlord paid' })}
</div>`)}

${guard({ title: 'Who pays for what', sub: 'Decided before a contractor is booked', checks: [
  { state: 'ok', title: 'Your landlord pays for faults with the home', sub: 'AC, plumbing, electrics, appliances supplied with the flat, anything structural.', rule: rule('DXB-016', 'Art. 16') },
  { state: 'plus', title: 'You only cover small things up to AED 250 each', sub: 'Fatima set a lower limit than our AED 500 standard. Bulbs, blocked drains, damage you caused.', rule: rule('OR-103', 'Small repairs') },
  { state: 'info', title: 'Want to change something?', sub: 'Painting, shelves, a new lock — ask first so there is a record at move-out.', rule: rule('DXB-019', 'Art. 19') },
] })}`,
  sheets: () => sheet('sheet-new-repair', 'Report a repair',
    `<div class="field"><span class="label">What is the problem with?</span>${ui.chips(['Plumbing', 'AC / cooling', 'Electrical', 'Appliance', 'Doors & windows', 'Pests', 'Other'], 0, 'wrap')}</div>
     ${field({ label: 'Describe it', type: 'textarea', placeholder: 'e.g. Water drips from the base of the kitchen tap when it is running' })}
     <div class="field"><span class="label">Photos or video</span><div class="photo-grid"><div class="ph"><img src="${B}assets/img/kitchen-a.svg" alt=""></div><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button><button type="button" class="ph add" aria-label="Add from photo library" data-toast="Library opened (demo)">${icon('image-plus', 22)}</button></div></div>
     <div class="field"><span class="label">How urgent is it?</span>
       ${choice('urg', 'Routine', 'Fixed within 5 working days', true)}
       ${choice('urg', 'Urgent', 'Affecting daily life — within 48 hours', false)}
       ${choice('urg', 'Emergency', 'Danger, flooding, no cooling or power — within 4 hours', false, { badge: badge('24/7', 'danger') })}</div>
     <div class="field"><span class="label">Access</span><label class="checkline"><input type="checkbox" checked> I will be home — contractor should call first</label><label class="checkline"><input type="checkbox"> Enter with the building's spare key if I am out</label></div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send report', { variant: 'primary', toast: 'Repair MR-2302 reported. Fatima has been notified.' }))
  + sheet('sheet-emergency', 'Emergency help',
    `${callout({ tone: 'danger', icon: 'flame', title: 'Fire, gas or danger to life', body: 'Call 997 (Civil Defence), 998 (Ambulance) or 999 (Police) first.' })}
     ${callout({ tone: 'warn', title: 'We respond within 4 hours', body: 'If your landlord has not replied in 60 minutes we send an approved contractor ourselves, up to AED 1,500.', rules: [rule('OR-104', 'Emergency standard')] })}
     ${callout({ tone: 'brand', title: 'Your services cannot be cut off', body: 'Nobody may disconnect your water, power or cooling, or lock you out. Tell us immediately if this happens.', rules: [rule('DXB-034', 'Art. 34')] })}`,
    btn('Call 800 RENT ME', { icon: 'phone', toast: 'Dialling 800 736 863… (demo)' }) + btn('Report emergency', { variant: 'accent', toast: 'Emergency ticket opened — a manager is on it (demo)' })),
};

const detail = {
  slug: 'repair-detail', nav: 'repairs', title: 'Kitchen tap leak', sub: 'MR-2291 · scheduled today', back: 'repairs.html',
  body: () => `
<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top"><div><span class="eyebrow">MR-2291 · Plumbing</span><h1 class="mt-2">Kitchen mixer tap leaking</h1></div>${badge('Today 11:30', 'info', { dot: true, lg: true })}</div>
    ${lifecycle([{ label: 'Reported', icon: 'flag' }, { label: 'Approved', icon: 'thumbs-up' }, { label: 'Scheduled', icon: 'calendar' }, { label: 'Fixing', icon: 'wrench' }, { label: 'Signed off', icon: 'check' }], 2)}
  </div>

  <div class="card brand pad stack stack-md">
    <div class="between"><div class="inline" style="gap:12px">${avatar('Imran Sheikh', { size: 'lg', tone: 'c3' })}<div><b class="strong" style="font-size:16px">Imran Sheikh</b><div class="small muted">Falcon Technical Services · plumber</div><div class="inline small mt-1">${stars(5)}<span class="muted">4.9 · 212 jobs</span></div></div></div></div>
    <div class="card pad" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);box-shadow:none;color:#fff"><div class="between"><div><div class="small muted">Arriving</div><b class="display" style="font-size:22px">11:25 today</b></div><div class="right"><div class="small muted">Window</div><b>11:30 – 12:30</b></div></div></div>
    <div class="btn-row">${btn('Message', { icon: 'message-circle', variant: 'white', size: 'sm', sheet: 'sheet-chat' })}${btn('Call', { icon: 'phone', variant: 'on-dark', size: 'sm', toast: 'Calling via masked number (demo)' })}${btn('Reschedule', { icon: 'calendar', variant: 'on-dark', size: 'sm', sheet: 'sheet-resched' })}</div>
  </div>

  ${card({ title: 'What you reported', body: `<p>“Water drips from the base of the kitchen mixer tap whenever it is running, and the cupboard underneath is getting damp.”</p>
    <div class="photo-grid mt-3"><div class="ph"><img src="${B}assets/img/kitchen-a.svg" alt=""></div><div class="ph"><img src="${B}assets/img/kitchen-b.svg" alt=""></div><div class="ph"><img src="${B}assets/img/kitchen-c.svg" alt=""></div></div>
    <div class="mt-3">${kv([['Urgency', badge('Urgent · 48 h', 'warn')], ['Access', 'I will be home — call first'], ['Reported', 'Sat 21 Nov, 18:42']])}</div>` })}

  ${card({ title: 'Progress', body: timeline([
    { state: 'done', icon: 'flag', title: 'You reported the leak', when: 'Sat 21 Nov, 18:42' },
    { state: 'done', icon: 'thumbs-up', title: 'Fatima approved the repair', body: 'Approved in 38 minutes. Cost limit AED 600 without further approval.', when: 'Sat 21 Nov, 19:20' },
    { state: 'done', icon: 'user-check', title: 'Falcon Technical accepted the job', body: 'Trade licence and insurance verified by openrent.me.', when: 'Sun 22 Nov, 08:05' },
    { state: 'now', icon: 'truck', title: 'Imran is on the way', body: 'You will be asked to confirm his ID code at the door: <b>4 7 1 9</b>', when: 'Today, 10:52' },
    { icon: 'wrench', title: 'Repair' },
    { icon: 'star', title: 'You confirm it is fixed', body: 'Payment is only released to the contractor after you sign off.' },
  ]) })}
</div>

<aside class="stack">
  ${guard({ title: 'Cost and who pays', checks: [
    { state: 'ok', title: 'Your landlord pays for this', sub: 'A plumbing fault is the landlord’s responsibility.', rule: rule('DXB-016', 'Art. 16') },
    { state: 'info', title: 'Estimate AED 220 – 380', sub: 'Call-out and labour AED 180, cartridge or tap replacement if needed.' },
  ] })}
  ${card({ title: 'While you wait', body: `<ul class="stack stack-sm small"><li class="inline">${icon('check', 16, 't-ok')} Turn off the isolation valve under the sink</li><li class="inline">${icon('check', 16, 't-ok')} Clear the cupboard so the pipes are reachable</li><li class="inline">${icon('check', 16, 't-ok')} Keep pets in another room</li></ul>` })}
  <div class="stack stack-sm">${btn('It is fixed — sign off', { variant: 'primary', block: true, icon: 'check', sheet: 'sheet-signoff' })}${btn('Something is wrong', { block: true, toast: 'A manager will call you within 30 minutes (demo)' })}</div>
</aside>
</div>`,
  sheets: () => sheet('sheet-chat', 'Imran · Falcon Technical',
    chat([{ day: 'Today' }, { who: 'sys', text: 'Numbers are masked. Messages are saved to the repair record.' }, { text: 'Good morning Ms Maya, I am leaving my last job now. Around 11:25 at your building.', time: '10:52' }, { who: 'me', text: 'Great, thank you. Visitor parking is on P1, tell security apartment 2304.', time: '10:54' }, { text: 'Noted, see you soon 👍', time: '10:55' }]) + composer())
  + sheet('sheet-resched', 'Reschedule visit',
    `<div class="daystrip" style="margin:0;padding:2px 0">${[['Tue', 24, 1], ['Wed', 25], ['Thu', 26], ['Fri', 27], ['Sat', 28], ['Sun', 29]].map(([d, n, a]) => `<button type="button" class="day${a ? ' is-active' : ''}">${d}<b>${n}</b></button>`).join('')}</div>
     ${ui.chips(['08:00–10:00', '10:00–12:00', '12:00–14:00', '14:00–16:00', '16:00–18:00'], 1, 'wrap')}
     ${callout({ tone: 'neutral', body: 'Free to change up to 2 hours before the visit.' })}`,
    btn('Keep today', { attrs: { 'data-close': true } }) + btn('Confirm new time', { variant: 'primary', toast: 'Visit rescheduled (demo)' }))
  + sheet('sheet-signoff', 'Is the leak fixed?',
    `<div class="center stack stack-sm"><div style="display:flex;justify-content:center;transform:scale(2);margin:14px 0">${stars(5)}</div><p class="small muted">Rate Imran’s work</p></div>
     ${ui.chips(['On time', 'Tidy', 'Explained the fix', 'Friendly'], 0, 'wrap').replace('data-chips', 'data-chips data-multi')}
     ${field({ label: 'Anything to add? (optional)', type: 'textarea', placeholder: 'Your landlord sees this too' })}`,
    btn('Not yet', { attrs: { 'data-close': true } }) + btn('Yes, sign off', { variant: 'primary', toast: 'Signed off — thank you. Fatima has been notified.' })),
};

module.exports = [repairs, detail];
