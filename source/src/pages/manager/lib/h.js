// Local helpers for the manager dashboard (not a page — lives in a sub-folder so the build ignores it).
const ui = require('../../../lib/ui');
const { icon, badge } = ui;
const B = '../../';

/** Small verification pill: vp('Title deed','ok'|'wait'|'bad'|'na') */
const vp = (label, state) => {
  const m = { ok: ['ok', 'check'], wait: ['warn', 'hourglass'], bad: ['danger', 'x'], na: ['', 'minus'] }[state] || ['', 'minus'];
  return `<span class="badge ${m[0]}">${icon(m[1], 12)}${label}</span>`;
};
/** Who pays chip */
const pays = (who) => badge(who + ' pays', who === 'Landlord' ? 'brand' : who === 'Tenant' ? 'gold' : '', { icon: 'wallet' });
/** Priority badge */
const prio = (p) => badge(p, { Emergency: 'danger', Urgent: 'warn', Routine: '' }[p] || '', { dot: true });
/** Countdown block. Ticks down in the browser. */
const timer = (id, secs, label) => `<div class="mg-timer" data-timer="${secs}" id="${id}"><b class="num">${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}</b><span>${label}</span></div>`;
const timerScript = `<script>document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-timer]').forEach(function(t){var s=+t.getAttribute('data-timer'),b=t.querySelector('b');setInterval(function(){if(s>0)s--;b.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');},1000);});});</script>`;
/** Search box */
const search = (ph) => `<div class="input-group"><span class="affix" style="background:transparent;border:0;padding-right:0">${icon('search', 18)}</span><input class="input" placeholder="${ph}" aria-label="${ph}"></div>`;

module.exports = { B, vp, pays, prio, timer, timerScript, search };
