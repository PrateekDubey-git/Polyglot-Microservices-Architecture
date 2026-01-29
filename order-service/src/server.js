require("dotenv").config()
const app = require("./app")

app.listen(process.env.PORT, () => {
  console.log(`🚀 Order Service running on ${process.env.PORT}`)
})
