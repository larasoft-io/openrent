// Owner's representative (Daniel Okafor).
const { btn } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  approvals: () => ({
    loading: `${sk.note('Loading approvals…')}${sk.tabs(3)}${sk.list(4, { avatar: true, pill: true })}`,
    empty: { body: empty({ icon: 'stamp', tone: 'ok', title: 'Nothing waiting on owners', body: 'Anything outside your power of attorney goes to the owner from here, with the facts attached, and comes back with a dated decision.', actions: [btn('Check my mandates', { icon: 'file-signature', href: 'owners.html' })] }) },
    error: failure({ title: 'We couldn’t load approvals', ref: 'ERR-2411-APR2' }),
  }),
};
