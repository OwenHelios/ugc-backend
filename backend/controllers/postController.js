const asyncHandler = require('express-async-handler')
const Post = require('../model/postModel')

// @desc Get Posts
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
})

// @desc create Post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('add a title field')
  }

  const post = await Post.create({
    title: req.body.title,
  })
  res.status(200).json(post)
})

// @desc edit Post
// @route PUT /api/posts/:id
// @access Private
const editPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedPost)
})

// @desc delete Post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }
  await post.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost,
}
