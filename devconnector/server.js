const express = require('express')
const chalk = require('chalk')

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, error => {
  if (error) {
    console.log(chalk.bgRed('Server cannot run!'))
  }
  console.log(chalk.bgGreen(`Listening on port ${PORT}...`))
})