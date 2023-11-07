const express = require("express");
const path = require("path");
const web = require("./application/web.js");

web.set("views", path.join(__dirname, "/views"));

web.set("view engine", "ejs");

web.use(express.static(path.join(__dirname, "/public")));

web.listen(3030, () => {
    console.info("server is running...")
})