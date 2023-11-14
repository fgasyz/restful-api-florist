const express = require("express")
const AdminController = require("../controller/AdminController.js")
const UserController = require("../controller/UserController.js")
const userAuthMiddleWare = require("../middleware/userAuthMiddleware.js")

const authRouter = express.Router()

//admin
authRouter.post("/admin-register", AdminController.registerAdmin)
authRouter.post("/admin-login", AdminController.loginAdmin)
authRouter.post("/admin-refresh-token", AdminController.generateRefreshTokenForLogin)

//user
authRouter.post("/user-register", UserController.registerUser)
authRouter.post("/user-login", UserController.loginUser)
authRouter.post("/user-refresh-token", UserController.generateRefreshTokenForLogin)
authRouter.delete("/deleteAccount", userAuthMiddleWare, UserController.deleteUser)

module.exports = authRouter;