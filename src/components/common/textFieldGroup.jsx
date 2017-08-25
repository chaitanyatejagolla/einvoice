import React from 'react';

const TextFieldGroup = ({ field, value, label, type, onChange, placeholder }) => {
  return (
        <div className="form-group row">
            <div className="col-lg-1">
                <label>{label}</label>
            </div>
            <div className="col-lg-4">
                <input 
                    type={value} 
                    className="form-control" 
                    name={field} 
                    placeholder={placeholder}
                    onChange={onChange} 
                    value={value}
                />
            </div>
        </div>
    );
}


export default TextFieldGroup;