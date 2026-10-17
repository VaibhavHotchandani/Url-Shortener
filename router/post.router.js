
const express = require("express");
const postController = require("../controller/post.controller");

const router = express.Router();

router.post("/", postController.returnurl);

module.exports = router;
