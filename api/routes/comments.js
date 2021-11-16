const express = require("express");
const router = express.Router();
const isLogendIn = require("../utils/isLogendIn")
//const compro = require("../utils/compro")
const CommentController = require("../controllers/comments");

router.post("/:idProduct", isLogendIn, CommentController.postComments);
router.get("/:idProduct", CommentController.getAllComments);


module.exports = router