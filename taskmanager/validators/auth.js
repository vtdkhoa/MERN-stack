const { check } = require('express-validator')

const loginValidator = [
  check('username', 'Please enter your username.').not().isEmpty(),
  check('password', 'Password is required.').exists()
]

module.exports = {
  validator: loginValidator
}