const { MongoClient } = require("mongodb")

let database

// This connects my project to MongoDB Atlas
const initDb = async () => {
  if (database) {
    return database
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    database = client.db("homefixDB")
    console.log("Connected to MongoDB")
    return database
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

// This lets other files use the database connection
const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized")
  }
  return database
}

module.exports = {
  initDb,
  getDb
}