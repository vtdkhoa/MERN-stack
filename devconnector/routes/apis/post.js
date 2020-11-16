const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const { createPost, getPosts } = require('../../controllers/post')

// Validator
const { createPostValidator } = require('../../validators/post')

/**
 * @route POST api/post
 * @desc  Create a post
 * @access  Private
 */
router.post('/', createPostValidator, createPost)

/**
 * @route GET api/post
 * @desc  Get all posts
 * @access  Public
 */
router.get('/', getPosts)

module.exports = router