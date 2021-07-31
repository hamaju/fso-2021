import loginService from '../services/login'

const loggedUserJSON = JSON.parse(
  window.localStorage.getItem('loggedBlogappUser')
)
const initialState = loggedUserJSON ? loggedUserJSON : null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT': {
      return null
    }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    dispatch({
      type: 'LOG_IN',
      data: user,
    })
  }
}

export const logout = () => {
  return {
    type: 'LOG_OUT',
  }
}

export default loginReducer
