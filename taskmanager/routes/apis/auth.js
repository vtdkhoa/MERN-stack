const router = require('express').Router()

// Controller
const { login } = require('../../controllers/auth')

// Validator
const { validator } = require('../../validators/auth')

/**
 * @route POST api/user/auth
 * @description Login
 * @access Public
 */
router.post('/', validator, login)

module.exports = router