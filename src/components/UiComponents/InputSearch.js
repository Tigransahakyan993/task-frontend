import React, {useEffect, useState} from 'react';
import { debounce } from 'throttle-debounce';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {InputGroup, Input, InputGroupAddon, InputGroupText, Row, Col} from "reactstrap";
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchComponent = (props) => {
    // const [restaurants, set]

    return (
      <Autocomplete
          freeSolo
          id="restaurantSearchAutocomplete"
          style={{ width: 300, 'background-color': 'white'}}
          options={[{title: 'title'}, {title: 'aranc title'}]}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          renderOption={(option) => {
              console.log(option);
              return option.title.toString()
          }}
      />
  )
}

export default SearchComponent;