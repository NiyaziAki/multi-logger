const isEmpty = require("../utils/validation/is-empty");
const mongoose = require("mongoose");
const Log = require("../models/log");
const optionUtils = require("./option-utils");

const isConnected = () => mongoose.connection.readyState === 1;

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

// eslint-disable-next-line space-before-function-paren
const writeToMongoDb = async (writeTo, logger, message, externalCaller) => {
  try {
    if (isEmpty(writeTo.mongoDb)) {
      return;
    }
    const write = optionUtils.findRule(writeTo.mongoDb, logger);

    await connect(write);

    const newlog = new Log({
      name: logger.label,
      date: new Date(),
      level: logger.level,
      caller: externalCaller,
      message
    });

    await newlog.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  writeToMongoDb
};
