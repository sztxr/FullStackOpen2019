import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('component renders content', () => {
  const blog = {
    title: 'Guide to the Galaxy',
    author: 'Douglas Adams',
    likes: 42
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Guide to the Galaxy'
  )

  expect(component.container).toHaveTextContent(
    'Douglas Adams'
  )

  expect(component.container).toHaveTextContent('42')
})