import React from 'react';
import { shallow } from 'enzyme';
import sinon from "sinon";
import Invoice from '../../src/components/invoice';
import LineItem from '../../src/components/lineItem';
import InputLabelGroup from '../../src/components/common/inputLabelGroup.jsx';
import { Form, FormGroup, ControlLabel, Table, Button, Modal } from 'react-bootstrap';

describe('Running tests on <Invoice /> component', () => { 
    let wrapper = null,
        renderForm = sinon.spy(),
        renderPreview = sinon.spy()

    beforeEach(() => {
        wrapper = shallow(
            <Invoice />
        );
    });

    it("should have three <InputLabelGroup /> components", () => {
        expect(wrapper.find(InputLabelGroup).length).toEqual(3);
    });

    it("should have one <LineItem /> component", () => {
        expect(wrapper.find(LineItem).length).toEqual(1);
    });

    it("should have a <Form /> component", () => {
        expect(wrapper.find(Form).length).toEqual(1);
    });


    it("should have a <FormGroup /> component", () => {
        expect(wrapper.find(FormGroup).length).toEqual(4);
    });
    
    it("should have a <Table /> component", () => {
        expect(wrapper.find(Table).length).toEqual(1);
    });

    // it("should validate ", () => {
    //     expect(validate("name", "9829")).toEqual(false);
    //     expect(validate("name", "name")).toEqual(true);
    //     expect(validate("name", "name@")).toEqual(false);
    // });
    it('should render children when passed in', () => {
      const wrapper = shallow((
        <Invoice>
          <div>
                <div>
                    {renderForm}
                </div>
                <div>
                    {renderPreview}
                </div>
            </div>
        </Invoice>
      ));
      expect(wrapper.contains(<div>
        <div>
            {renderForm}
        </div>
        <div>
            {renderPreview}
        </div>
    </div>)).toEqual(false);
    });
  
    // it('simulates click events', () => {
    //   const onButtonClick = sinon.spy();
    //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    //   wrapper.find('button').simulate('click');
    //   expect(onButtonClick.calledOnce).to.equal(true);
    // });
  });