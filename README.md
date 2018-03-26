# Triangle challenge
## The problem
Write a program that will determine the type of a triangle. It should take the lengths of the triangle's three sides as input, and return whether the triangle is equilateral, isosceles or scalene.

We are looking for solutions that showcase problem solving skills and structural considerations that can be applied to larger and potentially more complex problem domains. Pay special attention to tests, readability of code and error cases.
## Essential files
## Motivation
**Choosing the platform**
We need a solution, which provides as with running and testing environment, support for modules, and, possibly, modern code features - out from the box. The 'Create React App' project meets all the requirements. It contains: 
 
 - React
 - modules support
 - static server
 - testing environment - Jest
 - ES6 support

**Component structure**
The code should be reusable, so it makes sense to make it as a component.
We expect, that in future some parameters may be changed (e.g. we should expect the extension from triangle to square), so we should be able to redefine such of them:
 - The figure name (currently - 'triangle').
 - The number of sides.
 - The maximum and minimum length of side.

We define these parameters as public properties of the class. However, we do not make them as component’s inputs/attributes and do not create an abstract component/class, since that is overcomplicated for the current task (but we can easily do that in future).

**Logical structure**
The component should perform the following:

 - Get the length of figure sides.
 - Validate, if they meet criterias of type and length.
 - Validate, if the whole model meets the criteria of sides length (each side should not be bigger, than the sum of others).
 - Check, if the figure is equilateral (all sides are equal), isosceles (all but one sides are equal) or scalene (two and more sides are unique).
 - Deliver the result to an user.

## Deploy and run
1. Clone the branch.
2. Run 'npm install' (tested on Node v9.9.0)
3. Run 'npm start'.
4. If the browser will not be open automatically, go to 'http://localhost:3000'.
5. To run test, use 'npm test'.
## What can be improved
 - Put text messages into constants.
 - Improve visual indication of wrong inputs.

## Additional
This project was bootstrapped with Create React App - [https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app).
