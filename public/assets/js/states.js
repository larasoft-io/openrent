/* openrent.me mock-up — page states (live / loading / empty / error / offline) and the connection banner. No dependencies. */
(function () {
  var doc = document, root = doc.documentElement;
  if (navigator.webdriver) root.classList.add('is-automated'); // keeps the preview switcher out of marketing screenshots

  var params = new URLSearchParams(location.search);
  var sw = doc.querySelector('[data-state-switch]');
  var retryTimer;

  function show(name, opts) {
    var panels = doc.querySelectorAll('[data-state-panel]'); if (!panels.length) return;
    if (!doc.querySelector('[data-state-panel="' + name + '"]')) name = 'live';
    clearTimeout(retryTimer);
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-state-panel') !== name; });
    if (sw) sw.querySelectorAll('[data-state-to]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-state-to') === name); });
    if (!(opts && opts.keepUrl) && history.replaceState) {
      var u = new URL(location.href);
      if (name === 'live') u.searchParams.delete('state'); else u.searchParams.set('state', name);
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    }
    if (opts && opts.focus) { var h = doc.querySelector('[data-state-panel="' + name + '"] h1, [data-state-panel="' + name + '"] h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
  }

  // "Try again" shows the skeleton briefly, then the loaded page
  function retry() {
    var hasLoading = !!doc.querySelector('[data-state-panel="loading"]');
    if (hasLoading) show('loading');
    retryTimer = setTimeout(function () { show('live'); if (window.orToast) window.orToast('Loaded'); }, hasLoading ? 1100 : 300);
  }

  doc.addEventListener('click', function (e) {
    var b = e.target.closest('[data-state-to],[data-state-retry],[data-net-retry]'); if (!b) return;
    if (b.hasAttribute('data-state-to')) show(b.getAttribute('data-state-to'));
    else if (b.hasAttribute('data-state-retry')) { e.preventDefault(); retry(); }
    else if (b.hasAttribute('data-net-retry')) { e.preventDefault(); if (navigator.onLine && !preview) online(); else if (window.orToast) window.orToast('Still no connection. We’ll keep trying every 30 seconds'); }
  });

  var preview = params.get('net') === 'offline';
  var initial = params.get('state');
  if (initial) { if (sw) sw.classList.add('is-forced'); show(initial, { keepUrl: true }); }

  // Live connection banner on every page: appears when the device goes offline, confirms when it is back
  var banner;
  function bannerEl() {
    if (banner) return banner;
    banner = doc.createElement('div'); banner.className = 'net-banner'; banner.setAttribute('role', 'status'); banner.hidden = true;
    var top = doc.getElementById('topbar');
    if (top && top.parentNode) top.parentNode.insertBefore(banner, top.nextSibling); else doc.body.insertBefore(banner, doc.body.firstChild);
    return banner;
  }
  var ICON_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/></svg>';
  var ICON_ON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>';
  function stamp() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  var hideTimer;
  function offline(at) {
    var b = bannerEl(); clearTimeout(hideTimer);
    b.classList.remove('is-back');
    b.innerHTML = ICON_OFF + '<div class="grow"><b>You’re offline.</b> Showing what was saved at ' + (typeof at === 'string' ? at : stamp()) + '. Anything you do now is kept on this device and sent when you reconnect.</div><button type="button" class="btn sm" data-net-retry>Retry</button>';
    b.hidden = false;
  }
  function online() {
    if (!banner || banner.hidden) return;
    banner.classList.add('is-back');
    banner.innerHTML = ICON_ON + '<div class="grow"><b>Back online.</b> Everything is up to date.</div>';
    hideTimer = setTimeout(function () { banner.hidden = true; }, 2600);
  }
  window.addEventListener('offline', offline);
  window.addEventListener('online', online);
  if (preview) offline('09:41'); else if (navigator.onLine === false) offline();
})();
