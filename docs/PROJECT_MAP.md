# Mapa do Projeto — Find Your Course

## Propósito

**Find Your Course** é um aplicativo web mobile para listar cursos, ver detalhes e favoritar itens. Foi desenvolvido como projeto de capstone (Microverse), inspirado no conceito do app [Find your house](https://www.behance.net/gallery/37706679/Circle-(Landing-page-Dashboard-Mobile-App)).

Este repositório contém **apenas o frontend**. A API REST roda em um backend separado em Ruby on Rails.

- **README original:** [README.md](../README.md)
- **Backend (API):** [api_find_your_course](https://github.com/FelipeEnne/api_find_your_course)
- **Deploy frontend (referência):** [Netlify](https://eloquent-euclid-648aac.netlify.app/) — A confirmar se ainda está ativo

---

## Visão geral para novo desenvolvedor

1. O app é uma SPA (Single Page Application) criada com Create React App.
2. O estado global usa Redux com redux-thunk.
3. A autenticação persiste no `localStorage` (chave `localUser`), não em cookies ou tokens JWT.
4. A URL da API está hardcoded em `src/api/url.js` — não há variáveis de ambiente configuradas hoje.
5. Antes de rodar localmente, verifique se a API (Heroku ou backend local) está acessível.

---

## Estrutura de pastas

```
find-your-course/
├── .github/workflows/   # CI (ESLint e Stylelint em PRs)
├── docs/                # Documentação do projeto (este diretório)
├── public/              # Assets estáticos e index.html
│   └── img/             # Imagens da UI (login, ícones, screenshots)
├── src/
│   ├── actions/         # Action creators Redux
│   ├── api/             # Chamadas HTTP à API externa
│   ├── components/      # Componentes reutilizáveis e rotas (App.js)
│   ├── containers/      # Páginas (telas completas)
│   ├── helper/          # Selectors e utilitários de estado
│   ├── reducers/        # Reducers Redux e criação do store
│   ├── index.js         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais
├── package.json
└── README.md
```

---

## Responsabilidade de cada pasta

| Pasta | Responsabilidade |
|-------|------------------|
| `src/containers/` | Páginas: Login, Signup, Home, Info, Favorite. Contêm lógica de negócio e conexão com Redux/API. |
| `src/components/` | UI reutilizável: Navbar, tabelas de favoritos, Loading, App (definição de rotas). |
| `src/api/` | Comunicação HTTP com o backend Rails (`users.js`, `courses.js`, `url.js`). |
| `src/actions/` | Action creators puros para Redux (`user.js`, `courses.js`, `loader.js`). |
| `src/reducers/` | Estado global: usuário, cursos e store (`index.js` cria o store). |
| `src/helper/` | Funções auxiliares para ler estado Redux e utilitários (`makeid`, `numberFormat`). |
| `public/` | `index.html` e imagens servidas estaticamente. |
| `.github/workflows/` | Pipeline de lint em pull requests. |

---

## Arquivos importantes

| Arquivo | Por que é crítico |
|---------|-------------------|
| `src/api/url.js` | Define a URL base da API (Heroku ou localhost). |
| `src/api/users.js` | Login, cadastro e atualização de favoritos. |
| `src/api/courses.js` | Listagem e detalhe de cursos (thunks Redux). |
| `src/reducers/user.js` | Estado do usuário; lê `localStorage` na inicialização do módulo. |
| `src/reducers/index.js` | Combina reducers e exporta o store. |
| `src/components/App.js` | Rotas da aplicação. |
| `src/index.js` | Inicializa `localStorage` e monta o React com Provider Redux. |
| `package.json` | Dependências e scripts npm. |

---

## Dependências relevantes

### Core

- `react` / `react-dom` ^16.13 — UI
- `react-scripts` 3.4.1 — Create React App (build e dev server)
- `redux`, `react-redux`, `redux-thunk` — estado global
- `@reduxjs/toolkit` — presente no `package.json`, mas **não utilizado** no código

### Roteamento e HTTP

- `react-router-dom` ^5.2 — rotas
- `axios` ^0.19.2 — requisições de usuário
- `fetch` nativo — requisições de cursos (sem axios)

### UI

- `bootstrap` / `react-bootstrap` — layout e componentes
- `react-multi-carousel` — carrossel na Home
- `react-rater` — exibição de estrelas
- `@fortawesome/*` — ícones (uso limitado)

### Qualidade de código

- `eslint` + `eslint-config-airbnb` — lint JavaScript
- `stylelint` — lint CSS

### Testes (bibliotecas instaladas, sem testes escritos)

- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

---

## Rotas da aplicação

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Login | Tela de login |
| `/signup` | Signup | Cadastro de usuário |
| `/home` | Home | Lista de cursos em carrossel |
| `/info/:id` | Info | Detalhe de um curso |
| `/favorite` | Favorite | Cursos favoritados pelo usuário |

---

## Links úteis

- [Documentação de arquitetura](./ARCHITECTURE.md)
- [Setup local](./SETUP.md)
- [Comandos](./COMMANDS.md)
- [Fluxos](./FLOWS.md)
- [Banco de dados (backend)](./DATABASE.md)
- [Dívidas técnicas](./TODO_LEGACY.md)
