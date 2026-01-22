import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { createCounter } from './counter.js'

describe('DOM Testing', () => {
  let container

  beforeEach(() => {
    // TODO: Set up DOM container
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // TODO: Clean up
    document.body.removeChild(container)
  })

  test('should render counter', () => {
    // TODO: Create counter and test rendering
  })

  test('should increment count', async () => {
    // TODO: Test increment button
  })

  test('should decrement count', async () => {
    // TODO: Test decrement button
  })

  test('should reset count', async () => {
    // TODO: Test reset button
  })
})
