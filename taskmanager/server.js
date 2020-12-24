const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const chalk = require('chalk')

const connectDB = require('./config/db')

const app = express()
// Connect Database
connectDB()

// Initialize Middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(mongoSanitize())
app.use(xss())

// Test Server
app.get('/', (req, res) => {
  res.send('API Server, start !')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, error => {
  if (error) {
    console.log(chalk.bgRed('Server cannot run!'))
  }
  console.log(chalk.bgBlue(`Listening on port ${PORT}...`))
})