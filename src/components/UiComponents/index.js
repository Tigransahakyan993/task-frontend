import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export const InputFiled = (props) => {

    return ( props.type === 'select' ?
      <FormGroup>
        <Label>{props.label}
          <Input type='select'
                 name='Select'
                 onChange={props.onChange}
          >
              {!!props.options && props.options.map((el, i) => <option key={i} value={el}>{el}</option>)}
          </Input>
        </Label>
      </FormGroup>
    :
      <FormGroup>
        <Label style={{'width': '350px'}}>{props.label}
          <Input type={props.type}
                 className="form-control"
                 placeholder={props.placeholder}
                 required=""
                 onChange={props.onChange}
                 invalid={props.required}
          />
          <FormFeedback>{props.required}</FormFeedback>
        </Label>
      </FormGroup>

  )
}