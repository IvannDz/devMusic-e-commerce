const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLogendIn")
const AuthController = require("../controllers/auth");
const passport = require("passport");
//1
router.get("/me", isLoggedIn, AuthController.getUser);
router.post("/login", passport.authenticate("local"), AuthController.login);
router.get("/facebook", passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',  failureRedirect: '/login' }));
router.post("/register", AuthController.register);
router.put("/me",isLoggedIn, AuthController.updateMe);
router.delete("/me",isLoggedIn, AuthController.deleteMe);
router.get("/me/buyOrder",isLoggedIn, AuthController.getBuyOrder);
router.post("/logout",AuthController.logout);


module.exports = router;