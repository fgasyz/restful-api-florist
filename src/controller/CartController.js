const CartService = require("../service/CartService.js");

async function createCart(req, res, next) {
  try {
    const {user} =req.JWT
    const { productId } = req.params;
    const cart = await CartService.createCart(req.body, user, productId);
    res.status(201).json({
      message: "create cart success",
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
}

async function getCart(req, res, next) {
    try {
        const {user} = req.JWT
        const carts = await CartService.getCart(user)
        res.status(200).json({
            message: "get cart success",
            data: {carts}
        })
    }catch(error) {
        next(error)
    }
}

module.exports = { createCart, getCart };
