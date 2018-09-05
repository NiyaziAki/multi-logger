const isEmpty = require("../utils/validation/is-empty");
var mongoose = require("mongoose");
const Log = require("../models/log");

const writeToMongoDb = async (writeTo, logger, message, externalCaller) => {
  try {
    if (!isEmpty(writeTo.mongoDb)) {
      let write = writeTo.mongoDb.find(x => x.minLevel <= logger.level);
      if (isEmpty(write)) {
        write = writeTo.mongoDb.find(x => x.level === logger.level);
      }
      if (!isEmpty(write)) {
        await mongoose
          .connect(
            write.connectionString,
            { useNewUrlParser: true }
          )
          .catch(error => {
            throw new Error(error);
          });
        if (mongoose.connection.readyState === 1) {
          const newlog = new Log({
            name: logger.label,
            date: new Date(),
            level: logger.level,
            caller: externalCaller,
            message: message
          });

          await newlog.save();
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  writeToMongoDb: writeToMongoDb
};
