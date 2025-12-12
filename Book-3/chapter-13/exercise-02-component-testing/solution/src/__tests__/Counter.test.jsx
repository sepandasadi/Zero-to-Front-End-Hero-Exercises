import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/Counter';

describe('Counter Component', () => {
  it('renders with initial count of 0 by default', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with custom initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('increments count when increment button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements count when decrement button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('resets to initial value when reset button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    // Increment a few times
    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('3')).toBeInTheDocument();

    // Reset
    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('disables decrement button at minimum', () => {
    render(<Counter initialCount={0} min={0} />);
    expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled();
  });

  it('enables decrement button above minimum', () => {
    render(<Counter initialCount={5} min={0} />);
    expect(screen.getByRole('button', { name: /decrement/i })).not.toBeDisabled();
  });

  it('disables increment button at maximum', () => {
    render(<Counter initialCount={10} max={10} />);
    expect(screen.getByRole('button', { name: /increment/i })).toBeDisabled();
  });

  it('enables increment button below maximum', () => {
    render(<Counter initialCount={5} max={10} />);
    expect(screen.getByRole('button', { name: /increment/i })).not.toBeDisabled();
  });

  it('shows minimum reached message at minimum', () => {
    render(<Counter initialCount={0} min={0} />);
    expect(screen.getByText(/minimum reached/i)).toBeInTheDocument();
  });

  it('shows maximum reached message at maximum', () => {
    render(<Counter initialCount={10} max={10} />);
    expect(screen.getByText(/maximum reached/i)).toBeInTheDocument();
  });

  it('does not show minimum message above minimum', () => {
    render(<Counter initialCount={5} min={0} />);
    expect(screen.queryByText(/minimum reached/i)).not.toBeInTheDocument();
  });

  it('does not show maximum message below maximum', () => {
    render(<Counter initialCount={5} max={10} />);
    expect(screen.queryByText(/maximum reached/i)).not.toBeInTheDocument();
  });

  it('displays zero status when count is 0', () => {
    render(<Counter initialCount={0} />);
    expect(screen.getByText(/zero/i)).toBeInTheDocument();
  });

  it('displays positive status when count is positive', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText(/positive/i)).toBeInTheDocument();
  });

  it('displays negative status when count is negative', () => {
    render(<Counter initialCount={-5} />);
    expect(screen.getByText(/negative/i)).toBeInTheDocument();
  });

  it('updates status when count changes', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    expect(screen.getByText(/zero/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText(/positive/i)).toBeInTheDocument();
    expect(screen.queryByText(/zero/i)).not.toBeInTheDocument();
  });

  it('does not go below minimum', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} min={0} />);

    const decrementBtn = screen.getByRole('button', { name: /decrement/i });

    // Try to decrement (should not work)
    await user.click(decrementBtn);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('does not go above maximum', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={10} max={10} />);

    const incrementBtn = screen.getByRole('button', { name: /increment/i });

    // Try to increment (should not work)
    await user.click(incrementBtn);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('reset button always works regardless of min/max', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} min={0} max={10} />);

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    expect(resetBtn).not.toBeDisabled();

    await user.click(resetBtn);

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

