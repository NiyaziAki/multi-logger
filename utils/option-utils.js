const isEmpty = require("./validation/is-empty");
const levels = require("../enums/levels");

const checkIfEmpty = (options, key, defaultValue) => {
  if (isEmpty(options[key])) {
    options[key] = defaultValue;
  } else {
    options[key] = options[key] === true;
  }
};

const init = (options = {}) => {
  if (isEmpty(options.dateFormat)) {
    options.dateFormat = "DD.MM.YYYY";
  }
  if (isEmpty(options.timeFormat)) {
    options.timeFormat = "HH:mm:ss.SSS ZZ";
  }

  checkIfEmpty(options, "showFullPath", false);
  checkIfEmpty(options, "showDate", true);
  checkIfEmpty(options, "showTime", true);
  checkIfEmpty(options, "showExternalCallerInfo", true);

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

const findRule = (rule, logger) => {
  let write = undefined;
  if (!isEmpty(rule)) {
    write = rule.find(x => x.minLevel <= logger.level);
    if (isEmpty(write)) {
      write = rule.find(x => x.level === logger.level);
    }
  }
  return write;
};

module.exports = {
  init: init,
  findMaxLabelLength: findMaxLabelLength,
  findRule: findRule
};
