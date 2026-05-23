import express, { type Express } from 'express'

const app: Express = express()

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    timestamp: new Date().toISOString(),
    message: 'Welcome to the Traxd API',
  })
})


export default app