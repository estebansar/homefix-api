const express = require("express")
const router = express.Router()
const passport = require("passport")
const isAuthenticated = require("../middleware/authenticate")

const homesController = require("../controllers/homesController")
const usersController = require("../controllers/usersController")
const maintenanceTasksController = require("../controllers/maintenanceTasksController")
const contractorsController = require("../controllers/contractorsController")

// This is a test route to make sure my routes folder is connected
router.get("/", (req, res) => {
  res.send("HomeFix API routes are working")
})

// This sends the user to GitHub to log in
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
)

// This receives the user after GitHub login
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/auth-status")
  }
)

// This checks if the user is logged in
router.get("/auth-status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      loggedIn: true,
      username: req.user.username
    })
  }

  res.status(200).json({
    loggedIn: false
  })
})

// This logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    res.status(200).json({
      message: "You are logged out."
    })
  })
})

// Homes routes
router.get("/homes", homesController.getAllHomes)
router.get("/homes/:id", homesController.getSingleHome)
router.post("/homes", isAuthenticated, homesController.createHome)
router.put("/homes/:id", isAuthenticated, homesController.updateHome)
router.delete("/homes/:id", isAuthenticated, homesController.deleteHome)

// Users routes
router.get("/users", usersController.getAllUsers)
router.get("/users/:id", usersController.getSingleUser)
router.post("/users", isAuthenticated, usersController.createUser)
router.put("/users/:id", isAuthenticated, usersController.updateUser)
router.delete("/users/:id", isAuthenticated, usersController.deleteUser)

// Maintenance task routes
router.get("/maintenanceTasks", maintenanceTasksController.getAllMaintenanceTasks)
router.get("/maintenanceTasks/:id", maintenanceTasksController.getSingleMaintenanceTask)
router.post("/maintenanceTasks", isAuthenticated, maintenanceTasksController.createMaintenanceTask)
router.put("/maintenanceTasks/:id", isAuthenticated, maintenanceTasksController.updateMaintenanceTask)
router.delete("/maintenanceTasks/:id", isAuthenticated, maintenanceTasksController.deleteMaintenanceTask)

// Contractor routes
router.get("/contractors", contractorsController.getAllContractors)
router.get("/contractors/:id", contractorsController.getSingleContractor)
router.post("/contractors", isAuthenticated, contractorsController.createContractor)
router.put("/contractors/:id", isAuthenticated, contractorsController.updateContractor)
router.delete("/contractors/:id", isAuthenticated, contractorsController.deleteContractor)

module.exports = router