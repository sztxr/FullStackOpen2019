import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from '../App'

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(<App />)
  })

  test('if no user logged, blogs are not rendered', async () => {
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.loginForm')
    )

    const heading = component.container.querySelector('h2')
    expect(heading).toHaveTextContent('Log in to application')
  })

  // not working
  test('if use is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '01123581321345589',
      name: 'App Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs')
    )

    const blogs = component.container.querySelectorAll('.blogInfo')
    expect(blogs.length).toBe(2)
  })
})