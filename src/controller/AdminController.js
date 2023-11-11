const AdminService = require("../service/AdminService.js");

async function registerAdmin(req, res, next) {
  try {
    const data = await AdminService.registerAdmin(req.body);
    res.status(201).json({
      message: "create admin success",
      data: {
        admin: data,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function loginAdmin(req, res, next) {
  try {
    const data = await AdminService.loginAdmin(req.body);
    res.status(201).json({
      message: "login success",
      data: { data },
    });
  } catch (error) {
    next(error);
  }
}

async function generateRefreshTokenForLogin(req, res, next) {
  try {
    const tokens = await AdminService.generateRefreshTokenForLogin(req.body);
    res.status(201).json({
      message: "create refreshtoken success",
      tokens,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerAdmin, loginAdmin, generateRefreshTokenForLogin };
