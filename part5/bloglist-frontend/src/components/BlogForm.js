import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const { handleSubmit, title, author, url } = props

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
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm