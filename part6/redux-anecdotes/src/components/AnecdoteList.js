import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = anecdote => () => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted: "${anecdote.content}"`, 3)
  }

  return (
    <>
      {props.anecdotesToShow.map(anecdote =>
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
      )}
    </>
  )
}

const sortAnecdotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const filteredAnecdotes = ({ anecdotes, filter: filterValue }) => {
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    anecdotesToShow: sortAnecdotes(filteredAnecdotes(state))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)