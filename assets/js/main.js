/**
 * Inicialização geral: textos vindos da config, fotos com fallback e animações de entrada.
 */
(function () {
  var cfg = window.SITE_CONFIG || {};

  // Ano e aviso legal
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-disclaimer]").forEach(function (el) { el.textContent = cfg.disclaimer || ""; });

  // Credenciais do médico: só aparecem se preenchidas na config
  var cred = cfg.doctor && cfg.doctor.credentials;
  document.querySelectorAll("[data-doctor-credentials]").forEach(function (el) {
    if (cred) { el.textContent = cred; el.hidden = false; }
  });

  // Link do grupo de WhatsApp (página de obrigado)
  document.querySelectorAll("[data-whatsapp-group]").forEach(function (a) {
    if (cfg.whatsappGroupUrl) { a.href = cfg.whatsappGroupUrl; a.hidden = false; }
  });

  // Fotos: se o arquivo existir, mostra; se não, mantém o bloco decorativo
  document.querySelectorAll(".foto").forEach(function (box) {
    var img = box.querySelector("img");
    if (!img) return;
    function ok() { box.classList.add("has-image"); }
    function fail() { img.remove(); }
    if (img.complete) { img.naturalWidth > 0 ? ok() : fail(); }
    else { img.addEventListener("load", ok); img.addEventListener("error", fail); }
  });

  // Animação de entrada ao rolar
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
