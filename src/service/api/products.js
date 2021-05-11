import baseService from "./base";

export const productService = {

  getAllProducts:  (params) => {
    return baseService('products', 'GET', params)
  },

  getProductData: async (id) => {
    return await baseService(`products/${id}`)
  },

  createOrder: async (order) => {
    return await baseService(`orders`, 'POST', '', order)
  },

  getAllOrders: async (params) => {
    return await baseService(`orders`, 'GET', params)
  },
}