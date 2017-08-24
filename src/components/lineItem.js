import React from 'react';

export default class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            amount: 0.0,
            desc: ""
        }
        this._bind("onAmountChange", "onDescChange")
    }

    
    render () {
        return (
            <div>
                <input type="text" name="desc" onChange={this.onDescChange}/>
                <input type="text" name="amount" onChange={this.onAmountChange}/>
            </div>
        );
    }

    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    onAmountChange(event) {
        let amt = event.target.value;
        let desc = this.state.desc;
        // validate the amount
        if(this.props.handleAmountChange) {
            this.props.handleAmountChange(this.props.id, desc, amt);
        }
    }

    onDescChange(event) {
        let amt = this.state.amount;
        let desc = event.target.value;
        if(this.props.handleAmountChange) {
            this.props.handleAmountChange(this.props.id, desc, amt);
        }
    }
}