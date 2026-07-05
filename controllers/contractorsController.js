const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

// This checks if the id is a valid MongoDB id
const isValidObjectId = (id) => {
  return ObjectId.isValid(id)
}

// This checks that the required contractor information is included
const validateContractor = (contractor) => {
  if (!contractor.name || !contractor.company || !contractor.phone || !contractor.service) {
    return "Please provide name, company, phone, and service."
  }

  return null
}

// This gets all contractors
const getAllContractors = async (req, res) => {
  const result = await mongodb.getDb().collection("contractors").find()

  result.toArray().then((contractors) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(contractors)
  })
}

// This gets one contractor by id
const getSingleContractor = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid contractor id." })
  }

  const contractorId = new ObjectId(req.params.id)

  const result = await mongodb
    .getDb()
    .collection("contractors")
    .find({ _id: contractorId })

  result.toArray().then((contractors) => {
    if (contractors.length === 0) {
      return res.status(404).json({ message: "Contractor not found." })
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(contractors[0])
  })
}

// This creates a new contractor
const createContractor = async (req, res) => {
  const error = validateContractor(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const contractor = {
    name: req.body.name,
    company: req.body.company,
    phone: req.body.phone,
    service: req.body.service,
    email: req.body.email,
    notes: req.body.notes
  }

  const response = await mongodb
    .getDb()
    .collection("contractors")
    .insertOne(contractor)

  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json({ message: "Failed to create contractor." })
  }
}

// This updates one contractor by id
const updateContractor = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid contractor id." })
  }

  const error = validateContractor(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const contractorId = new ObjectId(req.params.id)

  const contractor = {
    name: req.body.name,
    company: req.body.company,
    phone: req.body.phone,
    service: req.body.service,
    email: req.body.email,
    notes: req.body.notes
  }

  const response = await mongodb
    .getDb()
    .collection("contractors")
    .replaceOne({ _id: contractorId }, contractor)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to update contractor." })
  }
}

// This deletes one contractor by id
const deleteContractor = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid contractor id." })
  }

  const contractorId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDb()
    .collection("contractors")
    .deleteOne({ _id: contractorId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json({ message: "Failed to delete contractor." })
  }
}

module.exports = {
  getAllContractors,
  getSingleContractor,
  createContractor,
  updateContractor,
  deleteContractor
}