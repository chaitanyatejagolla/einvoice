import expect from 'expect.js';
import React from 'react';
import { FormInput } from '../../../../src/components/common/formInput.jsx';
import { ShallowRenderer } from 'react-test-renderer/shallow';

describe("Running form input component test ", () => {
    let result;

    beforeEach(() => {
        const renderer = new ShallowRenderer();
        renderer.render(<FormInput />);
        result = renderer.getRenderOutput();
    });

    it("renders the div", () => {
        expect(result.type).toBe('div');
    });
});