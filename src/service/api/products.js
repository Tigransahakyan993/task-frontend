import baseService from "./base";

export const productService = {

  getAllProducts: (params) => {
    return baseService('products', 'GET', params)
  },

  getProductData: (id) => {
    return baseService(`products/${id}`)
  },

  createProduct: (product) => {
    return baseService(`products`, 'POST', {}, product)
  },

  updateProduct: (product) => {
    return baseService(`products/${product.id}`, 'PUT', {}, product)
  },

  deleteProduct: (id) => {
    return baseService(`products/${id}`, 'DELETE')
  },

  changeOrderStatus: (id) => {
    return baseService(`orders/changeOrderStatus`, 'POST', {}, {id})
  },

  createOrder: (order) => {
    return baseService(`orders`, 'POST', '', order)
  },

  getAllOrders: (params) => {
    return baseService(`orders`, 'GET', params)
  },

  getOrderData: (id) => {
    return baseService(`orders/${id}`, 'GET')
  },
}