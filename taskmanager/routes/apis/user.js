const router = require('express').Router()

// Controller
const { register } = require('../../controllers/user')

// Validator
const { validator } = require('../../validators/user')

/**
 * @route POST api/user
 * @description Register user
 * @access Public
 */
router.post('/', validator, register)

module.exports = router