const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { authenticateUser, login } = require('../../controllers/auth')

// Validator
const { loginValidator } = require('../../validators/auth')

/**
 * @route GET api/user/auth
 * @desc  User authentication
 * @access  Private
 */
router.get('/', auth, authenticateUser)

/**
 * @route POST api/user/auth
 * @desc  Authenticate user & get token (Login)
 * @access  Public
 */
router.post('/', loginValidator, login)


module.exports = router