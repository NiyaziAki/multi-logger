const isEmpty = require("./validation/is-empty");

const paddingRight = (text, size) => {
  if (isEmpty(text)) {
    text = "";
  }

  while (text.length < size) {
    text += " ";
  }

  return text;
};

module.exports = paddingRight;
