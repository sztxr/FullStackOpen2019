import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const handleSubmit = e => {
    e.preventDefault()
    props.addBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input {...title} reset={null} />
        </div>

        <div>
          Author: <input {...author} reset={null} />
        </div>
        <div>
          URL: <input {...url} reset={null} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm