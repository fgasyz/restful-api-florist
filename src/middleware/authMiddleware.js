const token = require("../utils/token.js")
const AuthorizationError = require("../exceptions/AuthorizationError.js")

const authMiddleWare = async (req, res, next) => {
    const header = req.get("authorization")
    const tokenvalidate = await token.verifyRefreshToken(header)
    if(!tokenvalidate) {
        throw new AuthorizationError("Unauthorized")
    }else {
        req.jwt = tokenvalidate.admin
        next()
    }
}

module.exports = authMiddleWare