import React from 'react';
import ReactDOM from 'react-dom';
import TriangleType from './TriangleType';

describe('rendering', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TriangleType />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('public properties', () => {
    let figure;

    beforeEach(() => {
        figure = new TriangleType();
    });

    it('default properties', () => {
        expect(figure.sideAmount).toBe(3);
        expect(figure.allowedRange).toContain(1);
        expect(figure.allowedRange).toContain(100);
        expect(figure.figureName).toBe('triangle');
        expect(figure.isError).toBe(false);
        expect(figure.message).toBe('');
        expect(figure.sideNames.length).toEqual(3);
        expect(figure.sideNames).toContain('side0');
        expect(figure.sideNames).toContain('side1');
        expect(figure.sideNames).toContain('side2');
    });
});

describe('public methods', () => {
    let figure;
    let div;

    beforeEach(() => {
        div = document.createElement('div');
        figure = ReactDOM.render(<TriangleType />, div);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(div);
        figure = null;
    });

    it('updateValues should update state', () => {
        const originalStateDump = JSON.stringify(figure.state);
        figure.refs['side1'].value = '15';

        figure.updateValues();
        expect(JSON.stringify(figure.state)).not.toBe(originalStateDump);
        expect(JSON.stringify(figure.state)).toBe('{\"side0\":\"12\",\"side1\":\"15\",\"side2\":\"12\"}');
    });

    it('submit should call updateValues', () => {
        const fakeEvent = {
            preventDefault: jest.fn()
        };
        figure.updateValues = jest.fn();

        figure.submit(fakeEvent);

        expect(fakeEvent.preventDefault).toHaveBeenCalled();
        expect(figure.updateValues).toHaveBeenCalled();
    });

    it('displayError', () => {
        const text = 'This is an error!';
        figure.displayError(text);

        expect(figure.isError).toBeTruthy();
        expect(figure.message).toBe(text);
    });

    it('displayMessage', () => {
        const text = 'This is a text message.';
        figure.displayMessage(text);

        expect(figure.isError).toBeFalsy();
        expect(figure.message).toBe(text);
    });
});

describe('static methods', () => {

    it('getDefaultState', () => {
        expect(TriangleType.getDefaultState(5)).toMatchObject({"side0": 12, "side1": 12, "side2": 12, "side3": 12, "side4": 12});
    });

    it('validateValue pass', () => {
        expect(TriangleType.validateValue(5, [2, 99])).toBe(undefined);
    });

    it('validateValue fails - must be a number', () => {
        expect(TriangleType.validateValue('ffffff', [2, 99])).toBe('must be a number');
    });

    it('validateValue fails - must be bigger than', () => {
        expect(TriangleType.validateValue(1, [2, 99])).toBe('must be bigger than 1');
    });

    it('validateValue fails - must be smaller than', () => {
        expect(TriangleType.validateValue(111, [2, 99])).toBe('must be smaller than 100');
    });

    describe('static methods', () => {

        let state;
        let figureName;

        beforeEach(() => {
            state = {
                name0: 5,
                name1: 5,
                name2: 5,
            };

            figureName = 'triangle';
        });

        it('defineFigure pass - equilateral', () => {
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The triangle is equilateral.');
            expect(result.status).toBe('ok');
        });

        it('defineFigure pass - isosceles', () => {
            state.name1 = 8;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The triangle is isosceles.');
            expect(result.status).toBe('ok');
        });

        it('defineFigure pass - scalene', () => {
            state.name1 = 8;
            state.name2 = 4;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The triangle is scalene.');
            expect(result.status).toBe('ok');
        });

        it('defineFigure fail', () => {
            state.name2 = 40;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The name2 is too big! It must be not bigger than the sum of all other sides, what is currently equal to 10.');
            expect(result.status).toBe('error');
        });

        it('defineFigure pass - equilateral pentangle', () => {
            figureName = 'pentangle';
            state.name3 = 5;
            state.name4 = 5;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The pentangle is equilateral.');
            expect(result.status).toBe('ok');
        });

        it('defineFigure pass - isosceles pentangle', () => {
            figureName = 'pentangle';
            state.name3 = 7;
            state.name4 = 5;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The pentangle is isosceles.');
            expect(result.status).toBe('ok');
        });

        it('defineFigure pass - scalene pentangle', () => {
            figureName = 'pentangle';
            state.name3 = 7;
            state.name4 = 8;
            const result = TriangleType.defineFigure(state, figureName);
            expect(result.message).toBe('The pentangle is scalene.');
            expect(result.status).toBe('ok');
        });
    });
});