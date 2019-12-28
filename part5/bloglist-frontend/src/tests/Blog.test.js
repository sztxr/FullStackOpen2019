import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Mock Blog',
    author: 'Mock Author',
    url: 'mock.url',
    likes: 11,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  }

  const user = {
    username: 'testUser'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={() => {}}
        deleteBlog={() => {}}
      />
    )
  })

  test('only name and author are shown by default', () => {
    expect(component.container).toHaveTextContent('Mock Blog')
    expect(component.container).toHaveTextContent('Mock Author')
    expect(component.container).not.toHaveTextContent('mock.url')
    expect(component.container).not.toHaveTextContent('11')
    expect(component.container).not.toHaveTextContent('Test User')
  })

  test('when clicked, blog info becomes visible', () => {
    const div = component.container.querySelector('.blogInfo')
    fireEvent.click(div)

    expect(component.container).toHaveTextContent('mock.url')
    expect(component.container).toHaveTextContent('11')
    expect(component.container).toHaveTextContent('added by')
  })
})
