const promiseRouter = require("express-promise-router")
const AdminController = require("../controller/AdminController.js")

const adminRouter = promiseRouter()

adminRouter.post("/register", AdminController.registerAdmin)
adminRouter.post("/login", AdminController.loginAdmin)
adminRouter.post("/refresh-token", AdminController.generateRefreshTokenForLogin)

module.exports = adminRouter;