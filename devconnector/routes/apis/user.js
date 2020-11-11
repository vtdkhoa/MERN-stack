const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

/**
 * @route POST api/user
 * @desc  Register user
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
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
            errors: [{
              msg: 'User already exists.'
            }]
          })
      }

      const avatar = gravatar.url(email, {
        s: '200',  // size
        r: 'pg',   // rating
        d: 'mm'    // default
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

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
      res.status(500).send({
        msg: 'Server Error.'
      })
    }
  }
)

/**
 * @route DELETE api/user
 * @desc  Delete user
 * @access  Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    res.json({ msg: 'User deleted.' })
  } catch (error) {
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
})

module.exports = router