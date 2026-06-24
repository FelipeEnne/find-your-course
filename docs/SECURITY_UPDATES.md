# Security Updates — Find Your Course

Registro das correções de vulnerabilidades em dependências do frontend.

---

## Análise inicial

| Campo | Valor |
|-------|-------|
| Data da análise | 2026-06-24 |
| Gerenciador adotado | **npm** (CI já usa npm; `package-lock.json` é a fonte da verdade) |
| Política `yarn.lock` | Mantido no repositório, **não atualizado** neste ciclo — evitar `yarn install` até padronização explícita |
| Node local | v22.22.0 |
| npm local | 10.9.4 |
| Node CI | 12.x (`.github/workflows/linters.yml`) |
| Baseline audit | 222 vulnerabilidades (10 low, 134 moderate, 58 high, 20 critical) |

### Comandos de baseline executados

```bash
node -v
npm -v
npm install --legacy-peer-deps
npm audit
npm outdated
```

**Nota:** `npm install` sem `--legacy-peer-deps` falha no npm 10 por conflito de peer deps entre `eslint-config-airbnb` e `react-scripts@3.4.1`. Usar sempre `--legacy-peer-deps` neste projeto legado até migração de toolchain.

---

## Dependências atualizadas

### Lote 1 — Transitivas (Grupo A) via `overrides`

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `decode-uri-component` | 0.2.0 | 0.2.2 | Transitiva | GHSA-w573-4hg7-7wgq (DoS) |
| `path-parse` | 1.0.6 | 1.0.7 | Transitiva | Patch de segurança compatível |
| `tmpl` | 1.0.4 | 1.0.5 | Transitiva | GHSA-jgrx-mgxx-jf9v (ReDoS) |
| `ini` | 1.3.5 | 1.3.8 | Transitiva | GHSA-qqgx-2p2h-9c37 (Prototype Pollution) |
| `hosted-git-info` | 2.8.8 | 2.8.9 | Transitiva | GHSA-43f8-2h32-f4cj (ReDoS) |

**Arquivo alterado:** `package.json` (bloco `overrides`), `package-lock.json`

**Comando:**

```bash
npm install --legacy-peer-deps
```

**Resultado audit após lote 1:** 216 vulnerabilidades (−6)

### Lote 2 — Dependência direta `axios`

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `axios` | 0.19.2 | 0.21.4 | **Direta** | CVEs conhecidos em 0.19.x; última release da linha 0.21.x |

**Arquivo alterado:** `package.json`, `package-lock.json`

**Comando:**

```bash
npm install axios@0.21.4 --legacy-peer-deps
```

**Uso no código:** `src/api/users.js` — `axios.get`, `axios.post`, `axios.patch` (sem interceptors; API compatível com 0.21.x).

**Resultado audit após lote 2:** 215 vulnerabilidades reportadas logo após install (−1 adicional vs pós-lote 1)

---

## Resultado dos testes

| Comando | Resultado | Observação |
|---------|-----------|------------|
| `npm install --legacy-peer-deps` | OK | Lockfile migrado para `lockfileVersion` 3 pelo npm 10 |
| `npm test` | **A confirmar** | Não há arquivos `*.test.js` no repositório |
| `npm run build` | OK* | *Requer `NODE_OPTIONS=--openssl-legacy-provider` no Node 17+ (testado no Node 22) |
| `npm audit` | 215–224* | *Contagem varia após regeneração do lockfile; maioria permanece em `react-scripts` |

### Build no Node 22 (ambiente local)

```powershell
$env:CI='true'
$env:NODE_OPTIONS='--openssl-legacy-provider'
npm run build
```

Erro sem legacy provider: `error:0308010C:digital envelope routines::unsupported` — limitação conhecida do Webpack 4 / CRA 3 com OpenSSL 3.

### Smoke manual (auth/favoritos)

**A confirmar** — requer API acessível (`src/api/url.js`). Testar manualmente:

1. Login (`userLogin` — GET com query string)
2. Signup (`createUser` — POST)
3. Favoritar curso (`updateUserFavorite` — PATCH)

---

## Vulnerabilidades restantes (principais)

A maioria está na árvore de **`react-scripts@3.4.1`** (Webpack 4, webpack-dev-server, Babel, Jest, PostCSS, etc.).

| Grupo | Pacotes | Abordagem sugerida |
|-------|---------|-------------------|
| B — Transitivas CRA | `loader-utils`, `terser`, `json5`, `ssri`, `eventsource`, `elliptic`, `http-proxy`, `ajv`, `merge-deep`, `url-parse`, `qs`, `express` | `overrides` pontuais ou `npm audit fix` **sem** `--force`; avaliar lote a lote |
| C — Diretas | `react-scripts` | Último patch 3.x se existir; senão planejar migração CRA/Vite |
| D — Major | `react-scripts` 5+, `axios` 1.x, React 17/18, Node CI 12→16 | Projeto separado; não aplicar automaticamente |

`npm audit` ainda sugere `axios@1.18.1` para zerar todos os advisories de axios — isso é **major** e fica fora deste ciclo.

---

## Riscos pendentes

1. **Dois lockfiles** — `yarn.lock` existe mas está desatualizado; usar apenas npm neste ciclo.
2. **Node 22 local vs Node 12 no CI** — builds podem divergir; considerar alinhar CI para Node 16 LTS em mudança futura.
3. **Sem testes automatizados** — regressões só aparecem em build manual ou uso da app.
4. **`npm audit fix --force`** — instalaria `react-scripts@5.0.1`; **não executado** (quebra major).
5. **axios 0.21.4** — melhora sobre 0.19.2, mas audit moderno ainda lista advisories em `<=0.31.1`; correção completa exigiria axios 1.x (major).

---

## Próximos passos

1. **Lote 3:** transitivas Grupo B (`loader-utils`, `json5`, `terser`, etc.) via `overrides` — um pacote por vez com `npm run build` após cada um.
2. **Verificar** se existe patch seguro de `react-scripts` na linha 3.x.
3. **Smoke manual** de login/signup/favoritos com API ativa.
4. **Opcional:** adicionar `.npmrc` com `legacy-peer-deps=true` para simplificar installs (não feito neste ciclo).
5. **Opcional:** padronizar Node no CI (16.x) e documentar em `SETUP.md`.

---

## Git — arquivos alterados neste ciclo

```bash
git status
git diff package.json
git diff package-lock.json
```

**Não commitado automaticamente.** Sugestão de commits separados:

```bash
git add package.json package-lock.json
git commit -m "fix: patch transitive dependencies via overrides (batch 1)"

git add package.json package-lock.json
git commit -m "fix: update axios to 0.21.4"

git add docs/SECURITY_UPDATES.md
git commit -m "docs: document security dependency updates"
```

Ou um único commit:

```bash
git add package.json package-lock.json docs/SECURITY_UPDATES.md
git commit -m "fix: update vulnerable dependencies (axios + transitive overrides)"
```
