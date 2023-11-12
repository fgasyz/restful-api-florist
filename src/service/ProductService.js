const prismaClient = require("../application/database.js");
const {
  createProductValidation,
} = require("../validation/productValidation.js");
const validation = require("../validation/validation.js");

async function createProduct(request, admin) {
  const productValidation = validation(createProductValidation, request);
  productValidation.username_admin = admin;

  const [category, product] = await prismaClient.$transaction(async (prisma) => {
    const category = await prisma.category.findFirst({
      where: {
        id: productValidation.category_id
      },
    });

    const product = await prisma.product.create({
      data: {
        product_name: productValidation.product_name,
        price: productValidation.price,
        description: productValidation.description,
        picture: productValidation.picture,
        stock: productValidation.stock,
        username_admin: productValidation.username_admin,
        category_id: category.id,
      },
      select: {
        product_name: true,
        price: true,
        description: true,
        picture: true,
        stock: true
      }
    });

    return [category.category_name, product];
  });

  return {category, product};
}

module.exports = { createProduct };
