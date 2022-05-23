import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import { connectDB } from './utils/dbConfig.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'

import userRoutes from './routes/userRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

// import routes

// configure the dot env
dotenv.config()

// create the express app
const app = express()

// database connection
connectDB()

// middlewares
app.use(express.json())

// base route to make sure the backend is running
// app.get('/', (req, res) => {
//   res.send('Backend is running...')
// })

// route middlewares
app.use('/api/users', userRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/reports', reportRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Backend is running...')
  })
}

// custom middlewares
app.use(notFound)
app.use(errorHandler)

// creating port
const port = process.env.PORT || 5000

// launching the server on the port
app.listen(port, () => {
  console.log(`server is running on port ${port}`.cyan.underline)
})
