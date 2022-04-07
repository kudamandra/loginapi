const express = require("express");
const app = express();
const authRoute = require("../routes/auth-routes");

app.get("/api", function (req, res) {
  res.json({ status: 200, message: "API is running" });
});

app.use("/api/v1/auth", authRoute);

module.exports = app;
