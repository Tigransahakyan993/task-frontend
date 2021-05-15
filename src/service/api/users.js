import baseService from "./base";

export const userService = {

  getAllUsers:  (params) => {
    return baseService('users', params)
  },

  getUser: (id) => {
    return baseService(`users/:${id}`)
  },

  getCurrentUser: () => {
    return baseService('users/getCurrentUser')
  }
}