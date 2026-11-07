/**
 * Formulário de captura: máscara de WhatsApp, validação, envio e redirecionamento.
 * O envio vai para SITE_CONFIG.formEndpoint (JSON). Sem endpoint, funciona em modo de teste local.
 */
(function () {
  var cfg = window.SITE_CONFIG || {};
  var forms = document.querySelectorAll("[data-lead-form]");
  if (!forms.length) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function onlyDigits(v) { return (v || "").replace(/\D/g, ""); }

  // (00) 00000-0000
  function maskPhone(v) {
    var d = onlyDigits(v).slice(0, 11);
    if (d.length <= 2) return d ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  function setError(form, name, msg) {
    var out = form.querySelector('[data-error-for="' + name + '"]');
    var input = form.elements[name];
    if (out) out.textContent = msg || "";
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validate(form) {
    var ok = true;
    var nome = form.elements.nome.value.trim();
    var email = form.elements.email.value.trim();
    var whats = onlyDigits(form.elements.whatsapp.value);

    setError(form, "nome", nome.length < 2 ? "Informe seu nome." : "");
    setError(form, "email", EMAIL_RE.test(email) ? "" : "Informe um e-mail válido.");
    // DDD + 9 dígitos (celular) ou 10 (fixo)
    setError(form, "whatsapp", whats.length >= 10 ? "" : "Informe seu WhatsApp com DDD.");
    setError(form, "consentimento", form.elements.consentimento.checked ? "" : "Marque para continuar.");

    ["nome", "email", "whatsapp", "consentimento"].forEach(function (n) {
      var out = form.querySelector('[data-error-for="' + n + '"]');
      if (out && out.textContent) ok = false;
    });
    return ok;
  }

  function status(form, msg, isError) {
    var el = form.querySelector("[data-form-status]");
    if (!el) return;
    el.textContent = msg || "";
    el.classList.toggle("is-error", !!isError);
  }

  function goToThanks() {
    var qs = window.location.search || "";
    window.location.href = (cfg.thankYouPath || "obrigado.html") + qs;
  }

  function send(payload) {
    if (cfg.captureMode === "whatsapp") return Promise.resolve();
    if (!cfg.formEndpoint) {
      // Modo de teste: sem endpoint configurado, apenas simula (somente em ambiente local)
      var local = ["localhost", "127.0.0.1", ""].indexOf(window.location.hostname) !== -1;
      if (local) {
        console.info("[form] formEndpoint vazio: lead NÃO foi enviado (modo teste)", payload);
        return Promise.resolve();
      }
      return Promise.reject(new Error("formEndpoint não configurado"));
    }
    return fetch(cfg.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
    });
  }

  forms.forEach(function (form) {
    form.elements.whatsapp.addEventListener("input", function (e) {
      e.target.value = maskPhone(e.target.value);
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      status(form, "");
      if (!validate(form)) return;

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Enviando...";

      var payload = {
        nome: form.elements.nome.value.trim(),
        email: form.elements.email.value.trim().toLowerCase(),
        whatsapp: "55" + onlyDigits(form.elements.whatsapp.value),
        consentimento: true,
        origem_formulario: form.getAttribute("data-position") || "",
        pagina: window.location.href.split("?")[0],
        data_hora: new Date().toISOString(),
        utms: window.Track ? window.Track.utms() : {}
      };

      send(payload)
        .then(function () {
          if (window.Track) window.Track.lead({ content_name: "lista-black-friday" });
          goToThanks();
        })
        .catch(function (err) {
          console.error("[form] erro ao enviar lead:", err);
          status(form, "Não foi possível concluir agora. Tente novamente em instantes.", true);
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  });
})();
