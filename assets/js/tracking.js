/**
 * Rastreamento: Meta Pixel e GA4 (opcionais) + captura de UTMs.
 * IDs ficam em config/site.config.js. Sem ID, nada é carregado.
 */
(function () {
  var cfg = (window.SITE_CONFIG && window.SITE_CONFIG.tracking) || {};
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

  // Guarda UTMs da primeira visita para enviar junto com o lead
  function captureUtms() {
    try {
      var params = new URLSearchParams(window.location.search);
      var saved = JSON.parse(sessionStorage.getItem("utms") || "{}");
      UTM_KEYS.forEach(function (k) { if (params.get(k)) saved[k] = params.get(k); });
      sessionStorage.setItem("utms", JSON.stringify(saved));
    } catch (e) { /* storage indisponível: segue sem UTMs */ }
  }

  function getUtms() {
    try { return JSON.parse(sessionStorage.getItem("utms") || "{}"); } catch (e) { return {}; }
  }

  function loadMetaPixel(id) {
    if (!id || window.fbq) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  function loadGa4(id) {
    if (!id) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }

  captureUtms();
  loadMetaPixel(cfg.metaPixelId);
  loadGa4(cfg.ga4Id);

  window.Track = {
    utms: getUtms,
    lead: function (meta) {
      if (window.fbq) window.fbq("track", "Lead", meta || {});
      if (window.gtag) window.gtag("event", "generate_lead", meta || {});
    }
  };
})();
