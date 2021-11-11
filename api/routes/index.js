const express = require("express");
const router = express.Router();
const products = require("./products");
const auth = require("./auth");
const admin = require("./admin");

router.use("/products", products);
router.use("/auth", auth);
router.use("/admin", admin);

module.exports = router;
