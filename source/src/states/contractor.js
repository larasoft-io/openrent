// Contractor (Imran Sheikh, Falcon Technical): a quiet day, slow loads and failures.
const { btn, pageHead } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading today’s jobs…')}<div class="split"><div class="stack">${sk.hero({ bar: true })}${sk.list(4, { title: '30%', pill: true })}</div><aside class="stack">${sk.card(3)}${sk.card(2)}</aside></div>`,
    empty: {
      head: `<header class="page-head"><div class="ph-text"><span class="eyebrow">No stops booked</span><h1>Morning, Imran</h1></div></header>`,
      body: empty({
        icon: 'calendar-check', title: 'No jobs booked for today',
        body: 'New job offers arrive here and by push notification. Urgent jobs are held for you for 60 minutes, routine jobs for 4 hours.',
        actions: [btn('Open my schedule', { variant: 'primary', icon: 'calendar-days', href: 'schedule.html' }), btn('Widen my service area', { icon: 'map-pin', href: 'profile.html' })],
        tips: [['zap', 'Stay on duty', 'Offers only reach contractors who are on duty and within their service area.'], ['star', 'Ratings bring more work', 'Your 4.8 average puts you near the top of the list.']],
      }),
    },
    error: failure({ title: 'We couldn’t load today’s jobs', body: 'Your booked visits haven’t changed. Customers were sent your arrival times this morning.', ref: 'ERR-2411-T0DY' }),
  }),
  jobs: () => ({
    loading: `${sk.note('Loading jobs…')}${sk.tabs(6)}<div class="grid lg2">${sk.card(3)}${sk.card(3)}${sk.card(3)}${sk.card(3)}</div>`,
    empty: {
      head: pageHead({ title: 'Jobs', sub: 'Every job from offer to payout. You always see who pays and the approved limit before you travel.' }),
      body: empty({ icon: 'clipboard-list', title: 'No jobs yet', body: 'Once your trade licence and insurance are approved, job offers from landlords and managers start appearing here.', actions: [btn('Check my approval', { variant: 'primary', icon: 'badge-check', href: 'profile.html' })] }),
    },
    error: failure({ title: 'We couldn’t load your jobs', body: 'Job offers still reach your phone by push notification while this page is down.', ref: 'ERR-2411-J0BS' }),
  }),
  notifications: () => ({
    empty: empty({ icon: 'bell', tone: 'ok', box: 'boxed', title: 'You’re all caught up', body: 'New job offers, sign-offs and payouts will show up here.' }),
  }),
};
