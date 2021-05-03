import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import {Container} from "reactstrap";
import RestaurantHeaderComponent from './RestaurantHeaderComponent'
import RestaurantBodyComponent from "./RestaurantBodyComponent";
function RestaurantComponent(props) {

  useEffect(() => {
    const restaurantId = props.match.params.id;
    // Todo: fetchRestaurant(restaurantId)

  },[])

  return (
    props.data &&
      <Container className='bg-light'>
        <RestaurantHeaderComponent
          name={props.data.name}
          description={props.data.description}
        />
        <RestaurantBodyComponent
        menu={props.data.menu}
        />
      </Container>
  )
}

export default withRouter(RestaurantComponent)