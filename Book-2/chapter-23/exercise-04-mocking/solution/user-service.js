// UserService with database dependency

export class UserService {
  constructor(database) {
    this.database = database
  }

  async getUser(id) {
    const user = await this.database.find(id)
    logActivity(id, 'get')
    return user
  }

  async createUser(userData) {
    const user = await this.database.create(userData)
    await sendEmail(userData.email, 'Welcome!', 'Welcome to our service')
    logActivity(user.id, 'create')
    return user
  }

  async updateUser(id, userData) {
    const user = await this.database.update(id, userData)
    logActivity(id, 'update')
    return user
  }

  async deleteUser(id) {
    await this.database.delete(id)
    logActivity(id, 'delete')
    return { success: true }
  }
}

export function sendEmail(to, subject, body) {
  console.log(`Sending email to ${to}: ${subject}`)
  // In real app: call email API
}

export function logActivity(userId, action) {
  console.log(`User ${userId} performed ${action}`)
  // In real app: save to logs
}
