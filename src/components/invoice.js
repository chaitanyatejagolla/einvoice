import React from 'react';
import LineItem from './lineitem';
import SendButton from './sendButton';
import Total from './total';

export default class Invoice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            date: "",
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0,desc: "", amount: 0}]
        };
        this._bind("onNameChange", "onEmailChange", "onDateChange", "addLineItem", "saveData")
    }

    render () {
        let lineItemsUI = [];
        for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
            lineItemsUI.push(<LineItem handleAmountChange={this.handleAmountChange.bind(this)} id={i}/>);
        };
        return (
            <div>
                <div>
                    <label className="inputLabel">
                            Name:
                        <input type="text" name="name" onChange={this.onNameChange} value={this.state.name}/>
                    </label>
                </div>
                <div>
                    <label>
                            Email:
                        <input type="email" name="email" onChange={this.onEmailChange} value={this.state.email}/>
                    </label>
                </div>
                <div>
                    <label>
                            Due Date:
                        <input type="date" name="date" onChange={this.onDateChange} value={this.state.date}/>
                    </label>
                </div>
                <div>
                    <input type="button" name="add" value="Add" onClick={this.addLineItem}/>
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
                    <input type="button" name="send" value="SEND" onClick={this.saveData}/>
                </div>
            </div>
        );
    }

    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    onNameChange(event) {
        this.setState({
                name: event.target.value
        });
    }

    onEmailChange(event) {
        this.setState({
                email: event.target.value
        });
    }

    onDateChange(event) {
        this.setState({
                date: event.target.value
        });
    }

    saveData() {
        alert(this.state.name);
    }

    handleAmountChange(id, desc, amt) {
        let totalAmt = 0;
        let tempArray = this.state.lineItemsArray;
        this.state.lineItemsArray.forEach(function(amountObj) {
            if(id === amountObj.id) {
                if(amt === "") {
                    amt = 0;
                }
                amountObj.amount = amt; 
                amountObj.desc = desc; 
            }
            totalAmt += parseInt(amountObj.amount); 
        });
        this.setState({
            total: totalAmt,
            lineItemsArray: tempArray
        });
    }

    addLineItem() {
        this.setState({
            lineItemCount: this.state.lineItemCount + 1
        });
        this.state.lineItemsArray.push({id: this.state.lineItemCount, amount: 0});
    }
}