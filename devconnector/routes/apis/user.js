const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { registerUser, deleteUser } = require('../../controllers/user')

// Validator
const { registerValidator } = require('../../validators/user')

/**
 * @route POST api/user
 * @desc  Register user
 * @access  Public
 */
router.post('/', registerValidator, registerUser)

/**
 * @route DELETE api/user
 * @desc  Delete user
 * @access  Private
 */
router.delete('/', auth, deleteUser)

module.exports = router