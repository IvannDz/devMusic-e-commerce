const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLogendIn")
const CartController = require("../controllers/cart");

router.get("/", isLoggedIn, CartController.getCart);
router.post("/", isLoggedIn, CartController.postProduct);
/* router.put("/", isLoggedIn, CartController.putProduct);
router.delete("/", isLoggedIn, CartController.deleteProduct); */

module.exports = router