const express = require("express")
const cors = require("cors")

const orderRoutes = require("./modules/order/order.routes")

const app = express()


app.use(express.json())



app.use("/api/orders", orderRoutes)

module.exports = app
