const express = require("express");
const CategoryController = require("../controller/CategoryController.js");
const ProductController = require("../controller/ProductController.js");
const CartController = require("../controller/CartController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const privateRouter = express.Router();

//category
privateRouter.post(
  "/create-category",
  authMiddleware,
  CategoryController.createCategory
);

//product
privateRouter.post(
  "/create-product",
  authMiddleware,
  ProductController.createProduct
);

//cart
privateRouter.post(
  "/create-cart/products/:productId",
  authMiddleware,
  CartController.createCart
);
privateRouter.get("/carts", authMiddleware, CartController.getCart);
privateRouter.delete(
  "/delete-carts/:cartId/products/:productId",
  authMiddleware,
  CartController.deleteCart
);

module.exports = privateRouter;
