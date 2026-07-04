const express = require("express")
const router = express.Router()

const homesController = require("../controllers/homesController")
const usersController = require("../controllers/usersController")

// This is a test route to make sure my routes folder is connected
router.get("/", (req, res) => {
  res.send("HomeFix API routes are working")
})

// Homes routes
router.get("/homes", homesController.getAllHomes)
router.get("/homes/:id", homesController.getSingleHome)
router.post("/homes", homesController.createHome)
router.put("/homes/:id", homesController.updateHome)
router.delete("/homes/:id", homesController.deleteHome)

// Users routes
router.get("/users", usersController.getAllUsers)
router.get("/users/:id", usersController.getSingleUser)
router.post("/users", usersController.createUser)
router.put("/users/:id", usersController.updateUser)
router.delete("/users/:id", usersController.deleteUser)

module.exports = router