const { JsonWebTokenError } = require("jsonwebtoken");

class CustomJsonWebTokenError extends JsonWebTokenError {
    constructor(message, statusCode = 401) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = CustomJsonWebTokenError