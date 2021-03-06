const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log(chalk.bgGreen('MongoDB Connected...'))
  } catch (error) {
    console.log(
      chalk.redBright('Server have problem !'),
      error.message
    )
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB