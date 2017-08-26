import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FormInput from './formInput.jsx';
import FormLabel from './formLabel.jsx';

const InputLabelGroup = ({ name, value, label, type, error, onChange, placeholder }) => {
  return (
        <FormGroup controlId="formValidationError1" validationState={error.length>0 ? 'error' : null}>
            <div className="row">
                <FormLabel
                    className = "col-lg-1"
                    label = {label}
                />
                <FormInput
                    className = "col-lg-4"
                    error= {error}
                    type={value}
                    name={name} 
                    placeholder={placeholder}
                    onChange={onChange} 
                    value={value}
                />
            </div>
        </FormGroup>
    );
}

InputLabelGroup.PropTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default InputLabelGroup;
