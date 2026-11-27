const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, money, pageHead, sectionHead } = ui;
const { p, B } = require('./_h');

const sig = (name, sub, state) => ({ lead: avatar(name, { tone: name.startsWith('Fatima') ? '' : name.startsWith('Neha') ? 'c5' : 'c2' }), title: name, sub, endBadge: state === 'signed' ? badge('Signed', 'ok', { icon: 'check' }) : badge('Waiting', 'warn', { dot: true }), chev: false });

const contract = {
  slug: 'contract', nav: 'contract', title: 'Contract', sub: '2 of 3 signatures', back: 'index.html',
  body: () => `
${pageHead({ eyebrow: 'Unified tenancy contract · ruleset 2026.3', title: p.name, sub: `${p.start} to ${p.end} · ${money(p.rent)} in 4 cheques`, actions: btn('Download PDF', { icon: 'download', size: 'sm', toast: 'Contract downloaded (demo)' }) })}

<div class="split">
<div class="stack">
  ${card({ title: 'Signatures', headEnd: badge('2 of 3', 'warn'), flush: true, body: list([
    sig('Arjun Mehta', 'Lead tenant · UAE Pass · Sun 22 Nov, 20:14', 'signed'),
    sig('Neha Mehta', 'Joint tenant · UAE Pass · Sun 22 Nov, 20:14', 'signed'),
    sig('Fatima Al Hashimi', 'Landlord · sent Sun 22 Nov · reminded today, 08:30', 'waiting'),
  ]) })}
  ${callout({ tone: 'warn', icon: 'calendar-clock', title: 'Needed by Mon 30 Nov to keep 5 Dec', body: 'The building needs 3 working days to issue the move-in permit after Ejari. If Fatima signs later, Layla will agree a new move-in date with you both. Your deposit stays safeguarded whatever happens.' })}

  ${sectionHead('What you agreed')}
  ${card({ body: kv([
    ['Term', `${p.start} – ${p.end}`],
    ['Annual rent', `${money(p.rent)} · 4 cheques of ${money(33750)}`],
    ['Security deposit', `${money(p.deposit)} · 5%, held by openrent.me`],
    ['Early exit', '60 days’ notice + 2 months’ rent'],
    ['Small repairs you pay', 'Up to AED 500 per item'],
    ['Maintenance', 'Fatima maintains the structure, AC, plumbing and electrics'],
    ['Who lives there', 'Arjun, Neha and Anika · no subletting'],
    ['Extra term', 'No smoking inside the apartment'],
    ['Renewal', 'Any change must be notified by Sun 5 Sep 2027'],
  ]) })}

  <div class="paper stack stack-sm">
    <div class="between"><span class="eyebrow">Unified Tenancy Contract</span><span class="ar small">عقد إيجار موحد</span></div>
    <div class="bi"><div><span class="clause-n">Tenants</span><br>Arjun Mehta and Neha Mehta</div><div class="ar"><span class="clause-n">المستأجران</span><br>أرجون ميهتا ونيها ميهتا</div></div>
    <div class="bi"><div><span class="clause-n">Period</span><br>From 5 Dec 2026 to 4 Dec 2027</div><div class="ar"><span class="clause-n">المدة</span><br>من ٥ ديسمبر ٢٠٢٦ إلى ٤ ديسمبر ٢٠٢٧</div></div>
    <div class="bi"><div><span class="clause-n">Annual rent</span><br>AED 135,000 in four cheques</div><div class="ar"><span class="clause-n">الإيجار السنوي</span><br>١٣٥٬٠٠٠ درهم على أربعة شيكات</div></div>
    <div class="between small muted" style="padding-top:10px;border-top:1px solid var(--line-2)"><span class="inline">${icon('pen-line', 14)} Signed by both tenants · 22 Nov 2026, 20:14</span><span>Page 1 of 6</span></div>
  </div>
  <p class="small muted">The contract is bilingual. If the two versions ever differ, the Arabic text prevails.</p>
</div>

<aside class="stack">
  ${guard({ title: 'Checked before you signed', sub: '14 clauses against ruleset Dubai 2026.3', checks: [
    { state: 'ok', title: 'Nothing below the legal floor', sub: 'Every clause meets or beats Dubai tenancy law.' },
    { state: 'ok', title: 'Deposit at the cap, not over it', sub: '5% for an unfurnished home.', rule: rule('OR-101', 'Deposit standard') },
    { state: 'ok', title: 'Rent fixed for the whole year', sub: 'Any increase at renewal follows the Smart Rental Index and 90 days’ notice.', rule: rule('DXB-014', '90-day notice') },
    { state: 'plus', title: 'AC serviced every April', sub: 'At Fatima’s cost. Better than the law requires.' },
  ] })}
  ${card({ title: 'Questions about a clause?', body: `<div class="stack stack-sm small"><p>Layla is a RERA-licensed manager. She can explain any clause, or ask Fatima to change one before she signs.</p>${btn('Ask Layla', { size: 'sm', icon: 'message-circle', href: 'thread.html' })}</div>` })}
</aside>
</div>`,
};

module.exports = [contract];
