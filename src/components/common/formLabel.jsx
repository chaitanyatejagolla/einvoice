import React from 'react';
import PropTypes from 'prop-types';

const FormLabel = ({ label, className }) => {
  return (
        <div className={className}>
            <label>{label}</label>
        </div>
    );
}

FormLabel.PropTypes = {
    label: PropTypes.string
}

export default FormLabel;
