// Sign-in, sign-up, verification and password reset. Built at the site root.
const ui = require('../../lib/ui');
const { authPage, otp, password } = require('../../lib/auth');
const { icon, btn, field, badge, avatar, kv, callout, rule, sheet } = ui;
const { people, company } = require('../../lib/data');

const ROLE_ORDER = ['applicant', 'tenant', 'landlord', 'contractor', 'manager', 'admin', 'rep', 'field', 'compliance'];
const signInLink = `<span class="small muted">Have an account?</span>${btn('Sign in', { href: 'signin.html', size: 'sm' })}`;
const signUpLink = `<span class="small muted">New here?</span>${btn('Create account', { href: 'signup.html', size: 'sm' })}`;
const uaePass = (text, href, o = {}) => btn(text, { href, variant: 'dark', size: 'lg', block: true, icon: 'fingerprint', attrs: o.attrs });
const check = (label, on) => `<label class="checkline"><input type="checkbox"${on ? ' checked' : ''}> <span>${label}</span></label>`;
const mail = (o) => `<div class="mail" aria-label="Preview of the email">
  <div class="mail-head">${ui.mark().replace('class="mark"', 'class="mark" width="32" height="32"')}<div class="grow"><b>openrent.me</b><span class="muted">${company.email} · to ${o.to}</span></div><span class="small muted">now</span></div>
  <div class="mail-body"><h3>${o.subject}</h3>${o.body}${o.cta}<p class="small muted">${o.foot}</p></div>
</div>`;

const SECURITY_ART = { img: 'x4.svg', kicker: 'Your account is protected', title: 'We check it is really you, every time it matters.', points: [['smartphone', 'One-time codes by SMS or WhatsApp, valid for 10 minutes'], ['fingerprint', 'UAE Pass confirms your identity before you sign a contract'], ['bell-ring', 'We email you whenever your password or phone number changes']] };

const roleSheet = (roles) => sheet('sheet-demo', 'Jump into a dashboard', `<p class="small muted">This is a clickable mock-up. Skip sign-in and see the product from any side.</p>
  <div class="role-list">${ROLE_ORDER.filter(id => roles[id]).map(id => `<a href="app/${id}/index.html">${avatar(people[id].name, { size: 'sm' })}<span class="grow"><b class="strong" style="display:block;font-size:14px;line-height:1.2">${roles[id].label}</b><span class="small muted">${people[id].name} · ${people[id].sub}</span></span>${icon('chevron-right', 18, 'faint')}</a>`).join('')}</div>
  <a class="btn ghost block" href="app/start/index.html">${icon('list-checks', 18)}<span>See every sign-up and setup flow</span></a>`);

module.exports = [
  {
    slug: 'signin',
    render: ({ roles }) => authPage({
      title: 'Sign in', topEnd: signUpLink, sheets: roleSheet(roles),
      body: `
<div><h1>Welcome back to <span class="me">me</span>.</h1><p class="lead">Sign in to your homes, tenancies and jobs.</p></div>
${uaePass('Sign in with UAE Pass', 'app/index.html')}
<div class="hr-label">or</div>
${ui.seg('how', [{ id: 'pw', label: 'Password' }, { id: 'code', label: 'One-time code' }], 'pw')}
<div data-panel="how:pw" class="stack stack-md">
  ${field({ label: 'Email or mobile', type: 'email', placeholder: 'you@example.com', attrs: { autocomplete: 'username' } })}
  ${password({ id: 'pw-in', meter: false, placeholder: 'Your password', autocomplete: 'current-password' })}
  <div class="between">${check('Keep me signed in', true)}<a class="link small" href="forgot-password.html">Forgot password?</a></div>
  ${btn('Sign in', { href: 'app/index.html', variant: 'primary', size: 'lg', block: true })}
</div>
<div data-panel="how:code" class="stack stack-md" hidden>
  ${field({ label: 'Email or mobile', placeholder: 'you@example.com or 05X XXX XXXX', hint: 'We send a 6-digit code. No password needed.' })}
  ${btn('Send me a code', { href: 'signin-code.html', variant: 'primary', size: 'lg', block: true })}
</div>
<p class="small muted center">New to openrent.me? <a class="link" href="signup.html">Create an account</a></p>
<div class="card sunk pad between" style="gap:12px"><div><span class="eyebrow">Demo shortcut</span><p class="small muted mt-1">Skip sign-in and open any dashboard.</p></div>${btn('Pick a role', { sheet: 'sheet-demo', size: 'sm', icon: 'repeat' })}</div>`,
    }),
  },
  {
    slug: 'signin-code',
    render: () => authPage({
      title: 'Enter your code', topEnd: signUpLink, art: SECURITY_ART,
      body: `
<a class="link small inline" href="signin.html">${icon('arrow-left', 16)}<span>Back</span></a>
<div><h1>Enter your code</h1><p class="lead">We sent a 6-digit code by SMS to <b class="strong nowrap">+971 50 ••• 0163</b>.</p></div>
${otp('', { label: 'Sign-in code' })}
${btn('Sign in', { href: 'app/index.html', variant: 'primary', size: 'lg', block: true })}
<div class="between small"><button type="button" class="link" data-resend disabled data-toast="A new code is on its way">Resend in <span data-countdown="42">0:42</span></button><button type="button" class="link" data-toast="Code sent by WhatsApp (demo)">Send by WhatsApp</button></div>
${callout({ tone: 'neutral', body: 'Codes last 10 minutes. After 5 wrong tries we pause sign-in for 15 minutes and email you, in case it was not you.' })}`,
    }),
  },
  {
    slug: 'signup',
    render: () => authPage({
      title: 'Create an account', topEnd: signInLink,
      art: { img: 'x1.svg', kicker: 'One account, every side of a tenancy', title: 'Rent a home, let a property or take on jobs, all with the same rules.', points: [['circle-check', 'Tenants pay a flat AED 249, never a 5% commission'], ['circle-check', 'Landlords list from AED 299 with a Trakheesi permit'], ['circle-check', 'Contractors pay 10% only on completed jobs']] },
      body: `
<div><span class="eyebrow">Step 1 of 3 · Create account</span><h1 class="mt-2">What brings you to <span class="me">me</span>?</h1><p class="lead">Pick the one that fits best. You can add another role later from your profile.</p></div>
<nav class="role-pick" aria-label="Choose how you will use openrent.me">
  ${[
    ['renter', 'applicant', 'house', 'I’m looking for a home', 'Search verified homes, book viewings, make offers and move in.'],
    ['landlord', 'landlord', 'building-2', 'I own a property to let', 'List it with a permit, choose a tenant and collect rent.'],
    ['rep', 'rep', 'stamp', 'I let homes for an owner', 'Act under a notarised power of attorney for owners abroad.'],
    ['contractor', 'contractor', 'wrench', 'I’m a contractor', 'Win repair jobs from landlords and get paid in two working days.'],
  ].map(([as, cls, ic, t, d]) => `<a class="role-${cls}" href="signup-details.html?as=${as}"><span class="row-ico">${icon(ic, 22)}</span><span class="grow"><b>${t}</b><span class="d">${d}</span></span>${icon('chevron-right', 18, 'faint')}</a>`).join('')}
</nav>
<div class="card sunk pad inline" style="gap:12px">${icon('mail-open', 20, 't-brand')}<p class="small grow">Joining the OpenRent team? Use the invite link in your work email. <a class="link" href="invite.html">See the team invite</a></p></div>
<p class="small muted center">Just looking? <a class="link" href="search.html">Search homes without an account</a></p>`,
    }),
  },
  {
    slug: 'signup-details',
    render: () => authPage({
      title: 'Your details', topEnd: signInLink,
      art: { img: 'living-d.svg', kicker: 'Why we ask', title: 'Your name must match your Emirates ID or passport.', points: [['file-signature', 'It goes on the tenancy contract and the Ejari certificate'], ['fingerprint', 'UAE Pass fills it in for you and confirms your identity'], ['eye-off', 'We never show your mobile number to the other side']] },
      body: `
<div><span class="eyebrow">Step 2 of 3 · Your details</span><h1 class="mt-2">Create your account</h1></div>
<div class="as-pill">${icon('user-round', 18, 't-brand')}<span class="grow">Signing up as <b class="strong" data-as-label>Renter</b></span><a class="link small" href="signup.html">Change</a></div>
${uaePass('Continue with UAE Pass', 'verify-email.html', { attrs: { 'data-keep-as': true } })}
<p class="small muted center" style="margin-top:-8px">Fastest. Fills in your name and confirms your Emirates ID and mobile.</p>
<div class="hr-label">or use email</div>
<div class="form-grid">
  ${field({ label: 'Full name as on your Emirates ID or passport', placeholder: 'e.g. Arjun Mehta', attrs: { autocomplete: 'name' } })}
  <div data-as="contractor" hidden>${field({ label: 'Company name as on your trade licence', placeholder: 'e.g. Falcon Technical Services L.L.C' })}</div>
  <div data-as="rep" hidden>${field({ label: 'You act as', type: 'select', options: ['A private holder of a power of attorney', 'A RERA-licensed broker or property manager'], value: 'A private holder of a power of attorney' })}</div>
  ${field({ label: 'Email', type: 'email', placeholder: 'you@example.com', attrs: { autocomplete: 'email' } })}
  ${field({ label: 'UAE mobile', type: 'tel', prefix: '+971', placeholder: '50 123 4567', inputmode: 'tel', hint: 'We text a code to confirm it. Overseas owner? Use the number you will check most.', attrs: { autocomplete: 'tel-national' } })}
  ${password({ id: 'pw-new' })}
</div>
<div class="stack stack-sm">
  ${check(`I agree to the <a class="link" href="legal.html">terms</a> and <a class="link" href="about.html">privacy notice</a>`, false)}
  ${check('Send me occasional tips and new features (you can stop any time)', false)}
</div>
${btn('Create account', { href: 'verify.html', variant: 'primary', size: 'lg', block: true, attrs: { 'data-keep-as': true } })}
<div data-as="landlord rep contractor" hidden>${callout({ tone: 'brand', icon: 'fingerprint', body: 'Before you list a home or accept a job you will confirm your identity with UAE Pass. We ask for it during setup.', rules: [rule('DXB-003', 'Owner check', 'app/')] })}</div>`,
    }),
  },
  {
    slug: 'verify',
    render: () => authPage({
      title: 'Confirm your mobile', topEnd: signInLink, art: SECURITY_ART,
      body: `
<a class="link small inline" href="signup-details.html" data-keep-as>${icon('arrow-left', 16)}<span>Back</span></a>
<div><span class="eyebrow">Step 3 of 3 · Verify</span><h1 class="mt-2">Confirm your mobile</h1><p class="lead">Enter the 6-digit code we sent by SMS to <b class="strong nowrap">+971 50 ••• 0163</b>. <a class="link" href="signup-details.html" data-keep-as>Wrong number?</a></p></div>
${otp('', { label: 'Verification code' })}
${btn('Verify mobile', { href: 'verify-email.html', variant: 'primary', size: 'lg', block: true, attrs: { 'data-keep-as': true } })}
<div class="between small"><button type="button" class="link" data-resend disabled data-toast="A new code is on its way">Resend in <span data-countdown="42">0:42</span></button><button type="button" class="link" data-toast="Code sent by WhatsApp (demo)">Send by WhatsApp</button></div>
${callout({ tone: 'neutral', body: 'The code lasts 10 minutes. After 5 wrong tries we pause sign-up for 15 minutes.' })}`,
    }),
  },
  {
    slug: 'verify-email',
    render: () => authPage({
      title: 'Confirm your email', topEnd: signInLink, art: SECURITY_ART,
      body: `
<div class="cluster">${badge('Mobile confirmed', 'ok', { icon: 'check' })}</div>
<div><h1>Check your inbox</h1><p class="lead">We sent a link to <b class="strong">a•••@example.com</b>. Tap it to confirm your email. It works for 24 hours.</p></div>
${mail({ to: 'a•••@example.com', subject: 'Confirm your email', body: '<p>Hi, tap the button to confirm this is your email address. We use it for your contract, receipts and anything that needs a written record.</p>', cta: btn('Confirm email', { href: 'email-verified.html', variant: 'primary', attrs: { 'data-keep-as': true } }), foot: 'Didn’t sign up? Ignore this email and nothing happens.' })}
<div class="btn-row">${btn('Open mail app', { icon: 'mail', toast: 'Opens your mail app (demo)' })}${btn('Resend email', { icon: 'rotate-cw', toast: 'Sent again. Check spam if it does not arrive.' })}</div>
<p class="small muted center">Wrong address? <a class="link" href="signup-details.html" data-keep-as>Change it</a></p>`,
    }),
  },
  {
    slug: 'email-verified',
    render: () => authPage({
      title: 'You’re verified', topEnd: '',
      body: `
<span class="auth-hero">${icon('badge-check', 32)}</span>
<div><h1>You’re verified.</h1><p class="lead">Your mobile and email are confirmed. A few minutes of setup and openrent.me is ready for you as a <b class="strong" data-as-label>Renter</b>.</p></div>
<div class="card pad stack stack-sm">
  <span class="eyebrow">Setup asks for</span>
  ${[
    ['renter', [['user-round', 'A little about you, from UAE Pass'], ['search', 'Where and when you want to move'], ['id-card', 'Documents landlords ask for, once'], ['bell', 'How we tell you about new homes']]],
    ['landlord', [['fingerprint', 'Your identity, through UAE Pass'], ['house-plus', 'Your title deed for the first property'], ['key-round', 'Let it yourself, or with a manager'], ['landmark', 'The bank account rent goes to']]],
    ['rep', [['fingerprint', 'Your identity, through UAE Pass'], ['stamp', 'The notarised power of attorney'], ['user-check', 'The owner confirms you'], ['landmark', 'Where the rent goes']]],
    ['contractor', [['briefcase-business', 'Your trade licence'], ['map-pin', 'What you do and where'], ['shield-check', 'Insurance and your team'], ['landmark', 'Where we pay you']]],
  ].map(([as, items]) => `<ul class="ticks-list" data-as="${as}"${as === 'renter' ? '' : ' hidden'}>${items.map(([ic, t]) => `<li class="inline small">${icon(ic, 16, 't-brand')}<span>${t}</span></li>`).join('')}</ul>`).join('')}
</div>
${btn('Start setup', { href: 'app/start/renter-1.html', variant: 'primary', size: 'lg', block: true, iconEnd: 'arrow-right', attrs: { 'data-start': true } })}
${[['renter', 'search.html', 'Skip and start searching'], ['landlord', 'app/landlord/index.html', 'Skip to my dashboard'], ['rep', 'app/rep/index.html', 'Skip to my dashboard'], ['contractor', 'app/contractor/index.html', 'Skip to my dashboard']].map(([as, href, t]) => `<a class="btn ghost block" href="${href}" data-as="${as}"${as === 'renter' ? '' : ' hidden'}><span>${t}</span></a>`).join('')}`,
    }),
  },
  {
    slug: 'forgot-password',
    render: () => authPage({
      title: 'Reset your password', topEnd: signUpLink, art: SECURITY_ART,
      body: `
<a class="link small inline" href="signin.html">${icon('arrow-left', 16)}<span>Back to sign in</span></a>
<div><h1>Reset your password</h1><p class="lead">Enter the email or mobile on your account and we’ll send you a reset link.</p></div>
${field({ label: 'Email or mobile', placeholder: 'you@example.com', attrs: { autocomplete: 'username' } })}
${btn('Send reset link', { href: 'reset-sent.html', variant: 'primary', size: 'lg', block: true })}
${callout({ tone: 'neutral', icon: 'fingerprint', title: 'Signed up with UAE Pass?', body: 'Then you have no password with us. Sign in with UAE Pass instead.', actions: btn('Sign in with UAE Pass', { href: 'app/index.html', size: 'sm', variant: 'dark', icon: 'fingerprint' }) })}`,
    }),
  },
  {
    slug: 'reset-sent',
    render: () => authPage({
      title: 'Check your email', topEnd: signUpLink, art: SECURITY_ART,
      body: `
<span class="auth-hero">${icon('mail-check', 32)}</span>
<div><h1>Check your email</h1><p class="lead">If an account matches <b class="strong">a•••@example.com</b>, a reset link is on its way. It works once and expires in 30 minutes.</p></div>
${mail({ to: 'a•••@example.com', subject: 'Reset your password', body: '<p>Someone asked to reset the password on your openrent.me account. If it was you, choose a new one below.</p>', cta: btn('Choose a new password', { href: 'reset-password.html', variant: 'primary' }), foot: 'Not you? Ignore this email. Your password stays the same.' })}
<div class="between small"><button type="button" class="link" data-resend disabled data-toast="Sent again">Resend in <span data-countdown="59">0:59</span></button><a class="link" href="forgot-password.html">Use a different email</a></div>`,
    }),
  },
  {
    slug: 'reset-password',
    render: () => authPage({
      title: 'Choose a new password', topEnd: '', art: SECURITY_ART,
      body: `
<div><h1>Choose a new password</h1><p class="lead">For <b class="strong">a•••@example.com</b>. Don’t reuse one from another site.</p></div>
${password({ id: 'pw-reset', label: 'New password' })}
${password({ id: 'pw-confirm', label: 'Type it again', meter: false, placeholder: 'Same as above' })}
${check('Sign me out on my other devices', true)}
${btn('Update password', { href: 'reset-done.html', variant: 'primary', size: 'lg', block: true })}
<p class="small muted">We’ll email you to confirm the change. If you didn’t ask for it, call ${company.phone}.</p>`,
    }),
  },
  {
    slug: 'reset-done',
    render: () => authPage({
      title: 'Password updated', topEnd: '', art: SECURITY_ART,
      body: `
<span class="auth-hero">${icon('circle-check', 32)}</span>
<div><h1>Password updated</h1><p class="lead">We signed you out on 2 other devices. Use your new password next time you sign in.</p></div>
${btn('Sign in', { href: 'signin.html', variant: 'primary', size: 'lg', block: true })}`,
    }),
  },
  {
    slug: 'invite',
    render: () => authPage({
      title: 'Join the OpenRent team', topEnd: '',
      art: { img: 'x6.svg', kicker: 'For the OpenRent team', title: 'Every action you take is logged and checked against the rules.', points: [['lock-keyhole', 'Password plus an authenticator app on every team account'], ['scroll-text', 'A full audit trail for regulators and owners'], ['scale', 'The same rulebook landlords and tenants see']] },
      body: `
<div class="card pad stack stack-md">
  <div class="inline" style="gap:12px">${avatar(people.admin.name)}<p class="small grow"><b class="strong">${people.admin.name}</b> (${people.admin.sub}) invited you to join openrent.me</p></div>
  <h1>Join the OpenRent team</h1>
  ${kv([['Name', people.manager.name], ['Work email', people.manager.email], ['Role', `${badge('OpenRent Manager', 'info')}`], ['Team', 'Tenancy operations · Dubai'], ['Invite', 'Works for 7 days, once']])}
</div>
${btn('Accept and set up my account', { href: 'app/start/staff-1.html', variant: 'primary', size: 'lg', block: true, iconEnd: 'arrow-right' })}
<p class="small muted center">Not you? <button type="button" class="link" data-toast="We let ${people.admin.first} know. The link no longer works.">Report this invite</button></p>
${callout({ tone: 'neutral', body: 'Field agents and compliance officers get the same invite. Their licence step asks for the documents their role needs.' })}`,
    }),
  },
];
