const prismaClient = require("../application/database.js");
const {
  createCartValidation,
  deleteCartValidation,
} = require("../validation/cartValidation.js");
const validation = require("../validation/validation.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const ClientError = require("../exceptions/ClientError.js");
const InvariantError = require("../exceptions/InvariantError.js");

async function createCart(request, user) {
  const cartValidate = validation(createCartValidation, request);
  cartValidate.username_user = user;
  let product, cart;
  for (let i = 0; i < cartValidate.length; i++) {
    cartValidate[i].username_user = user;
    product = await prismaClient.product.findUnique({
      where: { id: cartValidate[i].product_id },
    });
    if (!product) {
      throw new NotFoundError(
        `product with id '${cartValidate[i].product_id}' is not found`
      );
    }
    if (product.stock < 1) {
      throw new InvariantError(
        `product with id '${cartValidate[i].product_id}'currently out of stock`
      );
    }
    cart = await prismaClient.cart.findFirst({
      where: {
        product_id: cartValidate[i].product_id,
        AND: { username_user: user },
      },
    });
    if (cart) {
      throw new ClientError(
        `product with id '${cartValidate[i].product_id}' is already exist in a cart`
      );
    }
    cartValidate[i].total_price = product.price * cartValidate[i].qty;
    cart = await prismaClient.cart.createMany({
      data: [cartValidate[i]],
    });
  }
  return cart;
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
      qty: true,
    },
  });

  const totalPrice = await prismaClient.cart.groupBy({
    by: ["product_id"],
    _sum: { total_price: true },
    where: { username_user: user },
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
