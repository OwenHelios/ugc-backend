const asyncHandler = require('express-async-handler')
const Post = require('../model/postModel')
const User = require('../model/userModel')

// @desc get Posts
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
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
    user: req.user.id,
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

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // only allow edit post when current user matches post creator
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized to edit this post')
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

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // only allow delete post when current user matches post creator
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized to delete this post')
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
