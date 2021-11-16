const express = require("express");
const router = express.Router();
const isLogendIn = require("../utils/isLogendIn")
//const compro = require("../utils/compro")
const CommentController = require("../controllers/comments");

router.post("/:idProduct", isLogendIn, CommentController.postComments);


module.exports = router