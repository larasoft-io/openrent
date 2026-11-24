module.exports = {
  id: 'manager', label: 'OpenRent Manager', icon: 'briefcase-business', home: 'index.html',
  nav: [
    { key: 'queue', label: 'My queue', short: 'Queue', icon: 'list-checks', href: 'index.html', tab: true, count: 14 },
    { key: 'tenancies', label: 'Tenancies', icon: 'square-kanban', href: 'tenancies.html', tab: true },
    { key: 'maintenance', label: 'Maintenance desk', short: 'Repairs', icon: 'wrench', href: 'maintenance.html', tab: true, count: 1, hot: true },
    { key: 'inbox', label: 'Inbox', icon: 'inbox', href: 'inbox.html', tab: true, count: 3, hot: true },
    { key: 'listings', label: 'Listing checks', icon: 'badge-check', href: 'listings.html', group: 'Letting', count: 5 },
    { key: 'referencing', label: 'Referencing', icon: 'user-search', href: 'referencing.html', count: 2, hot: true },
    { key: 'field', label: 'Field schedule', icon: 'map-pinned', href: 'field.html' },
    { key: 'disputes', label: 'Disputes', icon: 'scale', href: 'disputes.html', group: 'Casework', count: 2, hot: true },
    { key: 'notices', label: 'Legal notices', icon: 'scroll-text', href: 'notices.html', count: 3 },
    { key: 'people', label: 'People', icon: 'users', href: 'people.html', group: 'Network' },
    { key: 'contractors', label: 'Contractors', icon: 'hard-hat', href: 'contractors.html' },
    { key: 'reports', label: 'My reports', icon: 'chart-column', href: 'reports.html' },
  ],
};
