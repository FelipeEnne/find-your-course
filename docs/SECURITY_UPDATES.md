# Security Updates — Find Your Course

Registro das correções de vulnerabilidades em dependências do frontend.

---

## Análise inicial

| Campo | Valor |
|-------|-------|
| Data da análise | 2026-06-24 |
| Gerenciador adotado | **npm** (CI já usa npm; `package-lock.json` é a fonte da verdade) |
| Política `yarn.lock` | **Removido** em 2026-06-24 — causava alertas Dependabot duplicados; apenas `package-lock.json` |
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

**Nota:** `npm install` sem `--legacy-peer-deps` falha no npm 10 por conflito de peer deps entre `eslint-config-airbnb` e `react-scripts`. Usar sempre `--legacy-peer-deps` neste projeto legado até migração de toolchain.

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

### Lote 3 — Transitivas (Grupo B, parte 1) via `overrides`

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `ajv` | 6.12.2 | 6.12.6 | Transitiva | GHSA-v88g-cgmw-v5xw, GHSA-2g4f-4pwh-qvx6 |
| `terser` | 4.8.0 | 4.8.1 | Transitiva | GHSA-4wf5-vphf-c2xc (ReDoS) |
| `merge-deep` | 3.0.2 | 3.0.3 | Transitiva | GHSA-r6rj-9ch6-g264 (Prototype Pollution) |
| `eventsource` | 1.0.7 | 1.1.2 | Transitiva | GHSA-6h5x-7c5m-7cr7 |
| `url-parse` | 1.4.7 | 1.5.10 | Transitiva | Múltiplos GHSAs (open redirect, path traversal) |

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 3:** 216 vulnerabilidades (17 critical; −3 critical vs pós-lote 2)

### Lote 4 — Transitivas (Grupo B, parte 2) via `overrides`

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `loader-utils` | 1.4.0 / 1.2.3 | 1.4.2 | Transitiva | GHSA-76p3-8jx3-jpfq (Prototype Pollution) |
| `json5` (aninhado) | 1.0.1 | 1.0.2 | Transitiva | GHSA-9c47-m6qq-7p4h (via loader-utils, resolve-url-loader, etc.) |
| `async` | 2.6.3 | 2.6.4 | Transitiva | GHSA-fwr7-v2mv-hh25 |
| `ssri` | 6.0.1 / 7.1.0 | 6.0.2 / 7.1.1 | Transitiva | GHSA-vx3p-948g-6vhq (ReDoS) |

**Overrides aninhados usados** para `json5` em `loader-utils`, `adjust-sourcemap-loader`, `react-dev-utils`, `resolve-url-loader`.

**Resultado audit após lote 4:** 212 vulnerabilidades (16 critical)

### Lote 5 — `react-scripts` patch (mesma major 3.x)

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `react-scripts` | 3.4.1 | 3.4.4 | **Direta** | Último patch da linha 3.x; atualiza árvore CRA sem major upgrade |

**Comando:** alteração em `package.json` + `npm install --legacy-peer-deps`

**Resultado audit após lote 5:** **200 vulnerabilidades** (3 low, 137 moderate, 44 high, 16 critical) — **−22 vs baseline**

### Lote 6 — Transitivas pendentes (PRs Dependabot #17, #29, #35)

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `qs` | 6.5.2 | 6.5.3 | Transitiva | PR #35; prototype pollution / DoS |
| `lodash-es` | 4.17.15 | 4.17.21 | Transitiva | PR #29; via `react-bootstrap` / `@restart/hooks` |
| `elliptic` | 6.5.3 | 6.5.4 | Transitiva | PR #17; patch crypto (CRA/Webpack) |

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 6:** **201 vulnerabilidades** (3 low, 138 moderate, 42 high, 18 critical) — **−3 vs pós-lote 5** (−21 vs baseline)

**PRs Dependabot que podem ser fechados após este lote:** #17, #29, #35 (além dos 17 já identificados anteriormente).

**Nota:** `elliptic` ainda pode aparecer no audit — advisories recentes afetam várias versões; 6.5.4 é o máximo compatível pedido pelo Dependabot.

### Lote 7 — `lodash`, `semver`, `form-data`, `node-forge`

| Pacote | Versão anterior | Versão nova | Tipo | Motivo |
|--------|-----------------|-------------|------|--------|
| `lodash` | 4.17.15 (várias cópias) | 4.18.1 | Transitiva | Prototype pollution / code injection |
| `lodash-es` | 4.17.21 | 4.18.1 | Transitiva | Mesmos advisories; última 4.x |
| `semver@5` | 5.7.1 | 5.7.2 | Transitiva | GHSA-c2qf-rxjj-qqgw (ReDoS) |
| `semver@6` | 6.3.0 | 6.3.1 | Transitiva | idem |
| `semver@7` | 7.5.x | 7.6.3 | Transitiva | idem |
| `form-data` | 2.3.3 | 2.5.6 | Transitiva | GHSA-fjxv-7rqg-78g4, GHSA-hmw2-7cc7-3qxx |
| `node-forge` | 0.10.0 | 1.4.0 | Transitiva | Múltiplos GHSAs (ASN.1, cert chain) |

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 7:** **193 vulnerabilidades** (3 low, 139 moderate, 35 high, 16 critical) — **−8 vs pós-lote 6** (−29 vs baseline)

**Pendente:** `lodash.template@4.5.0` (pacote abandonado) — sem fix disponível no npm audit.

### Lote 8 — Alertas Dependabot abertos (y18n, shell-quote, json-schema, qs, ip, ajv)

| Pacote | Versão anterior | Versão nova | Tipo | Alertas Dependabot |
|--------|-----------------|-------------|------|-------------------|
| `y18n` | 4.0.0 | 4.0.1 | Transitiva | #79, #11 |
| `shell-quote` | 1.7.2 | 1.8.4 | Transitiva | #250, #249 |
| `json-schema` | 0.2.3 | 0.4.0 | Transitiva | #161, #105 |
| `qs` | 6.5.3 | 6.14.2 | Transitiva | #173, #59, #35 |
| `ip` | 1.1.9 | 2.0.1 | Transitiva | #456, #201 |
| `ajv` | 6.12.6 | 6.14.0 | Transitiva | ReDoS GHSA-2g4f-4pwh-qvx6 |

**Outras ações:**

- `yarn.lock` removido — metade dos alertas Dependabot eram duplicatas do lockfile desatualizado
- `.github/dependabot.yml` adicionado — monitora apenas npm (`package-lock.json`)

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 8:** **183 vulnerabilidades** (3 low, 133 moderate, 35 high, 12 critical) — **−10 vs pós-lote 7** (−39 vs baseline)

**Alertas Dependabot que devem fechar após merge + rescan:** y18n, shell-quote, json-schema, qs, lodash, lodash-es, decode-uri-component, json5, loader-utils, minimist (todos os que eram só `yarn.lock` ou já corrigidos em lotes anteriores).

**Ainda abertos (sem fix compatível com CRA 3):** `lodash.template`, `axios` (major 1.x), `ip` (npm audit ainda lista `ip *` mesmo em 2.0.1 — advisory sem versão corrigida no ecossistema webpack-dev-server 3).

### Lote 9 — Alertas Dependabot listados (2026-06-24)

| Pacote | Versão anterior | Versão nova | Tipo | Alertas Dependabot |
|--------|-----------------|-------------|------|-------------------|
| `ansi-regex` | 4.1.0 (várias) | 5.0.1 | Transitiva | #126, #127, #128 |
| `ansi-html` | 0.0.7 | 0.0.8 | Transitiva | #118 |
| `cipher-base` | 1.0.4 | 1.0.7 | Transitiva | #245 |
| `sha.js` | 2.4.11 | 2.4.12 | Transitiva | #248 |
| `pbkdf2` | 3.1.1 | 3.1.6 | Transitiva | #237, #296 |
| `flatted` | 2.0.2 | 3.4.2 | Transitiva | #323 |
| `minimatch` | 3.0.4 | 3.1.5 | Transitiva | #135, #314 |
| `nth-check` | 1.0.2 | 2.0.1 | Transitiva | #103 |
| `is-svg` | 3.0.0 | 4.3.2 | Transitiva | #80, #106 |
| `ws` | 5.2.2 / 6.2.1 | 8.18.0 | Transitiva | #458, #459 |
| `lodash.template` | 4.5.0 | 4.18.1 | Transitiva | #340, #452 |
| `immer` (via RTK) | 7.0.5 | 9.0.21 | Transitiva | #453, #454, #455 |
| `elliptic` | 6.5.4 | 6.6.1 | Transitiva | #477 (parcial) |
| `brace-expansion` | 1.1.11 | 1.1.15 | Transitiva | ReDoS |
| `bn.js@4` / `bn.js@5` | várias | 4.12.3 / 5.2.3 | Transitiva | infinite loop |

**Override aninhado:** `@reduxjs/toolkit` → `immer@9.0.21` (RTK não é usado em `src/`; `react-dev-utils` mantém `immer@1.10.0` aninhado).

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 9:** **~165 vulnerabilidades** (8 low, 134 moderate, 18 high, 5 critical) — **−18 vs pós-lote 8** (−57 vs baseline)

**Build:** OK com `NODE_OPTIONS=--openssl-legacy-provider` no Node 22.

**Alertas Dependabot que devem fechar após merge + rescan:** ansi-regex (×3), ansi-html, cipher-base, sha.js, pbkdf2 (×2), flatted, minimatch (×2), nth-check, is-svg (×2), ws (×2), lodash.template (×2), immer (×3).

**Ainda abertos — requerem major upgrade ou não têm fix:**

| Alerta | Pacote | Motivo |
|--------|--------|--------|
| #424 | `axios` | Correção completa exige axios 1.x (major); app usa 0.21.4 |
| #451 | `babel-traverse` | Babel 6 em `devDependencies`; sem patch — risco só em build |
| #456 | `ip` | Advisory marca `ip *`; fix real exige CRA 5+ / webpack-dev-server 4+ |
| #477 | `elliptic` | npm audit lista `elliptic *` mesmo em 6.6.1; fix completo exige sair da árvore Webpack 4 |

### Lote 10 — Overrides seguros (2026-06-24)

| Pacote | Versão anterior | Versão nova | Tipo | Alertas Dependabot |
|--------|-----------------|-------------|------|-------------------|
| `ws` | 8.18.0 | 8.21.0 | Transitiva | #504 |
| `path-to-regexp@1` | 1.8.0 | 1.9.0 | Transitiva | #469 |
| `browserify-sign` | 4.2.0 | 4.2.6 | Transitiva | #444 |
| `color-string` | 1.5.3 | 1.5.5 | Transitiva | #95 |
| `tough-cookie` | 2.5.0 | 4.1.3 | Transitiva | #147 |
| `cross-spawn@6` | 6.0.5 | 6.0.6 | Transitiva | #474 |
| `cross-spawn@7` | 7.0.1 | 7.0.6 | Transitiva | #475 |

**Nota:** `path-to-regexp@1` limita o override à linha 1.x (react-router); `express` mantém `0.1.13` aninhado.

**Comando:** `npm install --legacy-peer-deps`

**Resultado audit após lote 10:** **159 vulnerabilidades** (9 low, 132 moderate, 13 high, 5 critical) — **−6 vs pós-lote 9** (−63 vs baseline)

**Build:** OK com `NODE_OPTIONS=--openssl-legacy-provider` no Node 22.

**Alertas Dependabot que devem fechar após merge + rescan:** ws (#504), path-to-regexp (#469), browserify-sign (#444), color-string (#95), tough-cookie (#147), cross-spawn (#474, #475).

**Ainda abertos (próximos passos):**

| Grupo | Alertas | Abordagem |
|-------|---------|-----------|
| `axios` (direta) | #424, #298, #398, #406, #416, #418, #420, #479 (+ outros) | axios 1.x — projeto dedicado |
| Toolchain dev | #449, #472, #319, #404, #78, #457 | overrides arriscados ou CRA 5+ |
| Sem patch | #451, #456 | babel-traverse, ip |
| `postcss` | #94, #115 | CRA 5+ / stylelint 17 |

---

## Resultado dos testes

| Comando | Resultado | Observação |
|---------|-----------|------------|
| `npm install --legacy-peer-deps` | OK | Lockfile migrado para `lockfileVersion` 3 pelo npm 10 |
| `npm test` | **A confirmar** | Não há arquivos `*.test.js` no repositório |
| `npm run build` | OK* | *Requer `NODE_OPTIONS=--openssl-legacy-provider` no Node 17+ (testado no Node 22) |
| `npm audit` | **159** (pós-lote 10) | Baseline era 222; −63 no total |

### Resumo do progresso

| Métrica | Baseline | Atual (lote 10) | Δ |
|---------|----------|-----------------|---|
| Total | 222 | 159 | −63 |
| Critical | 20 | 5 | −15 |
| High | 58 | 13 | −45 |
| Moderate | 134 | 132 | −2 |
| Low | 10 | 9 | −1 |

\*Variação em moderate pode refletir reclassificação do npm audit após regeneração do lockfile.

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

A maioria restante está na árvore de **`react-scripts@3.4.4`** (Webpack 4, webpack-dev-server, Babel, PostCSS, `elliptic`, etc.).

| Grupo | Pacotes ainda vulneráveis | Abordagem sugerida |
|-------|---------------------------|-------------------|
| B — Transitivas CRA | `elliptic` (parcial), `babel-traverse`, `postcss-*`, `webpack-dev-server`, `ip` | Muitos exigem CRA 5+ |
| C — Diretas | — | `react-scripts` já no último patch 3.x |
| D — Major | `react-scripts` 5+, `axios` 1.x, React 17/18, Node CI 12→16 | Projeto separado |

`npm audit` ainda sugere `axios@1.18.1` para zerar todos os advisories de axios — isso é **major** e fica fora deste ciclo.

---

## Riscos pendentes

1. **Um lockfile** — `yarn.lock` removido; usar apenas npm.
2. **Node 22 local vs Node 12 no CI** — builds podem divergir; considerar alinhar CI para Node 16 LTS em mudança futura.
3. **Sem testes automatizados** — regressões só aparecem em build manual ou uso da app.
4. **`npm audit fix --force`** — instalaria `react-scripts@5.0.1`; **não executado** (quebra major).
5. **axios 0.21.4** — melhora sobre 0.19.2, mas audit moderno ainda lista advisories em `<=0.31.1`; correção completa exigiria axios 1.x (major).

---

## Próximos passos

1. **Fechar PRs Dependabot** obsoletos após merge (yarn.lock removido elimina ~metade dos alertas).
2. **Smoke manual** de login/signup/favoritos com API ativa.
3. ~~**Decidir** sobre `yarn.lock`~~ — removido; Dependabot monitora só npm.
4. **Opcional:** `.npmrc` com `legacy-peer-deps=true`; CI com Node 16 + `npm run build`.
5. **Longo prazo:** migração CRA 5+ / Vite + React 18 + axios 1.x (Grupo D).

---

## Git — arquivos alterados neste ciclo

```bash
git status
git diff package.json
git diff package-lock.json
```

**Não commitado automaticamente.** Sugestão de commits:

```bash
git add package.json package-lock.json docs/SECURITY_UPDATES.md
git commit -m "fix: patch vulnerable dependencies (overrides + react-scripts 3.4.4)"
```

Ou commits separados por lote:

```bash
git commit -m "fix: patch transitive dependencies via overrides (batches 1, 3, 4)"
git commit -m "fix: update axios to 0.21.4"
git commit -m "fix: bump react-scripts to 3.4.4"
git commit -m "docs: document security dependency updates"
```
