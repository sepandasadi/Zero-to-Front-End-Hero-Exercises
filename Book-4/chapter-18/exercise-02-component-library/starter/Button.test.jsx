import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

/**
 * Button Component Tests - STARTER
 *
 * Your task: Write comprehensive tests for the Button component
 * Target: 80%+ code coverage
 */

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      // TODO: Render button with text and verify it appears
    });

    it('renders as a button element by default', () => {
      // TODO: Verify the element is a <button>
    });
  });

  describe('Variants', () => {
    it('applies primary variant class by default', () => {
      // TODO: Test default variant
    });

    it('applies secondary variant class', () => {
      // TODO: Test secondary variant
    });

    // TODO: Add tests for outline, ghost, and danger variants
  });

  describe('Sizes', () => {
    it('applies medium size class by default', () => {
      // TODO: Test default size
    });

    // TODO: Add tests for sm and lg sizes
  });

  describe('Icons', () => {
    const TestIcon = () => <svg data-testid="test-icon">Icon</svg>;

    it('renders left icon', () => {
      // TODO: Test leftIcon prop
    });

    it('renders right icon', () => {
      // TODO: Test rightIcon prop
    });

    it('hides icons when loading', () => {
      // TODO: Test that icons don't show when isLoading is true
    });
  });

  describe('States', () => {
    it('shows loading spinner when isLoading is true', () => {
      // TODO: Test loading state
    });

    it('is disabled when isDisabled is true', () => {
      // TODO: Test disabled state
    });

    it('is disabled when isLoading is true', () => {
      // TODO: Test that loading also disables the button
    });

    it('sets aria-busy when loading', () => {
      // TODO: Test aria-busy attribute
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      // TODO: Test onClick handler
      // Hint: Use jest.fn() and fireEvent.click()
    });

    it('does not call onClick when disabled', () => {
      // TODO: Test that disabled buttons don't trigger onClick
    });

    it('does not call onClick when loading', () => {
      // TODO: Test that loading buttons don't trigger onClick
    });
  });

  describe('Props', () => {
    it('forwards ref to button element', () => {
      // TODO: Test ref forwarding
      // Hint: Use React.createRef()
    });

    it('applies custom className', () => {
      // TODO: Test custom className prop
    });

    it('sets button type', () => {
      // TODO: Test type prop (button, submit, reset)
    });

    it('passes through additional props', () => {
      // TODO: Test that ...props are spread onto button
    });
  });
});

