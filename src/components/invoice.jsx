import React from 'react';
import LineItem from './lineItem.jsx';
import InputLabelGroup from './common/inputLabelGroup.jsx';
import FormLabel from './common/formLabel.jsx';
import { Form, FormGroup, Table, Button, Glyphicon } from 'react-bootstrap';
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
            lineItemValidation: true,
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        };
        this._bind("onChange", "addLineItem", "saveData", "handlePreviewClick", "handleCloseClick")
    }

    render () {

        let previewStyle = {};
        if (this.state.preview)
            previewStyle.display = 'block';
        else 
            previewStyle.display = 'none';

        return (
            <div>
                <div>
                    {this.renderForm()}
                </div>
                <div style={previewStyle}>
                    {this.renderPreview()}
                </div>
            </div>
        );
    }

    handlePreviewClick(event) {
        event.preventDefault();
        this.setState({ 
            preview: true 
        });
    }

    renderForm () {
        if (!this.state.preview) {
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
            return (
                <Form onSubmit={this.saveData} style={style}>
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
                        name="date"
                        type="date"
                    />
                    <Table responsive>
                        <thead>
                        <tr>
                            <th className="col-xs-1">Item #</th>
                            <th>Description</th>
                            <th className="col-xs-4">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            {lineItemsUI}
                        </tbody>
                    </Table>
                    <FormGroup>
                        <div className="row">
                            <div className="col-xs-6">
                                <Button onClick={this.addLineItem} bsSize="small"><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-xs-offset-8"> 
                                <label><strong>TOTAL   ${this.state.total.toFixed(2)}</strong></label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row"> 
                            <div className="col-xs-offset-8"> 
                                <Button type="submit" className="btn btn-light">SEND</Button>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row"> 
                            <div className="col-xs-offset-8"> 
                                <Button className="btn btn-light" onClick={this.handlePreviewClick}>Preview</Button>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
            )
        }
        return null;
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

        if (this.state.preview) {
            let preview = "<h1>Invoice</h1><style>table, th, td {border: 1px solid black;}</style><label>Name: "+this.state.name+"</label><br><label>Email: "+this.state.email+"</label><br><label>Date: "+this.state.date+"</label><br><br><br><table><tr><th>Item no</th><th>Description</th><th>Amount</th></tr>";
            /* Looping through lineItemsArray for getting line item UI components */
            let lineItems="";
            for (var i = 0; i < this.state.lineItemsArray.length; i += 1) {
                lineItems+="<tr><td>"+i+"</td><td>"+this.state.lineItemsArray[i].desc+"</td><td>"+this.state.lineItemsArray[i].amount+"</td></tr>";
            };
            
            let htmlText = () => ({ __html: preview+lineItems+"</table>" });
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

    handleCloseClick() {
        this.setState({
            preview: false,
            lineItemsArray: this.state.lineItemsArray
        });
    }

    /*Common Validation function*/
    validate(field, fieldValue) {
        if (field === "name") {
            return this.validateName(fieldValue);
        } else if (field === "email"){
            return this.validateEmail(fieldValue);
        } else {
            return this.validateDate(fieldValue);
        }
    };

    /*Validation  function for name*/
    validateName(fieldValue) {
        let nameError = "";
        const nameReg = /^[a-zA-Z ]+$/;
        if (fieldValue.length < 1) {
            nameError = "Name is a required field";
        } else if (fieldValue.length > 25) {
            nameError = "Name is too long (25 characters only)";
        } else {
            nameError = nameReg.test(fieldValue) ?  "" : "Please enter a valid name";
        }
        this.setState({
            nameError: nameError
        });
        return (nameError.length < 1);
    }

    /*Validation function for email*/
    validateEmail(fieldValue) {
        let emailError = "";
        const emailReg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        if (!emailReg.test(fieldValue)) {
            emailError = "Requires valid email";
        }
        this.setState({
            emailError: emailError
        });
        return (emailError.length < 1);
    }

    /*Validation function for date*/
    validateDate(fieldValue) {
        // const dateReg = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        let dateError = "";
        if (fieldValue.length < 1) {
            dateError = "Please enter a date";
        }
        // else if (!dateReg.test(fieldValue)) {
        //     dateError = "Please enter a valid date";
        // }
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
        if (this.validateEmail(this.state.email) && this.validateName(this.state.name) && this.validateDate(this.state.date) && this.state.lineItemValidation) {
            axios.post('http://localhost:3000/invoice/add', { name: this.state.name, email: this.state.email, date: this.state.date, lineItems: this.state.lineItemsArray, total: this.state.total })
        .then(response => {
            alert('saved successfully')
        });
        // clear form
            this.setState({
                name: "",
                email: "",
                date: "",
                preview: true,
                nameError: "",
                emailError: "",
                dateError: "",
                lineItemValidation: true,
                total: 0,
                lineItemCount: 1,
                lineItemsArray: [{id: 0, desc: "", amount: 0}]
            });
        }
    }

    /* Event handler for changes in line items */
    handleLineItemChange(id, desc, amt, lineItemValidation) {
        let totalAmt = 0;
        let tempArray = this.state.lineItemsArray;
        this.state.lineItemsArray.forEach(function(amountObj) {
            if(id === amountObj.id) {
                if(amt === "" || parseFloat(amt) < 0) {
                    amt = 0;
                }
                amountObj.amount = amt; 
                amountObj.desc = desc; 
            }
            totalAmt += parseFloat(amountObj.amount); 
        });
        this.setState({
            total: totalAmt,
            lineItemValidation: lineItemValidation,
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
