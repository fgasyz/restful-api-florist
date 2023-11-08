const jsonwebtoken = require("jsonwebtoken")
const CustomJsonWebTokenError = require("../exceptions/CustomJsonWebTokenError")
const env = require("dotenv").config().parsed

const token = {
    generateAcccessToken : async function (payload) {
        return jsonwebtoken.sign(payload, env.ACCESS_TOKEN, {expiresIn: "2m"})
    },
    generateRefreshToken: async function (payload) {
        return jsonwebtoken.sign(payload, env.REFRESH_TOKEN, {expiresIn: "5m"})
    },
    verifyRefreshToken: async function (token) {
        return jsonwebtoken.verify(token, env.REFRESH_TOKEN, (err, data) => {
            if(err) {
                throw new CustomJsonWebTokenError("invalid refreshtoken")
            }
            return data
        })
    }
}

module.exports = token