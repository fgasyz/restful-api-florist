const express = require("express")
const CategoryController = require("../controller/CategoryController.js")
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware.js")

const privateRouter = express.Router()

//category
privateRouter.post("/create-category", adminAuthMiddleware, CategoryController.createCategory)

module.exports = privateRouter;