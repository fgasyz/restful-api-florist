const UserService = require("../service/UserService.js")

async function registerUser(req, res, next) {
    try {
        const data = await UserService.registerUser(req.body)
        res.status(201).json({
            message: "create user success",
            data: {
                user: data
            }
        })
    } catch (error) {
        next(error)
    }
}

async function loginUser(req, res, next) {
    try {
        const data = await UserService.loginUser(req.body)
        res.status(201).json({
            message: "login success",
            data: {data}
        })
    } catch (error) {
        next(error)
    }
}

async function generateRefreshTokenForLogin(req, res, next) {
    try {
        const tokens = await UserService.generateRefreshTokenForLogin(req.body)
        res.status(201).json({
            message: "create refreshtoken success",
            tokens
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {registerUser, loginUser, generateRefreshTokenForLogin}