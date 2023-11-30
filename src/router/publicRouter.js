const express = require("express");
const CategoryController = require("../controller/CategoryController.js");
const ProductController = require("../controller/ProductController.js");

const publicRouter = express.Router();

//category
publicRouter.get("/categories", CategoryController.getAllCategory);
publicRouter.get("/categories/:categoryId", CategoryController.getCategoryById);

//product
publicRouter.get("/products", ProductController.getAllProduct);
publicRouter.get("/products/:productId", ProductController.getProductById);

module.exports = publicRouter;
