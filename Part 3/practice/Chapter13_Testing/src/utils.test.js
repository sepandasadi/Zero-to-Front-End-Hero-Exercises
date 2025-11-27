import { describe, it, expect } from 'vitest'
import { formatPrice, clamp, slugify } from './utils'

describe('formatPrice', () => {
  it('formats cents as dollars', () => {
    expect(formatPrice(12345)).toBe('$123.45')
  })
  it('throws on invalid input', () => {
    expect(() => formatPrice('nope')).toThrow()
  })
})

describe('clamp', () => {
  it('clamps inside range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
  it('clamps low', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })
  it('clamps high', () => {
    expect(clamp(50, 0, 10)).toBe(10)
  })
})

describe('slugify', () => {
  it('makes a simple slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
  })
})
