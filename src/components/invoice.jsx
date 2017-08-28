import React from 'react';
import LineItem from './lineItem.jsx';
import InputLabelGroup from './common/inputLabelGroup.jsx';
import { Form, FormGroup, ControlLabel, Table, Button, Glyphicon, Modal } from 'react-bootstrap';
import axios from 'axios';

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
            totalError: "",
            lineItemValidation: true,
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
        };
        this._bind("onChange", "addLineItem", "saveData", "renderForm", "renderPreview", "handleCloseClick")
    }

    render () {
        return (
            <div>
                <div>
                    {this.renderForm()}
                </div>
                <div>
                    {this.renderPreview()}
                </div>
            </div>
        );
    }

    renderForm () {
        if (!this.state.preview) {
            const style = {
                background: "#eee",
                padding: "20px",
                margin: "20px"
            };

            const errorStyle = {
                color: "#a94442"
            }

            let lineItemsUI = [];
            /* Looping through lineItemsArray for getting line item UI components */
            lineItemsUI = this.state.lineItemsArray.map((lineItem, index) =>
                <LineItem handleLineItemChange={this.handleLineItemChange.bind(this)} key={index} id={index}/>
            );
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
                                <label><strong>TOTAL   ${this.state.total.toFixed(2).toString().slice(0,7)}</strong></label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-xs-offset-8"> 
                                <label style={errorStyle}>{this.state.totalError}</label>
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
                </Form>
            )
        }
        return null;
    }

    renderPreview() {
        if (this.state.preview) {

            const tableStyle = {
                width: "100%"
            };

            const columnStyle = {
                border: "1px solid #dddddd",
                padding: "8px"
            }

            // /* Looping through lineItemsArray for getting line item preview components */
            let lineItemsPreview=[];
            lineItemsPreview = this.state.lineItemsArray.map((lineItem, index) =>
                <tr key={index+1}><td style={columnStyle}>{index+1}</td><td style={columnStyle}>{lineItem.desc}</td><td style={columnStyle}>{lineItem.amount}</td></tr>
            );

            return (
                <div>
                    <Modal
                    {...this.props}
                    bsSize="large"
                    show={this.state.preview}
                    onHide={this.handleCloseClick}
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-lg">Preview Pane</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>INVOICE</h1>
                        <FormGroup>
                            <ControlLabel><strong>Name: </strong>{this.state.name}</ControlLabel>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><strong>Email: </strong>{this.state.email}</ControlLabel>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><strong>Date: </strong>{this.state.date}</ControlLabel>
                        </FormGroup>
                        <br/><br/><br/>
                        <table style={tableStyle}>
                            <tbody>
                                <tr>
                                    <th style={columnStyle}>Item no</th>
                                    <th style={columnStyle}>Description</th>
                                    <th style={columnStyle}>Amount</th>
                                </tr>
                                {lineItemsPreview}
                            </tbody>
                        </table><br/><br/><br/>
                        <label><strong>TOTAL: </strong>${this.state.total.toFixed(2)}</label>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleCloseClick}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
            );
        }
        return null;
    }

    handleCloseClick() {
        this.setState({
            name: "",
            email: "",
            date: "",
            preview: false,
            nameError: "",
            emailError: "",
            dateError: "",
            totalError: "",
            lineItemValidation: true,
            total: 0,
            lineItemCount: 1,
            lineItemsArray: [{id: 0, desc: "", amount: 0}]
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
        // const dateReg =/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d$/;
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
                console.log('saved successfully')
            });
            this.setState({
                preview: true
            });
        }
    }

    /* Event handler for changes in line items */
    handleLineItemChange(id, desc, amt, lineItemValidation) {
        let totalAmt = 0;
        let tempArray = this.state.lineItemsArray;
        this.state.lineItemsArray.forEach(function(amountObj) {
            if (id === amountObj.id) {
                if (amt === "" || parseFloat(amt) < 0) {
                    amt = 0;
                }
                amountObj.amount = amt; 
                amountObj.desc = desc; 
            }
            totalAmt += parseFloat(amountObj.amount);
            
        });
        this.setState({
            total: totalAmt,
            totalError: totalAmt > 9999999.99 ? "Total cannot be more than 9999999.99" : "",
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
