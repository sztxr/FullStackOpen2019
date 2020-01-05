const blogs = [
  {
    title: 'Mock Blog 1',
    author: 'Mock Author 1',
    url: 'mock1.url',
    likes: 11,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  },
  {
    title: 'Mock Blog 2',
    author: 'Mock Author 2',
    url: 'mock2.url',
    likes: 12,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }