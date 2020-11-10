const express = require('express')
const chalk = require('chalk')

const connectDB = require('./config/db')

const app = express()

// Connect Database
connectDB()

app.get('/', (req, res) => {
  res.send('API Server, start!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, error => {
  if (error) {
    console.log(chalk.bgRed('Server cannot run!'))
  }
  console.log(chalk.bgGreen(`Listening on port ${PORT}...`))
})