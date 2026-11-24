module.exports = {
  id: 'tenant', label: 'Tenant', icon: 'key-round', home: 'index.html', notifications: 'notifications.html',
  nav: [
    { key: 'home', label: 'Home', icon: 'house', href: 'index.html', tab: true },
    { key: 'payments', label: 'Payments', icon: 'wallet', href: 'payments.html', tab: true },
    { key: 'repairs', label: 'Repairs', icon: 'wrench', href: 'repairs.html', tab: true, count: 1, hot: true },
    { key: 'messages', label: 'Messages', icon: 'message-circle', href: 'messages.html', tab: true, count: 2, hot: true },
    { key: 'tenancy', label: 'My tenancy', icon: 'file-text', href: 'tenancy.html', group: 'My home' },
    { key: 'renewal', label: 'Renewal', icon: 'refresh-cw', href: 'renewal.html', count: 1, hot: true },
    { key: 'household', label: 'Household', icon: 'users', href: 'household.html' },
    { key: 'setup', label: 'Home set-up', icon: 'plug', href: 'setup.html' },
    { key: 'inventory', label: 'Condition report', icon: 'camera', href: 'inventory.html' },
    { key: 'moveout', label: 'Moving out', icon: 'package', href: 'moveout.html' },
    { key: 'documents', label: 'Documents', icon: 'folder', href: 'documents.html', group: 'Records' },
    { key: 'rights', label: 'My rights', icon: 'shield-check', href: 'rights.html' },
    { key: 'profile', label: 'Profile & ID', icon: 'circle-user', href: 'profile.html' },
  ],
};
