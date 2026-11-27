const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, timeline, avatar, pageHead, sectionHead, sheet, field, choice } = ui;
const { p, B, task } = require('./_h');

const moveIn = {
  slug: 'move-in', nav: 'moveday', title: 'Ejari & keys', sub: 'Move-in Sat 5 Dec', back: 'index.html',
  body: () => `
${pageHead({ title: 'Ejari, utilities and keys', sub: 'What happens between the last signature and your first night in Executive Towers 1807.' })}

${callout({ tone: 'warn', icon: 'truck', title: 'Your movers are booked too early', body: 'You told us they come at 07:00. Executive Towers only allows moves Saturday to Thursday, 09:00–17:00, and your keys are handed over at 10:00. A 10:30 slot works for both.', actions: btn('Change to 10:30', { size: 'sm', variant: 'primary', sheet: 'sheet-movers' }) + btn('Ask Layla', { size: 'sm', href: 'thread.html' }) })}

<div class="split">
<div class="stack">
  ${card({ title: 'Ejari registration', headEnd: badge('Waiting on signature', 'warn'), body: timeline([
    { state: 'now', icon: 'pen-line', title: 'Fatima countersigns', body: 'Needed by Mon 30 Nov to keep your move-in date.', when: 'Waiting' },
    { icon: 'send', title: 'Layla submits to Dubai REST', body: 'Same day as the signature. Everyone moving in goes on the record, so Anika’s ID is needed first.', extra: rule('DXB-OCC', 'Co-occupants') },
    { icon: 'file-badge', title: 'Ejari certificate issued', body: 'Usually within one working day. It appears in your documents and unlocks DEWA.', extra: rule('DXB-001', 'Ejari') },
  ]) })}

  ${card({ title: 'Before you move', flush: true, body: `<div class="card-body">
    ${task('wait', 'Building move-in permit', 'Layla requests it from the owners’ association with Ejari and the movers’ trade licence · 3 working days')}
    ${task('lock', 'DEWA connection', 'Apply with the Ejari number · AED 2,000 refundable deposit + AED 130 · power on the next working day')}
    ${task('lock', 'District cooling', 'Register with the cooling provider · AED 2,000 refundable deposit')}
    ${task('now', 'Movers and service lift', 'Movers booked for 07:00 · lift slot needs the permit', btn('Fix', { size: 'sm', sheet: 'sheet-movers' }))}
    ${task('done', 'Home internet', 'du · installation Sun 6 Dec, 10:00–12:00')}
  </div>` })}

  ${sectionHead('Move-in day · Sat 5 Dec')}
  <div class="card pad">${timeline([
    { icon: 'camera', title: '09:00 · Move-in condition report', body: 'Jun Reyes photographs every room with you. You both have 7 days to add anything he missed.' },
    { icon: 'key-round', title: '10:00 · Keys and access', body: '2 keys, 2 access cards and 1 parking tag. A new door code is set for you and the old one removed.' },
    { icon: 'banknote', title: 'Cheque 1 is presented', body: 'AED 33,750, only once Ejari is active. Fatima is paid the next working day.' },
    { icon: 'truck', title: '10:30 · Movers arrive', body: 'Suggested slot, inside the building’s 09:00–17:00 window.' },
  ])}</div>
</div>

<aside class="stack">
  ${guard({ title: 'Why keys wait until 5 Dec', sub: 'Your question to Layla this morning', checks: [
    { state: 'block', title: 'No keys before the tenancy starts', sub: 'The contract starts on 5 Dec, and the flat is registered to you from then. An earlier handover needs Fatima to change the start date.' },
    { state: 'block', title: 'No keys without Ejari', sub: 'Nobody moves in until the certificate number is on file.', rule: rule('DXB-001', 'Ejari') },
    { state: 'info', title: 'Want 4 Dec instead?', sub: 'Ask Fatima to start the tenancy a day earlier. Rent would rise by one day, about AED 370.' },
  ] })}
  ${card({ title: 'Your move-in team', flush: true, body: list([
    { href: 'thread.html', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla Haddad', sub: 'Ejari, permit and anything that gets stuck' },
    { toast: 'Jun will message you the day before (demo)', lead: avatar('Jun Reyes', { tone: 'c5' }), title: 'Jun Reyes', sub: 'Condition report and keys', chev: true },
    { toast: 'Calling Executive Towers front desk… (demo)', lead: `<span class="row-ico">${icon('building-2', 20)}</span>`, title: 'Executive Towers front desk', sub: 'Owners’ association · 24 hours', chev: true },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-movers', 'Move your movers',
    `${kv([['Building window', 'Sat–Thu, 09:00–17:00'], ['Keys handed over', 'Sat 5 Dec, 10:00'], ['Current booking', '<span class="t-danger">07:00 · outside the window</span>']])}
     ${choice('mv', '10:30', 'After the condition report and keys', true)}${choice('mv', '13:00', 'More time to check the flat first', false)}${choice('mv', 'Sun 6 Dec, 09:00', 'A day later, same time as the internet install', false)}
     ${field({ label: 'Moving company', value: 'Al Masar Movers L.L.C', hint: 'We send their trade licence with the permit request.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Save and tell the movers', { variant: 'primary', toast: 'Movers rebooked for 10:30 (demo)' })),
};

module.exports = [moveIn];
