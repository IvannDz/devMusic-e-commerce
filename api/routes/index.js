const express = require("express");
const router = express.Router();
const products = require("./products");
const auth = require("./auth");
const admin = require("./admin");
const cart = require("./cart")

router.use("/products", products);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/cart", cart)

module.exports = router;
