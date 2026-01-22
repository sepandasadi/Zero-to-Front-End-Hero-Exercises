import { UserService, sendEmail, logActivity } from './user-service.js'

describe('Mocking & Spies', () => {
  describe('UserService', () => {
    test('should get user from database', async () => {
      // TODO: Create mock database
      // TODO: Test getUser()
    })

    test('should create user', async () => {
      // TODO: Mock database.create()
      // TODO: Verify it was called with correct data
    })
  })

  describe('Mock functions', () => {
    test('should create mock with jest.fn()', () => {
      // TODO: Create mock function
      // TODO: Test that it was called
    })

    test('should mock return values', () => {
      // TODO: Mock function with return value
    })
  })

  describe('Spying', () => {
    test('should spy on object methods', () => {
      // TODO: Create spy with jest.spyOn()
    })
  })
})
