const AuthorizationError = require("../exceptions/AuthorizationError.js");
const jsonwebtoken = require("jsonwebtoken");
const env = require("dotenv").config().parsed

const authMiddleWare = (req, res, next) => {
  if (req.get("Authorization")) {
    const header = req.get("Authorization").split(" ")[1];
    jsonwebtoken.verify(header, env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
        if(err) {
            throw err
        }else {
            req.JWT = data;
            next();
        }
    })
  } else {
    throw new AuthorizationError("Unauthorized");
  }
};

module.exports = authMiddleWare;
