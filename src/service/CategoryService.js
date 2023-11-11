const prismaClient = require("../application/database.js")
const { createCategoryValidation } = require("../validation/categoryValidation.js")
const validation = require("../validation/validation.js")

async function createCategory(request) {
    const categoryValidation = validation(createCategoryValidation, request.category)
    const category = await prismaClient.category.create({
        data: {
            category_name: categoryValidation,
        }
    })
    return category
}

module.exports = {createCategory}