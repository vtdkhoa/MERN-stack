const router = require('express').Router()

// Controller
const { create } = require('../../controllers/task')

// Validator
const { validator } = require('../../validators/task')

/**
 * @route POST api/task
 * @description Create a new task
 * @access Private
 */
router.post('/', validator, create)

module.exports = router