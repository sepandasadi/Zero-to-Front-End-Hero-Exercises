// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/components/Button'
import '../src/styles/index.css'

const meta: Meta<typeof Button> = { title: 'Primitives/Button', component: Button }
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Primary', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } }
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } }
export const Sizes: Story = { render: () => (<div style={{display:'flex',gap:8}}>
  <Button size='sm'>Small</Button>
  <Button size='md'>Medium</Button>
  <Button size='lg'>Large</Button>
</div>) }
