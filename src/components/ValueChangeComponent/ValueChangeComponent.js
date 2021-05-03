import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {Input, Button} from 'reactstrap'

const ValueChangeComponent = (props) => {

  return(
    <div className='value-change-container'>
      <Button onClick={props.decrement}><FontAwesomeIcon icon={faMinus}/></Button>
      <Input className='value-change-input' value={props.value} onChange={() => {}}/>
      <Button onClick={props.increment}><FontAwesomeIcon icon={faPlus}/></Button>
    </div>
  )
}

export default ValueChangeComponent