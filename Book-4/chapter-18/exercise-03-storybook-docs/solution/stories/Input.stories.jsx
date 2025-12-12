import React from 'react';
import Input from '../../exercise-02-component-library/Input';
import '../../exercise-02-component-library/Input.css';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
      description: 'The visual style variant of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The HTML input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when isInvalid is true)',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Choose a unique username',
  },
};

export const Required = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    isRequired: true,
  },
};

export const WithError = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    isInvalid: true,
    errorMessage: 'Password must be at least 8 characters',
    isRequired: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    isDisabled: true,
    value: 'Disabled value',
  },
};

export const OutlineVariant = {
  args: {
    variant: 'outline',
    label: 'Outline Input',
    placeholder: 'Outline style',
  },
};

export const FilledVariant = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'Filled style',
  },
};

export const FlushedVariant = {
  args: {
    variant: 'flushed',
    label: 'Flushed Input',
    placeholder: 'Flushed style',
  },
};

export const SmallSize = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const MediumSize = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size',
  },
};

export const LargeSize = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

// Story showing all variants
export const AllVariants = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <Input variant="outline" label="Outline" placeholder="Outline variant" />
    <Input variant="filled" label="Filled" placeholder="Filled variant" />
    <Input variant="flushed" label="Flushed" placeholder="Flushed variant" />
  </div>
);

// Story showing all sizes
export const AllSizes = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <Input size="sm" label="Small" placeholder="Small size" />
    <Input size="md" label="Medium" placeholder="Medium size" />
    <Input size="lg" label="Large" placeholder="Large size" />
  </div>
);

// Story showing different input types
export const InputTypes = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <Input type="text" label="Text" placeholder="Enter text" />
    <Input type="email" label="Email" placeholder="you@example.com" />
    <Input type="password" label="Password" placeholder="••••••••" />
    <Input type="number" label="Number" placeholder="123" />
    <Input type="tel" label="Phone" placeholder="(555) 123-4567" />
    <Input type="url" label="Website" placeholder="https://example.com" />
  </div>
);

// Story showing form example
export const FormExample = () => (
  <form style={{ display: 'grid', gap: '1.5rem' }}>
    <Input
      label="Full Name"
      placeholder="John Doe"
      isRequired
    />
    <Input
      type="email"
      label="Email Address"
      placeholder="you@example.com"
      helperText="We'll never share your email with anyone else."
      isRequired
    />
    <Input
      type="password"
      label="Password"
      placeholder="••••••••"
      helperText="Must be at least 8 characters"
      isRequired
    />
    <Input
      type="password"
      label="Confirm Password"
      placeholder="••••••••"
      isInvalid
      errorMessage="Passwords do not match"
      isRequired
    />
  </form>
);

