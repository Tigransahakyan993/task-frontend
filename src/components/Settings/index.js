import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const SettingsComponent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const logout = () => {
    props.logout();
  }
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <FontAwesomeIcon icon={faUser}/>
      </DropdownToggle>
      <DropdownMenu>
        {!!props.user &&
        <DropdownItem header>{props.user.first_name}</DropdownItem>
        }
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default withRouter(SettingsComponent);