import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const { id } = action.data

      const blog = state.find((blog) => blog.id === id)
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : likedBlog))
    case 'COMMENT_BLOG': {
      const { id } = action.data
      const { blogId } = action.data
      const { content } = action.data

      const blog = state.find((blog) => blog.id === blogId)
      const comment = { content, id }

      const commentedBlog = {
        ...blog,
        comments: [...blog.comments, comment],
      }

      return state.map((blog) => (blog.id !== blogId ? blog : commentedBlog))
    }
    case 'REMOVE_BLOG': {
      const { id } = action.data
      return state.filter((blog) => blog.id !== id)
    }
    default:
      return state
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

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    })
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)

    dispatch({
      type: 'LIKE_BLOG',
      data: { id },
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blogId = id
    let newComment = await blogService.createComment(id, comment)
    newComment = { ...newComment, blogId }

    dispatch({
      type: 'COMMENT_BLOG',
      data: newComment,
    })
  }
}

export default blogReducer
