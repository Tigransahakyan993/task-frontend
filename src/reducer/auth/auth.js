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
    case 'FETCH_CURRENT_USER':
    case 'LOGIN_ACTION':
    case 'LOGOUT_ACTION':
      return {
        ...state,
        loading: true,
      }
      case 'FETCH_CURRENT_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      }
      case 'FETCH_CURRENT_USER_FAILURE':
      return {
        ...state,
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
          user: action.payload.data,
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
    dispatch({type: 'LOGIN_ACTION'})
    authService.login(loginInfo)
      .then(response => {
        debugger
        const {token, user} = response;
        if (token) {
          window.localStorage.setItem('token', token);
          dispatch({type: 'LOGIN_SUCCESS', payload: {token, user}})
        } else {
          window.localStorage.setItem('token', '');
          dispatch({type: 'LOGIN_FAILURE', payload: {message: response.message}})
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
    authService.register(registerInfo)
      .then(token => {
        dispatch({type: 'REGISTER_USER_SUCCESS', payload: {token, message: CONSTANTS.REGISTRATION_SUCCESS}})
      })
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

