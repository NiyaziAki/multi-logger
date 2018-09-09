const foregrounds = require("./foregrounds");

const backgrounds = Object.assign({}, foregrounds);

Object.keys(backgrounds).forEach(key => {
  backgrounds[key] += 10;
});

module.exports = Object.freeze(backgrounds);
