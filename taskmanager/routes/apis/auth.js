const router = require('express').Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { login, authenticate } = require('../../controllers/auth')

// Validator
const { validator } = require('../../validators/auth')

/**
 * @route POST api/user/auth
 * @description Login
 * @access Public
 */
router.post('/', validator, login)

/**
 * @route GET api/user/auth
 * @description User authentication
 * @access Private
 */
router.get('/', auth, authenticate)

module.exports = router