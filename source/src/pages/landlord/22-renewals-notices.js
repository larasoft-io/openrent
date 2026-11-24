const ui = require('../../lib/ui');
const { icon, badge, btn, card, row, list, kv, callout, guard, rule, money, pageHead, sheet, tabs, panel, thumb, timeline, avatar, bar, choice, field, table, docIco, sectionHead, seg } = ui;
const { P } = require('../../lib/data');
const B = '../../';
const p1 = P.p1, p3 = P.p3, p7 = P.p7;

/* ----------------------------------------------------------------- Renewals */
const renewals = {
  slug: 'renewals', nav: 'renewals', title: 'Renewals', sub: '1 in its window · cut-off 30 Nov',
  body: () => `
${pageHead({ title: 'Renewals', sub: 'Propose next year’s terms inside the legal window and inside the legal cap. The calculator reads the Smart Rental Index for each building, so an offer you send is an offer that will stand.' })}

<div class="split">
<div class="stack">
  <div class="card pad stack">
    <div class="between-top">
      <div class="inline" style="gap:12px">${thumb(p1.img, 'lg', B)}<div><b class="strong" style="font-size:16px">${p1.name}</b><div class="small muted">Maya Fernandes · ends 28 Feb 2027</div><div class="cluster mt-2">${badge('Offer sent 18 Nov', 'accent', { dot: true })}${badge('Awaiting tenant', 'warn')}</div></div></div>
    </div>

    <div class="callout warn" style="padding:12px">${icon('hourglass', 20)}<div class="grow"><h4>6 days left to change the offer</h4><p>Any change to rent or terms must reach the tenant by <b>Mon 30 Nov 2026</b> — 90 days before the contract ends. After that, only a like-for-like renewal is possible.</p><div class="mt-2">${bar(93, 'warn', true)}</div><div class="cluster">${rule('DXB-014', '90-day notice')}</div></div></div>

    <div>
      <div class="between"><span class="eyebrow">Proposed rent for 1 Mar 2027 – 29 Feb 2028</span><span class="badge ok lg" id="rn-pct">+4.8%</span></div>
      <div class="hero-num mt-2">AED <span data-out="rn">110,000</span><small> / year</small></div>
      <input class="range mt-3" type="range" id="rn" min="105000" max="120000" step="250" value="110000" aria-label="Proposed annual rent">
      <div class="micro muted" style="position:relative;display:flex;justify-content:space-between;padding-top:10px"><span>105k</span><span class="strong t-brand nowrap" style="position:absolute;left:35%;top:0;transform:translateX(-50%);padding-top:10px;border-left:0"><i style="position:absolute;left:50%;top:-2px;width:2px;height:9px;margin-left:-1px;border-radius:1px;background:var(--brand)"></i>legal max 110,250</span><span>120k</span></div>
    </div>

    <div class="grid g2 sm4">
      <div><div class="small muted">Increase</div><b class="num" id="rn-inc">AED 5,000</b></div>
      <div><div class="small muted">Per month</div><b class="num" id="rn-mo">AED 9,167</b></div>
      <div><div class="small muted">Deposit top-up</div><b class="num" id="rn-dep">AED 250</b></div>
      <div><div class="small muted">Room under cap</div><b class="num" id="rn-room">AED 250</b></div>
    </div>

    <div>
      <div class="between small"><b class="strong">Smart Rental Index · Marina Gate 1 · 1 bed</b><span class="muted">read 24 Nov</span></div>
      <div class="meter">
        <div class="meter-track"></div>
        <div class="meter-zone" style="left:12.5%;width:13.1%"></div>
        <div class="meter-pin bottom edge-l" style="left:12.5%" data-label="Now 105k"></div>
        <div class="meter-pin accent top" id="rn-pin" style="left:25%" data-label="Your offer 110k"></div>
        <div class="meter-pin brand bottom" style="left:70%" data-label="Index average 128k"></div>
      </div>
      <p class="small muted">Current rent is <b class="strong">18% below</b> the index average of AED 128,000 for this building and unit type. That puts the tenancy in the 11–20% band: the most you may ask is <b class="strong">5%</b>, or <b class="strong num">AED 110,250</b>. The hatched area is the legal range.</p>
    </div>

    <div id="rn-ok">${guard({ title: 'This offer is lawful', sub: 'Ruleset Dubai 2026.3', checks: [
      { state: 'ok', title: 'Inside the rent cap', sub: 'At or below AED 110,250 for this building.', rule: rule('DXB-009', 'Rent cap') },
      { state: 'ok', title: 'Inside the notice window', sub: 'First served 18 Nov — 102 days before expiry. Revisions count if sent by 30 Nov.', rule: rule('DXB-014', '90-day notice') },
      { state: 'plus', title: 'You are keeping the better-than-law terms', sub: 'One-month early exit, AED 250 small-repairs limit, two AC services.' },
    ] })}</div>
    <div id="rn-block" hidden>${guard({ title: 'This amount cannot be offered', sub: 'Blocked by the Dubai ruleset', checks: [
      { state: 'block', title: 'Above the legal cap for this building', sub: '<span id="rn-over">AED 112,000 is AED 1,750 over the maximum.</span> An increase above the Decree 43/2013 band is unenforceable and the tenant could have it struck out at the RDC.', rule: rule('DXB-009', 'Rent cap') },
      { state: 'info', title: 'When could you ask for more?', sub: 'If the index average for the building rises so the rent falls into the next band (21–30% below), up to 10% becomes available at the following renewal.' },
    ] })}</div>

    <div class="btn-row">${btn('Withdraw offer', { sheet: 'sheet-withdraw' })}${btn('Send revised offer', { variant: 'primary', icon: 'send', sheet: 'sheet-revise', attrs: { id: 'rn-send' } })}</div>
  </div>

  ${card({ title: 'How the cap is worked out', headEnd: rule('DXB-009', 'Decree 43/2013'), flush: true, body: table({ stack: false, cols: [{ label: 'Rent vs index average' }, { label: 'Max rise', r: true }, { label: 'This tenancy', r: true }], rows: [
    ['Up to 10% below', '<b>0%</b>', '—'],
    ['11% – 20% below', '<b>5%</b>', badge('Your band', 'accent')],
    ['21% – 30% below', '<b>10%</b>', '—'],
    ['31% – 40% below', '<b>15%</b>', '—'],
    ['More than 40% below', '<b>20%</b>', '—'],
  ] }) + `<div class="card-body" style="padding-top:12px"><p class="small muted">The cap applies to renewals with a sitting tenant. Rent for a new tenant is whatever the market agrees.</p></div>` })}

  ${sectionHead('Coming up')}
  <div class="card">${list([
    { lead: thumb(p7.img, '', B), title: p7.short, badge: badge('0% allowed', ''), sub: 'Ends 30 Apr 2027 · window closes 30 Jan · rent is 3% below index', end: money(145000), endSub: 'no change', toast: 'Renewal planner for Zahra TH 114 (demo)', chev: true },
    { lead: thumb(P.p4.img, '', B), title: P.p4.short, badge: badge('New tenancy', 'brand'), sub: 'Starts 5 Dec 2026 · first window closes 5 Sep 2027', end: money(135000), href: 'contract.html' },
    { lead: thumb(p3.img, '', B), title: p3.short, badge: badge('No renewal', 'violet'), sub: '12-month own-use notice runs to 14 Sep 2027', end: '—', href: 'notices.html' },
    { lead: thumb(P.p5.img, '', B), title: P.p5.short, badge: badge('Tenant leaving', 'gold'), sub: 'Notice given · check-out Mon 30 Nov', end: '—', href: 'moveout.html' },
  ])}</div>
</div>

<aside class="stack">
  ${card({ title: 'Offer history', body: timeline([
    { state: 'done', icon: 'send', title: 'Offer sent — AED 110,000', body: 'Served in-app, by email and by registered e-notice.', when: 'Wed 18 Nov, 16:10' },
    { state: 'done', icon: 'eye', title: 'Opened by Maya', when: 'Wed 18 Nov, 18:22' },
    { state: 'now', icon: 'message-circle', title: 'Maya asked about a two-year fix', body: 'A counter-offer is likely. You can accept it in one tap.', when: 'Today, 09:15', extra: `<a class="link small" href="thread.html">Open conversation</a>` },
    { icon: 'hourglass', title: 'Window to change terms closes', when: 'Mon 30 Nov' },
    { icon: 'reply', title: 'Tenant’s reply due', when: 'Fri 18 Dec' },
    { icon: 'pen-line', title: 'Addendum signed · Ejari renewed', when: 'by 15 Feb 2027' },
  ]) })}
  ${callout({ tone: 'neutral', icon: 'circle-help', title: 'If nobody does anything', body: 'The tenancy rolls over for another year at today’s rent of AED 105,000 on the same terms. We prepare the Ejari renewal either way.', rules: [rule('DXB-006', 'Automatic renewal')] })}
  ${guard({ title: 'Renewal rules', checks: [
    { state: 'ok', title: 'You may offer better terms at any time', sub: 'A lower rent, a longer fix or a more flexible payment plan never needs 90 days’ notice if the tenant agrees.' },
    { state: 'block', title: 'A refusal is not a ground for eviction', sub: 'If Maya declines a lawful increase, the tenancy continues. Ending it needs a 12-month notarised notice on a legal ground.', rule: rule('DXB-025B', '12-month notice') },
    { state: 'info', title: 'Payment plan is separate from rent', sub: 'Moving between cheques and monthly instalments does not change the annual figure.', rule: rule('DXB-PAY', 'Payment terms') },
  ] })}
  ${card({ title: 'Renewal pack', body: kv([['Index check and offer', 'Included'], ['Bilingual addendum, e-signed', 'Included'], ['Ejari renewal filed for you', 'Included'], ['Price', 'AED 349 + VAT']]) })}
</aside>
</div>
<script>document.addEventListener('DOMContentLoaded',function(){var d=document,r=d.getElementById('rn'),cap=110250,cur=105000,sent=110000;function f(n){return 'AED '+Math.round(n).toLocaleString('en-US')}function g(i){return d.getElementById(i)}function u(){var v=+r.value,over=v>cap,pct=(v-cur)/cur*100;g('rn-pct').textContent=(v>cur?'+':'')+pct.toFixed(1)+'%';g('rn-pct').className='badge lg '+(over?'danger':v===cur?'':'ok');g('rn-inc').textContent=f(v-cur);g('rn-mo').textContent=f(v/12);g('rn-dep').textContent=f((v-cur)*0.05);g('rn-room').textContent=over?'Over by '+f(v-cap).replace('AED ',''):f(cap-v);g('rn-room').className='num'+(over?' t-danger':'');var pin=g('rn-pin');pin.style.left=((v-100000)/40000*100)+'%';pin.setAttribute('data-label','Your offer '+(v/1000).toFixed(v%1000?1:0)+'k');g('rn-ok').hidden=over;g('rn-block').hidden=!over;g('rn-over').textContent=f(v)+' is '+f(v-cap)+' over the maximum.';var b=g('rn-send');b.classList.toggle('is-disabled',over||v===sent);b.querySelector('span').textContent=over?'Blocked — above legal cap':v===sent?'Offer already sent':'Send revised offer';}r.addEventListener('input',u);u();});</script>`,
  sheets: () => sheet('sheet-revise', 'Send revised offer',
    `<p class="small muted">This replaces the offer of 18 Nov. Maya is notified straight away and keeps until 18 Dec to reply.</p>
     <div class="field"><span class="label">Fix the rent for</span>${seg('rfix', [{ id: '1', label: '1 year' }, { id: '2', label: '2 years' }, { id: '3', label: '3 years' }], '1', 'block')}</div>
     <div class="field"><span class="label">Payment plans you will accept</span><label class="checkline"><input type="checkbox" checked> 12 monthly direct debits (Flexi Rent)</label><label class="checkline"><input type="checkbox" checked> 4 quarterly payments</label><label class="checkline"><input type="checkbox"> 1 or 2 cheques</label></div>
     ${field({ label: 'Note to Maya (optional)', type: 'textarea', value: 'Happy to fix this for two years if that helps you decide.' })}
     ${callout({ tone: 'brand', body: 'Checked against ruleset 2026.3 at the moment of sending. The check result is stored with the offer.', rules: [rule('DXB-009', 'Rent cap'), rule('DXB-014', '90-day notice')] })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send to tenant', { variant: 'primary', icon: 'send', toast: 'Revised offer sent to Maya (demo)' }))
  + sheet('sheet-withdraw', 'Withdraw the offer',
    `${callout({ tone: 'neutral', title: 'The tenancy would renew on today’s terms', body: 'With no offer on the table by 30 Nov, the contract continues at AED 105,000 for another year.', rules: [rule('DXB-006', 'Automatic renewal')] })}
     ${callout({ tone: 'warn', body: 'Withdrawing an offer is not a way to end the tenancy. That needs a 12-month notarised notice.', rules: [rule('DXB-025B', '12-month notice')] })}`,
    btn('Keep offer', { attrs: { 'data-close': true } }) + btn('Withdraw', { variant: 'danger', toast: 'Offer withdrawn (demo)' })),
};

/* ------------------------------------------------------------------ Notices */
const locked = (title, why, chip) => `<div class="choice is-locked"><span class="row-ico danger" style="width:22px;height:22px;border-radius:50%;margin-top:0">${icon('ban', 13)}</span><span class="grow"><b>${title}</b><span class="d">${why}</span>${chip ? `<span class="cluster mt-2">${chip}</span>` : ''}</span></div>`;

const notices = {
  slug: 'notices', nav: 'notices', title: 'Legal notices', sub: '2 active · both properly served',
  body: () => `
${pageHead({ title: 'Legal notices', sub: 'A notice only counts if it has the right reason, the right notice period and the right delivery. We draft from the legal template, serve through a notary public and keep the proof.', actions: btn('New notice', { variant: 'primary', icon: 'plus', sheet: 'sheet-new-notice' }) })}

<div class="split">
<div class="stack">
  <div class="card" style="overflow:hidden">
    <div class="card-body stack stack-md">
      <div class="between-top"><div class="inline" style="gap:12px">${thumb(p3.img, 'lg', B)}<div><span class="eyebrow">12-month notice · NP-2026-094417</span><div class="h2 mt-1">${p3.name}</div><div class="small muted">James & Claire Whitfield · ${p3.area}</div></div></div></div>
      <div class="cluster">${badge('Served', 'ok', { icon: 'mail-check' })}${badge('Owner’s own use', 'violet')}${badge('Acknowledged by tenant', 'brand')}</div>
      <div class="grid g2 sm4">
        <div><div class="small muted">Served</div><b>2 Sep 2026</b></div>
        <div><div class="small muted">Vacate by</div><b>14 Sep 2027</b></div>
        <div><div class="small muted">Notice given</div><b>377 days</b></div>
        <div><div class="small muted">Remaining</div><b class="t-accent">294 days</b></div>
      </div>
      <div class="stack stack-sm"><div class="between small"><span class="muted">Day 83 of 377</span><span class="strong">22%</span></div>${bar(22, 'accent')}</div>
    </div>
    <div class="card-foot" style="flex-wrap:wrap">${btn('Notice PDF', { size: 'sm', icon: 'download', toast: 'Notice downloaded (demo)' })}${btn('Proof of delivery', { size: 'sm', icon: 'file-check', toast: 'Notary notification report downloaded (demo)' })}${btn('Withdraw', { size: 'sm', variant: 'ghost', sheet: 'sheet-withdraw-notice' })}</div>
  </div>

  <div class="grid lg2">
  ${card({ title: 'What was served', body: kv([['Type', 'Eviction at expiry of term'], ['Ground', 'Owner’s own use — your son, Saeed (first-degree relative)'], ['Notice period', '12 months minimum · you gave 377 days'], ['Delivery', 'Notary public + registered mail'], ['Language', 'Arabic and English'], ['Tenancy affected', 'Ejari ' + p3.ejari]]) })}
  ${card({ title: 'Timeline', body: timeline([
    { state: 'done', icon: 'pen-line', title: 'Drafted from the legal template', body: 'Ground and dates validated against the ruleset.', when: 'Fri 28 Aug 2026' },
    { state: 'done', icon: 'stamp', title: 'Attested by notary public', body: 'Dubai Courts e-notary · your UAE Pass signature.', when: 'Tue 1 Sep' },
    { state: 'done', icon: 'mail-check', title: 'Served on the tenants', body: 'Registered mail signed for by James Whitfield.', when: 'Wed 2 Sep' },
    { state: 'now', icon: 'hourglass', title: 'Notice running', body: 'The tenancy continues normally: rent, repairs and all tenant rights are unchanged.' },
    { icon: 'clipboard-check', title: 'Check-out and deposit return', when: 'by Tue 14 Sep 2027' },
    { icon: 'lock', title: 'Re-letting locked', body: 'Until 14 Sep 2029.' },
  ]) })}
  </div>

  ${guard({ title: 'What this notice commits you to', sub: 'Shown before you signed, and recorded with the notice', checks: [
    { state: 'warn', title: 'You cannot let the villa to anyone else for 2 years', sub: 'From recovery on 14 Sep 2027. openrent.me locks the unit from listing until 14 Sep 2029; letting it elsewhere exposes you to a compensation claim.', rule: rule('DXB-026', 'Art. 26') },
    { state: 'ok', title: 'The reason has to be real', sub: 'You declared that Saeed owns no other suitable home in Dubai. The RDC can ask for proof.', rule: rule('DXB-025B', 'Art. 25(2)') },
    { state: 'ok', title: 'Nothing changes for the tenants until then', sub: 'No early pressure to leave, no extra rent, repairs as usual. They may leave earlier if they choose.', rule: rule('DXB-034', 'Art. 34') },
    { state: 'info', title: 'If you sell instead', sub: 'A buyer takes over this tenancy and this notice’s ground no longer applies as stated — speak to your manager first.', rule: rule('DXB-027', 'Art. 28') },
  ] })}

  <div class="card">
    <div class="card-head"><h3>30-day notice — unpaid rent</h3>${badge('Day 15 of 30', 'warn')}</div>
    <div class="mt-2">${list([{ lead: thumb(p7.img, '', B), title: p7.name, sub: 'Hassan El-Sayed · NP-2026-118834 · served 9 Nov via notary public · AED 36,250 to be paid by Wed 9 Dec', extra: `<div class="cluster mt-2">${rule('DXB-025A', '30-day notice')}<a class="link small" href="arrears.html">Open arrears case</a></div>` }])}</div>
  </div>

  ${card({ title: 'Delivery records', flush: true, body: list([
    { lead: docIco('PDF'), title: 'Notary notification report — NP-2026-118834', sub: 'Zahra TH 114 · delivered Tue 10 Nov 2026, 11:42 · registered mail RM 4471 9920 AE', toast: 'Report downloaded (demo)' },
    { lead: docIco('PDF'), title: 'Email and in-app read receipt', sub: 'Zahra TH 114 · opened by Hassan El-Sayed 9 Nov, 19:05', toast: 'Receipt downloaded (demo)' },
    { lead: docIco('PDF'), title: 'Notary notification report — NP-2026-094417', sub: 'Palma Villa 27 · delivered Wed 2 Sep 2026, 10:15 · signed J. Whitfield', toast: 'Report downloaded (demo)' },
    { lead: docIco('PDF', 'sig'), title: 'Tenant acknowledgement', sub: 'Palma Villa 27 · signed with UAE Pass 3 Sep 2026', toast: 'Acknowledgement downloaded (demo)' },
  ]) })}
</div>

<aside class="stack">
  ${card({ title: 'Notices we can serve for you', flush: true, body: list([
    { icon: 'calendar-clock', tone: 'brand', title: '12 months — recovering the home at expiry', sub: 'Own or close family use, sale, demolition, major works', sheet: 'sheet-new-notice', chev: true },
    { icon: 'circle-alert', tone: 'warn', title: '30 days — unpaid rent', sub: 'After a returned cheque or missed instalment', sheet: 'sheet-new-notice', chev: true },
    { icon: 'triangle-alert', tone: 'warn', title: 'Breach of contract', sub: 'Unauthorised sublet, unlawful use, serious damage', sheet: 'sheet-new-notice', chev: true },
    { icon: 'refresh-cw', tone: 'accent', title: '90 days — change of terms at renewal', sub: 'Handled in Renewals', href: 'renewals.html' },
  ]) })}
  ${guard({ title: 'Notices we will not generate', checks: [
    { state: 'block', title: 'Leave in 30, 60 or 90 days “because I say so”', sub: 'There is no no-fault eviction on short notice in Dubai.', rule: rule('DXB-025B', '12 months') },
    { state: 'block', title: 'Eviction for refusing a rent increase', sub: 'Not a legal ground. A lawful increase is settled by the index, not by notice.', rule: rule('DXB-009', 'Rent cap') },
    { state: 'block', title: 'Notice by WhatsApp or email only', sub: 'It must go through a notary public or registered mail to count.', rule: rule('DXB-025A', 'Art. 25') },
  ] })}
  ${card({ title: 'Notary service', body: kv([['Drafting, translation, attestation, delivery', 'AED 449 + VAT'], ['Notary public fees', 'At cost · about AED 125'], ['Registered mail', 'Included'], ['Turnaround', '2 working days']]) + `<p class="small muted mt-3">You sign with UAE Pass — no visit to a typing centre or court.</p>` })}
</aside>
</div>`,
  sheets: () => sheet('sheet-new-notice', 'New legal notice',
    `${field({ label: 'Property', type: 'select', options: [P.p1.short + ' — Maya Fernandes', p7.short + ' — Hassan El-Sayed', p3.short + ' — J. & C. Whitfield', P.p4.short + ' — A. & N. Mehta'], value: P.p1.short + ' — Maya Fernandes' })}
     <div class="hr-label">At the end of the term · 12 months’ notice</div>
     ${choice('ntc', 'I or a first-degree relative will live there', 'You must own no other suitable home. Re-letting is locked for 2 years.', true, { end: rule('DXB-026', '') })}
     ${choice('ntc', 'I am selling the property', 'A sale agreement or listing may be requested as evidence.', false)}
     ${choice('ntc', 'Demolition or reconstruction', 'Needs the relevant Dubai Municipality permits.', false)}
     ${choice('ntc', 'Major works that cannot be done while occupied', 'Needs a technical report approved by Dubai Municipality.', false)}
     <div class="hr-label">During the term</div>
     ${choice('ntc', 'Rent unpaid — 30-day notice', 'Only available when an instalment is overdue. None is overdue on this tenancy.', false, { locked: true })}
     ${choice('ntc', 'Breach of contract — 30 days to put right', 'Unauthorised sublet or shared housing, unlawful use, serious damage.', false, { end: rule('DXB-S04', '') })}
     <div class="hr-label">Not available</div>
     ${locked('End the tenancy to re-let at a higher rent', 'Not a legal ground. The rent cap applies at renewal instead.', rule('DXB-009', 'Rent cap'))}
     ${locked('Shorter than 12 months at expiry', 'The earliest lawful vacate date for this tenancy is Tue 29 Feb 2028.', rule('DXB-025B', '12-month notice'))}
     ${callout({ tone: 'brand', icon: 'stamp', body: 'Next: we draft the notice in Arabic and English, you sign with UAE Pass, and the notary serves it. AED 449 + VAT, notary fees at cost.' })}`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Continue', { variant: 'primary', iconEnd: 'arrow-right', toast: 'This is a demo — no notice was drafted.' }))
  + sheet('sheet-withdraw-notice', 'Withdraw the notice',
    `${callout({ tone: 'neutral', title: 'The Whitfields would stay', body: 'The tenancy carries on to 14 Sep 2027 and can renew as normal. If you later change your mind, a fresh 12 months starts from the new notice.' })}
     <label class="checkline"><input type="checkbox"> Tell the tenants straight away, in writing</label>`,
    btn('Keep notice', { attrs: { 'data-close': true } }) + btn('Withdraw notice', { variant: 'danger', toast: 'This is a demo — the notice was not withdrawn.' })),
};

module.exports = [renewals, notices];
