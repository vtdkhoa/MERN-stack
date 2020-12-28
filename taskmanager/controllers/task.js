const { validationResult } = require('express-validator')
const chalk = require('chalk')

// Model
const Task = require('../models/Task')

const create = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { title, content, priority, isFinished, notes } = req.body

  try {
    const newTask = new Task({
      title, content, priority, notes, isFinished,
      user: req.user.id
    })
    const task = await newTask.save()
    res.json(task)
  } catch (error) {
    console.log(chalk.red(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = { create }