require("dotenv").config();


const express = require("express");

const postRoutes = require("./router/post.router");
const getRoutes = require("./router/get.router");
const dashboardRoutes = require("./router/dashboard.router");

const app = express();
app.use(express.static("public"));

app.use(express.json());

app.use("/result", postRoutes);
app.use("/api/urls", dashboardRoutes);
app.use("/", getRoutes);


module.exports = app;