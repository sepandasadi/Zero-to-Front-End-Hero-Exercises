// UserService to test with mocks

export class UserService {
  constructor(database) {
    this.database = database
  }

  async getUser(id) {
    // TODO: Fetch user from database
    return this.database.find(id)
  }

  async createUser(userData) {
    // TODO: Create user in database
    return this.database.create(userData)
  }

  async updateUser(id, userData) {
    // TODO: Update user in database
    return this.database.update(id, userData)
  }

  async deleteUser(id) {
    // TODO: Delete user from database
    return this.database.delete(id)
  }
}

export function sendEmail(to, subject, body) {
  // TODO: Send email (to be mocked)
  console.log(`Sending email to ${to}`)
}

export function logActivity(userId, action) {
  // TODO: Log activity (to be mocked)
  console.log(`User ${userId} performed ${action}`)
}
