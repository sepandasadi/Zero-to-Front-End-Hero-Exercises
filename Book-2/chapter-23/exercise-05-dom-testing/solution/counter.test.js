import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { createCounter } from './counter.js'

describe('DOM Testing', () => {
  let container
  let user

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    user = userEvent.setup()
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test('should render counter with initial value', () => {
    createCounter(container)

    expect(screen.getByRole('heading', { name: /counter/i })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0')
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  test('should increment count when + button clicked', async () => {
    createCounter(container)

    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    const count = screen.getByRole('status')

    await user.click(incrementBtn)
    expect(count).toHaveTextContent('1')

    await user.click(incrementBtn)
    expect(count).toHaveTextContent('2')
  })

  test('should decrement count when - button clicked', async () => {
    createCounter(container)

    const decrementBtn = screen.getByRole('button', { name: /decrement/i })
    const count = screen.getByRole('status')

    await user.click(decrementBtn)
    expect(count).toHaveTextContent('-1')

    await user.click(decrementBtn)
    expect(count).toHaveTextContent('-2')
  })

  test('should reset count to 0 when reset clicked', async () => {
    createCounter(container)

    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    const resetBtn = screen.getByRole('button', { name: /reset/i })
    const count = screen.getByRole('status')

    await user.click(incrementBtn)
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    expect(count).toHaveTextContent('3')

    await user.click(resetBtn)
    expect(count).toHaveTextContent('0')
  })

  test('should handle multiple operations', async () => {
    createCounter(container)

    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    const decrementBtn = screen.getByRole('button', { name: /decrement/i })
    const count = screen.getByRole('status')

    await user.click(incrementBtn)
    await user.click(incrementBtn)
    await user.click(decrementBtn)

    expect(count).toHaveTextContent('1')
  })

  test('should be accessible', () => {
    createCounter(container)

    const count = screen.getByRole('status')
    expect(count).toHaveAttribute('aria-live', 'polite')

    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    expect(incrementBtn).toHaveAccessibleName('Increment count')
  })
})
