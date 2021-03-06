import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { Container,Form } from 'reactstrap';
import { InputFiled } from "../../UiComponents";
import Loader from "../../UiComponents/Loader";
import { toast } from "react-toastify";
import {auth} from "../../../config/CONSTANTS";

function LoginComponent(props) {

                                                    // underline for right Request
  const [loginInfo, setLoginInfo] = useState({email: '_', password: '_'});

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!!token) {
      props.history.push('/')
    }
  }, [])

  useEffect(() => {
    props.message === auth.LOGIN_FAILURE && toast.error('Wrong email or password')
  }, [props.message])

  useEffect(() => {
    !!props.login && props.history.push('/')
  }, [props.login])

  const onFiledValueChange = (name, value) => {
    setLoginInfo((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    props.login(loginInfo);
  }

  return (
      !!props.loading ?
      <Container>
        <Loader />
      </Container>
          :
    <Container className='d-flex align-items-center justify-content-center mt-3 min-vh-100 bg-light'>
      <Form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <InputFiled
            type={'email'}
            placeholder={'Email address'}
            onChange={(e) => {onFiledValueChange('email', e.target.value)}}
            required={''}
            className='pt-2'
        />
        <InputFiled
            type={'password'}
            placeholder={'Password'}
            onChange={(e) => {onFiledValueChange('password', e.target.value)}}
            required={''}
            className='pt-3'
        />

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button type="submit" className="w-100 btn btn-lg btn-primary">Sign in</button>
        <p className="mt-5 mb-3 pointer" onClick={() => {props.history.push('registration')}}>Registration Now</p>
      </Form>
    </Container>
  )
}

export default withRouter(LoginComponent);