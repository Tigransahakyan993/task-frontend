import React, {useEffect} from 'react';
import {Col} from "reactstrap";
import {withRouter, NavLink} from "react-router-dom";
import InputSearch from "../UiComponents/InputSearch";
import SettingsDropdown from '../../containers/settingContainer'
import {userRole} from "../../config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";


function HeaderComponent(props) {
  const {token, user} = props;

    useEffect(() => {
        // props.fetchAllOrders();
    },[])

 return (

   <div className='headerContainer bg-light'>
     <Col xs={2}>
       <NavLink className='' exact to='/'>Home</NavLink>
     </Col>
     { !!token && <Col className='bg-light'> <NavLink to='restaurants'> Restaurants </NavLink> </Col> }
     { !!token && <Col className='bg-light'> <InputSearch placeholder='Search...'/></Col> }
     { !!token && user && user.role === userRole.owner &&  <Col className='bg-light'> <NavLink to={`restaurants/${user.id}`}> MyRestaurant </NavLink> </Col> }
     { !!token && <Col className='bg-light'><NavLink to='orders'> Orders </NavLink> </Col> }
     { !!token && <Col className='bg-light'><NavLink to='cart'> <FontAwesomeIcon  icon={faShoppingCart} size='lg'/>{props.cart.length ? props.cart.length : ''} </NavLink> </Col> }
     { !!token && <Col className='bg-light'> <SettingsDropdown /> </Col> }
   </div>
 )
}

export default withRouter(HeaderComponent);
