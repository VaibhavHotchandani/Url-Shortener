
const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboard.controller.js");

router.get("/", dashboardController.getAllUrls);

module.exports = router;
