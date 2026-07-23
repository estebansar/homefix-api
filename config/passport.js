const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy

// This connects Passport to GitHub OAuth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://homefix-api-2yn3.onrender.com/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

// This saves the logged-in user in the session
passport.serializeUser((user, done) => {
  done(null, user)
})

// This gets the logged-in user from the session
passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = passport