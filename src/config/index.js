export const userRole = {
  admin: 'admin',
  owner: 'owner',
  buyer: 'buyer',
}

export default {
  home: {
    path: '/',
    roles: [userRole.buyer, userRole.owner]
  },
  restaurants: {
    path: '/restaurants',
    roles: [userRole.buyer, userRole.owner]
  },
  cart: {
    path: '/cart',
    roles: [userRole.buyer]
  }
}