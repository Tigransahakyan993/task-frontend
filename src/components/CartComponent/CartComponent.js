import React from 'react';
import {Card, CardText, Button, CardBody, CardTitle} from "reactstrap";
import ImageComponent from '../ImageComponent/ImageComponent'
import {withRouter} from "react-router-dom";

function CardComponent(props) {

  return(
    <Card>
      {props.src && <ImageComponent
        width={props.width}
        height={props.height}
        alt={props.alt}
        src={props.src}
      />}
      <CardBody>
        <CardTitle tag="h5">{!!props.name && props.name}</CardTitle>
        <CardText>{!!props.description && props.description}</CardText>
        <Button onClick={props.onClick}>Click</Button>
      </CardBody>
    </Card>
  )
}

export default withRouter(CardComponent);