const prisma = require("../../config/db")
const { generateOrderNumber } = require("./order.utils")

// exports.createOrderFromCart = async (userId, cartSnapshot) => {
//   console.log("Creating order for userId:", userId)
//   console.log("Cart snapshot:", cartSnapshot)

//   if (!userId) throw new Error("USER_ID_MISSING")
//   if (!cartSnapshot?.items?.length) throw new Error("EMPTY_CART")

//   const grandTotal =
//     cartSnapshot.grandTotal ??
//     cartSnapshot.items.reduce(
//       (sum, item) => sum + item.totalPrice,
//       0
//     )
//     console.log("Calculated grand total:", grandTotal)

//   const order = await prisma.order.create({
//     data: {
//       userId,
//       status: "PLACED",
//       orderNumber: generateOrderNumber(),
//       grandTotal,
//       items: {
//         create: cartSnapshot.items.map((item) => ({
//           productType: item.productType,
//           productRefId: item.productRefId,
//           quantity: item.quantity,
//           unitPrice: item.unitPrice,
//           totalPrice: item.totalPrice,
//           configurationJson: item.configurationJson,
//         })),
//       },
//     },
//     include: { items: true },
//   })

//   return order
// }

exports.createOrderFromCart = async (userId, cartSnapshot) => {
  if (!userId) throw new Error("USER_ID_MISSING")
  if (!cartSnapshot?.items?.length) throw new Error("EMPTY_CART")

  const grandTotal =
    cartSnapshot.grandTotal ??
    cartSnapshot.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )

  console.log("Calculated grand total:", grandTotal)

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        status: "CREATED",
        grandTotal,
        orderNumber: generateOrderNumber(),

        // 👇 relation name MUST match schema
        items: {
          create: cartSnapshot.items.map((item) => ({
            productType: item.productType,
            productRefId: item.productRefId,
            quantity: item.quantity,
            // unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            configurationJson: JSON.parse(item.configurationJson) // Convert string to object before saving,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return order
  } catch (err) {
    console.error("PRISMA ORDER CREATE ERROR 👉", err)
    throw err
  }
}



exports.getUserOrders = (userId) => {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  })
}

exports.getOrderById = (id, userId) => {
  return prisma.order.findFirst({
    where: { id, userId },
    include: { items: true }
  })
}
