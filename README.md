# multi-logger
A simple configurable multi level logger.

[![Version npm](https://img.shields.io/npm/v/multi-loggerjs.svg?style=flat-square)](https://www.npmjs.com/package/multi-loggerjs)
[![npm Downloads](https://img.shields.io/npm/dm/multi-loggerjs.svg?style=flat-square)](https://npmcharts.com/compare/multi-loggerjs?minimal=true)
[![Dependencies](https://img.shields.io/david/NiyaziAki/multi-logger.svg?style=flat-square)](https://david-dm.org/NiyaziAki/multi-logger)
[![Build Status](https://travis-ci.org/NiyaziAki/multi-logger.svg?branch=master)](https://travis-ci.org/NiyaziAki/multi-logger)


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
