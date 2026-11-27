const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, rule, stats, timeline, lineChart, donut, legend, pageHead, sectionHead, bar, avatar } = ui;
const { hbar, funnel, tile } = require('./_h');

const sla = (ic, title, pct, target, sub, chip) => `<div class="card pad stack stack-sm">
  <span class="inline small strong">${icon(ic, 16, 't-ok')}${title}</span>
  <div class="between" style="align-items:flex-end"><span class="hero-num" style="font-size:30px">${pct}<small>%</small></span>${badge('On target', 'ok', { dot: true })}</div>
  ${bar(pct, 'ok', true)}<span class="micro muted">Target ${target}% · ${sub}</span>${chip ? `<div>${chip}</div>` : ''}</div>`;

const overview = {
  slug: 'index', nav: 'home', title: 'Overview', sub: 'Tue 24 Nov 2026',
  body: () => `
${pageHead({ eyebrow: 'Platform overview · Dubai', title: 'Good morning, Sami', sub: 'Everything is running. Five things want a decision from you today.', actions: btn('Last 30 days', { icon: 'calendar-clock', size: 'sm', toast: 'Date range picker (demo)' }) + btn('Board pack', { icon: 'download', size: 'sm', toast: 'Board pack exported (demo)' }) })}

${stats([
  { label: 'Active tenancies', icon: 'house', value: '4,860', delta: '3.1%', sub: 'vs October' },
  { label: 'Rent processed', icon: 'banknote', value: '41.2M', unit: 'AED', delta: '6.4%', sub: 'Nov to date' },
  { label: 'Platform revenue', icon: 'trending-up', value: '1.11M', unit: 'AED', delta: '8.9%', sub: 'take rate 2.7%' },
  { label: 'Live listings', icon: 'megaphone', value: '312', delta: '4.0%', deltaDir: 'down', sub: 'seasonal dip' },
])}

<div class="split">
<div class="stack">
  ${card({ title: 'Needs a decision', flush: true, body: list([
    { href: 'ruleset.html', icon: 'scale', tone: 'violet', title: 'Ruleset 2027.1 draft is waiting for your sign-off', badge: badge('Product approval', 'violet'), sub: 'Legal and Compliance have approved. Illustrative sandbox change: deposit return in 10 days instead of 14.' },
    { href: 'risk.html', icon: 'shield-alert', tone: 'danger', title: '2 AML alerts must be decided today', badge: badge('Due 17:00', 'danger'), sub: 'A possible PEP match and a third-party payer. Assigned to Hana Suzuki (MLRO).' },
    { href: 'integrations.html', icon: 'plug', tone: 'warn', title: 'Credit bureau connection is degraded', badge: badge('Since 08:14', 'warn'), sub: 'Checks are queuing; 17 applications fell back to manual referencing.' },
    { href: 'risk.html#tab=risk:permits', icon: 'file-warning', tone: 'warn', title: '23 Trakheesi permits expire within 7 days', sub: 'Landlords notified. Adverts pause automatically at expiry.', extra: `<div class="mt-2">${rule('DXB-002', 'Advertising permit')}</div>` },
    { href: 'finance.html#tab=fin:recon', icon: 'landmark', tone: 'info', title: '3 unmatched bank lines · AED 26,250', sub: 'This morning’s reconciliation matched 12,418 of 12,421 lines.' },
  ]) })}

  ${card({ title: 'Rent processed', headEnd: legend([['2026', 'violet'], ['Plan', 'sand']]), body: `<div class="between-top mb-3"><div><div class="hero-num">AED 41.2M</div><div class="small muted mt-1">November to date · 78% by direct debit, 19% cheque, 3% card</div></div>${badge('+50% year on year', 'ok')}</div>
    ${lineChart({ labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ tone: 'violet', data: [27.4, 28.9, 30.2, 31.8, 32.6, 33.9, 35.1, 36.4, 37.8, 38.7, 39.9, 41.2] }, { tone: 'sand', dash: true, data: [27, 28.2, 29.4, 30.6, 31.8, 33, 34.2, 35.4, 36.6, 37.8, 39, 40.2] }], min: 24, label: 'Rent processed per month, AED millions' })}` })}

  <div class="grid lg2">
    ${card({ title: 'Letting funnel · 30 days', body: funnel([
      ['Listings published', '268', 100, 'Median 1.4 days from draft to live'],
      ['Listings with a viewing', '251', 94],
      ['Listings with an offer', '238', 89],
      ['Contracts signed', '231', 86, 'Median 11 days from live to signed'],
      ['Ejari registered', '226', 84, '5 in progress at the Ejari desk'],
    ]) })}
    ${card({ title: 'Where tenancies are today', body: `${hbar('Occupied', '4,310', 100, '')}${hbar('Renewal window (≤ 90 days)', '402', 28, 'warn')}${hbar('Move-out in progress', '148', 12, 'accent')}${hbar('Contract & Ejari', '96', 9, 'accent')}${hbar('In arrears process', '41', 5, 'danger')}
      <p class="small muted mt-3">Occupied includes renewal and arrears. 312 further units are advertised and not yet let.</p>` })}
  </div>

  ${sectionHead('Service standards')}
  <div class="grid sm3">
    ${sla('file-badge', 'Ejari in 2 working days', 98.2, 97, 'median 0.9 days', rule('DXB-001', 'Ejari'))}
    ${sla('lock-keyhole', 'Deposits back in 14 days', 96.4, 95, 'median 8.2 days', rule('OR-101', 'Deposits'))}
    ${sla('siren', 'Emergencies in 4 hours', 99.1, 98, 'median 1 h 52 m', rule('OR-104', 'Emergency'))}
  </div>
</div>

<aside class="stack">
  <a class="card dark pad stack stack-md link-card" href="rulesets.html">
    <div class="between"><div class="inline" style="gap:10px"><span class="row-ico" style="background:rgba(255,255,255,.1);color:#fff">${icon('book-open-check', 20)}</span><div><b class="strong">Dubai Residential 2026.3</b><div class="small muted">Ruleset in force since 26 Aug 2026</div></div></div>${badge('Live', 'ok', { dot: true })}</div>
    <div class="grid g2 small">${tile('25', 'rules enforced')}${tile('4,860', 'tenancies covered')}${tile('412', 'hard blocks this month')}${tile('872', 'warnings shown')}</div>
    <div class="small muted inline">${icon('arrow-right', 14)} Most-triggered: rent-increase cap, deposit cap, 90-day notice</div>
  </a>

  ${card({ title: 'Revenue by product', link: ['Details', 'revenue.html'], body: donut({ center: '1.11M', sub: 'AED · Nov', segments: [
    { label: 'Collect.me', value: 283, tone: 'violet', show: '283k' }, { label: 'Manage.me', value: 221, tone: 'brand', show: '221k' }, { label: 'Let.me', value: 208, tone: 'accent', show: '208k' },
    { label: 'Add-ons', value: 142, tone: 'gold', show: '142k' }, { label: 'Contractor fees', value: 118, tone: 'info', show: '118k' }, { label: 'List.me', value: 80, tone: 'ok', show: '80k' }, { label: 'Move.me', value: 58, tone: 'sand', show: '58k' }] }) })}

  ${card({ title: 'People on the platform', body: kv([['Landlords', '1,920'], ['Tenants', '5,410'], ['Contractor companies', '186'], ['Managers (RERA-carded)', '14'], ['Staff accounts', '41'], ['Avg. days to let', '11']]) })}

  ${card({ title: 'Recent audit events', link: ['Audit log', 'audit.html'], body: timeline([
    { state: 'done', icon: 'check', title: 'Hana Suzuki approved ruleset 2027.1 (Compliance)', when: 'Thu 19 Nov, 15:02' },
    { state: 'done', icon: 'tags', title: 'Promo code RENEW2027 created', body: 'By you · free renewal pack for Manage.me landlords', when: 'Mon 23 Nov, 11:40' },
    { state: 'warn', icon: 'eye', title: 'Read-only impersonation session', body: 'Omar Aziz (Support) viewed a tenant account for 6 min · reason: payment query', when: 'Mon 23 Nov, 16:18' },
    { state: 'done', icon: 'key-round', title: 'Role “Finance Officer” granted to Priya Nair', when: 'Sun 22 Nov, 09:05' },
  ]) })}
</aside>
</div>`,
};

module.exports = [overview];
