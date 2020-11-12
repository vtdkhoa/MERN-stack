const { check } = require('express-validator')

const loginValidator = [
  check('email', 'Please enter a valid email.').not().isEmpty(),
  check('password', 'Password is required.').exists()
]

module.exports = {
  loginValidator
}