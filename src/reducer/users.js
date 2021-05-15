import {userService} from '../service/api/users'
import {users} from '../config/CONSTANTS'

const initialState  = {
  user: {},
  users: [],
  loading: true,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case users.FETCH_USER:
    case users.FETCH_ALL_USERS:
      return {
        ...state
      }
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        loading: false
      }
    case 'FETCH_ALL_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload.users,
        loading: false
      }
    case 'RESET':
      return {
        ...state,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}
export function fetchUser(id = 0) {
  return dispatch => {
    dispatch({type: 'FETCH_USER'})
    return userService.getUser(id)
      .then(user => {
        dispatch({type: 'FETCH_USER_SUCCESS', payload: {user}})
      })
  }
}

export function reset() {
  return dispatch => {
    dispatch({type: users.RESET})
  }
}