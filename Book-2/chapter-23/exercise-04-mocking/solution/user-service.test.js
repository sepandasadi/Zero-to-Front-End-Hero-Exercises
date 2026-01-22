import { UserService, sendEmail, logActivity } from './user-service.js'

// Mock the utility functions
jest.mock('./user-service.js', () => {
  const actual = jest.requireActual('./user-service.js')
  return {
    ...actual,
    sendEmail: jest.fn(),
    logActivity: jest.fn(),
  }
})

describe('Mocking & Spies', () => {
  let mockDatabase
  let userService

  beforeEach(() => {
    // Create mock database with all methods
    mockDatabase = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }

    userService = new UserService(mockDatabase)

    // Clear mock history
    jest.clearAllMocks()
  })

  describe('UserService', () => {
    test('should get user from database', async () => {
      const mockUser = { id: 1, name: 'John' }
      mockDatabase.find.mockResolvedValue(mockUser)

      const user = await userService.getUser(1)

      expect(user).toEqual(mockUser)
      expect(mockDatabase.find).toHaveBeenCalledWith(1)
      expect(mockDatabase.find).toHaveBeenCalledTimes(1)
    })

    test('should create user and send email', async () => {
      const userData = { name: 'Jane', email: 'jane@example.com' }
      const createdUser = { id: 2, ...userData }

      mockDatabase.create.mockResolvedValue(createdUser)

      const user = await userService.createUser(userData)

      expect(user).toEqual(createdUser)
      expect(mockDatabase.create).toHaveBeenCalledWith(userData)
      expect(sendEmail).toHaveBeenCalledWith(
        userData.email,
        'Welcome!',
        'Welcome to our service'
      )
    })

    test('should update user', async () => {
      const updatedData = { name: 'John Updated' }
      const updatedUser = { id: 1, ...updatedData }

      mockDatabase.update.mockResolvedValue(updatedUser)

      const user = await userService.updateUser(1, updatedData)

      expect(user).toEqual(updatedUser)
      expect(mockDatabase.update).toHaveBeenCalledWith(1, updatedData)
    })

    test('should delete user', async () => {
      mockDatabase.delete.mockResolvedValue()

      const result = await userService.deleteUser(1)

      expect(result).toEqual({ success: true })
      expect(mockDatabase.delete).toHaveBeenCalledWith(1)
    })
  })

  describe('Mock Functions', () => {
    test('should create mock with jest.fn()', () => {
      const mockFn = jest.fn()

      mockFn('hello')
      mockFn('world')

      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('hello')
      expect(mockFn).toHaveBeenLastCalledWith('world')
    })

    test('should mock return values', () => {
      const mockFn = jest.fn()
      mockFn.mockReturnValue(42)

      expect(mockFn()).toBe(42)
      expect(mockFn()).toBe(42)
    })

    test('should mock different return values', () => {
      const mockFn = jest.fn()
      mockFn
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValue(3)

      expect(mockFn()).toBe(1)
      expect(mockFn()).toBe(2)
      expect(mockFn()).toBe(3)
      expect(mockFn()).toBe(3)
    })

    test('should mock implementation', () => {
      const mockFn = jest.fn((x, y) => x + y)

      expect(mockFn(2, 3)).toBe(5)
      expect(mockFn).toHaveBeenCalledWith(2, 3)
    })

    test('should mock resolved values', async () => {
      const mockFn = jest.fn()
      mockFn.mockResolvedValue('success')

      const result = await mockFn()
      expect(result).toBe('success')
    })

    test('should mock rejected values', async () => {
      const mockFn = jest.fn()
      mockFn.mockRejectedValue(new Error('failed'))

      await expect(mockFn()).rejects.toThrow('failed')
    })
  })

  describe('Spying', () => {
    test('should spy on object methods', () => {
      const calculator = {
        add: (a, b) => a + b,
      }

      const spy = jest.spyOn(calculator, 'add')

      calculator.add(2, 3)

      expect(spy).toHaveBeenCalledWith(2, 3)
      expect(spy).toHaveReturnedWith(5)

      spy.mockRestore()
    })

    test('should spy and mock implementation', () => {
      const math = {
        square: (x) => x * x,
      }

      const spy = jest.spyOn(math, 'square')
      spy.mockImplementation((x) => x * 10) // Override

      expect(math.square(5)).toBe(50) // Uses mock
      expect(spy).toHaveBeenCalledWith(5)

      spy.mockRestore()
      expect(math.square(5)).toBe(25) // Uses original
    })

    test('should spy on console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation()

      console.log('test message')

      expect(spy).toHaveBeenCalledWith('test message')

      spy.mockRestore()
    })
  })

  describe('Mock Matchers', () => {
    test('toHaveBeenCalled', () => {
      const mockFn = jest.fn()
      mockFn()
      expect(mockFn).toHaveBeenCalled()
    })

    test('toHaveBeenCalledTimes', () => {
      const mockFn = jest.fn()
      mockFn()
      mockFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    test('toHaveBeenCalledWith', () => {
      const mockFn = jest.fn()
      mockFn('hello', 123)
      expect(mockFn).toHaveBeenCalledWith('hello', 123)
    })

    test('toHaveBeenLastCalledWith', () => {
      const mockFn = jest.fn()
      mockFn('first')
      mockFn('second')
      expect(mockFn).toHaveBeenLastCalledWith('second')
    })

    test('toHaveReturnedWith', () => {
      const mockFn = jest.fn(() => 'result')
      mockFn()
      expect(mockFn).toHaveReturnedWith('result')
    })
  })

  describe('Callback Testing', () => {
    test('should test callback functions', (done) => {
      const mockCallback = jest.fn((result) => {
        expect(result).toBe('success')
        done()
      })

      // Simulate async operation
      setTimeout(() => {
        mockCallback('success')
      }, 100)
    })

    test('should verify callback was called', () => {
      const mockCallback = jest.fn()

      function doSomething(callback) {
        callback('data')
      }

      doSomething(mockCallback)

      expect(mockCallback).toHaveBeenCalledWith('data')
    })
  })
})
