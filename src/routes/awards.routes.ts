import express, { Router } from 'express'

import getExtremeIntervals from '../controllers/awards.controller'

const router: Router = express.Router()

router.get('/intervals', getExtremeIntervals)

export default router
