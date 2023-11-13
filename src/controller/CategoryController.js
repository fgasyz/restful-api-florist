const CategoryService = require("../service/CategoryService.js");

async function createCategory(req, res, next) {
  try {
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
    const allCategory = await CategoryService.getAllCategory()
    res.status(200).json({
      message: "get list of category success",
      data: {allCategory}
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createCategory, getAllCategory };
