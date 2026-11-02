const pino = require("pino");
const requestContext = require("./requestContext");

const logger = pino();

const log = {
  info: (message, data = {}) =>
    logger.info(
      { ...data, requestId: requestContext.getStore()?.requestId },
      message,
    ),
  error: (message, data = {}) => {
    logger.error(
      { ...data, requestId: requestContext.getStore()?.requestId },
      message,
    );
  },
};

module.exports = log;

 