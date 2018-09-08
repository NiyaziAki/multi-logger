const isEmpty = require("../utils/validation/is-empty");
var mongoose = require("mongoose");
const Log = require("../models/log");
const optionUtils = require("./option-utils");

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connect = async write => {
  if (isEmpty(write) || isEmpty(write.connectionString)) {
    throw new Error("no connection string found for connection");
  }

  if (isConnected()) {
    mongoose.connection.close();
  }
  await mongoose
    .connect(
      write.connectionString,
      { useNewUrlParser: true }
    )
    .catch(error => {
      throw new Error(error);
    });
};

const writeToMongoDb = async (writeTo, logger, message, externalCaller) => {
  try {
    let write = optionUtils.findRule(writeTo.mongoDb);
    await connect(write);

    const newlog = new Log({
      name: logger.label,
      date: new Date(),
      level: logger.level,
      caller: externalCaller,
      message: message
    });

    await newlog.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  writeToMongoDb: writeToMongoDb
};
