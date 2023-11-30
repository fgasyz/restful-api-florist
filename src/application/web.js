const express = require("express");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("../middleware/ErrorMiddleware.js");
const authRouter = require("../router/authRouter.js");
const privateRouter = require("../router/privateRouter.js");
const publicRouter = require("../router/publicRouter.js");
const cors = require("cors");

const web = express();

web.use(cors());

web.use("/uploads", express.static(__dirname + "/../uploads"));
web.use("/invoices", express.static(__dirname + "/../../src/invoices"));

web.use(express.json());
web.use(fileUpload({ useTempFiles: true, debug: true, abortOnLimit: true }));

web.use(authRouter);
web.use(privateRouter);
web.use(publicRouter);

web.use(errorMiddleware);

module.exports = web;
