const express = require("express")
const dotenv = require("dotenv")
const routes = require("./routes")
const mongodb = require("./data/database")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// This lets my API read JSON data from requests
app.use(express.json())

// This sends all main routes to my routes folder
app.use("/", routes)

// This shows my API documentation in Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// This starts the server only after MongoDB connects successfully
mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error("Failed to start server:", error)
  })

