/**
 * PLANILHA DE LEADS · Black Friday Dr. William Rutzen
 *
 * Recebe os cadastros do formulário da página e grava uma linha por lead
 * na aba "Leads" da planilha onde este script estiver instalado.
 *
 * Como instalar (passo a passo também no README):
 *  1. Crie uma planilha no Google Sheets (ex.: "Leads · Black Friday Dr. William").
 *  2. Menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo inteiro.
 *  3. Salve. Clique em Implantar > Nova implantação > tipo "App da Web".
 *       Executar como: Eu  ·  Quem pode acessar: Qualquer pessoa
 *  4. Autorize o acesso e copie a URL que termina em /exec.
 *  5. Cole essa URL em formEndpoint, no arquivo config/site.config.js.
 *
 * Ao alterar este script depois, use Implantar > Gerenciar implantações >
 * editar (lápis) > Versão: "Nova versão", para manter a mesma URL.
 */

var ABA = "Leads";

var CABECALHO = [
  "Data/hora (Brasília)", "Nome", "E-mail", "WhatsApp", "Consentimento LGPD",
  "Formulário", "Página", "utm_source", "utm_medium", "utm_campaign",
  "utm_content", "utm_term", "fbclid", "gclid"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita linhas trocadas com cadastros simultâneos
  try {
    var d = JSON.parse(e.postData.contents);

    // Validação mínima no servidor (a página já valida antes de enviar)
    if (!d.nome || !d.email || !d.whatsapp || d.consentimento !== true) {
      return resposta({ ok: false, erro: "dados incompletos" });
    }

    var u = d.utms || {};
    obterAba().appendRow([
      Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss"),
      limpar(d.nome), limpar(d.email), limpar(d.whatsapp),
      "Sim", limpar(d.origem_formulario), limpar(d.pagina),
      limpar(u.utm_source), limpar(u.utm_medium), limpar(u.utm_campaign),
      limpar(u.utm_content), limpar(u.utm_term), limpar(u.fbclid), limpar(u.gclid)
    ]);

    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Abre a página no navegador: só confirma que o endpoint está no ar.
function doGet() {
  return resposta({ ok: true, info: "Endpoint de leads ativo. Use POST." });
}

function obterAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHO);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight("bold");
    aba.getRange("D:D").setNumberFormat("@"); // WhatsApp como texto (sem virar 5,55E+12)
  }
  return aba;
}

// Texto simples, até 300 caracteres, e sem virar fórmula na planilha
// (um "nome" começando com = + - @ poderia executar fórmulas).
function limpar(v) {
  var s = String(v == null ? "" : v).slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
