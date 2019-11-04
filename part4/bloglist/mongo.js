const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-pxexu.mongodb.net/bloglist-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
  content: String,
  date: Date
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//   content: 'Blog entry from mongo.js',
//   date: new Date()
// })

// blog.save().then(response => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

Blog
  .find({})
  .then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })