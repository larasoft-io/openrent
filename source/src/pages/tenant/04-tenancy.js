const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, cover, glass, timeline, lifecycle, avatar, money, pageHead, sheet, field, choice, facts, qr, tabs, panel, docIco, chat, composer } = ui;
const { P } = require('../../lib/data');
const B = '../../'; const p = P.p1;

const tenancy = {
  slug: 'tenancy', nav: 'tenancy', title: 'My tenancy', sub: p.name,
  body: () => `
<div class="split">
<div class="stack">
  <div class="card" style="overflow:hidden">
    ${cover(p.img, { cls: 'banner flat', tags: glass('Occupied', 'house') + glass('Unfurnished', null, true), br: glass('1 / 14', 'images') }, B)}
    <div class="card-body stack stack-md">
      <div><h1>${p.name}</h1><p class="muted">Marina Gate 1, Al Marsa Street, ${p.area}, Dubai</p></div>
      ${facts([['bed-double', '1 bedroom'], ['bath', '2 bathrooms'], ['ruler', '812 sq ft'], ['car', '1 parking bay'], ['building', 'Floor 23'], ['waves', 'Marina view']])}
    </div>
  </div>

  ${card({ title: 'Your tenancy journey', body: lifecycle([{ label: 'Offer' }, { label: 'Verified' }, { label: 'Contract' }, { label: 'Deposit' }, { label: 'Ejari' }, { label: 'Moved in' }, { label: 'Living here', icon: 'house' }, { label: 'Renewal', icon: 'refresh-cw' }], 7) + `<p class="small muted mt-3">You are in the renewal window. <a class="link" href="renewal.html">Review Fatima’s offer</a></p>` })}

  ${tabs('ten', [{ id: 'terms', label: 'Key terms' }, { id: 'contract', label: 'Contract' }, { id: 'home', label: 'The home' }], 'terms')}
  ${panel('ten', 'terms', `
    ${card({ body: kv([['Term', '1 Mar 2026 → 28 Feb 2027 (12 months)'], ['Annual rent', money(105000)], ['Paid as', '12 direct debits of AED 8,750'], ['Security deposit', 'AED 5,250 · safeguarded'], ['Use', 'Residential · 2 occupants registered'], ['Ejari number', p.ejari], ['Contract form', 'Unified tenancy contract (DLD)']]) })}
    <div class="section-head"><h2>Better than the law requires</h2></div>
    <div class="card">${list([
      { icon: 'door-open', tone: 'accent', title: 'Leave early with 60 days’ notice', sub: 'You pay one month’s rent, not the usual two. The law gives no early-exit right at all.', badge: badge('Better', 'accent'), extra: `<div class="mt-2">${rule('OR-102', 'Fair way out')}</div>` },
      { icon: 'wrench', tone: 'accent', title: 'You cover small repairs only up to AED 250', sub: 'Our standard allows AED 500. Everything else is on your landlord.', badge: badge('Better', 'accent'), extra: `<div class="mt-2">${rule('OR-103', 'Small repairs')}</div>` },
      { icon: 'thermometer-snowflake', tone: 'accent', title: 'Two AC services a year included', sub: 'Booked automatically each April and December.', badge: badge('Extra', 'accent') },
      { icon: 'paw-print', tone: 'accent', title: 'One cat allowed', sub: 'Miso is named in the contract. Building rules still apply.', badge: badge('Extra', 'accent') },
    ])}</div>
    ${callout({ tone: 'brand', title: 'Nothing in your contract is below the legal minimum', body: 'openrent.me checks every clause against the Dubai ruleset before either side can sign. Landlords may offer more; they cannot offer less.', actions: `<a class="link small" href="rights.html">See all your rights</a>` })}`, true)}
  ${panel('ten', 'contract', `
    <div class="paper stack stack-sm">
      <div class="between"><span class="eyebrow">Unified Tenancy Contract</span><span class="ar small">عقد إيجار موحد</span></div>
      <h3>Tenancy Contract · <span class="ar">عقد الإيجار</span></h3>
      <div class="bi"><div><span class="clause-n">Landlord</span><br>Fatima Al Hashimi</div><div class="ar"><span class="clause-n">المؤجر</span><br>فاطمة الهاشمي</div></div>
      <div class="bi"><div><span class="clause-n">Tenant</span><br>Maya Fernandes</div><div class="ar"><span class="clause-n">المستأجر</span><br>مايا فرنانديز</div></div>
      <div class="bi"><div><span class="clause-n">Property</span><br>Apt 2304, Marina Gate 1, Dubai Marina · Residential</div><div class="ar"><span class="clause-n">العقار</span><br>شقة ٢٣٠٤، مارينا جيت ١، دبي مارينا · سكني</div></div>
      <div class="bi"><div><span class="clause-n">Annual rent</span><br>AED 105,000 (one hundred and five thousand dirhams)</div><div class="ar"><span class="clause-n">الإيجار السنوي</span><br>١٠٥٬٠٠٠ درهم</div></div>
      <div class="bi"><div><span class="clause-n">Additional term 4</span><br>The Tenant may terminate early with 60 days’ written notice and a payment equal to one month’s rent.</div><div class="ar"><span class="clause-n">شرط إضافي ٤</span><br>يجوز للمستأجر إنهاء العقد مبكراً بإشعار خطي مدته ٦٠ يوماً ودفع ما يعادل إيجار شهر واحد.</div></div>
      <div class="between small muted" style="padding-top:10px;border-top:1px solid var(--line-2)"><span>${icon('pen-line', 14)} Signed with UAE Pass · 24 Feb 2026</span><span>Page 1 of 6</span></div>
    </div>
    <div class="btn-row">${btn('Download PDF', { icon: 'download', toast: 'Contract downloaded (demo)' })}${btn('View all 6 pages', { icon: 'file-text', toast: 'Full contract viewer (demo)' })}</div>
    <div class="permit">${qr('ejari-' + p.ejari)}<div class="grow"><b class="strong">Ejari certificate</b><div class="small muted">No. ${p.ejari}<br>Registered 27 Feb 2026 · valid to 28 Feb 2027</div></div>${badge('Active', 'ok', { dot: true })}</div>`)}
  ${panel('ten', 'home', `
    ${card({ body: kv([['Makani number', p.makani], ['DEWA premise', p.dewa], ['Parking', 'Bay P3-217'], ['Access cards', '2 issued'], ['Cooling', 'District cooling · included in service charge'], ['Building manager', 'Marina Gate FM · 04 555 0190']]) })}
    <div class="mapbox"><img src="${B}assets/img/map-marina.svg" alt="Map showing Marina Gate 1"></div>
    <div class="grid g2">${['living-a', 'bedroom-a', 'kitchen-a', 'bath-a'].map(i => `<div class="cover"><img src="${B}assets/img/${i}.svg" alt=""></div>`).join('')}</div>`)}
</div>

<aside class="stack sticky-side">
  ${card({ title: 'Your landlord', body: `<div class="inline" style="gap:12px">${avatar('Fatima Al Hashimi', { size: 'lg' })}<div><b class="strong">Fatima Al Hashimi</b><div class="small muted">Owner · verified against title deed</div><div class="cluster mt-2">${badge('ID verified', 'ok', { icon: 'badge-check' })}${badge('Replies ~2 h', 'brand')}</div></div></div><div class="btn-row mt-4">${btn('Message', { icon: 'message-circle', href: 'thread.html', size: 'sm' })}${btn('Raise a concern', { icon: 'life-buoy', size: 'sm', sheet: 'sheet-concern' })}</div>` })}
  ${card({ title: 'Key dates', flush: true, body: list([
    { icon: 'calendar-clock', tone: 'warn', title: 'Mon 30 Nov 2026', sub: 'Last day either of you can propose changed terms for next year', extra: `<div class="mt-2">${rule('DXB-014', '90 days')}</div>` },
    { icon: 'reply', tone: 'accent', title: 'Fri 18 Dec 2026', sub: 'Reply to the renewal offer' },
    { icon: 'log-out', title: 'Wed 30 Dec 2026', sub: 'Tell us by now if you plan to leave at the end of the term' },
    { icon: 'flag', title: 'Sun 28 Feb 2027', sub: 'Contract ends — renews automatically if nobody acts', extra: `<div class="mt-2">${rule('DXB-006', 'Art. 6')}</div>` },
  ]) })}
</aside>
</div>`,
  sheets: () => sheet('sheet-concern', 'Raise a concern',
    `<p class="small muted">A manager reads every concern within one working day. Your landlord is not told until you choose.</p>
     ${choice('con', 'Repairs are not being done', '', true)}${choice('con', 'I think a charge or rent change is wrong', '', false)}${choice('con', 'Privacy or access to my home', '', false)}${choice('con', 'Services cut off or locked out', 'Treated as an emergency', false, { badge: badge('1-hour response', 'danger') })}${choice('con', 'Something else', '', false)}
     ${field({ label: 'Tell us what happened', type: 'textarea', placeholder: 'Dates and details help' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send to my manager', { variant: 'primary', toast: 'Sent to Layla Haddad — reference CN-0418 (demo)' })),
};

const messages = {
  slug: 'messages', nav: 'messages', title: 'Messages',
  body: () => `
${pageHead({ title: 'Messages', sub: 'Everything about your home in one place — and on the record if you ever need it.' })}
${ui.chips(['All', ['Unread', 2], 'Landlord', 'Repairs', 'openrent.me'])}
<div class="card">${list([
  { href: 'thread.html', unread: true, lead: avatar('Fatima Al Hashimi'), title: 'Fatima Al Hashimi', sub: 'Of course — take your time. If two years suits you better I am happy to fix the rent…', endSub: '09:41', badge: badge('Landlord') },
  { href: 'repair-detail.html#sheet-chat', unread: true, lead: avatar('Imran Sheikh', { tone: 'c3' }), title: 'Imran · Falcon Technical', sub: 'Noted, see you soon 👍', endSub: '10:55', badge: badge('MR-2291', 'info') },
  { toast: 'Thread opened (demo)', lead: avatar('Layla Haddad', { tone: 'c2' }), title: 'Layla · openrent.me', sub: 'Hi Maya, your renewal offer has been checked against the index. Shout if anything is unclear.', endSub: 'Wed', badge: badge('Manager', 'brand'), chev: true },
  { toast: 'Thread opened (demo)', lead: `<span class="row-ico">${icon('building-2', 20)}</span>`, title: 'Marina Gate FM', sub: 'Planned water shut-off: Thursday 26 November, 10:00–12:00.', endSub: '09:10', badge: badge('Building'), chev: true },
  { toast: 'Thread opened (demo)', lead: `<span class="row-ico brand">${icon('bot', 20)}</span>`, title: 'openrent.me updates', sub: 'Your November receipt is ready.', endSub: '1 Nov', chev: true },
])}</div>
<p class="demo-note">${icon('lock', 14)} Phone numbers stay private. Messages are kept for the life of the tenancy.</p>`,
};

const thread = {
  slug: 'thread', nav: 'messages', title: 'Fatima Al Hashimi', sub: 'Landlord · Marina Gate 2304', back: 'messages.html', narrow: true,
  body: () => `
${chat([
  { day: 'Wed 18 Nov' },
  { who: 'sys', text: `${icon('refresh-cw', 13)} Fatima sent a renewal offer: AED 110,000 for 1 Mar 2027 – 29 Feb 2028. <a class="link" href="renewal.html">View offer</a>` },
  { text: 'Hi Maya, hope all is well. I have sent the renewal through the app. You have been a wonderful tenant and I would love you to stay.', time: '16:12' },
  { who: 'me', text: 'Thank you Fatima, that is kind! We love the flat. Let me look at the numbers this week and come back to you.', time: '18:30' },
  { day: 'Today' },
  { who: 'me', text: 'Morning — would you consider fixing the rent for two years if we commit to staying?', time: '09:15' },
  { text: 'Of course — take your time. If two years suits you better I am happy to fix the rent at AED 110,000 for both years. Send a counter-offer in the app and I will accept it.', time: '09:41' },
  { who: 'sys', text: `${icon('shield-check', 13)} Any change must be proposed by Mon 30 Nov to count for this renewal.` },
])}
<div style="position:sticky;bottom:calc(var(--tabbar-h) + var(--sab) + 10px)">${composer('Message Fatima…')}</div>`,
};

module.exports = [tenancy, messages, thread];
