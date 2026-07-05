const express = require("express")
const router = express.Router()

const homesController = require("../controllers/homesController")
const usersController = require("../controllers/usersController")
const maintenanceTasksController = require("../controllers/maintenanceTasksController")
const contractorsController = require("../controllers/contractorsController")

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

// Maintenance task routes
router.get("/maintenanceTasks", maintenanceTasksController.getAllMaintenanceTasks)
router.get("/maintenanceTasks/:id", maintenanceTasksController.getSingleMaintenanceTask)
router.post("/maintenanceTasks", maintenanceTasksController.createMaintenanceTask)
router.put("/maintenanceTasks/:id", maintenanceTasksController.updateMaintenanceTask)
router.delete("/maintenanceTasks/:id", maintenanceTasksController.deleteMaintenanceTask)

// Contractor routes
router.get("/contractors", contractorsController.getAllContractors)
router.get("/contractors/:id", contractorsController.getSingleContractor)
router.post("/contractors", contractorsController.createContractor)
router.put("/contractors/:id", contractorsController.updateContractor)
router.delete("/contractors/:id", contractorsController.deleteContractor)

module.exports = router