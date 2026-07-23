// This allows Jest tests to continue without a GitHub login
const isAuthenticated = (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    return next()
  }

  // This checks if the user is logged in before allowing changes
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(401).json({
    message: "You must log in first."
  })
}

module.exports = isAuthenticated