import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { setUser, setToken, logout } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'


import UserList from './components/UserList'
import User from './components/User'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initBlogs()
    props.initUsers()
  }, [])

  // get user details from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      props.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      props.setUser(user)
      props.setToken(user.token)

      username.reset('')
      password.reset('')
    }
    catch (exception) {
      props.setNotification('Invalid username or password', 'error', 5)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    props.logout()
  }

  const addBlog = async (blog) => {
    try {
      props.createBlog(blog)
      blogFormRef.current.toggleVisibility()
      props.initBlogs()
      props.setNotification(`New blog added: ${blog.title} by ${blog.author}`, 'success', 5)
    }
    catch (exception) {
      // console.log(exception)
      props.setNotification('Invalid formatting', 'error', 5)
    }
  }

  const deleteBlog = async blogToDelete => {
    try {
      if (window.confirm(`Delete: '${blogToDelete.title} by ${blogToDelete.author}'?`)) {
        props.removeBlog(blogToDelete)
      }
    }
    catch (exception) {
      // console.log(exception)
      props.setNotification('Couldn\'t delete blog', 'error', 5)
    }
  }

  const likeBlog = async blogToUpdate => {
    try {
      const likedBLog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const response = await blogService.update(likedBLog)
      const updatedBlogList = blogs.map(blog => {
        return blog.id === response.id ? response : blog
      })
      setBlogs(updatedBlogList)
      props.initBlogs()
      props.setNotification(`Blog: ${blogToUpdate.title} by ${blogToUpdate.author} liked!`, 'success', 5)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const blogFormRef = React.createRef()

  const byLikes = (a, b) => b.likes - a.likes

  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <Router>

        <h1>Blogs</h1>

        <div>
          {props.user.name} logged in
          <button onClick={handleLogout} className="btn btn-secondary">logout</button>
        </div>

        <Notification />

        <Route exact path='/' render={() => (
          <>
            <Togglable
              buttonLabel='Add a new blog'
              classType='blogForm'
              ref={blogFormRef}
            >
              <BlogForm addBlog={addBlog} />
            </Togglable>

            <ul>
              {props.blogs.sort(byLikes).map((blog) =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={props.user}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                />
              )}
            </ul>
          </>
        )} />
        <Route exact path='/users' render={() => <UserList />}/>
        <Route path='/users/:id' render={({ match }) => (
          <User user={userById(match.params.id)} />
        )}/>

      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    blogs: state.blogs,
    user: state.login,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification,
  initBlogs,
  createBlog,
  removeBlog,
  setUser,
  logout,
  setToken,
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)