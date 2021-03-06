import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Input } from './styles/styles'

const CommentForm = (props) => {
  const comment = useField('text')

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const commentObject = { content: comment.value }

      props.addComment(props.blog, commentObject)
      comment.reset()
      if (!comment.value) return props.setNotification('Field cannot be empty!', 'error', 3)
      props.setNotification('Comment added!', 'success', 3)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input {...comment} reset={null} />
        <Button primary type="submit">add comment</Button>
      </div>
    </form>
  )
}

export default connect(null, { setNotification, addComment })(CommentForm)