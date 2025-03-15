# EdTech CRM

This project is a Customer Relationship Management (CRM) system for an EdTech platform. It is built using TypeScript, Express, TypeORM, and PostgreSQL. The project includes features for managing admins, students, courses, and statistics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Docker](#docker)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:

  ```sh
  git clone https://github.com/your-repo/edtech-crm.git
  cd edtech-crm
  ```

2. Install dependencies:

  ```sh
  npm install
  ```

3. Set up environment variables:

  ```sh
  NODE_ENV=development
  PORT=3000
  ACCESS_SECRET_KEY=your_access_secret_key
  ACCESS_SECRET_TIME=3600
  REFRESH_SECRET_KEY=your_refresh_secret_key
  REFRESH_SECRET_TIME=86400
  LOG_FORMAT=dev
  LOG_DIR=logs
  ORIGIN=http://localhost:3000
  CREDENTIALS=true
  POSTGRES_USER=root
  POSTGRES_PASSWORD=password
  POSTGRES_HOST=pg
  POSTGRES_PORT=5432
  POSTGRES_DATABASE=dev
  ```

4. Start the development server:

  ```sh
  npm run dev
  ```
# EdTech CRM

## Project Structure
```
.
├── .dockerignore
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .prettierrc
├── .swcrc
├── docker-compose.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── ecosystem.config.js
├── Makefile
├── nodemon.json
├── package.json
├── swagger.yaml
├── tsconfig-output.json
├── tsconfig.json
├── logs/
│   ├── access.log
│   ├── error.log
│   ├── debug/
│   └── error/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── common/
│   │   └── BaseEntity.ts
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── dtos/
│   ├── entities/
│   ├── exceptions/
│   ├── interfaces/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── utils/
└── tests/
```

## Environment Variables

The following environment variables must be configured for the application to work correctly:

- `ACCESS_SECRET_TIME`: Expiration time for access tokens.
- `REFRESH_SECRET_KEY`: Secret key for refresh tokens.
- `REFRESH_SECRET_TIME`: Expiration time for refresh tokens.
- `LOG_FORMAT`: Format for logging.
- `LOG_DIR`: Directory for log files.
- `ORIGIN`: Allowed origin for CORS.
- `CREDENTIALS`: Whether to allow credentials for CORS.
- `POSTGRES_USER`: PostgreSQL username.
- `POSTGRES_PASSWORD`: PostgreSQL password.
- `POSTGRES_HOST`: PostgreSQL host.
- `POSTGRES_PORT`: PostgreSQL port.
- `POSTGRES_DATABASE`: PostgreSQL database name.

## Scripts

The project includes the following scripts for development and production:

- `npm start`: Build the project and start the server in production mode.
- `npm run dev`: Start the development server with nodemon.
- `npm run build`: Build the project using SWC.
- `npm run build:tsc`: Build the project using the TypeScript compiler.
- `npm test`: Run the tests using Jest.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run lint:fix`: Run ESLint and fix linting errors.
- `npm run deploy:prod`: Build the project and start the server in production mode using PM2.
- `npm run deploy:dev`: Start the development server using PM2.

## Docker Commands

### Build and Run Using Docker Compose
```sh
docker-compose up --build
```

### Build Docker Image
```sh
docker build -t edtech-crm -f Dockerfile.prod .
```

### Run Docker Container
```sh
docker run -d -p 3000:3000 edtech-crm
```

## Running Tests

To run the test suite, execute:
```sh
npm test
```


