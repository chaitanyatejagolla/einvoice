import React from 'react';

export default class Total extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount
        }
    }
    render () {
        return (
            <div>
                <label>
                    TOTAL   ${this.state.amount}
                </label>
            </div>
        );
    }
}