import {restaurantService} from '../service/api/restaurant'
import {restaurants} from "../config/CONSTANTS";

const initialState  = {
  restaurants: [],
  data: {},
  searchingList: [],
  loading: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case restaurants.FETCH_RESTAURANT:
    case restaurants.FETCH_ALL_RESTAURANTS:
    case restaurants.FETCH_SEARCHING_LIST:
      return {
        ...state
      }
    case restaurants.FETCH_RESTAURANT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false
      }
      case restaurants.FETCH_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurants: action.payload.restaurants,
        loading: false
      }
      case restaurants.FETCH_SEARCHING_LIST_SUCCESS:
        console.log('action.payload.searchingList:::::::',action.payload.searchingList);
        return {
        ...state,
        searchingList: action.payload.searchingList,
        loading: false
      }

    default: return state;
  }
}

export function fetchRestaurantData(id) {
  return dispatch => {
    dispatch({type: restaurants.FETCH_RESTAURANT});
    restaurantService.getRestaurantData(id)
      .then(response => {
        dispatch({type: restaurants.FETCH_RESTAURANT_SUCCESS, payload: {data: response.data}})
      })
        .catch(err => {
          dispatch({type: restaurants.FETCH_RESTAURANT_FAILURE, payload: {message: err.message}})
        })
  }
}

export function fetchAllRestaurants(params) {
  return dispatch => {
    dispatch({type: restaurants.FETCH_ALL_RESTAURANTS});
    return restaurantService.getAllRestaurants(params)
      .then(response => {
        console.log('response:::',response);
        return dispatch({ type: restaurants.FETCH_ALL_RESTAURANTS_SUCCESS, payload: {restaurants: response.data}})
      })
    }
}

export function fetchSearchingList(params) {
  return dispatch => {
    dispatch({type: restaurants.FETCH_SEARCHING_LIST});
    return restaurantService.getAllRestaurants(params)
      .then(response => {
        return dispatch({ type: restaurants.FETCH_SEARCHING_LIST_SUCCESS, payload: {searchingList: response.data}})
      })
    }
}