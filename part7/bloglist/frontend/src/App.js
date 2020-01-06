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
// import { initBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { initBlogs  } from './reducers/blogReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  // get all blogs
  // useEffect(() => {
  //   const getBlogs = async () => {
  //     const blogs = await blogService.getAll()
  //     setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  //   }
  //   getBlogs()
  // }, [])

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

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable
      buttonLabel='Add a new blog'
      classType='blogForm'
      ref={blogFormRef}
    >
      <BlogForm
        handleSubmit={addNewBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const addNewBlog = async e => {
    try {
      e.preventDefault()
      blogFormRef.current.toggleVisibility()
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      // props.createBlog(blogObject)
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      title.reset()
      author.reset()
      url.reset()
      props.setNotification(`New blog added: ${blogObject.title} by ${blogObject.author}`, 'success', 5)
    }
    catch (exception) {
      console.log(exception)
      props.setNotification('Invalid formatting', 'error', 5)
    }
  }

  const updateLikes = async blogToUpdate => {
    try {
      const response = await blogService.update(blogToUpdate)
      const updatedBlogList = blogs.map(blog => {
        return blog.id === response.id ? response : blog
      })
      setBlogs(updatedBlogList)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async blogToDelete => {
    try {
      const response = await blogService.remove(blogToDelete)
      const updatedBlogList = blogs.filter(blog => blog.id !== response.id)
      setBlogs(updatedBlogList)
      props.removeBlog(blogToDelete)
      props.setNotification(`Blog: '${blogToDelete.title} by ${blogToDelete.author}' has been deleted`, 'success', 5)
    }
    catch (exception) {
      console.log(exception)
      props.setNotification('Couldn\'t delete blog', 'error', 5)
    }
  }

  console.log(props)
  const renderItems = () => props.blogs.map((blog) =>
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      updateLikes={updateLikes}
      deleteBlog={deleteBlog}
    />
  )

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

      {blogForm()}

      <ul>
        {renderItems()}
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
  // createBlog,
  // removeBlog
})(App)