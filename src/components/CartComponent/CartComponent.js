import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import { Container } from "reactstrap";
import { Table } from 'reactstrap';
import CartItemComponent from './CartItemComponent';

const CartComponent = (props) => {

  const renderCartItems = (cart = []) => {
    return cart.map(item => {
      return (
        <CartItemComponent
          key={item.id}
          item={item}
          deleteWithCart={props.deleteWithCart}
        />
      )
    })
  }

  useEffect(() => {})

  return(
    !props.cart.length ?
      <Container>
      <h1>Empty cart</h1>
      </Container>
      :
    <Container>
      <Table>
        <thead>
        <tr>
          <th>pic</th>
          <th>name</th>
          <th>price</th>
          <th>count</th>
          <th>total</th>
        </tr>
        </thead>
        <tbody>
        {!!props.cart && renderCartItems(props.cart)}
        </tbody>
      </Table>
    </Container>
  )
}

export default withRouter(CartComponent);