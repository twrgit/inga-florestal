# Ingá Florestal

Site institucional one page em HTML, CSS e JavaScript, sem dependências de produção.

## Executar localmente

```sh
python3 -m http.server 8000
```

Acesse http://localhost:8000. Também é possível abrir `index.html` diretamente.

## Estrutura

- `index.html`: conteúdo semântico, metadados e dados estruturados ProfessionalService.
- `assets/css/styles.css`: layout responsivo e acessibilidade visual.
- `assets/js/script.js`: menu móvel, navegação suave sem alterar a URL.
- `assets/img/`: imagens, logos, texturas e favicon.
- `assets/fonts/`: fontes WOFF2 locais.
- `assets/sources.json`: origem dos recursos.
- `arquivos/`: referências originais.

## Antes da publicação

Confirmar domínio para adicionar URL canônica, og:url, imagem social com URL absoluta e sitemap.xml. Revisar os textos, contatos e nomes dos parceiros. Recursos do Drive já integrados: fontes, marca, texturas, fotografias e quatro logos de parceiros. AFB usa o original do Drive com fundo removido; Grupo Petrópolis usa a referência do PSD com fundo removido; a arte de abertura e a composição de Sobre nós preservam a referência aprovada. A arte de abertura contém texto visual; o título principal também está disponível em HTML para acessibilidade e indexação. Não há formulário ou backend; o contato funciona por telefone, e-mail e WhatsApp.

Os números e textos institucionais seguem o PSD recebido. Prévia publicada pelo GitHub Pages a partir da branch `main`: https://twrgit.github.io/inga-florestal/.

## Verificação

Conferidos no Chrome: menu móvel, navegação sem hash na URL, largura de 390 px sem transbordamento horizontal. Imagens, âncoras, dados estruturados e sintaxe JavaScript verificados. Os contatos do layout foram confirmados pelo cliente e prevalecem sobre os contatos diferentes do manual.

As fotos dos serviços usam uma grade estática, sem setas ou carrossel.

Os logos de parceiros estão em `assets/img/parceiros/`, com arquivos PNG transparentes e sem mistura de cores por CSS. O processo e o prompt de remoção de fundo estão documentados no README dessa pasta.

## Repositório e publicação

Código: https://github.com/twrgit/inga-florestal

Prévia: https://twrgit.github.io/inga-florestal/

O GitHub Pages publica automaticamente os commits enviados à branch `main`. As pastas `arquivos/` e `tmp/` ficam fora do Git.
