import React, { Component } from 'react';
import './TriangleType.css';

const defaultLength = 12;
const sideName = 'side';

class TriangleType extends Component {

  constructor(props) {
    super(props);

    this.allowedRange = [1, 100];
    this.sideAmount = 3;
    this.figureName = 'triangle';
    this.message = '';
    this.isError = false;
    this.state = TriangleType.getDefaultState(this.sideAmount, {});
    this.sideNames = Object.keys(this.state);

    this.updateValues = () => {
      const newState = {};
      let errorText = '';

      this.sideNames.forEach((name) => {
        const value = this.refs[name] && this.refs[name].value;
        const errorMessage = TriangleType.validateValue(value, this.allowedRange);

        if (errorMessage) {
          errorText += '\n' + name + ' has an error: ' + errorMessage;
        }
        newState[name] = value;
      });

      if (errorText.length) {
        this.displayError(errorText);
      } else {
        const definedResult = TriangleType.defineFigure(newState, this.figureName);

        switch(definedResult.status) {
          case 'error':
            this.displayError(definedResult.message);
          break;
          default:
            this.displayMessage(definedResult.message);
          break;
        }
      }

      this.setState(newState);
    };

    this.submit = (e) => {
      e.preventDefault();
      this.updateValues();
    };

    this.displayError = (text) => {
      this.isError = true;
      this.message = text;
    };

    this.displayMessage = (text) => {
      this.isError = false;
      this.message = text;
    };
  }

  static defineFigure = (state, figureName) => {
    const names =  Object.keys(state);
    const len = names.length;
    const values = names.map((name) => {
      return Number(state[name] || 0);
    });
    const sum = values.reduce((prev, current) => {
      return prev + current;
    });

    let typeOfFigure = 'scalene';
    let i = 0;

    for (i; i < len; i += 1) {
      const name = names[i];
      const sideLength = values[i];
      const sumOthers = sum - sideLength;

      if (sumOthers - sideLength < 0) {
        return {
          status: 'error',
          message: 'The ' + name + ' is too big! It must be not bigger than the sum of all other sides, what is currently equal to ' + sumOthers + '.'
        };
      }

      const exceptedValues = values.slice(0, i).concat(values.slice(i + 1));
      const amountOfEqual = exceptedValues.filter((v) => v === sideLength).length;

      if (exceptedValues.length === amountOfEqual) { // If all of the rest values are equal to the current one, we have an equilateral figure
        typeOfFigure = 'equilateral';
      } else if (exceptedValues.length - amountOfEqual === 1) { // If all of the rest values, but one, are equal to the current one, we have an isosceles figure
        typeOfFigure = 'isosceles';
      }
    }

    return {
      status: 'ok',
      message: 'The ' + figureName + ' is ' + typeOfFigure + '.'
    };
  }

  static getDefaultState = (amount, state) => {
    state = state || {};

    if (amount && !isNaN(amount)) {
      let i = 0;

      for (i; i < amount; i += 1) {
        state[sideName + i] = defaultLength;
      }
    }

    return state;
  }

  static validateValue = (value, allowedRange) => {
    if (isNaN(value)) {
      return 'must be a number';
    } else {
      const valueAsNumber = Number(value);

      if (valueAsNumber < allowedRange[0]) {
        return 'must be bigger than ' + (allowedRange[0] - 1);
      } else if (valueAsNumber > allowedRange[1]) {
        return 'must be smaller than ' + (allowedRange[1] + 1);
      }
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
        {
          this.sideNames.map((name, k) => {
            return (
              <label key={k}>
              <span>{name}:</span>
              <input value={this.state[name]} onChange={this.updateValues} ref={name} />
              </label>
            )
          })
        }
        <button type="submit">Check</button>
        </form>
        <p className={this.isError ? 'error-message' : ''}>{this.message}</p>
      </div>
    );
  }
}

export default TriangleType;