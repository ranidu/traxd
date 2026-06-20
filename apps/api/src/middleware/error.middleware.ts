import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError.js'

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // known operational error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }

  // unknown system error — do not expose details to FE
  console.error('Unexpected error:', err)
  return res.status(500).json({
    error: 'Internal server error',
  })
}