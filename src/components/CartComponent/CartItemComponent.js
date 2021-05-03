import React, {useState, useEffect} from 'react';
import ImageComponent from '../ImageComponent/ImageComponent';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import ValueChangeComponent from '../ValueChangeComponent/ValueChangeComponent'
import {withRouter} from "react-router-dom";

const CartItemComponent = (props) => {

  const [total, setTotal] = useState('');
  const [itemCount, setItemCount] = useState(props.item.count);

  useEffect(() => {
    const {count, price} = props.item;
    const totalPrice = parseInt(count) * parseInt(price);

    setTotal(totalPrice)
  }, [props.item.count])

  const increment = () => {
    if (itemCount < 99) {
      setItemCount(itemCount + 1);
      props.item.count++;
    }

  }

  const decrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      props.item.count--;
    } else {
      props.deleteWithCart(props.item)
    }
  }

  return(
    <tr>
      <th>
          <ImageComponent height='40px' width='40px' src={!!props.item.image ? props.item.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
      </th>
      <td>{props.item.name}</td>
      <td>{props.item.price}</td>
      <td>
        <ValueChangeComponent
          value={itemCount}
          increment={increment}
          decrement={decrement}
      />
      </td>
      <td>{total}</td>
      <td><FontAwesomeIcon className='deleteButton fa-lg' icon={faTimes} onClick={() => {props.deleteWithCart(props.item)}}/></td>
    </tr>
  )
}

export default withRouter(CartItemComponent);