const { check } = require('express-validator')

const registerValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('username', 'Username must be alphanumeric.').isAlphanumeric('en-US'),
  check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
]

module.exports = {
  validator: registerValidator
}