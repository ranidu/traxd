import { Router } from 'express'
import { userPublicRouter } from '../modules/index.js'

const publicRouter: Router = Router()

publicRouter.use('/public', userPublicRouter)

export default publicRouter