import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl } from 'react-bootstrap';

const FormInput = ({ className, type, name, placeholder, onChange, value, error }) => {
  return (
        <div className={className}>
            <FormControl 
                type={value}
                name={name} 
                placeholder={placeholder}
                onChange={onChange} 
                value={value}
            />
            <ControlLabel>{error}</ControlLabel>
        </div>
    );
}

FormInput.PropTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FormInput;
