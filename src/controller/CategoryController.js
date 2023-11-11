const CategoryService = require("../service/CategoryService.js")

async function createCategory(req, res, next) {
    try {
        const category = await CategoryService.createCategory(req.body)
        res.status(201).json({
            message: "create category success",
            data: {
                category
            }
        })
    }catch(error) {
        next(error)
    }
    
}

module.exports = {createCategory}