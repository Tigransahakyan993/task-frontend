import React, {useState, useEffect} from 'react';
import {withRouter, NavLink} from "react-router-dom";
import {Button, Col, Container, Row} from "reactstrap";
import Carousel from "react-multi-carousel";
import {styles} from "../../../config/custom_styles";
import ProductComponent from "../../../containers/productContainer";
import {checkUserRole}from '../../../halpers';
import {userRole} from '../../../config';


const RestaurantCarouselComponent = (props) => {
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
  })

  useEffect(() => {
    props.fetchAllProducts(params);
    return () => {

    }
  },[])

  const addToCart = (product) => {
    props.addToCart(product)
  }

  const renderRestaurantHeader = () => {
    return (
      <h1 className='restaurant-hearer'>
        <NavLink to={`restaurants/${props.restaurant.id}`}>{props.restaurant.name}</NavLink>
      </h1>
    )
  }

  return (
    <Container>
      {renderRestaurantHeader()}
      <Carousel responsive={styles.CarouselCustomStyles}
                itemClass="carousel-item-padding-5-px"
      >
        {
          !!props.restaurant.products && props.restaurant.products.map(product => {
            return <div className='p-2'>
              <ProductComponent
                  key={product.id}
                  product={product}
              />
              <Row>
                <div className='d-flex justify-content-center'>
                  {!!props.user && checkUserRole(props.user, userRole.buyer) &&
                    <Button color='success'
                           disabled={!!props.cart[0] && props.cart[0].restaurantId !== product.restaurantId}
                           onClick={() => addToCart(product)}>SHOPPING CART</Button>}
                </div>
              </Row>
            </div>
          })
        }
      </Carousel>
    </Container>
  )
}

export default withRouter(RestaurantCarouselComponent)