/* openrent.me mock-up — tiny interaction layer (sheets, tabs, chips, toasts). No dependencies. */
(function () {
  var doc = document;

  // Top bar hairline once the page scrolls
  var topbar = doc.getElementById('topbar');
  function onScroll() { if (topbar) topbar.classList.toggle('is-stuck', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Bottom sheets / modals
  // Focus moves into an open sheet, stays there (Tab wraps), and returns to the opener on close
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  var opener = null;
  function openSheet(id) {
    var s = doc.getElementById(id); if (!s) return;
    var wasOpen = doc.querySelector('.sheet.is-open');
    doc.querySelectorAll('.sheet.is-open').forEach(function (o) { o.classList.remove('is-open'); });
    if (!wasOpen) opener = doc.activeElement;
    s.classList.add('is-open'); doc.body.classList.add('sheet-lock');
    var first = s.querySelector('.sheet-body ' + FOCUSABLE.split(',').join(',.sheet-body ')) || s.querySelector(FOCUSABLE);
    setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, 60);
  }
  function closeSheets() {
    var any = doc.querySelector('.sheet.is-open');
    doc.querySelectorAll('.sheet.is-open').forEach(function (s) { s.classList.remove('is-open'); });
    doc.body.classList.remove('sheet-lock');
    if (any && opener && opener.focus) { opener.focus({ preventScroll: true }); opener = null; }
  }

  // Toast
  var toastTimer;
  function toast(msg) {
    var t = doc.getElementById('toast'); if (!t) return;
    t.querySelector('span').textContent = msg; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2600);
  }
  window.orToast = toast;

  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-sheet],[data-close],[data-toast],[data-tab],[data-back],.chip,.sheet');
    if (!el) return;

    if (el.matches('.sheet') && e.target === el) { closeSheets(); return; }
    var inner = e.target.closest('[data-sheet],[data-close],[data-toast],[data-tab],[data-back],.chip');
    if (!inner) return;
    el = inner;

    if (el.hasAttribute('data-back')) { if (history.length > 1) { e.preventDefault(); history.back(); } return; }
    if (el.hasAttribute('data-close')) { closeSheets(); }
    if (el.hasAttribute('data-sheet')) { e.preventDefault(); openSheet(el.getAttribute('data-sheet')); }
    if (el.hasAttribute('data-toast')) {
      if (el.tagName === 'A' && el.getAttribute('href') === '#') e.preventDefault();
      if (el.closest('.sheet')) closeSheets();
      toast(el.getAttribute('data-toast'));
    }
    if (el.hasAttribute('data-tab')) {
      var wrap = el.closest('[data-tabs]'); if (!wrap) return;
      var group = wrap.getAttribute('data-tabs'), id = el.getAttribute('data-tab');
      wrap.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('is-active', b === el); });
      doc.querySelectorAll('[data-panel^="' + group + ':"]').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== group + ':' + id; });
      el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
    if (el.classList.contains('chip') && el.parentElement.hasAttribute('data-chips')) {
      var multi = el.parentElement.hasAttribute('data-multi');
      if (multi) el.classList.toggle('is-active');
      else el.parentElement.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === el); });
      // optional filtering: chips carry data-filter, items carry data-tags inside [data-filter-target]
      var f = el.getAttribute('data-filter'), target = el.parentElement.getAttribute('data-target');
      if (f != null && target) doc.querySelectorAll(target + ' [data-tags]').forEach(function (it) {
        it.hidden = !(f === '*' || (' ' + it.getAttribute('data-tags') + ' ').indexOf(' ' + f + ' ') > -1);
      });
    }
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSheets(); return; }
    if (e.key !== 'Tab') return;
    var s = doc.querySelector('.sheet.is-open'); if (!s) return;
    var f = Array.prototype.filter.call(s.querySelectorAll(FOCUSABLE), function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var a = f[0], z = f[f.length - 1];
    if (!s.contains(doc.activeElement)) { e.preventDefault(); a.focus(); }
    else if (e.shiftKey && doc.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && doc.activeElement === z) { e.preventDefault(); a.focus(); }
  });

  // Expose tab and chip state to assistive technology
  doc.querySelectorAll('[data-tabs]').forEach(function (w) {
    w.setAttribute('role', 'tablist');
    w.querySelectorAll('[data-tab]').forEach(function (b) { b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', b.classList.contains('is-active')); });
  });
  doc.querySelectorAll('[data-chips] .chip').forEach(function (c) { c.setAttribute('aria-pressed', c.classList.contains('is-active')); });
  new MutationObserver(function (m) {
    m.forEach(function (r) {
      var el = r.target;
      if (el.hasAttribute('data-tab')) el.setAttribute('aria-selected', el.classList.contains('is-active'));
      else if (el.classList.contains('chip')) el.setAttribute('aria-pressed', el.classList.contains('is-active'));
    });
  }).observe(doc.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

  // Scrollable regions must be reachable by keyboard
  doc.querySelectorAll('.table-wrap,.hscroll,.lifecycle,pre').forEach(function (el) {
    if (el.scrollWidth > el.clientWidth + 1 && !el.querySelector(FOCUSABLE)) el.setAttribute('tabindex', '0');
  });

  // Chart labels: SVG charts scale with their card, so keep their text at a constant on-screen size
  function fitCharts() {
    doc.querySelectorAll('svg.chart').forEach(function (svg) {
      var vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || !vb.width || !svg.clientWidth) return;
      var k = vb.width / svg.clientWidth;
      svg.querySelectorAll('text:not([style])').forEach(function (t) { t.style.fontSize = (11 * k).toFixed(2) + 'px'; });
    });
  }
  fitCharts();
  if (window.ResizeObserver) { var ro = new ResizeObserver(fitCharts); doc.querySelectorAll('svg.chart').forEach(function (c) { ro.observe(c); }); }

  // Range sliders paint their filled track and can mirror their value into [data-out="<id>"]
  function paint(r) {
    var p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty('--p', p + '%');
    if (r.id) doc.querySelectorAll('[data-out="' + r.id + '"]').forEach(function (o) { o.textContent = Number(r.value).toLocaleString('en-US'); });
  }
  doc.querySelectorAll('input[type=range].range').forEach(function (r) { paint(r); r.addEventListener('input', function () { paint(r); }); });

  // Bring the current step of a horizontal journey into view
  doc.querySelectorAll('.lifecycle').forEach(function (l) { var n = l.querySelector('.now'); if (n) l.scrollLeft = Math.max(0, n.offsetLeft - l.clientWidth / 2 + n.offsetWidth / 2); });

  // Open a sheet / tab from the URL hash, e.g. page.html#sheet-new or #tab=grp:id
  var h = location.hash.slice(1);
  if (h.indexOf('tab=') === 0) { var parts = h.slice(4).split(':'); var b = doc.querySelector('[data-tabs="' + parts[0] + '"] [data-tab="' + parts[1] + '"]'); if (b) b.click(); }
  else if (h && doc.getElementById(h) && doc.getElementById(h).classList.contains('sheet')) openSheet(h);
})();
