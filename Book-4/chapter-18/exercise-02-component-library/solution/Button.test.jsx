import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as a button element by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Variants', () => {
    it('applies primary variant class by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--primary');
    });

    it('applies secondary variant class', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--secondary');
    });

    it('applies outline variant class', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--outline');
    });

    it('applies ghost variant class', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--ghost');
    });

    it('applies danger variant class', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--danger');
    });
  });

  describe('Sizes', () => {
    it('applies medium size class by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--md');
    });

    it('applies small size class', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--sm');
    });

    it('applies large size class', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--lg');
    });
  });

  describe('Icons', () => {
    const TestIcon = () => <svg data-testid="test-icon">Icon</svg>;

    it('renders left icon', () => {
      render(<Button leftIcon={<TestIcon />}>With Icon</Button>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Button rightIcon={<TestIcon />}>With Icon</Button>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders both left and right icons', () => {
      render(
        <Button
          leftIcon={<TestIcon />}
          rightIcon={<TestIcon />}
        >
          With Icons
        </Button>
      );
      const icons = screen.getAllByTestId('test-icon');
      expect(icons).toHaveLength(2);
    });

    it('hides icons when loading', () => {
      render(
        <Button
          leftIcon={<TestIcon />}
          rightIcon={<TestIcon />}
          isLoading
        >
          Loading
        </Button>
      );
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('applies loading class when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--loading');
    });

    it('is disabled when isDisabled is true', () => {
      render(<Button isDisabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('sets aria-busy when loading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} isDisabled>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} isLoading>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Props', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('btn');
    });

    it('sets button type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('passes through additional props', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });
});

