// stories/Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Dialog } from '../src/components/Dialog'
import { Button } from '../src/components/Button'
import '../src/styles/index.css'

const meta: Meta<typeof Dialog> = { title: 'Primitives/Dialog', component: Dialog }
export default meta
type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (<div>
      <Button onClick={()=>setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={()=>setOpen(false)} labelledBy="d-title">
        <h2 id="d-title">Hello</h2>
        <p>Dialog content here.</p>
      </Dialog>
    </div>)
  }
}
