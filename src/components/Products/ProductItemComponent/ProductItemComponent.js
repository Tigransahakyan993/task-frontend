import React, {useEffect, useState} from 'react';
import ImageComponent from "../../ImageComponent/ImageComponent";
import {Col, Row, Container, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import Loader from '../../UiComponents/Loader'
import ValueChangeComponent from '../../ValueChangeComponent/ValueChangeComponent'
import {userRole} from "../../../config";
import {checkUserRole} from "../../../halpers";
import Modal from '../../../containers/AddEditProductModal'

const ProductItemComponent = (props) => {
  const {loading, productData, user} = props;
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const productId = +props.match.params.id;


  useEffect(() => {
    props.fetchProductData(productId);
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
        <Loader />
      </Container>
      :
    <Container>
        <Row className='pt-5'>
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
            {user && checkUserRole(user, userRole.owner) && user.restaurantId === productData.restaurantId &&
              <Row className=''>
                <Col>
                  <Button onClick={() => setIsOpen(!isOpen)}>
                    Edit
                  </Button>
                </Col>
            </Row>}
            {user && checkUserRole(user, userRole.buyer) &&
              <Row>
              <Col>
                <ValueChangeComponent
                    value={count}
                    increment={increment}
                    decrement={decrement}
                />
              </Col>
              <Col>
                <Button onClick={addToCart}
                        disabled={props.cart[0] && props.cart[0].restaurantId !== productData.restaurantId}
                >
                  Add to cart
                </Button>
              </Col>
            </Row>}
          </Col>
        </Row>
      <Modal
          isOpen={isOpen}
          toggle={() => {setIsOpen(!isOpen)}}
          productData={productData}
      />
    </Container>
  )
};

export default withRouter(ProductItemComponent)