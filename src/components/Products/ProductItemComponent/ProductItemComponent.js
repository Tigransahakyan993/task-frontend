import React, {useEffect, useState} from 'react';
import ImageComponent from "../../ImageComponent/ImageComponent";
import {Col, Row, Container, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import Loader from '../../UiComponents/Loader'
import ValueChangeComponent from '../../ValueChangeComponent/ValueChangeComponent'

const ProductItemComponent = (props) => {
  const {productId = '', productData = {}, loading} = props;

  const [count, setCount] = useState(1);

  useEffect(() => {
    props.fetchProductData(productId);
    return () => {
      props.reset();
    }
  }, [productId])

  const addToCart = () => {
    props.addToCart(productData, count)
  }

  const increment = () => {
    if (count < 99) {
      setCount(count + 1);
    }
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    !!loading ?
      <Container>
        <Loader className=''/>
      </Container>
      :
    <Container>
        <Row>
          <Col>
            <ImageComponent height='400px' width='400px' src={!!productData.image ? productData.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
          </Col>
          <Col>
            <Row>
              <Col><h5>Name</h5></Col>
              <Col><h4>{productData.name}</h4></Col>
            </Row>
            <Row>
              <Col><h5>Price</h5></Col>
              <Col><h4>{productData.price}</h4></Col>
            </Row>
            <Row className=''>
              <Col><h5>Description</h5></Col>
              <Col><h4>{productData.description}</h4></Col>
            </Row>
            <Row>
              <Col>
                <ValueChangeComponent
                  value={count}
                  increment={increment}
                  decrement={decrement}
                />
              </Col>
              <Col>
                <Button onClick={addToCart}>
                  Add to cart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )
};

export default withRouter(ProductItemComponent)