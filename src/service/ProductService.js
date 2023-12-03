const prismaClient = require("../application/database.js");
const ClientError = require("../exceptions/ClientError.js");
const {
  createProductValidation,
  getProductValidation,
  deleteProductValidation,
} = require("../validation/productValidation.js");
const validation = require("../validation/validation.js");

async function createProduct(request, picture) {
  const productValidation = validation(createProductValidation, request);
  let newPictureName = picture.name.replace(/\s/g, "");

  const uploadFolder = __dirname + "/../uploads/" + newPictureName;
  picture.mv(uploadFolder, (err) => {
    if (err) throw new ClientError("upload file is failed");
  });

  await prismaClient.product.create({
    data: {
      product_name: productValidation.product_name,
      price: productValidation.price,
      description: productValidation.description,
      picture: uploadFolder,
      stock: productValidation.stock,
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

async function deleteProductById(request) {
  const productValidation = validation(
    deleteProductValidation,
    request.productId
  );
  await prismaClient.product.delete({
    where: {
      id: productValidation,
    },
  });
}

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
};
