import { Router } from 'express'
import { userRouter } from '../modules/index.js'
import { visitRouter } from '../modules/visit/index.js'


const privateRouter: Router = Router()

privateRouter.use('/user', userRouter)
privateRouter.use('/visits', visitRouter)

export default privateRouter