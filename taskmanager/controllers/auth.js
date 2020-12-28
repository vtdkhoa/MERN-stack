const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')

// Model
const User = require('../models/User')

const login = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { username, password } = req.body

  try {
    let user = await User.findOne({ username })

    // If user doesn't exist
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials.' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Crendentials.' }] })
    }

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

    if (error.message) {
      res.status(400).send({ msg: 'Invalid Credentials.' })
    } else {
      res.status(500).send({  msg: 'Server Error.' })
    }
  }
}

module.exports = { login }