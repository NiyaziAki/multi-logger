const isEmpty = require("./validation/is-empty");

const paddingRight = (text, size) => {
  if (isEmpty(text)) {
    // eslint-disable-next-line no-param-reassign
    text = "";
  }

  while (text.length < size) {
    // eslint-disable-next-line no-param-reassign
    text += " ";
  }

  return text;
};

module.exports = paddingRight;
