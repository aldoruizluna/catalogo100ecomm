import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import { spawn } from 'child_process';

// Base URL of the running Astro development server
const API_URL = 'http://localhost:3000';
// Note: For more robust testing, consider environment variables
// or dynamically starting/stopping the server during tests.

const request = supertest(API_URL);

let server: ReturnType<typeof spawn>;

beforeAll(async () => {
  server = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('Server did not start in time')),
      60000
    );
    const onData = (data: Buffer) => {
      const msg = data.toString();
      if (/localhost:3000/i.test(msg)) {
        clearTimeout(timeout);
        resolve(null);
      }
    };
    server.stdout!.on('data', onData);
    server.stderr!.on('data', onData);
    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}, 60000);

afterAll(() => {
  server.kill();
});

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
});
