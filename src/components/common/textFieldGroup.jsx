import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const TextFieldGroup = ({ field, value, label, type, error, onChange, placeholder }) => {
  return (
        <FormGroup controlId="formValidationError1" validationState={error.length>0 ? 'error' : null}>
            <div className="row">
                <div className="col-lg-1">
                    <label>{label}</label>
                </div>
                <div className="col-lg-4">
                    <FormControl 
                        type={value}
                        name={field} 
                        placeholder={placeholder}
                        onChange={onChange} 
                        value={value}
                    />
                    <ControlLabel>{error}</ControlLabel>
                </div>
            </div>
        </FormGroup>
    );
}

TextFieldGroup.PropTypes = {
    field: PropTypes.string.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextFieldGroup;
