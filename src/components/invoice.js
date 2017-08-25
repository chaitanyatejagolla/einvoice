import React from 'react';
import LineItem from './lineitem';
var axios = require('axios');

export default class Invoice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            date: "",
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        };
        this._bind("onNameChange", "onEmailChange", "onDateChange", "addLineItem", "saveData")
    }

    render () {
        var style = {
            background: "#eee",
            padding: "20px"
        };

        let lineItemsUI = [];
        for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
            lineItemsUI.push(<LineItem handleAmountChange={this.handleAmountChange.bind(this)} id={i}/>);
        };
        return (
            <div className="container-fluid" style={style}>
                <div className="form-group row">
                    <div className="col-lg-1">
                        <label> Name:</label>
                    </div>
                    <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder='Your name' name="name" onChange={this.onNameChange} value={this.state.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-1">
                        <label> Email:</label>
                    </div>
                    <div className="col-lg-4">
                        <input type="email" className="form-control" placeholder='email' name="email" onChange={this.onEmailChange} value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-1">
                        <label>Due Date:</label>
                    </div>
                    <div className="col-lg-4">
                        <input type="date" className="form-control"  name="date" onChange={this.onDateChange} value={this.state.date}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-8">
                        <label>Description</label>
                    </div>
                    <div className="col-lg-4">
                        <label>Amount</label>
                    </div>
                </div>
                    {lineItemsUI}
                <div className="form-group"> 
                    <button type="button" className="btn btn-info" name="add" onClick={this.addLineItem}>add</button>
                </div>
                <div className="form-group row">
                    <div className="col-lg-8">
                    </div>
                    <div className="col-lg-4"> 
                       <label><strong>TOTAL   ${this.state.total.toFixed(2)}</strong></label>
                    </div>
                </div>
                <div className="form-group row"> 
                    <div className="col-lg-8">
                    </div>
                    <div className="col-lg-4"> 
                        <button type="button" className="btn btn-light" onClick={this.saveData}>SEND</button>
                    </div>
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
        axios.post('http://localhost:3000/invoice/add', { name: this.state.name, email: this.state.email, date: this.state.date})
        .then(function(response){
          alert('saved successfully')
        });
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
            totalAmt += parseFloat(amountObj.amount); 
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