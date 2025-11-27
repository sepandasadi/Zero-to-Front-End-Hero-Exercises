/* Vitest/RTL example solutions (trim or adapt as needed). */
/*
// isEmail
import { describe, it, expect } from 'vitest'
import { isEmail, fetchItems } from './chapter13-exercises'

describe('isEmail', () => {
  it('accepts a valid email', () => {
    expect(isEmail('a@b.co')).toBe(true)
  })
  it('rejects invalid email', () => {
    expect(isEmail('bad..email')).toBe(false)
  })
})

describe('fetchItems', () => {
  it('resolves JSON on 200', async () => {
    const fake = async () => ({ ok: true, json: async () => [1,2,3] })
    await expect(fetchItems(fake)).resolves.toEqual([1,2,3])
  })
  it('throws on non-2xx', async () => {
    const fake = async () => ({ ok: false, status: 500 })
    await expect(fetchItems(fake)).rejects.toThrow(/HTTP 500/)
  })
})
*/
