const prismaClient = require("../application/database.js");
const { createOrderValidation } = require("../validation/orderValidation.js");
const validation = require("../validation/validation.js");
const InvariantError = require("../exceptions/InvariantError.js");

async function createOrder(request, user) {
  const orderValidation = validation(createOrderValidation, request);
  const carts = orderValidation.cartId.map((item) => ({
    username_user: user,
    cart_id: item,
  }));
  await prismaClient.order.createMany({
    data: [...carts],
  });

  const getOrder = await prismaClient.order.findMany({
    select: {
      id: true,
      invoice: true,
      status: true,
      username_user: true,
      cart: {
        select: {
          id: true,
          total_price: true,
          product: {
            select: {
              id: true,
              product_name: true,
              price: true,
              picture: true,
              category_id: true,
            },
          },
        },
      },
    },
  });

  return getOrder;
}

module.exports = { createOrder };
