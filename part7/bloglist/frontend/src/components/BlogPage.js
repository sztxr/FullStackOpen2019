import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { ButtonLike, ButtonDelete } from './styles/styles'

const BlogPage = (props) => {
  const { blog, user, likeBlog, deleteBlog } = props

  if (blog === undefined) return null

  return (
    <div className="blogInfo">
      <h2>{blog.title}</h2>
      <p>by {blog.author}</p>
      <p>url: <a href={blog.url}>{blog.url}</a></p>
      <p>
        likes: {blog.likes}
        <ButtonLike onClick={() => likeBlog(blog)} id="blog-like">
          <span role="img" aria-label="like">&#128077;</span>
        </ButtonLike>
      </p>
      {blog.user && <p>added by: {blog.user.name}</p>}
      {blog.user && (user.username === blog.user.username) ?
        <ButtonDelete onClick={() => deleteBlog(blog)}>Delete</ButtonDelete>
        : null}

      <h3>comments</h3>
      <CommentForm blog={blog}/>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

BlogPage.propTypes = {
  // blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogPage