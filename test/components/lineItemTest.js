import expect from 'expect.js';
import React from 'react';
import { renderShallow } from '../../testHelper';
import { LineItem } from '../../../src/components/lineItem.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

describe("Running lineItem component test ", () => {
    let invoice ;
    let result;

    beforeEach(() => {
        result = renderShallow(<LineItem/>);
    });

    it("renders the div", () => {
        expect(result.type).toBe('tr');
    });

    // it("renders the divs", () => {
    //     expect(result.props.children).toEqual([
    //         <div>
    //             {this.renderForm()}
    //         </div>
    //         <div>
    //             {this.renderPreview()}
    //         </div>
    //     ]);
    // });
});