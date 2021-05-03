import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {Container, Row, Col} from "reactstrap";
import Loader from "../../UiComponents/Loader";
import ImageComponent from "../../ImageComponent/ImageComponent";

function RestaurantComponent(props) {

  // useEffect(() => {
  //   const restaurantId = props.user.restaurant.id;
  //   props.fetchRestaurantData(restaurantId);
  // },[props.match.params.id])

  const renderRestaurantHeader = () => {
    return (
      <div className='d-flex flex-row'>
        <div>
          <ImageComponent
            src='https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg'
            height='55px'
            width='auto'
          />
        </div>
        <div className=''>
          <h5>Restaurant</h5>
        </div>
      </div>
    )
  }

  return (
      <Container className='bg-light'>
        {renderRestaurantHeader()}

      </Container>
  )
}

export default withRouter(RestaurantComponent)