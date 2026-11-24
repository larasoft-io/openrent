module.exports = {
  id: 'contractor', label: 'Contractor', icon: 'hard-hat', home: 'index.html', notifications: 'notifications.html',
  nav: [
    { key: 'home', label: 'Today', icon: 'route', href: 'index.html', tab: true },
    { key: 'jobs', label: 'Jobs', icon: 'clipboard-list', href: 'jobs.html', tab: true, count: 2, hot: true },
    { key: 'schedule', label: 'Schedule', icon: 'calendar-days', href: 'schedule.html', tab: true },
    { key: 'earnings', label: 'Earnings', icon: 'wallet', href: 'earnings.html', tab: true },
    { key: 'quotes', label: 'Quotes', icon: 'calculator', href: 'quotes.html', group: 'Work', count: 1 },
    { key: 'messages', label: 'Messages', icon: 'message-circle', href: 'messages.html', count: 2, hot: true },
    { key: 'team', label: 'Team', icon: 'users', href: 'team.html', group: 'Business' },
    { key: 'reviews', label: 'Reviews', icon: 'star', href: 'reviews.html' },
    { key: 'profile', label: 'Profile & compliance', icon: 'badge-check', href: 'profile.html' },
  ],
};
