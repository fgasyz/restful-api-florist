const { PrismaClient } = require("@prisma/client")
const logger = require("../application/logger.js")

const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        },
    ]
})

prismaClient.$on("error", (error) => {
    logger.error(error)
})

prismaClient.$on("warn", (warn) => {
    logger.warn(warn)
})

prismaClient.$on("info", (info) => {
    logger.info(info)
})

prismaClient.$on("query", (query) => {
    logger.info(query)
})

module.exports = prismaClient