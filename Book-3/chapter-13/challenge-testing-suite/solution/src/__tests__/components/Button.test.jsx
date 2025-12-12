import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click</Button>);

    await user.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick} disabled>Click</Button>);

    await user.click(screen.getByText('Click'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies primary variant class', () => {
    render(<Button variant="primary">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--primary');
  });

  it('applies secondary variant class', () => {
    render(<Button variant="secondary">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--secondary');
  });

  it('applies danger variant class', () => {
    render(<Button variant="danger">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--danger');
  });

  it('applies small size class', () => {
    render(<Button size="small">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--small');
  });

  it('applies medium size class by default', () => {
    render(<Button>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--medium');
  });

  it('applies large size class', () => {
    render(<Button size="large">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('button--large');
  });

  it('has button type by default', () => {
    render(<Button>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('accepts custom type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('custom-class');
  });

  it('spreads additional props', () => {
    render(<Button data-testid="test-button" aria-label="Test">Button</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test');
  });

  it('shows disabled state', () => {
    render(<Button disabled>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toBeDisabled();
  });
});

