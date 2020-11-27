const slugify = require('slugify')
const uniqueSlug = require('unique-slug')
const mongoose = require('mongoose')
const Blog = mongoose.model('Blog')
const { getAccessToken, getAuth0User } = require('./auth')

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({
      createdAt: -1
    })
    const { access_token } = await getAccessToken()
    const blogsWithUsers = []
    const authors = {}

    for (let blog of blogs) {
      const author =
        authors[blog.userId] || (await getAuth0User(access_token)(blog.userId))
      authors[author.user_id] = author
      blogsWithUsers.push({ blog, author })
    }

    return res.json(blogsWithUsers)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.getBlogBydId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    return res.json(blog)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
    const { access_token } = await getAccessToken()
    const author = await getAuth0User(access_token)(blog.userId)

    return res.json({ blog, author })
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.getBlogsBydUser = async (req, res) => {
  const userId = req.user.sub
  try {
    const blogs = await Blog.find({
      userId,
      status: { $in: ['draft', 'published'] }
    })
    return res.json(blogs)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.createBlog = async (req, res) => {
  const blogData = req.body
  blogData.userId = req.user.sub

  try {
    const blog = new Blog(blogData)
    const createdBlog = await blog.save()
    return res.json(createdBlog)
  } catch (error) {
    return res.status(422).json(error.message)
  }
}

const _saveBlog = async (blog) => {
  try {
    const createdBlog = await blog.save()
    return createdBlog
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.slug) {
      blog.slug += `-${uniqueSlug()}`
      return _saveBlog(blog)
    }
  }

  throw error
}

exports.updateBlog = (req, res) => {
  const {
    body,
    params: { id }
  } = req

  Blog.findById(id, async (err, blog) => {
    if (err) {
      return res.status(422).send(error.message)
    }

    if (body.status && body.status === 'published' && !blog.slug) {
      blog.slug = slugify(blog.title, {
        lower: true
      })
    }

    blog.set(body)
    blog.updateAt = new Date()

    try {
      const updatedBlog = await _saveBlog(blog)
      return res.json(updatedBlog)
    } catch (error) {
      return res.status(422).send(error.message)
    }
  })
}
