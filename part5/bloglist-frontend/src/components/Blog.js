import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [expand, setExpand] = useState(false)

  const handleLikeClick = e => {
    // stop div from closing
    e.stopPropagation()

    // update likes on database
    updateLikes({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const handleDelete = e => {
    e.stopPropagation()
    if (window.confirm(`Delete: '${blog.title} by ${blog.author}'?`)) {
      deleteBlog(blog)
      setExpand(false)
    }
  }

  return (
    <li onClick={() => setExpand(!expand)}>
      <strong>{blog.title}.</strong> {blog.author}
      {expand ? (
        <ul>
          <li>url: <a href={blog.url}>{blog.url}</a></li>
          <li>
            likes: {blog.likes}
            <button className="btn btn-like" onClick={handleLikeClick}>
              <span role="img" aria-label="like">&#128077;</span>
            </button>
          </li>
          {blog.user && <li>added by: {blog.user.name}</li>}
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
        </ul>
      ) : null}
    </li>
  )
}

export default Blog