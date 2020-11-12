const { check } = require('express-validator')

// Middleware
const auth = require('../middleware/auth')

const createProfileValidator = [
  auth,
  [
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills is required.').not().isEmpty()
  ]
]

const updateExperienceValidator = [
  auth,
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty()
  ]
]

module.exports = {
  createProfileValidator,
  updateExperienceValidator
}