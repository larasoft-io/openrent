// Demo hub — entry point to every dashboard.
module.exports = {
  slug: 'index',
  render: ({ data, ui, shell, roles }) => {
    const { icon, badge, avatar, pageHead } = ui;
    const blurb = {
      applicant: 'Offer accepted, now moving in: referencing, contract, move-in costs, Ejari and keys.',
      tenant: 'One home, start to finish: rent, repairs, renewal, rights and move-out.',
      landlord: 'Seven properties at seven different stages, with legal guardrails on every action.',
      contractor: 'Jobs, quotes, schedule and payouts for a maintenance company.',
      manager: 'The RERA-licensed operator who verifies, registers, mediates and unblocks.',
      admin: 'Rulesets, fees, roles, revenue, risk and the audit trail.',
      rep: 'Acts for overseas owners under a power of attorney.',
      field: 'Hosts viewings, runs inspections, hands over keys.',
      compliance: 'KYC, AML, client money and regulator reporting.',
    };
    const core = ['applicant', 'tenant', 'landlord', 'contractor', 'manager', 'admin'], extra = ['rep', 'field', 'compliance'];
    const tile = id => roles[id] ? `<a class="card pad link-card stack stack-md role-${id}" href="${id}/index.html">
      <div class="between"><span class="row-ico role" style="width:48px;height:48px;border-radius:15px">${icon(roles[id].icon || 'user', 24)}</span>${icon('arrow-up-right', 20, 'faint')}</div>
      <div><h2>${roles[id].label}</h2><p class="small muted mt-1">${blurb[id]}</p></div>
      <div class="inline small">${avatar(data.people[id].name, { size: 'sm' })}<span><b class="strong">${data.people[id].name}</b> <span class="muted">· ${data.people[id].sub}</span></span></div></a>` : '';
    const body = `
${pageHead({ eyebrow: 'Clickable mock-up · demo data', title: 'Choose a dashboard', sub: 'The same tenancies, seen from every side. Today in the demo is Tuesday 24 November 2026. Switch role at any time from the avatar in the top corner.' })}
<div class="section-head"><h2>Core roles</h2></div>
<div class="grid sm2 lg3">${core.map(tile).join('')}</div>
${extra.some(id => roles[id]) ? `<div class="section-head"><h2>Supporting roles</h2></div><div class="grid sm2 lg3">${extra.map(tile).join('')}</div>` : ''}
<div class="section-head"><h2>Shared</h2></div>
<div class="grid sm2 lg3">
  <a class="card pad link-card stack stack-md" href="rulebook.html"><span class="row-ico brand" style="width:48px;height:48px;border-radius:15px">${icon('scale', 24)}</span><div><h2>The rulebook</h2><p class="small muted mt-1">Every legal guardrail, its source, and how the product enforces it.</p></div></a>
  <a class="card pad link-card stack stack-md" href="../index.html"><span class="row-ico accent" style="width:48px;height:48px;border-radius:15px">${icon('globe', 24)}</span><div><h2>Marketing site</h2><p class="small muted mt-1">openrent.me public website, search and pricing.</p></div></a>
</div>`;
    return shell.plainPage({ title: 'Dashboards', body });
  },
};
