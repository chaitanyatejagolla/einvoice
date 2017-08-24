import React from 'react';

export default class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    
    render () {
        return (
            <div>
                <input type="text" name="desc" />
                <input type="text" name="amount" onChange={this.onChange.bind(this)}/>
            </div>
        );
    }

    onChange(event) {
        let amt = event.target.value;
        // validate the amount
        if(this.props.handleAmountChange) {
            this.props.handleAmountChange(amt, this.props.id);
        }
    }
}