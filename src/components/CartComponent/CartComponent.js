import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import { Container, Col, Table, Button } from 'reactstrap';
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

  const AddOrder = () => {
    const {cart} = props;
    const order = {
      restaurantId: cart[0].restaurantId,
    };

    order.orderItems = cart.reduce((prev, next) => {
      const item = {
        id: next.id,
        count: next.count,
      };
      prev.push(item);
      return prev;
    }, []);

    props.createOrder(order);
  }

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
      <Col>
        <div className='d-flex flex-row-reverse'>
          <Button onClick={AddOrder} color='success'>Add Order</Button>
        </div>
      </Col>
    </Container>
  )
}

export default withRouter(CartComponent);