# MADFAM Catálogo de Cursos (Astro Edition)

![MADFAM Logo](public/images/logo.png)

Modern Astro implementation of the MADFAM course catalog with enhanced performance and maintainability.

## ✨ Features

- **Static Site Generation** with Astro
- **Interactive UI** with animations
- **Responsive Design** for all devices
- **API Integration** with SQLite backend
- **Performance Optimized** (90+ Lighthouse score)

## 🚀 Project Structure

```
catalogo100ecomm/
├── public/
│   ├── legacy/       # Original static assets
│   └── images/      # Optimized assets
├── src/
│   ├── components/   # Astro & UI components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Application routes
│   ├── db/          # Database configuration
│   │   └── schema.ts    # Esquema de la base de datos
│   └── api/            # Endpoints API
├── astro.config.mjs    # Configuración de Astro
├── package.json
└── README.md
```

## 🛠️ Development

1. Clona el repositorio:
   ```bash
   git clone [URL del repositorio]
   ```

2. Instala dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

3. Inicia la base de datos SQLite (se creará automáticamente):
   ```bash
   npm run db:init
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre http://localhost:3000 en tu navegador

## 🌐 Deployment

Deployed via:
```bash
npm run deploy
```

## 📚 Tech Stack

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [SQLite](https://sqlite.org)
- [Drizzle ORM](https://orm.drizzle.team)

## 📄 License

 2025 MADFAM. Todos los derechos reservados.

## Configuración de la Base de Datos

El proyecto utiliza SQLite para almacenar:
- Catálogo de cursos
- Información de instructores
- Horarios y disponibilidad

Para importar datos iniciales:
```bash
npm run db:seed
```

## Variables de Entorno

Crea un archivo `.env` con:
```
DATABASE_URL="file:./dev.db"
```

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Contacto

Para más información, contáctanos en:
- Email: contacto@madfam.com
- Teléfono: +52 55 1234 5678
- Ciudad de México, México
