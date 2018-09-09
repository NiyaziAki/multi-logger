const foregrounds = require("../enums/foregrounds");
const backgrounds = require("../enums/backgrounds");
const levels = require("../enums/levels");

const createDefaultLogger = (badge, foreground, label, level) => ({
  badge,
  foreground,
  background: backgrounds.Default,
  isUnderlined: true,
  text: {
    foreground: foregrounds.Default,
    background: backgrounds.Default,
    isUnderlined: false
  },
  label,
  level
});

const defaultLoggers = {
  info: createDefaultLogger("ℹ", foregrounds.LightBlue, "Info", levels.Trace),
  success: createDefaultLogger("✔", foregrounds.Green, "Success", levels.Debug),
  warning: createDefaultLogger(
    "⚠",
    foregrounds.Yellow,
    "Warning",
    levels.Warning
  ),
  error: createDefaultLogger("✖", foregrounds.LightRed, "Error", levels.Error),
  fatal: createDefaultLogger("★", foregrounds.Red, "Fatal Error", levels.Fatal)
};

module.exports = Object.freeze(defaultLoggers);
