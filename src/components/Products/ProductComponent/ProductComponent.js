import React, {useEffect} from 'react';
import ImageComponent from "../ImageComponent/ImageComponent";
import {Col, Row, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";

const ProductComponent = (props) => {

  const addToCart = () => {
    props.addToCart(props.product)
  }

    return (
    <Col>
      <Row className='1'>
        <ImageComponent height='230px' width='200px' src={!!props.image ? props.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
      </Row>
      <Row className='2'>
        <p>name : {` ${props.product.name}`}</p>
      </Row>
      <Row className='3'>
        <p>price : {` ${props.product.price}`}</p>
      </Row>
      {!!props.product.description &&
      <Row className='3'>
        <p>description : {` ${props.product.description}`}</p>
      </Row>}
      <Row className='3'>
        <Col>
          <Button onClick={addToCart}>to cart</Button>
        </Col>
      </Row>
    </Col>
  )
};

export default withRouter(ProductComponent)