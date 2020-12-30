const { validationResult } = require('express-validator')
const chalk = require('chalk')

// Model
const Task = require('../models/Task')

const createTask = async (req, res) => {
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

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })

    if (!tasks) {
      return res
        .status(204)
        .json({ msg: 'Have No Task.' })
    }

    res.json(tasks)
  } catch (error) {
    console.log(chalk.red(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res
        .status(400)
        .json({ msg: 'Task Not Found.' })
    }

    res.json(task)
  } catch (error) {
    console.log(chalk.red(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Task Not Found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    // Check user
    if (task.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized.' })
    }

    await task.remove()
    res.json({ msg: 'Task Deleted.' })
  } catch (error) {
    console.log(chalk.red(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Task Not Found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

const updateTask = async (req, res) => {
  const { title, content, priority, isFinished, notes } = req.body

  try {
    const updatedTask = new Task({
      _id: req.params.id,
      title, content, priority, isFinished, notes,
      user: req.user.id
    })

    await Task.findByIdAndUpdate(req.params.id, updatedTask)
    res.json(updatedTask)
  } catch (error) {
    console.log(chalk.red(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Task Not Found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask
}