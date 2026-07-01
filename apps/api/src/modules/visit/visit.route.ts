import { Router } from 'express'
import { getAllVisits } from './visit.controller.js'

const router: Router = Router()

router.get('/', getAllVisits)

export default router