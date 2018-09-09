const isInteger = require("../validation/is-integer");
const foregrounds = require("../../enums/foregrounds");
const backgrounds = require("../../enums/backgrounds");

const reset = () => "\u001b[0m";

const underlined = () => "\u001b[4m";

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

module.exports = {
  reset,
  underlined,
  toFormatCode
};
