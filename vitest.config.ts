/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Setup for API testing
    environment: 'node', // Use Node.js environment
    globals: true, // Optional: Use Vitest globals (describe, it, expect) without importing
    include: ['src/tests/api/**/*.test.ts'], // Pattern for API test files
    hookTimeout: 60000,
    testTimeout: 60000,
    // setupFiles: ['./src/tests/setup.ts'], // Add if you need a setup file later
  },
});
