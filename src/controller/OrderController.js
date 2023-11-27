const OrderService = require("../service/OrderService.js");
const AuthorizationError = require("../exceptions/AuthorizationError.js");

async function createOrder(req, res, next) {
  try {
    if (req.JWT.role !== "user")
      throw new AuthorizationError("user cannot be access");
    const order = await OrderService.createOrder(req.body, req.JWT.user);
    res.json({
      message: "create order success",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder };
