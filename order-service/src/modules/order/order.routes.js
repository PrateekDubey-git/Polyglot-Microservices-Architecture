const router = require("express").Router()
const auth = require("../../middleware/auth.middleware")
const ctrl = require("./order.controller")

router.post("/", auth, ctrl.createOrder)
router.get("/", auth, ctrl.getOrders)
router.get("/:id", auth, ctrl.getOrder)

module.exports = router
