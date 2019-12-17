import React, { useState } from 'react'

const Blog = ({ blog, user }) => {
  const [expand, setExpand] = useState(false)

  return (
    <li onClick={() => setExpand(!expand)}>
      <strong>{blog.title}.</strong> {blog.author}
      {expand ? (
        <ul>
          <li>url: <a href={blog.url}>{blog.url}</a></li>
          <li>
            likes: {blog.likes}
            <button className="btn btn-like" onClick={() => console.log('liked!')}>
              <span role="img" aria-label="like">&#128077;</span>
            </button>
          </li>
          <li>added by: {user.name}</li>
        </ul>
      ) : null}
    </li>
  )
}

export default Blog