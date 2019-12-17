import React from 'react'

const BlogForm = (props) => {
  const { handleSubmit, titleInput, authorInput, urlInput } = props
  // console.log('props', props)

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

export default BlogForm