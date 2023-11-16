const prismaClient = require("../application/database.js")
const { createCategoryValidation, getCategoryValidation } = require("../validation/categoryValidation.js")
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

async function getAllCategory() {
    const allCategory = await prismaClient.$queryRaw`SELECT * FROM category`;
    return allCategory
}

async function getCategoryById(request) {
    const categoryValidation = validation(getCategoryValidation, request.categoryId)
    const category = await prismaClient.category.findUnique({
        where: {
            id: categoryValidation
        }
    })
    return category
}

module.exports = {createCategory, getAllCategory, getCategoryById}