const CartService = require("../service/CartService.js");

async function createCart(req, res, next) {
  try {
    if (req.JWT.role !== "user") throw new AuthorizationError("not authorized");
    const { user } = req.JWT;
    await CartService.createCart(req.body, user);
    res.status(201).json({
      message: "create cart success",
    });
  } catch (error) {
    next(error);
  }
}

async function getCart(req, res, next) {
  try {
    if (req.JWT.role !== "user") throw new AuthorizationError("not authorized");
    const { user } = req.JWT;
    const carts = await CartService.getCart(user);
    res.status(200).json({
      message: "get cart success",
      data: { carts },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCart(req, res, next) {
  try {
    if (req.JWT.role !== "user") throw new AuthorizationError("not authorized");
    const { user } = req.JWT;
    await CartService.deleteCart(req.params, user);
    res.status(200).json({
      message: "delete cart success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createCart, getCart, deleteCart };
