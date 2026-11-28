// Compliance officer (Hana Suzuki).
const { btn } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  kyc: () => ({
    loading: `${sk.note('Loading reviews…')}${sk.tabs(3)}${sk.list(7, { avatar: true, pill: true })}`,
    empty: { keepActions: true, body: empty({ icon: 'shield-check', tone: 'ok', title: 'No reviews waiting', body: 'Everyone who signed up today cleared automatically through UAE Pass and sanctions screening. New cases land here when a person needs to look.', actions: [btn('See cleared today', { icon: 'list-checks', toast: '12 customers cleared today (demo)' })] }) },
    error: failure({ title: 'Screening results didn’t load', body: 'Sign-ups that need a review are held, not approved, until results are back.', ref: 'ERR-2411-KYC9', status: 'Sign-ups are held safely' }),
  }),
};
