const AuthorizationError = require("../exceptions/AuthorizationError.js");
const jsonwebtoken = require("jsonwebtoken");
const env = require("dotenv").config().parsed;
const prismaClient = require("../application/database.js");

const adminAuthMiddleWare = async (req, res, next) => {
  if (req.get("Authorization")) {
    const header = req.get("Authorization").split(" ")[1];
    jsonwebtoken.verify(header, env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      req.JWT = data;
      next();
    });
  } else {
    res
      .status(403)
      .json({ error: new AuthorizationError("Unauthorized").message });
  }
};

module.exports = adminAuthMiddleWare;
