const express = require("express")
const session = require("express-session")
const dotenv = require("dotenv")

dotenv.config()

const passport = require("./config/passport")
const routes = require("./routes")

const mongodb = require("./data/database")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")


const app = express()
const port = process.env.PORT || 3000

// This lets my API read JSON data from requests
app.use(express.json())

// This creates a login session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// This starts Passport
app.use(passport.initialize())
app.use(passport.session())

// This sends all main routes to my routes folder
app.use("/", routes)

// This shows my API documentation in Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// This starts the server normally, but not while Jest is testing
if (require.main === module) {
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
}

// This lets Jest use my Express app for testing
module.exports = app