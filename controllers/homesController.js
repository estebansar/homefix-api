const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This gets all homes from the homes collection
const getAllHomes = async (req, res) => {
  const result = await mongodb.getDb().collection("homes").find()
  const homes = await result.toArray()

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(homes)
}

// This gets one home by id
const getSingleHome = async (req, res) => {
  const homeId = new ObjectId(req.params.id)

  const result = await mongodb.getDb().collection("homes").find({ _id: homeId })
  const homes = await result.toArray()

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(homes[0])
}

// This creates a new home
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

  const response = await mongodb.getDb().collection("homes").insertOne(home)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json({ message: "Failed to create home." })
  }
}

module.exports = {
  getAllHomes,
  getSingleHome,
  createHome
}