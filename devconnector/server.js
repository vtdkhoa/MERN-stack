const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const chalk = require('chalk')

const connectDB = require('./config/db')

// Routes
const userRoute = require('./routes/apis/user')
const authRoute = require('./routes/apis/auth')
const profileRoute = require('./routes/apis/profile')
const postRoute = require('./routes/apis/post')

const app = express()

// Connect Database
connectDB()

// Initialize Middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(mongoSanitize())
app.use(xss())

app.get('/', (req, res) => {
  res.send('API Server, start!')
})

// Define Routes
app.use('/api/user', userRoute)
app.use('/api/user/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/post', postRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, error => {
  if (error) {
    console.log(chalk.bgRed('Server cannot run!'))
  }
  console.log(chalk.bgGreen(`Listening on port ${PORT}...`))
})