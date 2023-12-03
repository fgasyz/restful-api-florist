const prismaClient = require("../application/database.js");
const {
  createOrderValidation,
  deleteOrderValidation,
  getOrderValidation,
} = require("../validation/orderValidation.js");
const validation = require("../validation/validation.js");
const NotFoundError = require("../exceptions/NotFoundError.js");
const ClientError = require("../exceptions/ClientError.js");

async function createOrder(request, user) {
  const orderValidation = validation(createOrderValidation, request);
  let cart, order, product;

  for (let i = 0; i < orderValidation.length; i++) {
    orderValidation[i].username_user = user;

    cart = await prismaClient.cart.findUnique({
      where: { id: orderValidation[i].cart_id },
    });

    if (!cart) {
      throw new ClientError(
        `cart with id '${orderValidation[i].cart_id}' is not found`
      );
    }
  }

  for (let i = 0; i < orderValidation.length; i++) {
    cart = await prismaClient.cart.findMany({ where: { username_user: user } });

    if (cart.length != orderValidation.length) {
      throw new ClientError(`carts length is not match`);
    }

    product = await prismaClient.product.findUnique({
      where: { id: cart[i].product_id },
    });

    if (!product) {
      throw new ClientError(
        `product with id '${cart[i].product_id}' is not found`
      );
    }

    await prismaClient.product.updateMany({
      where: { id: product.id },
      data: {
        stock: product.stock - cart[i].qty,
      },
    });

    order = await prismaClient.order.createMany({
      data: [orderValidation[i]],
    });
  }

  return order;
}

async function getOrder(user) {
  const order = await prismaClient.order.findMany({
    where: { username_user: user },
    select: {
      id: true,
      username_user: true,
    },
  });
  return order;
}

async function deleteOrder(request, user) {
  const orderValidation = validation(deleteOrderValidation, request.orderId);
  const order = await prismaClient.order.findUnique({
    where: { id: orderValidation },
  });
  if (!order) {
    throw new ClientError("order id isn't found");
  }
  await prismaClient.order.delete({ where: { id: orderValidation } });
}

module.exports = { createOrder, getOrder, deleteOrder };
