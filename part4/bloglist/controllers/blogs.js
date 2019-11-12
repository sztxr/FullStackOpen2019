const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(item => item.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(item => {
      if (item) response.json(item.toJSON())
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// POST

blogsRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body

  // if (!title || !author || !url) {
  //   return response.status(400).json({ error: 'content missing' })
  // }

  const blog = new Blog ({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedAndFormattedBlog => response.json(savedAndFormattedBlog))
    .catch(error => next(error))
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

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter