import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'
import { AppError } from '../errors/index.js'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string)

export interface AuthRequest extends Request {
  user?: { userId: string; email: string }
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401))
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return next(new AppError('Unauthorized', 401))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    req.user = { userId: payload.userId as string, email: payload.email as string }
    next()
  } catch (error) {
    return next(new AppError('Unauthorized', 401))
  }
}
