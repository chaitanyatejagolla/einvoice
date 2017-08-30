import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';
import FormLabel from './common/formLabel.jsx';
import FormInput from './common/formInput.jsx';

class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            amount: 0.0,
            desc: "",
            descError: "",
            amountError: "",
        }
        this._bind("onChange")
    }

    
    render () {
        return (
                <tr>
                    <td>
                        <FormLabel
                            label={this.props.id}
                            className = "col-md-2 col-xs-1"
                        />
                    </td>
                    <td> 
                        <FormGroup validationState={this.state.descError.length>0 ? 'error' : null}>
                            <div className = "row">
                                <FormInput
                                    name = "desc"
                                    type = "text"
                                    className = "col-md-10"
                                    onChange = {this.onChange}
                                    value = {this.state.desc}
                                    placeholder = ""
                                    error = {this.state.descError}
                                />
                            </div>
                        </FormGroup>
                    </td>
                    <td>  
                        <FormGroup validationState={this.state.amountError.length>0 ? 'error' : null}>
                            <div className = "row">
                                <FormInput
                                    name = "amount"
                                    type = "number"
                                    className = "col-xs-8"
                                    onChange = {this.onChange}
                                    value = {this.state.amount}
                                    placeholder = ""
                                    error = {this.state.amountError}
                                />
                            </div>
                        </FormGroup>
                    </td>
                </tr>
        );
    }

    /* Utility method to bind all functions */
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    /* On change handler for amount and description */
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.name === "desc") {
            this.props.handleLineItemChange(this.props.id, event.target.value, this.state.amount, this.validate(event.target.name, event.target.value));
        } else {
            this.props.handleLineItemChange(this.props.id, this.state.desc, event.target.value, this.validate(event.target.name, event.target.value));
        }
    }

    /*Common Validation  Method*/
    validate(field, fieldValue) {
        if (field === "desc") {
            return this.validateDesc(fieldValue);
        } else {
            return this.validateAmount(parseFloat(fieldValue));
        }
    };

    /* Validation for description */
    validateDesc(fieldValue) {
        let descError = "";
        if (fieldValue.length > 50) {
            descError = "Description is too long (Maximum 50 Characters allowed)";
        }
        this.setState({
            descError: descError
        });
        return (descError.length < 1);
    }

    /* Validation for amount */
    validateAmount(fieldValue) {
        let amountError = "";
        if (fieldValue > 9999999.99 || fieldValue < 0) {
            amountError = "Amount range is 1.00 to 9999999.99";
        }
        this.setState({
            amountError: amountError
        });
        return (amountError.length < 1);
    }
}

LineItem.propTypes = {
    id: PropTypes.number.isRequired,
    handleLineItemChange: PropTypes.func.isRequired
}

export default LineItem;
