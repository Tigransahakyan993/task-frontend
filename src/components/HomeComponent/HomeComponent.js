import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Container} from 'reactstrap'
import LoginComponent from '../../containers/logInContainer'

function HomeComponent(props) {

  const {token, user} = props;

  // useEffect(() => {
  //   if (!!props.token && !props.user) {
  //     props.getCurrentUser()
  //   }
  // })

  return(
    <Container className='min-vh-100'>
      {
        !token ?
            <LoginComponent />
            :
            <div className='pt-5'>
              <h1>
                {!!user && `Welcome ${user.first_name} ${user.last_name}`}
              </h1>
            </div>
      }
    </Container>
  )
}

export default withRouter(HomeComponent);