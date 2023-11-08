const ClientError = require("./ClientError.js")

class InvariantError extends ClientError {
    constructor(message) {
        super(message)
        this.name = "Invariant Error"
    }
}

module.exports = InvariantError