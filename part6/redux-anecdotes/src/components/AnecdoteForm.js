import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.createAnecdote(content)
    e.target.anecdote.value = ''
    props.setNotification('New anecdote added!')
    setTimeout(() => {props.clearNotification()}, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  clearNotification
}

export default connect(
  null, mapDispatchToProps
)(AnecdoteForm)