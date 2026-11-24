// Shared rulebook — every rule chip in every dashboard deep-links here.
module.exports = {
  slug: 'rulebook',
  render: ({ data, ui, shell }) => {
    const { icon, badge, card, callout, pageHead } = ui;
    const kind = { law: ['Law', 'brand', 'scale'], reg: ['Regulation', 'info', 'landmark'], std: ['openrent.me standard', 'accent', 'plus'] };
    const scope = { all: 'All tenancies', new: 'New tenancies', renewal: 'Renewals', listing: 'All listings' };
    const item = r => `<article class="card pad stack stack-md" id="${r.id}" style="scroll-margin-top:76px">
      <div class="between-top"><div class="cluster">${badge(r.id, 'solid')}${badge(kind[r.kind][0], kind[r.kind][1], { icon: kind[r.kind][2] })}${badge(scope[r.scope], 'outline')}</div></div>
      <h2>${r.title}</h2>
      <p>${r.plain}</p>
      <div class="callout brand" style="padding:10px 12px">${icon('shield-check', 18)}<p class="grow"><b>How the platform enforces it:</b> ${r.enforce}</p></div>
      <div class="small muted inline">${icon('book-marked', 14)} ${r.src}</div>
    </article>`;
    const body = `
${pageHead({ eyebrow: 'Dubai residential ruleset 2026.3', title: 'The rulebook', sub: 'Every guardrail in openrent.me traces back to one of these rules. Landlords can always offer more than a rule requires — the product will not let anyone offer less.' })}
<div class="grid sm3">
  <div class="card pad"><b class="display" style="font-size:26px">${data.rules.filter(r => r.kind === 'law').length}</b><div class="small muted">rules from Dubai tenancy law</div></div>
  <div class="card pad"><b class="display" style="font-size:26px">${data.rules.filter(r => r.kind === 'reg').length}</b><div class="small muted">regulatory and process requirements</div></div>
  <div class="card pad"><b class="display" style="font-size:26px">${data.rules.filter(r => r.kind === 'std').length}</b><div class="small muted">openrent.me standards that go further</div></div>
</div>
${card({ title: 'Ruleset versions', flush: true, body: ui.list(data.rulesets.map(r => ({ icon: 'git-commit-horizontal', tone: 'brand', title: `${r.v} · ${r.title}`, sub: `${r.summary}`, endBadge: badge(r.scope, 'outline'), endSub: r.date }))) })}
${callout({ tone: 'neutral', title: 'Who a change applies to', body: 'Each ruleset says whether it protects every existing tenancy immediately, only new contracts, or takes effect at the next renewal. Dashboards show the version in force for each tenancy.' })}
<div class="section-head"><h2>Law</h2></div>
<div class="grid lg2">${data.rules.filter(r => r.kind === 'law').map(item).join('')}</div>
<div class="section-head"><h2>Regulation and process</h2></div>
<div class="grid lg2">${data.rules.filter(r => r.kind === 'reg').map(item).join('')}</div>
<div class="section-head"><h2>openrent.me standards</h2></div>
<div class="grid lg2">${data.rules.filter(r => r.kind === 'std').map(item).join('')}</div>
<p class="small muted center">Plain-language summaries for a product mock-up — not legal advice. Check the official texts from the Dubai Land Department, RERA and the Rental Disputes Center before relying on any rule.</p>`;
    return shell.plainPage({ title: 'Rulebook', back: 'index.html', historyBack: true, body });
  },
};
