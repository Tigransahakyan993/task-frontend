import baseService from "../api/base";

const auth = {
  login:  (loginInfo) => {
    return baseService('auth/login', {},'POST', loginInfo)
  },
  register: (registerInfo) => {
    return baseService('auth/register', {},'POST', registerInfo)
  },
  getCurrentUser: () => {
    return baseService('auth/getCurrentUser', {},'GET')
  }
}

export default auth;