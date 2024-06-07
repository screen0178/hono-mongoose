# REST API using Bun + Hono + MongoDB + TypeScript

Welcome to your new Bun project! This project is a REST API using Bun + Hono + MongoDB + TypeScript providing a powerful and efficient platform with a simple CRUD interface for a user model.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installations](#installations)
  - [Configuration](#configuration)
- [Project Structure](#project-structure)

## Getting Started

Before you begin, make sure you have the following installed:

- [Bun](https://bun.sh)
- [MongoDB](mongodb.com) or [MongoCompass](mongodb.com/products/compass)

### Installations:

1. Clone this repository to your local machine

```bash
git clone https://github.com/ProMehedi/bun-hono-rest-api.git
```

2. Navigate to the project directory

```bash
cd bun-hono-rest-api
```

3. Install dependencies

```bash
bun install
```

To run:

```bash
bun run dev
```

### Configuration

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
PORT=9000
MONGO_URI=mongodb://localhost:27017/bun-hono-rest-api
JWT_SECRET=secret
```

## Project Structure

```

├── .vscode
│ ├── settings.json
├── config
│ ├── db.ts
├── middlewares
│ ├── authMiddlewares.ts
│ ├── errorMiddlewares.ts
├── module
│ ├── auth
| | ├── index.ts
| | ├── model.ts
├── utils
│ ├── getToken.ts
├── server.ts
├── .env
├── .gitignore
├── bun.lockb
├── README.md
├── package.json
├── tsconfig.ts

```
