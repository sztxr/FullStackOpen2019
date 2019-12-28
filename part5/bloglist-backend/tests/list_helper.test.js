const listHelper = require('../utils/list_helper')
const testData = require('./blogs_for_test')

// Test: Dummy
test('dummy returns one', () => {
  const result = listHelper.dummy(testData.multipleBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testData.multipleBlogs)
    expect(result).toBe(36)
  })
})

// Test: Favourite blog
describe('favourite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog equals itself', () => {
    const result = listHelper.favouriteBlog(testData.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    })
  })

  test('of bigger list is the one with most likes', () => {
    const result = listHelper.favouriteBlog(testData.multipleBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    })
  })
})

// Test: Author with most blogs
describe('author with most blogs', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals itself', () => {
    const result = listHelper.mostBlogs(testData.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of bigger list is the one with most blogs', () => {
    const result = listHelper.mostBlogs(testData.multipleBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

// Test: Author with most likes
describe('author with most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog equals itself', () => {
    const result = listHelper.mostLikes(testData.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of bigger list is the one with most likes', () => {
    const result = listHelper.mostLikes(testData.multipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
