/**
 * CONFIGURAÇÃO CENTRAL DA PÁGINA
 * Tudo que muda de uma campanha para outra fica aqui.
 * Não precisa mexer em HTML/JS para trocar datas, links ou IDs de rastreamento.
 */
window.SITE_CONFIG = {
  // Data/hora da abertura do carrinho (fuso de Brasília, -03:00).
  // TODO: confirmar o horário de abertura com o Dr. William.
  launchDate: "2026-11-16T10:00:00-03:00",

  // Como o lead é capturado:
  //  "endpoint": envia o formulário para formEndpoint (Make, n8n, Zapier, ListBoss, etc.)
  //  "whatsapp": redireciona direto para o grupo (sem salvar o lead)
  captureMode: "endpoint",

  // URL que recebe o JSON do lead. Para a planilha do Google, cole aqui a URL
  // do App da Web (termina em /exec) gerada com integracoes/planilha-leads.gs.
  // Deixe vazio durante o desenvolvimento.
  formEndpoint: "https://script.google.com/macros/s/AKfycbz8RK3UXj911KEqicnCxvW0J9SvQ9DB3kmjKOr59r9CfQFUXTEphW2DHSRrCYc1KOL9ig/exec",

  // Link de convite do grupo de WhatsApp (aparece na página de obrigado).
  whatsappGroupUrl: "https://chat.whatsapp.com/CfyWtm78BwqGBvctXQOr9i",

  // Página exibida após o cadastro.
  thankYouPath: "obrigado.html",

  // Rastreamento. Deixe vazio para desativar.
  tracking: {
    metaPixelId: "924982403902542",
    ga4Id: ""
  },

  // Dados do Dr. William exibidos na seção "Quem está por trás".
  // Só preencha o que ele aprovar. Campos vazios não aparecem na página.
  doctor: {
    name: "Dr. William Rutzen",
    credentials: "" // Ex.: "CRM-XX 00000 · RQE 0000" (preencher com o dado real)
  },

  // Texto legal do rodapé (já alinhado com o padrão dos vídeos do canal).
  disclaimer:
    "Conteúdo educativo; não substitui consulta médica. Não interrompa nem altere nenhum tratamento sem orientação do seu médico."
};
