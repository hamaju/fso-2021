import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const { id } = action.data
      const blog = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    case 'REMOVE_BLOG': {
      const { id } = action.data
      return state.filter((blog) => blog.id !== id)
    }
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject)

    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
    dispatch(initializeBlogs())
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    })
  }
}

export const like = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)

    dispatch({
      type: 'LIKE',
      data: { id },
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer
