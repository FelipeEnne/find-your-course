# Fluxos — Find Your Course

Documentação dos principais fluxos de negócio e chamadas de API.

---

## Formato do `localStorage`

Chave: `localUser`

```json
{
  "id": 1,
  "name": "nome_do_usuario",
  "email": "email@exemplo.com",
  "favorite": "Curso A,Curso B",
  "remember": true
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID do usuário na API |
| `name` | string | Nome de login |
| `email` | string | E-mail |
| `favorite` | string | Nomes de cursos favoritos separados por vírgula (CSV) |
| `remember` | boolean | `true` = sessão ativa; `false` = deslogado |

Inicializado em `src/index.js` com valores vazios se não existir.

---

## Endpoints da API

Base URL: definida em `src/api/url.js` (Heroku ou `localhost:3001`).

| Método | Endpoint | Parâmetros | Uso |
|--------|----------|------------|-----|
| GET | `/login` | `name`, `password` (query string) | Login |
| POST | `/users` | `name`, `email`, `password`, `password_confirmation`, `favorite` (query string) | Cadastro |
| PATCH | `/users/:id` | `favorite` (query string) | Atualizar favoritos |
| GET | `/courses` | — | Listar cursos |
| GET | `/courses/:id` | — | Detalhe de um curso |

**Atenção:** credenciais trafegam na query string no login — risco de segurança.

---

## Campos do curso (resposta da API)

Campos usados na UI:

| Campo | Uso |
|-------|-----|
| `id` | Identificador e rota `/info/:id` |
| `name` | Título do curso |
| `image` | URL da imagem |
| `value` | Preço mensal |
| `starts` | Avaliação em estrelas (typo no backend — provável `stars`) |
| `owner` | Nome do responsável |
| `description` | Texto descritivo |

---

## Fluxo: Login / Autenticação

```mermaid
sequenceDiagram
  participant U as Usuário
  participant L as Login.js
  participant API as api/users.js
  participant LS as localStorage
  participant R as Redux

  U->>L: Preenche name e password
  L->>API: GET /login?name=&password=
  API-->>L: dados do usuário ou vazio
  alt resposta válida
    L->>LS: setItem localUser remember=true
    L->>R: dispatch LOGIN
    L->>U: redirect /home
  else resposta vazia
    L->>U: permanece em /
  end
```

**Proteção de sessão existente:** se `localUser.remember === true`, Login redireciona direto para `/home`.

**Arquivos:** `src/containers/Login.js`, `src/api/users.js`, `src/actions/user.js`, `src/reducers/user.js`

---

## Fluxo: Cadastro (Signup)

```mermaid
sequenceDiagram
  participant U as Usuário
  participant S as Signup.js
  participant API as api/users.js

  U->>S: Preenche formulário
  S->>API: POST /users?... (se password === confirmation)
  API-->>S: resposta
  S->>U: redirect / (login)
```

**Observações:**

- Não há login automático após cadastro.
- Se `user.logged` no Redux, redireciona para `/home`.
- Validação de senha feita apenas no frontend (`password === confirmation`).

**Arquivos:** `src/containers/Signup.js`, `src/api/users.js`

---

## Fluxo: Listagem de cursos (Home)

```mermaid
sequenceDiagram
  participant H as Home.js
  participant API as api/courses.js
  participant R as Redux
  participant LS as localStorage

  H->>LS: verifica remember
  alt não autenticado
    H->>H: redirect /
  else autenticado
    H->>API: getCourses thunk
    API->>API: GET /courses
    API->>R: FETCH_PRODUCTS_SUCCESS
    R-->>H: resps (lista)
    H->>H: renderiza carrossel
  end
```

**Arquivos:** `src/containers/Home.js`, `src/api/courses.js`, `src/actions/loader.js`, `src/reducers/courses.js`

---

## Fluxo: Detalhe do curso (Info)

```mermaid
sequenceDiagram
  participant I as Info.js
  participant API as api/courses.js
  participant R as Redux

  I->>API: getCoursesId(id) thunk
  API->>API: GET /courses/:id
  API->>R: FETCH_PRODUCT_SUCCESS
  R-->>I: resp (curso único)
  I->>I: renderiza detalhe + botão Favorite
```

**Arquivos:** `src/containers/Info.js`, `src/api/courses.js`

---

## Fluxo: Favoritar / Desfavoritar

```mermaid
sequenceDiagram
  participant U as Usuário
  participant I as Info.js
  participant LS as localStorage
  participant API as api/users.js

  U->>I: clica Favorite
  I->>LS: lê favorite atual
  I->>I: adiciona ou remove nome do curso (CSV)
  I->>LS: atualiza localUser
  I->>API: PATCH /users/:id?favorite=
```

**Lógica:**

- Favoritos armazenados como **nomes de cursos** em string CSV, não IDs.
- Funções `findFavorite` e `findFavoriteID` manipulam o array localmente.
- O botão não alterna visualmente entre Favorite/Unfavorite de forma confiável (variável local `buttonFavorite` não re-renderiza).

**Arquivos:** `src/containers/Info.js`, `src/api/users.js`

---

## Fluxo: Listar favoritos (Favorite)

```mermaid
flowchart TD
  A[Favorite.js] --> B{remember?}
  B -->|não| C[redirect /]
  B -->|sim| D[getCourses - GET /courses]
  D --> E[Lê favorite do localStorage]
  E --> F[Cruza nomes favoritos com lista de cursos]
  F --> G[Renderiza tabelas desktop e mobile]
```

**Arquivos:** `src/containers/Favorite.js`, `src/components/FavoriteTable.js`, `src/components/FavoriteTableMobile.js`

---

## Fluxo: Logout

```mermaid
sequenceDiagram
  participant U as Usuário
  participant H as Home ou Favorite
  participant R as Redux
  participant LS as localStorage

  U->>H: clica Logout
  H->>R: dispatch LOGOUT
  H->>LS: localUser com remember=false e campos vazios
  H->>U: redirect /
```

**Arquivos:** `src/containers/Home.js`, `src/containers/Favorite.js`, `src/actions/user.js`

---

## Proteção de rotas

Não há `PrivateRoute` ou middleware de rota. Cada container protegido faz:

```javascript
const info = JSON.parse(localStorage.localUser);
if (!info.remember) {
  history.push('/');
}
```

Containers com essa verificação: `Home`, `Info`, `Favorite`.

---

## Integrações e features pendentes

| Feature | Status |
|---------|--------|
| Barra de busca | Input **desabilitado** em Navbar (`id="input-fillter"`) |
| Warnings / notificações | Mencionado no README como future work; libs instaladas (`react-toastify`, `react-notifications-component`) com uso limitado ou ausente — **A confirmar** |
| Carrossel alternativo | `@brainhubeu/react-carousel` no package.json — **A confirmar** se ainda é usado |

---

## Fluxo de dados geral

```mermaid
flowchart LR
  User["Usuário"] --> Pages["Containers"]
  Pages --> API["src/api"]
  API --> Rails["API Rails"]
  Pages --> LS["localStorage"]
  Pages --> Redux["Redux"]
  Redux --> Pages
  LS --> Pages
  LS --> Reducers["reducers/user.js init"]
```
