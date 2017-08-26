import React from 'react';
import LineItem from './lineItem.jsx';
import InputLabelGroup from './common/inputLabelGroup.jsx';
import { Form, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
var axios = require('axios');

class Invoice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            date: "",
            preview: false,
            nameError: "",
            emailError: "",
            dateError: "",
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        };
        this._bind("onChange", "addLineItem", "saveData")
    }

    render () {
        var style = {
            background: "#eee",
            padding: "20px",
            margin: "20px"
        };

        let lineItemsUI = [];
        /* Looping through lineItemsArray for getting line item UI components */
        for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
            lineItemsUI.push(<LineItem handleLineItemChange={this.handleLineItemChange.bind(this)} key={i} id={i}/>);
        };

        let previewStyle = {};
        if (this.state.preview)
            previewStyle.display = 'block';
        else 
            previewStyle.display = 'none';

        return (
            <Form onSubmit={this.saveData} style={style} >
                <InputLabelGroup
                    label="Name: "
                    onChange={this.onChange}
                    error={this.state.nameError}
                    value={this.state.name}
                    placeholder="Your Name"
                    name="name"
                    type="text"
                />
                <InputLabelGroup
                    label="Email: "
                    onChange={this.onChange}
                    error={this.state.emailError}
                    value={this.state.email}
                    placeholder="Your Email"
                    name="email"
                    type="email"
                />
                <InputLabelGroup
                    label="Date: "
                    onChange={this.onChange}
                    error={this.state.dateError}
                    value={this.state.date}
                    placeholder="MM/DD/YYYY"
                    name="date"
                    type="date"
                />
                <FormGroup>
                    <div className="row">
                        <div className="col-lg-8">
                            <label>Description</label>
                        </div>
                        <div className="col-lg-4">
                            <label>Amount</label>
                        </div>
                    </div>
                </FormGroup>
                {lineItemsUI}
                <FormGroup>
                    <Button onClick={this.addLineItem} bsSize="small"><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
                </FormGroup>
                <FormGroup>
                    <div className="row">
                        <div className="col-lg-8">
                        </div>
                        <div className="col-lg-4"> 
                        <label><strong>TOTAL   ${this.state.total.toFixed(2)}</strong></label>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="row"> 
                        <div className="col-lg-8">
                        </div>
                        <div className="col-lg-4"> 
                            <Button type="submit" className="btn btn-light">SEND</Button>
                        </div>
                    </div>
                </FormGroup>
                <div style={previewStyle}>
                    {this.renderPreview()}
                </div>
            </Form>
        );
    }

    renderPreview() {
        var previewBoxStyle = {
            position: "relative",
            background: "#fafafa",
            border: "1px solid #ddd",
            padding: "40px 15px 20px",
            margin: "10px 0",
            color: "#333"
        };

        var previewTitleStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            background: "#eee",
            border: "1px solid #ddd",
            padding: "5px 12px"
        };

        if (this.state) {
        let htmlText = () => ({ __html: this.state.name });
            return (
                <div>
                    <div style={previewBoxStyle}>
                        <span className="preview-title">Preview</span>
                        <div dangerouslySetInnerHTML={htmlText()}></div>
                    </div>
                    <button onClick={this.handleCloseClick}>
                        Close
                    </button>
                </div>
            );
        }
        return null;
    }

    validate(field, fieldValue) {
        if (field === "name") {
            return this.validateName(fieldValue);
        } else if (field === "date") {
            return this.validateDate(fieldValue);
        } else if (field === "email") {
            return this.validateEmail(fieldValue);
        } else {
            return this.validateName(fieldValue) && this.validateDate(fieldValue) && this.validateEmail(fieldValue);
        }
    };

    validateName(fieldValue) {
        let nameError = "";
        if (fieldValue.length < 1) {
            nameError = "Name is a required field";
        }
        if (fieldValue.length > 30) {
            nameError = "Name is too long (30 characters only)";
        }
        this.setState({
            nameError: nameError
        });

        return (nameError.length < 1);
    }

    validateEmail(fieldValue) {
        let emailError = "";
        const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(fieldValue)) {
            emailError = "Requires valid email";
        }
        this.setState({
            emailError: emailError
        });
        return (emailError.length < 1);
    }

    validateDate(fieldValue) {
        let dateError = "";
        var dateReg = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
        if (!dateReg.test(fieldValue)) {
            dateError = "Please enter a valid date in MM/DD/YYYY format";
        }
        this.setState({
            dateError: dateError
        });
        return (dateError.length < 1);
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
        this.validate(event.target.name, event.target.value);
    }

    /* Posting data to node server using axios */
    saveData(event) {
        event.preventDefault();
            // clear form
        this.setState({
            name: "",
            email: "",
            date: "",
            preview: true,
            nameError: "",
            emailError: "",
            dateError: "",
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        });
        axios.post('http://localhost:3000/invoice/add', { name: this.state.name, email: this.state.email, date: this.state.date})
        .then(response => {
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