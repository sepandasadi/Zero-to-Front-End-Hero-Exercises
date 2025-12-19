import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  try {
    // TODO: Implement JWT authentication
    // 1. Get token from Authorization header
    // 2. Verify token
    // 3. Add user to req.user
    // 4. Call next()

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    // TODO: Verify token and get user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const requireAdmin = (req, res, next) => {
  // TODO: Check if user is admin
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

