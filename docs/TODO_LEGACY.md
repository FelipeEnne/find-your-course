# Dívidas Técnicas e Melhorias — Find Your Course

Lista de melhorias futuras para retomada segura do projeto legado. Nenhuma alteração de código foi feita — este documento serve como backlog.

---

## Alta prioridade

### Segurança e autenticação

- [ ] **Login via GET com senha na query string** (`src/api/users.js`) — migrar para POST com body; risco de exposição em logs e proxies.
- [ ] **Sem tokens/JWT** — sessão baseada apenas em `localStorage`; vulnerável a XSS.
- [ ] **Credenciais e dados sensíveis** — revisar o que a API Rails expõe e como trafega.

### Dependências vulneráveis e desatualizadas

- [ ] `axios@0.19.2` — versão antiga com CVEs conhecidos; atualizar ou substituir.
- [ ] `react-scripts@3.4.1` / CRA 3 — desatualizado; avaliar upgrade ou migração para Vite.
- [ ] `react@16.13` — versão sem suporte; planejar upgrade para 18+.
- [ ] Executar `npm audit` e tratar vulnerabilidades críticas.

### Infraestrutura externa

- [ ] **Verificar se API Heroku ainda está ativa** (`protected-beyond-23220.herokuapp.com`).
- [ ] **Verificar se deploy Netlify ainda está ativo** (link no README).
- [ ] Documentar alternativa de hospedagem se serviços estiverem inativos.

### Qualidade e confiabilidade

- [ ] **Nenhum teste implementado** — apesar das libs de testing no `package.json`.
- [ ] **API URL hardcoded** em `src/api/url.js` — sem suporte a ambientes via `.env`.
- [ ] **Crash potencial no Login** — `JSON.parse(localGet)` sem try/catch se `localUser` estiver corrompido.

---

## Média prioridade

### Arquitetura e código

- [ ] Unificar cliente HTTP — hoje usa axios (users) e fetch (courses).
- [ ] Remover código morto: `getCoursesAction`, `getCourseAction`, reducer `userSigned` (quase sem uso).
- [ ] Padronizar nomenclatura "products" vs "courses" em actions/reducers/helpers.
- [ ] Corrigir `key={makeid(5)}` em listas — causa re-mount desnecessário.
- [ ] Criar `PrivateRoute` para centralizar proteção de rotas.
- [ ] Eliminar side-effect de `localStorage` na inicialização de `reducers/user.js`.

### Funcionalidades pendentes (README)

- [ ] Implementar barra de busca (input desabilitado em `Navbar.js`).
- [ ] Implementar warnings/notificações (mencionado como future work).

### Developer Experience

- [ ] Adicionar `.env.example` com `REACT_APP_API_URL`.
- [ ] Adicionar `.env` ao `.gitignore` (raiz).
- [ ] Consolidar lockfile — escolher npm ou yarn; remover o outro.
- [ ] Atualizar CI: `ubuntu-18.04` e Node 12 estão EOL; usar Node 18+ e `actions/checkout@v4`.
- [ ] Adicionar script `lint` e `stylelint` no `package.json`.

### Favoritos

- [ ] Migrar favoritos de nomes CSV para IDs de cursos — evita bugs com nomes duplicados ou alterados.
- [ ] Corrigir toggle visual Favorite/Unfavorite em `Info.js`.

### Assets

- [ ] Padronizar caminhos de imagens (`./img/` vs `/img/` vs `../img/`).

---

## Baixa prioridade

### Modernização

- [ ] Migrar de `connect()` para hooks (`useSelector`, `useDispatch`).
- [ ] Adotar `@reduxjs/toolkit` (já no package.json, não usado) ou remover dependência.
- [ ] Considerar TypeScript em migração gradual.
- [ ] Avaliar eject vs upgrade CRA vs migração para Vite.

### Refatoração

- [ ] Extrair lógica de favoritos para helper ou hook reutilizável.
- [ ] Separar estilos de `index.css` monolítico em módulos por página.
- [ ] Converter class patterns residuais (se houver) para functional components.

### UI/UX

- [ ] Corrigir typos na UI: "Mounth" → "Month", "starts" → "stars".
- [ ] Revisar acessibilidade (labels duplicados, botões em links).
- [ ] Remover dependências não utilizadas (`@brainhubeu/react-carousel`, toast libs duplicadas).

### Documentação

- [ ] Completar `DATABASE.md` após clonar backend Rails.
- [ ] Adicionar diagrama de deploy atualizado.
- [ ] Documentar contrato da API (OpenAPI/Swagger) — A confirmar se existe no backend.

---

## Arquivos confusos ou frágeis

| Arquivo | Problema |
|---------|----------|
| `src/reducers/user.js` | Lê `localStorage` no load do módulo; estado inicial inconsistente com Redux |
| `src/containers/Login.js` | `JSON.parse` sem guarda; redirect via JSX com `history.push` |
| `src/containers/Info.js` | Lógica de favoritos complexa; botão não atualiza estado visual |
| `src/api/courses.js` | Nomenclatura "products" para cursos |
| `src/actions/courses.js` | Actions exportadas mas não usadas |
| `src/reducers/userSigned.js` | Reducer registrado mas `CURRENT_USER` nunca disparado |
| `src/helper/index.js` | Mistura selectors de courses com utilitários genéricos |

---

## Pontos sem teste

- Login e logout
- Cadastro de usuário
- Listagem e detalhe de cursos
- Favoritar / desfavoritar
- Proteção de rotas
- Integração com API (mocks)

---

## Riscos de segurança (resumo)

1. Senha na URL (GET login)
2. Sem HTTPS enforcement no código (depende do host)
3. Sessão só em `localStorage`
4. Dependências com vulnerabilidades conhecidas
5. Sem validação de entrada robusta no frontend

---

## Oportunidades de refatoração (quando houver tempo)

- Camada `services/` para isolar chamadas API da UI
- Error boundaries para falhas de rede
- Loading e error states consistentes em todos os containers
- Remover `@reduxjs/toolkit` se não for adotado
