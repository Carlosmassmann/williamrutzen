# CLAUDE.md · Página de captura Black Friday Dr. William Rutzen

Contexto: página de captura (lista de aviso) para a Black Friday do Dr. William Rutzen, médico com foco em emagrecimento e medicina do estilo de vida. Lançamento em 13/11/2026. Narrativa: "Tudo que você precisa para construir a sua saúde."

## Regras do projeto

- Site estático: HTML, CSS e JS puros. Não adicionar frameworks, bundlers ou dependências sem pedir.
- Idioma da página: português do Brasil. Código e comentários também em português.
- Toda configuração que muda por campanha vai em `config/site.config.js`. Não espalhar IDs, datas ou links em HTML/JS.
- Cores, fontes e espaçamentos só em `assets/css/tokens.css`. Não escrever cores soltas nos outros CSS.
- Mobile-first. Testar em 375px, 768px e 1280px.
- Acessibilidade: `label` em todo campo, foco visível, contraste AA, `alt` em toda imagem, respeitar `prefers-reduced-motion`.
- Mídia fica em `acervo-midia/` com nomes em minúsculas e hífen. Imagens até ~300 KB.

## Regras de conteúdo (importante: autor é médico)

- A copy atual NÃO tem preço nem bônus porque a oferta ainda depende da aprovação do Dr. William. Não inventar preço, desconto, bônus, vagas ou depoimentos.
- Não prometer resultado ("emagreça X kg", "cura", "definitivo"). Linguagem educativa.
- Não inventar CRM/RQE nem credenciais. Só exibir o que estiver em `doctor.credentials`.
- Sem urgência falsa: não usar "últimas vagas" para produto digital. O prazo real é a janela da Black Friday.
- Manter o aviso legal do rodapé (`disclaimer` na config): "Conteúdo educativo; não substitui consulta médica."
- O formulário exige consentimento explícito (LGPD). Não pré-marcar a caixa.

## Comandos

```bash
npx serve .                 # servir em http://localhost:3000
node --check assets/js/*.js # checar sintaxe dos scripts
```

## Tarefas em aberto (ordem sugerida)

1. Conectar o formulário ao endpoint real (`formEndpoint`) e testar o payload descrito no README.
2. Colocar a foto real do Dr. William e a imagem `og.jpg`; revisar o enquadramento do `.foto`.
3. Preencher `whatsappGroupUrl`, `metaPixelId`, `credentials` e confirmar `launchDate`.
4. Revisar o visual no celular real e ajustar espaçamentos/tipografia em `tokens.css`.
5. Criar `vendas.html` (página do combo) quando a oferta for aprovada, reaproveitando os componentes.

## Prompts úteis para o Claude Code

- "Revise acessibilidade e contraste de index.html e corrija o que for crítico."
- "Troque o fundo do hero por uma foto do Dr. William em acervo-midia/fotos-dr-william mantendo o texto legível."
- "Crie vendas.html com a oferta do combo usando os componentes existentes. Preço e bônus virão da config."
- "Otimize as imagens de acervo-midia para WebP e atualize as referências."
