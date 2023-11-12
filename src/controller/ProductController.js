const ProductService = require("../service/ProductService.js")

async function createProduct(req, res, next) {
    try {
        const admin = req.JWT.admin
        const product = await ProductService.createProduct(req.body, admin)
        res.status(201).json({
            message: "create product success",
            data: product
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createProduct}

