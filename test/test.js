const assert = require("assert");
const sinon = require("sinon");
const logger = require("../multi-logger");
const levels = require("../enums/levels");
const foregrounds = require("../enums/foregrounds");
const backgrounds = require("../enums/backgrounds");
const isEmpty = require("../utils/validation/is-empty");

const getConsoleMessage = (
  milliSecondsDelay,
  badge,
  label,
  message
) => {
  let date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let miliSeconds = date.getMilliseconds();
  let milliSecondsDelayList = [];

  for (let delay = 1; delay < milliSecondsDelay; delay++) {
    let delayedMilliSeconds = miliSeconds + delay;
    if (delayedMilliSeconds < 10) {
      delayedMilliSeconds = "00" + delayedMilliSeconds;
    } else if (delayedMilliSeconds < 100) {
      delayedMilliSeconds = "0" + delayedMilliSeconds;
    }
    milliSecondsDelayList.push(delayedMilliSeconds);
  }

  if (miliSeconds < 10) {
    miliSeconds = "00" + miliSeconds;
  } else if (miliSeconds < 100) {
    miliSeconds = "0" + miliSeconds;
  }

  milliSecondsDelayList.push(miliSeconds);

  let timeZone = -((date.getTimezoneOffset() / 60) * 100);

  let timeZoneString = timeZone < 0 ? "-" : "+";

  if(timeZone===0){
    timeZoneString+="000";
  }else  if (Math.abs(timeZone) < 1000) {
    timeZoneString += "0";
  }

  timeZoneString += Math.abs(timeZone);

  let messages = [];

  milliSecondsDelayList.forEach(x => {
    messages.push(
      `\u001b[90m[${day}.${month}.${date.getFullYear()}] \u001b[90m[${hour}:${minutes}:${seconds}.${x} ${timeZoneString}] \u001b[90m[/home/travis/build/NiyaziAki/multi-logger/multi-logger.js:48:23] \u001b[90m❯ ${badge}${label}\u001b[0m \u001b[39m\u001b[49m${message}\u001b[0m`
    );
  });
  return messages;
};

const infoBadge = `\u001b[94m\u001b[49mℹ    \u001b[4m\u001b[94m\u001b[49m`;
const successBadge = `\u001b[32m\u001b[49m✔    \u001b[4m\u001b[32m\u001b[49m`;
const warningBadge = `\u001b[33m\u001b[49m⚠    \u001b[4m\u001b[33m\u001b[49m`;
const errorBadge = `\u001b[91m\u001b[49m✖    \u001b[4m\u001b[91m\u001b[49m`;
const fatalBadge = `\u001b[31m\u001b[49m★    \u001b[4m\u001b[31m\u001b[49m`;

const infoMessage = getConsoleMessage(
  50,
  infoBadge,
  "Info        :",
  "Info !"
);

const successMessage = getConsoleMessage(
  50,
  successBadge,
  "Success     :",
  "Success !"
);

const warningMessage = getConsoleMessage(
  50,
  warningBadge,
  "Warning     :",
  "Warning !"
);

const errorMessage = getConsoleMessage(
  50,
  errorBadge,
  "Error       :",
  "Error !"
);

const fatalMessage = getConsoleMessage(
  50,
  fatalBadge,
  "Fatal Error :",
  "Fatal Error !"
);



describe("MultiLogger", () => {
  describe("new MultiLogger()", () => {
    it("should create an instance of MultiLogger", done => {
      try {
        let multiLogger = new logger.MultiLogger();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe("Default logging", () => {
    it("should use console for default loggers", done => {
      try {
        let multiLogger = new logger.MultiLogger();

        let spy = sinon.spy(console, "log");

        multiLogger.info("Info !");   
        assert(
          !isEmpty(infoMessage.find(message => console.log.calledWith(message)))
        );

        multiLogger.success("Success !");
        assert(
          !isEmpty(
            successMessage.find(message => console.log.calledWith(message))
          )
        );

        multiLogger.warning("Warning !");
        assert(
          !isEmpty(
            warningMessage.find(message => console.log.calledWith(message))
          )
        );

        multiLogger.error("Error !");
        assert(
          !isEmpty(
            errorMessage.find(message => console.log.calledWith(message))
          )
        );

        multiLogger.fatal("Fatal Error !");
        assert(
          !isEmpty(
            fatalMessage.find(message => console.log.calledWith(message))
          )
        );

        spy.restore();

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe("File logging", () => {
    it("should use file for logging", done => {
      const fileOptions = {
        rules: {
          development: {
            writeTo: {
              file: [
                {
                  level: levels.Error,
                  folderPath: `${__dirname}\\logs`,
                  fileName: "log.txt",
                  size: 500
                }
              ]
            }
          }
        }
      };
      let multiLogger = new logger.MultiLogger(fileOptions);
      try {
        multiLogger
          .error("File Logging !")
          .then(done)
          .catch(error => {
            done(error);
          });
      } catch (error) {
        done(error);
      }
    });
  });

  describe("Mongo DB logging", () => {
    it("should use mongo DB for logging", done => {
      const mongoDbOptions = {
        rules: {
          development: {
            writeTo: {
              mongoDb: [
                {
                  minLevel: levels.Warning,
                  connectionString:
                    "mongodb://localhost:27017/multi-logger-demo"
                }
              ]
            }
          }
        }
      };
      try {
        let multiLogger = new logger.MultiLogger(mongoDbOptions);
        multiLogger
          .error("Mongo Db Logging !")
          .then(done)
          .catch(error => {
            done(error);
          });
      } catch (error) {
        done(error);
      }
    });
  });
});
