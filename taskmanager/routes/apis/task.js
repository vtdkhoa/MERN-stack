const router = require('express').Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { create, getTasks, getTask, deleteTask } = require('../../controllers/task')

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

/**
 * @route GET api/task/:id
 * @description Get a task
 * @access Private
 */
router.get('/:id', auth, getTask)

/**
 * @route DELETE api/task/:id
 * @description Delete a task
 * @access Private
 */
router.delete('/:id', auth, deleteTask)

module.exports = router