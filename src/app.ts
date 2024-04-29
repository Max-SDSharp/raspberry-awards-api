import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'

import awardsRoutes from './routes/awards.routes'
import { initializeDatabase } from './services/sqlite.service'

const app = express()

app.use(helmet())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use(cors())

initializeDatabase()

app.use('/awards', awardsRoutes)

export default app
