import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

test('clicking the like button twice calls the event handler twice', () => {
  const blog = {
    title: 'Guide to the Galaxy',
    author: 'Douglas Adams',
    likes: 42
  }

  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})