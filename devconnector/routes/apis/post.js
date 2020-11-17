const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const {
  createPost,
  getPosts,
  getPost,
  deletePost
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
 * @route GET api/post/:id
 * @desc  Get a post
 * @access  Public
 */
router.get('/:id', getPost)

/**
 * @route DELETE api/post/:id
 * @desc  Delete a post
 * @access  Private
 */
router.delete('/:id', auth, deletePost)

module.exports = router