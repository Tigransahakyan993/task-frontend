import React from 'react';
import ImageComponent from "../../ImageComponent/ImageComponent";
import {Col, Row, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";

const ProductComponent = (props) => {

  const addToCart = () => {
    props.addToCart(props.product)
  }

    return (
    <Col className='product-item'>
      <Row className='pointer'>
        <div>
          <ImageComponent height='230px' width='100%' src={!!props.product.image ? props.product.image : 'https://i.pinimg.com/originals/a7/b9/5b/a7b95bbd3d9c81f59361d120baf84b12.jpg'}/>
        </div>
        <div className='product-info'>
          <div>
            <p>{props.product.name}</p>
          </div>
          <div>
            <h5>{props.product.price}</h5>
          </div>
        </div>
      </Row>
      <Row>
        <div className='d-flex justify-content-center'>
          <Button color='success' onClick={addToCart}>SHOPPING CART</Button>
        </div>
      </Row>
    </Col>
  )
};

export default withRouter(ProductComponent)