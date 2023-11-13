const ClientError = require("../exceptions/ClientError.js")
const ProductService = require("../service/ProductService.js")

async function createProduct(req, res, next) {
    try {
        const admin = req.JWT.admin
        if (!req.files.picture) throw new ClientError("no product images uploaded")
        if(req.files.picture.mimetype !== "image/jpeg") throw new ClientError("mimetype is wrong")
        const picture = req.files.picture
        const product = await ProductService.createProduct(req.body, admin, picture)
        res.status(201).json({
            message: "create product success",
            data: product
        })
    } catch (error) {
        next(error)
    }
}

async function getAllProduct(req, res, next) {
    try {
        const allProduct = await ProductService.getAllProduct()
        res.status(200).json({
            data: {allProduct}
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createProduct, getAllProduct}

