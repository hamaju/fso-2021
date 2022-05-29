import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls callback function passed as props with correct info', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'haha' },
  })
  fireEvent.change(author, {
    target: { value: 'lol' },
  })
  fireEvent.change(url, {
    target: { value: 'www' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('haha')
  expect(createBlog.mock.calls[0][0].author).toBe('lol')
  expect(createBlog.mock.calls[0][0].url).toBe('www')
})
