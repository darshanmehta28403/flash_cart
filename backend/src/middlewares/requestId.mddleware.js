const { randomUUID } = require("crypto");
const requestContext = require("./requestContext");

const requestIdMiddleware = (req, res, next) => {
  const requestId = randomUUID();
  res.setHeader("X-Request-ID", requestId);

  requestContext.run({requestId},()=>{
    next();
  })
};

module.exports = requestIdMiddleware;