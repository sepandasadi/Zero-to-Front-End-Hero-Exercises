import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    // TODO: Render button and verify text appears
  });

  it('calls onClick handler when clicked', async () => {
    // TODO: Create mock function, render button, click it, verify onClick was called
  });

  it('applies primary variant class by default', () => {
    // TODO: Render button and verify it has 'btn-primary' class
  });

  it('applies correct variant class', () => {
    // TODO: Test secondary and danger variants
  });

  it('does not call onClick when disabled', async () => {
    // TODO: Render disabled button, try to click it, verify onClick not called
  });

  it('has disabled attribute when disabled prop is true', () => {
    // TODO: Render disabled button and verify it's disabled
  });
});

