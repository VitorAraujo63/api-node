# Course Management API

Uma API REST desenvolvida em **Node.js** e **TypeScript** focada no gerenciamento de cursos. Este projeto foi criado como um desafio técnico para aplicar conceitos modernos de validação, documentação e ORM.

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Fastify (v5)**: Framework web rápido e com baixo overhead.
- **Drizzle ORM**: Para interação com o banco de dados e gerenciamento de migrations.
- **PostgreSQL**: Banco de dados relacional (via Docker).
- **Zod**: Para validação de esquemas e tipagem forte (integrado via `fastify-type-provider-zod`).
- **Swagger (@scalar/fastify-api-reference)**: Documentação interativa da API gerada automaticamente.
- **Docker**: Containerização do banco de dados e ambiente.

---

## 🏗️ Estrutura do Projeto

A estrutura foi pensada para separar responsabilidades de rotas, esquemas de banco e configurações.

- `src/server.ts`: Ponto de entrada, configuração do Fastify e Swagger.
- `src/routes/`: Definição das rotas e validações Zod.
- `src/database/`: Configuração do cliente Drizzle e Schemas do banco.
- `drizzle.config.ts`: Configuração do Drizzle Kit.
- `docker-compose.yaml`: Orquestração dos serviços (App + DB).

---

## Documentação / Swagger
Quando `NODE_ENV` === "development":
- OpenAPI via `@fastify/swagger`
- UI de documentação em `/docs` via `@scalar/fastify-api-reference`
Acesse: `http://localhost:3333/docs` (apenas em dev)

---

## Fluxo principal (Mermaid)

Abaixo está o diagrama em Mermaid do fluxo principal da API em formato de sequência, seguindo fielmente o fluxo de validações e interações com o banco:

```mermaid
sequenceDiagram
  participant C as Client
  participant S as Fastify Server
  participant V as Zod Validator
  participant DB as Drizzle + PostgreSQL

  C->>S: POST /courses {title}
  S->>V: Validar body (title: string, min 5)
  V-->>S: OK ou Erro 400 ("Título precisa de 5 caracteres no mínimo")
  alt válido
    S->>DB: INSERT INTO courses (title)
    DB-->>S: {id}
    S-->>C: 201 {courseId: uuid}
  else inválido
    S-->>C: 400 {validationError}
  end

  C->>S: GET /courses
  S->>DB: SELECT id, title FROM courses
  DB-->>S: lista [{id, title, ...}, ...]
  S-->>C: 200 {courses: [...]}

  C->>S: GET /courses/:id
  S->>V: Validar param id (uuid)
  V-->>S: OK ou Erro 400
  alt encontrado
    S->>DB: SELECT * FROM courses WHERE id=...
    DB-->>S: course
    S-->>C: 200 {course}
  else não encontrado
    S-->>C: 404 {message: "Course not found"}
  end
```

---
# Certificado 

![Certificado de participação do curso da Rocketseat de nodejs](./certificado/image.png)