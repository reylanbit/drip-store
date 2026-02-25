# Drip Store

Projeto de e-commerce em React com Vite e Tailwind, estruturado em páginas e componentes reutilizáveis.

## Páginas

- Home: `/`
- Listagem de produtos: `/produtos`
- Visualização do produto: `/produto/:id`

## Tecnologias

- React
- Vite
- Tailwind CSS

## Como rodar localmente

- Requisitos: Node 18+ e npm
- Instale dependências: `npm install`
- Crie o arquivo `.env` na raiz com a variável abaixo (ou copie de `.env.example`):
  - `VITE_API_URL=https://dummyjson.com`
- Inicie em desenvolvimento: `npm run dev`
- Lint (qualidade de código): `npm run lint`
- Build de produção: `npm run build`
- Preview local do build: `npm run preview`

## API real

- O projeto consome uma API real via variável `VITE_API_URL`.
- Default: `https://dummyjson.com` (produtos em `/products` e `/products/:id`).
- Ajuste `VITE_API_URL` no `.env` para apontar outra API compatível.

## Deploy (Netlify)

- Build: `npm run build`
- Garanta o arquivo `public/_redirects` com `/* /index.html 200` para SPA.
- No Netlify:
  - New site from Git (ou deploy manual do diretório `dist`)
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Environment variables: adicionar `VITE_API_URL` conforme necessário
- Após publicar, compartilhe o link do site.

## Pull Request (Fork)

- Faça um Fork do repositório no GitHub.
- Clone seu fork, crie uma branch descritiva.
- Commit das mudanças e `push`.
- Abra um Pull Request do fork para o repositório original.
