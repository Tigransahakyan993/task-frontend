import {productService} from '../service/api/products'
import {getCartItemIndex} from '../halpers'
import CONSTANTS from '../config/CONSTANTS'

const initialState  = {
  products: [],
  productData: {},
  loading: true,
  cart: [],
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT':
    case 'FETCH_ALL_PRODUCTS':
    case 'ADD_TO_CART':
    case 'DELETE_WITH_CART':
      return {
        ...state
      }
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        productData: action.payload.data,
        loading: false
      }
    case 'FETCH_ALL_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        loading: false
      }
      case 'ADD_TO_CART_SUCCESS':
      case 'DELETE_WITH_CART_SUCCESS':
      return {
        ...state,
        loading: false
      }
      case 'DELETE_WITH_CART_FAILURE':
      return {
        ...state,
        loading: false
      }
      case 'RESET':
      return {
        ...state,
        loading: false
      }

    default:
        return {
          ...state
        }
  }
}

export function fetchProductData(id) {
  return dispatch => {
    dispatch({type: CONSTANTS.FETCH_PRODUCT});
    productService.getProductData(id)
      .then(data => {
        return dispatch({type: CONSTANTS.FETCH_PRODUCT_SUCCESS, payload: { data }})
      })
  }
}

export function fetchAllProducts(params) {
  return dispatch => {
    dispatch({type: CONSTANTS.FETCH_ALL_PRODUCTS});
    return productService.getAllProducts(params)
      .then(response => {
        return dispatch({ type: CONSTANTS.FETCH_ALL_PRODUCTS_SUCCESS, payload: {products: response} })
      })
  }
}

export function addToCart(item, count) {
  return (dispatch, getState) => {
    dispatch({type: CONSTANTS.ADD_TO_CART})
    const {cart} = getState().products;
    const itemIndex = getCartItemIndex(item, cart);
    if (itemIndex === -1) {
      item.count = +count ? count : 1;
      cart.push(item);
      return dispatch({type: CONSTANTS.ADD_TO_CART_SUCCESS})
    }
    cart[itemIndex].count += (+count) ? +count : 1;
    dispatch({type: CONSTANTS.ADD_TO_CART_SUCCESS})
  }
}

export function deleteWithCart(item) {
  return (dispatch, getState) => {
    dispatch({type: CONSTANTS.DELETE_WITH_CART})
    const {cart} = getState().products;
    const itemIndex = getCartItemIndex(item, cart);
    if (itemIndex === -1) {
      return dispatch({type: CONSTANTS.DELETE_WITH_CART_FAILURE})
    }
    cart.splice(itemIndex, 1)
    dispatch({type: CONSTANTS.DELETE_WITH_CART_SUCCESS})
  }
}

export function reset() {
  return dispatch => {
    dispatch({type: CONSTANTS.RESET})
  }
}