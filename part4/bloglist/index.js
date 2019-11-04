require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())
app.use(bodyParser.json())

morgan.token('body', request => JSON.stringify(request.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

// GET

app.get('/', (request, response) => {
  response.send('<h1>Blog list</h1>')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(item => item.toJSON()))
    })
})

app.get('/api/blogs/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(item => {
      if (item) response.json(item.toJSON())
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// POST

app.post('/api/blogs', (request, response, next) => {
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

app.put('/api/blogs/:id', (request, response, next) => {
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

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// MIDDLEWARE

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})