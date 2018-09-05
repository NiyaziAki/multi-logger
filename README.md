# multi-logger
A simple configurable multi level logger.

[![Version npm](https://img.shields.io/npm/v/multi-loggerjs.svg?style=flat-square)](https://www.npmjs.com/package/multi-loggerjs)
[![npm Downloads](https://img.shields.io/npm/dm/multi-loggerjs.svg?style=flat-square)](https://npmcharts.com/compare/multi-loggerjs?minimal=true)
[![Dependencies](https://img.shields.io/david/NiyaziAki/multi-logger.svg?style=flat-square)](https://david-dm.org/NiyaziAki/multi-logger)
[![Build Status](https://travis-ci.org/NiyaziAki/multi-logger.svg?branch=master)](https://travis-ci.org/NiyaziAki/multi-logger)
[![MIT License](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/NiyaziAki/multi-logger/blob/master/LICENSE)


[![NPM](https://nodei.co/npm/multi-loggerjs.png?downloads=true&downloadRank=true)](https://nodei.co/npm/multi-loggerjs/)

## Install

```bash
npm i multi-loggerjs
```

## Usage

### Default Usage

```js
const logger = require("multi-loggerjs");

let multiLogger = new logger.MultiLogger();

multiLogger.info("Info !");
multiLogger.success("Success !");
multiLogger.warning("Warning !");
multiLogger.error("Error !");
multiLogger.fatal("Fatal Error !");
```
<div align="center">
  <img alt="Default Usage" src="docs/defaultusage.PNG">
</div>

### Configuration

```js
const logger = require("multi-loggerjs");

const options = {
  dateFormat: "MMMM Do YYYY",
  timeFormat: "h:mm:ss",
  showFullPath: true,
  showDate: true,
  showTime: true,
  showCallerInfo: true
};

let multiLogger = new logger.MultiLogger(options);
multiLogger.info("Configurable logger!");

```
<div align="center">
  <img alt="Default Usage" src="docs/configure.PNG">
</div>

multi-logger is using [![String Format](https://img.shields.io/badge/moment-v2.22.2-brightgreen.svg)](https://momentjs.com/docs/#/parsing/string-format/) for date and time formats.

#### Custom loggers & Modifications

```js
const logger = require("multi-loggerjs");
const foregrounds = logger.foregrounds;
const backgrounds = logger.backgrounds;
const levels = logger.levels;

const options = {
  loggers: {
    info: {
      badge: "ℹ",
      foreground: foregrounds.Magenta,
      background: backgrounds.Default,
      isUnderlined: false,
      text: {
        foreground: foregrounds.LightCyan,
        background: backgrounds.Default,
        isUnderlined: true
      },
      label: "Info",
      level: levels.Trace
    },
    status: {
      level: levels.Trace,
      badge: "☺",
      label: "Status",
      foreground: foregrounds.LightGreen,
      background: backgrounds.Default,
      isUnderlined: true,
      text: {
        foreground: foregrounds.White,
        background: backgrounds.LightRed,
        isUnderlined: true
      }
    }
  }
};

let multiLogger = new logger.MultiLogger(options);
multiLogger.info("Modified logger!");
multiLogger.status("New logger!");

```

<div align="center">
  <img alt="Default Usage" src="docs/configure2.PNG">
</div>

#### Available Foregrounds and Backgrounds

Available foregrounds and backgrounds are as follows; Default, Black, Red, Green, Yellow, Blue, Magenta, Cyan, LightGray, DarkGray, LightRed, LightGreen, LightYellow, LightBlue, LightMagenta, LightCyan, White.

| Foregrounds   | Backgrounds   |
| ------------- |:-------------:|
| <img alt="Default Usage" src="docs/foregrounds.PNG">      | <img alt="Default Usage" src="docs/backgrounds.PNG"> |
