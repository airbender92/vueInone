"use strict";

var _promiseExample = _interopRequireDefault(require("./promiseExample"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const array1 = ['北京', '上海'];
const array2 = ['beijing', 'shanghai'];
const array3 = [...array1, ...array2];

const arrowFn = () => {
  const innerFn = () => {
    console.log('innerFn');
  };

  return innerFn;
};