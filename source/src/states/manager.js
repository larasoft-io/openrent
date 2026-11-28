// OpenRent Manager (Layla Haddad): a clear queue, slow loads and failures.
const { btn, pageHead } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading your queue…')}${sk.card(2)}${sk.stats(4)}${sk.list(7, { pill: true })}`,
    empty: {
      head: pageHead({ eyebrow: 'Good morning, Layla', title: 'Nothing needs you right now', sub: 'New tasks land here sorted by service level. Anything that touches the law is flagged with the rule it comes from.' }),
      body: empty({
        icon: 'circle-check-big', tone: 'ok', title: 'Your queue is clear',
        body: 'All 312 tenancies you look after are on track. We’ll alert you the moment something needs a licensed manager.',
        actions: [btn('Review tenancies', { variant: 'primary', icon: 'files', href: 'tenancies.html' }), btn('Open reports', { icon: 'chart-column', href: 'reports.html' })],
      }),
    },
    error: failure({ title: 'We couldn’t load your queue', body: 'Emergency repairs and legal deadlines still alert you by SMS while the queue is down.', ref: 'ERR-2411-QUEU', status: 'SMS alerts are running' }),
  }),
  disputes: () => ({
    loading: `${sk.note('Loading disputes…')}${sk.stats(4)}${sk.list(6, { avatar: true, pill: true })}`,
    empty: {
      head: pageHead({ title: 'Disputes & mediation', sub: 'Most disagreements end here, on the evidence, without anyone paying a court fee.' }),
      body: empty({ icon: 'scale', tone: 'ok', title: 'No open disputes', body: 'When a landlord or tenant raises a disagreement, the case opens here with the contract, payments and condition reports already attached.', actions: [btn('See settled cases', { icon: 'history', toast: '214 settled cases (demo)' })] }),
    },
    error: failure({ title: 'We couldn’t load disputes', body: 'Decision deadlines are paused automatically while case files are unavailable.', ref: 'ERR-2411-DSPT' }),
  }),
  inbox: () => ({
    loading: `${sk.note('Loading inbox…')}${sk.list(6, { avatar: true })}`,
    empty: empty({ icon: 'inbox', tone: 'ok', title: 'Inbox zero', body: 'Messages from landlords, tenants and contractors you look after appear here.' }),
  }),
};
