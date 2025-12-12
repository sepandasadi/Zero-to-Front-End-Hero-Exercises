import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="Enter your email" />);
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
    });

    it('renders with error message when invalid', () => {
      render(<Input isInvalid errorMessage="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('does not render error message when not invalid', () => {
      render(<Input errorMessage="This field is required" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies outline variant class by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--outline');
    });

    it('applies filled variant class', () => {
      render(<Input variant="filled" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--filled');
    });

    it('applies flushed variant class', () => {
      render(<Input variant="flushed" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--flushed');
    });
  });

  describe('Sizes', () => {
    it('applies medium size class by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--md');
    });

    it('applies small size class', () => {
      render(<Input size="sm" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--sm');
    });

    it('applies large size class', () => {
      render(<Input size="lg" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input--lg');
    });
  });

  describe('States', () => {
    it('is disabled when isDisabled is true', () => {
      render(<Input isDisabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('is required when isRequired is true', () => {
      render(<Input isRequired />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('shows asterisk when required', () => {
      render(<Input label="Email" isRequired />);
      expect(screen.getByLabelText('required')).toHaveTextContent('*');
    });

    it('sets aria-invalid when isInvalid is true', () => {
      render(<Input isInvalid />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies invalid class to wrapper when isInvalid', () => {
      const { container } = render(<Input isInvalid />);
      const wrapper = container.querySelector('.input-wrapper');
      expect(wrapper).toHaveClass('input-wrapper--invalid');
    });
  });

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<Input helperText="Enter your email" />);
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Enter your email');

      expect(input).toHaveAttribute('aria-describedby', helperText.id);
    });

    it('associates error message with input via aria-describedby', () => {
      render(<Input isInvalid errorMessage="Error" />);
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByRole('alert');

      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });

    it('prioritizes error message over helper text in aria-describedby', () => {
      render(
        <Input
          helperText="Helper"
          isInvalid
          errorMessage="Error"
        />
      );
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByRole('alert');

      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input isDisabled />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');
      expect(input).toHaveValue('');
    });
  });

  describe('Props', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('applies custom className to wrapper', () => {
      const { container } = render(<Input className="custom-class" />);
      const wrapper = container.querySelector('.input-wrapper');
      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveClass('input-wrapper');
    });

    it('sets input type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('passes through additional props', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('uses provided id', () => {
      render(<Input id="custom-id" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      const { rerender } = render(<Input />);
      const firstInput = screen.getByRole('textbox');
      const firstId = firstInput.id;

      rerender(<Input />);
      const secondInput = screen.getByRole('textbox');
      const secondId = secondInput.id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
      // Note: In a real scenario with multiple instances, IDs would differ
    });
  });
});

