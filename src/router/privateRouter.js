const express = require("express")
const CategoryController = require("../controller/CategoryController.js")
const authMiddleware = require("../middleware/adminAuthMiddleware.js")

const privateRouter = express.Router()

//category
privateRouter.post("/create-category", authMiddleware, CategoryController.createCategory)

module.exports = privateRouter;