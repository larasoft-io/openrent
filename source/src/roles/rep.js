module.exports = {
  id: 'rep', label: "Owner's Representative", icon: 'briefcase-business', home: 'index.html',
  nav: [
    { key: 'home', label: 'Portfolio', short: 'Home', icon: 'layout-dashboard', href: 'index.html', tab: true },
    { key: 'owners', label: 'Mandates', icon: 'stamp', href: 'owners.html', tab: true, count: 1, hot: true },
    { key: 'approvals', label: 'Approvals', icon: 'check-check', href: 'approvals.html', tab: true, count: 3, hot: true },
    { key: 'statements', label: 'Statements', icon: 'receipt-text', href: 'statements.html', tab: true },
  ],
};
