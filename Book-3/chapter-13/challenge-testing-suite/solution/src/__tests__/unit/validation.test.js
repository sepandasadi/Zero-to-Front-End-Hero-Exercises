import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  getPasswordValidationDetails,
  validateTodoText,
  sanitizeInput,
} from '../../utils/validation';

describe('Validation Utils - Unit Tests', () => {
  describe('validateEmail', () => {
    it('returns true for valid email', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('returns false for invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
    });

    it('returns false for empty or null email', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });

    it('returns false for non-string input', () => {
      expect(validateEmail(123)).toBe(false);
      expect(validateEmail({})).toBe(false);
      expect(validateEmail([])).toBe(false);
    });

    it('handles emails with whitespace', () => {
      expect(validateEmail('  user@example.com  ')).toBe(true);
    });
  });

  describe('validatePassword', () => {
    it('returns true for strong password', () => {
      expect(validatePassword('SecurePass123!')).toBe(true);
      expect(validatePassword('MyP@ssw0rd')).toBe(true);
      expect(validatePassword('T3st!ng123')).toBe(true);
    });

    it('returns false for weak password - too short', () => {
      expect(validatePassword('Pass1!')).toBe(false);
      expect(validatePassword('Aa1!')).toBe(false);
    });

    it('returns false for weak password - missing uppercase', () => {
      expect(validatePassword('password123!')).toBe(false);
    });

    it('returns false for weak password - missing lowercase', () => {
      expect(validatePassword('PASSWORD123!')).toBe(false);
    });

    it('returns false for weak password - missing number', () => {
      expect(validatePassword('Password!')).toBe(false);
    });

    it('returns false for weak password - missing special char', () => {
      expect(validatePassword('Password123')).toBe(false);
    });

    it('returns false for empty or null password', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
      expect(validatePassword(undefined)).toBe(false);
    });

    it('returns false for non-string input', () => {
      expect(validatePassword(12345678)).toBe(false);
      expect(validatePassword({})).toBe(false);
    });
  });

  describe('getPasswordValidationDetails', () => {
    it('returns all requirements for strong password', () => {
      const details = getPasswordValidationDetails('SecurePass123!');
      expect(details.length).toBe(true);
      expect(details.uppercase).toBe(true);
      expect(details.lowercase).toBe(true);
      expect(details.number).toBe(true);
      expect(details.special).toBe(true);
      expect(details.valid).toBe(true);
    });

    it('identifies missing requirements', () => {
      const details = getPasswordValidationDetails('password');
      expect(details.length).toBe(true);
      expect(details.uppercase).toBe(false);
      expect(details.number).toBe(false);
      expect(details.special).toBe(false);
      expect(details.valid).toBe(false);
    });

    it('handles empty password', () => {
      const details = getPasswordValidationDetails('');
      expect(details.valid).toBe(false);
      expect(details.length).toBe(false);
    });
  });

  describe('validateTodoText', () => {
    it('returns true for valid todo text', () => {
      expect(validateTodoText('Buy milk')).toBe(true);
      expect(validateTodoText('A')).toBe(true);
      expect(validateTodoText('  Valid todo  ')).toBe(true);
    });

    it('returns false for empty text', () => {
      expect(validateTodoText('')).toBe(false);
      expect(validateTodoText('   ')).toBe(false);
    });

    it('returns false for text exceeding 500 characters', () => {
      const longText = 'a'.repeat(501);
      expect(validateTodoText(longText)).toBe(false);
    });

    it('returns true for text at 500 character limit', () => {
      const maxText = 'a'.repeat(500);
      expect(validateTodoText(maxText)).toBe(true);
    });

    it('returns false for null or undefined', () => {
      expect(validateTodoText(null)).toBe(false);
      expect(validateTodoText(undefined)).toBe(false);
    });

    it('returns false for non-string input', () => {
      expect(validateTodoText(123)).toBe(false);
      expect(validateTodoText({})).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('trims whitespace from input', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
      expect(sanitizeInput('\n\ttest\n\t')).toBe('test');
    });

    it('returns empty string for invalid input', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });

    it('handles already clean input', () => {
      expect(sanitizeInput('clean')).toBe('clean');
    });
  });
});

