# Comandos — Find Your Course

Referência rápida de comandos para desenvolvimento, build, lint e testes.

---

## Scripts npm (package.json)

| Comando | Script | Descrição |
|---------|--------|-----------|
| `npm start` | `react-scripts start` | Servidor de desenvolvimento em http://localhost:3000 |
| `npm run build` | `react-scripts build` | Build de produção na pasta `build/` |
| `npm test` | `react-scripts test` | Testes com Jest (modo interativo/watch) |
| `npm run eject` | `react-scripts eject` | Eject do CRA — **irreversível**, evitar em projeto legado |
| `npm run fix` | `npx eslint . --fix` | Corrige problemas ESLint automaticamente |

Equivalentes com yarn:

```bash
yarn start
yarn build
yarn test
yarn eject
yarn fix
```

---

## Instalar dependências

```bash
npm install
# ou
yarn install
```

**Nota:** existem `package-lock.json` e `yarn.lock`. Use apenas um gerenciador.

---

## Rodar frontend

```bash
npm start
```

Variáveis de ambiente do CRA (não usadas pelo código hoje, mas disponíveis):

```bash
# Porta customizada (exemplo)
PORT=3001 npm start   # Linux/macOS
set PORT=3001 && npm start   # Windows CMD
$env:PORT=3001; npm start   # Windows PowerShell
```

---

## Rodar backend

O backend **não está neste repositório**.

```bash
# No repositório api_find_your_course (passos exatos: A confirmar)
# git clone https://github.com/FelipeEnne/api_find_your_course
# cd api_find_your_course
# bundle install
# rails server -p 3001
```

---

## Testes

```bash
# Modo interativo (watch)
npm test

# Execução única (CI)
CI=true npm test
```

**Situação atual:** não há arquivos `*.test.js` ou `*.spec.js` no repositório. O comando existe, mas não há testes implementados.

---

## Build

```bash
npm run build
```

Gera a pasta `build/` com assets otimizados para produção.

Servir localmente para teste:

```bash
npx serve -s build
```

---

## Lint

### ESLint

```bash
# Verificar
npx eslint .

# Corrigir automaticamente
npm run fix
# ou
npx eslint . --fix
```

Configuração: `.eslintrc.json` (extends Airbnb + React).

### Stylelint

```bash
npx stylelint "**/*.{css,scss}"
```

Configuração: `.stylelintrc.json`.

### CI (GitHub Actions)

Lint roda automaticamente em pull requests via `.github/workflows/linters.yml`:

- ESLint em todo o projeto
- Stylelint em arquivos CSS/SCSS

---

## Format

Não há script de formatação (Prettier) configurado. Formatação é feita via `eslint --fix` para JavaScript.

---

## Docker

**Não existe** Dockerfile nem docker-compose neste repositório.

---

## Banco de dados

Comandos de banco (migrations, seeds, console) pertencem ao **repositório backend Rails**.

Consulte: [DATABASE.md](./DATABASE.md) e o README de [api_find_your_course](https://github.com/FelipeEnne/api_find_your_course).

---

## Comandos úteis de diagnóstico

```bash
# Verificar versão do Node
node -v

# Listar dependências desatualizadas
npm outdated

# Auditoria de segurança
npm audit
```

---

## Eject (não recomendado)

```bash
npm run eject
```

Expõe toda a configuração do Webpack/Babel do CRA. Operação **permanente**. Para projeto legado, prefira upgrade gradual ou migração para Vite — ver [TODO_LEGACY.md](./TODO_LEGACY.md).
