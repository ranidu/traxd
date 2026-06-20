import { CreateUserPayload } from '@traxd/types'
import type { NextFunction, Request, Response } from 'express'
import { type AuthRequest } from '../../middleware/index.js'
import { getUserById, loginUser, registerUser } from './user.service.js'

export const register = async (
  req: Request<any, any, CreateUserPayload>,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body
  try {
    const user = await registerUser({ name, email, password })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const { existingUser, token } = await loginUser(email, password)
    res.status(200).json({ user: existingUser, token })
  } catch (error) {
    next(error)
  }
}    

export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId
  if (!userId) {
    return next(new Error('User ID not found in request'))
  }

  try {
    const user = await getUserById(userId)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}