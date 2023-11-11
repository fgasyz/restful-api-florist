const jsonwebtoken = require("jsonwebtoken")
const env = require("dotenv").config().parsed

const token = {
    generateAcccessToken : async function (payload) {
        return jsonwebtoken.sign(payload, env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: "10m"})
    },
    generateRefreshToken: async function (payload) {
        return jsonwebtoken.sign(payload, env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: "15m"})
    },
    verifyAccessToken: async function (token) {
        return jsonwebtoken.verify(token, env.ACCESS_TOKEN_SECRET_KEY)
    },
    verifyRefreshToken: async function (token) {
        return jsonwebtoken.verify(token, env.REFRESH_TOKEN_SECRET_KEY)
    }
}

module.exports = token