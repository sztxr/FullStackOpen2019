import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initBlogs()
  }, [])

  // get user details from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset('')
      password.reset('')
    }
    catch (exception) {
      props.setNotification('Invalid username or password', 'error', 5)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    try {
      // const response = await blogService.create(blog)
      props.createBlog(blog)
      blogFormRef.current.toggleVisibility()
      // setBlogs(blogs.concat(response))
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

  if (user === null) {
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
      <h1>Blogs</h1>

      <div>
        {user.name} logged in
        <button onClick={handleLogout} className="btn btn-secondary">logout</button>
      </div>

      <Notification />

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
            user={user}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, {
  setNotification,
  initBlogs,
  createBlog,
  removeBlog
})(App)