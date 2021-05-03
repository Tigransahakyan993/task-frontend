import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {
  Container,
} from 'reactstrap';

function LoginComponent(props) {

  const [loginInfo, setLoginInfo] = useState({email: '', password: ''})

  const onFiledValueChange = (name, value) => {
    console.log(name, value)
    setLoginInfo((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = () => {
    console.log('login',props.login);
    props.login(loginInfo);
  }

  return (
   <Container className='d-flex align-items-center justify-content-center mt-3 min-vh-100 bg-light'>
     <form>
         <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
         <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
         <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                autoFocus=""
                onChange={(e) => {onFiledValueChange('email', e.target.value)}}
         />
           <label htmlFor="inputPassword" className="visually-hidden">Password</label>
           <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required=""
                  onChange={(e) => {onFiledValueChange('password', e.target.value)}}
           />
             <div className="checkbox mb-3">
               <label>
                 <input type="checkbox" value="remember-me" /> Remember me
               </label>
             </div>
             <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
             <p className="mt-5 mb-3 pointer" onClick={handleSubmit}>Registration Now</p>
     </form>
   </Container>
  )

}

export default withRouter(LoginComponent);