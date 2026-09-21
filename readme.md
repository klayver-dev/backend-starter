# Backend Starter

Starter backend reutilizável para aplicações Node.js com autenticação, usuários e autorização.

Construído com uma arquitetura modular para servir como base para projetos como sistemas administrativos, catálogos, delivery, e-commerce e aplicações internas.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma
- SQLite
- Zod
- JWT
- bcrypt
- Resend
- HttpOnly Cookies
- Swagger / OpenAPI

## 🏗️ Arquitetura

```text
Routes
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

As dependências de cada módulo são centralizadas em `containers`.

## 📁 Estrutura

```text
src/
├── authorization/
├── containers/
├── errors/
├── lib/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── authorization/
│   └── users/
├── services/
├── types/
├── app.ts
├── config.ts
├── error-handler.ts
├── server.ts
└── swagger.ts

prisma/
├── migrations/
└── schema.prisma
```

## ⚙️ Instalação

Clone o projeto:

```bash
git clone https://github.com/klayver-dev/backend-starter.git
cd backend-starter
npm install
```

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta"
RESEND_API_KEY="sua-chave-do-resend"
FRONTEND_URL="http://localhost:5173"
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

## ▶️ Comandos

Desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Produção:

```bash
npm start
```

API:

```text
http://localhost:3333
```

Documentação:

```text
http://localhost:3333/docs
```

## 🔐 Funcionalidades

- Cadastro de usuários
- Login
- Logout
- Autenticação com JWT
- JWT armazenado em cookie HttpOnly
- Recuperação de senha por e-mail
- Redefinição de senha
- Gerenciamento de perfil
- Alteração de senha
- Roles `USER` e `ADMIN`
- Autorização de rotas
- Validação com Zod
- Tratamento global de erros
- CORS
- Swagger / OpenAPI

## 🧩 Criando um novo módulo

Cada módulo segue a mesma estrutura:

```text
modules/products/
├── products-controller.ts
├── products-repository.ts
├── products-routes.ts
├── products-schema.ts
├── products-service.ts
└── products-swagger.ts
```

Depois, as dependências do módulo são configuradas em `containers` e suas rotas são registradas na aplicação.

## 🛣️ Status

Base funcional para novos projetos.

Próximos passos:

- [ ] Testes automatizados
- [ ] Melhorias de produção
- [ ] Novos módulos conforme necessidade

## 👨‍💻 Autor

**Klayver de Paula Martins**

GitHub: https://github.com/klayver-dev
