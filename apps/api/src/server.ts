import express, { type Express, } from 'express'
import { authMiddleware, errorMiddleware } from './middleware/index.js'
import { privateRouter, publicRouter } from './routes/index.js'

const app: Express = express()

app.use(express.json())

app.use('/api/v1', publicRouter)
app.use('/api/v1', authMiddleware, privateRouter)

app.use(errorMiddleware)


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    timestamp: new Date().toISOString(),
    message: 'Welcome to the Traxd API',
  })
})


export default app