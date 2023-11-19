const prismaClient = require("../application/database.js");
const ClientError = require("../exceptions/ClientError.js");
const {
  createProductValidation,
  getProductValidation,
} = require("../validation/productValidation.js");
const validation = require("../validation/validation.js");

async function createProduct(request, admin, picture) {
  const productValidation = validation(createProductValidation, request);
  productValidation.username_admin = admin;

  let newPictureName = picture.name.replace(/\s/g, "");

  const uploadFolder = __dirname + "/../uploads/" + newPictureName;
  picture.mv(uploadFolder, (err) => {
    if (err) throw new ClientError("upload file is failed");
  });

  const [category, product] = await prismaClient.$transaction(
    async (prisma) => {
      const category = await prisma.category.findFirst({
        where: {
          id: productValidation.category_id,
        },
      });

      const product = await prisma.product.create({
        data: {
          product_name: productValidation.product_name,
          price: productValidation.price,
          description: productValidation.description,
          picture: uploadFolder,
          stock: productValidation.stock,
          username_admin: productValidation.username_admin,
          category_id: category.id,
        },
        select: {
          id: true,
          product_name: true,
          price: true,
          description: true,
          picture: true,
          stock: true,
        },
      });

      return [category.category_name, product];
    }
  );

  return { category, product };
}

async function getAllProduct() {
  const allProduct = await prismaClient.$queryRaw`SELECT * FROM product`;
  return allProduct;
}

async function getProductById(request) {
  const productValidation = validation(getProductValidation, request.productId);
  const category = await prismaClient.product.findUnique({
    where: {
      id: productValidation,
    },
  });
  return category;
}

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
};
