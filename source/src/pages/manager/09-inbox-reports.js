const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, pageHead, sheet, chips, stats, chat, composer, lineChart, barChart, donut, legend, field, choice, bar } = ui;
const { search } = require('./lib/h');

const inbox = {
  slug: 'inbox', nav: 'inbox', title: 'Inbox', sub: '3 need a reply',
  body: () => `
${pageHead({ title: 'Inbox', sub: 'Concerns, questions and escalations from your book. Tenant concerns stay private from the landlord until the tenant says otherwise.' })}
${search('Search conversations')}
${chips(['All', ['Needs reply', 3], 'Concerns', 'Landlords', 'Tenants', 'Contractors'])}
<div class="split">
<div class="stack">
  <div class="hr-label">Needs a reply</div>
  <div class="card">${list([
    { sheet: 'sheet-thread', unread: true, lead: avatar('Hassan El-Sayed'), title: 'Hassan El-Sayed', badge: badge('Concern · CN-0421', 'danger'), sub: 'The upstairs AC has been out since yesterday and I have two small children. Can someone come today?', endSub: '10:31' },
    { toast: 'Thread opened (demo)', unread: true, lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', badge: badge('Landlord'), sub: 'If Hassan pays half this week, does the 30-day notice still stand? I do not want to get this wrong.', endSub: '09:58', chev: true },
    { toast: 'Thread opened (demo)', unread: true, lead: avatar('Arjun Mehta'), title: 'Arjun Mehta', badge: badge('Move-in 5 Dec', 'accent'), sub: 'Can we collect keys on the 4th evening instead? Movers are booked for 7am.', endSub: '09:12', chev: true },
  ])}</div>
  <div class="hr-label">Waiting on someone else</div>
  <div class="card">${list([
    { toast: 'Thread opened (demo)', lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Imran · Falcon Technical', badge: badge('MR-2304', 'info'), sub: 'Quote sent, AED 850 + VAT. Part is in stock, I can fit it this afternoon once approved.', endSub: '09:48', chev: true },
    { toast: 'Thread opened (demo)', lead: avatar('Olena Kovalenko'), title: 'Olena Kovalenko', badge: badge('Check-out 30 Nov', 'gold'), sub: 'Thanks Layla — DEWA final bill requested, I will upload it Sunday.', endSub: 'Mon', chev: true },
    { toast: 'Thread opened (demo)', lead: avatar('Maya Fernandes'), title: 'Maya Fernandes', badge: badge('Renewal'), sub: 'That makes sense, thank you. I will send a counter-offer for two years.', endSub: 'Mon', chev: true },
    { toast: 'Thread opened (demo)', lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun · field agent', sub: 'Bloom Towers viewings done: 3 strong, 1 no-show. Notes are on the listing.', endSub: 'Sun', chev: true },
  ])}</div>
</div>
<aside class="stack">
  ${card({ title: 'Reply times this week', body: `<div class="stack stack-md"><div class="stack stack-sm"><div class="between small"><span class="muted">Tenant concerns · target 1 working day</span><b class="num">3 h 10 m</b></div>${bar(88, 'ok')}</div><div class="stack stack-sm"><div class="between small"><span class="muted">Landlord questions · target 4 h</span><b class="num">1 h 42 m</b></div>${bar(72, 'ok')}</div><div class="stack stack-sm"><div class="between small"><span class="muted">Service cut-off reports · target 1 h</span><b class="num">none open</b></div>${bar(100, 'ok')}</div></div>` })}
  ${guard({ title: 'When a message is really a legal event', checks: [
    { state: 'block', title: 'Lock-out or services cut off', sub: 'Escalate at once — never treated as an ordinary complaint.', rule: rule('DXB-034', 'Art. 34') },
    { state: 'warn', title: 'No cooling, flooding, no power', sub: 'Emergency clock starts when the message arrives, not when you read it.', rule: rule('OR-104', 'Emergency') },
    { state: 'info', title: 'A landlord asking “can I just…”', sub: 'Answer with the lawful route and link the rule.' },
  ] })}
  ${card({ title: 'Saved replies', flush: true, body: list([
    { icon: 'message-square-quote', title: 'Part-payment during a 30-day notice', sub: 'Explains what does and does not stop the clock', toast: 'Inserted into reply (demo)' },
    { icon: 'message-square-quote', title: 'How the rent cap is calculated', sub: 'With the tenant’s own figures', toast: 'Inserted into reply (demo)' },
    { icon: 'message-square-quote', title: 'Early key collection', sub: 'Needs Ejari + condition report first', toast: 'Inserted into reply (demo)' },
  ]) })}
</aside></div>`,
  sheets: () => sheet('sheet-thread', 'Hassan El-Sayed · CN-0421',
    `${callout({ tone: 'warn', icon: 'timer', title: 'Emergency standard is running', body: 'AC failure in a townhouse with young children. Landlord has 22 minutes left to approve before you may dispatch up to AED 1,500.', rules: [rule('OR-104', 'Emergency')] })}
     ${chat([{ day: 'Today' }, { text: 'The upstairs AC has been out since yesterday and I have two small children. Can someone come today?', time: '10:31' }, { who: 'sys', text: 'Linked to MR-2304 · Imran diagnosed a failed compressor capacitor at 09:20 · quote AED 850 + VAT awaiting landlord' }, { who: 'me', text: 'Hi Hassan, I am sorry — that is not acceptable in this heat. The fault is diagnosed and the part is in stock. I am chasing approval now and will authorise it myself at 11:00 if I have not heard back.', time: '10:38' }, { text: 'Thank you. And this is separate from the rent issue, yes?', time: '10:40' }, { who: 'me', text: 'Completely separate. Repairs are the landlord’s duty whatever is happening with rent.', time: '10:41' }])}
     ${composer('Reply to Hassan…')}`,
    btn('Open MR-2304', { href: 'maintenance.html' }) + btn('Authorise repair now', { variant: 'primary', toast: 'Dispatched under the emergency standard (demo)' })),
};

const reports = {
  slug: 'reports', nav: 'reports', title: 'My reports', sub: 'November 2026',
  body: () => `
${pageHead({ title: 'My reports', sub: 'How your book is doing. Shared with your team lead on the first of each month.', actions: btn('Export PDF', { icon: 'download', size: 'sm', toast: 'Report exported (demo)' }) })}
${chips(['This month', 'Last 90 days', 'Year to date'])}
${stats([
  { label: 'Tenancies in book', icon: 'file-text', value: '142', delta: '6', sub: 'net new' },
  { label: 'Tasks inside SLA', icon: 'timer', value: '96', unit: '%', delta: '2 pts' },
  { label: 'Average time to let', icon: 'calendar-clock', value: '17', unit: 'days', delta: '3 days', deltaDir: 'down', sub: 'faster' },
  { label: 'Renewals retained', icon: 'refresh-cw', value: '88', unit: '%', delta: '4 pts' },
])}
<div class="grid lg2">
  ${card({ title: 'Time to let', headEnd: `<span class="small muted">days from live to signed</span>`, body: lineChart({ labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'brand', data: [26, 24, 23, 21, 20, 17] }, { tone: 'sand', data: [24, 24, 23, 23, 22, 22], dash: true }] }) + legend([['Your book', 'brand'], ['Team average', 'sand']]) })}
  ${card({ title: 'Work completed', headEnd: `<span class="small muted">tasks per week</span>`, body: barChart({ labels: ['W43', 'W44', 'W45', 'W46', 'W47', 'W48'], stacked: true, series: [{ tone: 'brand', data: [38, 41, 36, 44, 47, 21] }, { tone: 'accent', data: [3, 2, 4, 1, 2, 1] }] }) + legend([['Inside SLA', 'brand'], ['Late', 'accent']]) })}
  ${card({ title: 'Dispute outcomes', body: donut({ center: '23', sub: 'this year', segments: [{ label: 'Settled in mediation', value: 17, tone: 'brand', show: '17' }, { label: 'Manager decision accepted', value: 4, tone: 'gold', show: '4' }, { label: 'Referred to RDC', value: 2, tone: 'accent', show: '2' }] }) + `<p class="small muted mt-3">Average deposit dispute closed in 6 days. Deductions were reduced or rejected as fair wear and tear in 61% of claims.</p>` })}
  ${card({ title: 'Guardrails triggered in your book', flush: true, body: list([
    { icon: 'ban', tone: 'danger', title: 'Rent increase above the index cap', sub: 'Blocked before sending', end: '9', extra: `<div class="mt-2">${rule('DXB-009', 'Rent cap')}</div>` },
    { icon: 'ban', tone: 'danger', title: 'Change proposed after the 90-day cut-off', sub: 'Converted to like-for-like renewal', end: '6', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'ban', tone: 'danger', title: 'Notice with an unlawful period or reason', sub: 'Redrafted with the landlord', end: '3', extra: `<div class="mt-2">${rule('DXB-025B', '12-month notice')}</div>` },
    { icon: 'triangle-alert', tone: 'warn', title: 'Deposit deduction without photo evidence', sub: 'Returned for evidence', end: '11', extra: `<div class="mt-2">${rule('DXB-021', 'Wear and tear')}</div>` },
  ]) })}
</div>
${card({ title: 'Satisfaction', body: `<div class="grid sm3"><div><b class="display" style="font-size:26px">4.8</b><div class="small muted">tenant rating · 212 responses</div></div><div><b class="display" style="font-size:26px">4.7</b><div class="small muted">landlord rating · 64 responses</div></div><div><b class="display" style="font-size:26px">0</b><div class="small muted">complaints upheld against you</div></div></div>` })}`,
};

module.exports = [inbox, reports];
