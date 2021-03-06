require('dotenv/config')

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.SECRET,
  dbUrl: process.env.DATABASE_URL
}