import { Router } from 'express'
import { userRouter } from '../modules/index.js'


const privateRouter: Router = Router()

privateRouter.use('/user', userRouter)

export default privateRouter