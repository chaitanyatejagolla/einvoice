import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

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
            <FormGroup>
                <div className="row">
                    <div className="col-lg-8">
                        <FormControl type="text" name="desc" onChange={this.onChange} />
                    </div> 
                    <div className="col-lg-2">
                        <FormControl type="text" name="amount" onChange={this.onChange} />
                    </div>
                </div>
            </FormGroup>
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
        this.validate(event.target.name, event.target.value);
        if (event.target.name === "desc") {
            this.props.handleLineItemChange(this.props.id, event.target.value, this.state.amount);
        } else {
            this.props.handleLineItemChange(this.props.id, this.state.desc, event.target.value);
        }
    }

    validate(field, fieldValue) {
        if (field === "desc") {
            return this.validateDesc(fieldValue);
        } else if (field === "amount") {
            return this.validateAmount(fieldValue);
        } else {
            return this.validateDesc(fieldValue) && this.validateAmount(fieldValue);
        }
    };

    validateDesc(fieldValue) {
        if (fieldValue.length > 120) {
            nameError = "Description is too long (Maximum 120 Characters allowed)";
        }
    }

    validateAmount(fieldValue) {
        
    }
}

LineItem.propTypes = {
    id: PropTypes.number.isRequired,
    handleLineItemChange: PropTypes.func.isRequired
}

export default LineItem;
