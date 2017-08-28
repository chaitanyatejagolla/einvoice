import expect from 'expect.js';
import React from 'react';
import { renderShallow } from '../../../testHelper';
import { FormLabel } from '../../../../src/components/common/formLabel.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

describe("Running form label component test ", () => {
    const renderer;
    const result;

    beforeEach(() => {
        renderer = new ShallowRenderer();
        renderer.render(<FormLabel />);
        result = renderer.getRenderOutput();
    });

    it("renders the div", () => {
        expect(result.type).toBe('div');
    });
});