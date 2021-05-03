import {Container, Spinner} from "reactstrap";
import React from "react";

function Loader() {
  return (
    <Container className='d-flex min-vh-100 justify-content-center align-items-center'>
      <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" children={''} />
    </Container>
  )
}

export default Loader;