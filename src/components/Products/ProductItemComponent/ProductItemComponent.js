import React, {useEffect} from 'react';
import ImageComponent from "../../ImageComponent/ImageComponent";
import {Col, Row, Container} from 'reactstrap';
import {withRouter} from "react-router-dom";
import Loader from '../../UiComponents/Loader'

const ProductItemComponent = (props) => {
  const {productId, productData, loading} = props;

  useEffect(() => {
    props.fetchProductData(productId);
  }, [productId])

  const addToCart = () => {
    props.addToCart(props.productData)
  }

  return (
    !!loading ?
      <Container>
        <Loader className=''/>
      </Container>
      :
    <Container>
        <Row className='1'>
          <Col>
            <ImageComponent height='400px' width='400px' src={!!productData.image ? productData.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
          </Col>
          <Col>
            <Row>
              <h5>{`name : ${productData.name}`}</h5>
            </Row>
            <Row>
              <h5>{`description : ${productData.description}`}</h5>
            </Row>
            <Row>
              <h5>{`price : ${productData.price}`}</h5>
            </Row>
          </Col>
        </Row>
    </Container>
  )
};

export default withRouter(ProductItemComponent)