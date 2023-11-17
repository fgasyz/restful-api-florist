const express = require("express")
const CategoryController = require("../controller/CategoryController.js")
const ProductController = require("../controller/ProductController.js")
const CartController = require("../controller/CartController.js")
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware.js")
const userAuthMiddleware = require("../middleware/userAuthMiddleware.js")

const privateRouter = express.Router()

//category
privateRouter.post("/create-category", adminAuthMiddleware, CategoryController.createCategory)

//product
privateRouter.post("/create-product", adminAuthMiddleware, ProductController.createProduct)

//cart
privateRouter.post("/create-cart/products/:productId", userAuthMiddleware, CartController.createCart)
privateRouter.get("/carts", userAuthMiddleware, CartController.getCart)

module.exports = privateRouter;