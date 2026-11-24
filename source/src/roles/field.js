module.exports = {
  id: 'field', label: 'Field Agent', icon: 'map-pin', home: 'index.html',
  nav: [
    { key: 'home', label: 'Today', icon: 'route', href: 'index.html', tab: true },
    { key: 'viewing', label: 'Viewing', icon: 'door-open', href: 'viewing.html', tab: true, count: 4 },
    { key: 'inspection', label: 'Inspection', icon: 'clipboard-check', href: 'inspection.html', tab: true },
    { key: 'handovers', label: 'Keys & handovers', short: 'Keys', icon: 'key-round', href: 'handovers.html', tab: true },
  ],
};
