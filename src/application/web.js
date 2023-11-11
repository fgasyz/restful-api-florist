const express = require("express")
const errorMiddleware = require("../middleware/ErrorMiddleware.js")
const authRouter = require("../router/authRouter.js")
const privateRouter = require("../router/privateRouter.js")

const web = express()

web.use(express.json())

web.use(authRouter)
web.use(privateRouter)

web.use(errorMiddleware)

module.exports = web
