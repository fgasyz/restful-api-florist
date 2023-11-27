const prismaClient = require("../application/database.js");
const {
  createCartValidation,
  getCartValidation,
  deleteCartValidation,
} = require("../validation/cartValidation.js");
const validation = require("../validation/validation.js");

async function createCart(request, user) {
  const cartValidate = validation(createCartValidation, request);
}

async function getCart(user) {
  const allCart = await prismaClient.cart.findMany({
    where: {
      username_user: user,
    },
    select: {
      id: true,
      username_user: true,
      product: true,
    },
  });

  const totalPrice = await prismaClient.cart.groupBy({
    by: ["product_id"],
    _sum: { total_price: true },
  });

  return { allCart, totalPrice };
}

async function deleteCart(request, user) {
  const cartValidation = validation(deleteCartValidation, request.cartId);
  await prismaClient.cart.delete({
    where: {
      id: cartValidation,
      username_user: user,
    },
  });
}

module.exports = { createCart, getCart, deleteCart };
