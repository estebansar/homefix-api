const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id is a valid MongoDB id
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required maintenance task information is included
const validateMaintenanceTask = (task) => {
  if (!task.homeId || !task.title || !task.description || !task.status) {
    return "Please provide homeId, title, description, and status."
  }

  return null
}

// This gets all maintenance tasks
const getAllMaintenanceTasks = async (req, res) => {
  const result = await mongodb.getDb().collection("maintenanceTasks").find()

  result.toArray().then((tasks) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tasks)
  })
}

// This gets one maintenance task by id
const getSingleMaintenanceTask = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid maintenance task id." })
  }

  const taskId = new ObjectId(req.params.id)

  const result = await mongodb
    .getDb()
    .collection("maintenanceTasks")
    .find({ _id: taskId })

  result.toArray().then((tasks) => {
    if (tasks.length === 0) {
      return res.status(404).json({ message: "Maintenance task not found." })
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(tasks[0])
  })
}

// This creates a new maintenance task
const createMaintenanceTask = async (req, res) => {
  const error = validateMaintenanceTask(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const task = {
    homeId: req.body.homeId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority
  }

  const response = await mongodb
    .getDb()
    .collection("maintenanceTasks")
    .insertOne(task)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json({ message: "Failed to create maintenance task." })
  }
}

// This updates one maintenance task by id
const updateMaintenanceTask = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid maintenance task id." })
  }

  const error = validateMaintenanceTask(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const taskId = new ObjectId(req.params.id)

  const task = {
    homeId: req.body.homeId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority
  }

  const response = await mongodb
    .getDb()
    .collection("maintenanceTasks")
    .replaceOne({ _id: taskId }, task)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to update maintenance task." })
  }
}

// This deletes one maintenance task by id
const deleteMaintenanceTask = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid maintenance task id." })
  }

  const taskId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDb()
    .collection("maintenanceTasks")
    .deleteOne({ _id: taskId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to delete maintenance task." })
  }
}

module.exports = {
  getAllMaintenanceTasks,
  getSingleMaintenanceTask,
  createMaintenanceTask,
  updateMaintenanceTask,
  deleteMaintenanceTask
}

