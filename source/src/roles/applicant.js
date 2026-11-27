module.exports = {
  id: 'applicant', label: 'Applicant', icon: 'route', home: 'index.html', notifications: 'notifications.html',
  nav: [
    { key: 'home', label: 'Move-in', icon: 'route', href: 'index.html', tab: true },
    { key: 'offers', label: 'Offers', icon: 'handshake', href: 'offers.html', tab: true },
    { key: 'documents', label: 'Referencing', short: 'Checks', icon: 'user-check', href: 'referencing.html', tab: true, count: 1, hot: true },
    { key: 'messages', label: 'Messages', icon: 'message-circle', href: 'messages.html', tab: true, count: 1, hot: true },
    { key: 'contract', label: 'Contract', icon: 'file-signature', href: 'contract.html', group: 'Moving in' },
    { key: 'costs', label: 'Move-in costs', icon: 'receipt-text', href: 'costs.html' },
    { key: 'moveday', label: 'Ejari & keys', icon: 'key-round', href: 'move-in.html' },
  ],
};
