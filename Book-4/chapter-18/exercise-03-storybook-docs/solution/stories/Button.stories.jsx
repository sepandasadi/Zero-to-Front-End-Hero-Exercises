import React from 'react';
import Button from '../../exercise-02-component-library/Button';
import '../../exercise-02-component-library/Button.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side',
    },
    onClick: { action: 'clicked' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

export const Disabled = {
  args: {
    isDisabled: true,
    children: 'Disabled',
  },
};

const Icon = () => <span>🚀</span>;

export const WithLeftIcon = {
  args: {
    leftIcon: <Icon />,
    children: 'Launch',
  },
};

export const WithRightIcon = {
  args: {
    rightIcon: <Icon />,
    children: 'Next',
  },
};

export const WithBothIcons = {
  args: {
    leftIcon: <span>👈</span>,
    rightIcon: <span>👉</span>,
    children: 'Both Sides',
  },
};

// Story showing all variants together
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
  </div>
);

// Story showing all sizes together
export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

// Story showing all states
export const AllStates = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button>Normal</Button>
    <Button isLoading>Loading</Button>
    <Button isDisabled>Disabled</Button>
  </div>
);

