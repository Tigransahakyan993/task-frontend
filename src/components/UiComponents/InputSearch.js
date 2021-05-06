import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {InputGroup, Input, InputGroupAddon, InputGroupText, Row, Col} from "reactstrap";
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchComponent = (props) => {
  return (
      <InputGroup>
        <Input
        placeholder={props.placeholder}
        />
        <InputGroupAddon>
          <InputGroupText>
            <div><FontAwesomeIcon icon={faSearch} size='lg' className='svg-inline--fa search'/></div>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
  )
}

export default SearchComponent;