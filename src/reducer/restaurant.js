import {restaurantService} from '../service/api/restaurant'

const initialState  = {
  restaurants: [],
  data: {},
  loading: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RESTAURANT':
    case 'FETCH_ALL_RESTAURANTS':
      return {
        ...state
      }
    case 'FETCH_RESTAURANT_SUCCESS':
      return {
        ...state,
        data: action.payload.data,
        loading: false
      }
      case 'FETCH_ALL_RESTAURANTS_SUCCESS':
      return {
        ...state,
        restaurants: action.payload.restaurants,
        loading: false
      }

    default: return state;
  }
}

export function fetchRestaurantData(id) {
  return dispatch => {
    dispatch({type: 'FETCH_RESTAURANT'});
    restaurantService.getAllRestaurants()
      .then(data => {
        for (let i in data) {
          if (data[+i].id === +id) {
            return dispatch({type: 'FETCH_RESTAURANT_SUCCESS', payload: {data: data[+i]}})
          }
        }
      })
  }
}

export function fetchAllRestaurants(params) {
  return dispatch => {
    dispatch({type: 'FETCH_ALL_RESTAURANTS'});
    return restaurantService.getAllRestaurants(params)
      .then(data => {
        return dispatch({ type: 'FETCH_ALL_RESTAURANTS_SUCCESS', payload: {restaurants: data}})
      })
    }
}