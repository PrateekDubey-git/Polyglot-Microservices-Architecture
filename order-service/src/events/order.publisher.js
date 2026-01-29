const redis = require("../config/redis")

exports.publishOrderCreated = async (order, email) => {
  await redis.xadd(
    "order_stream",
    "*",
    "orderId", order.id,
    "orderNumber", order.orderNumber,
    "email", email,
    "grandTotal", order.grandTotal.toString(),
    "items", JSON.stringify(order.items)
  )
}
