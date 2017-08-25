import React from 'react';

class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            amount: 0.0,
            desc: ""
        }
        this._bind("onChange")
    }

    
    render () {
        return (
            <div className="form-group row">
                <div className="col-lg-8">
                    <input className="form-control" type="text" name="desc" onChange={this.onChange} />
                </div> 
                <div className="col-lg-2">
                    <input className="form-control" type="text" name="amount" onChange={this.onChange} />
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
            this.props.handleLineItemChange(this.props.id, event.target.value, this.state.amount);
        } else {
            this.props.handleLineItemChange(this.props.id, this.state.desc, event.target.value);
        }
    }
}

export default LineItem;