import React from 'react';
import { shallow } from 'enzyme';
import sinon from "sinon";
import PropTypes from 'prop-types';
import FormLabel from '../../../src/components/common/formLabel.jsx';
import FormInput from '../../../src/components/common/FormInput.jsx';
import InputLabelGroup from '../../../src/components/common/inputLabelGroup.jsx';
import { FormGroup } from 'react-bootstrap';

describe('Running tests on <InputLabelGroup /> component', () => {

    let wrapper = null,
        onChange = null;

    beforeEach(() => {
        onChange = sinon.spy();
        wrapper = shallow(
            <InputLabelGroup name="email" value="yourname@email.com" label="Email:" type="email" error="Email is not valid" onChange={onChange} placeholder="Your email" />
        );
    });

    it("should have a <FormGroup /> component", () => {
        expect(wrapper.find(FormGroup).length).toEqual(1);
        expect(wrapper.find("div").length).toEqual(1);
        expect(wrapper.find(FormLabel).length).toEqual(1);
    });

  });