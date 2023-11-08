const logger = require("./application/logger.js")
const web = require("./application/web.js")
const env = require("dotenv").config().parsed

web.listen(env.PORT_SERVER, () => {
    logger.info("server is running...")
})