const OrderService = require("../service/OrderService.js");
const AuthorizationError = require("../exceptions/AuthorizationError.js");

async function createOrder(req, res, next) {
  try {
    // if (req.JWT.role !== "user")
    //   throw new AuthorizationError("user cannot be access");
    const order = await OrderService.createOrder(req.body, req.JWT.user);
    res.json({
      message: "create order success",
    });
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await OrderService.getOrder(req.JWT.user);
    res.json({
      message: "get order success",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    await OrderService.deleteOrder(req.params, req.JWT.admin);
    res.json({
      message: "delete order success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, getOrder, deleteOrder };
