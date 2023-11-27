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
  cart = await prismaClient.cart.findMany({ where: { username_user: user } });
  if (orderValidation.length != cart.length) {
    throw new ClientError("cart length is not match");
  }
  for (let i = 0; i < orderValidation.length; i++) {
    cart = await prismaClient.cart.findFirst({
      where: { id: orderValidation[i].cart_id, AND: { username_user: user } },
    });
    if (!cart) {
      throw new NotFoundError(
        `cart id '${orderValidation[i].cart_id}' is not found`
      );
    }
    product = await prismaClient.product.findUnique({
      where: { id: cart.product_id },
    });
    await prismaClient.product.update({
      where: { id: cart.product_id },
      data: {
        stock: product.stock - cart.qty,
      },
    });
    orderValidation[i].username_user = user;
    order = await prismaClient.order.createMany({
      data: [orderValidation[i]],
    });
    return order;
  }
}

async function getOrder(user) {
  const order = await prismaClient.order.findMany({
    where: { username_user: user },
    select: {
      id: true,
      invoice: true,
      status: true,
      username_user: true,
    },
  });
  return order;
}

async function deleteOrder(request, user) {
  const orderValidation = validation(deleteOrderValidation, request.orderId);
  await prismaClient.order.delete({ where: { id: orderValidation } });
}

module.exports = { createOrder, getOrder, deleteOrder };
