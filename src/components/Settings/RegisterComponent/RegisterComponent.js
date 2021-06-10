import React, {useState, useEffect} from 'react';
import {InputFiled} from '../../UiComponents'
import {withRouter} from "react-router-dom";
import {
  Container, Col, Button, Row
} from 'reactstrap';
import { toast } from 'react-toastify';
import {auth} from '../../../config/CONSTANTS'
import RegistrationConfirmPage from "../../UiComponents/RegistrationComfirmPage";
import Loader from "../../UiComponents/Loader";

function RegistrationComponent(props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'buyer'
  });

  const [requiredFiled, setRequiredFiled] = useState({})

  useEffect(() => {
    if (props.message === auth.REGISTRATION_SUCCESS) {
      toast('You are registered on this page, please sign in')
      setIsRegistered(true)
    }
  }, [props.message])

  const onFiledValueChange = (name, value) => {
    setLoginInfo(prevState => { return {...prevState, [name]: value}})
  }

  const handleSubmit = () => {
    const {first_name, last_name, email, password, confirmPassword} = loginInfo;
    let isRequired = false;
    const errors = {};

    if (!first_name) {
      isRequired = true;
      errors.first_name = 'Required';
    }
    if (!last_name) {
      isRequired = true;
      errors.last_name = 'Required';
    }
    if (!email) {
      isRequired = true;
      errors.email = 'Required';
    } else {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email.toLowerCase())) {
        errors.email = 'Wrong Email';
        isRequired = true;
      }
    }
    if (!password) {
      isRequired = true;
      errors.password = 'Required';
    }
    if (!confirmPassword) {
      isRequired = true;
      errors.confirmPassword = 'Required';
    }
    else if (confirmPassword !== password) {
      isRequired = true;
      errors.confirmPassword = 'Password mismatch';
    }
    if (isRequired) {
      setRequiredFiled(errors);
      return
    }
    props.register(loginInfo)
  }

  const renderFormHeader = () => {
    return (
      <Row>
        <h1>Registration</h1>
      </Row>
    )
  }

  return (
      !!props.loading ?
          <Container>
              <Loader />
          </Container>
          :
      <>
        {
          !!isRegistered ?
              <RegistrationConfirmPage />
              :
              <Container className='d-flex mt-3 min-vh-100 bg-light'>
                {renderFormHeader()}

                <Row className='d-flex mt-3 align-items-center justify-content-center min-vh-100 bg-light'>
                  <form>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'text'}
                          label={'first_name'}
                          placeholder={'John'}
                          onChange={(e) => {onFiledValueChange('first_name', e.target.value)}}
                          required={requiredFiled.first_name}
                      />
                    </Col>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'text'}
                          label={'last_name'}
                          placeholder={'Doe'}
                          onChange={(e) => {onFiledValueChange('last_name', e.target.value)}}
                          required={requiredFiled.last_name}
                      />
                    </Col>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'email'}
                          label={'email'}
                          placeholder={'user@email.com'}
                          onChange={(e) => {onFiledValueChange('email', e.target.value)}}
                          required={requiredFiled.email}
                      />
                    </Col>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'password'}
                          label={'password'}
                          placeholder={'*****'}
                          onChange={(e) => {onFiledValueChange('password', e.target.value)}}
                          required={requiredFiled.password}
                      />
                    </Col>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'password'}
                          label={'confirm password'}
                          placeholder={'*****'}
                          onChange={(e) => {onFiledValueChange('confirmPassword', e.target.value)}}
                          required={requiredFiled.confirmPassword}
                      />
                    </Col>
                    <Col className='mb-3'>
                      <InputFiled
                          type={'select'}
                          label={'role'}
                          options={['buyer', 'owner']}
                          onChange={(e) => {onFiledValueChange('role', e.target.value)}}
                          required={requiredFiled.role}
                      />
                    </Col>
                    <Col className='mt-1'>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </Col>
                  </form>
                </Row>
              </Container>
        }
        </>
    )
}

export default withRouter(RegistrationComponent);