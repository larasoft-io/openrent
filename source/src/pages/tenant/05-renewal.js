const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, timeline, avatar, money, pageHead, sheet, field, choice, tabs, panel } = ui;

const renewal = {
  slug: 'renewal', nav: 'renewal', title: 'Renewal', sub: 'Offer received · reply by 18 Dec',
  body: () => `
${pageHead({ eyebrow: 'Contract ends 28 Feb 2027', title: 'Your renewal offer', sub: 'Fatima would like you to stay another year. We have checked her offer against Dubai’s rent rules so you can decide with confidence.' })}

<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between"><div class="inline">${avatar('Fatima Al Hashimi', { size: 'sm' })}<span class="eyebrow">Proposed by Fatima · 18 Nov</span></div>${badge('Within the law', 'ok', { icon: 'shield-check', lg: true })}</div>
    <div class="hero-num">AED 110,000<small> / year</small></div>
    <div class="grid g2 sm4">
      <div><div class="small muted">Now</div><b class="num">AED 105,000</b></div>
      <div><div class="small muted">Change</div><b class="num t-warn">+ AED 5,000 (4.8%)</b></div>
      <div><div class="small muted">Monthly</div><b class="num">AED 9,166.67</b></div>
      <div><div class="small muted">New term</div><b>1 Mar 27 – 29 Feb 28</b></div>
    </div>
    <div>
      <div class="between small"><b class="strong">Smart Rental Index · Marina Gate 1 · 1 bed</b><span class="muted">checked 18 Nov</span></div>
      <div class="meter">
        <div class="meter-track"></div>
        <div class="meter-zone" style="left:12.5%;width:13.1%"></div>
        <div class="meter-pin bottom edge-l" style="left:12.5%" data-label="You pay 105k"></div>
        <div class="meter-pin accent top" style="left:25%" data-label="Offer 110k"></div>
        <div class="meter-pin brand bottom" style="left:70%" data-label="Index average 128k"></div>
      </div>
      <p class="small muted">Your rent is <b class="strong">18% below</b> the index average for your building. In that band the law allows an increase of <b class="strong">up to 5%</b> — a maximum of <b class="strong num">AED 110,250</b>. The hatched area is the legal range.</p>
    </div>
  </div>

  ${guard({ title: 'We checked this offer for you', sub: 'Ruleset Dubai 2026.3', checks: [
    { state: 'ok', title: 'Sent in time', sub: 'Served on 18 Nov — 102 days before your contract ends. The law requires at least 90.', rule: rule('DXB-014', '90-day notice') },
    { state: 'ok', title: 'Increase is inside the cap', sub: 'AED 110,000 is AED 250 under the maximum allowed for your building.', rule: rule('DXB-009', 'Rent cap') },
    { state: 'ok', title: 'No other terms made worse', sub: 'Deposit, repairs limit, early-exit clause and pet permission are unchanged.' },
    { state: 'info', title: 'You do not have to accept', sub: 'You can counter, or stay silent — a landlord cannot evict you for declining a lawful increase without the 12-month process.', rule: rule('DXB-025B', '12-month notice') },
  ] })}

  ${card({ title: 'What would you like to do?', body: `<div class="stack stack-sm">
    ${choice('ren', 'Accept AED 110,000', 'We prepare the addendum, both sign with UAE Pass, and your Ejari renews automatically.', true)}
    ${choice('ren', 'Make a counter-offer', 'Suggest a different rent, a longer fix, or a different payment plan. Must be sent by 30 Nov.', false, { badge: badge('6 days left', 'warn') })}
    ${choice('ren', 'I plan to move out', 'No penalty at the end of the term. Tell us by 30 Dec so check-out can be arranged.', false)}
    <div class="btn-row mt-2">${btn('Counter-offer', { sheet: 'sheet-counter', icon: 'git-compare-arrows' })}${btn('Continue', { variant: 'primary', sheet: 'sheet-accept', iconEnd: 'arrow-right' })}</div></div>` })}
</div>

<aside class="stack">
  ${card({ title: 'Cost of renewing', body: kv([['Renewal pack', 'Paid by landlord'], ['Ejari renewal (government fee)', 'AED 177.75'], ['Deposit top-up', 'AED 250'], ['Agency commission', '<span class="t-ok">AED 0</span>'], ['You pay in total', 'AED 427.75']], 'total') + `<p class="small muted mt-3">Deposit stays at 5% of rent, so it rises from AED 5,250 to AED 5,500.</p>` })}
  ${card({ title: 'Timeline', body: timeline([
    { state: 'done', title: 'Offer received', when: 'Wed 18 Nov' },
    { state: 'now', icon: 'hourglass', title: 'Window to change terms closes', body: 'After this, only like-for-like renewal is possible.', when: 'Mon 30 Nov' },
    { icon: 'reply', title: 'Reply to the offer', when: 'Fri 18 Dec' },
    { icon: 'pen-line', title: 'Sign addendum · Ejari renewal', when: 'by 15 Feb 2027' },
    { icon: 'flag', title: 'New term begins', when: 'Mon 1 Mar 2027' },
  ]) })}
  ${callout({ tone: 'neutral', icon: 'circle-help', title: 'If nobody does anything', body: 'Your tenancy continues on today’s terms for another year at AED 105,000.', rules: [rule('DXB-006', 'Automatic renewal')] })}
</aside>
</div>`,
  sheets: () => sheet('sheet-counter', 'Counter-offer',
    `<div class="field"><label for="co">Your proposed annual rent</label>
       <div class="between"><span class="hero-num">AED <span data-out="co">107,500</span></span><span class="badge ok" id="co-badge">Allowed</span></div>
       <input class="range" type="range" id="co" min="105000" max="112000" step="250" value="107500">
       <div class="between micro muted"><span>105,000 · no change</span><span>Legal max 110,250</span></div>
       <span class="hint" id="co-hint">You may offer anything up to the legal maximum. Landlords cannot go above it; you would not want to either.</span></div>
     <div class="field"><span class="label">Fix the rent for</span>${ui.seg('fix', [{ id: '1', label: '1 year' }, { id: '2', label: '2 years' }, { id: '3', label: '3 years' }], '2', 'block')}</div>
     <div class="field"><span class="label">Payment plan</span>${ui.seg('pp', [{ id: '12', label: 'Monthly' }, { id: '4', label: 'Quarterly' }, { id: '2', label: '2 cheques' }], '12', 'block')}</div>
     ${field({ label: 'Note to Fatima (optional)', type: 'textarea', value: 'Happy to commit to two years if the rent is fixed for both.' })}
     <script>(function(){var r=document.getElementById('co'),b=document.getElementById('co-badge'),h=document.getElementById('co-hint');function u(){var over=+r.value>110250;b.className='badge '+(over?'danger':'ok');b.textContent=over?'Above legal cap':'Allowed';h.className='hint'+(over?' err':'');h.textContent=over?'AED '+(+r.value).toLocaleString('en-US')+' is above the AED 110,250 cap for your building, so it cannot be put in a contract.':'You may offer anything up to the legal maximum. Landlords cannot go above it; you would not want to either.';document.getElementById('co-send').classList.toggle('is-disabled',over);}r.addEventListener('input',u);document.addEventListener('DOMContentLoaded',u);})();</script>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send counter-offer', { variant: 'primary', toast: 'Counter-offer sent to Fatima', attrs: { id: 'co-send' } }))
  + sheet('sheet-accept', 'Accept renewal',
    `${kv([['New rent', money(110000) + ' / year'], ['Term', '1 Mar 2027 – 29 Feb 2028'], ['Payments', '12 direct debits of AED 9,166.67'], ['Deposit top-up', 'AED 250'], ['Ejari renewal', 'AED 177.75']])}
     <label class="checkline"><input type="checkbox" checked> I have read the renewal addendum (2 pages)</label>
     ${callout({ tone: 'brand', icon: 'fingerprint', body: 'You will sign with UAE Pass. Fatima signs next, then we renew your Ejari and send the new certificate.' })}`,
    btn('Back', { attrs: { 'data-close': true } }) + btn('Sign with UAE Pass', { variant: 'primary', icon: 'fingerprint', toast: 'Signed. Waiting for Fatima to countersign (demo)' })),
};

const rights = {
  slug: 'rights', nav: 'rights', title: 'My rights', sub: 'Ruleset Dubai 2026.3',
  body: ({ data }) => {
    const R = data.R;
    const acc = (id, extra = '') => `<details class="acc" id="r-${id}"><summary><span class="row-ico ${R[id].kind === 'std' ? 'accent' : 'brand'}" style="width:32px;height:32px;border-radius:10px">${icon(R[id].kind === 'std' ? 'plus' : 'scale', 16)}</span><span class="grow">${R[id].title}</span>${icon('chevron-down', 18, 'chev')}</summary><div class="acc-body"><p>${R[id].plain}</p>${extra ? `<p class="strong">${extra}</p>` : ''}<div class="cluster">${rule(id, R[id].src.split('·')[0].trim())}</div></div></details>`;
    return `
${pageHead({ eyebrow: 'Applies to your tenancy today', title: 'Your rights, in plain words', sub: 'These come from Dubai tenancy law and from openrent.me’s own standards. Your contract cannot take any of them away.' })}

<div class="split">
<div class="stack">
  <div class="card dark pad stack stack-md">
    <div class="between"><div class="inline" style="gap:10px"><span class="row-ico" style="background:rgba(255,255,255,.1);color:#fff">${icon('book-open-check', 20)}</span><div><b class="strong">Dubai residential ruleset 2026.3</b><div class="small muted">In force since 26 Aug 2026 · 25 rules apply to you</div></div></div>${badge('Up to date', 'ok', { dot: true })}</div>
    <div class="grid g2 sm4 small"><div><b class="display" style="font-size:22px">20</b><div class="muted">from law &amp; regulation</div></div><div><b class="display" style="font-size:22px">5</b><div class="muted">openrent.me extras</div></div><div><b class="display" style="font-size:22px">4</b><div class="muted">better terms from Fatima</div></div><div><b class="display" style="font-size:22px">0</b><div class="muted">open concerns</div></div></div>
  </div>

  <div class="section-head"><h2>Rent and renewal</h2></div>
  <div class="card">${acc('DXB-009', 'For you: maximum next year is AED 110,250.')}${acc('DXB-014', 'For you: the cut-off is Mon 30 Nov 2026.')}${acc('DXB-006')}${acc('DXB-PAY')}</div>
  <div class="section-head"><h2>Your deposit</h2></div>
  <div class="card">${acc('DXB-020')}${acc('DXB-021')}${acc('OR-101', 'For you: AED 5,250 is held under certificate DEP-2602-0311.')}</div>
  <div class="section-head"><h2>Repairs and your home</h2></div>
  <div class="card">${acc('DXB-016')}${acc('DXB-034')}${acc('OR-103', 'For you: your landlord lowered this to AED 250.')}${acc('OR-104')}${acc('DXB-019')}</div>
  <div class="section-head"><h2>Staying and leaving</h2></div>
  <div class="card">${acc('DXB-025A')}${acc('DXB-025B')}${acc('DXB-026')}${acc('DXB-027')}${acc('OR-102', 'For you: one month’s rent instead of two.')}</div>
  <div class="section-head"><h2>Living arrangements</h2></div>
  <div class="card">${acc('DXB-OCC')}${acc('DXB-024')}${acc('DXB-S04')}</div>
  <div class="section-head"><h2>If things go wrong</h2></div>
  <div class="card">${acc('DXB-RDC', 'For you: the filing fee would be AED 3,675 (3.5% of AED 105,000).')}${acc('OR-105')}</div>
</div>

<aside class="stack">
  ${card({ title: 'Rule updates', flush: true, body: list(data.rulesets.map(r => ({ icon: 'megaphone', tone: r.v === '2026.3' ? 'accent' : '', title: `${r.title}`, badge: badge(r.v, r.v === '2026.3' ? 'accent' : ''), sub: `${r.date} · applies to: ${r.scope.toLowerCase()}. ${r.summary}` }))) })}
  ${callout({ tone: 'brand', title: 'How updates reach you', body: 'When the law changes we publish a new ruleset. Some rules protect every tenancy from day one; others only affect new contracts or your next renewal. We always tell you which.' })}
  ${card({ title: 'Need help?', body: `<div class="stack stack-sm">${btn('Raise a concern with my manager', { block: true, icon: 'life-buoy', href: 'tenancy.html#sheet-concern' })}${btn('How the Rental Disputes Center works', { block: true, variant: 'ghost', href: '../rulebook.html#DXB-RDC' })}</div>` })}
  <p class="small muted">This is general information, not legal advice. The official texts are published by the Dubai Land Department and the Supreme Legislation Committee.</p>
</aside>
</div>`; },
};

module.exports = [renewal, rights];
