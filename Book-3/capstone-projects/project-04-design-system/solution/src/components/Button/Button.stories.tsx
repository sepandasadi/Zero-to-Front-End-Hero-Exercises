import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Primary button for main actions
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

/**
 * Secondary button for less prominent actions
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

/**
 * Outline button for alternative actions
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

/**
 * Ghost button for minimal emphasis
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

/**
 * All button sizes
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}

/**
 * All variants in a row
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
}

/**
 * Interactive example with all states
 */
export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
}

