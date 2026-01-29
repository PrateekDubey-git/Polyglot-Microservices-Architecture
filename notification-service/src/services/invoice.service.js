const PDFDocument = require("pdfkit")
const path = require("path")

exports.generateInvoice = (order) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50
    })

    const buffers = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => resolve(Buffer.concat(buffers)))

    /* ========== COLORS & FONTS ========== */
    const primaryColor = "#111827" // dark gray
    const lightGray = "#6B7280"

    doc.fillColor(primaryColor)

    /* ========== HEADER ========== */
    const logoPath = path.join(__dirname, "../assets/logo.png")

    try {
      doc.image(logoPath, 50, 45, { width: 110 })
    } catch (_) {}

    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("INVOICE", 0, 50, { align: "right" })

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(lightGray)
      .text("Creative Interiors Pvt. Ltd.", 50, 120)
      .text("Interior & Home Decor Solutions")
      .text("support@creativeinteriors.com")
      .text("+91 98765 43210")

    doc.moveDown(2)

    /* ========== INVOICE META ========== */
    doc.fillColor(primaryColor).fontSize(11)

    doc.text(`Invoice No: ${order.orderNumber}`)
    doc.text(`Order ID: ${order.orderId}`)
    doc.text(`Invoice Date: ${new Date().toLocaleDateString("en-IN")}`)

    doc.moveDown(1.5)

    drawLine(doc)

    /* ========== ITEMS TABLE HEADER ========== */
    doc.moveDown(1)

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Item", 50)
      .text("Qty", 280, doc.y - 12)
      .text("Amount", 350, doc.y - 12, { align: "right" })

    drawLine(doc)
    doc.moveDown(0.5)

    /* ========== ITEMS ========== */
    doc.font("Helvetica").fontSize(10)

    order.items.forEach((item, index) => {
      const startY = doc.y

      doc.text(`${index + 1}. ${item.productType}`, 50)
      doc.text(item.quantity.toString(), 280, startY)
      doc.text(`₹${item.totalPrice}`, 350, startY, { align: "right" })

      doc.moveDown(0.3)

      // Configuration (professional subtle style)
      Object.entries(item.configurationJson || {}).forEach(
        ([key, value]) => {
          doc
            .fontSize(9)
            .fillColor(lightGray)
            .text(`${key}: ${value}`, 70)
            .fillColor(primaryColor)
        }
      )

      doc.moveDown(0.8)
    })

    drawLine(doc)

    /* ========== TOTAL SECTION ========== */
    doc.moveDown(1)

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Grand Total", 280)
      .text(`₹${order.grandTotal}`, 350, doc.y - 12, { align: "right" })

    doc.moveDown(2)

    /* ========== FOOTER ========== */
    drawLine(doc)

    doc.moveDown(1)

    doc
      .fontSize(9)
      .fillColor(lightGray)
      .text(
        "This is a system generated invoice and does not require signature.",
        { align: "center" }
      )

    doc
      .fontSize(9)
      .text(
        "Thank you for choosing Creative Interiors.",
        { align: "center" }
      )

    doc.end()
  })
}

/* ========== UTILITY ========== */
function drawLine(doc) {
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .lineWidth(0.5)
    .strokeColor("#E5E7EB")
    .stroke()
}
