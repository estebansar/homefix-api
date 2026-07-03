// This gets all homes from the database
const getAllHomes = async (req, res) => {
  res.send("Get all homes")
}

// This gets one home by id
const getSingleHome = async (req, res) => {
  res.send("Get single home")
}

module.exports = {
  getAllHomes,
  getSingleHome
}