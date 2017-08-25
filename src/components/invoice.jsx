import React from 'react';
import LineItem from './lineitem.jsx';
import TextFieldGroup from './common/textFieldGroup.jsx';
var axios = require('axios');

class Invoice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            date: "",
            total: 0,
            lineItemCount: 1,
            errors: {},
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        };
        this._bind("onChange", "addLineItem", "saveData")
    }

    render () {
        var style = {
            background: "#eee",
            padding: "20px"
        };

        let lineItemsUI = [];
        /* Looping through lineItemsArray for getting line item UI components */
        for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
            lineItemsUI.push(<LineItem handleLineItemChange={this.handleLineItemChange.bind(this)} id={i}/>);
        };

        return (
            <div className="container-fluid" style={style}>
                <TextFieldGroup
                    label="Name: "
                    onChange={this.onChange}
                    value={this.state.name}
                    placeholder="Your Name"
                    field="name"
                    type="text"
                />
                <TextFieldGroup
                    label="Email: "
                    onChange={this.onChange}
                    value={this.state.email}
                    placeholder="Your Email"
                    field="email"
                    type="email"
                />
                <TextFieldGroup
                    label="Date: "
                    onChange={this.onChange}
                    value={this.state.date}
                    placeholder="Date"
                    field="date"
                    type="date"
                />
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

    /* Utility method to bind all functions */
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    /* On change handler for name, email and date components */
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /* Posting data to node server using axios */
    saveData() {
        axios.post('http://localhost:3000/invoice/add', { name: this.state.name, email: this.state.email, date: this.state.date})
        .then(function(response){
          alert('saved successfully')
        });
    }

    /* Event handler for changes in line items */
    handleLineItemChange(id, desc, amt) {
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

    /* Counter for line item array */
    addLineItem() {
        this.setState({
            lineItemCount: this.state.lineItemCount + 1
        });
        this.state.lineItemsArray.push({id: this.state.lineItemCount, amount: 0});
    }
}

export default Invoice;