import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter', () => {
  it('increments', async () => {
    render(<Counter initial={0} />)
    await user.click(screen.getByRole('button', { name: /increment/i }))
    expect(screen.getByRole('status')).toHaveTextContent('1')
  })
  it('does not go below 0', async () => {
    render(<Counter initial={0} />)
    await user.click(screen.getByRole('button', { name: /decrement/i }))
    expect(screen.getByRole('status')).toHaveTextContent('0')
  })
})
