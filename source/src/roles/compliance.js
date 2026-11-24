module.exports = {
  id: 'compliance', label: 'Compliance Officer', icon: 'shield-alert', home: 'index.html',
  nav: [
    { key: 'home', label: 'Risk overview', short: 'Overview', icon: 'gauge', href: 'index.html', tab: true },
    { key: 'kyc', label: 'KYC & AML', short: 'KYC', icon: 'user-search', href: 'kyc.html', tab: true, count: 7, hot: true },
    { key: 'money', label: 'Client money', short: 'Money', icon: 'landmark', href: 'money.html', tab: true },
    { key: 'reports', label: 'Reports', icon: 'file-clock', href: 'reports.html', tab: true, count: 2 },
  ],
};
