import { loginSchema, registerSchema } from '@traxd/types/validation'
import { Router } from 'express'
import { validate } from '../../middleware/index.js'
import { login, me, register } from './user.controller.js'

const router: Router = Router()

router.get('/me', me)

export default router

const userPublicRouter: Router = Router()
userPublicRouter.post('/register', validate(registerSchema), register)
userPublicRouter.post('/login', validate(loginSchema), login)

export { userPublicRouter }
