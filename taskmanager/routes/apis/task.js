const router = require('express').Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { create, getTasks } = require('../../controllers/task')

// Validator
const { validator } = require('../../validators/task')

/**
 * @route POST api/task
 * @description Create a new task
 * @access Private
 */
router.post('/', validator, create)

/**
 * @route GET api/task
 * @description Get all tasks
 * @access Private
 */
router.get('/', auth, getTasks)

module.exports = router