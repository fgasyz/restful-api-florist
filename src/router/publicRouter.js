const express = require("express")
const CategoryController = require("../controller/CategoryController.js")

const publicRouter = express.Router()

// category
publicRouter.get("/categories", CategoryController.getAllCategory)

module.exports = publicRouter