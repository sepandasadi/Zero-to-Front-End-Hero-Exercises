import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--secondary')
  })

  it('applies correct size class', () => {
    render(<Button size="large">Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--large')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Click</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading spinner when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies fullWidth class when prop is true', () => {
    render(<Button fullWidth>Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--full-width')
  })

  it('supports custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('has correct button type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('is accessible when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('has aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
})

