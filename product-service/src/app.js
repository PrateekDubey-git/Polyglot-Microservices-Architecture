const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");

/* ===============================
   CORS CONFIG
================================ */
// Allow all for gateway architecture

/* ===============================
   BODY PARSER
================================ */
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api", routes);

/* ===============================
   HEALTH CHECK
================================ */
app.get("/health", (req, res) => {
  res.json({ service: "Product Service", status: "UP" });
});

module.exports = app;
