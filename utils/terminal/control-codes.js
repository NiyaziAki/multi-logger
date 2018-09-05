const isInteger = require("../validation/is-integer");

const toFormatCode = number => {
  if (isInteger(number)) {
    return `\u001b[${number}m`;
  }
  return reset();
};

const reset = () => {
  return "\u001b[0m";
};

const underlined = () => {
  return "\u001b[4m";
};

module.exports = {
  reset: reset,
  underlined: underlined,
  toFormatCode: toFormatCode
};
