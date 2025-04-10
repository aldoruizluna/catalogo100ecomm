import { describe, it, expect } from 'vitest';
import supertest from 'supertest';

// Base URL of the running Astro development server
const API_URL = 'http://localhost:3000';
// Note: For more robust testing, consider environment variables
// or dynamically starting/stopping the server during tests.

const request = supertest(API_URL);

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

  // --- Add more tests later ---

  // Example: Test POST endpoint (requires careful state management or DB mocking)
  /*
  it('POST /api/courses should add a new course', async () => {
    const newCourse = {
      name: 'Vitest Test Course',
      category: 'Testing',
      description: 'A course created during tests',
      duration: 1,
      instructor: 'Test Runner'
    };

    const postResponse = await request
      .post('/api/courses')
      .send(newCourse)
      .expect(201)
      .expect('Content-Type', /json/);

    // Optionally verify the created course details in the response
    // expect(postResponse.body).toMatchObject({ name: newCourse.name });

    // Optionally, make a GET request to verify it's in the list
    const getResponse = await request.get('/api/courses');
    const courseExists = getResponse.body.some(course => course.name === newCourse.name);
    expect(courseExists).toBe(true);
  });

  it('POST /api/courses should return 400 for missing name', async () => {
    const invalidData = {
      // name is missing
      category: 'Testing',
      description: 'Invalid course'
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error).toContain('Missing or invalid name');
      });
  });

  it('POST /api/courses should return 400 for missing category', async () => {
    const invalidData = {
      name: 'Test Course',
      // category is missing
      description: 'Invalid course'
    };
    await request
      .post('/api/courses')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error).toContain('Missing or invalid category');
      });
  });
  */
});
