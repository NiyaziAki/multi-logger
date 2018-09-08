const controlCodes = require("./terminal/control-codes");
const paddingRight = require("./padding-right");
const foregrounds = require("../enums/foregrounds");
const isEmpty = require("../utils/validation/is-empty");
const optionUtils = require("./option-utils");

const createDefaultMessage = message => {
  return `${controlCodes.toFormatCode(foregrounds.DarkGray)}[${message}]`;
};

const createBadge = (logger, badge) => {
  return `${controlCodes.toFormatCode(
    logger.foreground
  )}${controlCodes.toFormatCode(logger.background)}${badge}`;
};

const createLabel = (logger, label) => {
  return `${
    logger.isUnderlined ? controlCodes.underlined() : ""
  }${controlCodes.toFormatCode(logger.foreground)}${controlCodes.toFormatCode(
    logger.background
  )}${label}${controlCodes.reset()}`;
};

const createMessage = (logger, message) => {
  return `${
    logger.text.isUnderlined ? controlCodes.underlined() : ""
  }${controlCodes.toFormatCode(
    logger.text.foreground
  )}${controlCodes.toFormatCode(
    logger.text.background
  )}${message}${controlCodes.reset()}`;
};

const createConsoleMessage = (multiLogger, logger, message) => {
  let log = [];
  let badge = paddingRight(logger.badge, 4);
  let label = paddingRight(logger.label, multiLogger._maxLabelLength) + " :";

  if (multiLogger._options.showDate) {
    log.push(createDefaultMessage(multiLogger.date));
  }
  if (multiLogger._options.showTime) {
    log.push(createDefaultMessage(multiLogger.time));
  }
  if (multiLogger._options.showExternalCallerInfo) {
    log.push(createDefaultMessage(multiLogger.externalCallerInfo));
  }
  if (log.length > 0) {
    log.push(`${controlCodes.toFormatCode(foregrounds.DarkGray)}❯`);
  }

  log.push(createBadge(logger, badge));

  log.push(createLabel(logger, label));

  log.push(createMessage(logger, message));

  return log.join(" ");
};

const writeToConsole = (multiLogger, writeTo, logger, message) => {
  let write = optionUtils.findRule(writeTo.console, logger);
  if (!isEmpty(write)) {
    let consoleMessage = createConsoleMessage(multiLogger, logger, message);
    console.log(consoleMessage);
  }
};

module.exports = {
  writeToConsole: writeToConsole
};
