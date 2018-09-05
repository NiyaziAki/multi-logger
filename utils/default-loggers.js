const foregrounds = require("../enums/foregrounds");
const backgrounds = require("../enums/backgrounds");
const levels = require("../enums/levels");
const defaultLoggers = {
  info: {
    badge: "ℹ",
    foreground: foregrounds.LightBlue,
    background: backgrounds.Default,
    isUnderlined: true,
    text: {
      foreground: foregrounds.Default,
      background: backgrounds.Default,
      isUnderlined: false
    },
    label: "Info",
    level: levels.Trace
  },
  success: {
    badge: "✔",
    foreground: foregrounds.Green,
    background: backgrounds.Default,
    isUnderlined: true,
    text: {
      foreground: foregrounds.Default,
      background: backgrounds.Default,
      isUnderlined: false
    },
    label: "Success",
    level: levels.Debug
  },
  warning: {
    badge: "⚠",
    foreground: foregrounds.Yellow,
    background: backgrounds.Default,
    isUnderlined: true,
    text: {
      foreground: foregrounds.Default,
      background: backgrounds.Default,
      isUnderlined: false
    },
    label: "Warning",
    level: levels.Warning
  },
  error: {
    badge: "✖",
    foreground: foregrounds.LightRed,
    background: backgrounds.Default,
    isUnderlined: true,
    text: {
      foreground: foregrounds.Default,
      background: backgrounds.Default,
      isUnderlined: false
    },
    label: "Error",
    level: levels.Error
  },
  fatal: {
    badge: "★",
    foreground: foregrounds.Red,
    background: backgrounds.Default,
    isUnderlined: true,
    text: {
      foreground: foregrounds.Default,
      background: backgrounds.Default,
      isUnderlined: false
    },
    label: "Fatal Error",
    level: levels.Fatal
  }
};

module.exports = Object.freeze(defaultLoggers);
