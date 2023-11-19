const AuthorizationError = require("../exceptions/AuthorizationError.js");
const ClientError = require("../exceptions/ClientError.js");
const ProductService = require("../service/ProductService.js");

async function createProduct(req, res, next) {
  try {
    if (req.JWT.role !== "admin")
      throw new AuthorizationError("not authorized");
    const admin = req.JWT.admin;
    if (!req.files.picture) throw new ClientError("no product images uploaded");
    if (req.files.picture.mimetype !== "image/jpeg")
      throw new ClientError("mimetype is wrong");
    const picture = req.files.picture;
    const product = await ProductService.createProduct(
      req.body,
      admin,
      picture
    );
    res.status(201).json({
      message: "create product success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllProduct(req, res, next) {
  try {
    const allProduct = await ProductService.getAllProduct();
    res.status(200).json({
      message: "get list of product success",
      data: { allProduct },
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await ProductService.getProductById(req.params);
    res.status(200).json({
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    if (req.JWT.role != "admin") throw new AuthorizationError("not authorized");
    await ProductService.deleteProductById(req.params);
    res.status(200).json({
      message: "delete product success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
};
