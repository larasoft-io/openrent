module.exports = {
  id: 'admin', label: 'Super Admin', icon: 'shield', home: 'index.html',
  nav: [
    { key: 'home', label: 'Overview', icon: 'layout-dashboard', href: 'index.html', tab: true },
    { key: 'rulesets', label: 'Rulesets', icon: 'scale', href: 'rulesets.html', tab: true, count: 1, hot: true },
    { key: 'finance', label: 'Client money', short: 'Finance', icon: 'landmark', href: 'finance.html', tab: true, count: 3 },
    { key: 'users', label: 'Users', icon: 'users', href: 'users.html', tab: true },
    { key: 'fees', label: 'Fees & pricing', icon: 'tags', href: 'fees.html', group: 'Commercial' },
    { key: 'revenue', label: 'Revenue', icon: 'chart-line', href: 'revenue.html' },
    { key: 'roles', label: 'Roles & permissions', icon: 'key-round', href: 'roles.html', group: 'Governance' },
    { key: 'risk', label: 'Risk & compliance', icon: 'shield-alert', href: 'risk.html', count: 5, hot: true },
    { key: 'audit', label: 'Audit log', icon: 'scroll-text', href: 'audit.html' },
    { key: 'integrations', label: 'Integrations', icon: 'plug', href: 'integrations.html', group: 'Platform', count: 1 },
    { key: 'templates', label: 'Templates', icon: 'languages', href: 'templates.html' },
    { key: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' },
  ],
};
