# MADFAM - Catálogo de Cursos Especializados

![MADFAM Logo](https://via.placeholder.com/150)

## Descripción del Proyecto

MADFAM ofrece un catálogo completo de 100 cursos especializados en:
- Manufactura Sostenible
- Transformación Digital
- Filosofía Solarpunk

El proyecto incluye un sitio web moderno y responsive construido con Astro que presenta los cursos disponibles con información almacenada en SQLite.

## Características Principales

- **Framework Moderno**: Astro para renderizado híbrido (SSG/SSR)
- **Base de Datos**: SQLite para almacenamiento local de datos de cursos
- **Diseño Responsivo**: Adaptable a dispositivos móviles y desktop
- **Rendimiento Óptimo**: Carga rápida gracias a Astro's Islands Architecture
- **Gestión de Datos**: API endpoints para interactuar con la base de datos SQLite

## Tecnologías Utilizadas

- **Frontend**:
  - Astro (v3.0+)
  - Tailwind CSS
  - TypeScript

- **Backend**:
  - SQLite (via better-sqlite3)
  - API Routes (Astro endpoints)

- **Herramientas**:
  - Vite (Bundler)
  - Drizzle ORM (opcional para gestión de SQLite)

## Estructura del Proyecto

```
catalogo100ecomm/
├── src/
│   ├── components/      # Componentes Astro/React/Vue
│   ├── layouts/         # Plantillas de página
│   ├── pages/           # Rutas de la aplicación
│   ├── db/             # Configuración de SQLite
│   │   └── schema.ts    # Esquema de la base de datos
│   └── api/            # Endpoints API
├── public/             # Assets estáticos
├── astro.config.mjs    # Configuración de Astro
├── package.json
└── README.md
```

## Instalación y Ejecución

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

## Licencia

 2025 MADFAM. Todos los derechos reservados.
