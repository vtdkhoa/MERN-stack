const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const authenticateUser = async (req, res) => {
  try {
    // Select user data except password
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
}

const login = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({
          errors: [
            { msg: 'Invalid Credentials.' }
          ]
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({
          errors: [
            { msg: 'Invalid Crendentials.' }
          ]
        })
    }

    const payload = {
      user: {
        id: user._id
      }
    }

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
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
}

module.exports = {
  authenticateUser,
  login
}