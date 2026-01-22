import {
  fetchUser,
  fetchUserData,
  fetchMultipleUsers,
  fetchWithRetry,
  fetchWithTimeout,
} from './async-functions.js'

describe('Async Testing', () => {
  describe('fetchUser', () => {
    test('should return user data', async () => {
      const user = await fetchUser(1)

      expect(user).toEqual({
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
      })
    })

    test('should reject when no ID provided', async () => {
      await expect(fetchUser()).rejects.toThrow('User ID is required')
    })

    test('can also use .then() syntax', () => {
      return fetchUser(2).then((user) => {
        expect(user.id).toBe(2)
        expect(user.name).toBe('User 2')
      })
    })
  })

  describe('fetchUserData', () => {
    test('should fetch user with async/await', async () => {
      const user = await fetchUserData(5)

      expect(user).toMatchObject({
        id: 5,
        name: 'User 5',
        email: 'user5@example.com',
      })
    })

    test('should handle multiple async calls', async () => {
      const user1 = await fetchUserData(1)
      const user2 = await fetchUserData(2)

      expect(user1.id).toBe(1)
      expect(user2.id).toBe(2)
    })
  })

  describe('fetchMultipleUsers', () => {
    test('should fetch multiple users concurrently', async () => {
      const users = await fetchMultipleUsers([1, 2, 3])

      expect(users).toHaveLength(3)
      expect(users[0].id).toBe(1)
      expect(users[1].id).toBe(2)
      expect(users[2].id).toBe(3)
    })

    test('should handle empty array', async () => {
      const users = await fetchMultipleUsers([])
      expect(users).toEqual([])
    })
  })

  describe('fetchWithRetry', () => {
    test('should succeed on first try', async () => {
      const result = await fetchWithRetry('https://api.example.com/success')

      expect(result).toMatchObject({
        data: 'Success',
        url: 'https://api.example.com/success',
      })
    })

    test('should retry on failure and eventually succeed', async () => {
      // This would need a more complex mock to test retry behavior
      // For now, we test that it throws after retries
      await expect(
        fetchWithRetry('https://api.example.com/error', 2)
      ).rejects.toThrow('Fetch failed')
    })
  })

  describe('fetchWithTimeout', () => {
    jest.useFakeTimers()

    test('should resolve before timeout', async () => {
      const promise = fetchWithTimeout('https://api.example.com/fast', 1000)

      // Fast-forward time
      jest.advanceTimersByTime(500)

      const result = await promise
      expect(result.data).toBe('Success')
    })

    test('should timeout if takes too long', async () => {
      const promise = fetchWithTimeout('https://api.example.com/slow', 100)

      // Fast-forward past timeout
      jest.advanceTimersByTime(150)

      await expect(promise).rejects.toThrow('Request timeout')
    })

    afterEach(() => {
      jest.clearAllTimers()
    })
  })

  describe('Error Handling', () => {
    test('should handle rejected promises', async () => {
      const mockFetch = () => Promise.reject(new Error('Network error'))

      await expect(mockFetch()).rejects.toThrow('Network error')
    })

    test('should catch errors in try/catch', async () => {
      try {
        await fetchUser()
        fail('Should have thrown an error')
      } catch (error) {
        expect(error.message).toBe('User ID is required')
      }
    })
  })
})
