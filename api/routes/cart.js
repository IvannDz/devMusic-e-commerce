const express = require("express");
const router = express.Router();
const insLogendInAdmin = require("../utils/insLogendInAdmin")
const CartController = require("../controllers/cart");

router.get("/", insLogendInAdmin, CartController.getCart);
router.post("/", insLogendInAdmin, CartController.postProduct);
/* router.put("/", isLoggedIn, CartController.putProduct);
router.delete("/", isLoggedIn, CartController.deleteProduct); */

module.exports = router