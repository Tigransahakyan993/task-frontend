import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Container} from "reactstrap";
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

  const renderRestaurantHeader = () => {
    return (
      <h1>
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
            return <ProductComponent
                key={product.id}
                product={product}
            />
          })
        }
      </Carousel>
    </Container>
  )
}

export default withRouter(RestaurantCarouselComponent)