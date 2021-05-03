import React from 'react';
import {CardImg} from "reactstrap";

function ImageComponent(props) {

  return (
    <CardImg style={{'height': props.height, 'width': props.width}} src={props.src} alt={props.alt}/>
  )
}

export default ImageComponent;