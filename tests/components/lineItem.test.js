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
    });

    it('should render two <FormGroup /> components', () => {
        expect(wrapper.find(FormGroup).length).toEqual(2);
    });
  
    it('should render two <FormGroup /> components', () => {
        expect(wrapper.find(FormGroup).length).toEqual(2);
    });

    // it('should render children when passed in', () => {
    //   const wrapper = shallow((
    //     <Invoice>
    //       <div>
    //             <div>
    //                 {this.renderForm()}
    //             </div>
    //             <div>
    //                 {this.renderPreview()}
    //             </div>
    //         </div>
    //     </Invoice>
    //   ));
    //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    // });
  
    // it('simulates click events', () => {
    //   const onButtonClick = sinon.spy();
    //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    //   wrapper.find('button').simulate('click');
    //   expect(onButtonClick.calledOnce).to.equal(true);
    // });
  });