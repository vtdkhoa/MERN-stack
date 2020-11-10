const express = require('express')
const chalk = require('chalk')

const connectDB = require('./config/db')

// Routes
const userRoute = require('./routes/apis/user')

const app = express()

// Connect Database
connectDB()

// Initialize Middleware
app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
  res.send('API Server, start!')
})

// Define Routes
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, error => {
  if (error) {
    console.log(chalk.bgRed('Server cannot run!'))
  }
  console.log(chalk.bgGreen(`Listening on port ${PORT}...`))
})