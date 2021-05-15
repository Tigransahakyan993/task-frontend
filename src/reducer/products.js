import {productService} from '../service/api/products';
import {getCartItemIndex} from '../halpers';
import {products} from '../config/CONSTANTS';
import {toast} from "react-toastify";

const initialState  = {
  products: [],
  productData: {},
  loading: true,
  orderLoading: true,
  cart: [],
  orders: [],
  orderData: null,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case products.FETCH_PRODUCT:
    case products.FETCH_ALL_PRODUCTS:
    case products.ADD_TO_CART:
    case products.DELETE_WITH_CART:
    case products.CREATE_ORDER:
    case products.FETCH_ALL_ORDERS:
      return {
        ...state,
        orderLoading: true
      }
    case products.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productData: action.payload.data,
        loading: false
      }
    case products.FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false
      }
    case products.ADD_TO_CART_SUCCESS:
    case products.DELETE_WITH_CART_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case products.DELETE_WITH_CART_FAILURE:
      return {
        ...state,
        loading: false
      }
    case products.FETCH_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        orderLoading: false
      }
    case products.FETCH_ALL_ORDERS_FAILURE:
      return {
        ...state,
        orderLoading: false,
        message: action.payload.message,
      }
    case products.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        cart: [],
        orderData: action.payload.order
      }
    case products.CREATE_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: false,
        cart: [],
        message: action.payload.message
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
    dispatch({type: products.FETCH_PRODUCT});
    productService.getProductData(id)
      .then(response => {
        return dispatch({type: products.FETCH_PRODUCT_SUCCESS, payload: { data: response.data }})
      })
  }
}

export function fetchAllProducts(params) {
  return dispatch => {
    dispatch({type: products.FETCH_ALL_PRODUCTS});
    return productService.getAllProducts(params)
      .then(response => {
        dispatch({ type: products.FETCH_ALL_PRODUCTS_SUCCESS, payload: {products: response.data} })
      })
  }
}

export function addToCart(item, count) {
  return (dispatch, getState) => {
    dispatch({type: products.ADD_TO_CART})
    const {cart} = getState().products;
    const itemIndex = getCartItemIndex(item, cart);
    if (itemIndex === -1) {
      item.count = +count ? count : 1;
      cart.push(item);
      return dispatch({type: products.ADD_TO_CART_SUCCESS})
    }
    cart[itemIndex].count += (+count) ? +count : 1;
    dispatch({type: products.ADD_TO_CART_SUCCESS})
  }
}

export function deleteWithCart(item) {
  return (dispatch, getState) => {
    dispatch({type: products.DELETE_WITH_CART})
    const {cart} = getState().products;
    const itemIndex = getCartItemIndex(item, cart);
    if (itemIndex === -1) {
      return dispatch({type: products.DELETE_WITH_CART_FAILURE})
    }
    cart.splice(itemIndex, 1)
    dispatch({type: products.DELETE_WITH_CART_SUCCESS})
  }
}

export function createOrder(order) {
  return dispatch => {
    dispatch({type: products.CREATE_ORDER})
    return productService.createOrder(order)
        .then(response => {
          toast.success('Order created successful');
          dispatch({type: products.CREATE_ORDER_SUCCESS, payload: {order: response.data.order}})
        })
        .catch(err => {
          toast.error(err.message);
          dispatch({type: products.CREATE_ORDER_FAILURE, payload: {message: err.message}})
        })
  }
}

export function fetchAllOrders(params) {
  return dispatch => {
    dispatch({type: products.FETCH_ALL_ORDERS})
    return productService.getAllOrders(params)
        .then(response => {
          dispatch({type: products.FETCH_ALL_ORDERS_SUCCESS, payload: {orders: response.data.orders}})
        })
        .catch(err => {
          toast.error(err.message);
          dispatch({type: products.FETCH_ALL_ORDERS_FAILURE, payload: {message: err.message}})
        })
  }
}

export function reset() {
  return dispatch => {
    dispatch({type: 'RESET'})
  }
}