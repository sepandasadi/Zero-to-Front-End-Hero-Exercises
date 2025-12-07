import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  isValidURL,
} from '../utils/validation.js';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('accepts valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.com')).toBe(true);
      expect(isValidEmail('test@test.co.uk')).toBe(true);
    });

    it('accepts email with subdomain', () => {
      expect(isValidEmail('user@mail.example.com')).toBe(true);
      expect(isValidEmail('admin@test.company.org')).toBe(true);
    });

    it('accepts email with dots in username', () => {
      expect(isValidEmail('john.doe@example.com')).toBe(true);
      expect(isValidEmail('first.last@test.com')).toBe(true);
    });

    it('accepts email with numbers', () => {
      expect(isValidEmail('user123@example.com')).toBe(true);
      expect(isValidEmail('test2024@mail.com')).toBe(true);
    });

    it('rejects email without @', () => {
      expect(isValidEmail('userexample.com')).toBe(false);
      expect(isValidEmail('invalidemail')).toBe(false);
    });

    it('rejects email without domain', () => {
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('test@.')).toBe(false);
    });

    it('rejects email without username', () => {
      expect(isValidEmail('@example.com')).toBe(false);
    });

    it('rejects empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });

    it('rejects email with spaces', () => {
      expect(isValidEmail('user @example.com')).toBe(false);
      expect(isValidEmail('user@ example.com')).toBe(false);
    });

    it('rejects null and undefined', () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
    });

    it('rejects email without TLD', () => {
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('accepts strong passwords', () => {
      expect(isValidPassword('SecurePass123!')).toBe(true);
      expect(isValidPassword('MyP@ssw0rd')).toBe(true);
      expect(isValidPassword('Abcdef1!')).toBe(true);
    });

    it('rejects password that is too short', () => {
      expect(isValidPassword('Abc12!')).toBe(false);
      expect(isValidPassword('Short1!')).toBe(false);
    });

    it('rejects password without uppercase', () => {
      expect(isValidPassword('securepass123!')).toBe(false);
      expect(isValidPassword('lowercase1!')).toBe(false);
    });

    it('rejects password without lowercase', () => {
      expect(isValidPassword('SECUREPASS123!')).toBe(false);
      expect(isValidPassword('UPPERCASE1!')).toBe(false);
    });

    it('rejects password without number', () => {
      expect(isValidPassword('SecurePass!')).toBe(false);
      expect(isValidPassword('NoNumbers!')).toBe(false);
    });

    it('rejects password without special character', () => {
      expect(isValidPassword('SecurePass123')).toBe(false);
      expect(isValidPassword('NoSpecial1')).toBe(false);
    });

    it('rejects empty string', () => {
      expect(isValidPassword('')).toBe(false);
    });

    it('rejects null and undefined', () => {
      expect(isValidPassword(null)).toBe(false);
      expect(isValidPassword(undefined)).toBe(false);
    });

    it('accepts password with multiple special characters', () => {
      expect(isValidPassword('P@ssw0rd!#$')).toBe(true);
    });

    it('rejects password missing multiple requirements', () => {
      expect(isValidPassword('password')).toBe(false);
      expect(isValidPassword('12345678')).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    it('accepts valid usernames', () => {
      expect(isValidUsername('john_doe')).toBe(true);
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('TestUser')).toBe(true);
    });

    it('accepts username with underscores', () => {
      expect(isValidUsername('test_user_name')).toBe(true);
      expect(isValidUsername('john_doe_123')).toBe(true);
    });

    it('accepts minimum length username', () => {
      expect(isValidUsername('abc')).toBe(true);
      expect(isValidUsername('a12')).toBe(true);
    });

    it('accepts maximum length username', () => {
      expect(isValidUsername('a12345678901234567890')).toBe(false); // 21 chars
      expect(isValidUsername('a1234567890123456789')).toBe(true);   // 20 chars
    });

    it('rejects username that is too short', () => {
      expect(isValidUsername('ab')).toBe(false);
      expect(isValidUsername('a')).toBe(false);
    });

    it('rejects username that is too long', () => {
      expect(isValidUsername('a'.repeat(21))).toBe(false);
    });

    it('rejects username starting with number', () => {
      expect(isValidUsername('1user')).toBe(false);
      expect(isValidUsername('2test')).toBe(false);
    });

    it('rejects username starting with underscore', () => {
      expect(isValidUsername('_user')).toBe(false);
    });

    it('rejects username with special characters', () => {
      expect(isValidUsername('user@name')).toBe(false);
      expect(isValidUsername('user-name')).toBe(false);
      expect(isValidUsername('user.name')).toBe(false);
    });

    it('rejects username with spaces', () => {
      expect(isValidUsername('user name')).toBe(false);
    });

    it('rejects empty string', () => {
      expect(isValidUsername('')).toBe(false);
    });

    it('rejects null and undefined', () => {
      expect(isValidUsername(null)).toBe(false);
      expect(isValidUsername(undefined)).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('accepts valid HTTP URLs', () => {
      expect(isValidURL('http://example.com')).toBe(true);
      expect(isValidURL('http://www.example.com')).toBe(true);
    });

    it('accepts valid HTTPS URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('https://www.example.com')).toBe(true);
    });

    it('accepts URLs with paths', () => {
      expect(isValidURL('https://example.com/path/to/page')).toBe(true);
      expect(isValidURL('http://example.com/page.html')).toBe(true);
    });

    it('accepts URLs with query parameters', () => {
      expect(isValidURL('https://example.com?query=value')).toBe(true);
      expect(isValidURL('http://example.com?a=1&b=2')).toBe(true);
    });

    it('accepts URLs with hash', () => {
      expect(isValidURL('https://example.com#section')).toBe(true);
      expect(isValidURL('http://example.com/page#top')).toBe(true);
    });

    it('accepts URLs with port', () => {
      expect(isValidURL('http://localhost:3000')).toBe(true);
      expect(isValidURL('https://example.com:8080')).toBe(true);
    });

    it('rejects URLs with invalid protocols', () => {
      expect(isValidURL('ftp://example.com')).toBe(false);
      expect(isValidURL('file:///path/to/file')).toBe(false);
    });

    it('rejects malformed URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
      expect(isValidURL('example.com')).toBe(false);
    });

    it('rejects URLs without protocol', () => {
      expect(isValidURL('www.example.com')).toBe(false);
      expect(isValidURL('example.com/path')).toBe(false);
    });

    it('rejects empty string', () => {
      expect(isValidURL('')).toBe(false);
    });

    it('rejects null and undefined', () => {
      expect(isValidURL(null)).toBe(false);
      expect(isValidURL(undefined)).toBe(false);
    });

    it('accepts complex URLs', () => {
      expect(isValidURL('https://user:pass@example.com:8080/path?query=1#hash')).toBe(true);
    });
  });
});

