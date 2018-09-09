const fs = require("fs-extra");
const paddingRight = require("./padding-right");
const isEmpty = require("../utils/validation/is-empty");

const createMessage = (multiLogger, logger, message, externalCaller) => {
  const log = [];
  const badge = paddingRight(logger.badge, 4);
  const label = `${paddingRight(logger.label, multiLogger._maxLabelLength)} :`;

  if (multiLogger._options.showDate) {
    log.push(`[${multiLogger.date}]`);
  }
  if (multiLogger._options.showTime) {
    log.push(`[${multiLogger.time}]`);
  }
  if (multiLogger._options.showExternalCallerInfo) {
    log.push(`[${externalCaller}]`);
  }
  if (log.length > 0) {
    log.push("❯");
  }
  log.push(badge);
  log.push(label);
  log.push(message);

  return log.join(" ");
};

const calculateLevels = (first, second) => ({
  firstMinLevel: isEmpty(first.minLevel) ? -1 : first.minLevel,
  secondMinLevel: isEmpty(second.minLevel) ? -1 : second.minLevel,
  firstLevel: isEmpty(first.level) ? -1 : first.level,
  secondLevel: isEmpty(second.level) ? -1 : second.level
});

const sortFiles = files => {
  files.sort((first, second) => {
    const levels = calculateLevels(first, second);

    if (levels.firstMinLevel > levels.secondMinLevel) {
      return -1;
    }
    if (levels.firstMinLevel < levels.secondMinLevel) {
      return 1;
    }
    if (levels.firstLevel > levels.secondLevel) {
      return -1;
    }
    if (levels.firstLevel < levels.secondLevel) {
      return 1;
    }
    return 0;
  });
};

// eslint-disable-next-line space-before-function-paren
const write = async (file, multiLogger, logger, message, externalCaller) => {
  try {
    if (!isEmpty(file.folderPath)) {
      const filePath = `${file.folderPath}\\${file.fileName}`;

      await fs.ensureFile(filePath);
      if (!isEmpty(file.size)) {
        const stats = fs.statSync(filePath);

        if (file.size <= stats.size) {
          const newPath = `${file.folderPath}\\${multiLogger.timestamp}${
            file.fileName
          }`;

          fs.renameSync(filePath, newPath);
          await fs.ensureFile(filePath);
        }
      }
      await fs.appendFile(
        filePath,
        `${createMessage(multiLogger, logger, message, externalCaller)}\n`
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

// eslint-disable-next-line space-before-function-paren
const writeToFile = async (
  multiLogger,
  writeTo,
  logger,
  message,
  externalCaller
) => {
  try {
    if (!isEmpty(writeTo.file)) {
      const files = writeTo.file.filter(
        x => x.minLevel <= logger.level || x.level === logger.level
      );

      sortFiles(files);

      for (const file of files) {
        await write(file, multiLogger, logger, message, externalCaller);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  writeToFile
};
