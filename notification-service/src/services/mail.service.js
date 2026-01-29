const resend = require("../config/resend")
const { generateInvoice } = require("./invoice.service")

const renderItemsHTML = (items) => {
  return items.map((item, i) => `
    <h4>Item ${i + 1}</h4>
    <p><b>Product:</b> ${item.productType}</p>
    <p><b>Quantity:</b> ${item.quantity}</p>
    <p><b>Total:</b> ₹${item.totalPrice}</p>
    <ul>
      ${Object.entries(item.configurationJson || {})
        .map(([k, v]) => `<li>${k}: ${v}</li>`)
        .join("")}
    </ul>
  `).join("")
}

exports.sendOrderConfirmation = async (order) => {
  const pdfBuffer = await generateInvoice(order)

  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: order.email, // 👈 Order service se bhejna
    subject: `Order Confirmed - ${order.orderNumber}`,
    html: `
      <h2>Order Confirmed 🎉</h2>
      <p>Order Number: <b>${order.orderNumber}</b></p>
      <p>Total Amount: <b>₹${order.grandTotal}</b></p>
      <hr/>
      ${renderItemsHTML(order.items)}
    `,
    attachments: [
      {
        filename: `invoice-${order.orderNumber}.pdf`,
        content: pdfBuffer
      }
    ]
  })
}
