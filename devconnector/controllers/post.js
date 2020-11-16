const { validationResult } = require('express-validator')

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
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post
      .find()
      .sort({ date: -1 })

    res.json(posts)
  } catch (error) {
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
}

module.exports = {
  createPost,
  getPosts
}