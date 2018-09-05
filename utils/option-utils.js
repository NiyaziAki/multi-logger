const isEmpty = require("./validation/is-empty");
const levels = require("../enums/levels");

const init = (options = {}) => {
  if (isEmpty(options.dateFormat)) {
    options.dateFormat = "DD.MM.YYYY";
  }
  if (isEmpty(options.timeFormat)) {
    options.timeFormat = "HH:mm:ss.SSS ZZ";
  }

  if (isEmpty(options.showFullPath)) {
    options.showFullPath = false;
  } else {
    options.showFullPath = options.showFullPath === true;
  }

  if (isEmpty(options.showDate)) {
    options.showDate = true;
  } else {
    options.showDate = options.showDate === true;
  }

  if (isEmpty(options.showTime)) {
    options.showTime = true;
  } else {
    options.showTime = options.showTime === true;
  }
  if (isEmpty(options.showExternalCallerInfo)) {
    options.showExternalCallerInfo = true;
  } else {
    options.showExternalCallerInfo = options.showExternalCallerInfo === true;
  }

  if (isEmpty(options.rules)) {
    options.rules = {
      production: { writeTo: { console: [{ minLevel: levels.Trace }] } },
      development: { writeTo: { console: [{ minLevel: levels.Trace }] } }
    };
  }
};

const findMaxLabelLength = loggers => {
  if (isEmpty(loggers)) {
    return 11;
  }
  let labels = [];
  Object.keys(loggers).forEach(logger => {
    let label = loggers[logger].label;
    if (!isEmpty(label)) {
      labels.push(label);
    }
  });

  let maxLabelLength = Math.max.apply(
    Math,
    labels.map(label => {
      return label.length;
    })
  );

  return maxLabelLength < 11 ? 11 : maxLabelLength;
};

module.exports = {
  init: init,
  findMaxLabelLength: findMaxLabelLength
};
