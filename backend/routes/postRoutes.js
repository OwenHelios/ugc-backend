const express = require('express')
const {
  getPosts,
  createPost,
  editPost,
  deletePost,
} = require('../controllers/postController')
const router = express.Router()

router.route('/').get(getPosts).post(createPost)
router.route('/:id').put(editPost).delete(deletePost)

module.exports = router
