const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, rule, thumb, timeline, money, pageHead, sectionHead, sheet, field, tabs, panel } = ui;
const { p, B } = require('./_h');

const offerCard = o => `<section class="card">
  <div class="card-body stack stack-md">
    <div class="inline" style="gap:12px;align-items:flex-start">${thumb(o.img, 'lg', B)}<div class="stack stack-sm" style="gap:4px"><b class="strong">${o.name}</b><div class="small muted">${o.where}</div><div>${o.badge}</div></div></div>
    ${kv(o.kv)}
    ${o.note || ''}
    ${o.actions ? `<div class="btn-row">${o.actions}</div>` : ''}
  </div>
</section>`;

const offers = {
  slug: 'offers', nav: 'offers', title: 'Offers', sub: '1 accepted · 2 closed',
  body: () => `
${pageHead({ title: 'Your offers', sub: 'Every offer you have made, and what happened to it. An accepted offer withdraws your others automatically, so you are never committed twice.', actions: btn('Find more homes', { icon: 'search', size: 'sm', href: B + 'search.html' }) })}
${tabs('of', [{ id: 'all', label: 'All', n: 3 }, { id: 'viewings', label: 'Viewings', n: 4 }], 'all')}

${panel('of', 'all', `
<div class="grid lg2">
<div class="stack">
  ${offerCard({ img: p.img, name: p.name, where: `${p.area} · 2 bed · unfurnished`, badge: badge('Accepted', 'ok', { dot: true }),
    kv: [['You offered', `<b class="num">${money(135000)}</b>`], ['Asking', money(138000)], ['Payment', '4 cheques'], ['Move-in', 'Sat 5 Dec 2026'], ['Sent', 'Tue 17 Nov, 21:05'], ['Accepted', 'Wed 18 Nov, 19:22']],
    note: callout({ tone: 'ok', icon: 'party-popper', title: 'Fatima accepted', body: '“Happy to accept AED 135,000 with four cheques. Welcome!” The advert was closed and the permit kept on file.' }),
    actions: btn('Track your move', { variant: 'primary', size: 'sm', href: 'index.html', iconEnd: 'arrow-right' }) + btn('Offer record', { size: 'sm', toast: 'Offer record downloaded (demo)', icon: 'download' }) })}

  ${offerCard({ img: 'x2.svg', name: '2 bed · Canal-side, Bay Square', where: 'Business Bay · asking AED 138,000', badge: badge('Not accepted', 'danger'),
    kv: [['You offered', money(132000)], ['Payment', '2 cheques'], ['Sent', 'Sun 15 Nov, 12:40'], ['Closed', 'Mon 16 Nov, 10:02']],
    note: callout({ tone: 'neutral', icon: 'info', title: 'The owner accepted another offer', body: 'Another applicant offered the asking price with one cheque. Owners do not see your documents when they decide, only “Verified” and your offer.' }),
    actions: btn('Similar homes', { size: 'sm', href: B + 'search.html', icon: 'search' }) })}

  ${offerCard({ img: 'x4.svg', name: '2 bed · Burj Crown', where: 'Downtown Dubai · asking AED 150,000', badge: badge('Withdrawn automatically'),
    kv: [['You offered', money(145000)], ['Payment', '4 cheques'], ['Sent', 'Tue 17 Nov, 21:20'], ['Withdrawn', 'Wed 18 Nov, 19:22']],
    note: `<p class="small muted">Withdrawn the moment Fatima accepted your offer on Executive Towers 1807. The owner was told the home is no longer needed.</p>` })}
</div>

<aside class="stack">
  ${card({ title: 'How offers work', body: `<div class="stack stack-sm small">
    <p>You can have up to <b>3 open offers</b>. Each lasts 72 hours unless the owner answers sooner.</p>
    <p>When one is accepted, the others are withdrawn for you. You then have 48 hours to pass referencing and sign.</p>
    <p>There is no holding fee and <b>no commission</b>. You only pay once you sign: the deposit, the Move.me fee and the Ejari government fee.</p>
    <div class="cluster">${rule('OR-105', 'No commission')}${rule('OR-101', 'Deposit standard')}</div></div>` })}
  ${callout({ tone: 'brand', icon: 'fingerprint', title: 'Verified once, for every offer', body: 'You and Neha verified with UAE Pass on 15 Nov. Every offer you send shows the “Verified” badge.' })}
</aside>
</div>`, true)}

${panel('of', 'viewings', `
<div class="card">${list([
  { lead: thumb(p.img, '', B), title: p.short, badge: badge('Offer accepted', 'ok'), sub: 'Sat 14 Nov, 11:00 · in person with Fatima', endSub: 'Viewed' },
  { lead: thumb('x4.svg', '', B), title: 'Burj Crown · 2 bed', sub: 'Sat 14 Nov, 15:30 · hosted by Jun Reyes', endSub: 'Viewed' },
  { lead: thumb('x2.svg', '', B), title: 'Bay Square · 2 bed', sub: 'Fri 13 Nov, 18:00 · live video viewing', endSub: 'Viewed' },
  { lead: thumb('x1.svg', '', B), title: 'Marina Promenade · 2 bed', sub: 'Thu 19 Nov, 18:30 · cancelled by you after your offer was accepted', endBadge: badge('Cancelled') },
])}</div>`)}`,
};

module.exports = [offers];
