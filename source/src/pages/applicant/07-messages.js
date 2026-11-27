const ui = require('../../lib/ui');
const { icon, badge, list, avatar, pageHead, chat, composer, rule } = ui;

const messages = {
  slug: 'messages', nav: 'messages', title: 'Messages', sub: '1 waiting for a reply', narrow: true,
  body: () => `
${pageHead({ title: 'Messages', sub: 'Talk to your manager and landlord here, so everything stays on the record.' })}
<div class="card">${list([
  { href: 'thread.html', unread: true, lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', badge: badge('Manager', 'info'), sub: 'You: Can we collect keys on the 4th evening instead? Movers are booked for 7am.', endSub: '09:12' },
  { toast: 'Thread opened (demo)', lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', badge: badge('Landlord'), sub: 'You: We have both signed. Would it be possible to collect keys on the evening of the 4th?', endSub: 'Mon', chev: true },
  { toast: 'Thread opened (demo)', lead: `<span class="row-ico role">${icon('life-buoy', 20)}</span>`, title: 'openrent.me support', sub: 'Help with payments, documents or the app · replies in about 10 minutes', endSub: '8–22h', chev: true },
])}</div>
<p class="demo-note">${icon('lock', 13)} Messages are kept with your tenancy record and can be used as evidence at the Rental Disputes Center.</p>`,
};

const thread = {
  slug: 'thread', nav: 'messages', title: 'Layla Haddad', sub: 'Your openrent.me manager · Executive Towers 1807', back: 'messages.html', narrow: true,
  body: () => `
${chat([
  { day: 'Wed 18 Nov' },
  { who: 'sys', text: `${icon('party-popper', 13)} Fatima accepted your offer of AED 135,000 with 4 cheques.` },
  { text: 'Congratulations, Arjun and Neha! I am Layla, your manager until you move in and for the whole tenancy. Referencing takes about two days. I will message you if I need anything.', time: '19:40' },
  { who: 'me', text: 'Thank you! Neha’s salary certificate is from October, is that OK?', time: '20:05' },
  { text: 'It needs to be under 30 days old, so please ask her clinic for a new one. Everything else looks good.', time: '20:11' },
  { day: 'Fri 20 Nov' },
  { who: 'sys', text: `${icon('user-check', 13)} Referencing passed for both of you. The contract is ready to sign.` },
  { day: 'Today' },
  { who: 'me', text: 'Can we collect keys on the 4th evening instead? Movers are booked for 7am.', time: '09:12' },
  { who: 'sys', text: `${icon('info', 13)} Keys can only be handed over once the tenancy starts on 5 Dec and Ejari is active. Executive Towers allows moves from 09:00. <a class="link" href="move-in.html">See your options</a>` },
])}
<p class="demo-note">${icon('clock', 13)} Layla usually replies within an hour</p>
<div style="position:sticky;bottom:calc(var(--tabbar-h) + var(--sab) + 10px)">${composer('Message Layla…')}</div>`,
};

module.exports = [messages, thread];
