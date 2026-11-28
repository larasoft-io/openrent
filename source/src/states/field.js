// Field agent (Jun Reyes): works in basements and car parks, so the offline state matters most here.
const { btn, card, list, bar, badge, icon } = require('../lib/ui');
const { empty, failure, netBanner, sk } = require('../lib/states');

const queue = card({
  title: '3 items waiting to upload', headEnd: badge('Saved on this phone', 'warn'),
  flush: true,
  body: list([
    { lead: `<span class="row-ico">${icon('image', 20)}</span>`, title: 'Kitchen · 9 photos', sub: 'Taken 10:14–10:21', extra: `<div class="mt-1">${bar(0, 'accent', true)}</div>` },
    { lead: `<span class="row-ico">${icon('image', 20)}</span>`, title: 'Bedroom · 6 photos', sub: 'Taken 10:24–10:29', extra: `<div class="mt-1">${bar(0, 'accent', true)}</div>` },
    { lead: `<span class="row-ico">${icon('pen-line', 20)}</span>`, title: 'Note on balcony door seal', sub: '10:31' },
  ]),
  foot: `<span class="small muted">Uploads start by themselves when you’re back online. Photos keep their original time and location.</span>`,
});

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading today’s stops…')}${sk.hero({ bar: true })}${sk.list(6, { pill: true })}`,
    empty: {
      head: `<header class="page-head"><div class="ph-text"><span class="eyebrow">Tue 24 Nov 2026</span><h1>Morning, Jun</h1></div></header>`,
      body: empty({ icon: 'map-pin', title: 'No stops booked today', body: 'Viewings, inspections and key handovers assigned to you appear here, in route order.', actions: [btn('Mark myself available', { variant: 'primary', icon: 'zap', toast: 'Managers can now assign you same-day jobs (demo)' })] }),
    },
    error: failure({ title: 'We couldn’t load your stops', body: 'Your route was saved to this phone at 07:30, so addresses and lockbox codes still work offline.', ref: 'ERR-2411-FLD1' }),
  }),
  inspection: () => ({
    offline: rest => ({
      banner: netBanner({ title: 'No signal.', body: 'Keep going: photos and notes are saved on this phone and upload when you reconnect.' }),
      body: queue + rest,
    }),
    loading: `${sk.note('Loading the move-in report…')}${sk.card(2)}<div class="split"><div class="stack">${sk.list(6, { thumb: true })}</div><aside class="stack">${sk.card(4)}</aside></div>`,
  }),
};
