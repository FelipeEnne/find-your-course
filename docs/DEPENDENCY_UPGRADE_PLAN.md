# Plano de Atualização de Dependências — Find Your Course

Documento de referência para atualizações incrementais do frontend legado (CRA 3, React 16, Redux clássico).

**Última atualização:** 2026-06-24  
**Gerenciador:** npm (`package-lock.json`)  
**Instalação:** sempre com `npm install --legacy-peer-deps`

---

## Stack atual

| Camada | Pacote | Versão |
|--------|--------|--------|
| UI | React / react-dom | 16.14.0 |
| Build | react-scripts (CRA 3) | 3.4.4 |
| Estado | redux / redux-thunk / react-redux | 4.2.1 / 2.4.2 / 7.2.9 |
| Roteamento | react-router-dom | 5.3.4 |
| HTTP | axios | 0.21.4 |
| CSS | bootstrap / react-bootstrap | 4.6.2 / 1.6.8 |
| Lint (dev) | eslint 6 + airbnb | 6.8.0 |

**Node local:** 22.x (build requer `NODE_OPTIONS=--openssl-legacy-provider`)  
**Node CI:** 18.x (`.github/workflows/linters.yml`)

---

## Progresso de segurança

| Métrica | Baseline (início) | Atual (lote 13) |
|---------|-------------------|-----------------|
| Total audit | 222 | 175 |
| Critical | 20 | 5 |

Detalhes por lote em `docs/SECURITY_UPDATES.md`.

---

## Grupo A — Atualização segura (mesma major)

### Concluído — Lote 13 (2026-06-24)

| Pacote | Antes | Depois | Tipo |
|--------|-------|--------|------|
| react-bootstrap | 1.0.1 | 1.6.8 | Direta |
| yaml | 1.10.0 | 1.10.3 | Override |

### Próximo — Lote 14 (sugerido)

| Pacote | Atual | Alvo | Risco | Motivo |
|--------|-------|------|-------|--------|
| js-yaml | ≤4.1.1 | A confirmar | Médio | Override transitiva; pacote distinto de `yaml` |
| `.npmrc` | — | `legacy-peer-deps=true` | Baixo | Evitar falha em `npm install` sem flag |

### Concluído — Lote 12 (2026-06-24)

| Pacote | Antes | Depois | Tipo |
|--------|-------|--------|------|
| react-router | 5.2.0 | 5.3.4 | Direta |
| react-router-dom | 5.2.0 | 5.3.4 | Direta |
| react-multi-carousel | 2.5.5 | 2.8.6 | Direta |
| eslint-plugin-jsx-a11y | 6.2.3 | 6.10.2 | devDep |

### Concluído — Lote 11 (2026-06-24)

| Pacote | Antes | Depois | Tipo |
|--------|-------|--------|------|
| react | 16.13.1 | 16.14.0 | Direta |
| react-dom | 16.13.1 | 16.14.0 | Direta |
| redux | 4.0.5 | 4.2.1 | Direta |
| redux-thunk | 2.3.0 | 2.4.2 | Direta |
| react-redux | 7.2.0 | 7.2.9 | Direta |
| bootstrap | 4.5.0 | 4.6.2 | Direta |
| qs | 6.14.2 | 6.15.3 | Override |
| word-wrap | 1.2.3 | 1.2.5 | Override |

### Overrides já aplicados (lotes 1–10)

Ver bloco `overrides` em `package.json` e tabela completa em `docs/SECURITY_UPDATES.md`.

---

## Grupo B — Atualização com impacto (não executar sem plano)

| Pacote | Atual | Latest | Breaking change | Quando |
|--------|-------|--------|-----------------|--------|
| react-scripts | 3.4.4 | 5.0.1 | Webpack 5, Jest, ESLint, PostCSS | Após decisão CRA 5 vs Vite |
| react / react-dom | 16.14 | 19.x | APIs, Strict Mode, hooks | Após toolchain |
| axios | 0.21.4 | 1.18.1 | API ESM, interceptors | Projeto dedicado |
| bootstrap | 4.6.2 | 5.3.8 | Classes removidas | Com react-bootstrap 2 |
| react-bootstrap | 1.x | 2.x | Requer Bootstrap 5 | Com bootstrap 5 |
| react-router-dom | 5.x | 7.x | API de rotas nova | Com React 18+ |
| redux | 4.x | 5.x | ESM-only | Com react-redux 9 |
| eslint | 6.8 | 10.x | Flat config | Com CRA 5+ |
| stylelint | 13.x | 17.x | PostCSS 8+ | CI separado |
| @babel/* (dev) | 7.10 | 8.x | Babel 8 | Com CRA 5+ |
| babel-plugin-* (Babel 6) | 6.x | — | `babel-traverse` sem patch | Remover se não usados |
| @testing-library/react | 9.x | 16.x | Requer React 18 | Com upgrade React |

---

## Ordem recomendada de migração (Grupo B)

1. Documentar `.npmrc` com `legacy-peer-deps=true`; alinhar Node CI (18 → 20 LTS).
2. Remover plugins Babel 6 não usados em `devDependencies`.
3. Decidir: **CRA 5** (menor salto) ou **Vite** (modernização).
4. Atualizar React 16 → 18.
5. Atualizar react-router-dom 5 → 6.
6. Atualizar axios 0.21 → 1.x (revisar `src/api/users.js`).
7. Atualizar ESLint 6 → 8+ e Stylelint 13 → 15+.
8. Bootstrap 4 → 5 + react-bootstrap 2.
9. Adicionar testes mínimos antes de majors maiores.

---

## Riscos conhecidos

| Risco | Mitigação |
|-------|-----------|
| `npm audit fix --force` instala CRA 5 | **Nunca** usar sem aprovação |
| Build falha no Node 17+ | `NODE_OPTIONS=--openssl-legacy-provider` |
| Peer deps conflitam | `--legacy-peer-deps` em todo install |
| Sem testes automatizados | Build + smoke manual após cada lote |
| API Rails externa | Smoke de login/signup/favoritos após mudanças |
| 175 vulnerabilidades restantes | Maioria na árvore `react-scripts@3.4.4` |

---

## Validação após cada lote

```powershell
npm install --legacy-peer-deps
npm audit
$env:CI='true'
$env:NODE_OPTIONS='--openssl-legacy-provider'
npm run build
npm test   # A confirmar — sem arquivos de teste no repo
```

Smoke manual: login, signup, listagem de cursos, favoritar.

---

## Próximos passos

1. Avaliar **Lote 14** (override `js-yaml`, `.npmrc`).
2. Smoke manual com API ativa.
3. ~~Avaliar override `yaml`~~ — aplicado em 1.10.3 (lote 13).
4. Planejar migração toolchain (Grupo B) em issue/PR dedicado.
