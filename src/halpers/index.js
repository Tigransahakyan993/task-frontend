export const getCartItemIndex = (item, cart) => {
  for(let i in cart){
    if (cart[+i].id === item.id) {
      return +i;
    }
  }
  return -1;
}

export const checkUserRole = (user, role) => {
  return user.role === role;
}