import baseService from "./base";

export const restaurantService = {

  getAllRestaurants:  (params) => {
    return baseService('restaurants','GET', params)
  },
  getRestaurantData: (id) => {
    return baseService(`restaurants/${id}`)
  },
}