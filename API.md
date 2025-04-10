# MADFAM Course Catalog API Documentation

This document details the API endpoints available in the MADFAM Course Catalog application.

## Base URL

- **Development:** `http://localhost:3000/api`
- **Production:** `[Your Production URL]/api`

## Authentication

Currently, there is no authentication required to access these endpoints.

## Endpoints

### 1. Courses

Handles operations related to courses.

- **Endpoint:** `/courses`
- **Handler File:** `src/pages/api/courses.astro`

#### **GET /courses**

Retrieves a list of all available courses.

- **Method:** `GET`
- **Description:** Fetches all records from the `courses` table in the database.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content Type:** `application/json; charset=utf-8`
  - **Body:** An array of course objects.
    ```json
    [
      {
        "id": 1,
        "name": "Introducción a Astro",
        "category": "Web Development",
        "description": "Aprende los fundamentos de Astro.",
        "duration": 10,
        "instructor": "Jane Doe",
        "createdAt": "2024-01-15T10:30:00.000Z" // Example timestamp
      },
      {
        "id": 2,
        "name": "Drizzle ORM Avanzado",
        "category": "Database",
        "description": null,
        "duration": 15,
        "instructor": "John Smith",
        "createdAt": "2024-01-16T11:00:00.000Z"
      }
      // ... other courses
    ]
    ```
    _Note: `createdAt` format might vary based on SQLite storage and retrieval._
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content Type:** `application/json; charset=utf-8`
  - **Body:**
    ```json
    {
      "error": "Database error"
    }
    ```

#### **POST /courses**

Adds a new course to the catalog.

- **Method:** `POST`
- **Description:** Inserts a new record into the `courses` table.
- **Request Body:**
  - **Content Type:** `application/json`
  - **Schema:** Requires at least `name` and `category`. Other fields are optional based on the database schema (`src/db/schema.ts`).
    ```json
    {
      "name": "Nuevo Curso de JS",
      "category": "Programming",
      "description": "Curso completo de JavaScript moderno.",
      "duration": 40,
      "instructor": "Alice Ray"
    }
    ```
- **Success Response:**
  - **Code:** `201 Created`
  - **Content Type:** `application/json; charset=utf-8`
  - **Body:** The newly created course object (structure might depend slightly on Drizzle's return value upon insert, often includes metadata like `lastInsertRowid`).
    ```json
    {
      // Details depend on Drizzle's response configuration
      // Potentially includes the inserted data or just success/ID info
    }
    ```
- **Error Response:**
  - **Code:** `400 Bad Request` (If request body is invalid or missing required fields)
  - **Content Type:** `application/json; charset=utf-8`
  - **Body:**
    ```json
    {
      "error": "Invalid data"
    }
    ```
  - **Code:** `500 Internal Server Error` (If database insertion fails)
  - **Content Type:** `application/json; charset=utf-8`
  - **Body:**
    ```json
    {
      "error": "Database error" // Or a more specific error
    }
    ```
