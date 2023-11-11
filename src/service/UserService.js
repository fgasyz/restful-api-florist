const validate = require("../validation/validation.js")
const {createUserValidation, loginUserValidation, refreshTokenValidation} = require("../validation/userValidation.js")
const bcrypt = require("bcrypt")
const prismaClient = require("../application/database.js")
const AuthenticationError = require("../exceptions/AuthenticationError.js")
const {generateAcccessToken, generateRefreshToken, verifyRefreshToken} = require("../utils/token.js")

async function registerUser(request) {
    const userValidation = validate(createUserValidation, request)
    const user = await prismaClient.User.findFirst({where: {username: userValidation.username}})
    if(user) throw new AuthenticationError("username is exist")
    const hash = await bcrypt.hash(request.password, 10)
    userValidation.password = hash
    const data = await prismaClient.user.create({
        data: {
            username:userValidation.username,
            no_hp: userValidation.no_hp,
            password: userValidation.password,
        }
    })
    return data
}

async function loginUser(request) {
    const userValidation = validate(loginUserValidation, request)
    const user = await prismaClient.user.findFirst({where: {username: userValidation.username}})
    if(!user) throw new AuthenticationError("incorrect username")
    const isMatch = await bcrypt.compare(userValidation.password, user.password)
    if(!isMatch) throw new AuthenticationError("incorrect password")
    const payload = {user: user.username, role: "user"}
    const accessToken = await generateAcccessToken(payload)
    const refreshToken = await generateRefreshToken(payload)
    const data = {user, accessToken, refreshToken}
    return data
}

async function generateRefreshTokenForLogin(requestToken) {
    const refreshTokenValidate = validate(refreshTokenValidation, requestToken.refreshToken)
    const refreshTokenVerify = await verifyRefreshToken(refreshTokenValidate)
    const payload = {user: refreshTokenVerify.user}
    const accessToken = await generateAcccessToken(payload)
    const refreshToken = await generateRefreshToken(payload)
    return {accessToken, refreshToken}
}

module.exports = {registerUser, loginUser, generateRefreshTokenForLogin}