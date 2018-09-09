const mongoose = require("mongoose");
const levels = require("../enums/levels");
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const LogSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    index: true
  },
  date: {
    type: Schema.Types.Date,
    required: true,
    index: true
  },
  level: {
    type: Schema.Types.Number,
    min: levels.Trace,
    max: levels.Fatal,
    required: true,
    index: true
  },
  caller: {
    type: Schema.Types.String,
    required: true
  },
  message: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model("logs", LogSchema);
