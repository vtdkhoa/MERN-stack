const { check } = require('express-validator')

const registerValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please enter a valid email.').isEmail(),
  check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
]

module.exports = {
  registerValidator
}