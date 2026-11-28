// Landlord (Fatima Al Hashimi): a brand-new account, slow loads and failures.
const { btn, pageHead, rule, card } = require('../lib/ui');
const { empty, failure, failInline, sk } = require('../lib/states');

const first = pageHead({ eyebrow: 'Welcome to openrent.me', title: 'Let’s list your first home', sub: 'Verification takes about 10 minutes with UAE Pass and your title deed.' });

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading your portfolio…')}${sk.stats(4)}<div class="split"><div class="stack">${sk.list(6, { title: '30%', thumb: true, pill: true })}</div><aside class="stack">${sk.card(3, { chart: true })}</aside></div>`,
    empty: {
      head: first,
      body: empty({
        icon: 'house-plus', dot: true, title: 'No properties yet',
        body: 'Add a home and we take it from listing to keys: the advertising permit, verified applicants, the Ejari contract and rent collection.',
        actions: [btn('Add a property', { variant: 'primary', icon: 'plus', href: 'listing-new.html' }), btn('See pricing', { icon: 'receipt-text', href: '../../pricing.html' })],
        tips: [['fingerprint', '1. Verify it’s you', 'Sign in with UAE Pass, or upload a power of attorney if you act for the owner.'], ['file-check', '2. Prove ownership', 'Title deed or Oqood. We check it with the Dubai Land Department.'], ['camera', '3. Photos and rent', 'We show the Smart Rental Index range so your asking rent is in line.']],
      }) + `<div class="center cluster" style="justify-content:center">${rule('DXB-002', 'Advertising permit')}${rule('DXB-003', 'Owner check')}</div>`,
    },
    error: failure({ title: 'We couldn’t load your portfolio', body: 'Rent collection, cheque lodging and notices keep running while this page is down.', ref: 'ERR-2411-P0RT', status: 'Payments are running normally' }),
  }),
  properties: () => ({
    loading: `${sk.note('Loading properties…')}${sk.tabs(4)}${sk.props(6)}`,
    empty: {
      head: pageHead({ title: 'Properties', sub: 'Each home you add shows where it is in the 12-step rental journey, and the one thing it needs next.' }),
      body: empty({
        icon: 'building-2', title: 'Add your first property',
        body: 'It takes about 10 minutes. You can save a draft at any point and come back to it.',
        actions: [btn('Add a property', { variant: 'primary', icon: 'plus', href: 'listing-new.html' }), btn('I act for an owner', { icon: 'file-signature', toast: 'Upload a notarised power of attorney (demo)' })],
      }),
    },
    error: failure({ title: 'We couldn’t load your properties', ref: 'ERR-2411-PR0P' }),
  }),
  offers: () => ({
    loading: `${sk.note('Loading offers…')}<div class="grid lg2">${sk.card(5, { btn: true })}${sk.card(5, { btn: true })}</div>`,
    empty: {
      head: pageHead({ eyebrow: 'Asking AED 54,000 · live 14 days', title: 'No offers on Bloom Towers studio yet', sub: 'Applicants make offers after a viewing. You see their verified results side by side, never their documents.' }),
      body: empty({
        icon: 'handshake', title: 'Nothing to review yet',
        body: 'Homes in JVC at this rent usually get a first offer within 3 weeks. These can help it go faster:',
        actions: [btn('Open viewings', { variant: 'primary', icon: 'calendar-days', href: 'viewings.html' }), btn('Edit the listing', { icon: 'pencil', href: 'listing.html' })],
        tips: [['calendar-plus', 'Add evening viewing slots', 'Most applicants view after work, between 18:00 and 21:00.'], ['repeat', 'Accept monthly payments', 'Flexi Rent listings get about 30% more enquiries.']],
      }),
    },
  }),
  money: () => ({
    loading: `${sk.note('Loading money…')}${sk.stats(4)}${sk.card(1)}${sk.tabs(4)}${sk.list(6, { pill: true })}`,
    empty: {
      head: pageHead({ title: 'Money', sub: 'Rent collected, cheques in custody and payouts to your bank will appear here.' }),
      body: empty({
        icon: 'banknote', title: 'No rent collected yet',
        body: 'Your first payment shows here when a tenant pays their first instalment. We pay you within one working day of funds clearing.',
        actions: [btn('Add payout bank account', { variant: 'primary', icon: 'landmark', toast: 'Bank details are verified with a AED 1 test transfer (demo)' })],
      }),
    },
    partial: rest => ({
      keepActions: true,
      body: card({ body: failInline({ icon: 'landmark', title: 'Bank feed from Emirates NBD is delayed', body: 'Collections and cheques below are up to date. Payouts made after 09:00 today may not show yet. Nothing has gone missing; this usually clears within an hour.', extra: btn('Status page', { size: 'sm', variant: 'ghost', toast: 'status.openrent.me (demo)' }) }), flush: true }) + rest,
    }),
    error: failure({ title: 'We couldn’t load your money', body: 'Rent is still being collected and paid out on schedule. Only this view is affected.', ref: 'ERR-2411-M0NY', status: 'Payments are running normally' }),
  }),
  maintenance: () => ({
    loading: `${sk.note('Loading maintenance…')}${sk.stats(4)}${sk.list(5, { pill: true })}`,
    empty: { keepActions: true, body: empty({ icon: 'wrench', tone: 'ok', title: 'No repair requests', body: 'When a tenant reports a problem it appears here. Jobs under your spend limit are approved for you; anything bigger waits for your decision.', actions: [btn('Set spend limits', { variant: 'primary', icon: 'sliders-horizontal', sheet: 'sheet-limits' })] }) },
    error: failure({ title: 'We couldn’t load maintenance', body: 'Emergency jobs are still dispatched automatically while this page is down.', ref: 'ERR-2411-MNT4' }),
  }),
  messages: () => ({
    loading: `${sk.note('Loading messages…')}${sk.list(5, { avatar: true })}`,
    empty: empty({ icon: 'message-circle', title: 'No messages yet', body: 'Messages with tenants, applicants, your manager and contractors appear here, kept with the tenancy record.' }),
  }),
  notifications: () => ({
    empty: empty({ icon: 'bell', tone: 'ok', box: 'boxed', title: 'You’re all caught up', body: 'We’ll tell you when an offer arrives, a cheque clears or a notice deadline is close.' }),
  }),
};
