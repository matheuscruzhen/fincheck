# Fincheck (API)

API for Fincheck, a project to help users manage their finances.

For more details on other project components, check out the web client and mobile client repositories.

## Technologies

These are some of the technologies used in this project:

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: Core modules for building scalable server-side applications with NestJS.
- `bcryptjs`: Library for hashing and verifying passwords.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `eslint`: Linting tool for JavaScript/TypeScript code.
- `jest`: JavaScript testing framework.
- `prettier`: Code formatter.
- `prisma`: ORM for working with databases in Node.js and TypeScript.
- `rxjs`: Reactive programming library for asynchronous data streams.
- `supertest`: HTTP assertions for integration testing.
- `typescript`: Strongly typed programming language that builds on JavaScript.

_For more information about other dependencies, see the `package.json` file._

## Prerequisites

Before installing and running this project, make sure you have the following:

- **Database**: You need to have a database configured (e.g., PostgreSQL, MySQL, or SQLite, depending on your Prisma setup).
- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **Package Manager**: You need a package manager for Node.js. This tutorial uses [pnpm](https://pnpm.io/), but you can use npm or yarn if you prefer.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/matheuscruzhen/fincheck-api.git
   ```

2. Browse to the project folder:

   ```bash
   cd fincheck-api
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env` file in the root of the project and set the environment variables as described below:

   ```bash
   # DATABASE_URL: The connection string for your database.
   # Example for local development (PostgreSQL):
   # DATABASE_URL="postgresql://user:password@localhost:5432/fincheck"
   DATABASE_URL=""

   # JWT_SECRET: Secret key for signing JWT tokens.
   JWT_SECRET=""
   ```

## Available scripts

This section describes the available scripts in the `package.json` file and their functionalities.

### Development

- #### `start:dev`

  Starts the server in development mode with live-reloading.

  ```bash
  pnpm start:dev
  ```

### Production

- #### `build`

  Compiles the application for production.

  ```bash
  pnpm build
  ```

- #### `start:prod`

  Starts the server for production from the compiled files.

  ```bash
  pnpm start:prod
  ```

### Testing

- #### `test`

  Runs all unit tests.

  ```bash
  pnpm test
  ```

- #### `test:watch`

  Runs tests in watch mode.

  ```bash
  pnpm test:watch
  ```

- #### `test:cov`

  Runs tests and generates a coverage report.

  ```bash
  pnpm test:cov
  ```

## Related links

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)

## License

[UNLICENSED](LICENSE)
