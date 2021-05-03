import baseService from "./base";

export const userService = {

  getAllUsers:  (params) => {
    return baseService('users', params)
  },

  getUser: async (id) => {
    return await baseService(`users/:${id}`)
  },
}