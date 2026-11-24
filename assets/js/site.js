/* openrent.me marketing site — savings calculator + small niceties */
(function () {
  var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
  document.querySelectorAll('[data-calc]').forEach(function (c) {
    var r = c.querySelector('input[type=range]');
    function update() {
      var rent = +r.value, agent = Math.max(rent * 0.05, 5000);
      c.querySelector('[data-calc-rent]').textContent = fmt(rent);
      c.querySelector('[data-calc-agent]').textContent = fmt(agent);
      c.querySelector('[data-calc-save]').textContent = fmt(agent - 249);
    }
    r.addEventListener('input', update); update();
  });
})();
