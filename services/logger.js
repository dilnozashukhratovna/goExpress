const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp(), myFormat, json()),
    transports: [
        new transports.Console({ level: "debug" }),
        new transports.File({ filename: "log/error.log", level: "error" }),
        new transports.File({ filename: "log/combine.log", level: "info" }),
    ],
});

logger.exceptions.handle(
    new transports.File({ filename: "log/exceptions.log" })
);
logger.rejections.handle(
    new transports.File({ filename: "log/rejections.log" })
);
logger.exitOnError = false;

module.exports = logger;