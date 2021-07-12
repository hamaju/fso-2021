import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'test',
    author: 'lol',
    url: 'example.com/blog',
    likes: 0,
  }

  const user = {
    username: 'tester',
    name: 'test user',
  }

  const mockHandler = jest.fn()

  let component
  beforeEach(() => {
    component = render(
      <Blog user={user} blog={blog} updateBlog={mockHandler} />
    )
  })

  test('renders blog title and author but not url and likes', () => {
    expect(component.container).toHaveTextContent(blog.title && blog.author)
    expect(component.container).not.toHaveTextContent(blog.url && blog.likes)
  })

  test('url and likes are shown when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url && blog.likes)
  })

  test('event handler passed as props is called twice when like button is pressed two times', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
