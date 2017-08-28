import expect from 'expect.js';
import React from 'react';
import { renderShallow } from '../../../testHelper';
import { InputLabelGroup } from '../../../../src/components/common/inputLabelGroup.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

describe("Running input label group component test ", () => {
    const result;

    beforeEach(() => {
        const renderer = new ShallowRenderer();
        renderer.render(<InputLabelGroup />);
        result = renderer.getRenderOutput();
    });

    it("renders the div", () => {
        expect(result.type).toBe('div');
    });
});