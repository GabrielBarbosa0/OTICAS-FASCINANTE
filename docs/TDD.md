# TDD - Oticas Fascinante

## 1. Visao Geral

Este documento descreve o desenho tecnico da landing page da Oticas Fascinante.
O projeto e uma pagina estatica criada com HTML, CSS e JavaScript puro, sem etapa
de build, com foco em apresentacao comercial, conteudo educativo e conversao para
atendimento via WhatsApp.

O fluxo principal da pagina e:

1. Apresentar a marca e os diferenciais da otica.
2. Mostrar contexto de uso, cuidado visual, marcas, catalogo e blog.
3. Guiar o visitante por um quiz visual de preferencias.
4. Gerar uma mensagem personalizada para WhatsApp com o resumo das respostas.

## 2. Objetivos do Projeto

- Transmitir confianca, cuidado visual e curadoria de produtos.
- Facilitar o contato direto pelo WhatsApp.
- Reduzir friccao no pre-atendimento com um quiz simples e visual.
- Manter uma base estatica facil de hospedar, editar e versionar.
- Preservar boa experiencia em desktop e mobile.

## 3. Stack Tecnica

- HTML5 em `index.html`
- CSS3 em `styles.css`
- JavaScript puro em `script.js`
- Lucide Icons via CDN
- Assets locais em `assets/`

Nao ha dependencia de bundler, framework, compilador ou backend.

## 4. Estrutura Principal

```text
OTICAS-FASCINANTE/
├── assets/
│   ├── catalogo/
│   ├── marcas/
│   ├── model/
│   ├── people/
│   ├── pixabay/
│   └── warby parker/
├── docs/
│   └── TDD.md
├── index.html
├── styles.css
├── script.js
├── README.md
└── LICENSE
```

## 5. Arquitetura da Pagina

### `index.html`

Responsavel pela estrutura semantica da landing page:

- Navbar fixa com links internos e CTA de agendamento via WhatsApp.
- Hero section com marca, texto de apoio e CTAs.
- Secao visual com pessoas usando oculos.
- Secao de cuidado visual.
- Secao de etapas de atendimento.
- Secao de marcas parceiras.
- Catalogo com cards de categorias.
- Secao de quiz em `#pre-atendimento`.
- Secao de blog com links externos para Blogger.
- Secao de contato e redes sociais.
- Rodape com credito do desenvolvedor.

### `styles.css`

Responsavel por identidade visual, responsividade e estados de UI:

- Paleta baseada em azul escuro, branco e azul claro.
- Layouts full-height no desktop.
- Grid responsivo para marcas, catalogo, cards e quiz.
- Estilizacao do quiz, incluindo:
  - cards de opcoes;
  - carrossel da etapa de formatos;
  - swatches de cores;
  - tela final de resumo;
  - CTA de WhatsApp.

### `script.js`

Responsavel por comportamento e interatividade:

- Menu mobile.
- Filtro de catalogo.
- Criacao dinamica do quiz.
- Controle de respostas.
- Carrossel de formatos.
- Renderizacao da tela final.
- Geracao da mensagem para WhatsApp.
- Persistencia local basica do lead do quiz.

## 6. Fluxo do Quiz

O quiz fica dentro do elemento:

```html
<div class="quiz-card" id="style-quiz" data-crm-module="quiz_preferencias">
```

As etapas sao definidas no array `quizSteps`, em `script.js`.

Etapas atuais:

1. Interesse: oculos de grau ou grau e solar.
2. Referencia visual: linhas femininas ou masculinas.
3. Formatos: quadrado, retangular, redondo, gatinho e aviador.
4. Cores: coloridas, neutras, preto, marrom, duas cores, azul, dourado e prata.
5. Materiais: acetato, metal ou misto.
6. Encaixe: rosto estreito, medio ou largo.
7. Receita: ja tenho, ainda nao tenho ou quero atualizar.

Cada etapa pode ser:

- escolha unica;
- escolha multipla;
- visual com imagem;
- visual compacta;
- swatch de cor;
- carrossel.

## 7. Geracao da Mensagem de WhatsApp

O numero atual e definido em:

```js
const whatsappNumber = "5581998940165";
```

A funcao `buildWhatsAppMessage()` monta uma mensagem com todas as respostas:

```text
Ola, fiz o quiz da Oticas Fascinante e gostaria de uma orientacao.

Interesse: ...
Referencia: ...
Formatos: ...
Cores: ...
Material: ...
Encaixe: ...
Receita: ...

Pode me ajudar a escolher a opcao que faz mais sentido?
```

Na tela final, o botao `Enviar no WhatsApp` aponta para:

```text
https://wa.me/{numero}?text={mensagem_codificada}
```

## 8. Persistencia Local

Ao finalizar o quiz, o projeto salva um registro local no navegador com a chave:

```text
oticasFascinanteQuizLeads
```

Cada item salvo contem:

- data de criacao;
- origem do lead;
- respostas do quiz;
- mensagem gerada para WhatsApp.

Essa persistencia e apenas um apoio de prototipo. Ela nao substitui um CRM,
backend, planilha ou integracao real.

## 9. Integracoes Externas

### WhatsApp

Usado nos CTAs principais de atendimento e no resultado do quiz.

### Blogger

A secao de blog aponta para:

```text
https://oticasfascinanteoficial.blogspot.com/
```

Os cards de artigos usam links diretos para posts publicados no Blogger.

### Redes sociais

- Instagram: `oticasfascinanteoficial`
- Facebook: `oticasfascinanteoficial`

## 10. Assets

Principais grupos de assets:

- `assets/catalogo/`: imagens usadas nos cards de catalogo.
- `assets/marcas/`: logos das marcas parceiras.
- `assets/people/`: fotos principais de contexto humano.
- `assets/pixabay/`: imagens auxiliares.
- `assets/warby parker/`: imagens usadas no quiz.
- `assets/model/`: arquivos 3D preservados para possivel uso futuro.

## 11. Decisoes de Design

- Navbar sem transparencia para manter leitura e presenca de marca.
- Hero section limpa, com o bloco antigo de metricas comentado no HTML.
- CTA "Agendar" envia direto para WhatsApp.
- Secao "Vamos entender o que combina com voce" usa quiz em vez de formulario.
- Quiz inspirado em experiencias de recomendacao visual, com imagens grandes e escolhas simples.
- Ultima tela do quiz destaca o proximo passo e apresenta o resumo em mini-cards.
- Cache busting manual por query string em CSS e JS.

## 12. Responsividade

Pontos importantes:

- Em mobile, menus viram dropdown.
- Grids reduzem para uma coluna quando necessario.
- Marcas em mobile usam duas colunas para economizar espaco.
- Quiz remove botoes laterais do carrossel em telas menores.
- Tela final do quiz troca layout horizontal por vertical em mobile.

## 13. Acessibilidade

Cuidados ja presentes:

- Uso de `aria-label` em secoes e controles relevantes.
- Textos alternativos em imagens.
- Botoes reais para interacoes do quiz.
- `aria-pressed` nas opcoes selecionaveis do quiz.
- Navegacao principal nomeada.

Pontos futuros:

- Revisar foco visual em todas as etapas do quiz.
- Testar fluxo completo apenas por teclado.
- Validar contraste com ferramenta automatizada.

## 14. Plano de Validacao

Validacoes recomendadas antes de publicar:

1. Abrir `index.html` em desktop e mobile.
2. Conferir se CSS e JS carregam com a query string mais recente.
3. Testar navbar e menu mobile.
4. Testar todos os links externos.
5. Avancar por todas as etapas do quiz.
6. Testar escolhas multipla e unica.
7. Verificar se a tela final cabe no card em `1920x1080`.
8. Conferir se o link do WhatsApp abre com mensagem preenchida.
9. Verificar se nao ha rolagem horizontal.
10. Conferir console do navegador para erros.

## 15. Manutencao e Evolucao

Possiveis proximos passos:

- Manter README e TDD sincronizados conforme o quiz evoluir.
- Integrar envio do quiz com CRM, planilha ou backend.
- Adicionar analytics de cliques em CTAs.
- Criar testes automatizados basicos com Playwright.
- Revisar performance das imagens e adicionar formatos otimizados.
- Versionar melhor o cache busting ou automatizar esse processo.

## 16. Riscos Conhecidos

- Como o projeto e estatico, nao ha captura real de leads fora do navegador.
- `localStorage` pode ser limpo pelo usuario e nao e fonte confiavel de dados comerciais.
- Links externos dependem de disponibilidade de WhatsApp, Blogger e redes sociais.
- Assets com nomes contendo espacos exigem atencao em paths e hospedagem.
- Cache busting manual pode ser esquecido em alteracoes futuras.

## 17. Como Rodar Localmente

Opcao simples:

```text
Abrir index.html no navegador.
```

Opcao com servidor local:

```bash
python -m http.server 4173
```

Depois acessar:

```text
http://localhost:4173
```
