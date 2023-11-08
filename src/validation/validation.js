const ClientError = require("../exceptions/ClientError.js")

const validation = (schema, payload) => {
    const result = schema.validate(payload, {
        abortEarly: false,
        allowUnknown: false
    })
    if(result.error) {throw new ClientError("Data isn't correct")}
    else {return result.value}
}

module.exports = validation