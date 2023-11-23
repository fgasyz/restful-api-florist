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
privateRouter.delete(
  "/delete-categories/:categoryId",
  authMiddleware,
  CategoryController.deleteCategoryById
);

//product
privateRouter.post(
  "/create-product",
  authMiddleware,
  ProductController.createProduct
);
privateRouter.delete(
  "/delete-products/:productId",
  authMiddleware,
  ProductController.deleteProductById
);

//cart
privateRouter.post(
  "/create-cart/products/:productId",
  authMiddleware,
  CartController.createCart
);
privateRouter.get("/carts", authMiddleware, CartController.getCart);
privateRouter.delete(
  "/delete-carts/:cartId",
  authMiddleware,
  CartController.deleteCart
);

module.exports = privateRouter;
