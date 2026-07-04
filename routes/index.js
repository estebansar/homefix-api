const express = require("express")
const router = express.Router()

const homesController = require("../controllers/homesController")

// This is a test route to make sure my routes folder is connected
router.get("/", (req, res) => {
  res.send("HomeFix API routes are working")
})

// Homes routes
router.get("/homes", homesController.getAllHomes)
router.get("/homes/:id", homesController.getSingleHome)
router.post("/homes", homesController.createHome)
router.put("/homes/:id", homesController.updateHome)

module.exports = router