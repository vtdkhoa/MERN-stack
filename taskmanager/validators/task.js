const { check } = require('express-validator')

// Middleware
const auth = require('../middleware/auth')

const taskValidator = [
  auth,
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('content', 'Content is required.').not().isEmpty(),
    check('priority', 'Priority is required.').not().isEmpty()
  ]
]

module.exports = {
  validator: taskValidator
}