/* openrent.me mock-up — sign-up and sign-in helpers: role carried through the flow, code boxes, password strength. */
(function () {
  var doc = document;

  // The role chosen on signup.html travels as ?as=… so the same pages serve every role
  var ROLES = { renter: 'Renter', landlord: 'Landlord', rep: "Owner's representative", contractor: 'Contractor' };
  var as = null;
  try { as = new URLSearchParams(location.search).get('as'); } catch (e) { }
  if (!ROLES[as]) as = 'renter';
  doc.querySelectorAll('[data-as-label]').forEach(function (el) { el.textContent = ROLES[as]; });
  doc.querySelectorAll('[data-as]').forEach(function (el) { el.hidden = (' ' + el.getAttribute('data-as') + ' ').indexOf(' ' + as + ' ') < 0; });
  doc.querySelectorAll('a[data-keep-as]').forEach(function (a) { var h = a.getAttribute('href'); a.setAttribute('href', h + (h.indexOf('?') > -1 ? '&' : '?') + 'as=' + as); });
  doc.querySelectorAll('a[data-start]').forEach(function (a) { a.setAttribute('href', a.getAttribute('href').replace('renter-1', as + '-1')); });

  // One-time code boxes: type to advance, backspace to go back, paste fills them all
  doc.querySelectorAll('[data-otp]').forEach(function (set) {
    var boxes = set.querySelectorAll('input');
    boxes.forEach(function (b, i) {
      b.addEventListener('input', function () {
        b.value = b.value.replace(/\D/g, '').slice(-1);
        set.classList.remove('is-error');
        if (b.value && boxes[i + 1]) boxes[i + 1].focus();
      });
      b.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus(); });
      b.addEventListener('paste', function (e) {
        var t = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, boxes.length);
        if (!t) return; e.preventDefault();
        t.split('').forEach(function (c, j) { boxes[j].value = c; });
        (boxes[t.length] || boxes[boxes.length - 1]).focus();
      });
    });
  });

  // Password strength: four simple checks drive the meter and the rule list
  var COMMON = ['password', 'password1', '12345678', '1234567890', 'qwerty123', 'dubai2026', 'openrent'];
  doc.querySelectorAll('input[data-pw]').forEach(function (inp) {
    var meter = doc.querySelector('[data-pw-meter="' + inp.id + '"]'), rules = doc.querySelector('[data-pw-rules="' + inp.id + '"]');
    function check() {
      var v = inp.value, r = {
        len: v.length >= 10,
        mix: /[a-z]/.test(v) && /[A-Z]/.test(v),
        num: /[\d\W_]/.test(v),
        common: v.length > 0 && COMMON.indexOf(v.toLowerCase()) < 0,
      }, s = 0;
      Object.keys(r).forEach(function (k) { if (r[k]) s++; var li = rules && rules.querySelector('[data-r="' + k + '"]'); if (li) li.classList.toggle('ok', r[k]); });
      if (meter) meter.setAttribute('data-s', v ? s : 0);
    }
    inp.addEventListener('input', check); check();
  });
  doc.querySelectorAll('[data-pw-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var inp = doc.getElementById(b.getAttribute('data-pw-toggle')); if (!inp) return;
      var show = inp.type === 'password'; inp.type = show ? 'text' : 'password';
      b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  // Resend countdown: <span data-countdown="42">
  doc.querySelectorAll('[data-countdown]').forEach(function (el) {
    var n = +el.getAttribute('data-countdown'), btn = el.closest('[data-resend]');
    var t = setInterval(function () {
      n--; el.textContent = '0:' + (n < 10 ? '0' : '') + n;
      if (n <= 0) { clearInterval(t); if (btn) { btn.disabled = false; btn.textContent = 'Resend code'; } }
    }, 1000);
  });
})();
