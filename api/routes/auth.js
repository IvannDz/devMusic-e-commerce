const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLogendIn")
const AuthController = require("../controllers/auth");
const passport = require("passport");

router.get("/me", isLoggedIn, AuthController.getUser);
router.post("/login", passport.authenticate("local"), AuthController.login);
router.post("/register", AuthController.register);
router.put("/me",isLoggedIn, AuthController.updateUser);
router.delete("/me",isLoggedIn, AuthController.deleteUser);
router.post("/logout",AuthController.logout);


module.exports = router;