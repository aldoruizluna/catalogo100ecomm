# MADFAM Catálogo de Cursos (Astro Edition)

![MADFAM Logo](public/images/logo.png)

Modern Astro implementation of the MADFAM course catalog with enhanced performance and maintainability.

## ✨ Features

- **Static Site Generation** with Astro for GitHub Pages deployment
- **Interactive UI** with animations (via potential JS/components)
- **Responsive Design** for all devices
- **Database Integration** with SQLite via Drizzle ORM
- **API Endpoints** for course management

## 🚀 Project Structure

```
catalogo100ecomm/
├── public/           # Static assets (images, CSS, etc.)
│   ├── css/
│   │   └── main.css # Custom site styles
│   └── images/
│       └── ...      # Site images
├── src/
│   ├── components/   # Reusable Astro/UI components
│   ├── db/           # Database connection, schema, seeding
│   │   └── schema.ts # Drizzle ORM schema definition
│   ├── layouts/      # Base page layouts
│   ├── pages/        # Site pages (routes)
│   │   └── api/      # API endpoints (server routes)
│   └── env.d.ts      # TypeScript env definitions
├── .astro/           # Astro build cache/temp files
├── .git/             # Git repository data
├── .gitignore
├── astro.config.mjs  # Astro configuration file
├── package.json      # Project dependencies and scripts
├── package-lock.json
├── dev.db            # SQLite database file (created locally)
└── README.md
```

## 🛠️ Development Setup (Startup Procedure)

Follow these steps to set up and run the project locally for development:

1.  **Clone the Repository:**

    ```bash
    git clone [URL del repositorio]
    cd catalogo100ecomm
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Initialize and Seed the Database:**

    ```bash
    # This creates dev.db and populates it with initial data
    npm run db:seed
    ```

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    This command first runs `npm run db:seed` to ensure the database is ready, then starts the development server.

5.  **Access the Application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Stopping the Development Server

- Press `Ctrl + C` in the terminal where the `npm run dev` command is running.

### Database Scripts

- `npm run db:seed`: (Re)creates `dev.db` and populates it with seed data from `src/db/seed.ts`.
- `npm run db:reset`: Deletes the `dev.db` file and its related journal files (`-shm`, `-wal`), then runs `db:seed`.
- `npm run db:test`: Runs a test script (`src/db/test.ts`) against the database.

## 🌐 Deployment

### GitHub Pages Automatic Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push to Main Branch**:
   When you push to the `main` branch, the GitHub Actions workflow will automatically build and deploy the site.

2. **Manual Deployment**:
   You can also manually trigger a deployment from the Actions tab in the GitHub repository.

### Build Locally

1. **Build the Application for Production:**

    ```bash
    npm run build
    ```

    This generates the production-ready static output in the `dist/` directory.

2. **Preview the Production Build Locally:**

    ```bash
    npm run preview
    ```
    - The exact command to start the production server depends on the hosting environment (e.g., `node dist/server/entry.mjs`).
    - Stopping the production server also depends on the environment (e.g., `kill` command, service manager like `systemctl` or `pm2`).

## 🧹 Cleanup (Takedown Procedure)

To remove files generated during development or build:

- **Remove Database:**

  ```bash
  # Option 1: Use the reset script (also re-seeds)
  npm run db:reset
  # Option 2: Manually delete (if you don't want to re-seed immediately)
  rm dev.db dev.db-shm dev.db-wal
  ```

  _Use appropriate commands for your OS if not using bash (e.g., `del` on Windows CMD)_

- **Remove Build Artifacts:**

  ```bash
  rm -rf dist .astro
  ```

- **Remove Dependencies:**
  ```bash
  rm -rf node_modules
  ```
  _(You would need to run `npm install` again after this)_

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for unit and integration testing and [Supertest](https://github.com/ladjs/supertest) for API endpoint testing.

### Running Tests Manually

1.  **Ensure the development server is running** (required for API tests that use Supertest against the live server):
    ```bash
    npm run dev
    ```
2.  In a **separate terminal**, run the test suite:

    ```bash
    # Run all tests
    npm test
    # Or: npx vitest run

    # Run tests in watch mode (reruns on file changes)
    # npx vitest
    ```

    Test files are located in the `src/tests` directory and follow the `*.test.ts` or `*.spec.ts` naming convention.

### Automated Testing (Pre-commit Hook)

- This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automatically run relevant tests before each commit.
- When you run `git commit`, the pre-commit hook (`.husky/pre-commit`) triggers `lint-staged`.
- `lint-staged` (configured in `package.json`) runs `vitest related --run` on any staged files matching `*.{js,ts,astro}`.
- This ensures that code related to your changes passes tests before being committed.
- **Important:** API tests using Supertest currently rely on the development server running at `http://localhost:3000`. The pre-commit hook will likely fail these tests if the dev server isn't running when you commit. Future improvements could involve mocking the API or starting/stopping the server within the test setup.

## 📚 Tech Stack

- [Astro](https://astro.build) (v5.6.1) - Frontend framework with static site generation
- [GitHub Pages](https://pages.github.com/) - Hosting and deployment
- [SQLite](https://sqlite.org) - Database
- [Drizzle ORM](https://orm.drizzle.team) - Database toolkit
- [TypeScript](https://www.typescriptlang.org/) - For type safety

## 📄 License

2025 MADFAM. Todos los derechos reservados.

## Configuración de la Base de Datos

The project uses SQLite (`dev.db`) to store the course catalog.

- **Schema:** Defined in `src/db/schema.ts` using Drizzle ORM.
- **Seeding:** Initial data is populated using `src/db/seed.ts` via the `npm run db:seed` script.
- **Connection:** Managed in `src/db/index.ts`.

## Variables de Entorno

While not strictly required for the default SQLite setup, you can configure the database path via environment variables if needed in the future.

Create a `.env` file in the root directory:

```
# Example (adjust path if necessary)
DATABASE_URL="file:./dev.db"
```

_(Currently, the database path might be hardcoded; check `src/db/index.ts`)_

## Contribución

1.  Haz un fork del proyecto
2.  Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3.  Haz commit de tus cambios (`git commit -m 'Añade nueva característica'`)
4.  Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5.  Abre un Pull Request

## Contacto

Para más información, contáctanos en:

- Email: contacto@madfam.com
- Teléfono: +52 55 1234 5678
- Ciudad de México, México

<!-- Trigger deployment -->
