import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';

// Extend Vitest matchers
expect.extend(matchers);

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Clean up after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
});

// Stop server after all tests
afterAll(() => server.close());

