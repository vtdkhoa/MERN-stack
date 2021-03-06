const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const chalk = require('chalk')

const User = require('../models/User')
const Profile = require('../models/Profile')

const registerUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res
        .status(400)
        .json({
          errors: [
            { msg: 'User already exists.' }
          ]
        })
    }

    const avatar = gravatar.url(email, {
      size: '200',
      rating: 'pg',
      default: 'mm'
    })

    user = new User({ name, email, avatar, password })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

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
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deleteUser = async (req, res) => {
  try {
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id })

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id })

    res.json({ msg: 'User deleted.' })
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = {
  registerUser,
  deleteUser
}