const { validationResult } = require('express-validator')
const chalk = require('chalk')

const User = require('../models/User')
const Post = require('../models/Post')

const createPost = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const { title, paragraph, tags } = req.body

  try {
    const user = await User.findById(req.user.id).select('-password')
    let postTags

    if (tags) {
      postTags = tags.split(',').map(tag => tag.trim())
    }

    const newPost = new Post({
      title,
      paragraph,
      tags: postTags || [],
      author: user.name,
      avatar: user.avatar,
      user: req.user.id
    })
    const post = await newPost.save()

    res.json(post)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found.' })
    }

    res.json(post)
  } catch (error) {
    console.log(chalk.redBright(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Post not found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized.' })
    }

    await post.remove()
    res.json({ msg: 'Post has been deleted.' })
  } catch (error) {
    console.log(chalk.redBright(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Post not found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })

    if (!posts) {
      return res
        .status(204)
        .json({ msg: 'Have No Post.' })
    }

    res.json(posts)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const amountLikes = post.likes.filter(like => {
      return like.user.toString() === req.user.id
    })

    // Check if the post has already been liked
    if (amountLikes.length > 0) {
      return res
        .status(400)
        .json({ msg: 'Post already liked.' })
    }

    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const commentPost = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Pull out comment
    const comment = post.comments.find(cmt => {
      return cmt.id === req.params.comment_id
    })

    // Check comment exists or not
    if (!comment) {
      return res
        .status(404)
        .json({ msg: 'Comment does not exist.' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized.' })
    }

    // Remove comment
    post.comments = post.comments.filter(({ id }) => {
      return id !== req.params.comment_id
    })

    await post.save()
    res.json(post.comments)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  getMyPosts,
  likePost,
  commentPost,
  removeComment
}