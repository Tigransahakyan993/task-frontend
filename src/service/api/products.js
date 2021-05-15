import baseService from "./base";

export const productService = {

  getAllProducts: (params) => {
    return baseService('products', 'GET', params)
  },

  getProductData: (id) => {
    return baseService(`products/${id}`)
  },

  createOrder: (order) => {
    return baseService(`orders`, 'POST', '', order)
  },

  getAllOrders: (params) => {
    return baseService(`orders`, 'GET', params)
  },
}