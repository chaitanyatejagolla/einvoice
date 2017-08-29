import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import LineItem from '../../src/components/lineItem';
import FormLabel from '../../src/components/common/formLabel.jsx';
import { FormGroup, FormControl } from 'react-bootstrap';
import FormInput from '../../src/components/common/FormInput.jsx';
import sinon from "sinon";

describe('Running tests on <LineItem /> component', () => {

    let wrapper = null,
        handleLineItemChange = null;

    beforeEach(() => {
        handleLineItemChange = sinon.spy();

        wrapper = shallow(
            <LineItem handleLineItemChange={handleLineItemChange} id={1} />
        );
    });

    it('should render one <FormLabel /> components', () => {
        expect(wrapper.find(FormLabel).length).toEqual(1);
        expect(wrapper.find(FormGroup).length).toEqual(2);
        expect(wrapper.find(FormGroup).length).toEqual(2);
    });
  });