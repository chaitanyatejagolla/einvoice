import React from 'react';
import LineItem from './lineitem';
import SendButton from './sendButton';
import Total from './total';

export default class Invoice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, amount: 0}]
        };
    }

    render () {
        let lineItemsUI = [];
        for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
            lineItemsUI.push(<LineItem handleAmountChange={this.handleAmountChange.bind(this)} id={i}/>);
        };
        return (
            <div>
                <div>
                    <label>
                            Name:
                        <input type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                            Email:
                        <input type="email" name="email" />
                    </label>
                </div>
                <div>
                    <label>
                            Due Date:
                        <input type="date" name="date" />
                    </label>
                </div>
                <div>
                    <input type="button" name="add" value="Add" onClick={this.addLineItem.bind(this)}/>
                </div>
                <div>
                    <label>
                        Description
                        Amount 
                    </label>
                    {lineItemsUI}
                </div>
                <div>
                    <label>
                        TOTAL   ${this.state.total}
                    </label>
                </div>
                <div>
                    <SendButton />
                </div>
            </div>
        );
    }

    handleAmountChange(amt, id) {
        let totalAmt = 0;
        this.state.lineItemsArray.forEach(function(amountObj) {
            if(id === amountObj.id) {
                if(amt === "") {
                    amt = 0;
                }
                amountObj.amount = amt; 
            }
            totalAmt += parseInt(amountObj.amount); 
        });
        this.setState({
            total: totalAmt
        });
    }

    addLineItem() {
        this.setState({
            lineItemCount: this.state.lineItemCount + 1
        });
        this.state.lineItemsArray.push({id: this.state.lineItemCount, amount: 0});
    }
}