import authService from '../../service/authService/auth'
import CONSTANTS from '../../config/CONSTANTS'

const initialState  = {
  user: {},
  loading: false,
  trailLoginLoading: false,
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_CURRENT_USER:
    case 'REGISTER_USER_ACTION':
    case 'LOGIN_ACTION':
    case 'LOGOUT_ACTION':
      return {
        ...state,
        loading: true,
        }
      case 'FETCH_CURRENT_USER_FAILURE':
      case 'REGISTER_USER_FAILURE':
      case 'TRAIL_LOGIN_FAILURE':
      case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        ...action.payload
        }
      case 'FETCH_CURRENT_USER_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          loading: false,
        }
      case 'LOGIN_SUCCESS':
        return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        }
      case 'LOGOUT_SUCCESS':
        return {
        ...state,
        ...action.payload,
        loading: false,
        }
      case 'TRAIL_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        ...action.payload.data,
        }
      case 'REGISTER_USER_SUCCESS':
        return {
          ...state,
          loading: false,
          message: action.payload.message
        }
      case 'RESET':
        return {
          ...initialState
        }

    default: return state;
  }
}

export function login(loginInfo) {
  return dispatch => {
    dispatch({type: CONSTANTS.LOGIN_ACTION})
    authService.login(loginInfo)
        .then(response => {
          const {token, user} = response;
          if (token) {
            window.localStorage.setItem('token', token);
            dispatch({type: CONSTANTS.LOGIN_SUCCESS, payload: {token, user}})
          } else {
            dispatch({type: CONSTANTS.LOGIN_FAILURE, payload: {message: CONSTANTS.LOGIN_FAILURE}})
          }
        })
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: 'LOGOUT_ACTION'});
    window.localStorage.setItem('token', '');
    dispatch({type: 'LOGOUT_SUCCESS', payload: {token: ''}})
  }
}

export function register(registerInfo) {
  return dispatch => {
    dispatch({type: 'REGISTER_USER_ACTION'})
    try {
      authService.register(registerInfo)
          .then(response => {
            dispatch({type: 'REGISTER_USER_SUCCESS', payload: {message: CONSTANTS.REGISTRATION_SUCCESS}})
          })
    } catch (e) {
      dispatch({type: 'REGISTER_USER_FAILURE', payload: {message: e.message}})
    }
  }
}

export function getCurrentUser() {
  return dispatch => {
    dispatch({type: 'FETCH_CURRENT_USER'});
     authService.getCurrentUser()
      .then(response => {
        if (!response.user) {
          window.localStorage.setItem('token', '');
          dispatch({type: 'FETCH_CURRENT_USER_FAILURE'});
          return
        }
        dispatch({type: 'FETCH_CURRENT_USER_SUCCESS', payload: {user: response.user}})
      })
  }
}

export function trailLogin() {
    return dispatch => {
      dispatch({type: 'TRAIL_LOGIN'})
      const token = window.localStorage.getItem('token');
      if (!token) {
        dispatch({type: 'TRAIL_LOGIN_FAILURE'})
      } else {
        dispatch({type: 'LOGIN_SUCCESS', payload: {token}})
        dispatch(getCurrentUser());
      }
    }
}

