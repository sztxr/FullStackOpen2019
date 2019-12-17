import React, { useState } from 'react'

const Blog = ({ blog, handleClick }) => {
  const [expand, setExpand] = useState(false)

  const updateLikes = e => {
    // stop div from closing
    e.stopPropagation()
    
    // update likes on database
    handleClick({
      ...blog,
      likes: blog.likes + 1
    })
  }

  return (
    <li onClick={() => setExpand(!expand)}>
      <strong>{blog.title}.</strong> {blog.author}
      {expand ? (
        <ul>
          <li>url: <a href={blog.url}>{blog.url}</a></li>
          <li>
            likes: {blog.likes}
            <button className="btn btn-like" onClick={updateLikes}>
              <span role="img" aria-label="like">&#128077;</span>
            </button>
          </li>
          <li>added by: {blog.user && blog.user.name}</li>
        </ul>
      ) : null}
    </li>
  )
}

export default Blog