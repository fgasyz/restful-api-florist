const express = require("express");
const CategoryController = require("../controller/CategoryController.js");
const ProductController = require("../controller/ProductController.js");
const CartController = require("../controller/CartController.js");
const OrderController = require("../controller/OrderController.js");
const InvoiceController = require("../controller/InvoiceController.js");
const ReportController = require("../controller/ReportController.js");

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
privateRouter.post("/create-cart", authMiddleware, CartController.createCart);
privateRouter.get("/carts", authMiddleware, CartController.getCart);
privateRouter.delete(
  "/delete-carts/:cartId",
  authMiddleware,
  CartController.deleteCart
);

//order
privateRouter.post(
  "/create-order",
  authMiddleware,
  OrderController.createOrder
);
privateRouter.get("/order", authMiddleware, OrderController.getOrder);
privateRouter.delete(
  "/delete-order/:orderId",
  authMiddleware,
  OrderController.deleteOrder
);

//invoice
privateRouter.post(
  "/create-invoice",
  authMiddleware,
  InvoiceController.createInvoice
);
privateRouter.get("/invoices", authMiddleware, InvoiceController.getAllInvoice);
privateRouter.get(
  "/download-invoice/:invoiceId",
  authMiddleware,
  InvoiceController.downloadInvoice
);

//report
privateRouter.post(
  "/create-report",
  authMiddleware,
  ReportController.createReport
);
privateRouter.get("/reports", authMiddleware, ReportController.getReport);
privateRouter.delete(
  "/reports/:reportId",
  authMiddleware,
  ReportController.deleteReport
);

module.exports = privateRouter;
