import React from 'react'

const BlogForm = (props) => {
  const { addNewBlog, titleInput, authorInput, urlInput } = props
  // console.log('props', props)

  return (
    <form onSubmit={addNewBlog}>
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
  )
}

export default BlogForm