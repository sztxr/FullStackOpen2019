import blogService from '../services/blogs'

// reducer
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return action.data
    default:
      return state
  }
}

// actions
export const initBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

// export const createBlog = data => {
//   return async dispatch => {
//     const blog = {
//       title: data.title,
//       author: data.author,
//       url: data.url
//     }
//     const data = await blogService.create(blog)
//     dispatch({
//       type: 'NEW_BLOG',
//       data
//     })
//   }
// }

// export const removeBlog = blog => {
//   return async dispatch => {
//     await blogService.remove(blog)
//     const data = await blogService.getAll()
//     dispatch({
//       type: 'REMOVE_BLOG',
//       data
//     })
//   }
// }

export default blogReducer