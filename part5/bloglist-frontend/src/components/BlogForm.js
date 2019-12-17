import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const { handleSubmit, titleInput, authorInput, urlInput } = props

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: {titleInput}
        </div>

        <div>
          Author: {authorInput}
        </div>
        <div>
          URL: {urlInput}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  titleInput: PropTypes.object.isRequired,
  authorInput: PropTypes.object.isRequired,
  urlInput: PropTypes.object.isRequired
}

export default BlogForm