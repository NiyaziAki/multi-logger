const isEmpty = require("./is-empty");

const isInteger = value =>
  !isEmpty(value) &&
  !isNaN(parseFloat(value)) &&
  isFinite(value) &&
  (value | 0) === value;

module.exports = isInteger;
