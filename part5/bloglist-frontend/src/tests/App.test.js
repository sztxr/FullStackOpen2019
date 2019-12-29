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
})