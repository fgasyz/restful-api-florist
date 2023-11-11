const ClientError = require("../exceptions/ClientError.js");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError.js");
const AuthorizationError = require("../exceptions/AuthorizationError.js");
const InvariantError = require("../exceptions/InvariantError.js");

const errorMiddleware = (error, req, res, next) => {
  if (!error) {
    next();
    return;
  }
  if (
    error instanceof ClientError ||
    error instanceof NotFoundError ||
    error instanceof AuthenticationError ||
    error instanceof AuthorizationError ||
    error instanceof InvariantError
  ) {
    res.status(error.statusCode).json({
      error: error.message,
    })
  }else {
    res.status(500).json({
        error: error.message,
    })
  }
};

module.exports = errorMiddleware;
