// Empty, error and loading states. One vocabulary for every role, so a blank list, a failed load and a
// slow connection look and read the same everywhere.
const { icon, btn, esc } = require('./ui');

/* ---------- Copy blocks ---------- */

/**
 * Centred state panel.
 * state({icon, tone:'role|ok|danger|warn|neutral', title, body, actions:[html], tips:[[icon,title,text]], foot:[html], box:'boxed|dashed|', compact, dot, h:'h2|h3'})
 */
function state(o) {
  const tone = o.tone && o.tone !== 'role' ? ` tone-${o.tone}` : '';
  const h = o.h || (o.compact ? 'h3' : 'h2');
  const art = `<div class="state-art" aria-hidden="true"><span>${icon(o.icon || 'inbox', o.compact ? 22 : 28)}</span>${o.dot ? '<i class="state-art-dot"></i>' : ''}</div>`;
  const tips = o.tips ? `<ul class="state-tips">${o.tips.map(([ic, t, d]) => `<li>${icon(ic, 16)}<span><b>${t}</b>${d || ''}</span></li>`).join('')}</ul>` : '';
  return `<div class="state ${o.box || ''}${o.compact ? ' compact' : ''}${tone}"${o.role ? ` role="${o.role}"` : ''}>${art}<${h}>${o.title}</${h}>${o.body ? `<p>${o.body}</p>` : ''}${o.actions ? `<div class="state-actions">${o.actions.join('')}</div>` : ''}${tips}${o.foot ? `<div class="state-foot">${o.foot.join('')}</div>` : ''}</div>`;
}

/** Nothing here yet. Tone follows the role colour unless told otherwise. */
const empty = o => state(Object.assign({ box: 'dashed', icon: 'inbox' }, o));

/** A whole page or list failed to load. Always offers a retry, a way out and a reference to quote to support. */
function failure(o = {}) {
  return state(Object.assign({
    box: 'boxed', tone: 'danger', icon: 'cloud-off', role: 'alert',
    title: 'We couldn’t load this',
    body: 'This is on our side, not yours. Nothing you entered has been lost.',
    actions: [btn('Try again', { variant: 'primary', icon: 'refresh-cw', attrs: { 'data-state-retry': '' } }), btn('Get help', { variant: 'ghost', icon: 'life-buoy', toast: 'Support chat opens here (demo)' })],
    foot: [`<span>Ref <span class="code">${esc(o.ref || 'ERR-2411-7Q3F')}</span></span>`, `<span>${icon('activity', 12)} ${o.status || 'All other services are running'}</span>`],
  }, o));
}

/** One card failed while the rest of the page loaded. */
function failInline(o) {
  return `<div class="fail-inline" role="alert"><span class="row-ico">${icon(o.icon || 'plug-zap', 20)}</span><div class="grow"><h4>${o.title}</h4><p>${o.body}</p><div class="cluster">${btn(o.retry || 'Retry', { size: 'sm', icon: 'refresh-cw', attrs: { 'data-state-retry': '' } })}${o.extra || ''}</div></div></div>`;
}

/** Connection banner (rendered statically for the offline preview; js/states.js adds it live when the device goes offline). */
function netBanner(o = {}) {
  return `<div class="net-banner" role="status">${icon('wifi-off', 18)}<div class="grow"><b>${o.title || 'You’re offline.'}</b> ${o.body || 'Showing what was saved at 09:41. Anything you do now is kept on this phone and sent when you reconnect.'}</div>${btn('Retry', { size: 'sm', attrs: { 'data-net-retry': '' } })}</div>`;
}

/* ---------- Skeletons ---------- */
const L = (w, cls = '') => `<i class="sk sk-line ${cls}" style="width:${w}"></i>`;
const sk = {
  line: L,
  rows(n = 4, o = {}) {
    const widths = ['62%', '48%', '70%', '55%', '66%', '44%'];
    const lead = o.thumb ? '<i class="sk sk-thumb"></i>' : o.avatar ? '<i class="sk sk-ico sk-circle"></i>' : o.lead === false ? '' : '<i class="sk sk-ico"></i>';
    return Array.from({ length: n }, (_, i) => `<div class="sk-row">${lead}<div class="sk-main">${L(widths[i % 6], o.big ? 'lg' : '')}${L(['38%', '52%', '30%', '45%'][i % 4], 'sm')}</div>${o.end === false ? '' : `<div class="sk-end">${L('100%')}${o.pill ? '<i class="sk sk-pill" style="width:56px"></i>' : L('70%', 'sm')}</div>`}</div>`).join('');
  },
  list(n, o) { return `<div class="card" aria-hidden="true">${o && o.title ? `<div class="card-head">${L(o.title, 'lg')}</div><div class="mt-2"></div>` : ''}${sk.rows(n, o)}</div>`; },
  stat(i = 0) { return `<div class="sk-stat" aria-hidden="true">${L(['58%', '46%', '64%', '50%'][i % 4], 'sm')}${L(['70%', '54%', '62%', '48%'][i % 4], 'xl')}${L('40%', 'sm')}</div>`; },
  stats(n = 4, cls = 'g2 lg4') { return `<div class="grid ${cls}">${Array.from({ length: n }, (_, i) => sk.stat(i)).join('')}</div>`; },
  hero(o = {}) { return `<div class="sk-hero" aria-hidden="true"${o.span ? ' style="grid-column:span 2"' : ''}>${L('30%', 'sm')}${L('55%', 'xl')}${L('80%')}${o.bar ? L('100%', 'sm') : ''}<div class="cluster mt-1"><i class="sk sk-btn"></i><i class="sk sk-btn" style="width:120px"></i></div></div>`; },
  card(lines = 3, o = {}) { return `<div class="card pad stack stack-md" aria-hidden="true">${L(o.title || '40%', 'lg')}${Array.from({ length: lines }, (_, i) => L(['100%', '92%', '76%', '84%', '60%'][i % 5])).join('')}${o.chart ? '<i class="sk sk-chart"></i>' : ''}${o.btn ? '<i class="sk sk-btn" style="width:100%;height:44px"></i>' : ''}</div>`; },
  props(n = 3) { return `<div class="grid sm2 lg3" aria-hidden="true">${Array.from({ length: n }, () => `<div class="prop-card"><i class="sk sk-cover"></i><div class="pc-body">${L('45%', 'lg')}${L('75%')}${L('50%', 'sm')}<div class="cluster">${L('22%', 'sm')}${L('22%', 'sm')}${L('22%', 'sm')}</div></div></div>`).join('')}</div>`; },
  table(rows = 6) { return `<div class="card sk-table" aria-hidden="true">${sk.rows(rows, { lead: false, pill: true })}</div>`; },
  tabs(n = 4) { return `<div class="cluster" aria-hidden="true" style="gap:16px;padding:6px 0 10px;border-bottom:1px solid var(--line)">${Array.from({ length: n }, (_, i) => L(['64px', '72px', '58px', '80px'][i % 4], 'sm')).join('')}</div>`; },
  chat() { return `<div class="card pad stack stack-md" aria-hidden="true"><i class="sk sk-bubble" style="width:62%"></i><i class="sk sk-bubble me" style="width:48%"></i><i class="sk sk-bubble" style="width:70%;height:58px"></i><i class="sk sk-bubble me" style="width:36%"></i></div>`; },
  /** Visually hidden live status so screen readers hear what is loading. */
  note(text) { return `<p class="is-loading-note" role="status">${icon('loader-circle', 14)}<span>${text}</span></p>`; },
};

/* ---------- Page wrapper ---------- */
const LABELS = { live: 'Live', loading: 'Loading', empty: 'Empty', error: 'Error', offline: 'Offline', partial: 'Partial' };
const HEAD_RE = /<header class="page-head">[\s\S]*?<\/header>/;

/**
 * Wrap a page body so the mock-up can show it live, loading, empty, in error, offline…
 * states: { loading: html | {head, body} | (liveBodyWithoutHead) => …, empty: …, error: … }  (order is kept)
 * The live page head is reused for every state; its action buttons are dropped for empty and error unless keepActions.
 */
function withStates(live, states) {
  const m = live.match(HEAD_RE);
  const liveHead = m ? m[0] : '';
  const keys = ['live', ...Object.keys(states)];
  const panels = keys.map(k => {
    if (k === 'live') return `<div data-state-panel="live">${live}</div>`;
    let s = states[k];
    if (typeof s === 'function') s = s(live.replace(HEAD_RE, '')); // e.g. a partial failure shown on top of the live page
    if (typeof s === 'string') s = { body: s };
    let head = s.head != null ? s.head : liveHead;
    if (s.head == null && !s.keepActions && k !== 'loading') head = head.replace(/<div class="ph-actions">[\s\S]*<\/div><\/header>$/, '</header>');
    return `<div data-state-panel="${k}" hidden${k === 'loading' ? ' aria-busy="true"' : ''}>${s.banner || ''}${head}${s.body}</div>`;
  }).join('');
  const sw = `<div class="state-switch" data-state-switch role="group" aria-label="Preview this page in another state"><span class="ss-label">${icon('eye', 12)}Preview</span><div class="seg">${keys.map(k => `<button type="button" data-state-to="${k}" aria-pressed="${k === 'live'}">${LABELS[k] || k}</button>`).join('')}</div></div>`;
  return sw + panels;
}

module.exports = { state, empty, failure, failInline, netBanner, sk, withStates };
