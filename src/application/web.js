const express = require("express")
const errorMiddleware = require("../middleware/ErrorMiddleware.js")
const authRouter = require("../router/authRouter.js")

const web = express()

web.use(express.json())

web.use(authRouter)

web.use(errorMiddleware)

module.exports = web
