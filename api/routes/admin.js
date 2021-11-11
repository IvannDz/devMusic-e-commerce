const express = require("express");
const router = express.Router();
 //colocar como middlewars a todas las rutas
const isLogendInAdmin = require("../utils/insLogendInAdmin");
const adminController = require("../controllers/admin");
//const passport = require("passport");

router.post("/", adminController.postProduct);
router.put("/product/:id", adminController.putProduct);
router.delete("/product/:id", adminController.deleteProduct);
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getOnlyUser);
router.put("/users/:id", adminController.putUser);
router.delete("/users/:id", adminController.deleteUser); 

module.exports = router;
