import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn } from 'child_process';
import supertest from 'supertest';

// Base URL of the running Astro development server
const API_URL = 'http://localhost:3000';
// Note: For more robust testing, consider environment variables
// or dynamically starting/stopping the server during tests.

// Spin up dev server for tests
let server: ReturnType<typeof spawn>;
const request = supertest(API_URL);

// Spin up a dev server before tests, then poll HTTP until ready
beforeAll(async () => {
  server = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'ignore',
  });
  const start = Date.now();
  while (Date.now() - start < 60000) {
    try {
      await request.get('/api/courses').expect(200);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error('Server did not start in time');
}, 60000);

afterAll(() => server.kill());

describe('API Endpoints - /api/courses', () => {
  it('GET /api/courses should return a list of courses', async () => {
    const response = await request
      .get('/api/courses')
      .expect(200) // Assert status code
      .expect('Content-Type', /json/); // Assert content type is JSON

    // Assert the body is an array (basic check)
    expect(response.body).toBeInstanceOf(Array);

    // Optionally, add more specific checks if seed data is consistent:
    // expect(response.body.length).toBeGreaterThan(0);
    // expect(response.body[0]).toHaveProperty('id');
    // expect(response.body[0]).toHaveProperty('name');
    // expect(response.body[0]).toHaveProperty('category');
  });

  // Tests for POST endpoints and error handling
  it('POST /api/courses should add a new course', async () => {
    const newCourse = {
      name: 'Vitest Test Course',
      category: 'Testing',
      description: 'A course created during tests',
      duration: 1,
      instructor: 'Test Runner',
    };

    const postResponse = await request
      .post('/api/courses')
      .send(newCourse)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(postResponse.body).toHaveProperty('lastInsertRowid');

    // Verify it's in the list
    const getResponse = await request.get('/api/courses');
    const courseExists = getResponse.body.some(
      (course) => course.name === newCourse.name
    );
    expect(courseExists).toBe(true);
  });

  it('POST /api/courses should return 400 for missing name', async () => {
    const invalidData = {
      // name is missing
      category: 'Testing',
      description: 'Invalid course',
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error).toContain(
          'Invalid data: Missing or invalid name'
        );
      });
  });

  it('POST /api/courses should return 400 for missing category', async () => {
    const invalidData = {
      name: 'Test Course',
      // category is missing
      description: 'Invalid course',
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error).toContain(
          'Invalid data: Missing or invalid category'
        );
      });
  });

  it('POST /api/courses should return 400 for invalid name type', async () => {
    const invalidData = {
      name: 123,
      category: 'Testing',
      description: 'Desc',
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error).toContain(
          'Invalid data: Missing or invalid name'
        );
      });
  });

  it('POST /api/courses should return 400 for invalid category type', async () => {
    const invalidData = {
      name: 'Test',
      category: 123,
      description: 'Desc',
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error).toContain(
          'Invalid data: Missing or invalid category'
        );
      });
  });

  it('POST /api/courses should return 500 for malformed JSON', async () => {
    await request
      .post('/api/courses')
      .set('Content-Type', 'application/json')
      .send('not a json')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error).toBe('Failed to process request');
      });
  });

  it('GET /api/courses should include CORS header', async () => {
    const res = await request.get('/api/courses').expect(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});
