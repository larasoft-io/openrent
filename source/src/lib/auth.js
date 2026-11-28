// Sign-up, sign-in and onboarding shells. Auth pages live at the site root; onboarding lives in app/start/.
const ui = require('./ui');
const shell = require('./shell');
const { icon, logo, esc, btn, lifecycle } = ui;

/** Short legal footer shared by every auth page */
const legal = base => `<div class="auth-foot"><a href="${base}legal.html">Rulebook</a><a href="${base}help.html">Help centre</a><a href="${base}about.html">Privacy notice</a><span>© 2026 openrent.me · demo</span></div>`;

/** Panel beside the form on wide screens: an illustration plus three reasons to trust the product */
function art(o, base) {
  return `<aside class="auth-art" aria-hidden="true">
  <div class="auth-art-img"><img src="${base}assets/img/${o.img || 'living-b.svg'}" alt=""></div>
  <div class="auth-art-copy">
    <span class="eyebrow">${o.kicker || 'Renting in Dubai, start to finish'}</span>
    <h2>${o.title || 'Verified homes, Ejari-registered contracts and safeguarded deposits.'}</h2>
    <ul>${(o.points || [['badge-check', 'Every listing has a Trakheesi permit and a checked title deed'], ['shield-check', 'The rules of Dubai tenancy law are built into every step'], ['lock-keyhole', 'Deposits held in a safeguarded client account']]).map(([ic, t]) => `<li>${icon(ic, 18)}<span>${t}</span></li>`).join('')}</ul>
  </div>
</aside>`;
}

/**
 * authPage({ title, base, body, art, topEnd, scripts }) — centred form column with an optional art panel.
 */
function authPage(o) {
  const base = o.base || '';
  return `${shell.head(o.title + ' · openrent.me', base)}
<body class="auth-body">
<a class="skip-link" href="#main">Skip to content</a>
<div class="auth">
  <div class="auth-main">
    <header class="auth-top">
      <a href="${base}index.html" aria-label="openrent.me home">${logo()}</a>
      <div class="grow"></div>
      ${o.topEnd || ''}
    </header>
    <main class="auth-form" id="main" tabindex="-1">
${o.body}
    </main>
    ${legal(base)}
  </div>
  ${o.art === false ? '' : art(o.art || {}, base)}
</div>
${o.sheets || ''}
<div class="toast" id="toast" role="status">${icon('circle-check', 18)}<span></span></div>
<script src="${base}assets/js/app.js"></script>
<script src="${base}assets/js/auth.js"></script>
</body></html>`;
}

/** Six-box one-time code entry */
function otp(digits = '', o = {}) {
  const d = String(digits).padEnd(6, ' ').split('');
  return `<fieldset class="otp${o.error ? ' is-error' : ''}" data-otp><legend class="sr-only">${o.label || 'Six-digit code'}</legend>${d.map((c, i) => `<input class="otp-box" inputmode="numeric" autocomplete="${i === 0 ? 'one-time-code' : 'off'}" maxlength="1" aria-label="Digit ${i + 1}" value="${c.trim()}">`).join('')}</fieldset>`;
}

/** Password field with a live strength meter (wired up by assets/js/auth.js) */
function password(o = {}) {
  const id = o.id || 'pw';
  return `<div class="field"><label for="${id}">${o.label || 'Password'}</label>
  <div class="input-group"><input class="input" id="${id}" type="password" value="${esc(o.value || '')}" placeholder="${esc(o.placeholder || 'At least 10 characters')}" autocomplete="${o.autocomplete || 'new-password'}"${o.meter === false ? '' : ' data-pw'}><button type="button" class="affix end pw-show" data-pw-toggle="${id}" aria-label="Show password">${icon('eye', 18)}</button></div>
  ${o.meter === false ? (o.hint ? `<span class="hint">${o.hint}</span>` : '') : `<div class="pw-meter" data-pw-meter="${id}" data-s="${o.strength || 0}"><i></i><i></i><i></i><i></i></div>
  <ul class="pw-rules" data-pw-rules="${id}"><li data-r="len">10 or more characters</li><li data-r="mix">Upper and lower case</li><li data-r="num">A number or symbol</li><li data-r="common">Not a common password</li></ul>`}
</div>`;
}

/* ---- onboarding (app/start/) ---- */

const FLOWS = {
  renter: { label: 'Renter', person: 'Arjun Mehta', icon: 'house', roleCls: 'role-applicant', steps: [['About you', 'user-round'], ['Your search', 'search'], ['Rent passport', 'id-card'], ['Alerts', 'bell']] },
  landlord: { label: 'Landlord', person: 'Fatima Al Hashimi', icon: 'building-2', roleCls: 'role-landlord', steps: [['Identity', 'fingerprint'], ['First property', 'house-plus'], ['How you let', 'key-round'], ['Payouts', 'landmark']] },
  contractor: { label: 'Contractor', person: 'Imran Sheikh', icon: 'wrench', roleCls: 'role-contractor', steps: [['Company', 'briefcase-business'], ['Trades & area', 'map-pin'], ['Insurance & team', 'shield-check'], ['Payouts', 'landmark']] },
  rep: { label: "Owner's representative", person: 'Daniel Okafor', icon: 'stamp', roleCls: 'role-rep', steps: [['Identity', 'fingerprint'], ['Power of attorney', 'stamp'], ['Owner confirms', 'user-check'], ['Client money', 'landmark']] },
  staff: { label: 'OpenRent team', person: 'Layla Haddad', icon: 'shield-check', roleCls: 'role-manager', steps: [['Security', 'lock-keyhole'], ['Licence & profile', 'badge-check'], ['Policies', 'book-open-check']] },
};

/**
 * setupPage({ flow, step (1-based, or 'done'), title, sub, body, aside, back, next, nextLabel, skip })
 * One step of a role's first-run setup, in a focused shell without role navigation.
 */
function setupPage(o) {
  const f = FLOWS[o.flow];
  const n = f.steps.length;
  const done = o.step === 'done';
  const cur = done ? n : o.step - 1;
  const dash = o.dashboard || `../${o.flow === 'renter' ? 'applicant' : o.flow === 'staff' ? 'manager' : o.flow}/index.html`;
  const actions = done ? '' : `<a class="btn ghost sm" href="${dash}" data-toast="Saved. Finish setup any time from your dashboard."><span>Finish later</span></a>`;
  const head = `<div class="setup-head">
  <div class="between"><span class="badge outline">${icon(f.icon, 12)}${f.label} setup</span><span class="small muted">${done ? 'All done' : `Step ${o.step} of ${n}`}</span></div>
  ${lifecycle(f.steps.map(([label, ic]) => ({ label, icon: ic })).concat(done ? [{ label: 'Ready', icon: 'party-popper' }] : []), done ? n : cur)}
  <div><h1>${o.title}</h1>${o.sub ? `<p class="muted mt-1">${o.sub}</p>` : ''}</div>
</div>`;
  const bar = done ? '' : `<div class="setup-bar">
  ${o.back ? `<a class="btn" href="${o.back}">${icon('arrow-left', 18)}<span>Back</span></a>` : ''}
  ${o.skip ? `<a class="btn ghost" href="${o.next}"><span>${o.skip}</span></a>` : ''}
  <a class="btn primary" href="${o.next}"><span>${o.nextLabel || 'Continue'}</span>${icon('arrow-right', 18)}</a>
</div>`;
  const body = `<div class="setup ${f.roleCls}${o.aside ? '' : ' is-narrow'}">
${head}
<div class="setup-grid${o.aside ? '' : ' solo'}">
  <div class="stack">${o.body}${bar}</div>
  ${o.aside ? `<aside class="stack">${o.aside}</aside>` : ''}
</div></div>`;
  return shell.plainPage({ title: `${o.title} · ${f.label} setup`, base: '../../', back: o.back || null, actions, body, cls: 'setup-page' });
}

/** An upload tile: uploaded (with file name) or waiting */
function upload(title, sub, file, o = {}) {
  return `<div class="upload${file ? ' is-done' : ''}">${ui.docIco(o.kind || 'PDF', file ? '' : 'muted')}<div class="grow"><b>${title}</b><span>${file ? `${file}${o.status ? ' · ' + o.status : ''}` : sub}</span></div>${file ? ui.badge(o.badge || 'Uploaded', o.tone || 'ok', { icon: 'check' }) : btn('Upload', { size: 'sm', icon: 'upload', toast: `${title}: file picker opens here (demo)` })}</div>`;
}

module.exports = { authPage, otp, password, setupPage, upload, FLOWS, art };
