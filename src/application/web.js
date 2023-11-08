const express = require("express")
const errorMiddleware = require("../middleware/ErrorMiddleware.js")
const adminRouter = require("../router")

const web = express()

web.use(express.json())

web.use(adminRouter)

web.use(errorMiddleware)

module.exports = web
