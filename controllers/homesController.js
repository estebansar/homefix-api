const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id from the URL is a valid MongoDB id
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required home information is included
const validateHome = (home) => {
  if (
    !home.ownerName ||
    !home.address ||
    !home.city ||
    !home.state
  ) {
    return "Please provide ownerName, address, city, and state."
  }

  return null
}

// This gets all homes from the homes collection... GET
const getAllHomes = async (req, res) => {
  const result = await mongodb.getDb().collection("homes").find()
  const homes = await result.toArray()

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(homes)
}

// This gets one home by id.. GET iD
const getSingleHome = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid home id." })
  }

  const homeId = new ObjectId(req.params.id)

  const result = await mongodb.getDb().collection("homes").find({ _id: homeId })
  const homes = await result.toArray()

  if (!homes[0]) {
    return res.status(404).json({ message: "Home not found." })
  }

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(homes[0])
}

// This creates a new home... POST
const createHome = async (req, res) => {
  const home = {
    ownerName: req.body.ownerName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    homeType: req.body.homeType,
    yearBuilt: req.body.yearBuilt,
    notes: req.body.notes
  }
  // This checks that the required fields are included
  const validationError = validateHome(home)

  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const response = await mongodb.getDb().collection("homes").insertOne(home)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json({ message: "Failed to create home." })
  }
}

// This updates one home by id... PUT
const updateHome = async (req, res) => {
  // This checks if the id is a valid MongoDB id
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid home id." })
  }

  const homeId = new ObjectId(req.params.id)

  const home = {
    ownerName: req.body.ownerName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    homeType: req.body.homeType,
    yearBuilt: req.body.yearBuilt,
    notes: req.body.notes
  }

  // This checks that the required fields are included
  const validationError = validateHome(home)

  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const response = await mongodb
    .getDb()
    .collection("homes")
    .replaceOne({ _id: homeId }, home)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to update home." })
  }
}

// This deletes one home by id... DELETE id
const deleteHome = async (req, res) => {
  // This checks if the id is a valid MongoDB id
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid home id." })
  }

  const homeId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDb()
    .collection("homes")
    .deleteOne({ _id: homeId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to delete home." })
  }
}

module.exports = {
  getAllHomes,
  getSingleHome,
  createHome,
  updateHome,
  deleteHome
}