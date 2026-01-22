import { Calculator } from './calculator.js'

describe('Calculator (TDD)', () => {
  let calc

  beforeEach(() => {
    calc = new Calculator()
  })

  describe('add()', () => {
    test('should add two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5)
    })

    test('should add negative numbers', () => {
      expect(calc.add(-5, -3)).toBe(-8)
      expect(calc.add(-5, 3)).toBe(-2)
    })

    test('should add zero', () => {
      expect(calc.add(5, 0)).toBe(5)
      expect(calc.add(0, 0)).toBe(0)
    })

    test('should add decimals', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3)
    })
  })

  describe('subtract()', () => {
    test('should subtract two numbers', () => {
      expect(calc.subtract(5, 3)).toBe(2)
    })

    test('should handle negative results', () => {
      expect(calc.subtract(3, 5)).toBe(-2)
    })

    test('should subtract zero', () => {
      expect(calc.subtract(5, 0)).toBe(5)
    })

    test('should subtract from zero', () => {
      expect(calc.subtract(0, 5)).toBe(-5)
    })
  })

  describe('multiply()', () => {
    test('should multiply two positive numbers', () => {
      expect(calc.multiply(3, 4)).toBe(12)
    })

    test('should handle zero', () => {
      expect(calc.multiply(5, 0)).toBe(0)
      expect(calc.multiply(0, 5)).toBe(0)
    })

    test('should handle negative numbers', () => {
      expect(calc.multiply(-3, 4)).toBe(-12)
      expect(calc.multiply(-3, -4)).toBe(12)
    })

    test('should multiply decimals', () => {
      expect(calc.multiply(0.5, 0.5)).toBeCloseTo(0.25)
    })
  })

  describe('divide()', () => {
    test('should divide two numbers', () => {
      expect(calc.divide(10, 2)).toBe(5)
    })

    test('should handle decimals', () => {
      expect(calc.divide(1, 3)).toBeCloseTo(0.333, 2)
    })

    test('should throw error on division by zero', () => {
      expect(() => calc.divide(5, 0)).toThrow('Division by zero')
    })

    test('should handle negative numbers', () => {
      expect(calc.divide(-10, 2)).toBe(-5)
      expect(calc.divide(10, -2)).toBe(-5)
      expect(calc.divide(-10, -2)).toBe(5)
    })
  })

  describe('power()', () => {
    test('should calculate power', () => {
      expect(calc.power(2, 3)).toBe(8)
      expect(calc.power(5, 2)).toBe(25)
    })

    test('should handle zero exponent', () => {
      expect(calc.power(5, 0)).toBe(1)
    })

    test('should handle negative exponents', () => {
      expect(calc.power(2, -2)).toBeCloseTo(0.25)
    })
  })

  describe('sqrt()', () => {
    test('should calculate square root', () => {
      expect(calc.sqrt(4)).toBe(2)
      expect(calc.sqrt(9)).toBe(3)
    })

    test('should handle zero', () => {
      expect(calc.sqrt(0)).toBe(0)
    })

    test('should throw error for negative numbers', () => {
      expect(() => calc.sqrt(-4)).toThrow(
        'Cannot calculate square root of negative number'
      )
    })
  })
})
