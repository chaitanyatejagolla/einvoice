import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl } from 'react-bootstrap';
import FormInput from '../../../src/components/common/FormInput.jsx';
import sinon from "sinon";

describe('Running tests on <FormInput /> component', () => {

    let wrapper = null,
        obj = null;

    beforeEach(() => {
        const onChange = sinon.spy(),
            className = "col-md-10",
            type = "text",
            name = "name", 
            placeholder = "Enter your name",
            value = "First Name",
            error = "";

        wrapper = shallow(
            <FormInput onChange={onChange} name ={name} placeholder={placeholder} type={type} className={className} value={value} />
        );
    });

    it("should have a <FormControl /> component", () => {
        expect(wrapper.find(FormControl).length).toEqual(1);
    });

    it("should have a <ControlLabel /> component", () => {
        expect(wrapper.find(ControlLabel).length).toEqual(1);
    });

    it("should have a <div /> tag", () => {
        expect(wrapper.find("div").length).toEqual(1);
    });

  });