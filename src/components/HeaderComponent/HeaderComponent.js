import React, {useEffect} from 'react';
import {Col} from "reactstrap";
import {withRouter, NavLink} from "react-router-dom";
import InputSearch from "../UiComponents/InputSearch";
import SettingsDropdown from '../../containers/settingContainer'
import {userRole} from "../../config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

function HeaderComponent(props) {
  const {login, user} = props;

    useEffect(() => {
        // props.fetchAllOrders();
    },[])

 return (
   <div className='headerContainer bg-light'>
     <Col xs={2}>
       <NavLink className='' exact to='/'>Home</NavLink>
     </Col>
     { !!login && <Col className='bg-light'> <NavLink to='restaurants'> Restaurants </NavLink> </Col> }
     { !!login && <Col className='bg-light'> <InputSearch placeholder='Search...'/></Col> }
     { !!login && user && user.role === userRole.owner &&  <Col className='bg-light'> <NavLink to={`restaurants/${user.id}`}> MyRestaurant </NavLink> </Col> }
     { !!login && <Col className='bg-light'><NavLink to='orders'> Orders </NavLink> </Col> }
     { !!login && <Col className='bg-light'><NavLink to='cart'> <FontAwesomeIcon  icon={faShoppingCart} size='lg'/>{props.cart.length ? props.cart.length : ''} </NavLink> </Col> }
     { !!login && <Col className='bg-light'> <SettingsDropdown /> </Col> }
   </div>
 )
}

export default withRouter(HeaderComponent);
