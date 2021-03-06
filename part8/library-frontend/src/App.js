import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null);
    setPage('login');
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null
          ? <button onClick={() => setPage('login')}>login</button>
          : (
            <>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => logout()}>logout</button>
            </>
          )
        }
      </div>

      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        token={token}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended show={page === 'recommended'} />

      <LoginForm
        token={token}
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

    </div>
  )
}

export default App