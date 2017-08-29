import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import FormLabel from '../../../src/components/common/formLabel.jsx';
import sinon from "sinon";

describe('Running tests on <FormLabel /> component', () => {

    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(
            <FormLabel className="col-lg-1" label="Name: " />
        );
    });

    it("should have a <div /> component", () => {
        expect(wrapper.find("div").length).toEqual(1);
        expect(wrapper.find("label").length).toEqual(1);
    });

  });