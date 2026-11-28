// Tenant (Maya Fernandes): what each page looks like before there is data, while it loads, and when it fails.
const { btn, pageHead, rule } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading your home…')}<div class="split"><div class="stack">${sk.card(2, { chart: true })}${sk.list(3, { title: '40%' })}</div><aside class="stack">${sk.card(3)}${sk.list(2)}</aside></div>`,
    empty: {
      head: pageHead({ eyebrow: 'Welcome to openrent.me', title: 'Hello, Maya' }),
      body: empty({
        icon: 'house-plus', dot: true, title: 'No home linked to your account yet',
        body: 'Once a landlord accepts your offer, or adds you to an existing tenancy, your contract, payments and repairs all appear here.',
        actions: [btn('Find a home', { variant: 'primary', icon: 'search', href: '../../search.html' }), btn('I have an invite code', { icon: 'ticket', toast: 'Enter the 8-character code from your landlord (demo)' })],
        tips: [['badge-check', 'Every listing is verified', 'Live Trakheesi permit and an owner checked against the title deed.'], ['wallet', 'No commission', 'A flat AED 249 tenant fee instead of 5% of the rent.']],
      }),
    },
    error: failure({ title: 'We couldn’t load your home', body: 'Your tenancy is safe and nothing has changed. Check your connection and try again; if it keeps happening, we’ll look into it.', ref: 'ERR-2411-H0ME' }),
  }),

  payments: () => ({
    loading: `${sk.note('Loading payments…')}<div class="grid g2 lg4">${sk.hero({ span: true })}${sk.stat(0)}${sk.stat(1)}</div>${sk.tabs(4)}${sk.list(6, { pill: true })}`,
    empty: {
      head: pageHead({ title: 'Payments', sub: 'Your rent schedule, receipts and deposit will live here.' }),
      body: empty({
        icon: 'wallet', title: 'No payments yet',
        body: 'Your schedule appears as soon as your contract is signed. You’ll see every instalment, its date and how it’s paid before anything leaves your account.',
        actions: [btn('How paying rent works', { icon: 'circle-help', href: '../../help.html' })],
        tips: [['calendar-check', 'Choose how you pay', 'Cheques, or monthly direct debit if your landlord offers Flexi Rent.'], ['shield-check', 'Deposit held safely', 'Your security deposit is kept in a client-money account, never by the landlord.']],
      }) + `<div class="center">${rule('DXB-PAY', 'Payment terms')}</div>`,
    },
    error: failure({ title: 'We couldn’t load your payments', body: 'Your direct debit for Tue 1 Dec is not affected, and no payment has been taken twice. Try again in a moment.', ref: 'ERR-2411-PAY7', status: 'Direct debits are running normally' }),
  }),

  repairs: () => ({
    loading: `${sk.note('Loading repairs…')}${sk.card(1)}${sk.tabs(2)}<div class="grid lg2">${sk.card(3)}${sk.card(3)}</div>`,
    empty: {
      keepActions: true,
      body: empty({
        icon: 'wrench', tone: 'ok', title: 'Nothing needs fixing',
        body: 'When something breaks, report it here with a photo. We tell you who pays before anyone is booked, and you can follow the job to the minute.',
        actions: [btn('Report a repair', { variant: 'primary', icon: 'plus', sheet: 'sheet-new-repair' }), btn('Emergency help', { icon: 'siren', sheet: 'sheet-emergency' })],
        tips: [['thermometer-snowflake', 'AC service is booked for you', 'Twice a year, included in your tenancy.']],
      }),
    },
    error: failure({ title: 'We couldn’t load your repairs', body: 'If this is an emergency, such as flooding, no power or no cooling, use Emergency help. It works even when this page doesn’t.', actions: [btn('Try again', { variant: 'primary', icon: 'refresh-cw', attrs: { 'data-state-retry': '' } }), btn('Emergency help', { icon: 'siren', sheet: 'sheet-emergency' })], ref: 'ERR-2411-MR22' }),
  }),

  messages: () => ({
    loading: `${sk.note('Loading messages…')}${sk.list(5, { avatar: true })}`,
    empty: empty({
      icon: 'message-circle', title: 'No messages yet',
      body: 'Messages with your landlord, your manager and contractors appear here. Everything stays on the record, and your phone number stays private.',
      actions: [btn('Message your manager', { variant: 'primary', icon: 'send', toast: 'New message to Layla (demo)' })],
    }),
    error: failure({ title: 'We couldn’t load your messages', body: 'Messages you send while this is down are kept and delivered as soon as we reconnect.', ref: 'ERR-2411-MSG3' }),
  }),

  notifications: () => ({
    loading: `${sk.note('Loading notifications…')}${sk.list(5)}`,
    empty: empty({ icon: 'bell', tone: 'ok', box: 'boxed', title: 'You’re all caught up', body: 'We’ll let you know when rent is due, a contractor is on the way or something needs your signature.', actions: [btn('Notification settings', { icon: 'settings', href: 'profile.html' })] }),
  }),
};
