const express = require('express')
const router = express.Router()

// Controller
const {
  createPost,
  getPosts,
  getPostById
} = require('../../controllers/post')

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

/**
 * @route GET api/post/:post_id
 * @desc  Get a single post
 * @access  Public
 */
router.get('/:post_id', getPostById)

module.exports = router