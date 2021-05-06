import baseService from "./base";

export const productService = {

  getAllProducts:  (params) => {
    return baseService('products', params)
  },

  getProductData: async (id) => {
    return await baseService(`products/${id}`)
  },
}