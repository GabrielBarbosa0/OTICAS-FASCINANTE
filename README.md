# Óticas Fascinante

Protótipo de landing page para a Óticas Fascinante, criado com HTML, CSS e JavaScript puro. A proposta do site é apresentar a ótica de forma visual, clara e orientada ao cliente, destacando cuidado visual, marcas parceiras, catálogo, conteúdos educativos e canais de atendimento.

## Visão Geral

A landing page foi pensada para transmitir uma ideia de saúde, confiança e atendimento próximo, usando uma identidade visual baseada em azul escuro, branco e tons claros. O projeto prioriza uma experiência responsiva, com seções em estilo Full HD no desktop e ajustes específicos para mobile.

## Funcionalidades

- Hero section limpa com marca em destaque, CTA de catálogo e CTA de cuidados.
- Botão **Agendar** na navbar abrindo WhatsApp diretamente com mensagem pronta.
- Seção visual com imagens de pessoas usando óculos.
- Seção de cuidado visual com cards explicando o processo de escolha.
- Etapas de atendimento da receita ao óculos pronto.
- Seção de marcas parceiras com grid responsivo.
- Catálogo de produtos com cards por necessidade/uso.
- Formulário de orientação para captar informações do cliente.
- Blog com sugestões de conteúdos educativos.
- Redes sociais com WhatsApp, Instagram e Facebook.
- Rodapé com crédito discreto para o GitHub do desenvolvedor.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Lucide Icons via CDN

O projeto é estático e não exige build.

## Estrutura

```text
OTICAS-FASCINANTE/
├── assets/
│   ├── catalogo/        # Imagens usadas no catálogo
│   ├── marcas/          # Logos das marcas parceiras
│   ├── model/           # Arquivos 3D preservados para uso futuro
│   ├── people/          # Imagens principais de pessoas usando óculos
│   ├── pixabay/         # Imagens auxiliares de banco
│   └── warby parker/    # Referências visuais e assets de inspiração
├── index.html
├── styles.css
├── script.js
├── LICENSE
└── README.md
```

## Como Rodar Localmente

Abra o `index.html` diretamente no navegador ou rode um servidor local:

```bash
python -m http.server 4173
```

Depois acesse:

```text
http://localhost:4173
```

## Seções da Página

- **Hero:** apresentação principal da Óticas Fascinante.
- **Rotina:** imagens chamativas para mostrar óculos no uso cotidiano.
- **Cuidado visual:** cards sobre análise, lentes, acompanhamento e proteção.
- **Atendimento:** etapas do processo até o óculos pronto.
- **Marcas:** logos das marcas parceiras em destaque.
- **Catálogo:** categorias de produtos e estilos.
- **Orientação:** formulário simples para entender a necessidade do cliente.
- **Blog:** ideias de artigos para relacionamento com clientes.
- **Contato:** links oficiais de WhatsApp, Instagram e Facebook.

## Formulário e CRM

O formulário da seção "Vamos entender o que combina com você" é um protótipo para futura integração com CRM. Hoje, ao enviar, os dados são salvos no `localStorage` do navegador com a chave:

```text
oticasFascinanteLeads
```

Os campos usam atributos `data-crm-field`, facilitando uma futura integração com backend, planilha, CRM ou ferramenta de automação.

## Links de Atendimento

- WhatsApp: <https://wa.me/5581998940165>
- Instagram: <https://www.instagram.com/oticasfascinanteoficial/>
- Facebook: <https://www.facebook.com/oticasfascinanteoficial/>

## Notas de Protótipo

- A antiga animação/modelo 3D de óculos foi removida temporariamente da interface.
- Os arquivos 3D continuam em `assets/model/` para possível uso futuro.
- Os filtros do catálogo estão preservados no HTML/JS, mas ocultos no CSS por enquanto.
- Os cards de diferenciais da hero estão preservados no HTML, mas ocultos com `display: none`.

## Autor

Desenvolvido por [Gabriel Barbosa0](https://github.com/GabrielBarbosa0).
