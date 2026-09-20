# Backend Starter

Starter backend reutilizável para aplicações Node.js que precisam de autenticação, gerenciamento de usuários e autorização baseada em papéis.

O projeto foi desenvolvido com foco em uma arquitetura modular, separação de responsabilidades e uma base simples para ser reutilizada em diferentes tipos de aplicações, como sistemas administrativos, catálogos, delivery, e-commerce e outras APIs.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- SQLite
- Zod
- JWT
- bcrypt
- Resend
- HttpOnly Cookies

## 📋 Funcionalidades

### Autenticação

- Cadastro de usuário
- Login
- Logout
- Autenticação utilizando JWT
- JWT armazenado em cookie `HttpOnly`
- Middleware de autenticação
- Verificação de sessão
- Expiração do token

### Recuperação de senha

- Solicitação de recuperação de senha
- Geração de token criptograficamente seguro
- Hash do token antes de armazená-lo no banco
- Expiração do token
- Controle de utilização do token
- Envio do link de recuperação por e-mail utilizando Resend
- Alteração da senha através do token

### Usuários

- Consulta do próprio perfil
- Atualização do nome
- Atualização do e-mail
- Alteração da senha
- Validação dos dados utilizando Zod
- Verificação de e-mail já cadastrado

### Autorização

- Sistema de papéis (`USER` e `ADMIN`)
- Middleware para controle de acesso
- Proteção de rotas administrativas

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura modular baseada na separação de responsabilidades:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
Database
```

### Responsabilidades

**Routes**

Responsáveis por registrar os endpoints, validar os dados de entrada e definir os middlewares necessários.

**Controllers**

Responsáveis por receber as requisições e encaminhar a execução para os serviços.

**Services**

Contêm as regras de negócio da aplicação.

**Repositories**

Responsáveis pelo acesso aos dados e comunicação com o Prisma.

**Containers**

Responsáveis por montar as dependências de cada módulo.

Exemplo:

```text
Repository
    ↓
Service
    ↓
Controller
    ↓
Routes
```

## 📁 Estrutura

```text
src/
├── authorization/
│   └── roles.ts
│
├── containers/
│   ├── auth-container.ts
│   └── users-container.ts
│
├── errors/
│   ├── forbidden-error.ts
│   └── unauthorized-error.ts
│
├── lib/
│   ├── cookie.ts
│   ├── jwt.ts
│   ├── password-reset-token.ts
│   └── prisma.ts
│
├── middlewares/
│   ├── auth-middleware.ts
│   └── authorization-middleware.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth-controller.ts
│   │   ├── auth-repository.ts
│   │   ├── auth-routes.ts
│   │   ├── auth-schema.ts
│   │   └── auth-service.ts
│   │
│   └── users/
│       ├── users-controller.ts
│       ├── users-repository.ts
│       ├── users-routes.ts
│       ├── users-schema.ts
│       └── users-service.ts
│
├── services/
│   └── email-service.ts
│
├── types/
│   └── fastify.d.ts
│
├── app.ts
├── config.ts
└── server.ts

prisma/
├── migrations/
└── schema.prisma
```

## 🔐 Segurança

A autenticação utiliza JWT armazenado em cookie `HttpOnly`, evitando que o token seja diretamente acessível pelo JavaScript do navegador.

O cookie possui configurações para:

- `httpOnly`
- `sameSite`
- `secure` em produção
- expiração
- `path`

As senhas são armazenadas utilizando hash com `bcrypt`.

Os tokens de recuperação de senha não são armazenados em texto puro. O projeto gera um token aleatório e armazena somente seu hash no banco de dados.

## 🗄️ Banco de dados

Atualmente o projeto utiliza SQLite através do Prisma.

O modelo principal possui:

```text
User
├── id
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt
```

E existe uma entidade específica para recuperação de senha:

```text
PasswordResetToken
├── id
├── userId
├── tokenHash
├── expiresAt
├── usedAt
└── createdAt
```

O campo `role` atualmente utiliza `String`, permitindo maior portabilidade entre diferentes bancos de dados.

## ⚙️ Configuração

Clone o projeto:

```bash
git clone https://github.com/klayver-dev/backend-starter.git
```

Entre no projeto:

```bash
cd backend-starter
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"

JWT_SECRET="your-secret-key"

RESEND_API_KEY="your-resend-api-key"

FRONTEND_URL="http://localhost:5173"
```

> Nunca versionar o arquivo `.env`.

## 🗃️ Prisma

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

## ▶️ Executando

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

## 🔌 Endpoints

### Auth

| Método | Endpoint                | Autenticação |
| ------ | ----------------------- | ------------ |
| POST   | `/auth/register`        | Não          |
| POST   | `/auth/login`           | Não          |
| POST   | `/auth/logout`          | Não          |
| GET    | `/auth/me`              | Sim          |
| POST   | `/auth/forgot-password` | Não          |
| POST   | `/auth/reset-password`  | Não          |

### Usuários

| Método | Endpoint             | Autenticação |
| ------ | -------------------- | ------------ |
| GET    | `/users/me`          | Sim          |
| PATCH  | `/users/me`          | Sim          |
| PATCH  | `/users/me/password` | Sim          |

A documentação detalhada dos endpoints será adicionada posteriormente utilizando Swagger/OpenAPI.

## 🧪 Validação

Os dados recebidos pela API são validados utilizando Zod.

Exemplo de resposta para dados inválidos:

```json
{
  "message": "Dados inválidos!",
  "errors": [
    {
      "field": "email",
      "message": "E-mail inválido."
    }
  ]
}
```

## 🛣️ Roadmap

- [x] Estrutura modular
- [x] Fastify
- [x] TypeScript
- [x] Prisma
- [x] SQLite
- [x] Cadastro
- [x] Login
- [x] Logout
- [x] JWT
- [x] Cookie HttpOnly
- [x] Middleware de autenticação
- [x] Gerenciamento de perfil
- [x] Alteração de senha
- [x] Recuperação de senha
- [x] Envio de e-mail
- [x] Sistema de roles
- [x] Autorização de rotas
- [ ] Refatorar autorização para seguir completamente a arquitetura Repository/Service
- [ ] Melhorar tratamento global de erros
- [ ] Testes automatizados
- [ ] Swagger / OpenAPI
- [ ] Documentação completa da API
- [ ] Preparar configuração para PostgreSQL
- [ ] Melhorias de segurança e produção

## 🎯 Objetivo

Este projeto serve como uma base inicial para novos projetos backend.

A ideia é evitar a necessidade de reconstruir do zero funcionalidades comuns como:

- autenticação;
- usuários;
- autorização;
- recuperação de senha;
- gerenciamento de sessão;
- validação;
- acesso ao banco;
- estrutura modular.

A partir dessa base, novos projetos podem adicionar seus próprios módulos e regras de negócio.

## 📌 Status

Projeto em desenvolvimento.

A estrutura atual representa uma primeira versão do starter. Novas melhorias arquiteturais, testes e documentação da API serão adicionados progressivamente.

## 👨‍💻 Autor

**Klayver**

GitHub: https://github.com/klayver-dev
