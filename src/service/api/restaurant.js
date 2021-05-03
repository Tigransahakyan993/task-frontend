import baseService from "./base";

export const restaurantService = {

  getAllRestaurants:  (params) => {
    return baseService('restaurants', params)
  },

  getRestaurantData: async (id) => {
    return await baseService(`restaurants/:${id}`)
  },
}