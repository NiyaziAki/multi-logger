const moment = require("moment");

const isEmpty = require("./utils/validation/is-empty");
const backgrounds = require("./enums/backgrounds");
const foregrounds = require("./enums/foregrounds");
const levels = require("./enums/levels");
const optionUtils = require("./utils/option-utils");
const defaultLoggers = require("./utils/default-loggers");

const consoleUtils = require("./utils/console-utils");
const fileUtils = require("./utils/file-utils");
const mongoUtils = require("./utils/mongo-utils");

class MultiLogger {
  constructor(options = {}) {
    this._options = options;
    optionUtils.init(this._options);
    this._maxLabelLength = optionUtils.findMaxLabelLength(
      this._options.loggers
    );

    Object.keys(defaultLoggers).forEach(logger => {
      this[logger] = this.log.bind(this, defaultLoggers[logger]);
    });

    if (!isEmpty(this._options.loggers)) {
      Object.keys(this._options.loggers).forEach(logger => {
        this[logger] = this.log.bind(this, this._options.loggers[logger]);
      });
    }
  }

  get date() {
    return moment().format(this._options.dateFormat);
  }

  get time() {
    return moment().format(this._options.timeFormat);
  }

  get timestamp() {
    return moment().format("DDMMYYYYHHmmssSSS");
  }

  get externalCallerInfo() {
    const original = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, stack) => stack;
    const { stack } = new Error();
    Error.prepareStackTrace = original;

    let firstExternalStack = stack.find(x => {
      return ![
        "console-utils.js",
        "file-utils.js",
        "multi-logger.js",
        "mongo-utils.js"
      ].includes(
        x
          .getFileName()
          .split("\\")
          .pop()
      );
    });

    return createCallerInfo(firstExternalStack);
  }

  get isProduction() {
    return process.env.NODE_ENV === "production";
  }

  async log(logger, message) {
    let writeTo = this.isProduction
      ? this._options.rules.production.writeTo
      : this._options.rules.development.writeTo;

    try {
      consoleUtils.writeToConsole(this, writeTo, logger, message);
      let externalCaller = this.externalCallerInfo;
      await fileUtils.writeToFile(
        this,
        writeTo,
        logger,
        message,
        externalCaller
      );
      await mongoUtils.writeToMongoDb(writeTo, logger, message, externalCaller);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const createCallerInfo = stack => {
  let callerInfo = [];
  let fileName = stack
    ? this._options.showFullPath
      ? stack.getFileName()
      : stack
          .getFileName()
          .split("\\")
          .pop()
    : "unknown";
  callerInfo.push(fileName);

  if (fileName !== "unknown") {
    callerInfo.push(stack.getLineNumber());
    callerInfo.push(stack.getColumnNumber());
  }

  return callerInfo.join(":");
};

module.exports = {
  backgrounds: backgrounds,
  foregrounds: foregrounds,
  levels: levels,
  MultiLogger: MultiLogger
};
