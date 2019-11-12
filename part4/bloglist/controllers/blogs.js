const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

// PUT

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => updatedBlog.toJSON())
    .then(updatedAndFormattedBlog => response.json(updatedAndFormattedBlog))
    .catch(error => next(error))
})

// DELETE

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end() // 204 No Content
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter