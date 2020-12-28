const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const chalk = require('chalk')

// Model
const User = require('../models/User')
const Task = require('../models/Task')

const register = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { name, username, password } = req.body

  try {
    let user = await User.findOne({ username })

    // If user exists
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists.' }] })
    }

    const avatar = gravatar.url(username, {
      size: 200,
      rating: 'pg',
      default: 'mm'
    })

    user = new User({ name, username, avatar, password })

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    // Decoded from auth middleware
    const payload = {
      user: { id: user._id }
    }

    // Assign token to header
    jwt.sign(
      payload,
      config.get('jwtToken'),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(chalk.red(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deleteAccount = async (req, res) => {
  try {
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id })
    // Remove Task
    await Task.findOneAndRemove({ user: req.user.id })

    res.json({ msg: 'Account Deleted.' })
  } catch (error) {
    console.log(chalk.red(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = { register, deleteAccount }