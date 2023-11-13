const express = require("express")
const CategoryController = require("../controller/CategoryController.js")
const ProductController = require("../controller/ProductController.js")

const publicRouter = express.Router()

//category
publicRouter.get("/categories", CategoryController.getAllCategory)

//product
publicRouter.get("/products", ProductController.getAllProduct)

module.exports = publicRouter