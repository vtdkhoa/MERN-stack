const express = require('express')
const router = express.Router()

// Controller
const { createPost } = require('../../controllers/post')

// Validator
const { createPostValidator } = require('../../validators/post')

/**
 * @route POST api/post/create
 * @desc  Create a post
 * @access  Private
 */
router.post('/', createPostValidator, createPost)

module.exports = router