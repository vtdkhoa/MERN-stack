const router = require('express').Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { register, deleteAccount } = require('../../controllers/user')

// Validator
const { validator } = require('../../validators/user')

/**
 * @route POST api/user
 * @description Register user
 * @access Public
 */
router.post('/', validator, register)

/**
 * @route DELETE api/user
 * @description Delete user
 * @access Private
 */
router.delete('/', auth, deleteAccount)

module.exports = router