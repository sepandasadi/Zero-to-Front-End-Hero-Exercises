import { describe, it, expect } from 'vitest';
import config from './config';

describe('Config', () => {
  it('exports configuration object', () => {
    expect(config).toBeDefined();
    expect(config).toBeTypeOf('object');
  });

  it('has required fields', () => {
    expect(config).toHaveProperty('apiUrl');
    expect(config).toHaveProperty('environment');
    expect(config).toHaveProperty('mode');
  });

  it('has boolean flags', () => {
    expect(typeof config.debug).toBe('boolean');
    expect(typeof config.isDevelopment).toBe('boolean');
    expect(typeof config.isProduction).toBe('boolean');
  });

  it('is frozen (immutable)', () => {
    expect(Object.isFrozen(config)).toBe(true);
  });
});

