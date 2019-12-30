import React from 'react'

const App = (props) => {
  const anecdotes = props.store.getState()

  const sortAnecdotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = id => () => {
    props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: content
    })
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote.id)}>vote</button>
          </div>
          <br />
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App