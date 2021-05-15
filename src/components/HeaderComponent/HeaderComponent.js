import React, {useEffect, useState} from 'react';
import {Col} from "reactstrap";
import {withRouter, NavLink} from "react-router-dom";
import SettingsDropdown from '../../containers/settingContainer'
import {userRole} from "../../config";
import { debounce } from 'throttle-debounce';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";

function HeaderComponent(props) {
  const {login, user, searchingList} = props;

  const [searchParams, setSearchParams] = useState({
      limit: 10,
      filters: {
          name: ''
      }
  });

    useEffect(() => {
        props.fetchSearchingList(searchParams);
    },[searchParams])

    useEffect(() => {
        if (!login) {
            props.history.push('/login')
        }
    },[login])

    const searchRestaurantList = debounce(300, (value) => {
        setSearchParams((prevState) => {
            return {
                ...prevState,
                filters: {
                    name: value
                }
            }
        })
    })

 return (
   <div className='headerContainer bg-light'>
     <Col xs={2}>
       <NavLink className='' exact to='/'>Home</NavLink>
     </Col>
       { !!login && <Col className='bg-light'><NavLink to='/restaurants'> Restaurants </NavLink></Col> }
       { !!login && user && user.role === userRole.owner &&  <Col className='bg-light'><NavLink to={'/restaurants/' + user.restaurantId}> MyRestaurant </NavLink></Col> }
       { !!login && <Col className='bg-light'><
        Autocomplete
           freeSolo
           id="restaurantSearchAutocomplete"
           style={{ width: 300, 'background-color': 'white'}}
           options={searchingList}
           onChange={(event, value) => {
               !!value && !!value.id && props.history.push(`restaurants/${value.id}`);
           }}
           getOptionLabel={(option) =>  {return option.name ? option.name : ''}}
           renderInput={(params) => {
               return <TextField
                   {...params}
                   variant="outlined"
                   onChange={(e) => {searchRestaurantList(e.target.value)}}
               />
           }}
           renderOption={(option) => option.name}
        />
       </Col> }
       { !!login && <Col className='bg-light'><NavLink to='/orders'> Orders </NavLink></Col> }
       { !!login && <Col className='bg-light'><NavLink to='/cart'><FontAwesomeIcon  icon={faShoppingCart} size='lg'/> {props.cart.length ? props.cart.length : ''} </NavLink></Col> }
       { !!login && <Col className='bg-light'><SettingsDropdown /></Col> }
   </div>
 )
}

export default withRouter(HeaderComponent);
