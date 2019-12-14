import React from 'react'

const Blog = ({ blog }) => (
  <li>
    <strong>{blog.title}.</strong> {blog.author}
  </li>
)

export default Blog