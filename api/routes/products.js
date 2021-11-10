const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/products");
const Product = require("../models/Product");

router.get("/", ProductsController.getAll);
router.get("/id/:id", ProductsController.getById);
router.get("/:category", ProductsController.getByCategory);
router.get("/name/:name", ProductsController.getByName);


module.exports = router;

//post de prueba, eliminar luego!!
router.post("/", (req, res) => {
  Product.create(req.body).then((product) => {
    res.send(product);
  });
});