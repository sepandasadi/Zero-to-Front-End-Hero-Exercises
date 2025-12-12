import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/Counter';

describe('Counter Component', () => {
  it('renders with initial count', () => {
    // TODO: Render counter with initialCount=5, verify it displays 5
  });

  it('increments count when increment button clicked', async () => {
    // TODO: Render counter, click increment, verify count increased
  });

  it('decrements count when decrement button clicked', async () => {
    // TODO: Render counter, click decrement, verify count decreased
  });

  it('resets to initial value when reset button clicked', async () => {
    // TODO: Render counter, increment a few times, reset, verify back to initial
  });

  it('disables decrement button at minimum', () => {
    // TODO: Render counter with min=0 and initialCount=0, verify decrement disabled
  });

  it('disables increment button at maximum', () => {
    // TODO: Render counter with max=10 and initialCount=10, verify increment disabled
  });

  it('shows minimum reached message', () => {
    // TODO: Render counter at min value, verify "Minimum reached!" appears
  });

  it('shows maximum reached message', () => {
    // TODO: Render counter at max value, verify "Maximum reached!" appears
  });

  it('displays correct status (zero, positive, negative)', () => {
    // TODO: Test that status displays correctly for different count values
  });
});

