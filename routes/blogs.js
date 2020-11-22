const express = require('express')
const router = express.Router()
const { checkJwt, checkRole } = require('../controllers/auth')
const {
  getBlogs,
  getBlogBydId,
  getBlogBySlug,
  createBlog,
  updateBlog
} = require('../controllers/blogs')

router.get('/', getBlogs)

router.get('/:id', getBlogBydId)

router.get('/s/:slug', getBlogBySlug)

router.post('/', checkJwt, checkRole('admin'), createBlog)

router.patch('/:id', checkJwt, checkRole('admin'), updateBlog)

module.exports = router
