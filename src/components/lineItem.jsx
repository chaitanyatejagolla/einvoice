import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
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
            <div className="row">
                <div className = "col-lg-8">
                    <FormGroup validationState={this.state.descError.length>0 ? 'error' : null}>
                        <FormInput
                            name = "desc"
                            type = "text"
                            onChange = {this.onChange}
                            value = {this.state.desc}
                            placeholder = "Description of Line Item"
                            error = {this.state.descError}
                        />
                    </FormGroup>
                </div>
                <div className = "col-lg-2">
                    <FormGroup validationState={this.state.amountError.length>0 ? 'error' : null}>
                        <FormInput
                            name = "amount"
                            type = "number"
                            onChange = {this.onChange}
                            value = {this.state.amount}
                            placeholder = "Amount"
                            error = {this.state.amountError}
                        />
                    </FormGroup>
                </div>
            </div>
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
        if (fieldValue > 9999999.99 || fieldValue < 1.00) {
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
