const orderService = require("./order.service")
const { publishOrderCreated } = require("../../events/order.publisher")

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrderFromCart(
      req.userId.sub,
      req.body.cartSnapshot
    )

    // 🔥 ASYNC EVENT (no await in response path)
    publishOrderCreated(order, req.userId.sub)
      .catch(err => console.error("REDIS EVENT ERROR", err))

    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Order creation failed" })
  }
}

exports.getOrders = async (req, res) => {
  const orders = await orderService.getUserOrders(req.userId.sub)
  res.json(orders)
}

exports.getOrder = async (req, res) => {
  const order = await orderService.getOrderById(
    req.params.id,
    req.userId.sub
  )
  res.json(order)
}
