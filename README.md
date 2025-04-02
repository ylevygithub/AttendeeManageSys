# Attendee-management-system

## Overview
This project is a web application built with Remix, Vite, TypeScript, Prisma, and Tailwind CSS. It includes features for managing attendees for corporate retreats.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

[Node.js](https://nodejs.org/fr/) (v14.x or later)
[npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/)

## Getting Started
### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Configure Prisma with SQLite
Prisma is configured to use SQLite, which doesn't require a separate database server setup. Ensure your prisma/schema.prisma file is configured for SQLite (the file contains more instructions you must not modify):

```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 4. Set Up Prisma
Generate Prisma Client:
```bash
npx prisma generate
```

Apply Database Migrations:
```bash
npx prisma migrate dev --name init
```

### 5. Running the Development Server
Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

This will start the development server, showing the line we need as so : Local:   http://localhost:3000/
Ctrl+click on it and see the magic happen.

### 6. Result
Once the form completed, add 'admin' to the url and see the result.
Example : http://localhost:5173/admin

## Project Structure
* app/: Contains the main application code.
  * components/: Reusable UI components.
  * tailwind.css: CSS and Tailwind CSS configurations.
  * routes/: Application routes.
* prisma/: Contains Prisma schema and migrations.
* public/: Static assets.
* tailwind.config.js: Tailwind CSS configuration file.
* tsconfig.json: TypeScript configuration file.
* vite.config.ts: Vite configuration file.

## Contributing
If you wish to contribute to this project, please follow the standard fork and pull request workflow.

1. Fork the project.
2. Create your feature branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.
