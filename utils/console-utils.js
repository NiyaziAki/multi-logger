const controlCodes = require("./terminal/control-codes");
const paddingRight = require("./padding-right");
const foregrounds = require("../enums/foregrounds");
const isEmpty = require("../utils/validation/is-empty");

const createMessage = (multiLogger, logger, message) => {
  let log = [];
  let badge = paddingRight(logger.badge, 4);
  let label = paddingRight(logger.label, multiLogger._maxLabelLength) + " :";

  if (multiLogger._options.showDate) {
    log.push(
      `${controlCodes.toFormatCode(foregrounds.DarkGray)}[${multiLogger.date}]`
    );
  }
  if (multiLogger._options.showTime) {
    log.push(
      `${controlCodes.toFormatCode(foregrounds.DarkGray)}[${multiLogger.time}]`
    );
  }
  if (multiLogger._options.showExternalCallerInfo) {
    log.push(
      `${controlCodes.toFormatCode(foregrounds.DarkGray)}[${
        multiLogger.externalCallerInfo
      }]`
    );
  }
  if (log.length > 0) {
    log.push(`${controlCodes.toFormatCode(foregrounds.DarkGray)}❯`);
  }

  log.push(
    `${controlCodes.toFormatCode(logger.foreground)}${controlCodes.toFormatCode(
      logger.background
    )}${badge}`
  );

  log.push(
    `${
      logger.isUnderlined ? controlCodes.underlined() : ""
    }${controlCodes.toFormatCode(logger.foreground)}${controlCodes.toFormatCode(
      logger.background
    )}${label}${controlCodes.reset()}`
  );

  log.push(
    `${
      logger.text.isUnderlined ? controlCodes.underlined() : ""
    }${controlCodes.toFormatCode(
      logger.text.foreground
    )}${controlCodes.toFormatCode(
      logger.text.background
    )}${message}${controlCodes.reset()}`
  );
  return log.join(" ");
};

const writeToConsole = (multiLogger, writeTo, logger, message) => {
  try {
    if (!isEmpty(writeTo.console)) {
      let write = writeTo.console.find(x => x.minLevel <= logger.level);
      if (isEmpty(write)) {
        write = writeTo.console.find(x => x.level === logger.level);
      }
      if (!isEmpty(write)) {
        let consoleMessage = createMessage(multiLogger, logger, message);
        console.log(consoleMessage);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  writeToConsole: writeToConsole
};
