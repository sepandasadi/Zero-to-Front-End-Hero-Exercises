import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { generateToken, generateRefreshToken } from '../utils/jwt.js'

const prisma = new PrismaClient()

// Register new user
export const register = async (req, res, next) => {
  try {
    const { email, username, password, name } = req.body

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email
          ? 'Email already registered'
          : 'Username already taken'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true
      }
    })

    // Generate tokens
    const accessToken = generateToken(user)
    const refreshToken = generateRefreshToken(user)

    res.status(201).json({
      user,
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error)
  }
}

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Generate tokens
    const accessToken = generateToken(userWithoutPassword)
    const refreshToken = generateRefreshToken(userWithoutPassword)

    res.json({
      user: userWithoutPassword,
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error)
  }
}

// Refresh access token
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' })
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        role: true
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Generate new access token
    const accessToken = generateToken(user)

    res.json({ accessToken })
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' })
  }
}

// Get current user
export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar } = req.body

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name,
        bio,
        avatar
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        role: true
      }
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}

