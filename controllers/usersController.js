const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id is a valid MongoDB id
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required user information is included
const validateUser = (user) => {
  if (!user.firstName || !user.lastName || !user.email || !user.phone) {
    return "Please provide firstName, lastName, email, and phone."
  }

  return null
}

// This gets all users
const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().collection("users").find()

  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(users)
  })
}

// This gets one user by id
const getSingleUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id." })
  }

  const userId = new ObjectId(req.params.id)

  const result = await mongodb
    .getDb()
    .collection("users")
    .find({ _id: userId })

  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(users[0])
  })
}

// This creates a new user
const createUser = async (req, res) => {
  const error = validateUser(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }

  const response = await mongodb.getDb().collection("users").insertOne(user)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json({ message: "Failed to create user." })
  }
}

// This updates one user by id
const updateUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id." })
  }

  const error = validateUser(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const userId = new ObjectId(req.params.id)

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }

  const response = await mongodb
    .getDb()
    .collection("users")
    .replaceOne({ _id: userId }, user)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to update user." })
  }
}

// This deletes one user by id
const deleteUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id." })
  }

  const userId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDb()
    .collection("users")
    .deleteOne({ _id: userId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to delete user." })
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
}
