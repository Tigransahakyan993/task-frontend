import React, {useState, useEffect} from 'react';
import {Col, Row} from "reactstrap";
import {withRouter, NavLink} from "react-router-dom";
import InputSearch from "../UiComponents/InputSearch";
import SettingsDropdown from '../../containers/settingContainer'
import {userRole} from "../../config";

function HeaderComponent(props) {
  const [length, setLength] = useState(0);
  const {token, user} = props;

    useEffect(() => {
    setLength(props.cart.length)
    }, [length])

    useEffect(() => {
        // !token && props.history.push('/login')
    },[])

 return (

   <div className='headerContainer bg-light'>
     <Col xs={2}>
       <NavLink className='' exact to='/'>Home</NavLink>
     </Col>
     { !!token && <Col className='bg-light'> <NavLink to={`restaurants`}> Restaurants </NavLink> </Col> }
     { !!token && <Col className='bg-light'> <InputSearch placeholder='Search...'/> </Col> }
     { !!token && user && user.role === userRole.owner &&  <Col className='bg-light'> <NavLink to={`restaurants/${user.id}`}> MyRestaurant </NavLink> </Col> }
     { !!token && <Col className='bg-light'> <SettingsDropdown /> </Col> }
   </div>
 )
}

export default withRouter(HeaderComponent);
