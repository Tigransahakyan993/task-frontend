import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import Modal from 'react-modal';
import "react-multi-carousel/lib/styles.css";
import {Container} from 'reactstrap';
import Loader from '../../UiComponents/Loader'
import RestaurantCarouselComponent from "../../../containers/restaurantCarouseContainer";
Modal.setAppElement('#root');

function RestaurantsComponent(props) {
  const params = {
    offset: 0,
    limit: 10
  };

  const [toggle, setToggle] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    props.fetchAllRestaurants(params)
  }, [])

  return(
    !!props.loading ?
     <Loader />
      :
    <Container>
      {props.restaurants && props.restaurants.map((restaurant) => {
        return (
            <RestaurantCarouselComponent
              key={restaurant.id}
              restaurant={restaurant}
            />
        )
      })}

    </Container>
  )
}

export default withRouter(RestaurantsComponent);