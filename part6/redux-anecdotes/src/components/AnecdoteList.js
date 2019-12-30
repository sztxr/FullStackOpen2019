import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()

  const sortAnecdotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = anecdote => () => {
    store.dispatch(voteAnecdote(anecdote.id))
    setTimedNotification(`You voted: "${anecdote.content}"`, store)
  }

  return (
    <>
      {
        sortAnecdotes(anecdotes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote)}>vote</button>
            </div>
            <br />
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList