import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Hello World',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
}

export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required',
    placeholder: 'Enter email...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
}

