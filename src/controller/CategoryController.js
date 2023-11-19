const CategoryService = require("../service/CategoryService.js");
const AuthorizationError = require("../exceptions/AuthorizationError.js");

async function createCategory(req, res, next) {
  try {
    if (req.JWT.role !== "admin")
      throw new AuthorizationError("not authorized");
    const admin = req.JWT.admin;
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({
      message: "create category success",
      data: {
        category,
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getAllCategory(req, res, next) {
  try {
    const allCategory = await CategoryService.getAllCategory();
    res.status(200).json({
      message: "get list of category success",
      data: { allCategory },
    });
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const category = await CategoryService.getCategoryById(req.params);
    res.status(200).json({
      message: "get category by id success",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCategoryById(req, res, next) {
  try {
    if (req.JWT.role !== "admin")
      throw new AuthorizationError("not authorized");
    await CategoryService.deleteCategoryById(req.params);
    res.status(200).json({
      message: "delete category success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
};
