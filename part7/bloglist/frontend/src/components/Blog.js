import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (props) => (
  <li>
    <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
  </li>
)


export default Blog