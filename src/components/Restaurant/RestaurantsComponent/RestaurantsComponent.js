import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {
  Container,
  CardGroup, Row, Col,
} from 'reactstrap';
import RestaurantComponent from './RestaurantItemComponent';
import {restaurants} from '../../../data'


function RestaurantListComponent(props) {

  const [searchParams, setSearchParams] = useState({
    offset: 1,
    limit: 10,
    currentPage: 0
  })

  useEffect(() => {
    // props.fetchAllRestaurants()
  }, [])

  return(
    <Container className='bg-light'>
      <CardGroup>
        <Row xs={3}>
          {
            restaurants.length && restaurants.map((restaurant, index) => {
              return (
                <Col key={index * 10 + 1}
                     className='mt-3'>
                  <RestaurantComponent
                    id={restaurant.id}
                    name={restaurant.name}
                    description={restaurant.description}
                  />
                  </Col>
              )
            })
          }
        </Row>
      </CardGroup>
    </Container>
  )
}

export default withRouter(RestaurantListComponent);