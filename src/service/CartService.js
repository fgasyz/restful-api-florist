const prismaClient = require("../application/database.js");
const { createCartValidation, getCartValidation } = require("../validation/cartValidation.js");
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
        total_price: product.price
    },
  });
  return cart
}

async function getCart(user) {
    const carts = await prismaClient.cart.groupBy({
        by: ["product_id"],
        _sum: {total_price: true},
        where: {
            username_user: {
                contains: user
            }
        }
    })
    return carts
}

module.exports = { createCart, getCart };
