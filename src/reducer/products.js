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
  orderData: {},
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
    case products.UPDATE_PRODUCT:
    case products.CHANGE_ORDER_STATUS:
    case products.FETCH_ORDER:
      return {
        ...state,
        orderLoading: true,
        loading: true,
        message: ''
      }
    case products.FETCH_PRODUCT_SUCCESS:
    case products.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productData: action.payload.data,
        loading: false
      }
    case products.FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
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
    case products.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orderData: action.payload.orderData,
        orderLoading: false
      }
    case products.CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        message: action.payload.message
      }
    case products.FETCH_ALL_ORDERS_FAILURE:
    case products.CHANGE_ORDER_STATUS_FAILURE:
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
        dispatch({ type: products.FETCH_ALL_PRODUCTS_SUCCESS, payload: {products: response.data, count: response.count} })
      })
        .catch(err => {
          dispatch({ type: products.FETCH_ALL_PRODUCTS_FAILURE })
          toast(err.message)
        })
  }
}

export function createProduct(product) {
  return dispatch => {
    dispatch({type: products.CREATE_PRODUCT});
    return productService.createProduct(product)
      .then(response => {
        dispatch({ type: products.CREATE_PRODUCT_SUCCESS, payload: {product: response.data} });
        toast.success('Product created successful')
      })
        .catch(err => {
          dispatch({ type: products.CREATE_PRODUCT_FAILURE })
          toast(err.message)
        })
  }
}

export function updateProduct(product) {
  return dispatch => {
    dispatch({type: products.UPDATE_PRODUCT});
    return productService.updateProduct(product)
      .then(response => {
        productService.getProductData(product.id)
            .then(data => {
              dispatch({ type: products.UPDATE_PRODUCT_SUCCESS, payload: data})
              toast.success('Product updated successful')
            })
      })
        .catch(err => {
          toast.error(err.message)
          dispatch({ type: products.UPDATE_PRODUCT_FAILURE })
        })
  }
}

export function deleteProduct(id) {
  return dispatch => {
    dispatch({type: products.DELETE_PRODUCT});
    return productService.deleteProduct(id)
      .then(response => {
          dispatch({ type: products.DELETE_PRODUCT_SUCCESS })
          toast.success('Product deleted successful')
      })
        .catch(err => {
          toast.error(err.message)
          dispatch({ type: products.DELETE_PRODUCT_FAILURE })
        })
  }
}

export function addToCart(item, count) {
  return (dispatch, getState) => {
    dispatch({type: products.ADD_TO_CART})
    const {cart} = getState().products;
    const itemIndex = getCartItemIndex(item, cart);
    if (itemIndex === -1) {
      item.count = +count ? +count : 1;
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
          dispatch({type: products.CREATE_ORDER_SUCCESS, payload: {order: response.data}})
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
          dispatch({type: products.FETCH_ALL_ORDERS_SUCCESS, payload: { orders: {...response} }})
        })
        .catch(err => {
          toast.error(err.message);
          dispatch({type: products.FETCH_ALL_ORDERS_FAILURE, payload: {message: err.message}})
        })
  }
}

export function fetchOrderData(id, params) {
  return dispatch => {
    dispatch({type: products.FETCH_ORDER})
    return productService.getOrderData(id, params)
        .then(response => {
          dispatch({type: products.FETCH_ORDER_SUCCESS, payload: { orderData: response.orders }})
        })
        .catch(err => {
          toast.error(err.message);
          dispatch({type: products.FETCH_ORDER_FAILURE, payload: {message: err.message}})
        })
  }
}

export function changeOrderStatus(id) {
  return dispatch => {
    dispatch({type: products.CHANGE_ORDER_STATUS})
    return productService.changeOrderStatus(id)
        .then(response => {
          toast.success(response.message);
          dispatch({type: products.CHANGE_ORDER_STATUS_SUCCESS, payload: { message: response.message }})
        })
        .catch(err => {
          toast.error(err.message);
          dispatch({type: products.CHANGE_ORDER_STATUS_FAILURE, payload: {message: err.message}})
        })
  }
}

export function reset() {
  return dispatch => {
    dispatch({type: 'RESET'})
  }
}