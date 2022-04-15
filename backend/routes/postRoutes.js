const express = require('express')
const {
  getPosts,
  createPost,
  editPost,
  deletePost,
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getPosts).post(protect, createPost)
router.route('/:id').put(protect, editPost).delete(protect, deletePost)

module.exports = router
