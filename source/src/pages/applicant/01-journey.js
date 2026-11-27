const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, cover, glass, lifecycle, timeline, avatar, money, sectionHead, sheet } = ui;
const { p, B, STEPS, NOW, task } = require('./_h');

const home = {
  slug: 'index', nav: 'home', title: 'Move-in', sub: 'Tue 24 Nov 2026',
  body: () => `
<header class="page-head"><div class="ph-text"><span class="eyebrow">Good morning, Arjun</span><h1>11 days until you move in</h1><p>Your offer was accepted, referencing passed and you have both signed. One signature from your landlord unlocks the rest.</p></div></header>

<div class="split">
<div class="stack">
  <a href="move-in.html" class="card link-card" style="overflow:hidden">
    ${cover(p.img, { cls: 'banner flat', alt: p.name, tags: glass('Offer accepted', 'handshake') + glass('Move-in Sat 5 Dec', null, true), grad: `<div class="between"><div><div class="h2" style="color:#fff">${p.name}</div><div class="small" style="opacity:.85">${p.area} · 2 bed · ${p.sqft.toLocaleString('en-US')} sq ft · ${money(p.rent)} a year</div></div>${icon('chevron-right', 22)}</div>` }, B)}
    <div class="card-body">${lifecycle(STEPS, NOW)}</div>
  </a>

  ${callout({ tone: 'warn', icon: 'hourglass', title: 'Waiting for Fatima to countersign', body: 'She is travelling and lands tonight. Ejari, the building move-in permit and DEWA all start once she signs. Layla is chasing, and you do not need to do anything.', actions: `<a class="link small" href="contract.html">See the contract</a>` })}

  ${sectionHead('Your to-dos')}
  <div class="card pad">
    ${task('now', 'Add Anika’s Emirates ID', 'Everyone who lives in the flat goes on the Ejari record. Her first upload was too blurry.', btn('Upload', { size: 'sm', href: 'referencing.html#sheet-upload' }))}
    ${task('now', 'Move your movers to after 10:00', 'Executive Towers only allows moves from 09:00, and your keys are handed over at 10:00. Your movers are booked for 07:00.', btn('Fix', { size: 'sm', href: 'move-in.html' }))}
    ${task('lock', 'Apply for DEWA', 'Opens once your Ejari number exists. We will send you the link.')}
    ${task('lock', 'Book the service lift', 'Needs the building move-in permit, which Layla requests after Ejari.')}
    ${task('done', 'Book home internet', 'du installation on Sun 6 Dec, 10:00–12:00')}
  </div>

  ${sectionHead('What happened so far', 'All updates', 'notifications.html')}
  <div class="card pad">
    ${timeline([
      { state: 'now', icon: 'bell', title: 'Layla reminded Fatima to sign', body: 'Push notification and WhatsApp. Practical deadline Mon 30 Nov.', when: 'Today, 08:30' },
      { state: 'done', icon: 'vault', title: '4 rent cheques lodged for safekeeping', body: 'ADCB 004871–004874 · cheque 1 is presented on 5 Dec, once Ejari is active', when: 'Mon 23 Nov' },
      { state: 'done', icon: 'lock-keyhole', title: 'Deposit AED 6,750 received', body: 'Held in the openrent.me client account, not by your landlord · DEP-2611-0498', when: 'Sun 22 Nov, 20:31', extra: rule('OR-101', 'Deposit standard') },
      { state: 'done', icon: 'pen-line', title: 'You and Neha signed the contract', body: 'UAE Pass signatures · checked against ruleset 2026.3', when: 'Sun 22 Nov, 20:14' },
      { state: 'done', icon: 'user-check', title: 'Referencing passed', body: 'All five checks, for both of you', when: 'Fri 20 Nov' },
      { state: 'done', icon: 'handshake', title: 'Offer accepted at AED 135,000', body: 'Asking was AED 138,000 · 4 cheques · move-in 5 Dec', when: 'Wed 18 Nov, 19:22' },
    ])}
  </div>
</div>

<aside class="stack">
  <a class="card brand pad stack stack-md link-card" href="costs.html">
    <div class="between"><span class="eyebrow" style="color:rgba(255,255,255,.75)">Move-in costs</span>${badge('All paid', 'solid')}</div>
    <div><div class="hero-num">AED 7,189.20</div><div class="small muted mt-1">Deposit, Move.me fee and Ejari fee · no commission</div></div>
    <div class="small" style="opacity:.85">Plus 4 cheques of AED 33,750, held for you until each date.</div>
  </a>

  ${guard({ title: 'You are protected', sub: 'Ruleset Dubai 2026.3 applies to this tenancy', checks: [
    { state: 'ok', title: 'Keys only with a registered tenancy', sub: 'Nobody can move in, or take your rent, before Ejari is active.', rule: rule('DXB-001', 'Ejari') },
    { state: 'ok', title: 'Deposit safeguarded', sub: 'Returned within 14 days of a clean check-out.' },
    { state: 'plus', title: 'AC serviced every April', sub: 'At Fatima’s cost. The law does not require it.' },
  ], end: `<a class="link small" href="contract.html">View</a>` })}

  ${card({ title: 'Your people', flush: true, body: list([
    { href: 'thread.html', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', sub: 'Your openrent.me manager · RERA BRN 61204' },
    { href: 'messages.html', lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Landlord · travelling, back tonight' },
    { toast: 'Jun will message you the day before (demo)', lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'Field agent · condition report and keys on 5 Dec', chev: true },
  ]) })}
</aside>
</div>`,
};

const notifications = {
  slug: 'notifications', nav: 'home', title: 'Updates', sub: 'Executive Towers 1807', back: 'index.html', narrow: true,
  body: () => `
${ui.pageHead({ title: 'Updates', sub: 'Every step of your move, as it happens.' })}
<div class="card">${list([
  { href: 'contract.html', unread: true, icon: 'bell', tone: 'warn', title: 'Fatima has been reminded to sign', sub: 'Layla is chasing. You do not need to do anything.', endSub: '08:30' },
  { href: 'referencing.html', unread: true, icon: 'image-off', tone: 'danger', title: 'Anika’s Emirates ID could not be read', sub: 'The photo was too blurry. Try again in good light, with the whole card in the frame.', endSub: 'Mon' },
  { href: 'costs.html', icon: 'vault', tone: 'brand', title: 'Your 4 cheques are in safekeeping', sub: 'Lodged at our Business Bay office · receipt sent by email', endSub: 'Mon' },
  { href: 'costs.html', icon: 'lock-keyhole', tone: 'ok', title: 'Deposit received', sub: 'AED 6,750 · held in the client account', endSub: 'Sun' },
  { href: 'contract.html', icon: 'pen-line', tone: 'ok', title: 'You both signed the contract', sub: 'Waiting for your landlord’s signature', endSub: 'Sun' },
  { href: 'referencing.html', icon: 'user-check', tone: 'ok', title: 'Referencing passed', sub: 'Fatima sees “Verified”, never your documents', endSub: 'Fri' },
  { href: 'offers.html', icon: 'party-popper', tone: 'accent', title: 'Your offer was accepted', sub: 'Executive Towers 1807 · AED 135,000 · your other open offer was withdrawn', endSub: '18 Nov' },
])}</div>`,
};

module.exports = [home, notifications];
