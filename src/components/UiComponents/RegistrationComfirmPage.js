import React from 'react';
import { NavLink } from 'react-router-dom';

const RegistrationConfirmPage = (props) => {

    return (
        <div className='registration-success'>
            <h1>You are registered on this page, please sign in</h1>
            <NavLink to='/login'>SingIn</NavLink>
        </div>
    )
}

export default RegistrationConfirmPage;