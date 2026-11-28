// Super Admin (Sami Khoury): search with no matches, slow tables and service failures.
const { btn, icon } = require('../lib/ui');
const { empty, failure, sk } = require('../lib/states');

module.exports = {
  index: () => ({
    loading: `${sk.note('Loading platform overview…')}${sk.stats(4)}<div class="split"><div class="stack">${sk.card(2, { chart: true })}${sk.list(4)}</div><aside class="stack">${sk.card(4)}</aside></div>`,
    error: failure({ title: 'We couldn’t load the overview', body: 'Analytics are rebuilding after the 06:00 integrity check. Live services, payments and logins are not affected.', ref: 'ERR-2411-ADM0', status: 'Customer-facing services are running' }),
  }),
  users: () => ({
    loading: `${sk.note('Loading users…')}${sk.stats(4)}${sk.table(8)}`,
    empty: {
      keepActions: true,
      body: `<div class="form-grid c2"><div class="input-group"><span class="affix">${icon('search', 16)}</span><input class="input" value="Al Mansoori" aria-label="Search users"></div></div>` + empty({
        icon: 'search-x', tone: 'neutral', title: 'No one matches “Al Mansoori”',
        body: 'Search looks at names, emails, phone numbers and Emirates ID. Try fewer words, or check the spelling.',
        actions: [btn('Clear search', { variant: 'primary', icon: 'x', attrs: { 'data-state-to': 'live' } }), btn('Search all roles', { icon: 'users', toast: 'Searching landlords, tenants, contractors and staff (demo)' })],
      }),
    },
    error: failure({ title: 'We couldn’t load the user directory', ref: 'ERR-2411-USR5' }),
  }),
  audit: () => ({
    loading: `${sk.note('Loading audit log…')}${sk.stats(4, 'g2 sm4')}${sk.table(9)}`,
    empty: {
      keepActions: true,
      body: empty({ icon: 'file-search', tone: 'neutral', title: 'No events match these filters', body: 'Nothing was recorded for “Impersonation” between 1 and 24 November. That is good news: no one opened another person’s account.', actions: [btn('Reset filters', { variant: 'primary', icon: 'rotate-ccw', attrs: { 'data-state-to': 'live' } })] }),
    },
    error: failure({ title: 'The audit log is taking too long to answer', body: 'New events are still being written and sealed; only searching is affected. Try a shorter date range.', ref: 'ERR-2411-AUD1', status: 'Audit writes are still being recorded' }),
  }),
};
