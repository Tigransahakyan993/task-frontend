import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export const InputFiled = (props) => {

    return ( props.type === 'select' ?
      <FormGroup className={props.className}>
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
      <FormGroup className={props.className}>
        <Label style={{'width': '350px'}}>
            {props.isRequired && props.label + '*'}
          <Input type={props.type}
                 value={props.value}
                 className="form-control"
                 placeholder={props.placeholder}
                 onChange={props.onChange}
                 invalid={!!props.required}
          />
          <FormFeedback>{props.required}</FormFeedback>
        </Label>
      </FormGroup>

  )
}