const { check } = require('express-validator')

// Middleware
const auth = require('../middleware/auth')

const createPostValidator = [
  auth,
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('paragraph', 'Paragraph is required.').not().isEmpty(),
  ]
]

module.exports = {
  createPostValidator
}