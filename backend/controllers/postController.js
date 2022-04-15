const asyncHandler = require('express-async-handler')

// @desc Get Posts
// @route GET /api/posts
// @access Private
const getPosts = async (req, res) => {
  res.status(200).json({ msg: 'rea' })
}

// @desc create Post
// @route POST /api/posts
// @access Private
const createPost = async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('add a text field')
  }
  res.status(200).json({ msg: 'rea' })
}

// @desc edit Post
// @route PUT /api/posts/:id
// @access Private
const editPost = async (req, res) => {
  res.status(200).json({ msg: `edit post ${req.params.id}` })
}

// @desc delete Post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = async (req, res) => {
  res.status(200).json({ msg: `delete post ${req.params.id}` })
}

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost,
}
