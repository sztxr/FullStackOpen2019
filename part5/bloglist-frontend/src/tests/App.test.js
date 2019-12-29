import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from '../App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.loginForm')
    )

    const heading = component.container.querySelector('h2')
    expect(heading).toHaveTextContent('Log in to application')
  })

  test('if use is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '01123581321345589',
      name: 'App Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs')
    )

    const blogs = component.container.querySelectorAll('.blogInfo')
    expect(blogs.length).toBe(2)
  })
})