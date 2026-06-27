const express = require("express")
const dotenv = require("dotenv")
const routes = require("./routes")
const mongodb = require("./data/database")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// This lets my API read JSON data from requests
app.use(express.json())

// This sends all main routes to my routes folder
app.use("/", routes)

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

  