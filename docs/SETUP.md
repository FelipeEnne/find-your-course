# Setup Local — Find Your Course

Guia para configurar e rodar o frontend localmente.

---

## Pré-requisitos

| Requisito | Detalhe |
|-----------|---------|
| Node.js | CI usa **12.x**; CRA 3 costuma funcionar com Node **14–16**. Versão exata recomendada: **A confirmar** no seu ambiente. |
| npm ou yarn | Ambos os lockfiles existem (`package-lock.json` e `yarn.lock`). Escolha **um** gerenciador e mantenha consistência. |
| Git | Para clonar o repositório |
| Backend Rails (opcional) | Necessário para desenvolvimento completo com API local |

---

## Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd find-your-course

# Instale dependências (escolha npm OU yarn)
npm install
# ou
yarn install
```

---

## Configuração da API

**Não há arquivo `.env` neste projeto.** A URL da API é definida em código:

**Arquivo:** `src/api/url.js`

```javascript
// Produção (padrão atual)
const url = 'https://protected-beyond-23220.herokuapp.com';

// Desenvolvimento local (descomente e comente a linha acima)
// const url = 'http://localhost:3001';
```

### Para usar API local

1. Clone e configure o backend: [api_find_your_course](https://github.com/FelipeEnne/api_find_your_course)
2. Suba a API na porta **3001** (conforme comentário no código)
3. Edite `src/api/url.js` apontando para `http://localhost:3001`
4. Passos detalhados do backend (migrations, seeds, `.env`): **A confirmar** — consulte o README do repositório Rails

### Variáveis de ambiente

| Variável | Status |
|----------|--------|
| `REACT_APP_*` | **Não utilizadas** no código atual |
| `.env` | **Não existe** no repositório |

Sugestão futura: migrar a URL da API para `REACT_APP_API_URL` — ver [TODO_LEGACY.md](./TODO_LEGACY.md).

---

## Banco de dados

Este repositório **não possui banco de dados**. O banco é gerenciado pelo backend Rails.

Para setup de banco, migrations e seeds, consulte o repositório da API. Detalhes inferidos: [DATABASE.md](./DATABASE.md).

---

## Subir o frontend localmente

```bash
npm start
# ou
yarn start
```

- Abre em **http://localhost:3000** (porta padrão do CRA)
- Hot reload ativo em modo desenvolvimento

### Build de produção (teste local)

```bash
npm run build
# Serve a pasta build/ com um servidor estático, por exemplo:
npx serve -s build
```

---

## Checklist rápido

- [ ] Node.js instalado
- [ ] `npm install` ou `yarn` executado
- [ ] URL da API configurada em `src/api/url.js`
- [ ] Backend Rails rodando (se usar API local)
- [ ] `npm start` sem erros
- [ ] Login funciona (depende da API estar acessível)

---

## Problemas comuns

### API Heroku não responde

A URL `protected-beyond-23220.herokuapp.com` pode estar inativa (Heroku descontinuou plano gratuito). **A confirmar.**

**Solução:** subir o backend Rails localmente ou em outro host e atualizar `src/api/url.js`.

### Erro de CORS

Ao apontar para API local, o backend Rails precisa permitir requisições de `http://localhost:3000`. Configuração de CORS: **A confirmar** no repo backend.

### Porta 3000 em uso

O CRA perguntará se deseja usar outra porta, ou encerre o processo que ocupa a 3000.

### Tela branca ou erro no Login

O `Login.js` faz `JSON.parse(localStorage.getItem('localUser'))` sem validação. Se o valor estiver corrompido:

```javascript
// No console do navegador:
localStorage.removeItem('localUser');
// Recarregue a página — src/index.js recria o valor padrão
```

### `npm install` falha em Node recente

CRA 3 e dependências antigas podem falhar em Node 18+. Tente Node 16 via nvm:

```bash
nvm use 16   # se usar nvm — A confirmar versão exata
```

### Dois lockfiles

Evite misturar `npm install` e `yarn` no mesmo projeto. Escolha um e remova o lockfile do outro apenas se decidir padronizar (ver TODO_LEGACY.md).

### Imagens não aparecem

Verifique se `public/img/` contém os assets. Caminhos no código variam entre `./img/`, `/img/` e `../img/` — inconsistência conhecida.

---

## Deploy

O README referencia deploy no Netlify. Passos de deploy atuais: **A confirmar** se o pipeline ainda está configurado.

Comando de build para deploy:

```bash
npm run build
```

A pasta `build/` é o artefato estático a publicar.
