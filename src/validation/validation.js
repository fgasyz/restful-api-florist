const ClientError = require("../exceptions/ClientError.js")

const validation = (schema, payload) => {
    const result = schema.validate(payload, {
        abortEarly: false,
        allowUnknown: false
    })
    if(result.error) {
      throw result.error
    }
    else {return result.value}
}

module.exports = validation