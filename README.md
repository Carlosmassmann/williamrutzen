# Página de captura · Black Friday Dr. William Rutzen

Narrativa: **"Tudo que você precisa para construir a sua saúde."**
Lançamento: **13/11/2026**. Objetivo da página: capturar nome, e-mail e WhatsApp para a lista de aviso.

Site estático: HTML, CSS e JS puros, sem build e sem dependências. Abre em qualquer hospedagem (Vercel, Netlify, Hostinger, GitHub Pages).

## Como rodar localmente

```bash
# opção 1 (recomendada): servidor com recarga automática
npx serve .

# opção 2: Python
python -m http.server 5500
```

Abra `http://localhost:3000` (serve) ou `http://localhost:5500` (Python).

## Arquitetura

```
captura-construa-saude/
├── index.html                 Página de captura (hero, pilares, autor, para quem, passos, CTA final)
├── obrigado.html              Página pós-cadastro (botão do grupo de WhatsApp)
├── config/
│   └── site.config.js         ÚNICO lugar para datas, links, endpoint do form, pixel, credenciais
├── assets/
│   ├── css/
│   │   ├── tokens.css         Cores, fontes, espaçamentos (muda o visual todo daqui)
│   │   ├── base.css           Reset e estilos globais
│   │   ├── components.css     Botão, formulário, contagem, cartão de pilar, foto
│   │   └── sections.css       Layout de cada seção + responsivo
│   └── js/
│       ├── tracking.js        Meta Pixel, GA4 e captura de UTMs
│       ├── countdown.js       Contagem regressiva até launchDate
│       ├── form.js            Máscara, validação, envio do lead, redirecionamento
│       └── main.js            Textos da config, fotos com fallback, animações
└── acervo-midia/              Pasta central de mídia (ver abaixo)
```

## Acervo de mídia

| Pasta | O que colocar | Usado em |
|---|---|---|
| `fotos-dr-william/` | Retratos e fotos do Dr. William | Sessão 1 (hero): `will-serio-mobile1-sessao1.jpg` · Sessão 2: `will-atendimento-online-desktop1-sessao2.jpg` · Sessão 4 (Quem está por trás): `imagem-drwilliam-sessao4-fotodrwill.jpg` |
| `produtos-capas/` | Capas dos cursos e ebooks | Futuras seções de produtos |
| `logos/` | Logos (Dr. William, Epic Medical) | Topo e rodapé |
| `videos/` | Vídeos curtos de apresentação | Futuro hero com vídeo |
| `og-compartilhamento/` | `og.jpg` em 1200x630 | Prévia do link no WhatsApp/Instagram |
| `_originais/` | Arquivos pesados sem tratamento | Não vai para o ar |

Regras: nomes em minúsculas com hífen (`dr-william-retrato.jpg`); fotos até ~300 KB (use WebP ou JPG otimizado); sempre preencher o `alt` no HTML.
Enquanto a foto não existir, a página mostra um bloco azul decorativo no lugar.

## O que falta preencher (antes de publicar)

1. `config/site.config.js`
   - `launchDate`: confirmar o horário de abertura do carrinho.
   - `formEndpoint`: URL do webhook que recebe o lead (Make, n8n, Zapier, ListBoss).
   - `whatsappGroupUrl`: link de convite do grupo.
   - `tracking.metaPixelId` / `ga4Id`.
   - `doctor.credentials`: CRM/RQE exatamente como o Dr. William aprovar.
2. Fotos em `acervo-midia/` (retrato e `og.jpg`).
3. Aprovação do Dr. William sobre a copy (o texto atual não tem preço nem bônus de propósito).

## Formato do lead enviado ao endpoint (JSON)

```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "whatsapp": "5551999999999",
  "consentimento": true,
  "origem_formulario": "hero",
  "pagina": "https://seudominio.com/",
  "data_hora": "2026-11-09T14:30:00.000Z",
  "utms": { "utm_source": "instagram", "utm_campaign": "bf-captacao" }
}
```

## Publicação

1. Suba a pasta inteira (Vercel/Netlify: arraste a pasta ou conecte o repositório).
2. Aponte o domínio (ex.: `blackfriday.seudominio.com`).
3. Teste no celular: formulário, redirecionamento para `obrigado.html`, evento `Lead` no Pixel.

## Próximos passos sugeridos

- Página de vendas do combo (reaproveitar `tokens.css` e `components.css`).
- Página de espera de carrinho aberto (`vendas.html`) com o mesmo `launchDate`.
- Automação: webhook do formulário > planilha/CRM > mensagens de aquecimento no WhatsApp.
