const express = require("express")
const router = express.Router()

// This is a test route to make sure my routes folder is connected
router.get("/", (req, res) => {
  res.send("HomeFix API routes are working")
})

module.exports = router