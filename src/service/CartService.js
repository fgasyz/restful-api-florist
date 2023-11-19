const prismaClient = require("../application/database.js");
const {
  createCartValidation,
  getCartValidation,
  deleteCartValidation,
} = require("../validation/cartValidation.js");
const validation = require("../validation/validation.js");

async function createCart(request, user, productId) {
  const payload = {
    product_id: productId,
    total_price: request.total_price,
  };
  const cartValidate = validation(createCartValidation, payload);
  const product = await prismaClient.product.findUnique({
    where: { id: cartValidate.product_id },
  });
  const cart = await prismaClient.cart.create({
    data: {
      username_user: user,
      product_id: product.id,
      total_price: product.price,
    },
  });
  return cart;
}

async function getCart(user) {
  const allCart = await prismaClient.cart.findMany({
    where: {
      username_user: user,
    },
    include: {
      product: {
        select: {
          product_name: true,
          price: true,
          picture: true,
          stock: true,
        },
      },
    },
  });

  const totalPrice = await prismaClient.cart.groupBy({
    by: ["product_id"],
    _sum: { total_price: true },
    where: {
      id: allCart.id,
      AND: {
        username_user: user,
      },
    },
  });

  return { allCart, totalPrice };
}

async function deleteCart(request, user) {
  const cartValidation = validation(deleteCartValidation, request);
  const product = await prismaClient.product.findUnique({
    where: { id: cartValidation.productId },
  });
  await prismaClient.cart.delete({
    where: {
      id: cartValidation.cartId,
      username_user: user,
      AND: {
        product_id: product.id,
      },
    },
  });
}

module.exports = { createCart, getCart, deleteCart };
