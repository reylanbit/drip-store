# GitHub Projects Table (Spreadsheet-like)

Aplicação React + Vite + TypeScript que lista Issues e PRs do GitHub em uma interface de tabela interativa (estilo planilha) com filtros e ordenação.

## Rodar local
- Copie `.env.example` para `.env` e defina `VITE_GITHUB_CLIENT_ID`.
- Na pasta `apps/projects-table`:
  - `npm install`
  - `npm run dev`
- Clique em “Login com GitHub” e cole um token (PAT) com escopos `repo, read:org` (provisório para dev). Em produção, substituiremos por OAuth Device Flow.

## Tecnologias
- React + Vite + TS
- TailwindCSS
- TanStack Table
- GitHub GraphQL API

## Próximos passos
- Autenticação via OAuth Device Flow (sem backend)
- Agrupamento por coluna e campos customizados
- Saved Views em localStorage
