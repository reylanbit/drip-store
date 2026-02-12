# GitHub Projects Table (Spreadsheet-like)

Aplicação React + Vite + TypeScript que lista Issues e PRs do GitHub em uma interface de tabela interativa (estilo planilha) com filtros e ordenação.

## Rodar local
- Copie `.env.example` para `.env` e defina `VITE_GITHUB_CLIENT_ID` (usado no fluxo OAuth).
- Na pasta `apps/projects-table`:
  - `npm install`
  - `npm run dev`
- Clique em “Login com GitHub”. O app usa **OAuth Device Flow** via funções serverless:
  1. O app gera um `user_code` e abre o link de verificação oficial do GitHub.
  2. Após autorizar, o app faz polling até receber o `access_token` e então carrega seus dados.
  3. Se o Device Flow falhar em dev local (sem backend online), um fallback solicita colar um PAT com escopos `repo, read:org`.

## Tecnologias
- React + Vite + TS
- TailwindCSS
- TanStack Table
- GitHub GraphQL API

## Próximos passos
- Deploy em Vercel com variáveis:
  - `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` (defina via Vercel Project Settings → Environment Variables)
- Agrupamento por coluna e campos customizados
- Agrupamento por coluna e campos customizados
- Saved Views em localStorage
