# Plano de Atualização de Dependências — Find Your Course

Documento de referência para atualizações incrementais do frontend (Vite 6, React 18, Redux clássico).

**Última atualização:** 2026-06-24  
**Gerenciador:** npm (`package-lock.json`)  
**Instalação:** `npm install`

---

## Stack atual

| Camada | Pacote | Versão |
|--------|--------|--------|
| UI | React / react-dom | 18.3.x |
| Build | Vite | 6.x |
| Estado | redux / redux-thunk / react-redux | 4.2.1 / 2.4.2 / 7.2.9 |
| Roteamento | react-router-dom | 6.30.x |
| HTTP | axios | 1.18.x |
| CSS | bootstrap / react-bootstrap | 5.3.x / 2.10.x |
| Lint (dev) | eslint 8 + airbnb | 8.57.x |
| Testes | vitest + @testing-library/react | 3.x / 14.x |

**Node local:** 22.x (build sem `openssl-legacy-provider`)  
**Node CI:** 20.x (`.github/workflows/linters.yml`)

---

## Progresso de segurança

| Métrica | Baseline (início) | Pós Grupo A (lote 14) | Pós Grupo B (Vite) |
|---------|-------------------|----------------------|---------------------|
| Total audit | 222 | 170 | 6 |
| Critical | 20 | 5 | 0 |

Detalhes por lote em `docs/SECURITY_UPDATES.md`.

---

## Grupo B — Concluído (2026-06-24)

Migração toolchain executada em PR único (fases 0–5):

| Fase | Ação |
|------|------|
| 0 | Remoção de deps mortas; redirects `history.push` → `useEffect` + `navigate`; smoke tests |
| 1 | CRA 3 → Vite 6; React 16 → 18; `createRoot`; `VITE_API_URL`; remoção de `overrides` |
| 2 | react-router-dom 5 → 6 (`Routes`, `useNavigate`, `useParams`) |
| 3 | axios 0.21 → 1.18 |
| 4 | ESLint 8; Stylelint 16; CI com `npm ci`, build e test (Node 20) |
| 5 | Bootstrap 4 → 5; react-bootstrap 1 → 2; `sr-only` → `visually-hidden` |

**6 vulnerabilidades residuais** — transitivas de `react-multi-carousel` → `npm` (dev tooling embutido); não corrigível sem trocar a lib.

---

## Grupo A — Atualização segura (mesma major)

### Concluído — Lote 14 (2026-06-24)

| Ação | Resultado |
|------|-----------|
| `.npmrc` → `legacy-peer-deps=true` | Aplicado |
| Override `js-yaml@4.2.0` | **Revertido** — quebra build (`safeLoad` removido na v4) |

`js-yaml` permanece em **Grupo B** — correção exige CRA 5+ / cosmiconfig 6+.

### Concluído — Lote 13 (2026-06-24)

| Pacote | Antes | Depois | Tipo |
|--------|-------|--------|------|
| react-bootstrap | 1.0.1 | 1.6.8 | Direta |
| yaml | 1.10.0 | 1.10.3 | Override |

### Grupo A esgotado para CRA 3

Pacotes diretos e overrides transitivos compatíveis foram aplicados nos lotes 1–14. Vulnerabilidades restantes (~170) estão na árvore `react-scripts@3.4.4`.

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

## Grupo B — Atualização com impacto (concluído)

| Pacote | Antes | Depois | Status |
|--------|-------|--------|--------|
| react-scripts | 3.4.4 | removido (Vite 6) | Concluído |
| react / react-dom | 16.14 | 18.3 | Concluído |
| axios | 0.21.4 | 1.18.1 | Concluído |
| bootstrap | 4.6.2 | 5.3.8 | Concluído |
| react-bootstrap | 1.6.8 | 2.10.10 | Concluído |
| react-router-dom | 5.3.4 | 6.30.2 | Concluído |
| eslint | 6.8 | 8.57 | Concluído |
| stylelint | 13.x | 16.x | Concluído |
| js-yaml (transitivo) | 3.14.x | resolvido com Vite | Concluído |
| @testing-library/react | 9.x | 14.x + vitest | Concluído |

### Pendente (fora do escopo Grupo B)

| Pacote | Motivo |
|--------|--------|
| redux 4 → 5 | ESM-only; sem ganho imediato de segurança |
| react-router 6 → 7 | API nova; aguardar necessidade |
| @babel/* 8 | Vite usa esbuild; Babel 6 devDeps removidos |

---

## Ordem recomendada de migração (Grupo B) — concluída

1. ~~Documentar `.npmrc` com `legacy-peer-deps=true`~~ — feito (lote 14); overrides removidos pós-Vite.
2. ~~Remover plugins Babel 6 não usados~~ — feito.
3. ~~Decidir CRA 5 vs Vite~~ — **Vite** escolhido.
4. ~~React 16 → 18~~ — feito.
5. ~~react-router-dom 5 → 6~~ — feito.
6. ~~axios 0.21 → 1.x~~ — feito.
7. ~~ESLint 6 → 8 e Stylelint 13 → 16~~ — feito.
8. ~~Bootstrap 4 → 5 + react-bootstrap 2~~ — feito.
9. ~~Testes mínimos~~ — `App.test.js`, `store.test.js` com Vitest.

---

## Riscos conhecidos

| Risco | Mitigação |
|-------|-----------|
| `npm audit fix --force` instala majors não planejados | **Nunca** usar sem aprovação |
| API Heroku retorna 404 (2026-06-24) | Smoke manual requer backend ativo ou clone local |
| Peer deps conflitam | `.npmrc` `legacy-peer-deps` pode ser removido se `npm install` limpo |
| Sem testes E2E | Build + Vitest + smoke manual após mudanças |
| API Rails externa | Smoke de login/signup/favoritos quando API disponível |
| 6 vulnerabilidades residuais | `react-multi-carousel` → `npm` transitivo; avaliar troca de lib |

---

## Validação após cada lote

```powershell
npm install
npm audit
npm run build
npm test -- --run
npm run lint
```

Smoke manual: login, signup, listagem de cursos, favoritar.

---

## Próximos passos

1. Restaurar assets estáticos em `public/img/` (não versionados no repo).
2. Verificar/reactivar API Rails ou documentar URL alternativa via `VITE_API_URL`.
3. Migrar login GET → POST (coordenação com backend).
4. Avaliar substituição de `react-multi-carousel` (6 CVEs transitivas via `npm`).
