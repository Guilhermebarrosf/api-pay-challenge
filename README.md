# [API-Challenge-Pay]

![Badge da Licença](https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=202020)
![Badge do Status](https://img.shields.io/static/v1?label=status&message=Concluido&color=green&labelColor=202020)
![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)

> Esta API foi construída como parte de um desafio técnico, com o objetivo de demonstrar habilidades em desenvolvimento fullstack, integração com bancos de dados e boas práticas de engenharia de software.

## 🌐 Deploy (Demonstração Online)

O projeto está hospedado e pode ser acessado através do link abaixo:

🔗 **Acesse a aplicação aqui:** [API ACCESS](https://api-pay-challenge.vercel.app/)
---

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação  desenvolvida utilizando **Next.js**. O foco principal foi a aplicação de **Clean Code** e **Arquitetura Hexagonal (Ports and Adapters)** para garantir um código desacoplado, testável e de fácil manutenção.

O banco de dados utilizado é o **PostgreSQL** (via Supabase), gerenciado pelo ORM **Prisma**. A aplicação também está "dockerizada" para facilitar a execução em qualquer ambiente.

### 🏛️ Arquitetura e Decisões Técnicas
Para atender aos critérios de organização e clareza:
* **Arquitetura Hexagonal:** A lógica de negócio está isolada de frameworks e interfaces externas.
* **Prisma ORM:** Para interações seguras e tipadas com o banco de dados.
* **Supabase:** Utilizado como provedor de banco de dados PostgreSQL.
* **Docker:** Containerização para garantir consistência entre ambientes de desenvolvimento e produção.

---

## 🛠 Tecnologias

* **[Next.js](https://nextjs.org/)** - Framework React (Fullstack)
* **[Prisma](https://www.prisma.io/)** - ORM
* **[Supabase](https://supabase.com/)** - Banco de Dados (PostgreSQL)
* **[Docker](https://www.docker.com/)** - Containerização
* **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
* **Node.js** (versão 18 ou superior recomendada)
* **npm**
* **Docker** e **Docker Compose** (para rodar via container)
* **Git**

---

## 🚀 Como Rodar o Projeto

Você pode rodar este projeto de duas formas: **Via Docker** (Recomendado) ou **Manualmente (NPM)**.

### 1️⃣ Configuração Inicial (Variáveis de Ambiente)

Independente do método escolhido, renomeie o arquivo `.env.example` para `.env` e preencha as credenciais do seu banco de dados (Supabase/PostgreSQL):

```bash
# Exemplo do arquivo .env
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
DIRECT_URL="postgresql://user:password@host:port/database"
```
🐳 Método A: Rodando com Docker (Recomendado)
Se você tem o Docker instalado, este é o método mais rápido, pois sobe a aplicação e o ambiente necessário automaticamente.

Construa e suba os containers:

```bash
  docker-compose up -d --build
```
Acesse a aplicação: Abra seu navegador em: http://localhost:3000

Para parar a execução:

```bash
  docker-compose down
```
💻 Método B: Rodando Manualmente (Local)
Caso prefira rodar diretamente no seu ambiente Node:

Instale as dependências:

```bash

  npm install
```

Gere a tipagem do Prisma: Isso garante que o Prisma Client esteja sincronizado com seu schema.

```bash

  npx prisma generate
```

Execute as migrações (Opcional se o banco for novo):

```bash

npx prisma migrate dev
```

Inicie o servidor de desenvolvimento:

```bash

npm run dev
```


Acesse: http://localhost:3000

🗄️ Comandos Úteis do Banco de Dados
Se precisar inspecionar o banco de dados visualmente, o Prisma oferece uma interface gráfica:


🧪 Estrutura de Pastas (Clean Arch/Hexagonal)
A estrutura do projeto segue a separação de responsabilidades:

src/

    ├── core/           # Regras de Negócio e Entidades (Independente de Framework)
    ├── infra/          # Implementações concretas (Database, API Clients)
    ├── app/            # Camada do Next.js (Routes, Pages, Components)
    └── components/     # Componentes React reutilizáveis

👤 Autor

    Desenvolvido por Guilherme Barros.

