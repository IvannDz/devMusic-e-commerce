const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/products");
const Product = require("../models/Product");

router.get("/", ProductsController.getAll);
router.get("/id/:id", ProductsController.getById);
router.get("/category/:category", ProductsController.getByCategory);
router.get("/category", ProductsController.getAllCategory);
router.get("/name/:name", ProductsController.getByName);


module.exports = router;

