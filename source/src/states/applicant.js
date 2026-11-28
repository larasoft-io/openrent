// Applicant (Arjun Mehta): before an offer, while loading, and when something fails.
const { btn, pageHead } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading your move-in…')}${sk.card(2, { title: '50%' })}<div class="split"><div class="stack">${sk.list(5, { title: '35%', pill: true })}</div><aside class="stack">${sk.card(4)}</aside></div>`,
    error: failure({ title: 'We couldn’t load your move-in', body: 'Your offer, contract and payments are safe. Nothing has been sent or signed while this page was down.', ref: 'ERR-2411-MV1N' }),
  }),
  offers: () => ({
    loading: `${sk.note('Loading offers…')}${sk.tabs(2)}<div class="grid lg2">${sk.card(4, { btn: true })}${sk.card(4, { btn: true })}</div>`,
    empty: {
      head: pageHead({ title: 'Your offers', sub: 'Offers you make on homes appear here, with what happened to each one.' }),
      body: empty({
        icon: 'handshake', dot: true, title: 'You haven’t made an offer yet',
        body: 'Found a place you like? Make an offer from its listing. You can offer under the asking rent, ask for monthly payments or a different move-in date.',
        actions: [btn('Find a home', { variant: 'primary', icon: 'search', href: '../../search.html' }), btn('How offers work', { icon: 'circle-help', href: '../../how-it-works.html' })],
        tips: [['user-check', 'Get referenced once', 'Your checks are reused for every offer, and landlords never see your documents.'], ['shield-check', 'Never committed twice', 'Accepting one offer withdraws the others automatically.']],
      }),
    },
    error: failure({ title: 'We couldn’t load your offers', body: 'Your accepted offer on Executive Towers 1807 is not affected.', ref: 'ERR-2411-0FFR' }),
  }),
  messages: () => ({
    loading: `${sk.note('Loading messages…')}${sk.list(3, { avatar: true })}`,
    empty: empty({ icon: 'message-circle', title: 'No messages yet', body: 'When you make an offer, your manager and the landlord can message you here. Everything stays on the record.', actions: [btn('Ask support a question', { variant: 'primary', icon: 'life-buoy', toast: 'Support chat opens here (demo)' })] }),
  }),
  notifications: () => ({
    empty: empty({ icon: 'bell', tone: 'ok', box: 'boxed', title: 'You’re all caught up', body: 'We’ll tell you when a landlord replies to your offer, a document needs signing or a payment is due.' }),
  }),
};
