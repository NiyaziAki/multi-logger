const isInteger = require("../validation/is-integer");
const foregrounds = require("../../enums/foregrounds");
const backgrounds = require("../../enums/backgrounds");

const toFormatCode = number => {
  if (
    isInteger(number) &&
    (Object.values(foregrounds).includes(number) ||
      Object.values(backgrounds).includes(number))
  ) {
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
