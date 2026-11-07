/**
 * Contagem regressiva até a abertura do carrinho (SITE_CONFIG.launchDate).
 * Quando a data passa, mostra "O carrinho abriu!".
 */
(function () {
  var box = document.querySelector("[data-countdown]");
  var cfg = window.SITE_CONFIG;
  if (!box || !cfg) return;

  var target = new Date(cfg.launchDate).getTime();
  if (isNaN(target)) { box.hidden = true; return; }

  var els = {
    dias: box.querySelector('[data-unit="dias"]'),
    horas: box.querySelector('[data-unit="horas"]'),
    min: box.querySelector('[data-unit="min"]'),
    seg: box.querySelector('[data-unit="seg"]')
  };

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      box.textContent = "O carrinho abriu!";
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    els.dias.textContent = pad(Math.floor(s / 86400));
    els.horas.textContent = pad(Math.floor((s % 86400) / 3600));
    els.min.textContent = pad(Math.floor((s % 3600) / 60));
    els.seg.textContent = pad(s % 60);
  }

  var timer = setInterval(tick, 1000);
  tick();
})();
