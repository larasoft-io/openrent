/* openrent.me mock-up — tiny interaction layer (sheets, tabs, chips, toasts). No dependencies. */
(function () {
  var doc = document;

  // Top bar hairline once the page scrolls
  var topbar = doc.getElementById('topbar');
  function onScroll() { if (topbar) topbar.classList.toggle('is-stuck', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Bottom sheets / modals
  function openSheet(id) {
    doc.querySelectorAll('.sheet.is-open').forEach(function (s) { s.classList.remove('is-open'); });
    var s = doc.getElementById(id); if (!s) return;
    s.classList.add('is-open'); doc.body.classList.add('sheet-lock');
  }
  function closeSheets() {
    doc.querySelectorAll('.sheet.is-open').forEach(function (s) { s.classList.remove('is-open'); });
    doc.body.classList.remove('sheet-lock');
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
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheets(); });

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
