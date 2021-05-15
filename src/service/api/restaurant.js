import baseService from "./base";

export const restaurantService = {

  getAllRestaurants:  (params) => {
    return baseService('restaurants','GET',params)
  },

  getRestaurantData: async (id) => {
    return await baseService(`restaurants/:${id}`)
  },
}