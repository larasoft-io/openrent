// Local helpers for the admin pages. Exports an empty page list so the build ignores it.
const ui = require('../../lib/ui');
const { icon, avatar, bar } = ui;
const hbar = (label, value, pct, tone = '') => `<div class="hb"><div class="between small"><span>${label}</span><b class="num">${value}</b></div>${bar(pct, tone, true)}</div>`;
const funnel = rows => `<div class="funnel">${rows.map(([l, v, p, note]) => `<div class="funnel-row"><span class="strong">${l}</span><b class="num">${v}</b><div class="fbar"><i style="width:${p}%"></i></div>${note ? `<span class="fnote">${note}</span>` : ''}</div>`).join('')}</div>`;
const sdot = s => `<span class="sdot ${s || ''}"></span>`;
const ticks = (bad = {}) => `<div class="ticks" role="img" aria-label="30-day uptime">${Array.from({ length: 30 }, (_, i) => `<i class="${bad[i] || ''}"></i>`).join('')}</div>`;
const person = (name, sub, o = {}) => `<div class="cell">${o.lead || avatar(name, { size: 'sm', tone: o.tone })}<div class="grow"><b>${name}</b><div class="small muted">${sub}</div></div></div>`;
const tile = (n, l) => `<div><b class="display" style="font-size:22px">${n}</b><div class="small muted">${l}</div></div>`;
module.exports = Object.assign([], { hbar, funnel, sdot, ticks, person, tile });
