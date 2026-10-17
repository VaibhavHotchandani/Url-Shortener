
const express = require("express");
const getController = require("../controller/get.controller");

const router = express.Router();

router.get("/:shortCode", getController.redirectUrl);

module.exports = router;
