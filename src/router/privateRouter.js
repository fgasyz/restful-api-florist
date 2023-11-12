const express = require("express")
const CategoryController = require("../controller/CategoryController.js")
const ProductController = require("../controller/ProductController.js")
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware.js")

const privateRouter = express.Router()

//category
privateRouter.post("/create-category", adminAuthMiddleware, CategoryController.createCategory)

//product
privateRouter.post("/create-product", adminAuthMiddleware, ProductController.createProduct)

module.exports = privateRouter;