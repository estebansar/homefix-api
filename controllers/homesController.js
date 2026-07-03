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

module.exports = {
  getAllHomes,
  getSingleHome
}