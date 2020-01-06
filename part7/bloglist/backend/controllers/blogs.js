const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs.map(item => item.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) response.json(blog.toJSON())
    else response.status(404).end()
  }
  catch (exception) {
    next(exception)
  }
})

// POST

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      // 401 unauthorized
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

// PUT

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

// DELETE

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!blog)  {
      return response.status(400).json({
        error: 'blog not found'
      })
    }

    if (!request.token || !decodedToken.id) {
      // 401 unauthorized
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    if (!(blog.user.toString() === decodedToken.id.toString())) {
      return response.status(401).json({
        error: 'not authorised'
      })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end() // 204 No Content
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter