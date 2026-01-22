import { Calculator } from './calculator.js'

// TDD Workflow: Red → Green → Refactor
// 1. Write a failing test
// 2. Write minimal code to make it pass
// 3. Refactor while keeping tests green

describe('Calculator (TDD)', () => {
  let calc

  beforeEach(() => {
    calc = new Calculator()
  })

  // TODO: Write tests first, then implement!

  describe('add()', () => {
    test('should add two positive numbers', () => {
      // TODO: Write test, watch it fail, then implement
    })

    test('should add negative numbers', () => {
      // TODO
    })

    test('should add zero', () => {
      // TODO
    })
  })

  describe('subtract()', () => {
    // TODO: Write tests
  })

  describe('multiply()', () => {
    // TODO: Write tests
  })

  describe('divide()', () => {
    // TODO: Write tests (don't forget edge cases!)
  })
})
