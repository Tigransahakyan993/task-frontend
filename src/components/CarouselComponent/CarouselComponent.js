import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {styles} from "../../config/custom_styles";
import ProductComponent from "../Products/ProductComponent/ProductComponent";

const CarouselComponent = (props) => {

  return (
    <Carousel responsive={styles.CarouselCustomStyles}>
      {
        !!props.items && props.items.map(item => {
          return <div>
            <ProductComponent
              name={item.name}
              price={item.price}
            />
          </div>
        })
      }
    </Carousel>
  )
}

export default CarouselComponent;