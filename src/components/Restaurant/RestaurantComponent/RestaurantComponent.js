import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import {Container, Row, Col, Table, Button} from "reactstrap";
import Loader from "../../UiComponents/Loader";
import ImageComponent from "../../ImageComponent/ImageComponent";
import ValueChangeComponent from "../../ValueChangeComponent/ValueChangeComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEdit, faTimes,} from "@fortawesome/free-solid-svg-icons";

const RestaurantComponent = (props) => {
    const restaurantId = props.match.params.id;
    const [searchParams, setSearchParams] = useState({
        limit: 10,
        offset: 0,
        restaurantId
    })

  useEffect(() => {
      props.fetchRestaurantData(restaurantId);
      props.fetchAllProducts(searchParams)
  },[])

  const renderTableBody = (products) => {
        return products.map(product => {
            return (
                <tr>
                    <th>
                        <ImageComponent height='40px' width='40px' src={!!product.image ? product.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
                    </th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><FontAwesomeIcon icon={faEye}/></td>
                    <td><FontAwesomeIcon icon={faEdit}/></td>
                    <td><FontAwesomeIcon className='deleteButton' icon={faTimes}/></td>
                </tr>
            )
        })
  }

  const renderRestaurantHeader = () => {
    return (
      <Row>
        <Col>
          <ImageComponent
            src='https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg'
            height='55px'
            width='auto'
          />
        </Col>
        <Col className=''>
          <h5>{props.data.name}</h5>
        </Col>
        <Col className=''>
          <Button>Add Product</Button>
        </Col>
      </Row>
    )
  }

  return (
      <Container className='bg-light mt-2'>
        {renderRestaurantHeader()}
          <Table className='mt-2'>
              <thead>
              <tr>
                  <th>pic</th>
                  <th>name</th>
                  <th>price</th>
              </tr>
              </thead>
              <tbody>
              {!!props.products && renderTableBody(props.products)}
              </tbody>
          </Table>
      </Container>
  )
}

export default withRouter(RestaurantComponent)