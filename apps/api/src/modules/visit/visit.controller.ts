import { NextFunction, Request, Response } from 'express'
import { listVisits } from './visit.service.js'

export const getAllVisits = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const visits = await listVisits()
    return res.status(200).json(visits)
  } catch (error) {
    next(error)
  }
}
