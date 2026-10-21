# Ingá Florestal

Site institucional em HTML, CSS e JavaScript, com fontes e imagens locais e sem dependências de produção.

## Prévia local

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8000/index.html.

## Referência visual

Modelo principal: https://marvelapp.com/prototype/121927h4/screen/99116968, correspondente ao PSD e PNG v4 disponíveis em `arquivos/` (fora do Git).

A revisão de 15/10/2026 consolida o CSS em uma única definição por componente e reproduz as coordenadas do desenho de 1440 px no desktop, com medidas proporcionais. Em 1280 px, a página tem 7976 px de altura, como a referência. Em telas de até 700 px, o conteúdo passa para o fluxo vertical, sem alturas fixas para os serviços.

Os fundos dos serviços, os grafismos, a floresta e a composição de viveiro com faixa verde foram exportados do PSD preservando cores, máscaras e modos de mesclagem. As fotos dos serviços preservam os recortes do PNG aprovado. Os textos são HTML com PP Neue Montreal e Nebulica locais; os textos pequenos da abertura também são HTML para evitar rasterização. As letras de Ingá na abertura e a marca do cabeçalho permanecem estáticas.

Cores confirmadas pelo cliente: cabeçalho `#1A422D` e rodapé `#382313`. O rodapé mantém três colunas e ícones SVG vinculados aos perfis oficiais de LinkedIn e Instagram, confirmados pelo cliente em 15/10/2026. Os perfis abrem em nova aba. Os dois botões “Fale com a gente” compartilham o mesmo estilo e apontam para o WhatsApp confirmado.

Os indicadores contam até seus valores finais ao entrar na tela. Os parceiros avançam um logo por vez, com intervalo de 1,6 segundo, transição de 275 ms e setas anterior/próximo, conforme revisão de 16/10/2026. O avanço pausa quando a faixa de logos ou suas setas recebem foco, a aba fica oculta ou a seção sai da tela. Navegar para a seção e passar o mouse não interrompem o avanço automático. Movimento reduzido desativa a contagem e o avanço automático.

## Verificações da revisão

Conferidos no Chrome em 1280 px: proporções de todas as seções, galerias e imagens carregadas. A correção posterior de movimento foi conferida no Chrome: fades das letras ativos, avanço automático após navegação à seção e ausência de setas. Em 390 px: ausência de transbordamento horizontal, tipografia e abertura/fechamento do menu. Sintaxe JavaScript, estrutura HTML, recursos locais e `git diff --check` verificados. Capturas locais de comparação ficam em `tmp/`, fora do Git.

A fotografia de contato usa a imagem das vagens verdes ao sol fornecida pelo cliente em 21/10/2026, convertida para WebP. O favicon permanece aguardando as opções que o cliente enviará.

## Publicação

Repositório: https://github.com/twrgit/inga-florestal

GitHub Pages: https://twrgit.github.io/inga-florestal/

O Pages publica commits enviados à branch `main`. O envio desta revisão à `main` foi autorizado pelo cliente em 15/10/2026.

## Ajustes de 16/10/2026

Botões com bordas arredondadas e estilo compartilhado; licenciamento em creme; contato com título maior e mais baixo, ícones e marca do rodapé em verde claro. Textura do rodapé recuperada da composição original do PSD. Efeitos da marca removidos e velocidade dos parceiros duplicada, com ambas as setas.

Drives fornecidos conferidos novamente: a pasta adicional contém o mesmo PSD e PNG v4. A fotografia do ingá em maior resolução não foi localizada nos recursos consultados; mantém-se a atual até localizar um original superior. Favicon aguarda as opções do cliente.

Verificação desta revisão: contato/rodapé e setas no Chrome desktop, integridade dos recursos locais, sintaxe JavaScript e git diff --check.

## Ajustes de 21/10/2026

Aplicados os pedidos da apresentação de QA mobile e desktop fornecida pelo cliente:
https://docs.google.com/presentation/d/1YrMmXI1_UD0mFM3NhnAuCl4ZHWARp6hksN8viWuf2bs/edit

A abertura mobile passa a exibir o grid quadrado acima da fotografia aérea, com letras e textos posicionados conforme a referência. As seções mobile compartilham margens laterais maiores e os serviços recebem mais respiro acima das tags. O texto sobre os viveiros fica mais próximo do indicador +350. O contato mobile usa conteúdo em fluxo, com o botão a 24 px das informações; no desktop, título, informações e botão sobem juntos para ampliar o espaço inferior.

Fundos dos serviços reexportados isoladamente do PSD para eliminar interferência das seções vizinhas. Removido o grafismo de Perícias e laudos técnicos em ambas as versões. Bordas residuais das galerias e das imagens nas transições foram aparadas. Os separadores das listas mobile acompanham a altura do texto, incluindo itens que ocupam duas linhas.

Verificação no Chrome em 320, 390, 700, 1280 e 1440 px: carregamento de imagens, ausência de transbordamento horizontal e erros JavaScript; abertura e fechamento do menu mobile. Capturas de conferência em `tmp/qa-*.png`. Publicação desta revisão autorizada pelo cliente em 21/10/2026.


Ajuste adicional de 21/10/2026: removida a animação das letras da abertura e o grafismo de curvas de nível de Inventário e Vegetação no desktop e no mobile. Fotografia de contato substituída pela nova imagem das vagens verdes ao sol.
