const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length) {
    const sortAndFormat =
      blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
          }
        ))
    return sortAndFormat[0]
  } else {
    return null
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length) {
    const numOfBlogsByAuthor = _(blogs)
      .groupBy('author')
      .map((entries, author) => ({ author, blogs: entries.length }))
      .value()
    const mostOccurrences = _.maxBy(numOfBlogsByAuthor, 'blogs')
    return mostOccurrences
  } else {
    return 0
  }
}

const mostLikes = (blogs) => {
  if (blogs.length) {
    const numOfLikesByAuthor = _(blogs)
      .groupBy('author')
      .map((entries, author) => ({ author, likes: _.sumBy(entries, 'likes') }))
      .value()
    const mostLikes = _.maxBy(numOfLikesByAuthor, 'likes')
    return mostLikes
  } else {
    return null
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}