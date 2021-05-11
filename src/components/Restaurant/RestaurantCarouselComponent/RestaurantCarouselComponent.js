import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Button, Col, Container, Row} from "reactstrap";
import Carousel from "react-multi-carousel";
import {styles} from "../../../config/custom_styles";
import ProductComponent from "../../../containers/productContainer";

const RestaurantCarouselComponent = (props) => {
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
  })

  useEffect(() => {
    props.fetchAllProducts(params);
  },[])

  const addToCart = (product) => {
    props.addToCart(product)
  }

  const renderRestaurantHeader = () => {
    return (
      <h1 className='restaurant-hearer'>
        {props.restaurant.name}
      </h1>
    )
  }

  return (
    <Container>
      {renderRestaurantHeader()}
      <Carousel responsive={styles.CarouselCustomStyles}>
        {
          !!props.restaurant.products && props.restaurant.products.map(product => {
            return <>
              <ProductComponent
                  key={product.id}
                  product={product}
              />
              <Row>
                <div className='d-flex justify-content-center'>
                  <Button color='success' disabled={!!props.cart[0] && props.cart[0].restaurantId !== product.restaurantId} onClick={() => addToCart(product)}>SHOPPING CART</Button>
                </div>
              </Row>
            </>
          })
        }
      </Carousel>
    </Container>
  )
}

export default withRouter(RestaurantCarouselComponent)