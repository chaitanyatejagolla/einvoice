import expect from 'expect.js';
import React from 'react';
import { renderShallow } from '../../testHelper';
import { Invoice } from '../../../src/components/invoice.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

describe("Running invoice component test ", () => {
    let invoice ;
    let result;

    beforeEach(() => {
        result = renderShallow(<Invoice/>);
    });

    it("renders the div", () => {
        expect(result.type).toBe('div');
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